<script lang="ts" setup>
import LoginCard from "app/components/LoginCard.vue";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import useGqlLoginQuery from "app/composables/useGqlLoginQuery";
import { ref } from "vue";
import { whenever } from "@vueuse/core";
import { useHead } from "@unhead/vue";
import useSession from "app/composables/useSession";

useHead({
  title: "Sign In – Anime Skip",
});

const {
  state: loginData,
  execute: _login,
  error,
  isLoading,
} = useGqlLoginQuery();

const username = ref("");
const password = ref("");
const login = () => _login(0, username.value, password.value);

const { logIn } = useSession();
whenever(loginData, (loginData) => logIn(loginData));
</script>

<template>
  <DefaultLayout>
    <LoginCard
      class="m-auto"
      title="Anime Skip Login"
      subtitle="Welcome back! Enter your account details to sign in."
      @submit="login"
    >
      <!-- Username -->
      <label class="input">
        <i class="i-heroicons-user" />
        <input
          placeholder="Username or email"
          autocomplete="username"
          required
          v-model="username"
        />
      </label>

      <div>
        <!-- Password -->
        <label class="input">
          <i class="i-heroicons-key" />
          <input
            placeholder="Password"
            autocomplete="current-password"
            type="password"
            required
            v-model="password"
          />
        </label>

        <RouterLink
          class="link link-neutral text-xs opacity-50 hover:opacity-100"
          to="/forgot-password"
        >
          Forgot password?
        </RouterLink>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn text-sm" :loading="isLoading">
        {{ isLoading ? "Signing In..." : "Sign In" }}
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
        New to Anime Skip?
        <RouterLink class="link" to="/sign-up">Create an account</RouterLink>
      </p>
    </LoginCard>
  </DefaultLayout>
</template>
