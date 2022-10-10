<script lang="ts" setup>
defineProps<{
  show: {
    id: string;
    name: string;
    image?: string;
    episodeCount: number;
    seasonCount: number;
  };
}>();
</script>

<template>
  <li
    class="py-3 px-4 bg-neutral-focus bg-opacity-0 hover:bg-opacity-20 transition-colors rounded-lg space-y-1"
  >
    <p class="text-lg text-primary">{{ show.name }}</p>
    <p class="text-base-content text-opacity-70">
      {{ show.seasonCount }} seasons, {{ show.episodeCount }} episodes
    </p>
  </li>
</template>
