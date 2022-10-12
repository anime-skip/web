<script lang="ts" setup>
import { UserReportListItemFragment } from '~~/utils/graphql.generated';

const props = defineProps<{
  report: UserReportListItemFragment;
  selected: boolean;
}>();

const emits = defineEmits<{
  (event: 'selected', id: string): void;
  (event: 'deselected', id: string): void;
}>();

const timeAgo = useTimeAgo(props.report.createdAt);

function toggleSelection(e: Event) {
  if ((e.target as HTMLInputElement).checked) emits('selected', props.report.id);
  else emits('deselected', props.report.id);
}
</script>

<template>
  <tr :data-report-id="report.id">
    <!-- Header Row -->
    <!-- <nuxt-link
      class="flex py-4 px-8 gap-8 items-center cursor-pointer"
      :to="`/admin/user-reports/${report.id}`"
    > -->

    <th>
      <label class="pt-1">
        <span class="sr-only">Select/Deleselect</span>
        <input
          class="checkbox checkbox-primary"
          type="checkbox"
          :checked="selected"
          @input="toggleSelection"
          @click.stop
        />
      </label>
    </th>

    <td>
      <profile-picture class="w-10 h-10" :user="report.createdBy" />
    </td>

    <td class="w-full">
      <nuxt-link class="h-full flex" :to="`/admin/user-reports/${report.id}`">
        <p class="truncate text-lg flex-1 min-w-[5rem]">
          {{ report.message }}
        </p>
      </nuxt-link>
    </td>

    <td>
      <span v-if="report.timestampId">Timestamp</span>
      <nuxt-link
        v-else-if="report.episodeId"
        class="link link-hover"
        :to="`/episodes/${report.episodeId}`"
      >
        <span>Episode</span>
      </nuxt-link>
      <nuxt-link
        v-else-if="report.episodeUrlString"
        class="link link-hover"
        :to="report.episodeUrlString"
      >
        <span>Episode</span>
        <div class="i-mdi-open-in-new text-xl" />
      </nuxt-link>
      <nuxt-link v-else-if="report.showId" class="link link-hover" :to="`/shows/${report.showId}`">
        <span>Show</span>
      </nuxt-link>
      <span v-else>Unknown</span>
    </td>

    <td class="uppercase text-base-content text-opacity-70">
      {{ timeAgo }}
    </td>

    <td>
      <nuxt-link
        target="_blank"
        class="btn btn-ghost btn-circle"
        :to="report.reportedFromUrl"
        :title="report.reportedFromUrl"
      >
        <div class="i-mdi-open-in-new text-2xl" />
      </nuxt-link>
    </td>
    <!-- </nuxt-link> -->
  </tr>
</template>
