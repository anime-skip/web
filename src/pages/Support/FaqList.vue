<template>
  <div>
    <Faq
      id="player-not-showing"
      question="The Anime Skip video player doesn't show up when I go to watch an episode"
    >
      <template #default>
        <p>
          Make sure you've followed the
          <router-link to="/get-started">getting started guide</router-link> and you've properly
          installed the Anime Skip web extension. Also keep in mind that Anime Skip does not work on
          every streaming service, so make sure you're watching on one of the
          <a href="/#supported-services">supported services</a>.
        </p>
        <p>
          In very rare cases, a website update can break how the Anime Skip player replaces the
          websites default player with it's own. If you believe this is the case, you should be able
          to find some kind of announcement on the <a href="https://discord.gg/9wVhwZg">Discord</a>.
        </p>
      </template>
    </Faq>

    <Faq id="contributing" question="How do I start contributing?">
      <template #default>
        <p>
          Head over to the
          <router-link to="/contributing">contributing guideliens</router-link> for an overview,
          best practices, and tips and tricks.
        </p>
      </template>
    </Faq>

    <Faq id="edit-keyboard-shortcuts" question="How do I edit keyboard shortcuts?">
      <template #default>
        <p>
          Keyboard shortcuts are apart of the web extension. Make sure you have followed the
          <router-link to="/get-started">getting started guide</router-link> and installed the web
          extension.
        </p>
        <span>
          <button
            class="primary"
            :class="{ disabled: !isExtensionInstalled }"
            @click="openPlayerSettings"
          >
            Edit Keyboard Shortcuts
          </button>
          <span v-if="!isExtensionInstalled" class="not-installed-warning"
            >Extension not installed</span
          >
        </span>
        <p>
          <strong>If you have an account</strong> and are signed in, there are two ways to edit
          them: the "All Settings" button in the extension's popup or on the video player, or from
          you're <router-link to="/account">account settings</router-link>.
        </p>
        <p>
          <strong>If you don't have an account</strong>, you can still customize your keyboard
          shortcuts by right clicking on the extension's icon and selecting "Options" or "Settings"
          depending on your browser.
        </p>
      </template>
    </Faq>

    <Faq
      id="delete-my-account"
      question="I would like to delete my account, how do I go about doing that?"
    >
      <template #default>
        <p>
          In the future, there will be an option to delete your account from your account settings
          page. Until then, fill out and send
          <a
            href="mailto:support@anime-skip.com?subject=Anime Skip - Delete Account&body=My email is _, and my username is _."
            target="_blank"
          >
            this email template</a
          >
          so that I can delete your account manually.
        </p>
      </template>
    </Faq>

    <Faq
      id="deleted-account-info"
      question="What happens to my account and contributions when I delete my account?"
    >
      <template #default>
        <p>
          Your contributations are not deleted and you're account is wiped of all personal data. No
          history of your personal information is ever stored.
        </p>
        <p>
          This is done so that Anime Skip still knows which account created an episode or timestamp.
          This way we can tell deleted users apart and still provide a robust interface with any
          apps that depend on that data, while respecting your right to your data.
        </p>
      </template>
    </Faq>

    <Faq
      id="web-ext-permissions"
      question="What permissions does the Anime Skip Player use, and why?"
    >
      <template #default>
        <div>
          <p><strong>Host</strong></p>
          <p>This is used to replace the original serice's video player with Anime Skips.</p>
          <p>
            For Chrome, this shows as the "Host" permission. For Firefox, it shows as "Access your
            data for ____"
          </p>
        </div>
        <div>
          <p><strong>Storage</strong></p>
          <p>
            In order to provide a good user experience, the extension needs access to the browser's
            storage. An example: whether or not you are logged in is persisted to the extension's
            local storage so that you don't have to login for every episode.
          </p>
          <p>Also worth mentioning, the Anime Skip Player does not create or read cookies.</p>
        </div>
        <div>
          <p><strong>Tabs</strong></p>
          <p>
            For some services it's impossible to get the current URL when linking it to an episode.
            The permission is used to listen for tab URL changes. When a tab's URL changes, if it's
            for a service Anime Skip supports, the tab is notified what the new URL is.
          </p>
          <p>
            It's unfortunate this is required, and I recogize that how this permission is used could
            be abused to track user history. Eventually, I plan on open sourcing the web extension
            so anyone can verify it's not abused, but for now you will just have to trust the
            Chrome/Firefox extension review processes. They are very strict about permission usage,
            so you shouldn't worry about this.
          </p>
          <p>
            VRV (and maybe future services) uses HTML5 histroy to navigate their Single Page
            Application, meaning in iframes that are not from the same origin cannot get the tab's
            current URL. They can get the URL that the iframe was created at, but when HTML5 history
            is used to go to another episode, the iframe isn't always destroyed (it's reused with a
            new tab URL), meaning the method to aforementioned method would return the original URL,
            not the new one.
          </p>
          <p>
            The "currentTab" permission does not provide enough utility for each tab to be notified
            when it's URL changes, so that can't be used as a replacement.
          </p>
        </div>
      </template>
    </Faq>
  </div>
</template>

<script lang="ts">
import useExtensionInteraction from '@/composition/extension-interaction';
import useExtensionStatus from '@/composition/extension-status';
import { defineComponent } from 'vue';
import Faq from './Faq.vue';

export default defineComponent({
  components: { Faq },
  setup() {
    const { isExtensionInstalled } = useExtensionStatus();
    const { openPlayerSettings } = useExtensionInteraction();
    return {
      openPlayerSettings,
      isExtensionInstalled,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/theme.scss';

button {
  margin-top: 16px;
  margin-bottom: 16px;
}

.not-installed-warning {
  margin-left: 16px;
  color: $textSecondaryColor;
  font-size: 14px;
}
</style>
