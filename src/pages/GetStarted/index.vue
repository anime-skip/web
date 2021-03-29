<template>
  <div class="GetStarted">
    <div class="column">
      <h1>
        Get Started
        <p>Start binging anime faster than ever before in just 4 easy steps</p>
      </h1>
      <card
        title="Download the web extension"
        :done="isExtensionInstalled"
        :selected="currentCard === 1"
        :number="1"
      >
        <template v-slot:message>
          <p :class="{ secondary: isExtensionInstalled }">
            Anime Skip Player requires the web extension be installed on your browser before you can
            use the service. Click
            <a
              href="/support#web-ext-permissions"
              target="_blank"
              :class="{ secondary: isExtensionInstalled }"
              >here</a
            >
            to learn more the permissions it requires.
          </p>
          <p :class="{ secondary: isExtensionInstalled }">
            You may need to reload this page after installing.
          </p>
        </template>
        <template v-slot:buttons>
          <a v-if="isChrome || !isFirefox" :href="chromeUrl" class="button primary">
            Google Chrome
          </a>
          <a
            v-if="isFirefox || !isChrome"
            :href="firefoxUrl"
            target="_blank"
            class="button primary"
          >
            Firefox
          </a>
          <a v-if="isFirefox" :href="chromeUrl" target="_blank" class="button transparent">
            Google Chrome
          </a>
          <a v-if="isChrome" :href="firefoxUrl" class="button transparent">Firefox</a>
        </template>
      </card>

      <card
        title="Create an account"
        :done="accountStepComplete"
        :selected="currentCard === 2"
        :number="2"
      >
        <template v-slot:message>
          <ul :class="{ secondary: accountStepComplete }">
            <p :class="{ secondary: accountStepComplete }">
              Without an account, the Anime Skip Player will not let you:
            </p>
            <br />
            <li>Contributing episodes and timestamps to the community</li>
            <li>Automatic timestamp skipping</li>
            <li>Change playback speed</li>
          </ul>
          <template v-if="notCreatingAccount && !isLoggedIn">
            <p class="error-text">
              If you choose not to create an account, you'll be missing out on the main features
              that make the player awesome. Those features are disabled as an incentive for users to
              contribute - contributing is easy to do and the community will reap the benefits of
              more episodes and timestamps.
            </p>
            <p class="error-text">
              Anime Skip will not send you needless emails and we do not sell you personal data.
            </p>
          </template>
        </template>
        <template v-slot:buttons>
          <router-link
            v-if="!isLoggedIn"
            :to="{ path: '/sign-up', query: { redirect: '/get-started' } }"
            class="button primary"
          >
            Create Account
          </router-link>
          <template v-if="!accountStepComplete">
            <button
              v-if="notCreatingAccount && !isLoggedIn"
              class="error"
              @click="setupAccountLaterForce"
            >
              Setup Account Later
            </button>
            <button v-else class="transparent outline" @click="setupAccountLater">
              Skip
            </button>
          </template>
        </template>
      </card>

      <card
        title="Log in to the extension"
        :done="isExtensionLoggedIn"
        :selected="currentCard === 3"
        :number="3"
      >
        <template v-slot:message>
          <p :class="{ secondary: isExtensionLoggedIn }">
            Once you're logged in, you can setup the timestamps you want to skip.
          </p>
          <p :class="{ secondary: isExtensionLoggedIn }">
            There are a lot of different types of timestamps in anime, and you should be able to
            skip only what you want. To learn more about what each timestamp represents, checkout
            the
            <a
              href="/support#timestamp-types"
              target="_blank"
              :class="{ secondary: isExtensionLoggedIn }"
            >
              FAQ page</a
            >
            for a summary of each.
          </p>
        </template>
        <template v-if="!isExtensionLoggedIn" v-slot:buttons>
          <button class="primary" :class="{ disabled: !isExtensionInstalled }" @click="openLogin">
            Login
          </button>
          <button class="transparent outline" @click="logIntoExtension">
            Skip
          </button>
        </template>
      </card>

      <card title="Watch some anime!" :selected="currentCard === 4" :number="4">
        <template v-slot:message>
          <p>
            You're good to go! Head over to one of the supported services and start watching some
            anime!
          </p>
          <ul>
            <p>Join the Discord! There you'll find:</p>
            <br />
            <li>Announcements</li>
            <li>Support</li>
            <li>Feature Requests</li>
            <li>Bug reports</li>
            <br />
            <p>
              Since the community is just getting started, it's pretty quiet, but we'd love to have
              you!
            </p>
          </ul>
        </template>
        <template v-slot:buttons>
          <a href="https://discord.gg/9wVhwZg" class="button primary">Join the Discord</a>
          <a class="button transparent outline" href="/#supported-services">
            Supported Servces
          </a>
          <a href="/#recently-added" class="button transparent outline">
            Recently Added Shows
          </a>
        </template>
      </card>

      <div v-if="isDev">
        <button class="dev transparent" @click="sendMockInstallMessage">Send install event</button>
        <button class="dev transparent" @click="sendMockLoginMessage">Send log in event</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from './Card.vue';
