<script lang="ts" setup>
import { ExternalLinks } from '~~/utils/external-links';

defineProps<{
  to: keyof ExternalLinks;
  text: string;
}>();
</script>

<template>
  <nuxt-link :to="ExternalLinks[to]" target="_blank">{{ text }}</nuxt-link>
</template>
