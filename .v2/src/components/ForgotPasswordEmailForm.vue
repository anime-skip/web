<script lang="ts" setup>
import { getErrorMessage } from '~~/utils/errors';
import { executeRecaptcha } from '~~/utils/recaptcha';

const { state, validation } = useForgotPasswordEmailForm();

const {
  mutate: mutateRequestPasswordReset,
  isError,
  error,
  isLoading,
  isSuccess,
} = useRequestPasswordResetMutation();
const errorMessage = computed(() => getErrorMessage(error.value));

function login() {
  if (validation.value.$invalid) {
    validation.value.$touch();
    return;
  }
  executeRecaptcha('reset_password').then(recaptchaResponse => {
    mutateRequestPasswordReset({
      email: state.email,
      recaptchaResponse,
    });
  });
}
</script>

<template>
  <form class="p-8 flex flex-col gap-8" @submit.prevent="login">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="font-stylized text-3xl">Forgot Password</h1>
      <p class="text-sm">Enter your email address to reset your password.</p>
    </div>

    <div class="space-y-4">
      <!-- Inputs -->
      <base-input-group
        :label-bl="validation.email.$error ? 'A valid email address is required' : undefined"
      >
        <template #left><div class="i-mdi:email text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.email.$error }"
            v-model="validation.email.$model"
            placeholder="Email address"
            autocomplete="username"
          />
        </template>
      </base-input-group>

      <!-- Recaptcha/Error message -->
      <recaptcha-disclaimer v-if="!isError" />
      <p v-else class="text-error text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Buttons -->
    <button
      v-if="!isSuccess"
      class="btn btn-primary self-start"
      :class="{
        loading: isLoading,
      }"
      :disabled="isLoading"
      type="submit"
    >
      Continue
    </button>
    <button v-else class="btn self-start" disabled>Email Sent</button>

    <!-- Success message -->
    <p v-if="isSuccess" class="text-success">
      An email has been sent to your email address, follow it's instructions to reset your password.
    </p>
  </form>
</template>
