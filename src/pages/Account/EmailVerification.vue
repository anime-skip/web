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
import { RaisedButton, TextInput } from '@anime-skip/ui';
import IconEmail from '@/assets/IconEmail.vue';

export default defineComponent({
  components: {
    RaisedButton,
    IconEmail,
    TextInput,
  },
  setup() {
    const { isEmailVerified, email } = useAccount();
    return {
      isEmailVerified,
      email,
    };
  },
});
</script>
