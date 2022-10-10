<script lang="ts" setup>
import DeathNoteExample from '~~/assets/death-node-example.jpg';
import ChromeWebStore from '~~/assets/chrome-web-store.svg';
import FirefoxAddonStore from '~~/assets/firefox-addon-store.svg';
import { ExternalLinks } from '~~/utils/external-links';
</script>

<template>
  <section id="about-player" class="max-w-screen-md mx-auto px-4 py-32 flex flex-col gap-8">
    <!-- Title -->
    <h2 class="text-3xl font-stylized text-center">Anime Skip Player</h2>

    <!-- Store Buttons -->
    <div class="flex items-center justify-center gap-4">
      <a target="_blank" :href="ExternalLinks.CHROME_WEB_STORE"
        ><img class="h-16" alt="install from the Chrome Web Store" :src="ChromeWebStore"
      /></a>
      <a target="_blank" :href="ExternalLinks.FIREFOX_ADDON_STORE"
        ><img class="h-16" alt="install from the Firefox Addon Store" :src="FirefoxAddonStore"
      /></a>
    </div>

    <!-- Description -->
    <p class="text-center">
      The Anime Skip Player is a browser extension that replaces the crappy video players from the
      top anime streaming services with a custom one that lets you skip intros, change the playback
      rate, and more!
    </p>
    <img
      class="w-full max-w-screen-sm mx-auto"
      alt="Demo of the Anime Skip Player"
      :src="DeathNoteExample"
    />

    <div />

    <!-- Features -->
    <div class="w-full max-w-screen-md flex flex-col md:grid md:grid-cols-2 mx-auto">
      <home-section-about-player-grid-item title="Auto-skip Timestamps" icon="i-mdi-fast-forward">
        <p class="text-base-content text-opacity-70">
          Don't want to watch intros? You don't have to move a finger. Anything you don't want to
          watch is automatically skipped
        </p>
      </home-section-about-player-grid-item>
      <home-section-about-player-grid-item title="Advanced Player Controls" icon="i-mdi-arm-flex">
        <p class="text-base-content text-opacity-70">
          Playback speed up to 4x, advance between timestamps, 4 levels of fast forwards and rewinds
        </p>
      </home-section-about-player-grid-item>
      <home-section-about-player-grid-item
        title="Custom Keyboard Shortcuts"
        icon="i-mdi-keyboard-variant"
      >
        <p class="text-base-content text-opacity-70">
          Over a dozen fully customizable keyboard shortcuts for navigation, volume, fullscreen, and
          more!
        </p>
      </home-section-about-player-grid-item>
      <home-section-about-player-grid-item
        title="Standardized Experience"
        icon="i-material-symbols:auto-awesome"
      >
        <p class="text-base-content text-opacity-70">
          Regardless of where you're watching anime, you'll get the same, beautiful video player
          with the same, awesome features
        </p>
      </home-section-about-player-grid-item>
    </div>
  </section>
</template>
