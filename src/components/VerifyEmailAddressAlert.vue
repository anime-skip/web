<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { getErrorMessage } from '~~/utils/errors';

const auth = useAuthStore();

const { isLoading, mutate, isSuccess, error } = useResendVerificationEmailMutation();
function resendEmail() {
  mutate(undefined, {
    onError() {
      hasFailed.value = true;
    },
  });
}
const hasFailed = ref(false);
const errorMessage = computed(() => getErrorMessage(error.value));
</script>

<template>
  <div v-if="auth.account && !auth.account.emailVerified">
    <!-- Main prompt -->
    <base-alert v-if="!hasFailed && !isSuccess" class="alert-warning">
      <template #icon><div class="i-mdi-warning text-2xl" /></template>
      <template #default>
        <p class="font-bold">Your email addres is not verified</p>
        <p class="text-sm">
          In the future, you won't be able to use Anime Skip without verifying your email address.
        </p>
      </template>
      <template #buttons>
        <button
          class="btn"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @click="resendEmail()"
        >
          Verify Now
        </button>
      </template>
    </base-alert>

    <!-- Success -->
    <base-alert v-else-if="isSuccess" class="alert-success">
      <template #icon>
        <div class="i-mdi-check-circle text-xl" />
      </template>
      <template #default>
        <p class="font-bold">Email sent to {{ auth.account.email }}!</p>
        <p class="text-sm">Follow the directions in the email to verify your email address.</p>
      </template>
    </base-alert>

    <!-- Error -->
    <base-alert v-else class="alert-error">
      <template #icon><div class="i-mdi-error text-2xl" /></template>
      <template #default>
        <p class="font-bold">Something went wrong</p>
        <p v-if="errorMessage" class="text-sm">Failed to send email: {{ errorMessage }}</p>
      </template>
      <template #buttons>
        <button
          class="btn"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @click="resendEmail()"
        >
          Retry
        </button>
      </template>
    </base-alert>
  </div>
</template>
