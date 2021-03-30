<template>
  <div class="root">
    <NavBar />
    <div class="child">
      <slot />
    </div>
    <SiteFooter class="footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default defineComponent({
  components: { NavBar, SiteFooter },
});
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.child {
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
