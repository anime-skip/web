import useSession from "./useSession";
import type { ComputedRef } from "vue";
import type { Session } from "./useGqlSessionQuery";

export default function (): ComputedRef<Session> {
  const { session } = useSession();

  if (!session.value) {
    location.href =
      "/sign-in?redirect=" + encodeURIComponent(location.pathname);
    return undefined!;
  }

  return session as ComputedRef<Session>;
}
