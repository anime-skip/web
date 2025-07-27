import { computed, type ComputedRef } from "vue";
import type { Session } from "./useGqlSessionQuery";
import useGqlSessionQuery from "./useGqlSessionQuery";

export default function (): UseSessionReturn {
  const { state, execute } = useGqlSessionQuery();

  return {
    session: computed(() => state.value),
    refresh: () => void execute(),
    logout: () => {
      localStorage.removeItem("@anime-skip/authToken");
      localStorage.removeItem("@anime-skip/refreshToken");
      localStorage.removeItem("@anime-skip/session");
      location.href = "/sign-in";
    },
  };
}

export type UseSessionReturn = {
  session: ComputedRef<Session | undefined>;
  refresh: () => void;
  logout: () => void;
};
