<template>
  <card
    class="min-h-16 px-8 py-2 flex items-center justify-center text-center"
    :style="`background-color: ${service.background}`"
  >
    <span class="text-3xl font-bold" :style="`color: ${service.foreground}`">{{
      service.name
    }}</span>
  </card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Card } from '@anime-skip/ui';

export interface Service {
  name: string;
  foreground: string;
  background: string;
  supported: boolean;
}

export default defineComponent({
  components: { Card },
  props: {
    service: { type: Object as PropType<Service>, required: true },
  },
});
</script>
