<script lang="ts" setup>
import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

const emits = defineEmits<{
  (event: 'created'): void;
  (event: 'canceled'): void;
}>();

const defaultApiClient = { appName: '', description: '', rateLimitRpm: '60' };

const [form, resetForm] = useResetApiClientForm();

const {
  mutateAsync: _createClient,
  isLoading: isCreateLoading,
  isError: isCreateError,
  error: createError,
} = useCreateApiClientMutation();
function createClient(
  client: Pick<ManagedApiClientFragment, 'appName' | 'description' | 'rateLimitRpm'>,
) {
  return _createClient({
    client: {
      appName: client.appName.trim(),
      description: client.description.trim(),
    },
  }).then(() => {
    resetForm(defaultApiClient);
    emits('created');
  });
}
</script>

<template>
  <div>
    <base-api-client-form ref="form" :defaults="defaultApiClient" @submit="createClient">
      <template #title>
        <h3 class="text-2xl font-stylized font-bold">New API Client</h3>
      </template>

      <template #buttons>
        <button
          class="btn btn-primary"
          :class="{ loading: isCreateLoading }"
          :disabled="isCreateLoading"
          type="submit"
        >
          Create
        </button>

        <button class="btn" @click.stop.prevent="emits('canceled')">Cancel</button>
      </template>
    </base-api-client-form>

    <error-display v-if="isCreateError" :error="createError" hide-retry />
  </div>
</template>
