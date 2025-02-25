<script setup lang="ts">
import { isPrerendering } from "@aklinker1/aframe/app";

const visible = !isPrerendering();
</script>

<template>
  <slot v-if="visible" />
  <slot v-else name="fallback" />
</template>
