<script lang="ts" setup>
import { UniversalSearchVariables } from '~~/composables/useUniversalSearchQuery';

type FormVariables = Pick<UniversalSearchVariables, 'query' | 'includeEpisodes' | 'includeShows'>;

const props = defineProps<{
  query: string;
  includeShows: boolean;
  includeEpisodes: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:query', newQuery: string);
  (event: 'update:includeShows', newQuery: boolean);
  (event: 'update:includeEpisodes', newQuery: boolean);
}>();

const { state, validation } = useUniversalSearchForm();
watch(
  () => props.query,
  newQuery => (state.query = newQuery),
  { immediate: true },
);
watch(
  () => props.includeShows,
  newIncludeShows => (state.includeShows = newIncludeShows),
  { immediate: true },
);
watch(
  () => props.includeEpisodes,
  newIncludeEpisodes => (state.includeEpisodes = newIncludeEpisodes),
  { immediate: true },
);

function updateVariables() {
  if (validation.value.$error) {
    validation.value.$touch();
    return;
  }

  emit('update:query', state.query);
  emit('update:includeShows', state.includeShows);
  emit('update:includeEpisodes', state.includeEpisodes);
}

watch([() => state.includeShows, () => state.includeEpisodes], updateVariables);
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="updateVariables()">
    <ul class="menu bg-base-300 p-2 gap-2 rounded-box">
      <div class="form-control">
        <div class="input-group">
          <input
            class="input input-bordered focus:input-primary min-w-0 w-full"
            v-model="validation.query.$model"
            placeholder="Search..."
          />
          <button class="btn btn-square btn-primary" type="submit">
            <span class="i-mdi:search text-xl" />
          </button>
        </div>
      </div>
      <!-- <li>
        <label class="flex">
          <span class="flex-1">Shows</span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="validation.includeShows.$model"
          />
        </label>
      </li>
      <li>
        <label class="flex">
          <span class="flex-1">Episodes</span>
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="validation.includeEpisodes.$model"
          />
        </label>
      </li> -->
    </ul>
  </form>
</template>
