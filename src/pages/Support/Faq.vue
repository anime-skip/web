<template>
  <div
    :id="id"
    class="rounded-lg flex pl-5 pr-6 space-x-4 transition-all"
    :class="{ 'bg-control  py-8': expanded }"
  >
    <img
      class="cursor-pointer opacity-medium transform rotate self-start -mt-1 transition-all"
      :class="{
        'rotate-180': expanded,
      }"
      src="../../assets/ic_chevron_down.svg"
      alt="expand"
      @click="toggleExpanded"
    />
    <div class="space-y-4">
      <h6
        class="cursor-pointer font-medium transition-all"
        :class="{
          'text-primary': expanded,
        }"
        @click="toggleExpanded"
      >
        {{ question }}
      </h6>
      <slot v-if="expanded" @click.stop />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  props: {
    question: { type: String, required: true },
    id: { type: String, default: undefined },
  },
  setup(props) {
    const route = useRoute();
    const expanded = ref<boolean>(!!props.id && !!route.hash && route.hash === `#${props.id}`);
    const toggleExpanded = () => {
      expanded.value = !expanded.value;
    };
    return {
      expanded,
      toggleExpanded,
    };
  },
});
</script>
