<template>
  <sidebar-layout>
    <template #side>
      <ul class="menu bg-base-300 p-2 rounded-box">
        <li class="menu-title"><span>Account Settings</span></li>
        <li>
          <nuxt-link to="/account"><span class="i-mdi-account text-xl" />Profile</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/security"><span class="i-mdi-lock text-xl" />Security</nuxt-link>
        </li>
      </ul>
    </template>
    <template #content>
      <nuxt-child />
    </template>
  </sidebar-layout>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-primary bg-opacity-20 text-primary;
}
</style>
