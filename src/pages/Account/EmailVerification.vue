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
          You have to verify that your email address before you're allowed to contribute timestamps
        </p>
        <raised-button :disabled="hasRecentlySumbitted" @click="submitRequest">
          Verify Email
        </raised-button>
        <template v-if="hasRecentlySumbitted">
          <p v-if="!sent" class="text-error">
            Didn't get an email? Check your spam folder or resend it after 5 minutes
          </p>
          <p v-if="sent" class="text-success">Verification email sent!</p>
        </template>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import useAccount, { useReloadAccount } from '@/composition/account';
import { RaisedButton, TextInput } from '@anime-skip/ui';
import IconEmail from '@/assets/IconEmail.vue';
import Api from '@/api';
import { computed, onMounted, ref } from 'vue';
import TimeUtils from '@/utils/time';
import { useInterval } from '@/composition/timers';
import { useWindowEvent } from '@/composition/events';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';

const LAST_REQUESTED_AT_STORAGE_KEY = 'email_verification_last_requested_at_ms';
const REQUEST_TIMES_OUT_AFTER = 5 * TimeUtils.MINUTES;

const { isEmailVerified, email } = useAccount();

// Requesting email be sent

const lastRequestedAt = ref(getLastRequestedAt());
function getLastRequestedAt(): number {
  const lastReqestedAtStr = localStorage.getItem(LAST_REQUESTED_AT_STORAGE_KEY);
  const lastRequestedAtMs = lastReqestedAtStr == null ? 0 : Number(lastReqestedAtStr);
  return isNaN(lastRequestedAtMs) ? 0 : lastRequestedAtMs;
}
function updateLastRequestedAt() {
  const now = Date.now();
  localStorage.setItem(LAST_REQUESTED_AT_STORAGE_KEY, String(Date.now()));
  lastRequestedAt.value = now;
}

const pageLoadedAt = Date.now();
const hasRecentlySumbitted = computed<boolean>(
  () => pageLoadedAt < lastRequestedAt.value + REQUEST_TIMES_OUT_AFTER,
);

const sent = ref(false);
async function submitRequest(): Promise<void> {
  try {
    updateLastRequestedAt();
    await Api.resendVerificationEmail('');
    // Api.
    sent.value = true;
  } catch (err) {
    console.error(err);
  }
}

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
