<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';

const { isExtensionInstalled, openPlayerSettings } = useExtensionStatus();

// Update account details every once in a while
if (!process.server) {
  const auth = useAuthStore();
  const { data: account } = useAccountQuery();
  watch(account, newAccount => {
    if (newAccount) auth.setAccount(newAccount.account);
  });
}
</script>

<template>
  <sidebar-layout>
    <template #side>
      <div class="space-y-8">
        <!-- Account menu -->
        <ul class="menu bg-base-300 p-2 rounded-box">
          <li class="menu-title"><span>Account Settings</span></li>
          <li>
            <nuxt-link to="/account"><span class="i-mdi-account text-xl" />Profile</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/account/security"
              ><span class="i-mdi-lock text-xl" />Security</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/account/api-clients"
              ><span class="i-mdi-graphql text-xl" />API Clients</nuxt-link
            >
          </li>
        </ul>

        <!-- Extension menu -->
        <ul class="menu bg-base-300 p-2 rounded-box">
          <li class="menu-title"><span>Extension</span></li>
          <li v-if="isExtensionInstalled">
            <span class="pointer-events-none bg-success bg-opacity-20 text-success"
              ><span class="i-mdi-check-circle text-xl" />Installed</span
            >
          </li>
          <li v-else>
            <span class="pointer-events-none bg-error bg-opacity-20 text-error"
              ><span class="i-mdi-close-circle text-xl" />Not Installed</span
            >
          </li>
          <li v-if="isExtensionInstalled">
            <button class="flex" @click="openPlayerSettings()">
              <span class="i-mdi-open-in-new text-xl" />
              <span class="truncate flex-1 text-left">Player Settings</span>
            </button>
          </li>
          <li v-else>
            <nuxt-link to="/get-started">
              <span class="i-mdi-arrow-right text-xl" />
              <span>Get Started</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </template>
    <template #content>
      <client-only>
        <nuxt-child />
      </client-only>
    </template>
  </sidebar-layout>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-primary bg-opacity-20 text-primary;
}
</style>
