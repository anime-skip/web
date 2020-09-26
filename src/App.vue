<template>
  <div id="app">
    <NavBar />
    <div class="child">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
});
</script>

<style lang="scss">
#app {
  height: 100%;
  position: relative;

  .child {
    position: absolute;
    left: 0;
    right: 0;
    top: $navBarHeight;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
}
</style>
