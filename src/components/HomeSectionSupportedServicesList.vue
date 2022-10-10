<script lang="ts" setup>
const { data: allServices } = useSupportedServicesQuery();

const supportedServices = computed(() => allServices.value?.filter(s => s.supported) ?? []);
const futureServices = computed(() => allServices.value?.filter(s => !s.supported) ?? []);

const showingFutureServices = false;
</script>

<template>
  <section id="supported-services" class="py-32">
    <div class="max-w-screen-lg mx-auto px-4 flex flex-col items-center gap-8">
      <h2 class="text-3xl font-stylized">Supported Services</h2>
      <ul class="flex flex-wrap gap-8 max-w-screen-md justify-center">
        <home-section-supported-services-list-item
          v-for="service of supportedServices"
          :key="service.name"
          :service="service"
        />
      </ul>
      <template v-if="futureServices.length > 0 && showingFutureServices">
        <div />
        <h3 v-if="!!futureServices.length" class="text-2xl font-stylized opacity-50">
          In the Future
        </h3>
        <ul class="flex flex-wrap gap-8 max-w-screen-md justify-center opacity-50">
          <home-section-supported-services-list-item
            v-for="service of futureServices"
            :key="service.name"
            :service="service"
          />
        </ul>
      </template>
      <p class="text-xs opacity-30 pt-4 text-center">
        Anime Skip is not affiliated with any of these services
      </p>
    </div>
  </section>
</template>
