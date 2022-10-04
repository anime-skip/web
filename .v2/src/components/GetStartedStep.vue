<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const props = defineProps<{
  number: number;
  title: string;
  completed: boolean;
  active: boolean;
}>();

const manuallyOpened = ref(false);
const isOpen = computed(() => !props.completed || manuallyOpened.value);

function toggleManuallyOpened() {
  if (!props.completed) return;
  manuallyOpened.value = !manuallyOpened.value;
}

const [parent] = useAutoAnimate();
</script>

<template>
  <li
    :class="{
      'pt-8 pb-16': active,
    }"
  >
    <div
      ref="parent"
      class="rounded-lg ring ring-primary ring-opacity-0 transition duration-250"
      :class="{
        'ring-opacity-100': active,
      }"
    >
      <div
        class="p-6 flex gap-8 items-center"
        :class="{ 'cursor-pointer': completed }"
        @click="toggleManuallyOpened"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center"
          :class="{
            'bg-neutral text-neutral-content': completed,
            'bg-primary text-primary-content': !completed,
          }"
        >
          <div v-if="completed" key="icon" class="i-mdi:check text-2xl" />
          <span v-else key="number" class="mt-1 font-stylized font-bold text-lg">{{ number }}</span>
        </div>
        <h2
          class="text-2xl font-stylized pt-1.5 text-base-content flex-1 transition duration-250"
          :class="{
            'text-opacity-70': completed && !isOpen,
          }"
        >
          {{ title }}
        </h2>
      </div>
      <div v-if="isOpen" class="pl-[6rem] pb-6 pr-6 space-y-6">
        <slot />
      </div>
    </div>
  </li>
</template>
