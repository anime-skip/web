<template>
  <text-input
    v-model:value="searchText"
    placeholder="Search..."
    autocomplete="username"
    @submit="onSubmitSearch"
  >
    <template #left-icon="slotProps">
      <icon-search :active="slotProps.active" :disabled="slotProps.disabled" />
    </template>
  </text-input>

  <side-navigation-group>
    <div class="p-2">
      <p class="p-2 subtitle-2 text-opacity-medium">Include</p>
      <checkbox v-model:checked="shows" label="Shows" />
      <checkbox v-model:checked="episodes" label="Episodes" />
    </div>
  </side-navigation-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideNavigationGroup from '@/components/SideNavigationGroup.vue';
import { TextInput, Checkbox } from '@anime-skip/ui';
import IconSearch from '@/assets/IconSearch.vue';
import debounce from 'lodash.debounce';
import { injectSearchCriteria } from './state';

enum QueryParams {
  SEARCH = 'q',
  SHOWS = 'shows',
  EPISODES = 'episodes',
}

const TEXT_SEARCH_DEBOUNCE = 400;

export default defineComponent({
  components: {
    SideNavigationGroup,
    TextInput,
    Checkbox,
    IconSearch,
  },
  setup() {
    const { updateSearchCriteria, onChangeSearchCriteria } = injectSearchCriteria();
    const searchText = ref('');
    const shows = ref(false);
    const episodes = ref(false);

    const search = () => {
      let s = shows.value;
      let e = episodes.value;
      if (s == e) {
        s = true;
        e = true;
      }
      updateSearchCriteria({
        searchText: searchText.value.trim(),
        shows: s,
        episodes: e,
      });
    };

    const route = useRoute();
    onMounted(() => {
      searchText.value = String(route.query[QueryParams.SEARCH] ?? '');
      shows.value = route.query[QueryParams.SHOWS] === 'true';
      episodes.value = route.query[QueryParams.EPISODES] === 'true';
    });

    const router = useRouter();

    onChangeSearchCriteria(newSearchCriteria => {
      const query: typeof route.query = {
        ...route.query,
        [QueryParams.SEARCH]: newSearchCriteria.searchText,
        [QueryParams.SHOWS]: String(newSearchCriteria.shows),
        [QueryParams.EPISODES]: String(newSearchCriteria.episodes),
      };
      if (!shows.value) delete query[QueryParams.SHOWS];
      else query[QueryParams.SHOWS] = String(shows.value);
      if (!episodes.value) delete query[QueryParams.EPISODES];
      else query[QueryParams.EPISODES] = String(episodes.value);
      if (query[QueryParams.SHOWS] === query[QueryParams.EPISODES]) {
        delete query[QueryParams.EPISODES];
        delete query[QueryParams.SHOWS];
      }
      if (newSearchCriteria.searchText.trim()) {
        query[QueryParams.SEARCH] = newSearchCriteria.searchText;
      } else {
        delete query[QueryParams.SEARCH];
      }
      router.replace({
        query,
      });

      searchText.value = newSearchCriteria.searchText;
      if (newSearchCriteria.shows !== newSearchCriteria.episodes) {
        shows.value = newSearchCriteria.shows;
        episodes.value = newSearchCriteria.episodes;
      }
    });
    const updateBooleanParams = () => {
      const query = {
        ...route.query,
      };
      router.replace({ query });
      search();
    };
    watch(shows, updateBooleanParams);
    watch(episodes, updateBooleanParams);

    const searchDebounced = debounce(search, TEXT_SEARCH_DEBOUNCE);
    watch(searchText, searchDebounced);
    const onSubmitSearch = () => {
      search();
    };

    return {
      searchText,
      shows,
      episodes,
      onSubmitSearch,
    };
  },
});
</script>
