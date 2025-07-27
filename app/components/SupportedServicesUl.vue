<script lang="ts" setup>
import useRemoteConfigQuery from "app/composables/useRemoteConfigQuery";
import { computed } from "vue";

const { data: remoteConfig } = useRemoteConfigQuery();
const supportedServices = computed(() =>
  remoteConfig.value.services.filter((service) => service.supported),
);
</script>

<template>
  <ul class="list-disc pl-8">
    <li v-for="service of supportedServices">
      <a
        class="link flex w-fit items-center gap-1"
        target="_blank"
        :href="service.url"
      >
        <span>{{ service.name }}</span>
        <i class="i-heroicons-arrow-top-right-on-square" />
      </a>
    </li>
  </ul>
</template>
