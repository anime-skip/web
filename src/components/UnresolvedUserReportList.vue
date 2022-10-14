<script lang="ts" setup>
import { QueryFindUserReportsArgs } from '~~/utils/graphql.generated';

const vars = ref<QueryFindUserReportsArgs>({ resolved: false });

const {
  data,
  isSuccess,
  isError,
  isLoading,
  error,
  refetch,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useFindUserReportsQuery(vars);
const reports = computed(() => data.value?.pages.flatMap(res => res.findUserReports));

function loadNextPage() {
  if (hasNextPage.value) void fetchNextPage.value();
}

const footer = ref<HTMLElement>(null);
useIntersectionObserver(footer, () => {}, { threshold: 0.1 });
</script>

<template>
  <div class="flex flex-col">
    <div v-if="isError" class="px-8">
      <error-display :error="error" @retry="refetch()" />
    </div>
    <user-report-list
      v-if="isSuccess"
      :reports="reports"
      @load-next-page="loadNextPage"
      hide-selection
    />
    <div v-if="isLoading || isFetchingNextPage" class="text-center p-8">Loading...</div>
  </div>
</template>
