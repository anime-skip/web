<template>
  <div class="flex flex-col min-h-screen">
    <nav-bar
      class="fixed left-0 top-0 right-0 z-10"
      :home-icon="homeIcon"
      home-title="Anime Skip"
      home-link="/"
      :left-items="leftItems"
      :right-items="rightItems"
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
import useAccount from '@/composition/account';

export default defineComponent({
  components: { NavBar, SiteFooter },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters.IS_SIGNED_IN);
    const { username } = useAccount();

    const leftItems = computed(() => [
      { type: 'basic', key: 'get-started', title: 'Get Started', link: '/get-started' },
    ]);

    const rightItems = computed(() => {
      const items: any[] = [
        {
          type: 'basic',
          key: 'search',
          title: 'Search',
          link: '/search',
        },
      ];
      if (!isLoggedIn.value) {
        items.push({ type: 'basic', key: 'log-in', title: 'Log In', link: '/log-in' });
      } else {
        items.push({
          type: 'dropdown',
          key: 'account',
          title: username.value,
          children: [
            { type: 'basic', key: 'account-settings', title: 'Account', link: '/account' },
            { type: 'basic', key: 'log-out', title: 'Log Out', link: '/log-out' },
          ],
        });
      }
      return items;
    });

    return {
      leftItems,
      rightItems,
      homeIcon,
      isLoggedIn,
    };
  },
});
</script>
