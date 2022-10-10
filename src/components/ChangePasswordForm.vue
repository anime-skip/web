<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';

const { state, validation } = useChangePasswordForm();

const { mutate, isLoading, isError, error, isSuccess } = useChangePasswordMutation();
const errorMessage = useErrorMessage(error);

const auth = useAuthStore();

function changePassword() {
  if (validation.value.$error) {
    validation.value.$touch();
    return;
  }

  mutate(state, {
    onSuccess(data) {
      auth.setLoggedInDetails(data.changePassword);
      validation.value.$reset();
      state.oldPassword = '';
      state.newPassword = '';
      state.confirmNewPassword = '';
    },
  });
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="changePassword">
    <h2 class="font-stylized text-xl font-bold">Change Password</h2>

    <!-- Success alert -->
    <base-alert v-if="isSuccess" class="alert-success">
      <template #icon>
        <div class="i-mdi-check-circle text-xl" />
      </template>
      <template #default>
        <p class="font-bold">Password changed successfully</p>
      </template>
    </base-alert>

    <!-- Old password -->
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          :class="{ 'input-error': validation.oldPassword.$error }"
          type="password"
          placeholder="Current password"
          autocomplete="current-password"
          v-model="validation.oldPassword.$model"
        />
      </template>
      <template v-if="validation.oldPassword.$error" #labelBl>
        <span class="text-error">Password is required</span>
      </template>
    </base-input-group>

    <!-- New password -->
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          :class="{ 'input-error': validation.newPassword.$error }"
          type="password"
          placeholder="New password"
          autocomplete="new-password"
          v-model="validation.newPassword.$model"
        />
      </template>
      <template v-if="validation.newPassword.$error" #labelBl>
        <span class="text-error">New password is required</span>
      </template>
    </base-input-group>

    <!-- Confirm new password -->
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          :class="{ 'input-error': validation.confirmNewPassword.$error }"
          type="password"
          placeholder="Confirm new password"
          autocomplete="new-password"
          v-model="validation.confirmNewPassword.$model"
        />
      </template>
      <template v-if="validation.confirmNewPassword.$error" #labelBl>
        <span class="text-error">Passwords do not match</span>
      </template>
    </base-input-group>

    <!-- Error message -->
    <p v-if="isError" class="text-error text-sm">{{ errorMessage }}</p>

    <!-- Buttons -->
    <button
      class="btn btn-primary"
      :class="{ loading: isLoading }"
      :disabled="isLoading"
      type="submit"
    >
      Save
    </button>
  </form>
</template>
