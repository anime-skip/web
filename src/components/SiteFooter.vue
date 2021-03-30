<template>
  <footer>
    <div class="column">
      <div class="group">
        <h4>Anime Skip</h4>
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2GQQVS49AE57W&currency_code=USD&source=url"
          target="_blank"
        >
          Donate via PayPal
        </a>
        <div class="space" />
        <a :href="chromeUrl" target="_blank">Chrome Extension</a>
        <a :href="firefoxUrl" target="_blank">Firefox Addon</a>
      </div>

      <div class="group">
        <h4>Supported Services</h4>
        <a href="https://vrv.co/" target="_blank">VRV</a>
        <a href="https://www.funimation.com/" target="_blank">FunimationNow</a>
      </div>

      <div class="group">
        <h4>Help Center</h4>
        <router-link to="/contributing">Contributing</router-link>
        <router-link to="/support">Support</router-link>
        <a href="mailto:support@anime-skip.com?subject=Anime Skip">Contact Us</a>
        <router-link to="/policies/privacy-policy">Privacy Policy</router-link>
      </div>

      <div class="group">
        <h4>Other Resources</h4>
        <a href="https://discord.gg/9wVhwZg" target="_blank">Join the Discord</a>
        <a href="http://test.api.anime-skip.com/graphiql" target="_blank">API Playground</a>
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

<style lang="scss" scoped>
@import '@/scss/theme.scss';

footer {
  background-color: $dark400;
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
    color: $textDisabledColor;
    text-decoration: none;
  }

  .group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 32px;
    flex-shrink: 0;

    h4 {
      color: $textPrimaryColor;
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
</style>
