<script lang="ts" setup>
import LoginCard from "app/components/LoginCard.vue";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import useGqlCreateAccountMutation from "app/composables/useGqlCreateAccountMutation";
import { ref } from "vue";
import { whenever } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import md5 from "md5";
import { useHead } from "@unhead/vue";
import { RECAPTCHA_SCRIPT } from "app/utils/recaptcha-utils";

useHead({
  title: "Sign Up – Anime Skip",
  script: [RECAPTCHA_SCRIPT],
});

const {
  data: tokens,
  mutate: _createAccount,
  error,
  isPending,
} = useGqlCreateAccountMutation();

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const createAccount = () =>
  _createAccount({
    email: email.value,
    username: username.value,
    passwordHash: md5(password.value),
  });

const route = useRoute();
const router = useRouter();
whenever(tokens, (tokens) => {
  localStorage.setItem("@anime-skip/authToken", tokens.authToken);
  localStorage.setItem("@anime-skip/refreshToken", tokens.refreshToken);
  localStorage.setItem("@anime-skip/session", JSON.stringify(tokens.account));
  router.push((route.query.redirect as string | undefined) ?? "/account");
});
</script>

<template>
  <DefaultLayout>
    <LoginCard
      class="m-auto"
      title="Anime Skip Sign Up"
      @submit="createAccount"
    >
      <!-- Username -->
      <label class="input">
        <i class="i-heroicons-user" />
        <input
          placeholder="Username"
          autocomplete="username"
          required
          v-model="username"
        />
      </label>

      <!-- Email -->
      <label class="input">
        <i class="i-heroicons-envelope" />
        <input
          placeholder="Email"
          autocomplete="email"
          required
          v-model="email"
        />
      </label>

      <!-- Password -->
      <label class="input">
        <i class="i-heroicons-key" />
        <input
          placeholder="Password"
          autocomplete="new-password"
          type="password"
          required
          v-model="password"
        />
      </label>

      <!-- Confirm Password -->
      <label class="input">
        <i class="i-heroicons-key" />
        <input
          placeholder="Confirm Password"
          autocomplete="new-password"
          type="password"
          required
          v-model="confirmPassword"
        />
      </label>

      <!-- Submit -->
      <button
        type="submit"
        class="btn text-sm"
        :disabled="isPending"
        :loading="isPending"
      >
        {{ isPending ? "Signing up..." : "Sign Up" }}
      </button>

      <!-- Error message -->
      <div v-if="error" class="alert alert-error">
        <i class="i-heroicons-exclaimation-circle size-5" />
        <p>
          {{ (error as any)?.message ?? error }}
        </p>
      </div>

      <div class="h-px bg-neutral w-full" />

      <p class="text-sm text-center">
        Already have an account?
        <RouterLink class="link" to="/sign-in">Sign In</RouterLink>
      </p>

      <div class="h-px bg-neutral w-full" />

      <p class="text-base-content/50 text-sm text-center">
        This site is protected by reCAPTCHA and the Google
        <a
          class="underline"
          href="https://policies.google.com/privacy"
          rel="noopener noreferrer"
          target="_blank"
          >Privacy Policy</a
        >
        and
        <a
          class="underline"
          href="https://policies.google.com/terms"
          rel="noopener noreferrer"
          target="_blank"
          >Terms of Service</a
        >
        apply.
      </p>
    </LoginCard>
  </DefaultLayout>
</template>
