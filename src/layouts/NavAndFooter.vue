<template>
  <div class="flex flex-col min-h-screen">
    <nav-bar class="fixed left-0 top-0 right-0 z-10" :items="items" />
    <div class="flex-grow flex-shrink-0">
      <slot />
    </div>
    <SiteFooter class="footer" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { NavBar } from '@anime-skip/ui';

export default defineComponent({
  components: { NavBar, SiteFooter },
  setup() {
    const items = computed(() => []);

    return {
      items,
    };
  },
});
</script>
