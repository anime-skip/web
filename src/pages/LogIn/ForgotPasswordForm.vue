<template>
  <div class="flex flex-col w-full space-y-4">
    <h4>Forgot Password</h4>

    <template v-if="!token">
      <p>Enter the email address of your account to reset your password</p>
      <text-input
        v-model:value="email"
        placeholder="Email"
        autocomplete="email"
        :disabled="submitDisabled"
        @submit="requestPasswordReset"
      >
        <template #left-icon="slotProps">
          <icon-email :disabled="slotProps.disabled" :active="slotProps.focused" />
        </template>
      </text-input>
      <raised-button
        class="self-start"
        :disabled="submitDisabled || !email"
        @click="requestPasswordReset"
        >Continue</raised-button
      >
      <p v-if="sendEmailErrorMessage" class="text-error">{{ sendEmailErrorMessage }}</p>
      <template v-if="hasRecentlySubmitted">
        <p class="text-success">
          An email has been sent to your email address! Follow it's instructions to reset your
          password
        </p>
        <p>
          Check spam if it hasn't arrived in a few minutes, or you can resend the email after 5
          minutes
        </p>
      </template>
    </template>

    <template v-else>
      <template v-if="!isChangePasswordSuccess">
        <p>Enter a new password</p>
        <text-input
          v-model:value="newPassword"
          type="password"
          placeholder="New password"
          autocomplete="password"
          :disabled="isChangePasswordLoading"
          @submit="changePassword()"
        >
          <template #left>
            <img class="input-icon" src="../../assets/ic_password.svg" />
          </template>
        </text-input>
        <text-input
          v-model:value="confirmNewPassword"
          type="password"
          placeholder="Confirm new password"
          autocomplete="new-password"
          :disabled="isChangePasswordLoading"
          @submit="changePassword()"
        >
          <template #left>
            <img class="input-icon" src="../../assets/ic_password.svg" />
          </template>
        </text-input>
        <raised-button
          class="self-start"
          :disabled="isChangePasswordLoading"
          @click="changePassword"
          >Update</raised-button
        >
        <p v-if="changePasswordErrorMessage" class="text-error">{{ changePasswordErrorMessage }}</p>
      </template>
      <template v-else>
        <p v-if="isChangePasswordSuccess" class="text-success">Your password has been updated!</p>
        <raised-button class="self-start" link="/log-in">Login</raised-button>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api';
import IconEmail from '@/assets/IconEmail.vue';
import { usePersistedTimeoutFlag } from '@/composition/persistedTimeoutFlag';
import { useRequestState } from '@/composition/request-state';
import { RequestState } from '@/utils/enums';
import TimeUtils from '@/utils/time';
import { RaisedButton, TextInput } from '@anime-skip/ui';
import { computed, onMounted, ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useRoute, useRouter } from 'vue-router';

// Request Form

const email = ref('');
const { flag: hasRecentlySubmitted, startTimeout: startRecentlySubmittedTimeout } =
  usePersistedTimeoutFlag('password_reset', 5 * TimeUtils.MINUTES);

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!;
const {
  isLoading: isSendingEmail,
  errorMessage: sendEmailErrorMessage,
  tryCatch: sendEmailTryCatch,
} = useRequestState(RequestState.NOT_REQUESTED);
const requestPasswordReset = sendEmailTryCatch(async () => {
  await recaptchaLoaded();
  const recaptchaResponse = await executeRecaptcha('reset_password');
  await api.requestPasswordReset('', { recaptchaResponse, email: email.value });
  startRecentlySubmittedTimeout();
});

const submitDisabled = computed<boolean>(() => isSendingEmail.value || hasRecentlySubmitted.value);

// Reset form

const route = useRoute();
const router = useRouter();
const token = route.query.token as string | undefined;
onMounted(() => {
  if (!token) return;
  router.replace('');
});

const newPassword = ref('');
const confirmNewPassword = ref('');

const {
  isLoading: isChangePasswordLoading,
  isSuccess: isChangePasswordSuccess,
  errorMessage: changePasswordErrorMessage,
  tryCatch: changePasswordTryCatch,
} = useRequestState(RequestState.NOT_REQUESTED);
const changePassword = changePasswordTryCatch(async () => {
  if (!token) {
    throw Error('Unknown error: token missing');
  }
  await api.resetPassword(`{ authToken }`, {
    confirmNewPassword: confirmNewPassword.value,
    newPassword: newPassword.value,
    passwordResetToken: token,
  });
});
</script>
