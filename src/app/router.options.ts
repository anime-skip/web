import type { RouterOptions } from '@nuxt/schema';
import { HEADER_OFFSET } from '~~/utils/constants';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  scrollBehavior(to) {
    if (to.hash) {
      return {
        behavior: 'smooth',
        selector: to.hash,
        offset: { x: 0, y: HEADER_OFFSET },
      };
    }
    return { x: 0, y: 0 };
  },
};
