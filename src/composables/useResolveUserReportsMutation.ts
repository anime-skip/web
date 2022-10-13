import { useMutation } from 'vue-query';

export default function () {
  const { mutateAsync } = useResolveUserReportMutation();
  return useMutation({
    async mutationFn(vars: { ids: string[]; resolvedMessage: string }): Promise<void> {
      const results = await Promise.allSettled(
        vars.ids.map(id => mutateAsync({ id, resolvedMessage: vars.resolvedMessage })),
      );
      const failures = results.filter(res => res.status === 'rejected');
      if (failures.length > 0) throw failures;
    },
  });
}
