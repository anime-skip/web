<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  number: number | string;
  last?: boolean;
  title: string;
  completed?: boolean;
}>();

const expanded = ref(!props.completed);
const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <div class="flex gap-4">
    <!-- Left Side -->
    <div class="flex flex-col items-center gap-4">
      <div
        class="shrink-0 size-12 rounded-full flex items-center justify-center cursor-pointer"
        :class="{
          'bg-primary text-primary-content': !completed,
          'bg-neutral text-neutral-content': completed,
        }"
        @click="toggleExpanded"
      >
        <i v-if="completed" class="i-heroicons-check-16-solid size-6" />
        <span v-else class="font-bold text-lg">{{ number }}</span>
      </div>
      <div v-if="!last" class="w-0.5 rounded-full bg-neutral flex-1 min-h-4" />
    </div>

    <!-- Right Side -->
    <div class="flex flex-col gap-4 pb-8">
      <p
        class="font-bold text-xl font-overpass h-12 flex items-center"
        :class="{
          'text-base-content/50': completed,
        }"
      >
        {{ title }}
      </p>
      <template v-if="expanded">
        <slot />
      </template>
    </div>
  </div>
</template>
