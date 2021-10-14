<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h4>Email Address Verification</h4>
      <text-input v-model:value="email" placeholder="Email" autocomplete="email" disabled>
        <template #left-icon="slotProps">
          <icon-email :active="slotProps.active" :disabled="slotProps.disabled" />
        </template>
      </text-input>

      <p class="text-success" v-if="isEmailVerified">Your email address is verified!</p>
      <template v-else>
        <p>
          After the beta, you have to verify that your email address before you're allowed to
          contribute timestamps
        </p>
        <raised-button :disabled="isLoading || hasRecentlySumbitted" @click="submitRequest">
          Verify Email
        </raised-button>
        <template v-if="hasRecentlySumbitted">
          <p class="text-success">Verification email sent!</p>
          <p v-if="!wasSent && !isLoading">
            Didn't get an email? Check your spam folder or resend it after 5 minutes
          </p>
        </template>
        <p v-if="errorMessage" class="text-error">
          {{ errorMessage }}
        </p>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import useAccount from '@/composition/account';
import { RaisedButton, TextInput } from '@anime-skip/ui';
import IconEmail from '@/assets/IconEmail.vue';
import Api from '@/api';
import { computed, onMounted, ref } from 'vue';
import TimeUtils from '@/utils/time';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useRequestState } from '@/composition/request-state';
import { RequestState } from '@/utils/enums';
import { usePersistedTimeoutFlag } from '@/composition/persistedTimeoutFlag';

const LAST_REQUESTED_AT_STORAGE_KEY = 'email_verification_last_requested_at_ms';
const REQUEST_TIMES_OUT_AFTER = 5 * TimeUtils.MINUTES;

const { isEmailVerified, email } = useAccount();

// Requesting email be sent

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!;

const {
  isLoading,
  errorMessage,
  isSuccess: wasSent,
  tryCatch,
} = useRequestState(RequestState.NOT_REQUESTED);
const { flag: hasRecentlySumbitted, startTimeout: startVerificationRequestTimeout } =
  usePersistedTimeoutFlag('email_verification_request', 5 * TimeUtils.MINUTES);
const submitRequest = tryCatch(async () => {
  await recaptchaLoaded();
  const recaptchaResponse = await executeRecaptcha('verify_email');
  await Api.resendVerificationEmail('', { recaptchaResponse });
  startVerificationRequestTimeout();
});

// Handling incoming token
const route = useRoute();
const router = useRouter();
const store = useStore();
const token = route.query.token as string | undefined;
onMounted(async () => {
  if (!token) return;
  console.log('Processing token...');
  router.replace(''); // clear token
  const account = await Api.verifyEmailAddress(
    `{
      id
      username
      email
      emailVerified
      profileUrl
    }`,
    {
      validationToken: token,
    },
  );
  store.commit(MutationTypes.SET_ACCOUNT_INFO, account);
});
</script>
