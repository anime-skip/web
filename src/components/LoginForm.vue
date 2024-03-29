<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import md5 from 'md5';
import { getErrorMessage } from '~~/utils/errors';

const props = defineProps<{
  defaultUsername?: string;
  redirect?: string;
}>();

const { state, validation } = useLoginForm();

watch(
  () => props.defaultUsername,
  newUsername => (state.usernameOrEmail = newUsername),
  { immediate: true },
);

const { mutate: mutateLogin, isError, error, isLoading } = useLoginMutation();
const auth = useAuthStore();
const errorMessage = computed(() => getErrorMessage(error.value));

function login() {
  if (validation.value.$invalid) {
    validation.value.$touch();
    return;
  }
  mutateLogin(
    {
      usernameEmail: state.usernameOrEmail,
      passwordHash: md5(state.password),
    },
    {
      onSuccess: data => {
        auth.setLoggedInDetails(data.login);
        navigateTo(props.redirect ?? '/account');
      },
    },
  );
}
</script>

<template>
  <form class="p-8 flex flex-col gap-8" @submit.prevent="login">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="font-stylized text-3xl">Welcome back!</h1>
      <p class="text-sm">
        <span class="text-opacity-70 text-base-content">Need to create an account?</span>
        {{ ' ' }}
        <nuxt-link
          class="link link-secondary link-hover"
          :to="{ path: '/sign-up', query: { username: state.usernameOrEmail, redirect } }"
          >Sign up</nuxt-link
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
            :class="{ 'input-error': validation.usernameOrEmail.$error }"
            v-model="validation.usernameOrEmail.$model"
            placeholder="Username or Email"
            autocomplete="username"
          />
        </template>
        <template v-if="validation.usernameOrEmail.$error" #labelBl>
          <span class="text-error">Username is required</span>
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
            autocomplete="current-password"
          />
        </template>
        <template v-if="validation.password.$error" #labelBl>
          <span class="text-error">Password is required</span>
        </template>
      </base-input-group>

      <!-- Error message -->
      <p v-if="isError" class="text-error text-sm">{{ errorMessage }}</p>
    </div>

    <!-- Buttons -->
    <div class="flex items-center gap-8">
      <button
        class="btn btn-primary"
        :class="{
          loading: isLoading,
        }"
        :disabled="isLoading"
        type="submit"
      >
        Login
      </button>
      <nuxt-link class="link link-hover text-base-content text-opacity-70" to="/forgot-password"
        >Forgot password?</nuxt-link
      >
    </div>
  </form>
</template>
