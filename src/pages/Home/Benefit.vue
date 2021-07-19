<template>
  <div class="w-96 md:w-auto mx-auto space-y-4 flex flex-col items-center px-4 pb-12">
    <icon-home-benefits class="w-16 fill-secondary-300" :type="item.icon" />
    <h5>{{ item.title }}</h5>
    <p>
      {{ item.description }}
    </p>
  </div>
</template>

<script lang="ts">
import IconHomeBenefits, { BenefitIcon } from '@/assets/IconHomeBenefits.vue';
import { defineComponent, PropType } from 'vue';

export interface Benefit {
  icon: BenefitIcon;
  title: string;
  description: string;
}

export default defineComponent({
  components: { IconHomeBenefits },
  props: {
    item: { type: Object as PropType<Benefit>, required: true },
  },
});
</script>
