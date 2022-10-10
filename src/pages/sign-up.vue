<script lang="ts" setup>
import { RECAPTCHA_SCRIPT } from '~~/utils/recaptcha';

useHead({
  title: 'Sign Up – Anime Skip',
  script: [RECAPTCHA_SCRIPT],
});

const route = useRoute();
const defaultUsername = computed(() => route.query.username as string | undefined);
const redirect = computed(() => route.query.redirect as string | undefined);
</script>

<template>
  <center-card>
    <sign-up-form :default-username="defaultUsername" :redirect="redirect" />
  </center-card>
</template>
