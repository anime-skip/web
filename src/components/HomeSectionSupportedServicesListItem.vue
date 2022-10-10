<script lang="ts" setup>
import { SupportedService } from '~~/utils/remote-config';

defineProps<{
  service: SupportedService;
}>();
</script>

<template>
  <li
    class="min-w-[12rem] min-h-16 flex items-center justify-center text-center font-stylized font-bold text-3xl px-6 pt-4 pb-3 rounded"
    :style="`background-color: ${service.background}; color: ${service.textColor}`"
  >
    {{ service.name }}
  </li>
</template>
