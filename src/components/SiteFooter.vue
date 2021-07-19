<template>
  <footer class="bg-control pt-24">
    <div class="px-2 flex flex-wrap justify-center">
      <div class="group">
        <h6>Anime Skip</h6>
        <a href="https://www.buymeacoffee.com/anime.skip" target="_blank"
          >Buy me a pizza! <span>🍕</span></a
        >
        <div class="space" />
        <a :href="chromeUrl" target="_blank">Chrome Extension</a>
        <a :href="firefoxUrl" target="_blank">Firefox Addon</a>
      </div>

      <div class="group">
        <h6>Supported Services</h6>
        <a href="https://vrv.co/" target="_blank">VRV</a>
        <a href="https://www.funimation.com/" target="_blank">FunimationNow</a>
      </div>

      <div class="group">
        <h6>Help Center</h6>
        <router-link to="/contributing">Contributing</router-link>
        <router-link to="/support">Support</router-link>
        <a href="mailto:support@anime-skip.com?subject=Anime Skip">Contact Us</a>
        <router-link to="/policies/privacy-policy">Privacy Policy</router-link>
      </div>

      <div class="group">
        <h6>Other Resources</h6>
        <a href="https://discord.gg/9wVhwZg" target="_blank">Join the Discord</a>
        <router-link to="/api">API</router-link>
        <a href="http://tuckerchap.in/BetterVRV/">BetterVRV</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { CHROME_STORE_URL, FIREFOX_STORE_URL } from '@/utils/constants';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      chromeUrl: CHROME_STORE_URL,
      firefoxUrl: FIREFOX_STORE_URL,
    };
  },
});
</script>

<style scoped>
.group {
  @apply w-72 flex flex-col px-8 space-y-3 items-start mb-16;
}

h6 {
  @apply pb-3;
}

.space {
  @apply pb-1;
}

a {
  @apply text-on-surface text-opacity-medium;
}

/*
footer {
  padding: 16px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .column {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1128px;
  }

  * {
    // color: $textDisabledColor;
    text-decoration: none;
  }

  .group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 32px;
    flex-shrink: 0;

    h6 {
      // color: $textPrimaryColor;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .space {
      height: 16px;
    }

    a {
      margin: 4px 0;
    }
  }
}
*/
</style>
