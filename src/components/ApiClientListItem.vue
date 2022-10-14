<script lang="ts" setup>
import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

defineProps<{
  client: ManagedApiClientFragment;
  active: boolean;
}>();
</script>

<template>
  <li
    class="rounded-xl p-4 bg-base-300"
    :class="{
      'framing-shadow': active,
    }"
  >
    <api-client-form :defaults="client" submit-label="Save Client" disabled />
  </li>
</template>
