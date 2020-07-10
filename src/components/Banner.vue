<template>
  <div class="Banner">
    <img class="banner" alt="Anime Skip Logo" src="../assets/banner.svg" />
    <slot name="msg1" />
    <slot name="msg2" />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Banner'
});
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
