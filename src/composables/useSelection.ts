import { Ref, reactive } from 'vue';

export default function <T>(items: Ref<T[] | undefined>, getId: (t: T) => string) {
  const selected = ref<Record<string, boolean>>({});
  const isAllSelected = computed(
    () => items.value?.length > 0 && Object.values(selected.value).length === items.value?.length,
  );
  const isNoneSelected = computed(() => Object.values(selected.value).length === 0);

  // Remove missing items when list changes
  watch(items, () => {
    selected.value = Object.keys(selected.value).reduce((map, id) => {
      const hasId = !!items.value?.find(item => getId(item) === id);
      if (hasId) map[id] = true;
      return map;
    }, {});
  });

  function toggleSelectAll() {
    if (isAllSelected.value) {
      // Clear selection
      selected.value = {};
    } else {
      // Select all
      selected.value = items.value.reduce((map, item) => {
        map[getId(item)] = true;
        return map;
      }, {});
    }
  }
  function selectItem(id: string) {
    selected.value = {
      ...selected.value,
      [id]: true,
    };
  }
  function deselectItem(id: string) {
    const newSelected = { ...selected.value };
    delete newSelected[id];
    selected.value = newSelected;
  }

  return reactive({
    selected,
    toggleSelectAll,
    selectItem,
    deselectItem,
    indeterminate: computed(() => !isAllSelected.value && !isNoneSelected.value),
    checked: isAllSelected,
  });
}
