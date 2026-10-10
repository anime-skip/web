<script lang="ts" setup>
import useGqlCountsQuery from "../composables/useGqlCountsQuery";
import AnimatedNumber from "./AnimatedNumber.vue";

const { state: counts } = useGqlCountsQuery();
</script>

<template>
  <div
    class="bg-secondary/10 ring-secondary/50 divide-secondary/50 mt-8 flex h-20 divide-x rounded-lg ring ring-inset"
  >
    <div
      class="flex flex-1 flex-col items-center justify-center gap-1 text-center"
      :title="String(counts.shows)"
    >
      <p class="text-secondary text-xs font-bold">Shows</p>
      <p class="font-overpass text-2xl font-black">
        <AnimatedNumber :number="counts.shows" :duration="500" />
      </p>
    </div>
    <div
      class="flex flex-1 flex-col items-center justify-center gap-1 text-center"
      :title="String(counts.episodes)"
    >
      <p class="text-secondary text-xs font-bold">Episodes</p>
      <p class="font-overpass text-2xl font-black">
        <AnimatedNumber :number="counts.episodes" :duration="1000" />
      </p>
    </div>
    <div
      class="flex flex-1 flex-col items-center justify-center gap-1 text-center"
      :title="String(counts.timestamps)"
    >
      <p class="text-secondary text-xs font-bold">Timestamps</p>
      <p class="font-overpass text-2xl font-black">
        <AnimatedNumber :number="counts.timestamps" :duration="1500" />
      </p>
    </div>
  </div>
</template>
