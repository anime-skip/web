<script lang="ts" setup>
const { isExtensionInstalled, openPlayerSettings } = useExtensionStatus();
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
