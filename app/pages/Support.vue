<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import DocsLayout from "app/layouts/DocsLayout.vue";

import Support from "./Support.md";

useHead({
  title: "Support – Anime Skip",
});
</script>

<template>
  <DocsLayout>
    <Support />
  </DocsLayout>
</template>
