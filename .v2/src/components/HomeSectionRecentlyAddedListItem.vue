<script lang="ts" setup>
import { formatEpisodeSeasonAndNumber } from '~~/utils/formatting';
import { RecentEpisodeFragment } from '~~/utils/graphql.generated';

const props = defineProps<{
  episode: RecentEpisodeFragment;
}>();

const show = computed(() => props.episode.show.name || 'Unknown Show');
const name = computed(() => props.episode.name || 'Unknown Epiosde');
const subtitle = computed(() => {
  const result = formatEpisodeSeasonAndNumber(props.episode);
  return result ? ` • ${result}` : '';
});
const since = useTimeAgo(computed(() => props.episode.createdAt));
</script>

<template>
  <li class="flex items-center px-6 pt-3 pb-4 gap-8">
    <div class="flex-1 flex flex-col space-y-1 truncate">
      <p class="text-lg truncate">{{ name }}</p>
      <p class="text-sm truncate">
        <span class="text-primary truncate">{{ show }}</span>
        <span>{{ subtitle }}</span>
      </p>
    </div>
    <p class="text-base-content text-opacity-50 pt-1 shrink-0">{{ since }}</p>
  </li>
</template>
