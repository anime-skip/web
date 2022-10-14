<script lang="ts" setup>
import { QueryMyApiClientsArgs } from '~~/utils/graphql.generated';

const search = ref('');

const vars = computed<Omit<QueryMyApiClientsArgs, 'offset'>>(() => ({
  search: search.value,
  sort: 'DESC',
}));
const { data, isLoading, isError, error, refetch } = useMyApiClientsQuery(vars);
const clients = computed(() => data.value?.pages.flatMap(page => page.myApiClients));
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <error-display v-else-if="isError" :error="error" @retry="refetch" />
    <p v-if="!clients?.length" class="text-center p-16">No API Clients</p>
    <ul v-else class="flex flex-col gap-8">
      <api-client-list-item
        v-for="client of clients"
        :key="client.id"
        :client="client"
        :active="false"
      />
    </ul>
  </div>
</template>
