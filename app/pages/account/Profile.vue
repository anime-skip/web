<script setup lang="ts">
import { useHead } from "@unhead/vue";
import useGqlAccountQuery from "app/composables/useGqlAccountQuery";
import useGqlDeleteMyAccountMutation from "app/composables/useGqlDeleteMyAccountMutation";
import useGqlUpdateAccountMutation from "app/composables/useGqlUpdateAccountMutation";
import { getProfileUrl } from "app/utils/profile-utils";
import { computed, ref, watch } from "vue";

useHead({
  title: "Profile – Anime Skip",
});

const { data: account, isLoading } = useGqlAccountQuery();
const { mutate: deleteMyAccount, isPending: isDeleting } = useGqlDeleteMyAccountMutation();

const {
  mutate: updateAccount,
  isPending: isSaving,
  error: saveError,
  reset: resetSave,
} = useGqlUpdateAccountMutation();

const username = ref("");
const email = ref("");
const emailChangeNotice = ref(false);

watch(
  account,
  (value) => {
    if (!value) return;
    username.value = value.username;
    email.value = value.email;
  },
  { immediate: true },
);

const hasChanges = computed(
  () =>
    !!account.value &&
    (username.value.trim() !== account.value.username ||
      email.value.trim() !== account.value.email),
);

function onSaveSubmit() {
  if (!account.value) return;
  const emailChanged = email.value.trim() !== account.value.email;
  resetSave();
  emailChangeNotice.value = false;
  updateAccount(
    { username: username.value.trim(), email: email.value.trim() },
    { onSuccess: () => (emailChangeNotice.value = emailChanged) },
  );
}

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

        <form class="flex flex-1 flex-col gap-2" @submit.prevent="onSaveSubmit">
          <!-- Username -->
          <label class="input">
            <i class="i-heroicons-user" />
            <input v-model="username" required placeholder="Enter your username..." />
          </label>

          <!-- Email -->
          <div class="flex flex-col gap-1">
            <label class="input">
              <i class="i-heroicons-envelope" />
              <input v-model="email" type="email" required placeholder="Enter your email..." />
            </label>
            <p v-if="account.emailVerified" class="text-success flex items-center gap-1 text-xs">
              <i class="i-heroicons-check-circle size-3.5" />
              <span>Email verified</span>
            </p>
          </div>

          <p v-if="saveError" class="text-error text-sm">{{ saveError.message }}</p>
          <p v-if="emailChangeNotice" class="text-success text-sm">
            A verification email has been sent to your new email address.
          </p>

          <button
            type="submit"
            class="btn btn-primary self-start"
            :disabled="!hasChanges || isSaving"
          >
            <span v-if="isSaving" class="loading loading-spinner loading-sm" />
            <span>Save</span>
          </button>
        </form>
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
