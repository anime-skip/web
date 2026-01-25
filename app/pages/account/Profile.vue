<script setup lang="ts">
import useGqlAccountQuery from "app/composables/useGqlAccountQuery";
import useGqlDeleteMyAccountMutation from "app/composables/useGqlDeleteMyAccountMutation";
import { useHead } from "@unhead/vue";

useHead({
  title: "Profile – Anime Skip",
});

const { data: account, isLoading } = useGqlAccountQuery();
const { mutate: deleteMyAccount, isPending: isDeleting } =
  useGqlDeleteMyAccountMutation();

function onDeleteClick() {
  const confirmed = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone.",
  );
  if (confirmed) {
    deleteMyAccount();
  }
}
</script>

<template>
  <h1 class="font-overpass font-bold text-2xl">Profile Settings</h1>

  <div class="alert">
    <i class="i-heroicons-information-circle size-5" />
    <p>
      Coming soon. For now, you can send an email to support to update your
      profile.
    </p>
  </div>

  <!-- Loading Skeleton -->
  <div v-if="isLoading" class="flex flex-col md:flex-row gap-4">
    <div
      class="relative aspect-square w-full max-w-48 self-center md:w-[unset] md:max-w-[unset] md:self-auto animate-pulse bg-base-content/5 rounded-lg"
    />
    <div class="flex-1 flex flex-col gap-2">
      <div class="h-10.5 rounded-lg animate-pulse bg-base-content/5" />
      <div class="h-10.5 rounded-lg animate-pulse bg-base-content/5" />
      <div class="h-10.5 rounded-lg animate-pulse bg-base-content/5" />
    </div>
  </div>

  <div v-else-if="account" class="flex flex-col md:flex-row gap-4">
    <!-- Profile Picture -->
    <div
      class="relative aspect-square w-full max-w-48 self-center md:w-[unset] md:max-w-[unset] md:self-auto"
    >
      <img
        class="rounded-lg absolute inset-0 size-full"
        :src="account.profileUrl"
        alt="Profile Picture"
      />
    </div>

    <div class="flex-1 flex flex-col gap-2">
      <!-- Username -->
      <label class="input">
        <i class="i-heroicons-user" />
        <input
          disabled
          v-model="account.username"
          placeholder="Enter your username..."
        />
      </label>

      <!-- Email -->
      <label class="input">
        <i class="i-heroicons-envelope" />
        <input
          disabled
          v-model="account.email"
          placeholder="Enter your email..."
        />
      </label>
    </div>
  </div>

  <button
    class="btn btn-outline btn-error"
    :disabled="isDeleting"
    @click="onDeleteClick"
  >
    <span v-if="isDeleting" class="loading loading-spinner loading-sm" />
    <i v-else class="i-heroicons-trash size-5" />
    <span>Delete Account</span>
  </button>
</template>
