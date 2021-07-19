<template>
  <NavAndFooterLayout>
    <div class="px-6">
      <div class="max-w-screen-lg mx-auto space-y-4">
        <div class="h-24" />
        <h4>Get Started</h4>
        <p class="text-opacity-medium">
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
            <p>
              Anime Skip Player requires the web extension be installed on your browser before you
              can use the service.
              <router-link to="/support#web-ext-permissions" target="_blank"
                >Click here</router-link
              >
              to learn more the permissions it requires.
            </p>
            <p>You may need to reload this page after installing.</p>
          </template>
          <template #buttons>
            <template v-if="isFirefox">
              <raised-button :link="firefoxUrl">Firefox</raised-button>
              <flat-button transparent :link="chromeUrl" target="_blank">
                Google Chrome
              </flat-button>
            </template>
            <template v-else>
              <raised-button :link="chromeUrl" target="_blank">Google Chrome</raised-button>
              <flat-button transparent :link="firefoxUrl" target="_blank">Firefox</flat-button>
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
            <p>Without an account, the Anime Skip Player will not let you:</p>
            <ul>
              <li>Contributing episodes and timestamps to the community</li>
              <li>Automatically skip timestamps</li>
              <li>Change playback speed</li>
            </ul>
            <template v-if="notCreatingAccount && !isLoggedIn">
              <p class="text-error">
                If you choose not to create an account, you'll be missing out on the main features
                that make the player awesome. Those features are disabled as an incentive for users
                to contribute; contributing is easy to do and the community will reap the benefits
                of more episodes and timestamps.
              </p>
              <p class="text-error">
                Anime Skip will not send you needless emails and we do not sell you personal data.
              </p>
            </template>
          </template>
          <template #buttons>
            <raised-button
              v-if="!isLoggedIn"
              :link="`/sign-up?redirect=${encodeURIComponent('/get-started')}`"
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
            <p>Once you're logged in, you can setup the timestamps you want to skip.</p>
            <p>
              There are a lot of different types of timestamps in anime, and you should be able to
              skip only what you want. To learn more about what each timestamp represents, checkout
              the
              <router-link to="/support#timestamp-types" target="_blank"> FAQ page</router-link>
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
            <p>
              You're good to go! Head over to one of the supported services and start watching some
              anime!
            </p>
            <p>Join the Discord! There you'll find:</p>
            <ul>
              <li>Announcements</li>
              <li>Support</li>
              <li>Feature requests</li>
              <li>Bug reports</li>
            </ul>
            <p>
              Since the community is just getting started, it's pretty quiet, but we'd love to have
              you!
            </p>
          </template>
          <template #buttons>
            <raised-button link="https://discord.gg/9wVhwZg" target="blank">
              Join the Discord
            </raised-button>
            <flat-button transparent link="/#supported-services">Supported Servces</flat-button>
            <flat-button transparent link="/#recently-added">Recently Added Shows</flat-button>
          </template>
        </card>

        <div v-if="isDev" class="flex space-x-4">
          <raised-button dark @click="sendMockInstallMessage">Send install event</raised-button>
          <raised-button dark @click="sendMockLoginMessage">Send log in event</raised-button>
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
  @apply list-inside list-disc pl-4 space-y-2;
}
</style>
