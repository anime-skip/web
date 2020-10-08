import { store } from '@/store';
import initializeRouter from '@/router';

export default {
  router: initializeRouter(store),
  store,
};
