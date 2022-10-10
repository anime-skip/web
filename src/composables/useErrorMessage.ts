import { Ref } from 'vue';
import { getErrorMessage } from '~~/utils/errors';

export default function (err: Ref<any | undefined>) {
  return computed(() => getErrorMessage(err));
}
