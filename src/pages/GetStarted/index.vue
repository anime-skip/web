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
            After installing, reload the page
          </p>
          <p :class="{ secondary: isExtensionInstalled }" v-if="false">
            Anime Skip requires a web extension be installed on your browser before you can use the
            service. Click
            <a
              href="/faq#web-ext-permissions"
              class="white"
              :class="{ secondary: isExtensionInstalled }"
              >here</a
            >
            to learn more the permissions it requires.
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
          <a :href="genericZipUrl" target="_blank" class="button transparent">
            ZIP
          </a>
        </template>
      </card>

      <card title="Create an account" :done="hasAccount" :selected="currentCard === 2" :number="2">
        <template v-slot:message>
          <ul :class="{ secondary: hasAccount }">
            <p :class="{ secondary: hasAccount }">
              You need an account to be able to use some features provided by Anime Skip:
            </p>
            <br />
            <li>Automatic timestamp skipping</li>
            <li>Playback speed</li>
            <li>Submitting timestamps for the community</li>
          </ul>
          <p :class="{ secondary: hasAccount }">
            Without an account, you will still be able to use the awesome video player.
          </p>
        </template>
        <template v-slot:buttons>
          <router-link to="/sign-up" class="button primary">Create Account</router-link>
          <button v-if="!hasAccount" class="transparent" @click="setupAccountLater">
            Setup Account Later
          </button>
        </template>
      </card>

      <card
        title="Log into the extension"
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
            <a href="/faq#timestamp-types" class="white" :class="{ secondary: isExtensionLoggedIn }"
              >FAQ page</a
            >
            for a summary of each.
          </p>
        </template>
        <template v-if="!isExtensionLoggedIn" v-slot:buttons>
          <button class="primary" @click="logIntoExtension">Continue</button>
        </template>
      </card>

      <card title="Watch some anime!" :selected="currentCard === 4" :number="4">
        <template v-slot:message>
          <p>
            You're good to go! Head over to one of the supported services and start watching some
            anime!
          </p>
          <ul>
            <p><strong>Join the Discord!</strong> There you'll find:</p>
            <br />
            <li>Support</li>
            <li>Feature Requests</li>
            <li>Updates</li>
            <li>Bug reports</li>
          </ul>
        </template>
        <template v-slot:buttons>
          <a href="https://discord.gg/9wVhwZg" class="button primary">Join the Discord</a>
          <router-link class="button transparent outline" to="/#supported-services">
            Supported Servces
          </router-link>
          <router-link
            :to="{ path: '/', hash: '#recently-added' }"
            class="button transparent outline"
          >
            Recently Added Shows
          </router-link>
        </template>
      </card>

      <div v-if="isDev">
        <button class="dev transparent" @click="sendInstallMessage">Send install event</button>
        <button class="dev transparent" @click="sendLoginMessage">Send log in event</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from './Card.vue';
import { detectBrowser } from '../../utils';
import { SessionStorageKeys } from '../../utils/enums';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Card },
  setup() {
    // Dev stuff
    const isDev = process.env.NODE_ENV !== 'production';
    const sendInstallMessage = () => window.postMessage('@anime-skip/install-check', '*');
    const sendLoginMessage = () => window.postMessage('@anime-skip/login-check', '*');

    // Browser
    const browser = detectBrowser();
    const isChrome = browser === 'chrome';
    const isFirefox = browser === 'firefox';

    // Card Checks
    const store = useStore();
    const hasAccount = ref<boolean>(store.getters.IS_SIGNED_IN);
    const setupAccountLater = () => {
      hasAccount.value = true;
    };

    const isExtensionInstalled = ref<boolean>(
      sessionStorage.getItem(SessionStorageKeys.EXTENSION_INSTALLED) === 'true',
    );
    const isExtensionLoggedIn = ref<boolean>(
      sessionStorage.getItem(SessionStorageKeys.EXTENSION_LOGGED_IN) === 'true',
    );
    const logIntoExtension = () => {
      isExtensionLoggedIn.value = true;
    };
    function extensionMessageListener(event: MessageEvent) {
      if (event.data === '@anime-skip/login-check') {
        isExtensionLoggedIn.value = true;
        sessionStorage.setItem(SessionStorageKeys.EXTENSION_LOGGED_IN, 'true');
      } else if (event.data === '@anime-skip/install-check') {
        isExtensionInstalled.value = true;
        sessionStorage.setItem(SessionStorageKeys.EXTENSION_INSTALLED, 'true');
      }
    }
    window.addEventListener('message', extensionMessageListener);

    // Selected Card
    const currentCard = computed<number>(() => {
      if (!isExtensionInstalled.value) return 1;
      if (!hasAccount.value) return 2;
      if (!isExtensionLoggedIn.value) return 3;
      return 4;
    });

    return {
      isDev,
      sendInstallMessage,
      sendLoginMessage,

      isChrome,
      isFirefox,

      isExtensionInstalled,
      hasAccount,
      setupAccountLater,
      isExtensionLoggedIn,
      logIntoExtension,

      currentCard,
      genericZipUrl:
        'https://drive.google.com/file/d/1k6iuwvRul_ef6ijd0lTepGvhQch9XzM5/view?usp=sharing',
      chromeUrl:
        'https://chrome.google.com/webstore/detail/anime-skip/mgmdkjcljneegjfajchedjpdhbadklcf',
      firefoxUrl:
        'https://drive.google.com/file/d/1vDr7BK9AtCWFBbYuRpudO5qyIfUrN7zb/view?usp=sharing',
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
    padding: 64px 24px 64px 24px;
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
    color: $textDisabledColor;
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
