<script lang="ts" setup>
import { UniversalSearchVariables } from '~~/composables/useUniversalSearchQuery';

const props = defineProps<{
  query: string;
}>();

const limit = 10;

const formVariables = computed<UniversalSearchVariables>(() => ({
  query: props.query,
  limit: 10,
}));
const { data, isLoading } = useUniversalSearchQuery(formVariables);
</script>

<template>
  <div class="space-y-4">
    <p v-if="isLoading">Loading...</p>
    <h1 class="text-2xl font-stylized font-bold">Shows</h1>
    <p v-if="!data?.shows.searchShows.length" class="text-base-content text-opacity-70">No shows</p>
    <ul v-else>
      <show-list-item v-for="show of data.shows.searchShows" :show="show" />
      <li v-if="data.shows.searchShows.length >= limit">Search all shows</li>
    </ul>
    <h1 class="text-2xl font-stylized font-bold">Episodes</h1>
    <p v-if="!data?.episodes.searchEpisodes.length" class="text-base-content text-opacity-70">
      No episodes
    </p>
    <ul v-else>
      <episode-list-item v-for="episode of data.episodes.searchEpisodes" :episode="episode" />
      <li v-if="data.episodes.searchEpisodes.length >= limit">Search all episodes</li>
    </ul>
  </div>
</template>
