<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { whenever } from "@vueuse/core";
import LoginCard from "app/components/LoginCard.vue";
import useGqlResetPasswordMutation from "app/composables/useGqlResetPasswordMutation";
import useSession from "app/composables/useSession";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import md5 from "md5";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

useHead({
  title: "Reset Password – Anime Skip",
});

const { data: loginData, mutate: _resetPassword, error, isPending } = useGqlResetPasswordMutation();

const route = useRoute();
const password = ref("");
const confirmPassword = ref("");

const resetPassword = () =>
  _resetPassword({
    newPassword: password.value,
    confirmNewPassword: confirmPassword.value,
    passwordResetToken: (route.query.token as string | undefined) ?? "",
  });

const { logIn } = useSession();
whenever(loginData, (loginData) => logIn(loginData));
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
      <button type="submit" class="btn text-sm" :disabled="isPending" :loading="isPending">
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
