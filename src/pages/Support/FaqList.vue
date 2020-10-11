<template>
  <div>
    <Faq question="The Anime Skip video player doesn't show up when I go to watch an episode">
      <template v-slot:default>
        <p>
          Make sure you've followed the
          <router-link to="/get-started">getting started guide</router-link> and you've properly
          installed the Anime Skip web extension. Also keep in mind that Anime Skip does not work on
          every streaming service, so make sure you're watching on one of the
          <router-link to="/#supported-services">supported services</router-link>.
        </p>
        <p>
          In very rare cases, a website update can break how the Anime Skip player replaces the
          websites default player with it's own. If you believe this is the case, you should be able
          to find some kind of announcement on the <a href="https://discord.gg/9wVhwZg">Discord</a>.
        </p>
      </template>
    </Faq>

    <Faq question="How do I edit keyboard shortcuts?">
      <template v-slot:default>
        <p>
          Keyboard shortcuts are apart of the web extension options. Make sure you have followed the
          <router-link to="/get-started">getting started guide</router-link> and installed the web
          extension.
        </p>
        <span>
          <button
            class="primary"
            :class="{ disabled: !isExtensionInstalled }"
            @click="openKeyboardShortcuts"
          >
            Edit Keyboard Shortcuts
          </button>
          <span v-if="!isExtensionInstalled" class="not-installed-warning"
            >Extension not installed</span
          >
        </span>
        <p>
          <strong>If you have an account</strong> and are signed in, there are three ways to edit
          them: a button in the extension's popup, in the player's settings when watching an
          episode, or from you're <router-link to="/account">account settings</router-link>.
        </p>
        <p>
          <strong>If you don't have an account</strong>, you can still customize your keyboard
          shortcuts by right clicking on the extension's icon and selecting "Options" or "Settings"
          depending on your browser.
        </p>
      </template>
    </Faq>

    <Faq question="I would like to delete my account, how do I go about doing that?">
      <template v-slot:default>
        <p>
          In the future, there will be an option to delete your account from your account settings
          page. Until then, please fill out
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

    <Faq question="What happens to my account and contributions when I delete my account?">
      <template v-slot:default>
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
    const { openKeyboardShortcuts } = useExtensionInteraction();
    return {
      openKeyboardShortcuts,
      isExtensionInstalled,
    };
  },
});
</script>

<style lang="scss" scoped>
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
