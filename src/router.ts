import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ './pages/Home/index.vue'),
  },
  {
    path: '/sign-up',
    alias: '/log-in',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "sign_in" */ './pages/SignIn/index.vue'),
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: () => import(/* webpackChunkName: "get_started" */ './pages/GetStarted/index.vue'),
  },
  {
    path: '/policies/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "privacy_policy" */ './pages/PrivacyPolicy.vue'),
  },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
