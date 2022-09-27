<script lang="ts" setup>
const route = useRoute();

// Removed the /^\/docs/ from the path as if the content were served from /
const docPath = computed(() => route.path.replace('/docs', '') || '/');
</script>

<template>
  <main class="pb-16">
    <content-doc class="prose max-w-screen-lg mx-auto p-8" :path="docPath" />
  </main>
</template>

<style lang="scss">
.prose {
  kbd {
    @apply font-mono py-1 px-2 bg-neutral-focus rounded;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-stylized;
    a {
      @apply link no-underline relative before:font-sans before:font-light before:absolute before:right-full before:bottom-0 before:pr-2 before:opacity-20;
    }
    a::before {
      content: '# ';
    }
  }
  h2 {
    @apply relative pt-5 after:absolute after:w-16 after:h-1 after:bg-primary after:top-0 after:left-0;
    &::after {
      content: '';
    }
  }
  h3,
  h4,
  h5,
  h6 {
    @apply pt-4;
  }

  table {
    @apply ring-2 ring-base-300 rounded overflow-hidden;
    th,
    td {
      @apply p-4;
    }
    thead {
      @apply border-b-0 bg-base-300;
      th {
        @apply uppercase text-base-content text-xs text-opacity-70;
      }
    }
    tbody {
      tr {
        @apply border-b border-base-300;
      }
      tr:last-child {
        @apply border-0;
      }
    }
  }
}
</style>
