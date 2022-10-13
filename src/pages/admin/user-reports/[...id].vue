<script lang="ts" setup>
const route = useRoute();

const id = computed(() => route.params.id[0]);
const resolvedMessage = ref('');

const vars = computed(() => ({ id: id.value }));
const { data, isLoading, isError, error, refetch } = useFindUserReportQuery(vars);
const report = computed(() => data.value?.findUserReport);

const createdAt = computed(() => new Date(report.value.createdAt).toLocaleString());
const createdAgo = useTimeAgo(createdAt);

const updatedAt = computed(() => new Date(report.value.updatedAt).toLocaleString());
const updatedAgo = useTimeAgo(updatedAt);
const reportedFromDomain = computed(() => {
  try {
    return new URL(report.value.reportedFromUrl).host;
  } catch (err) {
    return 'Invalid URL';
  }
});

const selectedRelatedReports = ref<Record<string, boolean>>({});
function updateSelectedRelatedReports(newSelected: Record<string, boolean>) {
  selectedRelatedReports.value = newSelected;
}
const selectedCount = computed(() => 1 + Object.keys(selectedRelatedReports.value).length);

/**
 * Reports on the same model minus the report we're looking at
 */
const relatedReports = computed(() => {
  const allRelatedReports = report.value?.episode?.userReports;
  return allRelatedReports?.filter(item => item.id !== report.value?.id);
});

const {
  mutate,
  isError: isResolveError,
  error: resolveError,
  isLoading: isResolveLoading,
} = useResolveUserReportsMutation();
const isResolveDisabled = computed(() => !resolvedMessage.value.trim());
function resolveSelectedReports() {
  if (isResolveDisabled.value || !report.value) return;
  mutate({
    ids: [report.value.id, ...Object.keys(selectedRelatedReports.value)],
    resolvedMessage: resolvedMessage.value,
  });
}
</script>

<template>
  <error-display v-if="isError" :error="error" @retry="refetch" />
  <p v-else-if="isLoading" class="p-8">Loading...</p>

  <div v-else-if="report != null" class="min-w-[30rem]">
    <div class="p-8 grid grid-flow-row grid-cols-3 gap-8 auto-cols-fr">
      <!-- Header -->
      <h1 class="text-3xl font-stylized font-bold flex items-center truncate col-span-3">
        <nuxt-link class="link link-hover" to="/admin/user-reports">User Reports</nuxt-link>
        <div class="inline-block i-mdi-menu-right shrink-0" />
        <code class="text-2xl font-mono bg-base-content bg-opacity-10 rounded px-2 py-0.5">{{
          report.id
        }}</code>
      </h1>

      <!-- Created by -->
      <labeled-value label="Created By">
        <nuxt-link
          class="flex items-center gap-2 link link-hover"
          :to="`/@${report.createdBy.username}`"
        >
          <profile-picture class="w-8 h-8 pointer-events-none" :user="report.createdBy" />
          <p>{{ report.createdBy.username }}</p>
        </nuxt-link>
      </labeled-value>

      <!-- Created At -->
      <labeled-value label="Created At">
        <p :title="createdAt">{{ createdAgo }}</p>
      </labeled-value>

      <!-- Reported From URL -->
      <labeled-value class="truncate" label="Reported From">
        <nuxt-link
          class="link link-secondary flex items-center gap-1"
          :to="report.reportedFromUrl"
          target="_blank"
          >{{ reportedFromDomain }}
          <div class="inline-block i-mdi-open-in-new" />
        </nuxt-link>
      </labeled-value>

      <template v-if="report.resolved">
        <!-- Resolved By -->
        <labeled-value label="Reported By">
          <nuxt-link
            class="flex items-center gap-2 link link-hover"
            :to="`/@${report.updatedBy.username}`"
          >
            <profile-picture class="w-8 h-8 pointer-events-none" :user="report.createdBy" />
            <p>{{ report.updatedBy.username }}</p>
          </nuxt-link>
        </labeled-value>

        <!-- Resolved At -->
        <labeled-value label="Resolved At">
          <p :title="updatedAt">{{ updatedAgo }}</p>
        </labeled-value>
      </template>

      <!-- Status -->
      <labeled-value label="Status">
        <p
          v-if="report.resolved"
          class="text-success font-bold rounded-lg ring-1 ring-success p-4 flex items-center gap-4"
        >
          <span class="shrink-0 inline-block i-mdi-check-circle text-2xl" />
          <span class="truncate" :title="report.resolvedMessage">{{ report.resolvedMessage }}</span>
        </p>
        <p
          v-else
          class="text-error font-bold rounded-lg ring-1 ring-error p-4 flex items-center gap-4"
        >
          <span class="shrink-0 inline-block i-mdi-close-circle text-2xl" />
          <span class="truncate">Not Resolved</span>
        </p>
      </labeled-value>

      <!-- Message -->
      <labeled-value class="col-span-3" label="Message">
        <p class="text-lg whitespace-pre-line">{{ report.message }}</p>
      </labeled-value>

      <!-- Divider -->
      <div class="col-span-3 bg-base-content bg-opacity-20 h-px" />

      <!-- Preview -->
      <labeled-value class="col-span-3" label="Preview">
        <p class="text-warning">TODO</p>
      </labeled-value>

      <template v-if="!report.resolved">
        <!-- Divider -->
        <div class="col-span-3 bg-base-content bg-opacity-20 h-px" />

        <!-- Form -->
        <labeled-value class="col-span-3" label="Resolve">
          <form class="shrink-0 flex gap-2" @submit.prevent="resolveSelectedReports">
            <input
              class="input flex-1 input-bordered"
              v-model="resolvedMessage"
              :placeholder="`Resolve ${selectedCount} report${selectedCount === 1 ? '' : 's'}...`"
            />
            <button
              class="btn btn-success"
              :class="{ loading: isResolveLoading }"
              type="submit"
              :disabled="isResolveDisabled || isResolveLoading"
            >
              Resolve
            </button>
          </form>
        </labeled-value>
      </template>

      <!-- Resolve error -->
      <error-display v-if="isResolveError" :error="resolveError" />

      <template v-if="relatedReports">
        <!-- Divider -->
        <div class="col-span-3 bg-base-content bg-opacity-20 h-px" />

        <!-- Other Reports -->
        <div class="flex items-center col-span-3">
          <h2 class="text-2xl font-stylized font-bold flex-1">Other Reports For The Same Model</h2>
        </div>
      </template>
    </div>

    <!-- Related reports -->
    <user-report-list
      v-if="relatedReports"
      :reports="relatedReports"
      @update:selected="updateSelectedRelatedReports"
    />
  </div>
</template>
