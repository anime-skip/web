<script lang="ts" setup>
const route = useRoute();
const content = ref<HTMLElement>();

// Removed the /^\/docs/ from the path as if the content were served from /
const docPath = computed(() => route.path.replace('/docs', '') || '/');
</script>

<template>
  <div class="max-w-screen-lg mx-auto px-8 pt-8 pb-16 flex gap-8 items-start">
    <main ref="content" class="prose max-w-none flex-1">
      <content-doc />
    </main>
    <table-of-contents
      class="hidden lg:block lg:w-56 lg:flex-shrink-0"
      :top-heading="2"
      :content-ref="content"
      :deepest-heading="2"
    />
  </div>
</template>
