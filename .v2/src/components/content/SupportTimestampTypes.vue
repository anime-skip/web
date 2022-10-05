<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';

const { data, isError, error } = useAllTimestampTypesQuery();
const errorMessage = computed(() => getErrorMessage(error));
</script>

<template>
  <p v-if="isError">{{ errorMessage }}</p>
  <ul v-else>
    <li v-for="t of data?.allTimestampTypes">
      <h4>{{ t.name }}</h4>
      <p>{{ t.description }}</p>
    </li>
  </ul>
</template>
