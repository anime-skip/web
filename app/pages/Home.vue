<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import HomeSectionHero from "../components/HomeSectionHero.vue";
import HomeSectionFeatures from "../components/HomeSectionFeatures.vue";
import HomeSectionApi from "../components/HomeSectionApi.vue";
import MainFooter from "app/components/MainFooter.vue";
import MainNavigation from "app/components/MainNavigation.vue";
import HomeSectionRecentlyAdded from "app/components/HomeSectionRecentlyAdded.vue";

useHead({
  title: "Anime Skip",
});
</script>

<template>
  <MainNavigation />
  <HomeSectionHero class="pt-main-navigation" />
  <HomeSectionFeatures class="bg-primary/5" />
  <HomeSectionRecentlyAdded />
  <HomeSectionApi class="bg-primary/5" />
  <MainFooter />
</template>
