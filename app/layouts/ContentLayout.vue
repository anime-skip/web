<script setup lang="ts">
import DefaultLayout from "./DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center">
      <div class="flex w-full max-w-256 flex-col">
        <slot />
      </div>
    </div>
  </DefaultLayout>
</template>
