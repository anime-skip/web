<template>
  <div class="AccountInfo">
    <h2>Account Info</h2>
    <p>During the beta, none of this information can be updated</p>
    <div class="user-details">
      <label>Username</label>
      <text-input :modelValue="username" placeholder="Username" autocomplete="username" disabled>
        <template v-slot:left>
          <img class="input-icon" src="../../assets/ic_account.svg" />
        </template>
      </text-input>

      <label>Email</label>
      <text-input :modelValue="email" placeholder="Email" autocomplete="email" disabled>
        <template v-slot:left>
          <img class="input-icon" src="../../assets/ic_email.svg" />
        </template>
      </text-input>

      <label>Change Password</label>
      <text-input
        v-model="password"
        type="password"
        placeholder="Current password"
        autocomplete="current-password"
        disabled
      >
        <template v-slot:left>
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
        <template v-slot:left>
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
        <template v-slot:left>
          <img class="input-icon" src="../../assets/ic_password.svg" />
        </template>
      </text-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useAccount from '@/composition/account';
import TextInput from '@/components/TextInput.vue';

export default defineComponent({
  components: { TextInput },
  setup() {
    const { username, email } = useAccount();
    const password = ref<string>('');
    const newPassword = ref<string>('');
    const confirmPassword = ref<string>('');
    return {
      username,
      email,
      password,
      newPassword,
      confirmPassword,
    };
  },
});
</script>

<style scoped lang="scss">
.AccountInfo {
  .user-details {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 14px;
    color: $textSecondaryColor;
  }

  .TextInput {
    margin-bottom: 8px;

    .input-icon {
      margin: 0 12px;
      opacity: 0.48;
    }
  }
}
</style>
