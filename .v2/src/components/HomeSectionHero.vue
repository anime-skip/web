<script lang="ts" setup>
import BgStars from '~~/assets/bg-stars.svg';

const { data } = useCountsQuery();

const episodeCount = useNumberFormat(
  useNumberChangeAnimation(computed(() => data.value?.counts?.episodes ?? 0)),
  { useGrouping: true },
);
const showCount = useNumberFormat(
  useNumberChangeAnimation(computed(() => data.value?.counts?.shows ?? 0)),
  { useGrouping: true },
);
const timestampCount = useNumberFormat(
  useNumberChangeAnimation(computed(() => data.value?.counts?.timestamps ?? 0)),
  { useGrouping: true },
);

function scrollDown() {
  document.querySelector('#about-player')?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <section
    class="h-[85vh] relative bg-center bg-cover flex"
    :style="`background-image: url('${BgStars}')`"
  >
    <div class="w-full h-full flex flex-col items-center justify-center gap-12 px-4">
      <!-- Header -->
      <h1 class="text-5xl font-stylized font-bold text-center text-primary">Watch More Anime</h1>
      <p class="text-xl max-w-screen-sm text-center">
        Skip intros, outros, and more using the
        <strong>largest community driven timestamp database</strong>
      </p>

      <!-- Model Counts -->
      <div
        class="flex items-center framing-shadow bg-base-100 py-4 rounded-md divide-x divide-base-content divide-opacity-30"
      >
        <div class="flex flex-col items-center px-8">
          <p class="font-stylized font-bold text-primary">{{ showCount }}</p>
          <p class="uppercase text-sm">shows</p>
        </div>
        <div class="flex flex-col items-center px-8">
          <p class="font-stylized font-bold text-primary">{{ episodeCount }}</p>
          <p class="uppercase text-sm">episodes</p>
        </div>
        <div class="flex flex-col items-center px-8">
          <p class="font-stylized font-bold text-primary">{{ timestampCount }}</p>
          <p class="uppercase text-sm">timestamps</p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-12 items-center justify-center">
        <nuxt-link to="#about-player" @click="scrollDown" class="btn">Learn More</nuxt-link>
        <nuxt-link to="/get-started" class="btn btn-primary gap-2"
          >Get Started<span class="i-mdi:arrow-right text-2xl"
        /></nuxt-link>
      </div>
    </div>
  </section>
</template>
