<template>
  <div class="flex flex-col w-full space-y-3">
    <h4>Create Account</h4>

    <p class="body-2 text-opacity-medium pb-4">
      Already have an acount?
      <router-link :to="logInLink" class="body-2"> Log in </router-link>
    </p>

    <p v-if="signUpErrorMessage" class="body-2 text-error">
      {{ signUpErrorMessage }}
    </p>

    <text-input
      v-model:value="username"
      placeholder="Username"
      autocomplete="username"
      :is-valid="isUsernameInputValid"
      :error-message="usernameErrorMessage"
      @submit="onSubmit"
      @blur="checkUsername"
    >
      <template #left-icon="slotProps">
        <icon-account :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
      <template v-if="isCheckingUsername" #right-icon>
        <loading size="sm" />
      </template>
    </text-input>

    <text-input
      v-model:value="email"
      placeholder="Email"
      autocomplete="email"
      :is-valid="isEmailInputValid"
      :error-message="emailErrorMessage"
      @submit="onSubmit"
    >
      <template #left-icon="slotProps">
        <icon-email :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
    </text-input>

    <text-input
      v-model:value="password"
      placeholder="Password"
      autocomplete="new-password"
      type="password"
      :is-valid="isPasswordInputValid"
      :error-message="passwordErrorMessage"
      @submit="onSubmit"
    >
      <template #left-icon="slotProps">
        <icon-password :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
    </text-input>

    <text-input
      v-model:value="confirmPassword"
      placeholder="Password"
      autocomplete="new-password"
      type="password"
      :is-valid="isConfirmPasswordInputValid"
      :error-message="confirmPasswordErrorMessage"
      @submit="onSubmit"
    >
      <template #left-icon="slotProps">
        <icon-password :disabled="slotProps.disabled" :active="slotProps.focused" />
      </template>
    </text-input>

    <raised-button :disabled="isSubmitDisabled" @click="onSubmit">Sign Up</raised-button>
  </div>
</template>

<script lang="ts">
import IconAccount from '@/assets/IconAccount.vue';
import IconEmail from '@/assets/IconEmail.vue';
import IconPassword from '@/assets/IconPassword.vue';
import { useStoreRequestState } from '@/composition/request-state';
import { MutationTypes } from '@/store/mutation-types';
import { persistValue } from '@/utils';
import { Loading, RaisedButton, TextInput } from '@anime-skip/ui';
import md5 from 'md5';
import { computed, defineComponent, ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ActionTypes } from '../../store/action-types';
import { useConfirmPassword, useEmail, usePassword, useUsername } from './LogInFormValidation';

export default defineComponent({
  name: 'LogInForm',
  components: {
    RaisedButton,
    TextInput,
    IconAccount,
    IconPassword,
    IconEmail,
    Loading,
  },
  setup() {
    // Effects
    const store = useStore();
    const route = useRoute();
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()!;

    const customRedirect = route.query.redirect as string | undefined;
    const logInLink = ref({ path: '/log-in', query: { redirect: customRedirect } });

    const {
      username,
      isUsernameValid,
      isUsernameInputValid,
      checkUsername,
      isCheckingUsername,
      isUsernameInUse,
      hasEnteredUsername,
    } = useUsername(true);
    const { email, isEmailValid, isEmailInputValid, hasEnteredEmail } = useEmail();
    const { password, isPasswordValid, isPasswordInputValid, hasEnteredPassword } = usePassword();
    const {
      confirmPassword,
      isConfirmPasswordValid,
      isConfirmPasswordInputValid,
      hasEnteredConfirmPassword,
    } = useConfirmPassword(password);

    const usernameErrorMessage = computed<string | undefined>(() => {
      if (isUsernameInUse.value === true) {
        return 'Username is taken';
      }
      if (!isUsernameInputValid.value) {
        return 'Username must be at least 3 characters';
      }
      return undefined;
    });
    const emailErrorMessage = computed<string | undefined>(() => {
      return !isEmailInputValid.value ? 'Enter a valid email address' : undefined;
    });
    const passwordErrorMessage = computed<string | undefined>(() => {
      return !isPasswordInputValid.value ? 'A password is required' : undefined;
    });
    const confirmPasswordErrorMessage = computed<string | undefined>(() => {
      if (isPasswordValid.value && hasEnteredConfirmPassword.value && !isConfirmPasswordValid.value)
        return 'Passwords do not match';

      return undefined;
    });

    const { isFailure: isLogInFailure } = useStoreRequestState(
      ({ state }) => state.signInRequestState,
      requestState => store.commit(MutationTypes.LOG_IN_REQUEST_STATE, requestState),
    );
    const signUpErrorMessage = ref<string | undefined>();

    const isSubmitDisabled = computed<boolean>(
      () =>
        !isUsernameValid.value ||
        !isEmailValid.value ||
        !isPasswordValid.value ||
        !isConfirmPasswordValid.value,
    );
    const onSubmit = async (): Promise<void> => {
      hasEnteredUsername.value = true;
      hasEnteredEmail.value = true;
      hasEnteredPassword.value = true;
      hasEnteredConfirmPassword.value = true;
      if (isSubmitDisabled.value) return;
      persistValue('username', '');

      await recaptchaLoaded();
      const recaptchaResponse = await executeRecaptcha('sign_up');

      store.dispatch(ActionTypes.SIGN_UP, {
        recaptchaResponse,
        username: username.value,
        email: email.value,
        passwordHash: md5(password.value),
        setErrorMessage(message) {
          signUpErrorMessage.value = message;
        },
        customRedirect,
      });
    };

    return {
      logInLink,

      username,
      email,
      password,
      confirmPassword,

      isCheckingUsername,
      checkUsername,

      isUsernameInputValid,
      isEmailInputValid,
      isPasswordInputValid,
      isConfirmPasswordInputValid,
      isSubmitDisabled,

      usernameErrorMessage,
      emailErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
      signUpErrorMessage,

      onSubmit,
    };
  },
});
</script>
