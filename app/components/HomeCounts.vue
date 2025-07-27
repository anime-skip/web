<script lang="ts" setup>
import useGqlCountsQuery from "../composables/useGqlCountsQuery";
import AnimatedNumber from "./AnimatedNumber.vue";

const { state: counts } = useGqlCountsQuery();
</script>

<template>
  <div
    class="h-20 bg-secondary/10 mt-8 rounded-lg ring ring-inset ring-secondary/50 flex divide-x divide-secondary/50"
  >
    <div
      class="flex-1 text-center flex flex-col items-center justify-center gap-1"
      :title="String(counts.shows)"
    >
      <p class="text-xs text-secondary font-bold">Shows</p>
      <p class="font-overpass font-black text-2xl">
        <AnimatedNumber :number="counts.shows" :duration="500" />
      </p>
    </div>
    <div
      class="flex-1 text-center flex flex-col items-center justify-center gap-1"
      :title="String(counts.episodes)"
    >
      <p class="text-xs text-secondary font-bold">Episodes</p>
      <p class="font-overpass font-black text-2xl">
        <AnimatedNumber :number="counts.episodes" :duration="1000" />
      </p>
    </div>
    <div
      class="flex-1 text-center flex flex-col items-center justify-center gap-1"
      :title="String(counts.timestamps)"
    >
      <p class="text-xs text-secondary font-bold">Timestamps</p>
      <p class="font-overpass font-black text-2xl">
        <AnimatedNumber :number="counts.timestamps" :duration="1500" />
      </p>
    </div>
  </div>
</template>
