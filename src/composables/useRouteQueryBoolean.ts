export default function (name: string) {
  const query = useRouteQuery(name);
  const bool = ref(query.value === 'true');
  watch(query, newQuery => {
    const queryBool = newQuery === 'true';
    if (queryBool !== bool.value) bool.value = queryBool;
  });
  watch(bool, newBool => {
    const queryBool = query.value === 'true';
    if (newBool !== queryBool) query.value = newBool ? 'true' : undefined;
  });
  return bool;
}
