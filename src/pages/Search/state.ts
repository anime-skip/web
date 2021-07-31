import { inject, provide, Ref, ref, watch } from 'vue';

const PROVIDE_KEY = Symbol('search-state');

export interface SearchCriteria {
  searchText: string;
  shows: boolean;
  episodes: boolean;
}
type UpdateSearchCriteria = (newSearchCriteria: SearchCriteria) => void;

const defaultSearchCriteria: SearchCriteria = {
  searchText: '',
  shows: true,
  episodes: true,
};
const defaultUpdateSearchCriteria: UpdateSearchCriteria = (): void => {};

export interface SearchCriteriaState {
  searchCriteria: Ref<SearchCriteria>;
  updateSearchCriteria: UpdateSearchCriteria;
}

export function provideSearchCriteria(): SearchCriteriaState {
  const searchCriteria: Ref<SearchCriteria> = ref(defaultSearchCriteria);
  const updateSearchCriteria: UpdateSearchCriteria = newSearchCriteria => {
    searchCriteria.value = newSearchCriteria;
  };

  const state: SearchCriteriaState = {
    searchCriteria,
    updateSearchCriteria,
  };
  provide(PROVIDE_KEY, state);

  return state;
}

export function injectSearchCriteria() {
  const { searchCriteria, updateSearchCriteria } = inject<SearchCriteriaState>(PROVIDE_KEY, {
    searchCriteria: ref(defaultSearchCriteria),
    updateSearchCriteria: defaultUpdateSearchCriteria,
  });

  const onChangeSearchCriteria = (callback: (searchCriteria: SearchCriteria) => void) => {
    watch(searchCriteria, (newSearchCriteria, oldSearchCriteria) => {
      if (
        newSearchCriteria.episodes !== oldSearchCriteria.episodes ||
        newSearchCriteria.shows !== oldSearchCriteria.shows ||
        newSearchCriteria.searchText !== oldSearchCriteria.searchText
      ) {
        callback(newSearchCriteria);
      }
    });
  };

  return {
    searchCriteria,
    updateSearchCriteria,
    onChangeSearchCriteria,
  };
}
