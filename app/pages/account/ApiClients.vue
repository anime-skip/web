<script lang="ts" setup>
import ApiClientEditorListItem from "app/components/ApiClientEditorListItem.vue";
import useGqlApiClientsQuery from "app/composables/useGqlApiClientsQuery";
import useGqlCreateApiClientMutation from "app/composables/useGqlCreateApiClientMutation";
import { useHead } from "@unhead/vue";

useHead({
  title: "API Clients – Anime Skip",
});

const { data: clients, error, isLoading } = useGqlApiClientsQuery();

const { mutate: _createClient, isPending: isCreating } =
  useGqlCreateApiClientMutation();
const createClient = () =>
  _createClient({
    client: {
      appName: "Unknown",
      description: "No description provided",
    },
  });
</script>

<template>
  <h1 class="font-overpass font-bold text-2xl">API Clients</h1>
  <p>
    API clients are used to access Anime Skip's API. Read the
    <a class="link" href="/scalar" target="_blank">API docs</a> for more
    information.
  </p>

  <button
    class="btn btn-primary shrink-0"
    :disabled="isCreating"
    :loading="isCreating"
    @click="createClient"
  >
    <i class="i-heroicons-plus size-5"></i>
    <span>Add Client</span>
  </button>

  <ul class="flex flex-col gap-4">
    <ApiClientEditorListItem
      v-if="clients"
      v-for="client of clients"
      :key="client.id"
      :client="client"
    />
    <li
      v-if="clients?.length === 0"
      class="py-8 text-center text-base-content/50"
    >
      No API clients created yet.
    </li>
  </ul>
</template>
