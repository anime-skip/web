<script lang="ts" setup>
import LoginCard from "app/components/LoginCard.vue";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import useGqlRequestPasswordResetMutation from "app/composables/useGqlRequestPasswordResetMutation";
import { ref } from "vue";
import { whenever } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import md5 from "md5";
import { useHead } from "@unhead/vue";
import { RECAPTCHA_SCRIPT } from "app/utils/recaptcha-utils";

useHead({
  title: "Forgot Password – Anime Skip",
  script: [RECAPTCHA_SCRIPT],
});

const email = ref("");

const {
  mutate: _requestPasswordReset,
  error,
  isPending,
  isSuccess,
} = useGqlRequestPasswordResetMutation();

const requestPasswordReset = () =>
  _requestPasswordReset({ email: email.value });
</script>

<template>
  <DefaultLayout>
    <LoginCard
      class="m-auto"
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
      @submit="requestPasswordReset"
    >
      <!-- Success message -->
      <div v-if="isSuccess" class="alert">
        <i class="i-heroicons-exclaimation-circle size-5" />
        <p>
          An email has been sent to your email address with instructions on how
          to reset your password.
        </p>
      </div>

      <template v-else>
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

        <!-- Submit -->
        <button
          type="submit"
          class="btn text-sm"
          :disabled="isPending"
          :loading="isPending"
        >
          {{ isPending ? "Resetting Password..." : "Reset Password" }}
        </button>
      </template>

      <!-- Error message -->
      <div v-if="error" class="alert alert-error">
        <i class="i-heroicons-exclaimation-circle size-5" />
        <p>
          {{ (error as any)?.message ?? error }}
        </p>
      </div>

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
