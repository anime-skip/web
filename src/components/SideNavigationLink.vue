<template>
  <div>
    <router-link
      class="h-10 flex items-center border-l-4 border-primary border-opacity-0 hover:border-opacity-low pl-4 pr-3 transition-all subtitle-1"
      :to="to"
    >
      <slot />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    to: { type: String, required: true, default: '?' },
  },
});
</script>

<style scoped>
.router-link-exact-active {
  @apply border-opacity-100;
}
</style>
