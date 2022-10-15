import { useVuelidate } from '@vuelidate/core';
import { required, numeric, minLength } from '@vuelidate/validators';

export default function () {
  const rules = {
    appName: { required, minLength: minLength(1) },
    description: { required, minLength: minLength(1) },
    rateLimitRpm: { required, numeric },
  };
  const state = reactive({
    appName: '',
    description: '',
    rateLimitRpm: '60',
  });
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
