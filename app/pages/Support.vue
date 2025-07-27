<script lang="ts" setup>
import DocsLayout from "app/layouts/DocsLayout.vue";
import Support from "./Support.md";
import { useHead } from "@unhead/vue";

useHead({
  title: "Support – Anime Skip",
});
</script>

<template>
  <DocsLayout>
    <Support />
  </DocsLayout>
</template>
