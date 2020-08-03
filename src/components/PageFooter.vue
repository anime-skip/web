<template>
  <div class="PageFooter">
    <p v-if="showReCaptchaMessage" class="recaptcha">
      This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    showReCaptchaMessage: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.PageFooter {
  padding: 24px;

  .recaptcha {
    color: rgba(255, 255, 255, 0.48);

    * {
      color: rgba(255, 255, 255, 0.48);
    }
  }
}
</style>
