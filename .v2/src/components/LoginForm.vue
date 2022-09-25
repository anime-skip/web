<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import md5 from 'md5';

const props = defineProps<{
  defaultUsername?: string;
}>();

const username = ref('');
const password = ref('');

watch(
  () => props.defaultUsername,
  newUsername => (username.value = newUsername),
);

const loginMutation = useLoginMutation();
const auth = useAuthStore();

function login() {
  if (!username.value || !password.value) return;
  loginMutation.mutate(
    {
      usernameEmail: username.value,
      passwordHash: md5(password.value),
    },
    {
      onSuccess: data => auth.setLoggedInDetails(data.login),
    },
  );
}
</script>

<template>
  <form class="p-8 flex flex-col gap-4" @submit.prevent="login">
    <input
      class="input input-bordered focus:input-primary"
      v-model="username"
      placeholder="Username or Email"
    />
    <input
      class="input input-bordered focus:input-primary"
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <button class="btn btn-primary" type="submit">Login</button>
  </form>
</template>
