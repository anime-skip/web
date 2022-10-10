<script lang="ts" setup>
useHead({
  title: 'Search – Anime Skip',
});

const query = useRouteQueryString('q');
const includeShows = useRouteQueryBoolean('shows');
const includeEpisodes = useRouteQueryBoolean('episodes');

const isUniversal = computed(
  () =>
    (includeShows.value && includeEpisodes.value) ||
    (!includeShows.value && !includeEpisodes.value),
);
</script>

<template>
  <sidebar-layout>
    <template #side>
      <universal-search-form
        v-model:query="query"
        v-model:include-shows="includeShows"
        v-model:include-episodes="includeEpisodes"
      />
    </template>
    <template #content>
      <universal-search-results v-if="isUniversal" :query="query" />
      <episode-search-results v-else-if="includeEpisodes" :query="query" />
    </template>
  </sidebar-layout>
</template>
