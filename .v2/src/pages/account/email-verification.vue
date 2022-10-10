<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { getErrorMessage } from '~~/utils/errors';

useHead({
  title: 'Email Verification – Anime Skip',
});

const auth = useAuthStore();

const validationToken = (useRoute().query.token as string | undefined) ?? '';

const { mutate, isError, error } = useVerifyEmailAddressMutation();
mutate(
  { validationToken },
  {
    onSuccess(data) {
      auth.setAccount(data.verifyEmailAddress);
      navigateTo('/account');
    },
  },
);
const errorMessage = computed(() => getErrorMessage(error));
</script>

<template>
  <div>
    <p v-if="!isError">Verifying email address...</p>
    <p v-else>Failed to verify email addres: {{ errorMessage }}</p>
  </div>
</template>
