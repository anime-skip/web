import { useMutation } from 'vue-query';
import { LoginQueryVariables } from '~~/utils/graphql.generated';

export default function () {
  const client = useApiClient();
  return useMutation((vars: LoginQueryVariables) => client.login(vars));
}
