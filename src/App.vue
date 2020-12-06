<template>
  <NavBar />
  <router-view class="child" />
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
