<script lang="ts" setup>
import { QueryFindUserReportsArgs } from '~~/utils/graphql.generated';

const vars = ref<QueryFindUserReportsArgs>({ resolved: false });

const {
  data,
  isSuccess,
  isError,
  isLoading,
  error,
  refetch,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useFindUserReportsQuery(vars);
const reports = computed(() => data.value?.pages.flatMap(res => res.findUserReports));

const selection = useSelection(reports, report => report.id);

const footer = ref<HTMLElement>(null);
useIntersectionObserver(
  footer,
  () => {
    if (!hasNextPage.value) return;
    console.log('fetching next page');
    void fetchNextPage.value();
  },
  { threshold: 0.1 },
);
</script>

<template>
  <div class="flex flex-col">
    <div v-if="isError" class="px-8">
      <error-display :error="error" @retry="refetch()" />
    </div>
    <table v-if="isSuccess || isLoading" class="table table-zebra w-full">
      <thead>
        <tr>
          <th v-if="false">
            <label class="pt-1">
              <span class="sr-only">Select/Deselect All</span>
              <input
                class="checkbox checkbox-primary"
                type="checkbox"
                @click="selection.toggleSelectAll()"
                :indeterminate="selection.indeterminate"
                :checked="selection.checked"
              />
            </label>
          </th>
          <th></th>
          <th>Message</th>
          <th>Type</th>
          <th>Created At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <user-report-list-item
          v-for="report of reports"
          :key="report.id"
          :report="report"
          :selected="selection.selected[report.id]"
          @selected="selection.selectItem"
          @deselected="selection.deselectItem"
        />
      </tbody>
      <tfoot ref="footer" />
    </table>
    <div v-if="isLoading || isFetchingNextPage" class="text-center p-8">Loading...</div>
  </div>
</template>
