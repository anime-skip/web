import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

export default function () {
  const state = reactive({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const rules = {
    oldPassword: { required },
    newPassword: { required },
    confirmNewPassword: {
      required,
      sameAs: helpers.withMessage(
        'This field should be equal to the new password',
        value => value === state.newPassword,
      ),
    },
  };
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
