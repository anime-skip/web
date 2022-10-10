import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default function () {
  const rules = {
    email: { required, email },
  };
  const state = reactive({
    email: '',
  });
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
