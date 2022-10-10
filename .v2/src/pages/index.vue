<script lang="ts" setup>
useHead({
  title: 'Anime Skip',
});

useApiClient();
</script>

<template>
  <main>
    <home-section-hero class="odd:bg-base-300" />
    <home-section-about-player class="odd:bg-base-300" />
    <home-section-supported-services-list class="odd:bg-base-300" />
    <home-section-recently-added class="odd:bg-base-300" />
    <home-section-about-api class="odd:bg-base-300" />
  </main>
</template>
