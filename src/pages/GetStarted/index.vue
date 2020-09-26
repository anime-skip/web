<template>
  <div class="GetStarted">
    <div class="column">
      <h1>Get Started</h1>
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
          <p :class="{ secondary: hasAccount }">
            You need an account to be able to use some features provided by Anime Skip:
          </p>
          <ul :class="{ secondary: hasAccount }">
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
          <p :class="{ secondary: false }">
            You can check out the recently added list to find shows or just start watching.
          </p>
        </template>
        <template v-slot:buttons>
          <router-link to="/#recently-added" class="button primary">Recently Added</router-link>
        </template>
      </card>

      <div v-if="isDev">
        <button class="dev transparent" @click="sendInstallMessage">Send install event</button>
        <button class="dev transparent" @click="sendLoginMessage">Send log in event</button>
      </div>

      <div v-if="isExtensionInstalled && hasAccount && isExtensionLoggedIn" class="alpha-testers">
        <h2>Alpha Testers</h2>
        <p>
          <i><span class="highlight">If you don't have a VRV account</span></i
          >, reach out to Aaron and he can give you access to a shared account.
        </p>
        <p>
          <span class="highlight red">Please don't try and break anything right now</span>, there
          will be a time and place for you to test out the security of the application. This is just
          a usage test, ie: do you like what this provides?
        </p>
        <div class="spacer" />

        <h2>Shows/Test Data</h2>
        <p>
          <a href="https://vrv.co/series/G6J0G49DR/Tower-of-God">Tower of God</a>,
          <a href="https://vrv.co/series/G6ZJ48K4Y/No-Game-No-Life">No Game, No Life</a>, and
          <a href="https://vrv.co/series/GY5P48XEY/Demon-Slayer-Kimetsu-no-Yaiba">Demon Slayer</a>
          are fully filled out. There are a few other shows that have episodes with timestamps from
          the current season, but right now those are the primary ones.
        </p>
        <p>
          <i><span class="highlight">If you're one of my testers new to anime</span></i
          >, I would NOT recommend No Game, No Life or Tower of God. Instead, I would recommend
          <a href="https://vrv.co/series/G6ZJ48K4Y/Death-Note">Death Note</a> first because it's
          dubbed (24/48 episodes have timestamps), and Demon Slayer second because it is subbed.
        </p>
        <p>
          Try and watch at least 3 episodes before you give up on the show. Its only an hour of your
          life.
        </p>
        <div class="spacer" />

        <h2>Tips & Tricks</h2>

        <h3>Basic Keyboard Shortcuts</h3>
        <p>
          There are keyboard shortcuts if you watch something that doesn't have timestamps. They are
          designed for you to place your index fingers on <code>F</code> and <code>J</code> like
          you're typing.
        </p>
        <ul>
          <li>
            <code>R</code>
            - Advance 1:30
          </li>
          <li>
            <code>F</code>
            - Advance 0:05
          </li>
          <li>
            <code>V</code>
            - Advance 0:01
          </li>
          <br />
          <li>
            <code>W</code>
            - Go back 1:30
          </li>
          <li>
            <code>S</code>
            - Go back 0:05
          </li>
          <li>
            <code>X</code>
            - Go back 0:01
          </li>
          <br />
          <li>
            <code>E</code>
            - Next timestamp
          </li>
          <li>
            <code>D</code> <code>SPACE</code>
            - Play/pause
          </li>
          <li>
            <code>C</code>
            - Previous timestamp
          </li>
        </ul>

        <h3>Editing Keyboard Shortcuts</h3>
        <ul>
          <li>
            <code>J</code>
            - Go back 1 frame
          </li>
          <li>
            <code>K</code>
            - When editing, create a timestamp
          </li>
          <li>
            <code>L</code>
            - Advance 1 frame
          </li>
        </ul>
        <p>
          I'm not going to go into editing right now, but you're welcome to mess around.
          <span class="highlight red">Please do this in shows I haven't done yet</span>. Other than
          the shortcuts, it's fairly straight forward and easy to do.
        </p>
        <p>
          If you want to add some timestamps to shows I haven't gotten to, place the timestamps the
          frame after the cut, not the frame before the cut.
        </p>
        <p>
          For an example, open an episode from Tower of God and go into edit mode. Skip to a
          timestamp that has a hard cut using <code>E</code> or <code>C</code>, then press
          <code>J</code> to go back 1 frame. It will take you to before the cut, meaning the
          timestamp should be the next frame, the one after the cut.
        </p>
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
    padding: 30vh 24px 30vh 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    & > * {
      margin-bottom: 24px;
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
