<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import md5 from 'md5';
import { getErrorMessage } from '~~/utils/errors';
import { executeRecaptcha } from '~~/utils/recaptcha';
import RecaptchaDisclaimer from './RecaptchaDisclaimer.vue';

const props = defineProps<{
  defaultUsername?: string;
  redirect?: string;
}>();

const { state, validation } = useSignUpForm();

watch(
  () => props.defaultUsername,
  newUsername => (state.username = newUsername),
  { immediate: true },
);

const { mutate: mutateCreateAccount, isError, error, isLoading } = useCreateAccountMutation();
const auth = useAuthStore();
const errorMessage = computed(() => getErrorMessage(error.value));

async function login() {
  if (validation.value.$invalid) {
    validation.value.$touch();
    return;
  }
  executeRecaptcha('sign_up').then(recaptchaResponse => {
    mutateCreateAccount(
      {
        username: state.username,
        email: state.email,
        recaptchaResponse,
        passwordHash: md5(state.password),
      },
      {
        onSuccess: data => {
          auth.setLoggedInDetails(data.createAccount);
          navigateTo(props.redirect ?? '/account');
        },
      },
    );
  });
}
</script>

<template>
  <form class="p-8 flex flex-col gap-8" @submit.prevent="login">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="font-stylized text-3xl">Create Account</h1>
      <p class="text-sm">
        <span class="text-opacity-70 text-base-content">Already have an acount?</span>
        {{ ' ' }}
        <nuxt-link
          class="link link-secondary link-hover"
          :to="{ path: '/login', query: { username: state.username, redirect } }"
          >Log in</nuxt-link
        >
      </p>
    </div>

    <div class="space-y-4">
      <!-- Inputs -->
      <base-input-group>
        <template #left><div class="i-mdi-account text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.username.$error }"
            v-model="validation.username.$model"
            placeholder="Username"
            autocomplete="username"
          />
        </template>
        <template v-if="validation.username.$error" #labelBl>
          <span class="text-error">Username must be at least 3 characters long</span>
        </template>
      </base-input-group>
      <base-input-group>
        <template #left><div class="i-mdi-email text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.email.$error }"
            v-model="validation.email.$model"
            placeholder="Email"
            autocomplete="email"
          />
        </template>
        <template v-if="validation.email.$error" #labelBl>
          <span class="text-error">Email must be a valid email address</span>
        </template>
      </base-input-group>
      <base-input-group>
        <template #left><div class="i-mdi-key text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.password.$error }"
            v-model="validation.password.$model"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
          />
        </template>
        <template v-if="validation.password.$error" #labelBl>
          <span class="text-error">Password is required</span>
        </template>
      </base-input-group>
      <base-input-group>
        <template #left><div class="i-mdi-key text-xl" /></template>
        <template #default>
          <input
            class="input input-bordered focus:input-primary w-full"
            :class="{ 'input-error': validation.confirmPassword.$error }"
            v-model="validation.confirmPassword.$model"
            type="password"
            placeholder="Confirm Password"
            autocomplete="new-password"
          />
        </template>
        <template v-if="validation.confirmPassword.$error" #labelBl>
          <span class="text-error">Passwords do not match</span>
        </template>
      </base-input-group>

      <!-- Recaptcha/Error message -->
      <recaptcha-disclaimer v-if="!isError" />
      <p v-else class="text-error text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Submit Button -->
    <button
      class="btn btn-primary self-start"
      :class="{
        loading: isLoading,
      }"
      :disabled="isLoading"
      type="submit"
    >
      Sign Up
    </button>
  </form>
</template>
