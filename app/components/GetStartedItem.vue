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
        class="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full"
        :class="{
          'bg-primary text-primary-content': !completed,
          'bg-neutral text-neutral-content': completed,
        }"
        @click="toggleExpanded"
      >
        <i v-if="completed" class="i-heroicons-check-16-solid size-6" />
        <span v-else class="text-lg font-bold">{{ number }}</span>
      </div>
      <div v-if="!last" class="bg-neutral min-h-4 w-0.5 flex-1 rounded-full" />
    </div>

    <!-- Right Side -->
    <div class="flex flex-col gap-4 pb-8">
      <p
        class="font-overpass flex h-12 items-center text-xl font-bold"
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
