<template>
  <section-wrapper
    id="supported-services"
    class="bg-control mx-auto space-y-12 flex flex-col items-center shadow-lg"
  >
    <h4>Supported Services</h4>
    <ul class="list">
      <service-card v-for="service of supportedServices" :key="service.name" :service="service" />
    </ul>
    <h5 class="text-on-surface text-opacity-medium pt-8">In the Future</h5>
    <ul class="list opacity-medium">
      <service-card v-for="service of futureServices" :key="service.name" :service="service" />
    </ul>
    <p class="caption text-on-surface text-opacity-low pt-4">
      Anime Skip is not affiliated with any of these services
    </p>
  </section-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SectionWrapper from './SectionWrapper.vue';
import ServiceCard from './ServiceCard.vue';

export default defineComponent({
  components: {
    ServiceCard,
    SectionWrapper,
  },
  setup() {
    const services = ref([
      {
        name: 'VRV',
        background: '#ffdd00',
        foreground: '#000000',
        supported: true,
      },
      {
        name: 'FunimationNow',
        background: '#4d02a3',
        foreground: '#f9f9f9',
        supported: true,
      },
      {
        name: 'Crunchyroll',
        background: '#f37521',
        foreground: '#ffffff',
        supported: true,
      },
      {
        name: 'Hulu',
        background: '#1ce783',
        foreground: '#000000',
        supported: false,
      },
      {
        name: 'NETFLIX',
        background: '#e30d1a',
        foreground: '#000000',
        supported: false,
      },
      {
        name: 'Amazone Prime Video',
        background: '#3daae0',
        foreground: '#ffffff',
        supported: false,
      },
    ]);

    const supportedServices = computed(() => services.value.filter(({ supported }) => supported));
    const futureServices = computed(() => services.value.filter(({ supported }) => !supported));

    return {
      supportedServices,
      futureServices,
    };
  },
});
</script>

<style scoped>
.list {
  @apply flex flex-wrap gap-8 items-center justify-center px-16;
}
</style>
