<script lang="ts" setup>
const { data: allServices } = useSupportedServicesQuery();

const supportedServices = computed(() => allServices.value?.filter(s => s.supported));
const futureServices = computed(() => allServices.value?.filter(s => !s.supported));
</script>

<template>
  <div class="py-32 bg-base-300">
    <div class="max-w-screen-lg mx-auto flex flex-col items-center gap-8">
      <h4 class="text-2xl font-stylized">Supported Services</h4>
      <ul class="flex flex-wrap gap-8 max-w-screen-md justify-center">
        <home-section-supported-services-list-item
          v-for="service of supportedServices"
          :key="service.name"
          :service="service"
        />
      </ul>
      <template v-if="futureServices.length > 0">
        <div />
        <h5 v-if="!!futureServices.length" class="text-xl font-stylized opacity-50">
          In the Future
        </h5>
        <ul class="flex flex-wrap gap-8 max-w-screen-md justify-center opacity-50">
          <home-section-supported-services-list-item
            v-for="service of futureServices"
            :key="service.name"
            :service="service"
          />
        </ul>
      </template>
      <p class="text-xs opacity-30 pt-4">Anime Skip is not affiliated with any of these services</p>
    </div>
  </div>
</template>
