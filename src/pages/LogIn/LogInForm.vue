<template>
  <div class="flex flex-col w-full space-y-3">
    <h4>Welcome back!</h4>

    <p class="body-2 text-on-surface text-opacity-medium pb-4">
      Need to create an account?
      <router-link :to="signUpLink" class="text-secondaryPalette-200 hover:underline"
        >Sign up</router-link
      >
    </p>

    <text-input
      v-model:value="username"
      placeholder="Username or email"
      autocomplete="username"
      :valid="isUsernameValid"
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
    <p v-if="logInErrorMessage" class="error error-text">
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
        >Forgot password?</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ActionTypes } from '../../store/action-types';
import { RequestState } from '../../utils/enums';
import { useUsername, usePassword } from './LogInFormValidation';
import { Checkbox, RaisedButton, TextInput } from '@anime-skip/ui';
import IconAccount from '@/assets/IconAccount.vue';
import IconPassword from '@/assets/IconPassword.vue';

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

    // Error Messages
    const signInRequestState = computed<RequestState>(() => store.state.signInRequestState);
    const { rememberMe, username, persistUsername, isUsernameValid } = useUsername();
    const { password, isPasswordBlockingSubmit, isPasswordValid } = usePassword();
    const isSubmitDisabled = computed(() => !username.value || !password.value);

    const logInErrorMessage = computed<string | undefined>(() => {
      if (signInRequestState.value === RequestState.FAILURE) return store.state.signInError;

      return undefined;
    });

    // Submitting
    const onSubmit = async (): Promise<void> => {
      if (isSubmitDisabled.value) return;
      if (rememberMe.value) persistUsername();

      store.dispatch(ActionTypes.LOG_IN, {
        usernameOrEmail: username.value,
        password: password.value,
        customRedirect,
      });
    };

    return {
      signUpLink,

      rememberMe,
      username,
      password,

      isUsernameValid,
      isPasswordValid,
      isSubmitDisabled,

      onSubmit,
      logInErrorMessage,
    };
  },
});
</script>
