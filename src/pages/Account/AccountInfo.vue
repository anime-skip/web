<template>
  <div class="space-y-8">
    <h4>Account Info</h4>

    <section class="space-y-4">
      <h6>Change Username</h6>
      <p class="body-2 text-error">Not available yet!</p>
      <text-input v-model:value="username" placeholder="Username" autocomplete="username" disabled>
        <template #left-icon="slotProps">
          <icon-account :active="slotProps.active" :disabled="slotProps.disabled" />
        </template>
      </text-input>
      <raised-button disabled>Save</raised-button>
    </section>

    <section class="space-y-4">
      <h6>Change Email</h6>
      <p class="body-2 text-error">Not available yet!</p>
      <text-input v-model:value="email" placeholder="Email" autocomplete="email" disabled>
        <template #left-icon="slotProps">
          <icon-email :active="slotProps.active" :disabled="slotProps.disabled" />
        </template>
      </text-input>
      <raised-button disabled>Save</raised-button>
    </section>

    <section class="space-y-4">
      <h6>Delete Account</h6>
      <p class="body-2 text-error">Not available yet!</p>
      <p>
        Deleting your account is perminant and cannot be undone. Any data you've created or updated
        will be changed to "Deleted User", and cannot be changed back even if you recreate your
        account
      </p>
      <raised-button error disabled>Delete</raised-button>
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
