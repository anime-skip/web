import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { VueReCaptcha } from 'vue-recaptcha-v3';
import TextInput from '@/components/TextInput.vue';
import Checkbox from '@/components/Checkbox.vue';
import PageFooter from '@/components/PageFooter.vue';

createApp(App)
  .component('text-input', TextInput)
  .component('checkbox', Checkbox)
  .component('page-footer', PageFooter)
  .use(router)
  .use(store)
  .use(VueReCaptcha, { siteKey: '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np' })
  .mount('#app');
