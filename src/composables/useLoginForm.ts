import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default function () {
  const rules = {
    usernameOrEmail: { required },
    password: { required },
  };
  const state = reactive({
    usernameOrEmail: '',
    password: '',
  });
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
