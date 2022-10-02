<script lang="ts" setup>
const route = useRoute();
const defaultUsername = computed(() => route.query.username as string | undefined);
const redirect = computed(() => route.query.redirect as string | undefined);
</script>

<template>
  <sign-up-form :default-username="defaultUsername" :redirect="redirect" />
</template>
