<script setup lang="ts">
import useGqlRecentlyAddedEpisodesQuery from "app/composables/useGqlRecentlyAddedEpisodesQuery";
import { getSeasonAndNumberText } from "app/utils/episode-utils";
import RecentlyAddedEpisodeListItem from "./RecentlyAddedEpisodeListItem.vue";

const { data } = useGqlRecentlyAddedEpisodesQuery();
</script>

<template>
  <section
    id="recently-added"
    class="py-8 md:py-16 flex flex-col gap-8 items-center"
  >
    <h3 class="text-3xl font-overpass tracking-tighter font-black text-center">
      Recently Added Episodes
    </h3>

    <ul
      class="shadow-2xl shadow-neutral rounded-lg ring ring-neutral overflow-hidden divide-y divide-neutral mx-8 max-w-xl"
    >
      <RecentlyAddedEpisodeListItem
        v-for="episode in data"
        :key="episode.id"
        :episode
      />
    </ul>
  </section>
</template>
