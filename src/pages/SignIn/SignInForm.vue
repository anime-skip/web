<template>
  <form @submit.prevent="onSubmit">
    <h2>{{ title }}</h2>

    <p v-if="!isSignIn" class="switch-page">
      Already have an acount? <a href="#" @click.prevent="switchToSignIn()">Sign in</a>
    </p>
    <p v-else class="switch-page">
      Need to create an account? <a href="#" @click.prevent="switchToSignUp()">Sign up</a>
    </p>

    <text-input
      v-model="username"
      :placeholder="usernameLabel"
      autocomplete="username"
      :valid="isUsernameValid"
      @blur="checkUsername"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_account.svg" />
      </template>
    </text-input>
    <p v-if="usernameErrorMessage" class="error">{{ usernameErrorMessage }}</p>

    <text-input
      v-if="!isSignIn"
      v-model="email"
      :valid="isEmailValid"
      placeholder="Email"
      autocomplete="email"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_email.svg" />
      </template>
    </text-input>

    <text-input
      v-model="password"
      :valid="isPasswordValid"
      name="password"
      type="password"
      placeholder="Password"
      :autocomplete="passwordAutocomplete"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_password.svg" />
      </template>
    </text-input>
    <text-input
      v-if="!isSignIn"
      v-model="confirmPassword"
      :valid="isConfirmPasswordValid"
      type="password"
      placeholder="Confirm password"
      autocomplete="current-password"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_password.svg" />
      </template>
    </text-input>
    <p v-if="passwordErrorMessage" class="error">{{ passwordErrorMessage }}</p>

    <checkbox v-if="!!isSignIn" v-model="rememberMeChecked">Remember me</checkbox>

    <div class="bottom-row">
      <input
        id="submit"
        type="submit"
        :class="{ disabled: isSubmitDisabled }"
        :value="submitTitle"
      />
      <router-link to="/forgot-password" v-if="false">Forgot password?</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { getPersistedValue, persistValue } from '../../utils';
import { useStore } from 'vuex';
import { ActionTypes } from '../../store/action-types';
import { RequestState } from '../../utils/enums';
import useFormValidation from './SignInFormValidation';

enum Mode {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
}

export default defineComponent({
  name: 'LoginForm',
  setup() {
    // Effects
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

    // Mode
    const mode = ref<Mode>(route.path === '/sign-in' ? Mode.SIGN_IN : Mode.SIGN_UP);

    const switchToSignIn = () => {
      mode.value = Mode.SIGN_IN;
      router.replace({ path: '/sign-in' });
    };
    const switchToSignUp = () => {
      mode.value = Mode.SIGN_UP;
      router.replace({ path: '/sign-up' });
    };
    const isSignIn = computed<boolean>(() => mode.value === Mode.SIGN_IN);
    const usernameLabel = computed<string>((): string =>
      mode.value === Mode.SIGN_IN ? 'Username or email' : 'Username',
    );
    const title = computed<string>((): string =>
      mode.value === Mode.SIGN_IN ? 'Welcome!' : 'Get Started',
    );
    const passwordAutocomplete = computed<'current-password' | 'new-password'>(() =>
      mode.value === Mode.SIGN_IN ? 'current-password' : 'new-password',
    );
    const submitTitle = computed<string>(() =>
      mode.value === Mode.SIGN_IN ? 'Sign In' : 'Create Account',
    );

    // Form Values
    const rememberMeChecked = ref<boolean>(!!getPersistedValue('rememberMeChecked'));
    const initializeUsername = () =>
      (rememberMeChecked.value && mode.value === Mode.SIGN_IN && getPersistedValue('username')) ||
      '';
    const username = ref<string>(initializeUsername());
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');

    // Error Messages
    const signInRequestState = computed<RequestState>(() => store.state.signInRequestState);
    const {
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
      isSubmitDisabled,
      checkUsername,
      isUsernameInUse,
    } = useFormValidation(isSignIn, signInRequestState, username, email, password, confirmPassword);

    const usernameErrorMessage = computed<string | undefined>(() => {
      if (mode.value === Mode.SIGN_IN) {
        return undefined;
      }
      if (isUsernameInUse.value === true) {
        return 'Username is taken';
      }
      if (username.value.length < 3 && username.value.length !== 0) {
        return 'Username must be at least 3 characters';
      }
      return undefined;
    });
    const passwordErrorMessage = computed<string | undefined>(() => {
      if (mode.value === Mode.SIGN_UP) {
        if (isPasswordValid.value && !isConfirmPasswordValid.value && confirmPassword.value !== '')
          return 'Passwords must match';
      }
      if (signInRequestState.value === RequestState.FAILURE) return store.state.signInError;

      return undefined;
    });

    // resetting
    watch(mode, () => {
      username.value = initializeUsername();
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    });

    // Submitting
    const onSubmit = async (): Promise<void> => {
      if (isSubmitDisabled.value) return;

      await recaptchaLoaded();
      const recaptchaResponse = await executeRecaptcha(mode.value);
      const customRedirect = route.query.redirect as string | undefined;
      if (mode.value === Mode.SIGN_IN) {
        persistValue('rememberMeChecked', rememberMeChecked.value);
        if (rememberMeChecked.value) {
          persistValue('username', username.value);
        }
        store.dispatch(ActionTypes.SIGN_IN, {
          usernameOrEmail: username.value,
          password: password.value,
          customRedirect,
        });
      } else {
        store.dispatch(ActionTypes.SIGN_UP, {
          recaptchaResponse,
          username: username.value,
          email: email.value,
          password: password.value,
          customRedirect,
        });
      }
    };

    return {
      switchToSignIn,
      switchToSignUp,
      isSignIn,
      submitTitle,
      usernameLabel,
      title,

      passwordAutocomplete,
      rememberMeChecked,

      username,
      email,
      password,
      confirmPassword,

      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
      isSubmitDisabled,

      checkUsername,
      usernameErrorMessage,
      passwordErrorMessage,

      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .TextInput {
    margin-bottom: 8px;

    .input-icon {
      margin: 0 12px;
      opacity: 0.48;
    }
  }

  .switch-page {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.48);
    margin-bottom: 24px;
  }

  .error {
    font-size: 14px;
    padding: 0 8px;
    margin-bottom: 8px;
    color: #e57373;
  }

  .bottom-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    #submit {
      align-self: flex-start;
    }
  }
}
</style>
