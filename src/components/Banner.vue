<template>
  <div class="Banner">
    <img class="banner" alt="Anime Skip Logo" src="../assets/banner.svg" />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.Banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .banner {
    width: 50%;
    max-width: 800px;
    min-width: 360px;
  }
}
</style>
