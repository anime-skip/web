<script setup lang="ts">
import MainNavigation from "../components/MainNavigation.vue";
import MainFooter from "../components/MainFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <MainNavigation />
    <main
      id="prerenderer-target"
      class="mt-main-navigation flex-grow-1 flex flex-col"
    >
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
