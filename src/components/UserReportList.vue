<script lang="ts" setup>
import { UserReportListItemFragment } from '~~/utils/graphql.generated';

const props = defineProps<{
  reports: UserReportListItemFragment[];
  hideSelection?: boolean;
}>();

const emits = defineEmits<{
  (event: 'load-next-page'): void;
  (event: 'update:selected', newSelection: Record<string, boolean>): void;
}>();

const selection = useSelection(
  computed(() => props.reports),
  report => report.id,
);
watch(
  () => selection.selected,
  newSelection => emits('update:selected', newSelection),
);

const footer = ref<HTMLElement>(null);
useIntersectionObserver(footer, () => emits('load-next-page'), { threshold: 0.1 });
</script>

<template>
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th v-if="!hideSelection">
          <label class="pt-1">
            <span class="sr-only">Select/Deselect All</span>
            <input
              class="checkbox checkbox-primary"
              type="checkbox"
              @click="selection.toggleSelectAll()"
              :indeterminate="selection.indeterminate"
              :checked="selection.checked"
            />
          </label>
        </th>
        <th></th>
        <th>Message</th>
        <th>Type</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <user-report-list-item
        v-for="report of reports"
        :key="report.id"
        :report="report"
        :selected="selection.selected[report.id]"
        :hide-selection="props.hideSelection"
        @selected="selection.selectItem"
        @deselected="selection.deselectItem"
      />
    </tbody>
    <tfoot ref="footer" />
  </table>
</template>
