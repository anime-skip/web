<script setup lang="ts">
import MainFooter from "../components/MainFooter.vue";
import MainNavigation from "../components/MainNavigation.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <MainNavigation />
    <main id="prerenderer-target" class="mt-main-navigation flex grow flex-col">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
