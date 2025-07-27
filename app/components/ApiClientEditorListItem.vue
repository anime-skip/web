<script lang="ts" setup>
import type { ApiClient } from "app/composables/useGqlApiClientsQuery";
import { useClipboard } from "@vueuse/core";
import { computed, ref } from "vue";
import useGqlDeleteApiClientMutation from "app/composables/useGqlDeleteApiClientMutation";
import useGqlUpdateApiClientMutation from "app/composables/useGqlUpdateApiClientMutation";

const props = defineProps<{
  client: ApiClient;
}>();

const { copy, copied } = useClipboard();

const appName = ref(props.client.appName);
const rateLimitRpm = ref(props.client.rateLimitRpm);
const description = ref(props.client.description);

const isDirty = computed(
  () =>
    props.client.appName !== appName.value.trim() ||
    props.client.rateLimitRpm !== rateLimitRpm.value ||
    props.client.description !== description.value.trim(),
);

const reset = () => {
  appName.value = props.client.appName;
  rateLimitRpm.value = props.client.rateLimitRpm;
  description.value = props.client.description;
};

const { mutate: _deleteApiClient, isPending: isDeleting } =
  useGqlDeleteApiClientMutation();
const deleteApiClient = () => _deleteApiClient({ id: props.client.id });

const { mutate: _updateApiClient, isPending: isUpdating } =
  useGqlUpdateApiClientMutation();
const updateApiClient = () =>
  _updateApiClient({
    id: props.client.id,
    changes: {
      appName: appName.value.trim(),
      description: description.value.trim(),
    },
  });
</script>

<template>
  <li class="ring ring-neutral shadow-lg shadow-neutral rounded-lg p-4">
    <form class="flex flex-col gap-4" @submit.prevent="updateApiClient">
      <div>
        <p class="text-xs font-bold text-base-content/50">Client ID</p>
        <div class="flex items-center gap-2">
          <p class="text-lg text-primary font-mono">{{ client.id }}</p>
          <i
            class="size-5 text-primary cursor-pointer"
            :class="{
              'i-heroicons-clipboard': !copied,
              'i-heroicons-check': copied,
            }"
            @click="copy(client.id)"
          />
        </div>
      </div>

      <label class="flex flex-col gap-1">
        <p class="text-xs font-bold text-base-content/50">App Name</p>
        <div class="input">
          <input v-model="appName" required />
        </div>
      </label>

      <label class="flex flex-col gap-1">
        <p class="text-xs font-bold text-base-content/50">Description</p>
        <div class="input">
          <textarea
            class="min-h-24"
            placeholder="Add a description..."
            v-model="description"
          />
        </div>
      </label>

      <label class="flex flex-col gap-1">
        <p class="text-xs font-bold text-base-content/50">
          Rate Limit (Requests per Minute) - Email support to increase rate
          limit
        </p>
        <div class="input">
          <input type="number" v-model="rateLimitRpm" disabled />
        </div>
      </label>

      <div class="flex items-center gap-2">
        <button
          class="btn btn-error btn-outline shrink-0"
          type="button"
          @click="deleteApiClient"
          :loading="isDeleting"
          :disabled="isDeleting"
        >
          Delete
        </button>
        <div class="flex-1" />
        <button
          class="btn btn-outline shrink-0"
          type="button"
          :disabled="!isDirty"
          @click="reset"
        >
          {{ isDeleting ? "Deleting..." : "Delete" }}
        </button>
        <button
          class="btn shrink-0"
          type="submit"
          :disabled="!isDirty || isUpdating"
          :loading="isUpdating"
        >
          {{ isUpdating ? "Updating..." : "Update" }}
        </button>
      </div>
    </form>
  </li>
</template>
