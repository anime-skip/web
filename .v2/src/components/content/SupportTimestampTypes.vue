<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';

const { data, isError, error } = useAllTimestampTypesQuery();
const errorMessage = computed(() => getErrorMessage(error));
</script>

<template>
  <p v-if="isError">{{ errorMessage }}</p>
  <template v-else>
    <md-expandable v-for="t of data?.allTimestampTypes" :key="t.id" :title="t.name">
      <p>{{ t.description }}</p>
    </md-expandable>
  </template>
</template>
