<template>
  <card
    class="min-h-16 flex items-center justify-center text-center"
    :style="`background-color: ${service.background}`"
  >
    <span class="text-3xl font-bold mx-6 my-4" :style="`color: ${service.textColor}`">{{
      service.name
    }}</span>
  </card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Card } from '@anime-skip/ui';
import { Service } from '@/utils/firebase';

export default defineComponent({
  components: { Card },
  props: {
    service: { type: Object as PropType<Service>, required: true },
  },
});
</script>
