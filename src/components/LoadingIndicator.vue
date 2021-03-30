<template>
  <div class="LoadingIndicator" :class="size">
    <div class="spinner-wrapper">
      <svg
        class="spinner"
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          cx="28"
          cy="28"
          r="25"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue';

export default defineComponent({
  props: {
    size: { type: String, default: 'medium' } as Prop<'small' | 'medium' | 'large'>,
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/theme.scss';

$offset: 177;
$duration: 2s;

.LoadingIndicator {
  position: relative;

  &.small {
    width: 32px;
    height: 32px;
  }

  &.medium {
    width: 64px;
    height: 64px;
  }

  &.large {
    width: 96px;
    height: 96px;
  }

  .spinner-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .spinner {
    animation: rotator $duration linear infinite;
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }

  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash $duration ease-in-out infinite, colors ($duration * 4) ease-in-out infinite;
  }

  @keyframes colors {
    0% {
      stroke: $secondary500;
    }
    50% {
      stroke: $primary500;
    }
    100% {
      stroke: $secondary500;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: $offset;
    }
    50% {
      stroke-dashoffset: $offset/4;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: $offset;
      transform: rotate(450deg);
    }
  }
}
</style>
