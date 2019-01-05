import Vue from 'vue';
import App from './App.vue';
import router from './router';
import RippleDirective from 'vue-ripple-directive';

Vue.config.productionTip = false;

RippleDirective.color = 'rgba(0, 0, 0, 0.08)';
RippleDirective.zIndex = 0;
RippleDirective.transistion = '400ms';

Vue.directive('ripple', RippleDirective);

new Vue({
  router,
  render: (createElement) => createElement(App),
}).$mount('#app');
