<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import useGqlCountsQuery from "../composables/useGqlCountsQuery";
import ClientOnly from "./ClientOnly.vue";
import HomeCounts from "./HomeCounts.vue";

const { state: counts } = useGqlCountsQuery();
const formatter = Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
});
const showCount = computed(() => formatter.format(counts.value.shows));
const episodeCount = computed(() => formatter.format(counts.value.episodes));
const timestampCount = computed(() => formatter.format(counts.value.timestamps));

const router = useRouter();
function scrollToFeatures() {
  document.scrollingElement!.scrollTo({
    top: document.getElementById("features")!.getBoundingClientRect().top - 100,
    behavior: "smooth",
  });
  router.replace("#features");
}
</script>

<template>
  <section class="relative flex overflow-clip px-8 lg:h-[80vh]">
    <div class="container flex flex-col gap-8 pt-8 lg:flex-row lg:gap-20">
      <div class="relative flex w-full flex-col justify-center lg:w-[40%] lg:shrink-0">
        <h2 class="text-base-content font-overpass text-3xl leading-relaxed font-bold lg:text-4xl">
          The best way to watch anime.
        </h2>
        <h3 class="text-base-content mt-2 font-light font-stretch-expanded">
          Powered by the largest community timestamp database, Anime Skip automatically skips the
          parts of episodes you don't want to watch.
        </h3>
        <HomeCounts />
        <div class="mt-8 flex items-center justify-center gap-4 lg:mb-16 lg:justify-start">
          <RouterLink to="/get-started" class="btn btn-lg btn-shadow">
            <span>Get Started</span>
            <span class="i-heroicons-arrow-right size-5" />
          </RouterLink>
          <button class="btn btn-lg btn-ghost" @click="scrollToFeatures">See all features</button>
        </div>
      </div>
      <div class="-mx-8 -mb-8 pb-4 lg:m-0 lg:h-full lg:flex-1 lg:translate-y-8 lg:pb-0">
        <img
          alt="Video player preview"
          src="app/assets/hero-monitor-title.svg"
          class="h-30vh min-w-none block w-full max-w-none lg:h-full lg:w-auto lg:min-w-full"
        />
      </div>
    </div>
  </section>
</template>
