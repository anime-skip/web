<script setup lang="ts">
import useGqlAllTimestampTypesQuery from "app/composables/useGqlAllTimestampTypesQuery";

const { data, error } = useGqlAllTimestampTypesQuery();
</script>

<template>
  <ul>
    <li v-if="error">Error loading timestamp types: {{ error }}</li>
    <li v-for="type in data" :key="type.id">
      <strong>{{ type.name }}</strong>
      &ndash;
      <span>{{ type.description }}</span>
    </li>
  </ul>
</template>
