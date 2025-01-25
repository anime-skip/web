<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import FeatureGridItem from "./components/FeatureGridItem.vue";
import useGqlCountsQuery from "./composables/useGqlCountsQuery";
import { computed, ref } from "vue";

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
const featuresSection = ref<HTMLElement>();
function scrollToFeatures() {
    document.scrollingElement.scrollTo({
        top: featuresSection.value?.getBoundingClientRect().top - 100,
        behavior: "smooth",
    });
    router.replace("#features");
}
</script>

<template>
    <nav class="flex fixed top-0 inset-x-0 z-10 bg-base">
        <div class="container flex items-center h-16 gap-4">
            <RouterLink to="/" class="btn btn-ghost hover:transform-none">
                <img src="app/assets/logo-nav.svg" class="w-10" />
                <span
                    class="font-black font-overpass text-primary tracking-tighter text-2xl pt-1"
                >
                    Anime Skip
                </span>
            </RouterLink>
            <RouterLink to="/get-started" class="btn btn-ghost">
                <span class="text-base-content">Get Started</span>
            </RouterLink>
            <div class="flex-1" />
            <RouterLink to="/sign-in" class="btn btn-outline">
                Log In
            </RouterLink>
        </div>
    </nav>
    <main>
        <section class="flex pt-24 px-8 relative overflow-clip lg:h-[80vh]">
            <div class="flex flex-col lg:flex-row container gap-8 lg:gap-20">
                <div
                    class="w-full lg:w-[40%] flex flex-col justify-center relative lg:shrink-0"
                >
                    <h2
                        class="text-base-content text-3xl lg:text-4xl font-bold font-overpass leading-relaxed"
                    >
                        The best video player for watching anime.
                    </h2>
                    <h3
                        class="text-base-content font-stretch-expanded font-light mt-2"
                    >
                        Powered by the largest timestamp database, Anime Skip
                        automatically skips the parts of episodes you don't want
                        to watch.
                    </h3>
                    <div
                        class="h-20 bg-secondary/10 mt-8 rounded-lg ring ring-inset ring-secondary/50 flex divide-x divide-secondary/50"
                    >
                        <div
                            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
                            :title="counts.shows"
                        >
                            <p class="text-xs text-secondary font-bold">
                                Shows
                            </p>
                            <p class="font-overpass font-black text-2xl">
                                {{ showCount }}
                            </p>
                        </div>
                        <div
                            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
                            :title="counts.episodes"
                        >
                            <p class="text-xs text-secondary font-bold">
                                Episodes
                            </p>
                            <p class="font-overpass font-black text-2xl">
                                {{ episodeCount }}
                            </p>
                        </div>
                        <div
                            class="flex-1 text-center flex flex-col items-center justify-center gap-1"
                            :title="counts.timestamps"
                        >
                            <p class="text-xs text-secondary font-bold">
                                Timestamps
                            </p>
                            <p class="font-overpass font-black text-2xl">
                                {{ timestampCount }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center lg:justify-start gap-4 mt-8 lg:mb-16"
                    >
                        <RouterLink to="/get-started" class="btn btn-shadow">
                            <span>Get Started</span>
                            <span class="i-heroicons-arrow-right size-5" />
                        </RouterLink>
                        <button class="btn btn-ghost" @click="scrollToFeatures">
                            See all features
                        </button>
                    </div>
                </div>
                <div
                    class="-mx-8 -mb-8 pb-4 lg:m-0 lg:pb-0 lg:flex-1 lg:h-full lg:translate-y-8"
                >
                    <img
                        src="app/assets/hero-monitor-title.svg"
                        class="w-full h-30vh block max-w-none min-w-none lg:w-auto lg:h-full lg:min-w-full"
                    />
                </div>
            </div>
        </section>
        <section
            ref="featuresSection"
            id="features"
            class="bg-neutral py-4 md:py-16"
        >
            <ul
                class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                <FeatureGridItem
                    icon="i-heroicons-play"
                    feature="Auto-skip Timestamps"
                    description="Don't want to watch intros? You don't have to move a finger. Anything you don't want to watch is automatically skipped."
                />
                <FeatureGridItem
                    icon="i-heroicons-bolt"
                    feature="Custom Keyboard Shortcuts"
                    description="Over a dozen fully customizable keyboard shortcuts for navigation, volume, fullscreen, and more!"
                />
                <FeatureGridItem
                    icon="i-heroicons-wrench-screwdriver"
                    feature="Advanced Player Controls"
                    description="Playback speed up to 4x, advance between timestamps, 4 levels of fast forwards and rewinds."
                />
                <FeatureGridItem
                    icon="i-heroicons-sparkles"
                    feature="Standardized Experience"
                    description="Regardless of where you're watching anime, you'll get the same, beautiful video player with the same, awesome features."
                />
            </ul>
        </section>
        <section id="api" class="py-32">
            <div class="px-8 max-w-200 mx-auto flex flex-col gap-8 text-center">
                <div class="flex gap-8 items-center justify-center select-none">
                    <img src="app/assets/graphql-logo.svg" class="h-28" />
                    <span class="i-heroicons-plus size-16 opacity-50" />
                    <img src="app/assets/logo.svg" class="h-20" />
                </div>
                <h3 class="text-3xl font-overpass tracking-tighter font-black">
                    Anime Skip API
                </h3>
                <p>
                    Making an application? Try out Anime Skip's API - it's free!
                </p>
                <p class="text-sm">
                    <RouterLink to="/docs/api" class="link"
                        >API Documentation</RouterLink
                    >
                    <span class="opacity-50 select-none"
                        >&ensp;&bull;&ensp;</span
                    >
                    <a href="/playground" class="link">GraphQL Playground</a>
                </p>
            </div>
        </section>
    </main>
</template>
