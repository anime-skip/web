<template>
  <section-wrapper
    id="supported-services"
    class="bg-control mx-auto space-y-12 flex flex-col items-center shadow-lg"
  >
    <h4>Supported Services</h4>
    <ul class="list">
      <service-card v-for="service of supportedServices" :key="service.name" :service="service" />
    </ul>
    <h5 v-if="futureServices.length > 0" class="text-opacity-medium pt-8">In the Future</h5>
    <ul class="list opacity-medium">
      <service-card v-for="service of futureServices" :key="service.name" :service="service" />
    </ul>
    <p class="caption text-opacity-low pt-4">
      Anime Skip is not affiliated with any of these services
    </p>
  </section-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SectionWrapper from './SectionWrapper.vue';
import ServiceCard from './ServiceCard.vue';
import { getValue, ensureInitialized, fetchConfig } from 'firebase/remote-config';
import { remoteConfig, Service } from '@/utils/firebase';

export default defineComponent({
  components: {
    ServiceCard,
    SectionWrapper,
  },
  setup() {
    const getCurrentServices = (): Service[] =>
      JSON.parse(getValue(remoteConfig, 'services').asString());
    const services = ref(getCurrentServices());

    fetchConfig(remoteConfig).then(() => {
      console.log('initialized', getCurrentServices());
      services.value = getCurrentServices();
    });

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
