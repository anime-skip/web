<template>
  <NavAndFooterLayout>
    <div>
      <hero @scrollTo="scrollTo" />
      <img class="section-transition" src="../../assets/home-section-bottom.svg" />
      <about />
      <img class="section-transition" src="../../assets/home-section-top.svg" />
      <supported-services />
      <img class="section-transition" src="../../assets/home-section-bottom.svg" />
      <recently-added />
      <img class="section-transition" src="../../assets/home-section-top.svg" />
    </div>
  </NavAndFooterLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import About from './About.vue';
import Hero from './Hero.vue';
import RecentlyAdded from './RecentlyAdded.vue';
import SupportedServices from './SupportedServices.vue';

export default defineComponent({
  components: {
    Hero,
    About,
    SupportedServices,
    RecentlyAdded,
  },
  setup() {
    const scrollTo = (selector: string) => {
      setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    };

    const route = useRoute();
    onMounted(() => {
      if (!route.hash) return;
      scrollTo(route.hash);
    });

    return {
      scrollTo,
    };
  },
});
</script>

<style scoped>
.section-transition {
  @apply w-full h-28;
}
</style>
