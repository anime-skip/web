import { createApp } from 'vue';
import plugins from '@/plugins';
import App from '@/App.vue';
import '@anime-skip/ui/style.css';

import { VueReCaptcha } from 'vue-recaptcha-v3';

import TextInput from '@/components/TextInput.vue';
import Checkbox from '@/components/Checkbox.vue';
import NavAndFooterLayout from '@/layouts/NavAndFooter.vue';

if (import.meta.env.VITE_APP_TITLE != null) {
  document.title += ` ${import.meta.env.VITE_APP_TITLE}`;
}

createApp(App)
  .component('text-input', TextInput)
  .component('checkbox', Checkbox)
  .component('NavAndFooterLayout', NavAndFooterLayout)
  .use(plugins.router)
  .use(plugins.store)
  .use(VueReCaptcha, { siteKey: '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np' })
  .mount('#app');
