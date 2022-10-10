<script lang="ts" setup>
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <div class="w-96 md:w-auto mx-auto flex flex-col gap-4 items-center px-4 pb-12 text-center">
    <div :class="`${icon} text-primary text-6xl`" />
    <h3 class="text-xl font-stylized">{{ title }}</h3>
    <slot />
  </div>
</template>
