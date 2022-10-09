<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import md5 from 'md5';
import { getErrorMessage } from '~~/utils/errors';
import RecaptchaDisclaimer from './RecaptchaDisclaimer.vue';

const props = defineProps<{
  passwordResetToken: string;
}>();

const { state, validation } = useForgotPasswordChangeForm();

const { mutate: mutateResetPassword, isError, error, isLoading } = useResetPasswordMutation();
const errorMessage = computed(() => getErrorMessage(error.value));

const auth = useAuthStore();
async function resetPassword() {
  if (validation.value.$invalid) {
    validation.value.$touch();
    return;
  }
  mutateResetPassword(
    {
      newPassword: md5(state.password),
      confirmNewPassword: md5(state.confirmPassword),
      passwordResetToken: props.passwordResetToken,
    },
    {
      onSuccess(data) {
        auth.setLoggedInDetails(data.resetPassword);
        navigateTo('/account');
      },
    },
  );
}
</script>

<template>
  <form class="p-8 flex flex-col gap-8" @submit.prevent="resetPassword">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="font-stylized text-3xl">Forgot Password</h1>
      <p class="text-sm">Enter a new password.</p>
    </div>

    <div class="space-y-4">
      <!-- Inputs -->
      <base-input-group>
        <template #left><div class="i-mdi:key text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.password.$error }"
            v-model="validation.password.$model"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
          />
        </template>
        <template v-if="validation.empasswordail.$error" #labelBl>
          <span class="text-error">Password is required</span>
        </template>
      </base-input-group>
      <base-input-group>
        <template #left><div class="i-mdi:key text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.confirmPassword.$error }"
            v-model="validation.confirmPassword.$model"
            type="password"
            placeholder="Confirm Password"
            autocomplete="new-password"
          />
        </template>
        <template v-if="validation.confirmPassword.$error" #labelBl>
          <span class="text-error">Passwords do not match</span>
        </template>
      </base-input-group>

      <!-- Recaptcha/Error message -->
      <p v-if="isError" class="text-error text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Submit Button -->
    <button
      class="btn btn-primary self-start"
      :class="{
        loading: isLoading,
      }"
      :disabled="isLoading"
      type="submit"
    >
      Change Password
    </button>
  </form>
</template>
