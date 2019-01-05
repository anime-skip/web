<template>
  <svg class="checkbox-svg" :class='currentStyle' width="24" height="24" viewBox="0 0 24 24">
    <rect
      class="outline"
      stroke="rgba(0, 0, 0, 0.24)"
      fill="transparent"
      x="3.5" y="3.5"
      width="17" height="17"
      rx="1.5"
    />
    <rect
      class="fill"
      :fill="color"
      x="3" y="3"
      width="18" height="18"
      rx="2"
    />
    <path
      class="check"
      fill="white"
      d="M17.2599 9.53554C17.6504 9.14501 17.6504 8.51185 17.2599 8.12132C16.8694 7.7308 16.2362 7.7308 15.8457 8.12132L10.1888 13.7782L8.06752 11.6569C7.677 11.2663 7.04383 11.2663 6.65331 11.6569C6.26278 12.0474 6.26278 12.6805 6.65331 13.0711L9.48173 15.8995C9.87226 16.29 10.5054 16.29 10.8959 15.8995L17.2599 9.53554Z"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CheckboxSVG extends Vue {
  @Prop() public color!: string;
  @Prop() public down!: boolean;
  @Prop() public checked!: boolean;

  public get currentStyle(): string {
    const klass = [this.down ? 'down' : ''];
    klass.push(this.checked ? 'checked' : 'unchecked');
    return klass.join(' ');
  }
}
</script>

<style lang="scss">
$transitionMs: 100ms;

.checkbox-svg {
  * {
    transition: $transitionMs;
    transform-origin: center;
  }
  .fill {
    transform: scale(0, 0);
  }
  .check {
    transition-delay: $transitionMs / 2;
    opacity: 0;
  }
}

.checkbox-svg.down, .checkbox-svg.checked {
  .outline {
    transform: scale(0.9, 0.9);
  }
  .fill {
    transform: scale(1.0, 1.0);
  }
  .check {
    opacity: 1.0;
  }
}

</style>
