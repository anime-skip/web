export default function (name: string) {
  const route = useRoute();
  const router = useRouter();
  const value = ref(route.query[name]);
  const replaceQuery = useRouteReplaceQuery();

  watch(
    () => route.query[name],
    newValue => {
      if (newValue === value.value) return;
      value.value = newValue;
    },
  );
  watch(value, newValue => {
    if (newValue === route.query[name]) return;
    replaceQuery(name, newValue);
  });

  return value;
}