import { detectBrowser } from '../../utils';
import useExtensionStatus from '@/composition/extension-status';
import useExtensionInteraction from '@/composition/extension-interaction';
import useEnv from '@/composition/env';
import { useStore } from 'vuex';
import { CHROME_STORE_URL, FIREFOX_STORE_URL } from '@/utils/constants';

export default defineComponent({
  components: { Card },
  setup() {
    const { isDev } = useEnv();
    const { sendMockInstallMessage, sendMockLoginMessage, openLogin } = useExtensionInteraction();
    const { isExtensionInstalled, isExtensionLoggedIn, logIntoExtension } = useExtensionStatus();

    // Browser
    const browser = detectBrowser();
    const isChrome = browser === 'chrome';
    const isFirefox = browser === 'firefox';

    // Card Checks
    const store = useStore();
    const isLoggedIn = computed<boolean>(() => store.getters.IS_SIGNED_IN);
    const accountStepComplete = ref<boolean>(store.getters.IS_SIGNED_IN);
    const notCreatingAccount = ref<boolean>(false);
    const setupAccountLater = () => {
      notCreatingAccount.value = true;
    };
    const setupAccountLaterForce = () => {
      accountStepComplete.value = true;
    };

    // Selected Card
    const currentCard = computed<number>(() => {
      if (!isExtensionInstalled.value) return 1;
      if (!accountStepComplete.value) return 2;
      if (!isExtensionLoggedIn.value) return 3;
      return 4;
    });

    return {
      isDev,
      sendMockInstallMessage,
      sendMockLoginMessage,
      openLogin,

      isChrome,
      isFirefox,

      isExtensionInstalled,
      isLoggedIn,
      accountStepComplete,
      notCreatingAccount,
      setupAccountLater,
      setupAccountLaterForce,
      isExtensionLoggedIn,
      logIntoExtension,

      currentCard,
      chromeUrl: CHROME_STORE_URL,
      firefoxUrl: FIREFOX_STORE_URL,
    };
  },
});
</script>

<style lang="scss" scoped>
.GetStarted {
  display: flex;
  flex-direction: column;
  align-items: center;

  .column {
    width: 1080px + 2 * 24px;
    max-width: 100%;
    padding: 64px 24px 192px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    & > * {
      margin-bottom: 24px;
    }
  }

  h1 {
    padding-top: 48px;
    padding-bottom: 64px;

    p {
      font-weight: 500;
    }
  }

  .dev {
    margin-right: 16px;
  }

  ul.secondary,
  ul.secondary * {
    color: $textSecondaryColor;
  }

  li {
    margin-left: 36px;
    margin-bottom: 8px;
  }

  .transparent {
    color: $textSecondaryColor;
  }

  .alpha-testers {
    margin-top: 128px;

    & > * {
      margin-bottom: 24px;
    }

    .spacer {
      height: 24px;
    }

    .highlight {
      color: #009ce4;

      &.red {
        color: #e57373;
      }
    }

    p {
      line-height: 24px;
    }

    h2 {
      margin-bottom: 16px;
    }
  }

  code {
    padding: 2px 6px;
    background-color: rgba($color: #ffffff, $alpha: 0.12);
    color: white;
    border-radius: 3px;
    font-family: monospace;
    font-size: 16px;
  }
}
</style>
