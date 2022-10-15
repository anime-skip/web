<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center">
    <p
      class="text-xs uppercase text-base-content text-opacity-50 justify-self-start font-medium truncate"
    >
      {{ label }}
    </p>
    <slot />
  </div>
</template>
