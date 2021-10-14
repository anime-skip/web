<template>
  <section>
    <!-- pb, -mx, and child mx to prevent clipping with update button and input rings -->
    <loading-overlay :is-loading="isLoading" class="py-4 -my-4 -mx-2">
      <div class="space-y-4 mx-2">
        <h6>Change Password</h6>

        <text-input
          v-model:value="currentPassword"
          type="password"
          placeholder="Current password"
          autocomplete="current-password"
          :disabled="isLoading"
          @submit="changePassword()"
        >
          <template #left>
            <img class="input-icon" src="../../assets/ic_password.svg" />
          </template>
        </text-input>
        <text-input
          v-model:value="newPassword"
          type="password"
          placeholder="New password"
          autocomplete="password"
          :disabled="isLoading"
          @submit="changePassword()"
        >
          <template #left>
            <img class="input-icon" src="../../assets/ic_password.svg" />
          </template>
        </text-input>
        <text-input
          v-model:value="confirmNewPassword"
          type="password"
          placeholder="Retype new password"
          autocomplete="new-password"
          :disabled="isLoading"
          @submit="changePassword()"
        >
          <template #left>
            <img class="input-icon" src="../../assets/ic_password.svg" />
          </template>
        </text-input>

        <raised-button @click="changePassword()" :disabled="isLoading">Update</raised-button>

        <p v-if="errorMessage" class="text-error">{{ errorMessage }}</p>
        <p v-if="isSuccess" class="text-success">Password was changed successfully!</p>
      </div>
    </loading-overlay>
  </section>
</template>

<script lang="ts" setup>
import api from '@/api';
import { useRequestState } from '@/composition/request-state';
import { LocalStorageKeys, RequestState } from '@/utils/enums';
import { TextInput, RaisedButton, LoadingOverlay } from '@anime-skip/ui';
import { ref, watch } from 'vue';

const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const confirmNewPassword = ref<string>('');

const { tryCatch, errorMessage, isLoading, isSuccess } = useRequestState(
  RequestState.NOT_REQUESTED,
);
const changePassword = tryCatch(async () => {
  const { authToken, refreshToken } = await api.changePassword(
    `{
        authToken
        refreshToken
      }`,
    {
      oldPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    },
  );
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, authToken);
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
  currentPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
});
</script>
