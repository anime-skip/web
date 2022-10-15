<script lang="ts" setup>
import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

defineProps<{
  client: ManagedApiClientFragment;
}>();
</script>

<template>
  <li class="rounded-xl px-8 pb-8 pt-6 bg-base-200 flex flex-col gap-4">
    <edit-api-client-form :client="client" />
  </li>
</template>
