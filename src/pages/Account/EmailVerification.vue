<template>
  <div class="EmailVerification">
    <h2>Email Address Verification</h2>
    <p class="beta-message">
      During the beta, Anime Skip does not require your email address be validated before using the
      service. Once the beta is finished, your email address will need to be verified
    </p>
    <div class="status">
      <p v-if="isEmailVerified">Your email address is verified!</p>
      <div v-else class="not-verified">
        <h4><strong>Your email address is not verified</strong></h4>
        <button class="disabled" disabled>Verify Email</button>
        <p>
          To verify your account, press the button above. The email address registered with your
          account will recieve an email with instructions to verify your address. If you do not
          recieve an email within 5 minutes, please check your spam
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAccount from '@/composition/account';

export default defineComponent({
  setup() {
    const { isEmailVerified } = useAccount();
    return {
      isEmailVerified,
    };
  },
});
</script>

<style scoped lang="scss">
.EmailVerification {
  .beta-message,
  .status {
    margin-top: 24px;
  }

  .not-verified {
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    h4 {
      text-align: center;
    }
  }
}
</style>
