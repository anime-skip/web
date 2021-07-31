<template>
  <div class="bg-primaryPalette-100 bg-opacity-0" :class="{ 'pointer-events-none': disabled }">
    <div
      class="h-12 flex items-center border-l-4 border-primary border-opacity-0 pl-4 pr-3 cursor-pointer transition-all subtitle-1 bg-on-surface bg-opacity-0 hover:bg-opacity-hover"
      :class="{
        'border-opacity-100': active,
      }"
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
    active: Boolean,
  },
});
</script>
