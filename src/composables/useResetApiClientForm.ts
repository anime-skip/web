import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

export default function () {
  const formRef = ref<any>();
  function reset(
    client: Pick<ManagedApiClientFragment, 'appName' | 'rateLimitRpm' | 'description'>,
  ) {
    formRef.value?.reset?.(client);
  }

  return [formRef, reset] as const;
}
