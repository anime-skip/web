<script lang="ts" setup>
import BgStars from '~~/assets/bg-stars.svg';
</script>

<template>
  <section
    class="bg-base-300 h-[85vh] relative bg-center bg-cover flex"
    :style="`background-image: url('${BgStars}')`"
  >
    <p class="m-auto">Test</p>
  </section>
</template>
