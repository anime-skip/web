<template>
  <div class="flex flex-col w-full space-y-4 items-start">
    <h4>Forgot Password</h4>
    <p class="body-2 text-error pb-2">
      Recovering a forgotten password is not available yet. Check out the support page to get help
    </p>
    <raised-button link="/support">Support</raised-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RaisedButton } from '@anime-skip/ui';

export default defineComponent({
  components: {
    RaisedButton,
  },
});
</script>
