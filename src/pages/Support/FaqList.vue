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
          Keyboard shortcuts are apart of the web extension's options. Make sure you have followed
          the <router-link to="/get-started">getting started guide</router-link> and installed the
          web extension.
        </p>
        <p>
          <strong>If you have an account</strong> and are signed in, there is a button that will
          open these options for you in both the extension popup (when you click on the extnsion
          icon in the browser's top bar), and in the player's settings when watching an episode. The
          button is beneath the list of timestamp types you are skipping.
        </p>
        <p>
          <strong>If you don't have an account</strong>, you can still customize your keyboard
          shortcuts by right clicking on the extension icon and selecting "Options" or "Settings"
          depending on your browser.
        </p>
      </template>
    </Faq>

    <Faq question="I would like to delete my account, how do I go about doing that?">
      <template v-slot:default>
        <p>
          When you delete your account, your account is deleted forever. If you would like to come
          back to Anime Skip, you will have to create a new account.
        </p>
        <p>
          In the future, there will be an option to delete your account from your account settings
          page. Until then, please fill out
          <a
            href="mailto:aaron@anime-skip.com?subject=Anime Skip - Delete Account&body=My email is _, and my username is _."
            target="_blank"
          >
            this email template
          </a>
          so that I can delete your account manually.
        </p>
      </template>
    </Faq>

    <Faq question="What happens to my account and contributions when I delete my account?">
      <template v-slot:default>
        <p>
          Your contributations are not deleted, and you're account is wiped of all personal data. No
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
import { defineComponent } from 'vue';
import Faq from './Faq.vue';

export default defineComponent({
  components: { Faq },
});
</script>

<style lang="scss" scoped></style>
