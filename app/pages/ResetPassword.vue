<script lang="ts" setup>
import LoginCard from "app/components/LoginCard.vue";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import useGqlResetPasswordMutation from "app/composables/useGqlResetPasswordMutation";
import { ref } from "vue";
import { whenever } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import md5 from "md5";
import { useHead } from "@unhead/vue";

useHead({
  title: "Reset Password – Anime Skip",
});

const {
  data: tokens,
  mutate: _resetPassword,
  error,
  isPending,
} = useGqlResetPasswordMutation();

const password = ref("");
const confirmPassword = ref("");

const resetPassword = () =>
  _resetPassword({
    newPassword: password.value,
    confirmNewPassword: confirmPassword.value,
    passwordResetToken: (route.query.token as string | undefined) ?? "",
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
      title="Reset Password"
      subtitle="Enter a new password to reset your account."
      @submit="resetPassword"
    >
      <!-- Password -->
      <label class="input">
        <i class="i-heroicons-key" />
        <input
          placeholder="New Password"
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
          placeholder="Confirm New Password"
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
        {{ isPending ? "Resetting..." : "Reset" }}
      </button>

      <!-- Error message -->
      <div v-if="error" class="alert alert-error">
        <i class="i-heroicons-exclaimation-circle size-5" />
        <p>
          {{ (error as any)?.message ?? error }}
        </p>
      </div>
    </LoginCard>
  </DefaultLayout>
</template>
