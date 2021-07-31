<template>
  <div class="flex flex-col space-y-4">
    <h6 class="text-opacity-low uppercase">{{ sectionTitle }}</h6>
    <template v-if="items.length > 0">
      <ul class="-mx-4 space-y-2">
        <template v-for="item of items" :key="item.id">
          <slot name="item" :item="item" />
        </template>
      </ul>
      <router-link v-if="showLoadAll" class="self-start" to="#" @click="$emit('clickLoadAll')">{{
        loadAllText
      }}</router-link>
    </template>
    <p v-else class="text-opacity-medium">No results</p>
    <infinite-scroll-trigger
      v-if="infiniteScroll"
      :offset="200"
      @load-next-page="$emit('loadNextPage')"
    />
    <div v-if="infiniteScrollDone">
      <p class="text-opacity-low subtitle-2 text-center py-8">That's it!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger.vue';

export default defineComponent({
  components: { InfiniteScrollTrigger },
  props: {
    sectionTitle: { type: String, required: true },
    showLoadAll: Boolean,
    loadAllText: { type: String, required: true },
    items: { type: Array as PropType<any[]>, required: true },
    infiniteScroll: Boolean,
    infiniteScrollDone: Boolean,
  },
  emits: ['loadNextPage', 'clickLoadAll'],
});
</script>
