<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import ApiClientEditorListItem from "app/components/ApiClientEditorListItem.vue";
import useGqlApiClientsQuery from "app/composables/useGqlApiClientsQuery";
import useGqlCreateApiClientMutation from "app/composables/useGqlCreateApiClientMutation";

useHead({
  title: "API Clients – Anime Skip",
});

const { data: clients, error, isLoading } = useGqlApiClientsQuery();

const { mutate: _createClient, isPending: isCreating } = useGqlCreateApiClientMutation();
const createClient = () =>
  _createClient({
    client: {
      appName: "Unknown",
      description: "No description provided",
    },
  });
</script>

<template>
  <h1 class="font-overpass text-2xl font-bold">API Clients</h1>
  <p>
    API clients are used to access Anime Skip's API. Read the
    <a class="link" href="/scalar" target="_blank">API docs</a> for more information.
  </p>

  <button
    class="btn btn-primary shrink-0"
    :disabled="isCreating"
    :loading="isCreating"
    @click="createClient"
  >
    <i class="i-heroicons-plus size-5 shrink-0"></i>
    <span>Add Client</span>
  </button>

  <ul class="flex flex-col gap-4">
    <ApiClientEditorListItem
      v-if="clients"
      v-for="client of clients"
      :key="client.id"
      :client="client"
    />
    <li v-if="clients?.length === 0" class="text-base-content/50 py-8 text-center">
      No API clients created yet.
    </li>
  </ul>
</template>
