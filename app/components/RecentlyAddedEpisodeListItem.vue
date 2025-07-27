<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { RecentEpisode } from "app/composables/useGqlRecentlyAddedEpisodesQuery";
import { getSeasonAndNumberText } from "app/utils/episode-utils";

const props = defineProps<{
  episode: RecentEpisode;
}>();

const timeAgo = useTimeAgo(props.episode.createdAt);
</script>

<template>
  <li class="p-4 flex gap-8 items-center">
    <div class="flex-1">
      <p class="line-clamp-1 text-lg font-bold">
        {{ episode.name ?? "Unknown Episode" }}
      </p>
      <p class="text-sm">
        <span class="text-primary">{{
          episode.show.name ?? "Unknown Show"
        }}</span>
        <span class="text-base-content/50"
          >{{ " " }} &bull; {{ getSeasonAndNumberText(episode) }}</span
        >
      </p>
    </div>

    <p class="text-base-content/50 text-sm">{{ timeAgo.toUpperCase() }}</p>
  </li>
</template>
