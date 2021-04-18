<template>
  <div class="flex flex-col w-full space-y-3 items-start">
    <h4>Forgot Password</h4>
    <p class="body-1 text-error">Recovering a forgotten password is not available yet</p>
    <p class="body-1 text-error">Check out the support page to get help</p>
    <flat-button>
      <router-link to="/support">Support</router-link>
    </flat-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FlatButton } from '@anime-skip/ui';

export default defineComponent({
  components: {
    FlatButton,
  },
});
</script>
