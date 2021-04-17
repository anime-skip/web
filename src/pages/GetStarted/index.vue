<template>
  <NavAndFooterLayout>
    <div class="mt-16 px-6">
      <div class="max-w-screen-lg mx-auto space-y-4">
        <div class="h-24" />
        <h4>Get Started</h4>
        <p class="body-1 text-on-surface text-opacity-medium">
          Start binging anime faster than ever before in 4 easy steps
        </p>
        <div class="h-8" />

        <card
          title="Download the web extension"
          :done="isExtensionInstalled"
          :selected="currentCard === 1"
          :number="1"
        >
          <template #message>
            <p class="body-1 text-on-surface text-opacity-high">
              Anime Skip Player requires the web extension be installed on your browser before you
              can use the service.
              <a
                href="/support#web-ext-permissions"
                target="_blank"
                class="text-secondaryPalette-300 hover:underline"
                >Click here</a
              >
              to learn more the permissions it requires.
            </p>
            <p class="body-1 text-on-surface text-opacity-high">
              You may need to reload this page after installing.
            </p>
          </template>
          <template #buttons>
            <template v-if="isFirefox">
              <raised-button>
                <a :href="firefoxUrl" target="_blank">Firefox</a>
              </raised-button>
              <flat-button transparent>
                <a :href="chromeUrl" target="_blank">Google Chrome</a>
              </flat-button>
            </template>
            <template v-else>
              <raised-button>
                <a :href="chromeUrl" target="_blank">Google Chrome</a>
              </raised-button>
              <flat-button transparent>
                <a :href="firefoxUrl" target="_blank">Firefox</a>
              </flat-button>
            </template>
          </template>
        </card>

        <card
          title="Create an account"
          :done="accountStepComplete"
          :selected="currentCard === 2"
          :number="2"
        >
          <template #message>
            <p class="body-1 text-on-surface text-opacity-high">
              Without an account, the Anime Skip Player will not let you:
            </p>
            <ul>
              <li class="body-1 text-on-surface text-opacity-high">
                Contributing episodes and timestamps to the community
              </li>
              <li class="body-1 text-on-surface text-opacity-high">
                Automatically skip timestamps
              </li>
              <li class="body-1 text-on-surface text-opacity-high">Change playback speed</li>
            </ul>
            <template v-if="notCreatingAccount && !isLoggedIn">
              <p class="body-1 text-error">
                If you choose not to create an account, you'll be missing out on the main features
                that make the player awesome. Those features are disabled as an incentive for users
                to contribute; contributing is easy to do and the community will reap the benefits
                of more episodes and timestamps.
              </p>
              <p class="body-1 text-error">
                Anime Skip will not send you needless emails and we do not sell you personal data.
              </p>
            </template>
          </template>
          <template #buttons>
            <raised-button
              v-if="!isLoggedIn"
              @click="router.push({ path: '/sign-up', query: { redirect: '/get-started' } })"
            >
              Create Account
            </raised-button>
            <template v-if="!accountStepComplete">
              <raised-button
                v-if="notCreatingAccount && !isLoggedIn"
                error
                @click="setupAccountLaterForce"
              >
                Setup Account Later
              </raised-button>
              <flat-button v-else transparent @click="setupAccountLater">Skip</flat-button>
            </template>
          </template>
        </card>

        <card
          title="Log in to the extension"
          :done="isExtensionLoggedIn"
          :selected="currentCard === 3"
          :number="3"
        >
          <template #message>
            <p class="body-1 text-on-surface text-opacity-high">
              Once you're logged in, you can setup the timestamps you want to skip.
            </p>
            <p class="body-1 text-on-surface text-opacity-high">
              There are a lot of different types of timestamps in anime, and you should be able to
              skip only what you want. To learn more about what each timestamp represents, checkout
              the
              <a
                href="/support#timestamp-types"
                target="_blank"
                class="text-secondaryPalette-300 hover:underline"
              >
                FAQ page</a
              >.
            </p>
          </template>
          <template v-if="!isExtensionLoggedIn" #buttons>
            <raised-button :disabled="!isExtensionInstalled" @click="openLogin">
              Login
            </raised-button>
            <flat-button transparent @click="logIntoExtension">Skip</flat-button>
          </template>
        </card>

        <card title="Watch some anime!" :selected="currentCard === 4" :number="4">
          <template #message>
            <p class="body-1 text-on-surface text-opacity-high">
              You're good to go! Head over to one of the supported services and start watching some
              anime!
            </p>
            <p class="body-1 text-on-surface text-opacity-high">
              Join the Discord! There you'll find:
            </p>
            <ul>
              <li class="body-1 text-on-surface text-opacity-high">Announcements</li>
              <li class="body-1 text-on-surface text-opacity-high">Support</li>
              <li class="body-1 text-on-surface text-opacity-high">Feature Requests</li>
              <li class="body-1 text-on-surface text-opacity-high">Bug reports</li>
            </ul>
            <p class="body-1 text-on-surface text-opacity-high">
              Since the community is just getting started, it's pretty quiet, but we'd love to have
              you!
            </p>
          </template>
          <template #buttons>
            <raised-button>
              <a href="https://discord.gg/9wVhwZg" class="button primary">Join the Discord</a>
            </raised-button>
            <flat-button transparent>
              <a class="button transparent outline" href="/#supported-services"
                >Supported Servces</a
              >
            </flat-button>
            <flat-button transparent>
              <a href="/#recently-added" class="button transparent outline">Recently Added Shows</a>
            </flat-button>
          </template>
        </card>

        <div v-if="isDev" class="flex space-x-4">
          <raised-button dark @click="sendMockInstallMessage"> Send install event </raised-button>
          <raised-button dark @click="sendMockLoginMessage"> Send log in event </raised-button>
        </div>

        <div class="h-24" />
      </div>
    </div>
  </NavAndFooterLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from './Card.vue';
import { detectBrowser } from '../../utils';
import useExtensionStatus from '@/composition/extension-status';
import useExtensionInteraction from '@/composition/extension-interaction';
import { useStore } from 'vuex';
import { CHROME_STORE_URL, FIREFOX_STORE_URL } from '@/utils/constants';
import { RaisedButton, FlatButton } from '@anime-skip/ui';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Card, RaisedButton, FlatButton },
  setup() {
    const { sendMockInstallMessage, sendMockLoginMessage, openLogin } = useExtensionInteraction();
    const { isExtensionInstalled, isExtensionLoggedIn, logIntoExtension } = useExtensionStatus();

    // Browser
    const browser = detectBrowser();
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
      isDev: import.meta.env.DEV,
      sendMockInstallMessage,
      sendMockLoginMessage,
      openLogin,

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

      router: useRouter(),
    };
  },
});
</script>

<style scoped>
ul {
  @apply list-inside list-disc pl-4;
}
/* .GetStarted {

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
    // color: $textSecondaryColor;
  }

  li {
    margin-left: 36px;
    margin-bottom: 8px;
  }

} */
</style>
