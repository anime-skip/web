<template>
  <div class="spinner">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckboxSVG from '@/assets/CheckboxSVG.vue';

@Component({
  components: {
    CheckboxSVG,
  },
})
export default class Spinner extends Vue {
}
</script>

<style lang="scss">
$size: 6px;
$height: $size * 2;
$duration: 750ms;

.spinner {
  height: $height;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: $size $size $size $size;
  grid-column-gap: $size;
  align-items: center;
  &>* {
    width: $size;
    height: $size;
    background-color: white;
    border-radius: $size/2;
  }
  .one {
    animation: updown-1 $duration infinite;
  }
  .two {
    animation: updown-2 $duration infinite;
  }
  .three {
    animation: updown-3 $duration infinite;
  }
  .four {
    animation: updown-4 $duration infinite;
  }
}

@keyframes updown-1 {
  0%  { 
    opacity: 0.85;
  }
  16% {
    height: $height;
    opacity: 1.00;
  }
  33% { 
    opacity: 0.85;
  }
  67% { 
    height: $size; 
    opacity: 0.48;
  }
}

@keyframes updown-2 {
  25%  {
    opacity: 0.85;
  }
  41% {
    height: $height;
    opacity: 1.00;
  }
  58% {
    opacity: 0.85;
  }
  92% { 
    height: $size; 
    opacity: 0.48;
  }
}

@keyframes updown-3 {
  17% { 
    height: $size; 
    opacity: 0.48;
  }
  50%  {
    opacity: 0.85;
  }
  66% {
    height: $height;
    opacity: 1.00;
  }
  83% {
    opacity: 0.85;
  }
}

@keyframes updown-4 {
  8% {
    opacity: 0.85;
  }
  42% {
    height: $size; 
    opacity: 0.48;
  }
  75%  {
    opacity: 0.85;
  }
  91% {
    height: $height;
    opacity: 1.00;
  }
}
</style>
