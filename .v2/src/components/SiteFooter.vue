<script lang="ts" setup>
import { ExternalLinks } from '~~/utils/external-links';

const { data: allServices, isLoading } = useSupportedServicesQuery();
const supportedServices = computed(() => allServices.value.filter(s => s.supported));
</script>

<template>
  <footer class="footer p-10 bg-neutral text-neutral-content">
    <div>
      <span class="footer-title">Anime Skip</span>
      <a class="link link-hover" target="_blank" :href="ExternalLinks.BUY_ME_A_COFFEE"
        >Buy Me a Pizza! 🍕</a
      >
      <a class="link link-hover" target="_blank" :href="ExternalLinks.CHROME_WEB_STORE"
        >Chrome Extension</a
      >
      <a class="link link-hover" target="_blank" :href="ExternalLinks.FIREFOX_ADDON_STORE"
        >Firefox Addon</a
      >
    </div>
    <div>
      <span class="footer-title">Supported Services</span>
      <template v-if="!isLoading">
        <a
          v-for="service of supportedServices"
          class="link link-hover"
          target="_blank"
          :href="service.url"
          >{{ service.name }}</a
        >
      </template>
    </div>
    <div>
      <span class="footer-title">Help Center</span>
      <nuxt-link class="link link-hover" to="/docs/contributing-timestamps"
        >Contributing Timestamps</nuxt-link
      >
      <nuxt-link class="link link-hover" to="/support">Support</nuxt-link>
      <a class="link link-hover" href="mailto:support@anime-skip.com?subject=Anime Skip"
        >Contact Us</a
      >
      <nuxt-link class="link link-hover" to="/docs/policies/privacy">Privacy Policy</nuxt-link>
      <nuxt-link class="link link-hover" to="/docs/policies/extension-privacy"
        >Extension Privacy Policy</nuxt-link
      >
    </div>
    <div>
      <span class="footer-title">Other Resources</span>
      <a class="link link-hover" target="_blank" :href="ExternalLinks.DISCORD_INVITE"
        >Join the Discord</a
      >
      <nuxt-link class="link link-hover" to="/docs/api">API Documentation</nuxt-link>
      <a class="link link-hover" target="_blank" :href="ExternalLinks.API_PLAYGROUND"
        >API Playground</a
      >
      <a class="link link-hover" target="_blank" :href="ExternalLinks.BETTER_VRV">BetterVRV</a>
    </div>
  </footer>
</template>
