<template>
  <NavBar />
  <div class="child">
    <router-view />
  </div>
  <SiteFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default defineComponent({
  components: { NavBar, SiteFooter },
});
</script>

<style lang="scss">
@import '@/scss/theme.scss';

#app {
  height: 100%;

  .child {
    margin-top: $navBarHeight;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
