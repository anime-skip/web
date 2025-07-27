<script setup lang="ts">
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Not Found – Anime Skip",
});
</script>

<template>
  <DefaultLayout>
    <div class="m-auto p-8">
      <h2 class="text-3xl font-black font-overpass text-error">
        404 Not Found
      </h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  </DefaultLayout>
</template>
