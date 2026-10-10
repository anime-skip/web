<script setup lang="ts">
import { useHead } from "@unhead/vue";
import DefaultLayout from "app/layouts/DefaultLayout.vue";

useHead({
  title: "Not Found – Anime Skip",
});
</script>

<template>
  <DefaultLayout>
    <div class="m-auto p-8">
      <h2 class="font-overpass text-error text-3xl font-black">404 Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  </DefaultLayout>
</template>
