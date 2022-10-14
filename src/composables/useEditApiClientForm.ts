import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

export default function () {
  const rules = {
    appName: { required },
    description: { required },
    rateLimitRpm: { numeric },
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
