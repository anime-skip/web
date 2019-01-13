<template>
  <button
    class="button"
    :class="flat === 'true' ? 'button--flat' : undefined" 
    v-ripple="flat === 'true' || white === 'true' ? undefined : 'rgba(255, 255, 255, 0.24)'"
    @click="onClick"
    :disabled="loading || disabled"
  >
    <Spinner v-if="loading" />
    <div :class="loading ? 'hidden' : undefined">
      <router-link v-if="link !== undefined" :to="link">{{label}}</router-link>
      <span v-else>{{label}}</span>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckboxSVG from '@/assets/CheckboxSVG.vue';
import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    CheckboxSVG,
    Spinner,
  },
})
export default class Button extends Vue {
  @Prop() private label!: string;
  @Prop({ default: false }) private loading?: boolean;
  @Prop() private click!: (event?: Event) => void;
  @Prop() private link?: string;
  @Prop() private flat?: 'true';
  @Prop() private white?: 'true';
  @Prop() private disabled?: boolean;

  public onClick(event: Event) {
    event.preventDefault();
    if (this.click) {
      this.click(event);
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  opacity: 0;
}
</style>

