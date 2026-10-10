<script lang="ts" setup>
defineProps<{
  icon: string;
  feature: string;
  body?: string;
}>();
</script>

<template>
  <li class="bg-secondary/10 ring-secondary/50 space-y-2 rounded-xl p-8 ring ring-inset">
    <p class="text-secondary font-overpass flex items-center gap-4 text-lg font-bold">
      <span :class="`${icon} text-secondary size-7`" />
      <span class="pt-1">{{ feature }}</span>
    </p>
    <p v-if="body">{{ body }}</p>
    <slot v-else />
  </li>
</template>
