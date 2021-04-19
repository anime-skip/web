<template>
  <div class="flex flex-col w-full space-y-3">
    <h4>Welcome back!</h4>

    <p class="body-2 text-on-surface text-opacity-medium pb-4">
      Need to create an account?
      <router-link :to="signUpLink" class="text-secondaryPalette-200 hover:underline">
        Sign up
      </router-link>
    </p>

    <text-input
      v-model:value="username"
      placeholder="Username or email"
      autocomplete="username"
      :valid="isUsernameInputValid"
      @submit="onSubmit"
    >
      <template #left-icon="slotProps">
        <icon-account :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
    </text-input>
    <text-input
      v-model:value="password"
      :valid="isPasswordValid"
      name="password"
      type="password"
      placeholder="Password"
      autocomplete="current-password"
      @submit="onSubmit"
    >
      <template #left-icon="slotProps">
        <icon-password :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
    </text-input>
    <p v-if="logInErrorMessage" class="body-2 text-error text-center">
      {{ logInErrorMessage }}
    </p>

    <checkbox v-model:checked="rememberMe" label="Remember me" class="self-start" />

    <div class="flex items-center pt-2 space-x-4">
      <raised-button id="submit" :disabled="isSubmitDisabled" @click="onSubmit">
        Log In
      </raised-button>
      <router-link
        v-if="true"
        to="/forgot-password"
        class="text-on-surface text-opacity-medium hover:underline"
      >
        Forgot password?
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ActionTypes } from '../../store/action-types';
import { useUsername, usePassword } from './LogInFormValidation';
import { Checkbox, RaisedButton, TextInput } from '@anime-skip/ui';
import IconAccount from '@/assets/IconAccount.vue';
import IconPassword from '@/assets/IconPassword.vue';
import { useStoreRequestState } from '@/composition/request-state';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  name: 'LogInForm',
  components: {
    Checkbox,
    RaisedButton,
    TextInput,
    IconAccount,
    IconPassword,
  },
  setup() {
    // Effects
    const store = useStore();
    const route = useRoute();

    const customRedirect = route.query.redirect as string | undefined;
    const signUpLink = ref({ path: '/sign-up', query: { redirect: customRedirect } });

    const {
      rememberMe,
      username,
      persistUsername,
      isUsernameInputValid,
      hasEnteredUsername,
    } = useUsername();
    const { password, isPasswordValid, hasEnteredPassword } = usePassword();
    const isSubmitDisabled = computed(() => !username.value || !password.value);

    const logInErrorMessage = ref<string | undefined>();

    // Submitting
    const onSubmit = async (): Promise<void> => {
      hasEnteredUsername.value = true;
      hasEnteredPassword.value = true;
      if (isSubmitDisabled.value) return;
      if (rememberMe.value) persistUsername();

      store.dispatch(ActionTypes.LOG_IN, {
        usernameOrEmail: username.value,
        password: password.value,
        setErrorMessage(message) {
          logInErrorMessage.value = message;
        },
        customRedirect,
      });
    };

    return {
      signUpLink,

      rememberMe,
      username,
      password,

      isUsernameInputValid,
      isPasswordValid,
      isSubmitDisabled,

      onSubmit,
      logInErrorMessage,
    };
  },
});
</script>
