<template>
  <div class="bg-primaryPalette-100 bg-opacity-0" :class="{ 'pointer-events-none': disabled }">
    <div
      class="h-10 flex items-center border-l-4 border-primary border-opacity-0 hover:border-opacity-low pl-4 pr-3 cursor-pointer transition-all subtitle-1"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    disabled: Boolean,
  },
});
</script>
