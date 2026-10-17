<script setup lang="ts">
import { useHead } from "@unhead/vue";
import useGqlAccountQuery from "app/composables/useGqlAccountQuery";
import useGqlDeleteMyAccountMutation from "app/composables/useGqlDeleteMyAccountMutation";
import { getProfileUrl } from "app/utils/profile-utils";

useHead({
  title: "Profile – Anime Skip",
});

const { data: account, isLoading } = useGqlAccountQuery();
const { mutate: deleteMyAccount, isPending: isDeleting } = useGqlDeleteMyAccountMutation();

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
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="font-overpass text-2xl font-bold">Profile Settings</h1>

      <div class="alert">
        <i class="i-heroicons-information-circle size-5" />
        <p>Coming soon. For now, you can send an email to support to update your profile.</p>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="flex flex-col gap-4 md:flex-row">
        <div
          class="bg-base-content/5 relative aspect-square w-full max-w-48 animate-pulse self-center rounded-lg md:w-[unset] md:max-w-[unset] md:self-auto"
        />
        <div class="flex flex-1 flex-col gap-2">
          <div class="bg-base-content/5 h-10.5 animate-pulse rounded-lg" />
          <div class="bg-base-content/5 h-10.5 animate-pulse rounded-lg" />
          <div class="bg-base-content/5 h-10.5 animate-pulse rounded-lg" />
        </div>
      </div>

      <div v-else-if="account" class="flex flex-col gap-4 md:flex-row">
        <!-- Profile Picture -->
        <div
          class="relative aspect-square w-full max-w-48 self-center md:w-[unset] md:max-w-[unset] md:self-auto"
        >
          <img
            class="absolute inset-0 size-full rounded-lg"
            :src="getProfileUrl(account.profileUrl)"
            alt="Profile Picture"
          />
        </div>

        <div class="flex flex-1 flex-col gap-2">
          <!-- Username -->
          <label class="input">
            <i class="i-heroicons-user" />
            <input disabled v-model="account.username" placeholder="Enter your username..." />
          </label>

          <!-- Email -->
          <label class="input">
            <i class="i-heroicons-envelope" />
            <input disabled v-model="account.email" placeholder="Enter your email..." />
          </label>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="font-overpass text-xl font-bold">Delete Account</h2>

      <button class="btn btn-outline btn-error" :disabled="isDeleting" @click="onDeleteClick">
        <span v-if="isDeleting" class="loading loading-spinner loading-sm" />
        <i v-else class="i-heroicons-trash size-5" />
        <span>Delete Account</span>
      </button>
    </div>
  </div>
</template>
