<script lang="ts" setup>
import { ApiClientChanges, ManagedApiClientFragment } from '~~/utils/graphql.generated';

const props = defineProps<{
  client: ManagedApiClientFragment;
}>();

const [form, resetForm] = useResetApiClientForm();

const {
  mutate: deleteClient,
  isLoading: isDeleteLoading,
  isError: isDeleteError,
  error: deleteError,
} = useDeleteApiClientMutation();
const {
  mutate: updateClient,
  isLoading: isUpdateLoading,
  isError: isUpdateError,
  error: updateError,
} = useUpdateApiClientMutation();

function saveChanges(
  newClient: Pick<ManagedApiClientFragment, 'appName' | 'description' | 'rateLimitRpm'>,
) {
  // Fallback to null to clear (instead of excluding it) the field when falsy
  const appName = newClient.appName.trim() || null;
  const description = newClient.description.trim() || null;
  const rateLimitRpm = newClient.rateLimitRpm || null;
  const changes: ApiClientChanges = {};
  if (appName !== props.client.appName) changes.appName = appName;
  if (description !== props.client.description) changes.description = description;
  if (rateLimitRpm !== props.client.rateLimitRpm) changes.rateLimitRpm = rateLimitRpm;
  updateClient(
    { id: props.client.id, changes },
    {
      onSuccess(data) {
        resetForm(data.updateApiClient);
      },
    },
  );
}
</script>

<template>
  <li class="rounded-xl px-8 pb-8 pt-6 bg-base-200 flex flex-col gap-4">
    <base-api-client-form ref="form" :defaults="client" @submit="saveChanges">
      <template #title>
        <h2 class="font-mono text-2xl font-bold text-primary truncate">{{ client.id }}</h2>
      </template>

      <template #buttons="{ hasChange }">
        <template v-if="hasChange">
          <button
            class="flex-shrink-0 btn btn-primary"
            :class="{ loading: isUpdateLoading }"
            :disabled="isUpdateLoading || isDeleteLoading"
            type="submit"
          >
            Save Changes
          </button>

          <button
            class="flex-shrink-0 btn btn-primary btn-outline"
            :disabled="isUpdateLoading || isDeleteLoading"
            @click.stop.prevent="resetForm(client)"
          >
            Discard
          </button>
        </template>

        <button
          class="flex-shrink-0 btn btn-outline btn-error justify-self-end"
          :class="{ loading: isDeleteLoading }"
          @click.stop.prevent="deleteClient({ id: client.id })"
          :disabled="isUpdateLoading || isDeleteLoading"
        >
          Delete
        </button>
      </template>
    </base-api-client-form>

    <!-- Error messages -->
    <error-display v-if="isDeleteError" :error="deleteError" hide-retry />
    <error-display v-if="isUpdateError" :error="updateError" hide-retry />
  </li>
</template>
