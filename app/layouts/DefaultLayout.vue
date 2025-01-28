<script setup lang="ts">
import MainNavigation from "../components/MainNavigation.vue";
import MainFooter from "../components/MainFooter.vue";
</script>

<template>
  <MainNavigation class="border-b border-neutral" />
  <main>
    <RouterView />
  </main>
  <MainFooter />
</template>
