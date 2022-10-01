import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

export default function () {
  const state = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const rules = {
    username: { minLength: minLength(3) },
    email: { required, email },
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
