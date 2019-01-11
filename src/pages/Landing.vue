<template>
  <div class="landing">
    <router-link to="/sign-in">Sign In</router-link>
    <router-link to="/sign-up">Sign Up</router-link>
    <p>Test</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';

@Component
export default class Landing extends Vue {

}
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
}
</style>
