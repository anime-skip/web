<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h4>Account Info</h4>
      <p class="body-2 text-error">Not available yet!</p>
    </section>

    <section class="space-y-4">
      <h6>Update Username</h6>
      <text-input :model-value="username" placeholder="Username" autocomplete="username" disabled>
        <template #left-icon="slotProps">
          <icon-account :active="slotProps.active" :disabled="slotProps.disabled" />
        </template>
      </text-input>
      <raised-button disabled>Save</raised-button>
    </section>

    <section class="space-y-4">
      <h6>Update Email</h6>
      <text-input :model-value="email" placeholder="Email" autocomplete="email" disabled>
        <template #left-icon="slotProps">
          <icon-email :active="slotProps.active" :disabled="slotProps.disabled" />
        </template>
      </text-input>
      <raised-button disabled>Save</raised-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAccount from '@/composition/account';
import { TextInput, RaisedButton } from '@anime-skip/ui';
import IconEmail from '@/assets/IconEmail.vue';
import IconAccount from '@/assets/IconAccount.vue';

export default defineComponent({
  components: {
    TextInput,
    IconEmail,
    RaisedButton,
    IconAccount,
  },
  setup() {
    const { username, email } = useAccount();

    return {
      username,
      email,
    };
  },
});
</script>
