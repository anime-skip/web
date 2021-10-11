<template>
  <div v-if="isFailure">ERROR</div>
  <div v-else-if="!isLoading && !hasResults" class="centered-container">
    <h5>No results...</h5>
    <p class="text-opacity-medium">Try searching for something else</p>
  </div>
  <div v-else-if="hasResults" class="space-y-8">
    <div class="space-y-16">
      <results-group
        v-if="searchCriteria.shows"
        section-title="Shows"
        load-all-text="Load more shows..."
        :items="showResults"
        :show-load-all="showLoadAllShows"
        :infinite-scroll="isInfiniteScroll"
        :infinite-scroll-done="isInfiniteScrollDone"
        @load-next-page="loadNextPage()"
        @click-load-all="loadAllShows()"
      >
        <template #item="{ item }">
          <show-search-result
            :id="item.id"
            :name="item.name || 'Unknown Show'"
            :season-count="item.seasonCount"
            :episode-count="item.episodeCount"
          />
        </template>
      </results-group>

      <results-group
        v-if="searchCriteria.episodes"
        section-title="Episodes"
        load-all-text="Load more episodes..."
        :items="episodeResults"
        :show-load-all="showLoadAllEpisodes"
        :infinite-scroll="isInfiniteScroll"
        :infinite-scroll-done="isInfiniteScrollDone"
        @load-next-page="loadNextPage()"
        @click-load-all="loadAllEpisodes()"
      >
        <template #item="{ item }">
          <episode-search-result
            :id="item.id"
            :name="item.name || 'Unknown Episode'"
            :show-id="item.show.id"
            :show-name="item.show.name ?? 'Unknown Show'"
            :season="item.season"
            :number="item.number"
            :absolute-number="item.absoluteNumber"
          />
        </template>
      </results-group>
    </div>
  </div>
  <div v-if="isLoading" class="centered-container">
    <loading />
  </div>
</template>

<script lang="ts">
import { useRequestState } from '@/composition/request-state';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { Loading } from '@anime-skip/ui';
import { injectSearchCriteria } from './state';
import Api from '@/api';
import { GqlEpisode, GqlShow } from '@anime-skip/axios-api';
import ShowSearchResult from './search-results/ShowSearchResult.vue';
import EpisodeSearchResult from './search-results/EpisodeSearchResult.vue';
import ResultsGroup from './search-results/ResultsGroup.vue';
import axios, { CancelTokenSource } from 'axios';

export interface SearchCriteria {
  searchText: string;
}

type ShowResult = Pick<GqlShow, 'id' | 'name' | 'seasonCount' | 'episodeCount'>;
type EpisodeResult = Pick<GqlEpisode, 'id' | 'name' | 'number' | 'absoluteNumber' | 'season'> & {
  show: Pick<GqlShow, 'id' | 'name'>;
};

const PAGE_SIZE = 10;

export default defineComponent({
  components: { Loading, ShowSearchResult, EpisodeSearchResult, ResultsGroup },
  setup() {
    const { searchCriteria, onChangeSearchCriteria, updateSearchCriteria } = injectSearchCriteria();

    const showResults = ref<ShowResult[]>([]);
    const episodeResults = ref<EpisodeResult[]>([]);
    const hasResults = computed(() => showResults.value.length + episodeResults.value.length > 0);

    const { isLoading, isSuccess, isFailure, tryCatch } = useRequestState();
    const page = ref(0);
    const hasNextPage = ref(false);
    const lastEpisodePageSize = ref(0);
    const lastShowPageSize = ref(0);
    const showCancelToken = ref<CancelTokenSource | undefined>(undefined);
    const episodeCancelToken = ref<CancelTokenSource | undefined>(undefined);
    const loadNextPage = tryCatch(
      async () => {
        showCancelToken.value?.cancel('canceled');
        episodeCancelToken.value?.cancel('canceled');
        showCancelToken.value = axios.CancelToken.source();
        episodeCancelToken.value = axios.CancelToken.source();
        const { shows, episodes, searchText } = searchCriteria.value;
        const searchShows = () =>
          Api.searchShows(
            `{
            id
            name
            seasonCount
            episodeCount
          }`,
            {
              search: searchText,
              limit: PAGE_SIZE,
              offset: PAGE_SIZE * page.value,
            },
            {
              // @ts-ignore: Weird type error?
              cancelToken: showCancelToken.value?.token,
            },
          );
        const searchEpisodes = () =>
          Api.searchEpisodes(
            `{
            id
            name
            number
            season
            absoluteNumber
            show {
              id
              name
            }
          }`,
            {
              search: searchText,
              limit: PAGE_SIZE,
              offset: PAGE_SIZE * page.value,
            },
            {
              // @ts-ignore: Weird type error?
              cancelToken: episodeCancelToken.value?.token,
            },
          );
        const [showResult, episodeResult] = await Promise.allSettled([
          !shows ? Promise.resolve() : searchShows(),
          !episodes ? Promise.resolve() : searchEpisodes(),
        ]);

        let newHasNextPage = false;

        if (showResult.status === 'fulfilled') {
          const value = showResult.value as ShowResult[] | undefined;
          if (value) {
            if (value.length === PAGE_SIZE) newHasNextPage = true;
            lastShowPageSize.value = value.length;
            showResults.value = [...showResults.value, ...value];
          }
        } else {
          throw showResult.reason;
        }

        if (episodeResult.status === 'fulfilled') {
          const value = episodeResult.value as EpisodeResult[] | undefined;
          if (value) {
            if (value.length === PAGE_SIZE) newHasNextPage = true;
            lastEpisodePageSize.value = value.length;
            episodeResults.value = [...episodeResults.value, ...value];
          }
        } else {
          throw episodeResult.reason;
        }

        page.value++;
        hasNextPage.value = newHasNextPage;
      },
      err => err.message !== 'canceled',
    );

    onChangeSearchCriteria(() => {
      page.value = 0;
      episodeResults.value = [];
      showResults.value = [];
      loadNextPage();
    });
    onMounted(() => {
      if (!searchCriteria.value.searchText) {
        loadNextPage();
      }
    });

    const isCombinedSearch = computed(
      () => searchCriteria.value.shows === searchCriteria.value.episodes,
    );
    const showLoadAllShows = computed(
      () => isCombinedSearch.value && lastShowPageSize.value >= PAGE_SIZE,
    );
    const showLoadAllEpisodes = computed(
      () => isCombinedSearch.value && lastEpisodePageSize.value >= PAGE_SIZE,
    );
    const loadAllShows = (): void => {
      updateSearchCriteria({
        ...searchCriteria.value,
        shows: true,
        episodes: false,
      });
    };
    const loadAllEpisodes = (): void => {
      updateSearchCriteria({
        ...searchCriteria.value,
        shows: false,
        episodes: true,
      });
    };

    const isInfiniteScroll = computed(() => !isCombinedSearch.value && hasNextPage.value);
    const isInfiniteScrollDone = computed(() => !isCombinedSearch.value && !hasNextPage.value);

    return {
      isLoading,
      isSuccess,
      isFailure,
      searchCriteria,
      showLoadAllShows,
      showLoadAllEpisodes,
      loadNextPage,
      loadAllShows,
      loadAllEpisodes,
      hasResults,
      showResults,
      episodeResults,
      isInfiniteScroll,
      isInfiniteScrollDone,
    };
  },
});
</script>

<style scoped>
.centered-container {
  @apply flex flex-col items-center py-12 space-y-4;
}
</style>
