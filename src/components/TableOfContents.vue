<script lang="ts" setup>
import { HEADER_OFFSET } from '~~/utils/constants';

const props = defineProps<{
  contentRef?: HTMLElement;
  topHeading?: number;
  deepestHeading?: number;
}>();

type ToC = Array<{
  id: string;
  text: string;
  level: number;
}>;

const headers = computed(() =>
  Array.from(
    props.contentRef?.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h5') ?? [],
  ).filter(header => !!header.id),
);

const currentId = ref<string>();
useIntervalFn(() => {
  const y = document.querySelector<HTMLDivElement>('.drawer-content').scrollTop;
  const order = [y, ...headers.value.map(h => h.offsetTop - HEADER_OFFSET)].sort((l, r) => l - r);
  currentId.value = headers.value[order.indexOf(y) - 1]?.id;
}, 500);

const toc = computed<ToC>(() =>
  headers.value
    .map(header => ({
      id: header.id,
      text: header.textContent,
      level: Number(header.tagName.substring(1)) - (props.topHeading ?? 1),
    }))
    .filter(
      item =>
        item.level >= 0 &&
        item.id !== 'table-of-contents' &&
        item.level <= (props.deepestHeading ?? Infinity) - (props.topHeading ?? 1),
    ),
);
</script>

<template>
  <ul class="p-4 border-l border-base-content border-opacity-10 space-y-2 sticky top-32">
    <li><p class="text-sm">On this page</p></li>
    <li
      v-for="item of toc"
      :key="item.id"
      class="relative before:absolute before:-left-4 before:-inset-y-1 before:-ml-[1px] before:w-[1px] before:bg-primary before:opacity-0 before:transition-opacity"
      :class="{
        'pl-4': item.level === 1,
        'pl-8': item.level === 2,
        'pl-12': item.level === 3,
        'pl-16': item.level === 4,
        'pl-20': item.level === 5,
        'before:opacity-100': item.id === currentId,
      }"
    >
      <nuxt-link
        class="text-sm text-base-content transition-opacity"
        :class="{
          'text-opacity-50': item.id !== currentId,
          'text-opacity-100 before:opacity-100': item.id === currentId,
        }"
        :to="`#${item.id}`"
        >{{ item.text }}</nuxt-link
      >
    </li>
  </ul>
</template>
