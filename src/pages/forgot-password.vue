<script lang="ts" setup>
import { RECAPTCHA_SCRIPT } from '~~/utils/recaptcha';

useHead({
  title: 'Forgot Password – Anime Skip',
  script: [RECAPTCHA_SCRIPT],
});

const route = useRoute();
const token = computed(() => route.query.token as string | undefined);
</script>

<template>
  <center-card>
    <forgot-password-email-form v-if="!token" />
    <forgot-password-reset-form v-else :password-reset-token="token" />
  </center-card>
</template>
