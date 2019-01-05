import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import(/* webpackChunkName: "sign-in" */ './pages/Landing.vue'),
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import(/* webpackChunkName: "sign-in" */ './pages/SignIn.vue'),
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import(/* webpackChunkName: "sign-in" */ './pages/SignUp.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ './pages/About.vue'),
    },
  ],
});
