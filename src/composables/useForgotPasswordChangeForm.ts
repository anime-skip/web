import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  const state = reactive({
    password: '',
    confirmPassword: '',
  });
  const rules = {
    password: { required },
    confirmPassword: {
      required,
      sameAs: helpers.withMessage(
        'This field should be equal to the password',
        value => value === state.password,
      ),
    },
  };
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
