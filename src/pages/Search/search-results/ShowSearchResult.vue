<template>
  <li
    class="
      p-4
      bg-on-surface bg-opacity-0
      hover:bg-opacity-hover
      transition-colors
      rounded-lg
      space-y-1
    "
  >
    <p class="heading-6 text-primary">{{ name }}</p>
    <p class="text-on-surface text-opacity-medium">
      {{ seasonCount }} seasons, {{ episodeCount }} episodes
    </p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    episodeCount: { type: Number, required: true },
    seasonCount: { type: Number, required: true },
  },
});
</script>
