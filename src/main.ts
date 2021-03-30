import { createApp } from 'vue';
import plugins from '@/plugins';
import App from './App.vue';
import '@/scss/style.scss';
import '@/scss/theme.scss';

import { VueReCaptcha } from 'vue-recaptcha-v3';

import TextInput from './components/TextInput.vue';
import Checkbox from './components/Checkbox.vue';

createApp(App)
  .component('text-input', TextInput)
  .component('checkbox', Checkbox)
  .use(plugins.router)
  .use(plugins.store)
  .use(VueReCaptcha, { siteKey: '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np' })
  .mount('#app');
