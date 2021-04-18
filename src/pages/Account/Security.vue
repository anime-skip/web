<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h4>Security</h4>
      <p class="body-1 text-on-surface text-opacity-high">
        Manage your password and other security settings
      </p>
    </section>

    <section class="space-y-4">
      <h6>Change Password</h6>
      <p class="body-2 text-error">Not available yet!</p>
      <text-input
        v-model="currentPassword"
        type="password"
        placeholder="Current password"
        autocomplete="current-password"
        disabled
      >
        <template #left>
          <img class="input-icon" src="../../assets/ic_password.svg" />
        </template>
      </text-input>
      <text-input
        v-model="newPassword"
        type="password"
        placeholder="New password"
        autocomplete="password"
        disabled
      >
        <template #left>
          <img class="input-icon" src="../../assets/ic_password.svg" />
        </template>
      </text-input>
      <text-input
        v-model="newPassword"
        type="password"
        placeholder="Retype new password"
        autocomplete="password"
        disabled
      >
        <template #left>
          <img class="input-icon" src="../../assets/ic_password.svg" />
        </template>
      </text-input>

      <raised-button disabled>Update</raised-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TextInput, RaisedButton } from '@anime-skip/ui';

export default defineComponent({
  components: {
    TextInput,
    RaisedButton,
  },
  setup() {
    const currentPassword = ref<string>('');
    const newPassword = ref<string>('');
    const confirmPassword = ref<string>('');

    return {
      currentPassword,
      newPassword,
      confirmPassword,
    };
  },
});
</script>
