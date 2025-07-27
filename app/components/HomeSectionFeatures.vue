<script lang="ts" setup>
import HomeSectionFeatureItem from "./HomeSectionFeatureItem.vue";

const githubLink = "https://github.com/anime-skip";
</script>

<template>
  <section id="features" class="py-8 md:py-16">
    <div class="w-full max-w-312 px-8 mx-auto space-y-8">
      <h3 class="text-3xl font-overpass tracking-tighter font-black">
        Player Features
      </h3>
      <ul class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <HomeSectionFeatureItem
          icon="i-heroicons-play"
          feature="Auto-skip Timestamps"
          body="Don't want to watch intros? You don't have to move a finger. Anything you don't want to watch is automatically skipped."
        />
        <HomeSectionFeatureItem
          icon="i-heroicons-sparkles"
          feature="Standardized Experience"
          body="Regardless of where you're watching anime, you'll get the same, beautiful video player with the same, awesome features."
        />
        <HomeSectionFeatureItem
          icon="i-heroicons-bolt"
          feature="Custom Keyboard Shortcuts"
          body="Over a dozen fully customizable keyboard shortcuts for navigation, volume, fullscreen, and more!"
        />
        <HomeSectionFeatureItem
          icon="i-heroicons-wrench-screwdriver"
          feature="Advanced Player Controls"
          body="Playback speed up to 4x, advance between timestamps, 4 levels of fast forwards and rewinds."
        />
        <HomeSectionFeatureItem
          icon="i-heroicons-code-bracket"
          feature="Open Source"
        >
          <p>
            Anime Skip is fully open source! The web extension, API, and this
            website.
          </p>
          <p>
            <a class="link no-underline" :href="githubLink" target="_blank">
              <span class="underline">{{ githubLink }}</span>
              {{ " " }}
              <span class="i-heroicons-arrow-top-right-on-square" />
            </a>
          </p>
        </HomeSectionFeatureItem>
      </ul>
    </div>
  </section>
</template>
