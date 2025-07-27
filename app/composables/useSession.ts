import { computed, type ComputedRef } from "vue";
import type { Session } from "./useGqlSessionQuery";
import useGqlSessionQuery from "./useGqlSessionQuery";
import { clearLoginData, setLoginData } from "app/utils/session-utils";
import type { LoginData } from "./useGqlLoginQuery";
import { useRoute, useRouter } from "vue-router";

export default function (): UseSessionReturn {
  const { state, execute } = useGqlSessionQuery();
  const router = useRouter();
  const route = useRoute();

  return {
    session: computed(() => state.value),
    refresh: () => void execute(),
    logOut: () => {
      clearLoginData();
      location.href = "/sign-in";
    },
    logIn: (loginData) => {
      setLoginData(loginData);
      router.push((route.query.redirect as string | undefined) ?? "/account");
    },
  };
}

export type UseSessionReturn = {
  session: ComputedRef<Session | undefined>;
  refresh: () => void;
  logOut: () => void;
  logIn: (loginData: LoginData) => void;
};
