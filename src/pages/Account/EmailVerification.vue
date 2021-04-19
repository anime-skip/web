<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h4>Email Address Verification</h4>
      <p class="body-1 text-success" v-if="isEmailVerified">Your email address is verified!</p>
      <template v-else>
        <p class="body-1 text-on-surface text-opacity-high">
          <s
            >You have to verify that your email address before you're allowed to contribute
            timestamps</s
          >
        </p>
        <raised-button disabled>Verify Email</raised-button>
        <p class="body-2 text-error">
          During the beta, your email cannot be verified because email verification hasn't been
          setup yet.
        </p>
        <p class="body-2 text-error">
          Once the beta is finished, your email will need to be verified before you're allowed to
          contribute.
        </p>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAccount from '@/composition/account';
import { RaisedButton } from '@anime-skip/ui';

export default defineComponent({
  components: {
    RaisedButton,
  },
  setup() {
    const { isEmailVerified } = useAccount();
    return {
      isEmailVerified,
    };
  },
});
</script>
