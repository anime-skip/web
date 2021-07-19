import { createApp } from 'vue';
import plugins from '@/plugins';
import '@anime-skip/ui/tailwind.css';
import './styles/hide-recaptcha.css';
import './styles/custom-drop-shadows.css';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import NavAndFooterLayout from '@/layouts/NavAndFooter.vue';
import { RouterView } from 'vue-router';
import { Vue3HighlightJs } from './utils/VueHighlightJs';

if (import.meta.env.VITE_APP_TITLE != null) {
  document.title += ` ${import.meta.env.VITE_APP_TITLE}`;
}

createApp(RouterView)
  .component('NavAndFooterLayout', NavAndFooterLayout)
  .use(plugins.router)
  .use(plugins.store)
  .use(Vue3HighlightJs, {})
  .use(VueReCaptcha, { siteKey: '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np' })
  .mount('#app');
