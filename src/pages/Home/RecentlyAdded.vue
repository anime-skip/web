<template>
  <section-wrapper
    id="recently-added"
    class="px-16 md:px-0 w-full md:max-w-screen-sm md:mx-auto space-y-8"
  >
    <h4 class="md:text-center">Recently Added Epiosdes</h4>
    <div class="md:rounded-xl md:framing-shadow">
      <recent-episodes-list />
    </div>
    <p class="caption text-on-surface text-opacity-medium md:text-center pt-2">
      BetterVRV episodes do not show up on this list, you can view those
      <a
        class="text-secondaryPalette-300 hover:underline"
        target="_blank"
        href="http://tuckerchap.in/BetterVRV/"
        >here</a
      >
    </p>
  </section-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionWrapper from './SectionWrapper.vue';
import RecentEpisodesList from '../../components/RecentEpisodesList.vue';

export default defineComponent({
  components: {
    SectionWrapper,
    RecentEpisodesList,
  },
  setup() {},
});
</script>

<style scoped>
.bg-override-background {
  @apply bg-background !important;
}
</style>
