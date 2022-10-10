import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default function () {
  const state = reactive({
    query: '',
    includeEpisodes: true,
    includeShows: true,
    // includeUsers: true,
  });
  const rules = {
    query: { required },
    includeEpisodes: {},
    includeShows: {},
  };
  const validation = useVuelidate(rules, state);

  return {
    state,
    validation,
  };
}
