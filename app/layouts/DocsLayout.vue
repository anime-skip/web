<script setup lang="ts">
import DefaultLayout from "./DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col items-center">
      <div class="container p-8 prose lg:prose-xl prose-invert">
        <slot />
      </div>
    </div>
  </DefaultLayout>
</template>
