<script lang="ts" setup>
import Logo from '~~/assets/logo.svg';
</script>

<template>
  <div class="min-h-[90vh] flex flex-col px-8 lg:px-16">
    <div class="flex flex-1 items-center">
      <div
        class="w-full max-w-lg overflow-hidden lg:max-w-[54rem] mx-auto my-16 lg:flex lg:rounded-2xl lg:framing-shadow lg:min-h-[450px]"
      >
        <section
          class="hidden lg:flex bg-neutral bg-stars flex-1 flex-col items-center justify-center gap-8"
        >
          <img class="w-[50%]" :src="Logo" />
          <p class="font-stylized font-bold text-opacity-medium">watch more anime</p>
        </section>
        <section class="self-center flex-1">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-stars {
  background-image: url('~~/assets/bg-stars-small.svg');
  background-position: center;
  background-size: cover;
}
</style>
