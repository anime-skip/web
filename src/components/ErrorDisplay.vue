<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';

defineProps<{
  error?: unknown;
}>();

const emits = defineEmits<{
  (event: 'retry'): void;
}>();
</script>

<template>
  <base-alert class="alert-error">
    <template #icon>
      <div class="i-mdi-error text-2xl" />
    </template>
    <template #default>
      <p class="text-lg">Error: {{ getErrorMessage(error) }}</p>
    </template>
    <template #buttons>
      <button class="btn" @click="emits('retry')">Retry</button>
    </template>
  </base-alert>
</template>
