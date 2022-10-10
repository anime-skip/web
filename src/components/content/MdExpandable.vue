<script lang="ts" setup>
const props = defineProps<{
  title: string;
  id?: string;
}>();

const route = useRoute();
const expanded = ref(route.hash === props.id);
function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div :id="id" class="flex flex-col p-4">
    <div class="flex gap-4 cursor-pointer items-center" @click="toggleExpanded">
      <div
        class="i-mdi-chevron-down text-base-content text-opacity-70 text-xl transition-transform"
        :class="{
          'rotate-180': expanded,
        }"
      />
      <h4
        class="text-70 p-0 m-0"
        :class="{
          'text-100': expanded,
        }"
      >
        {{ title }}
      </h4>
    </div>
    <div v-show="expanded" class="pl-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.p-0 {
  padding: 0 !important;
}
</style>
