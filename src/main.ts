import { createApp } from 'vue';
import plugins from '@/plugins';
import '@anime-skip/ui/tailwind.css';
import './styles/hide-recaptcha.css';
import './styles/custom-drop-shadows.css';

// Highlight JS setup
// @ts-expect-error: no types
import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/base16/horizon-dark.css';
import hljs from 'highlight.js';
// @ts-expect-error: no types
import hljsDefineGraphQL from 'highlightjs-graphql';

import { VueReCaptcha } from 'vue-recaptcha-v3';

import Checkbox from '@/components/Checkbox.vue';
import NavAndFooterLayout from '@/layouts/NavAndFooter.vue';
import { RouterView } from 'vue-router';

if (import.meta.env.VITE_APP_TITLE != null) {
  document.title += ` ${import.meta.env.VITE_APP_TITLE}`;
}

hljsDefineGraphQL(hljs);

createApp(RouterView)
  .component('checkbox', Checkbox)
  .component('NavAndFooterLayout', NavAndFooterLayout)
  .use(plugins.router)
  .use(plugins.store)
  .use(VueHighlightJS)
  .use(VueReCaptcha, { siteKey: '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np' })
  .mount('#app');
