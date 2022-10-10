<script lang="ts" setup>
import LogoNav from '~~/assets/logo-nav.svg';
import { useAuthStore } from '~~/stores/useAuthStore';

const auth = useAuthStore();

const searchText = ref('');
function search() {
  navigateTo({ path: '/search', query: { q: searchText.value } });
  searchText.value = '';
}

const profileUrl = useProfileUrl();

const drawerOpen = ref(false);
function closeDrawer() {
  drawerOpen.value = false;
}
</script>

<template>
  <div class="drawer">
    <input id="default-drawer" v-model="drawerOpen" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Page content here -->
      <div class="min-h-screen flex flex-col mt-20">
        <div class="flex-grow">
          <slot />
        </div>
        <site-footer />
      </div>

      <!-- Navbar -->
      <div class="w-full h-[5rem] navbar bg-base-300 fixed inset-x-0 top-0 px-4">
        <div class="flex-none lg:hidden">
          <label for="default-drawer" class="btn btn-square btn-ghost">
            <div class="i-mdi-menu text-2xl inline-block w-6 h-6 stroke-current" />
          </label>
        </div>
        <div class="flex-1 gap-2">
          <nuxt-link class="px-2 mx-2 flex items-center gap-4" to="/">
            <img :src="LogoNav" alt="Simple Anime Skip logo" class="h-6" />
            <span class="font-stylized text-2xl font-bold truncate text-clip">Anime Skip</span>
          </nuxt-link>
          <ul class="hidden lg:flex menu menu-horizontal p-2 rounded-box">
            <li><nuxt-link to="/get-started">Get Started</nuxt-link></li>
          </ul>
        </div>
        <div class="flex-none flex gap-4">
          <form class="hidden lg:block" @submit.prevent="search">
            <input
              class="input input-bordered focus:input-primary min-w-0 w-64"
              v-model="searchText"
              placeholder="Search Shows & Episodes..."
            />
          </form>
          <div v-if="auth.account" class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full" :title="auth.account.username">
                <img :src="profileUrl" class="w-12 h-12" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu md:menu-compact dropdown-content bg-neutral rounded-box w-52"
            >
              <li class="menu-title">
                <span>{{ auth.account.username }}</span>
              </li>
              <li><nuxt-link to="/account">Account</nuxt-link></li>
              <li><nuxt-link to="/logout">Logout</nuxt-link></li>
            </ul>
          </div>
          <template v-else>
            <nuxt-link to="/sign-up" class="btn btn-primary hidden lg:flex">Sign Up</nuxt-link>
            <nuxt-link to="/login" class="btn btn-primary btn-outline">Login</nuxt-link>
          </template>
        </div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="default-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto gap-2 w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li>
          <nuxt-link to="/" class="font-stylized text-2xl mx-auto" @click="closeDrawer"
            >Anime Skip</nuxt-link
          >
        </li>
        <li><nuxt-link to="/get-started" @click="closeDrawer">Get Started</nuxt-link></li>
        <li><nuxt-link to="/search" @click="closeDrawer">Search</nuxt-link></li>
        <template v-if="!auth.account">
          <li class="divide-y" />
          <nuxt-link to="/sign-up" class="btn btn-primary" @click="closeDrawer">Sign Up</nuxt-link>
          <nuxt-link to="/login" class="btn btn-primary btn-outline" @click="closeDrawer"
            >Log In</nuxt-link
          >
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
li a.router-link-exact-active {
  @apply bg-primary bg-opacity-20 text-primary;
}
</style>
