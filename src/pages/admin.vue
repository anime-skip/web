<script lang="ts" setup>
definePageMeta({ layout: 'full-width' });
</script>

<template>
  <div class="flex relative h-full">
    <nav class="shrink-0 sticky top-20 self-start w-64">
      <ul class="menu rounded-box gap-2 p-2">
        <li class="menu-title"><span>Admin</span></li>
        <li><nuxt-link to="/admin/user-reports">User Reports</nuxt-link></li>
        <li><nuxt-link to="/admin/validation-errors">Validation Errors</nuxt-link></li>
      </ul>
    </nav>
    <div class="w-px bg-base-content bg-opacity-20 shrink-0" />
    <main class="flex-1 overflow-x-auto">
      <nuxt-child />
    </main>
  </div>
</template>

<style scoped>
li a.router-link-active {
  @apply bg-primary bg-opacity-20 text-primary;
}
</style>
