export default function () {
  const route = useRoute();
  const router = useRouter();
  return (name: string, value: string | string[] | undefined) => {
    const newRoute = {
      ...route,
      query: {
        ...route.query,
        [name]: value || undefined,
      },
    };
    router.replace(newRoute);
  };
}
