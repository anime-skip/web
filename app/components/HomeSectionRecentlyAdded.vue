<script setup lang="ts">
import useGqlRecentlyAddedEpisodesQuery from "app/composables/useGqlRecentlyAddedEpisodesQuery";
import { getSeasonAndNumberText } from "app/utils/episode-utils";

import RecentlyAddedEpisodeListItem from "./RecentlyAddedEpisodeListItem.vue";

const { data } = useGqlRecentlyAddedEpisodesQuery();
</script>

<template>
  <section id="recently-added" class="mx-auto flex max-w-7xl flex-col gap-8 py-8 md:py-16">
    <h3 class="font-overpass text-center text-3xl font-black tracking-tighter">
      Recently Added Episodes
    </h3>

    <ul
      class="shadow-neutral ring-neutral divide-neutral mx-8 divide-y overflow-hidden rounded-lg shadow-2xl ring"
    >
      <RecentlyAddedEpisodeListItem v-for="episode in data" :key="episode.id" :episode />
    </ul>
  </section>
</template>
