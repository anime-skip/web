<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import md5 from 'md5';
import { getErrorMessage } from '~~/utils/errors';

const props = defineProps<{
  defaultUsername?: string;
}>();

const emits = defineEmits<{
  (event: 'loggedIn'): void;
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
        emits('loggedIn');
      },
    },
  );
}
</script>

<template>
  <form class="p-8 flex flex-col gap-4" @submit.prevent="login">
    <!-- Inputs -->
    <base-input-group
      :label-bl="validation.usernameOrEmail.$error ? 'Username is required' : undefined"
    >
      <template #left><div class="i-mdi:account text-xl" /></template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          :class="{ 'input-error': validation.usernameOrEmail.$error }"
          v-model="validation.usernameOrEmail.$model"
          placeholder="Username or Email"
        />
      </template>
    </base-input-group>
    <base-input-group :label-bl="validation.password.$error ? 'Password is required' : undefined">
      <template #left><div class="i-mdi:key text-xl" /></template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          :class="{ 'input-error': validation.password.$error }"
          v-model="validation.password.$model"
          type="password"
          placeholder="Password"
        />
      </template>
    </base-input-group>

    <!-- Error message -->
    <p v-if="isError" class="text-error text-sm">{{ errorMessage }}</p>

    <!-- Buttons -->
    <div class="flex flex-row-reverse items-center justify-between">
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
      <nuxt-link class="link link-hover" to="/sign-up">Create Account</nuxt-link>
    </div>
  </form>
</template>
