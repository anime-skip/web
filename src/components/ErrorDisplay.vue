<!-- TODO: Use for all API failure displays -->

<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';

defineProps<{
  error?: unknown;
  hideRetry?: boolean;
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
    <template v-if="!hideRetry" #buttons>
      <button class="btn" @click="emits('retry')">Retry</button>
    </template>
  </base-alert>
</template>
