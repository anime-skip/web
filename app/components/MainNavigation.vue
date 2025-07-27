<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import useSession from "app/composables/useSession";
import { ref } from "vue";

const { session, logOut } = useSession();

const accountDropdownOpen = ref(false);
</script>

<template>
  <div class="flex fixed top-0 inset-x-0 z-10 bg-base border-b border-neutral">
    <div class="container flex items-center h-main-navigation">
      <!-- Home -->
      <RouterLink to="/" class="btn btn-ghost hover:transform-none shrink-0">
        <img alt="Logo" src="app/assets/logo-nav.svg" class="w-10" />
        <span
          class="hidden sm:block font-black font-overpass text-primary tracking-tighter text-2xl pt-1"
        >
          Anime Skip
        </span>
      </RouterLink>

      <!-- Get Started -->
      <RouterLink
        to="/get-started"
        class="btn btn-ghost shrink-0 hover:transform-none text-base-content font-medium text-lg"
      >
        <span class="">Get Started</span>
      </RouterLink>
      <div class="flex-1" />

      <!-- Account dropdown -->
      <div v-if="session" class="relative">
        <button
          class="btn btn-ghost pl-1.5 pr-0.5 gap-1"
          @click="accountDropdownOpen = !accountDropdownOpen"
        >
          <img :src="session.profileUrl" class="size-7 rounded-full" />
          <i
            class="i-heroicons-chevron-down-16-solid size-5 transition-transform rotate-0"
            :class="{
              'rotate-180': accountDropdownOpen,
            }"
          />
        </button>
        <div
          v-if="accountDropdownOpen"
          class="size-0 overflow-visible absolute right-0 bottom-0 transition-all starting:opacity-0 starting:-translate-y-10"
        >
          <ul class="bg-neutral rounded-lg absolute right-0 shadow-lg menu">
            <li>
              <RouterLink class="menu-item non-exact" to="/account">
                <i class="i-heroicons-user" />
                <span>Account</span>
              </RouterLink>
            </li>
            <li v-if="session.role === 'ADMIN'">
              <RouterLink class="menu-item non-exact" to="/admin">
                <i class="i-heroicons-cog-8-tooth" />
                <span>Admin</span>
              </RouterLink>
            </li>
            <li class="menu-divider" />
            <li>
              <button class="menu-item" @click="logOut">Logout</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Sign in button -->
      <RouterLink v-else to="/sign-in" class="btn btn-shadow shrink-0">
        Sign In
      </RouterLink>
    </div>
  </div>
</template>
