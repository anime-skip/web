<template>
  <section-wrapper class="max-w-screen-lg mx-auto space-y-20 px-8 md:px-16 text-center">
    <div class="space-y-8">
      <h4>What is Anime Skip?</h4>
      <p class="body-1">
        Anime Skip is a community managed timestamp database, with a
        <a
          class="text-secondaryPalette-200 hover:underline"
          href="http://test.api.anime-skip.com/graphiql"
          target="_blank"
          >public API</a
        >
        for devlopers to use.
      </p>
      <p class="body-1">
        Anime Skip is integrated with
        <a
          class="text-secondaryPalette-200 hover:underline"
          target="_blank"
          href="http://tuckerchap.in/BetterVRV/"
          >BetterVRV</a
        >, another timestamp database which boasts a library of 1400 episodes. All together, Anime
        Skip has <span class="text-primary font-medium">timestamps for over 2300 episodes</span>!
      </p>
    </div>

    <div class="space-y-8">
      <h4>Anime Skip Player</h4>
      <p class="body-1">
        The Anime Skip Player is a web extension that makes watching anime and contributing
        timestamps easy!
      </p>
      <div class="space-y-4 -mx-8 md:-mx-16">
        <img
          class="w-full max-w-screen-md mx-auto md:rounded-lg shadow-xl"
          src="../../assets/death_note_example.jpg"
        />
        <p class="body-2 text-opacity-medium text-on-surface">Watching Death Note on VRV</p>
      </div>
      <p class="body-1">
        For
        <router-link class="text-secondaryPalette-200 hover:underline" to="#supported-services"
          >supported services</router-link
        >, the Anime Skip Player is used instead of the default video player, adding playback
        features that let you
        <span class="text-primary font-medium">passively watch anime up to 25% faster</span>!
      </p>
    </div>

    <div class="w-full max-w-screen-md flex flex-col md:grid md:grid-cols-2 mx-auto">
      <benefit v-for="benefit of benefits" :key="benefit.title" :item="benefit" />
    </div>
  </section-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Benefit, { Benefit as IBenefit } from './Benefit.vue';
import SectionWrapper from './SectionWrapper.vue';

export default defineComponent({
  components: { SectionWrapper, Benefit },
  setup() {
    const benefits: IBenefit[] = [
      {
        icon: 'auto-skip',
        title: 'Auto-skip Timestamps',
        description:
          "Don't want to watch intros? You don't have to move a finger. Anything you don't want to watch is automatically skipped",
      },
      {
        icon: 'controls',
        title: 'Advanced Player Controls',
        description:
          'Playback speed up to 4x, advance between timestamps, 4 levels of fast forwards and rewinds',
      },
      {
        icon: 'keyboard-shortcuts',
        title: 'Custom Keyboard Shortcuts',
        description:
          'Over a dozen fully customizable keyboard shortcuts for navigation, volume, fullscreen, and more!',
      },
      {
        icon: 'standardized-player',
        title: 'Standardized Video Player',
        description:
          "Regardless of where you're watching anime, you'll get the same, beautiful video player with the same, awesome features",
      },
    ];

    return {
      benefits,
    };
  },
});
</script>
