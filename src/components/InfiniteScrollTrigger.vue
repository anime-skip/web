<template>
  <div ref="observeredRef" class="h-1" />
</template>

<script lang="ts">
import { debounce } from 'lodash';
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'InfiniteScrollTrigger',
  props: {
    offset: { type: Number, default: 0 },
  },
  emits: ['loadNextPage'],
  setup(props, { emit }) {
    const observeredRef = ref();

    const triggerNextPage = () => {
      emit('loadNextPage');
    };
    const debouncedTriggerNextPage = debounce(triggerNextPage, 200);

    const handleScroll = () => {
      const elementBottom = observeredRef.value.getBoundingClientRect().bottom;
      const windowBottom = window.innerHeight + props.offset;
      if (elementBottom < windowBottom) {
        debouncedTriggerNextPage();
      }
    };
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    });
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));

    return {
      observeredRef,
    };
  },
});
</script>
