<template>
  <div class="flex flex-col min-h-screen">
    <nav-bar
      class="fixed left-0 top-0 right-0 z-10"
      :items="rightItems"
      home-title="Anime Skip"
      :home-icon="homeIcon"
      home-link="/"
    />
    <div class="flex flex-col flex-grow flex-shrink-0 mt-16">
      <slot />
    </div>
    <SiteFooter class="footer" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { NavBar } from '@anime-skip/ui';
import homeIcon from '@/assets/logo_nav.svg';
import { useStore } from 'vuex';

const getStartedLink = { title: 'Get Started', link: '/get-started' };

export default defineComponent({
  components: { NavBar, SiteFooter },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.IS_SIGNED_IN);

    const leftItems = computed(() => []);

    const rightItems = computed(() => {
      if (!isLoggedIn.value) return [getStartedLink, { title: 'Log In', link: '/log-in' }];

      return [
        getStartedLink,
        { title: 'Account', link: '/account' },
        { title: 'Log out', link: '/log-out' },
      ];
    });

    return {
      rightItems,
      homeIcon,
    };
  },
});
</script>
