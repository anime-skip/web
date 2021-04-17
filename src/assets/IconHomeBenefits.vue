<template>
  <svg viewBox="0 0 24 24">
    <path v-if="type === 'auto-skip'" d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />

    <path
      v-else-if="type === 'controls'"
      d="M3 18.34C3 18.34 4 7.09 7 3L12 4L11 7.09H9V14.25H10C12 11.18 16.14 10.06 18.64 11.18C21.94 12.71 21.64 17.32 18.64 19.36C16.24 21 9 22.43 3 18.34Z"
    />

    <path
      v-else-if="type === 'keyboard-shortcuts'"
      d="M6,16H18V18H6V16M6,13V15H2V13H6M7,15V13H10V15H7M11,15V13H13V15H11M14,15V13H17V15H14M18,15V13H22V15H18M2,10H5V12H2V10M19,12V10H22V12H19M18,12H16V10H18V12M8,12H6V10H8V12M12,12H9V10H12V12M15,12H13V10H15V12M2,9V7H4V9H2M5,9V7H7V9H5M8,9V7H10V9H8M11,9V7H13V9H11M14,9V7H16V9H14M17,9V7H22V9H17Z"
    />

    <path
      v-else-if="type === 'standardized-player'"
      d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type BenefitIcon = 'auto-skip' | 'controls' | 'keyboard-shortcuts' | 'standardized-player';

export default defineComponent({
  props: {
    type: { type: String as PropType<BenefitIcon>, required: true },
  },
});
</script>
