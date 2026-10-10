<script setup lang="ts">
import DefaultLayout from "./DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center">
      <div class="prose prose-invert w-full max-w-7xl p-8">
        <slot />
      </div>
    </div>
  </DefaultLayout>
</template>
