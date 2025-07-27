<script setup lang="ts">
import useGqlChangePasswordMutation from "app/composables/useGqlChangePasswordMutation";
import { ref } from "vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Security – Anime Skip",
});

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const { mutate, isPending, error } = useGqlChangePasswordMutation({
  onSuccess: () => {
    alert("Password changed successfully!");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  },
});

const submit = () => {
  if (isPending.value) return;
  mutate({
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
    confirmNewPassword: confirmNewPassword.value,
  });
};
</script>

<template>
  <h1 class="font-overpass font-bold text-2xl">Change Password</h1>

  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <label class="flex flex-col gap-1">
      <p class="text-xs font-bold text-base-content/50">Current Password</p>
      <div class="input">
        <i class="i-heroicons-key" />
        <input
          type="password"
          autocomplete="current-password"
          placeholder="Enter current password..."
          required
          v-model="oldPassword"
        />
      </div>
    </label>

    <label class="flex flex-col gap-1">
      <p class="text-xs font-bold text-base-content/50">New Password</p>
      <div class="input">
        <i class="i-heroicons-key" />
        <input
          type="password"
          autocomplete="new-password"
          placeholder="Enter new password..."
          required
          v-model="newPassword"
        />
      </div>
    </label>

    <label class="flex flex-col gap-1">
      <p class="text-xs font-bold text-base-content/50">Confirm New Password</p>
      <div class="input">
        <i class="i-heroicons-key" />
        <input
          type="password"
          autocomplete="new-password"
          placeholder="Enter new password again..."
          required
          v-model="confirmNewPassword"
        />
      </div>
    </label>

    <button class="btn self-start" type="submit" :loading="isPending">
      {{ isPending ? "Changing..." : "Change" }}
    </button>
  </form>

  <div class="alert alert-error" v-if="error">
    <i class="i-heroicons-exclamation-circle" />
    <p>{{ error.message }}</p>
  </div>
</template>
