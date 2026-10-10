<script setup lang="ts">
import useSession from "app/composables/useSession";
import { ref } from "vue";

const { session, logOut } = useSession();

const accountDropdownOpen = ref(false);
</script>

<template>
  <div class="bg-base border-neutral fixed inset-x-0 top-0 z-10 flex border-b">
    <div class="h-main-navigation mx-auto flex w-full max-w-7xl items-stretch px-4 py-2">
      <!-- Home -->
      <RouterLink to="/" class="btn btn-ghost h-full shrink-0 hover:transform-none">
        <img alt="Logo" src="app/assets/logo-nav.svg" class="w-10" />
        <span
          class="font-overpass text-primary hidden pt-1 text-2xl font-black tracking-tighter sm:block"
        >
          Anime Skip
        </span>
      </RouterLink>

      <!-- Get Started -->
      <RouterLink
        to="/get-started"
        class="btn btn-ghost text-base-content h-full shrink-0 text-lg font-medium hover:transform-none"
      >
        <span class="">Get Started</span>
      </RouterLink>
      <div class="flex-1" />

      <!-- Account dropdown -->
      <div v-if="session" class="relative h-full">
        <button
          class="btn btn-ghost h-full gap-1 pr-1.5 pl-2.5"
          @click="accountDropdownOpen = !accountDropdownOpen"
        >
          <img :src="session.profileUrl" class="size-7 rounded-full" />
          <i
            class="i-heroicons-chevron-down-16-solid size-5 rotate-0 transition-transform"
            :class="{
              'rotate-180': accountDropdownOpen,
            }"
          />
        </button>
        <div
          v-if="accountDropdownOpen"
          class="absolute right-0 bottom-0 size-0 overflow-visible transition-all starting:-translate-y-10 starting:opacity-0"
        >
          <ul class="bg-neutral menu absolute right-0 rounded-lg shadow-lg">
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
      <RouterLink v-else to="/sign-in" class="btn btn-shadow shrink-0"> Sign In </RouterLink>
    </div>
  </div>
</template>
