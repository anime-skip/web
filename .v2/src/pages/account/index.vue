<script lang="ts" setup>
import { RECAPTCHA_SCRIPT } from '~~/utils/recaptcha';

useHead({
  script: [RECAPTCHA_SCRIPT],
});
</script>

<template>
  <div class="space-y-8">
    <verify-email-address-alert />
    <update-profile-form />
    <delete-account-form />
  </div>
</template>
