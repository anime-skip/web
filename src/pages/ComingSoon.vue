<template>
  <div class="ComingSoon">
    <img class="banner" alt="Anime Skip Logo" src="../assets/banner.svg" />
    <p class="message">Coming soon!</p>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'ComingSoon'
});
</script>

<style lang="scss" scoped>
.ComingSoon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .banner {
    width: 50%;
    max-width: 800px;
    min-width: 360px;
  }

  .message {
    color: white;
    font-size: 20px;
    opacity: 0.24;
    position: absolute;
    bottom: 16px;
  }
}
</style>
