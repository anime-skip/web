<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';

const vars = ref({
  limit: 10,
});
const { data, isLoading, isError, error } = useRecentlyAddedEpisodesQuery(vars);
const errorMessage = computed(() => getErrorMessage(error.value));
</script>

<template>
  <ul>
    <p v-if="isError" class="text-error">{{ errorMessage }}</p>
    <div v-else-if="isLoading">Loading...</div>
    <template v-else>
      <home-section-recently-added-list-item
        v-for="episode of data.recentlyAddedEpisodes"
        :key="episode.id"
        :episode="episode"
      />
    </template>
  </ul>
</template>
