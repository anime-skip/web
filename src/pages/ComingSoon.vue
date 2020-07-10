<template>
  <Banner class="ComingSoon">
    <p slot="msg1" class="message">Coming soon!</p>
  </Banner>
</template>

<script>
import Vue from 'vue';
import Banner from '@/components/Banner.vue';

export default Vue.extend({
  name: 'ComingSoon',
  components: { Banner }
});
</script>

<style lang="scss" scoped>
.ComingSoon {
  height: 100%;

  .message {
    color: rgba($color: #ffffff, $alpha: 0.36);
    font-size: 20px;
    margin-top: 32px;
  }
}
</style>
