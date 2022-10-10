<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { ExternalLinks } from '~~/utils/external-links';

enum Steps {
  INSTALL_EXTENSION = 1,
  CREATE_ACCOUNT = 2,
  EXTENSION_LOGIN = 3,
  NEXT_STEPS = 4,
}

const { isExtensionInstalled, isExtensionLoggedIn, logIntoExtension, installExtension } =
  useExtensionStatus();
const auth = useAuthStore();

const createAccountSkipped = ref(false);

const isExtensionInstallComplete = computed(() => isExtensionInstalled.value);
const isCreateAccountComplete = computed(() => createAccountSkipped.value || auth.account != null);
const isExtensionLoginComplete = computed(() => isExtensionLoggedIn.value);

const activeStep = computed(() => {
  if (!isExtensionInstallComplete.value) return Steps.INSTALL_EXTENSION;
  if (!isCreateAccountComplete.value) return Steps.CREATE_ACCOUNT;
  if (!isExtensionLoginComplete.value) return Steps.EXTENSION_LOGIN;
  return Steps.NEXT_STEPS;
});

const isDev = process.env.NODE_ENV;
</script>

<template>
  <ol>
    <get-started-step
      :number="Steps.INSTALL_EXTENSION"
      title="Download the Browser Extension"
      :completed="isExtensionInstallComplete"
      :active="activeStep === Steps.INSTALL_EXTENSION"
    >
      <p>
        Anime Skip Player requires the web extension be installed on your browser before you can use
        the service.
        <nuxt-link to="/support#extension-permissions" class="link link-hover link-secondary"
          >Click here</nuxt-link
        >
        to learn more about the permissions it requires.
      </p>
      <p>You may need to reload this page after installing.</p>
      <div class="flex gap-6 flex-wrap">
        <nuxt-link :to="ExternalLinks.CHROME_WEB_STORE" class="btn btn-primary gap-2"
          >Google Chrome <span class="i-mdi-open-in-new text-xl"
        /></nuxt-link>
        <nuxt-link class="btn gap-2" :to="ExternalLinks.FIREFOX_ADDON_STORE"
          >Firefox<span class="i-mdi-open-in-new text-xl"
        /></nuxt-link>
      </div>
    </get-started-step>

    <!-- Create Account -->
    <get-started-step
      :number="Steps.CREATE_ACCOUNT"
      title="Create an Account"
      :completed="isCreateAccountComplete"
      :active="activeStep === Steps.CREATE_ACCOUNT"
    >
      <p>
        Without an account, the Anime Skip Player will not let you contribute episodes and
        timestamps to the community.
      </p>
      <div v-if="auth.account == null" class="flex gap-6 flex-wrap">
        <nuxt-link
          :to="{ path: '/sign-up', query: { redirect: '/get-started' } }"
          class="btn btn-primary gap-2"
          >Sign up</nuxt-link
        >
        <nuxt-link
          :to="{ path: '/login', query: { redirect: '/get-started' } }"
          class="btn btn-primary gap-2"
          >Log in</nuxt-link
        >
        <button v-if="!createAccountSkipped" class="btn gap-2" @click="createAccountSkipped = true">
          Skip
        </button>
      </div>
    </get-started-step>

    <!-- Extension Login -->
    <get-started-step
      :number="Steps.EXTENSION_LOGIN"
      title="Log Into the Extension"
      :completed="isExtensionLoginComplete"
      :active="activeStep === Steps.EXTENSION_LOGIN"
    >
      <p>Once you're logged in, you can setup the timestamps you want to skip.</p>

      <p>
        There are a lot of different types of timestamps in anime, and you should be able to skip
        only what you want. To learn more about what each timestamp represents, checkout the
        <nuxt-link class="link link-hover link-secondary" to="/support#faq">FAQ page</nuxt-link>.
      </p>
    </get-started-step>

    <!-- Next Steps -->
    <get-started-step
      :number="Steps.NEXT_STEPS"
      title="Start Watching Anime!"
      :completed="false"
      :active="activeStep === Steps.NEXT_STEPS"
    >
      <p>You're done! Head over to one of the supported services and start watching some anime.</p>
      <p>
        <nuxt-link class="link link-hover link-secondary" :to="ExternalLinks.DISCORD_INVITE"
          >Join the Discord</nuxt-link
        >! There you'll find:
      </p>
      <ul class="list-disc pl-8">
        <li>Announcements</li>
        <li>Support</li>
        <li>Feature requests</li>
        <li>Bug reports</li>
      </ul>
      <div class="space-x-6">
        <nuxt-link to="/#supported-services" class="btn btn-primary gap-2"
          >Supported Services</nuxt-link
        >
        <nuxt-link to="/#recently-added" class="btn gap-2">Recently Added</nuxt-link>
      </div>
    </get-started-step>

    <!-- Dev Helpers -->
    <li v-if="isDev" class="flex gap-6">
      <button class="btn" @click="installExtension()">Install Extension</button>
      <button class="btn" @click="logIntoExtension()">Log Into Extension</button>
    </li>
  </ol>
</template>
