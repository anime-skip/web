<template>
  <nav-and-footer>
    <side-navigation>
      <template #side>
        <search-form />
      </template>

      <template #content>
        <results />
      </template>
    </side-navigation>
  </nav-and-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavAndFooter from '@/layouts/NavAndFooter.vue';
import SideNavigation from '@/layouts/SideNavigation.vue';
import Results from './Results.vue';
import SearchForm from './SearchForm.vue';
import { provideSearchCriteria } from './state';

export default defineComponent({
  components: {
    NavAndFooter,
    SideNavigation,
    SearchForm,
    Results,
  },
  setup() {
    const searchText = ref('');
    const hasResults = false;
    const isLoadingResults = true;

    provideSearchCriteria();

    return {
      searchText,
      hasResults,
      isLoadingResults,
    };
  },
});
</script>
