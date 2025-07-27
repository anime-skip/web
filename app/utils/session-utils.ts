import type { LoginData } from "app/composables/useGqlLoginQuery";

export function setLoginData(loginData: LoginData): void {
  localStorage.setItem("@anime-skip/authToken", loginData.authToken);
  localStorage.setItem("@anime-skip/refreshToken", loginData.refreshToken);
  localStorage.setItem(
    "@anime-skip/session",
    JSON.stringify(loginData.account),
  );
}

export function clearLoginData(): void {
  localStorage.removeItem("@anime-skip/authToken");
  localStorage.removeItem("@anime-skip/refreshToken");
  localStorage.removeItem("@anime-skip/session");
}
