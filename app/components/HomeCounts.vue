<script lang="ts" setup>
import useGqlCountsQuery from "../composables/useGqlCountsQuery";
import { computed } from "vue";

const { state: counts } = useGqlCountsQuery();
const formatter = Intl.NumberFormat(undefined, {
    // Uncomment to enable X.XK format
    // notation: "compact",
    // maximumFractionDigits: 1,
});
const showCount = computed(() => formatter.format(counts.value.shows));
const episodeCount = computed(() => formatter.format(counts.value.episodes));
const timestampCount = computed(() =>
    formatter.format(counts.value.timestamps),
);
</script>

<template>
    <div
        class="h-20 bg-secondary/10 mt-8 rounded-lg ring ring-inset ring-secondary/50 flex divide-x divide-secondary/50"
    >
        <div
            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
            :title="counts.shows"
        >
            <p class="text-xs text-secondary font-bold">Shows</p>
            <p class="font-overpass font-black text-2xl">
                {{ showCount }}
            </p>
        </div>
        <div
            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
            :title="counts.episodes"
        >
            <p class="text-xs text-secondary font-bold">Episodes</p>
            <p class="font-overpass font-black text-2xl">
                {{ episodeCount }}
            </p>
        </div>
        <div
            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
            :title="counts.timestamps"
        >
            <p class="text-xs text-secondary font-bold">Timestamps</p>
            <p class="font-overpass font-black text-2xl">
                {{ timestampCount }}
            </p>
        </div>
    </div>
</template>
