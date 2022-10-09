<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';

const auth = useAuthStore();

const profileUrl = useProfileUrl();
</script>

<template>
  <form class="space-y-4" @submit.prevent>
    <h1 class="font-stylized text-3xl font-bold flex items-start gap-2">
      Profile Settings
      <span class="badge badge-primary">Coming soon</span>
    </h1>

    <div class="flex gap-8">
      <img class="w-48 h-48 rounded-lg" :src="profileUrl" alt="Profile picture" />
      <div class="space-y-2 flex-1">
        <base-input-group>
          <template #left><div class="i-mdi-account text-xl" /></template>
          <template #default>
            <input
              class="input input-bordered focus:input-primary w-full"
              placeholder="Username"
              :value="auth.account.username"
              disabled
            />
          </template>
        </base-input-group>
        <base-input-group>
          <template #left><div class="i-mdi-email text-xl" /></template>
          <template #default>
            <input
              class="input input-bordered focus:input-primary w-full"
              placeholder="Email"
              :value="auth.account.email"
              disabled
            />
          </template>
        </base-input-group>
        <base-input-group>
          <template #left><div class="i-mdi-account-circle text-xl" /></template>
          <template #default>
            <input
              class="input input-bordered focus:input-primary w-full"
              placeholder="Profile URL"
              :value="auth.account.profileUrl"
              disabled
            />
          </template>
        </base-input-group>
        <button class="btn btn-primary" type="submit" disabled>Save Changes</button>
      </div>
    </div>
  </form>
</template>
