<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import useGqlCountsQuery from "../composables/useGqlCountsQuery";
import HomeCounts from "./HomeCounts.vue";
import { computed } from "vue";
import ClientOnly from "./ClientOnly.vue";

const { state: counts } = useGqlCountsQuery();
const formatter = Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
});
const showCount = computed(() => formatter.format(counts.value.shows));
const episodeCount = computed(() => formatter.format(counts.value.episodes));
const timestampCount = computed(() =>
  formatter.format(counts.value.timestamps),
);

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
  <section class="flex px-8 relative overflow-clip lg:h-[80vh]">
    <div class="flex pt-8 flex-col lg:flex-row container gap-8 lg:gap-20">
      <div
        class="w-full lg:w-[40%] flex flex-col justify-center relative lg:shrink-0"
      >
        <h2
          class="text-base-content text-3xl lg:text-4xl font-bold font-overpass leading-relaxed"
        >
          The best way to watch anime.
        </h2>
        <h3 class="text-base-content font-stretch-expanded font-light mt-2">
          Powered by the largest community timestamp database, Anime Skip
          automatically skips the parts of episodes you don't want to watch.
        </h3>
        <HomeCounts />
        <div
          class="flex items-center justify-center lg:justify-start gap-4 mt-8 lg:mb-16"
        >
          <RouterLink to="/get-started" class="btn btn-lg btn-shadow">
            <span>Get Started</span>
            <span class="i-heroicons-arrow-right size-5" />
          </RouterLink>
          <button class="btn btn-lg btn-ghost" @click="scrollToFeatures">
            See all features
          </button>
        </div>
      </div>
      <div
        class="-mx-8 -mb-8 pb-4 lg:m-0 lg:pb-0 lg:flex-1 lg:h-full lg:translate-y-8"
      >
        <img
          alt="Video player preview"
          src="app/assets/hero-monitor-title.svg"
          class="w-full h-30vh block max-w-none min-w-none lg:w-auto lg:h-full lg:min-w-full"
        />
      </div>
    </div>
  </section>
</template>
