<script lang="ts" setup>
import { formatEpisodeSeasonAndNumber } from '~~/utils/formatting';

const props = defineProps<{
  episode: {
    id: string;
    name?: string;
    number?: string;
    season?: string;
    show: {
      id: string;
      name: string;
    };
    absoluteNumber?: string;
  };
}>();

const details = computed(() => formatEpisodeSeasonAndNumber(props.episode));
</script>

<template>
  <li
    class="py-3 px-4 bg-neutral-focus bg-opacity-0 hover:bg-opacity-20 transition-colors rounded-lg space-y-1"
  >
    <p class="text-lg text-primary">{{ episode.name }}</p>
    <p class="text-base-content text-opacity-70">
      {{ episode.show.name }}&ensp;&bull;&ensp;{{ details }}
    </p>
  </li>
</template>
