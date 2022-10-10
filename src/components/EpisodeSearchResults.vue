<script lang="ts" setup>
import { SearchEpisodesQueryVariables } from '~~/utils/graphql.generated';

const props = defineProps<{
  query: string;
}>();

const limit = 10;
const variables = computed<SearchEpisodesQueryVariables>(() => ({
  search: props.query,
  limit,
}));

const { data, isLoading } = useSearchEpisodesQuery(variables);
</script>

<template>
  <div class="space-y-4">
    <p v-if="isLoading">Loading...</p>
    <h1 class="text-2xl font-stylized font-bold">Episodes</h1>
    <p v-if="!data?.searchEpisodes.length">No episodes</p>
    <ul v-else>
      <episode-list-item v-for="episode of data.searchEpisodes" :episode="episode" />
    </ul>
  </div>
</template>
