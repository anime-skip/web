<script setup lang="ts">
import DefaultLayout from "./DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto flex w-full max-w-7xl flex-col">
      <slot />
    </div>
  </DefaultLayout>
</template>
