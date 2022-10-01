<script lang="ts" setup>
import { RECAPTCHA_SCRIPT } from '~~/utils/recaptcha';

useHead({
  script: [RECAPTCHA_SCRIPT],
});
</script>

<template>
  <login-form />
</template>
