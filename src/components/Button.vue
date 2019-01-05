<template>
  <button class="button" v-ripple="'rgba(255, 255, 255, 0.24)'" @click="click" :disabled="loading">
    <Spinner v-if="loading" />
    <span v-else>{{label}}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckboxSVG from '@/assets/CheckboxSVG.vue';
import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    CheckboxSVG,
    Spinner
  }
})
export default class Button extends Vue {
  @Prop() private label!: string;
  @Prop({ default: false }) private loading?: boolean;
  @Prop() private click!: (event: Event) => void;
}
</script>

<style lang="scss">
$height: 36px;
$paddingTop: 6px;

.button {
  min-height: $height;
  outline: none;
  box-sizing: border-box;
  border: none;
  background-color: $primary500;
  color: white;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  line-height: $height - $paddingTop * 2;
  cursor: pointer;
  padding: $paddingTop 16px;
  border-radius: 3px;
  &:hover {
    background-color: $primary400;
  }
}
</style>
