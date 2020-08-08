<template>
  <div class="ComingSoon">
    <Banner class="Banner">
      <p class="message">Coming soon!</p>
    </Banner>
    <p class="alpha-testers">
      Alpha testers, please
      <router-link to="/sign-up">sign up</router-link>
      to get started
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Banner from '@/components/Banner.vue';

export default defineComponent({
  name: 'ComingSoon',
  components: { Banner },
});
</script>

<style lang="scss" scoped>
.ComingSoon {
  height: 100%;
  display: flex;
  flex-direction: column;

  .Banner {
    flex-grow: 1;
  }

  .message {
    color: rgba($color: #ffffff, $alpha: 0.36);
    font-size: 20px;
    margin-top: 32px;
  }

  .alpha-testers {
    align-self: center;
    margin-bottom: 16px;
    color: rgba($color: #ffffff, $alpha: 0.36);
  }
}
</style>
