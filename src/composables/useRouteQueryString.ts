export default function (name: string) {
  const query = useRouteQuery(name);
  const str = ref((query.value as string | undefined) ?? '');
  watch(query, newQuery => {
    if (newQuery !== str.value) str.value = (newQuery as string) ?? '';
  });
  watch(str, newStr => {
    if (newStr !== query.value) query.value = newStr || undefined;
  });
  return str;
}
