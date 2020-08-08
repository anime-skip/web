<template>
  <form @submit.prevent="onSubmit">
    <h2>{{ title }}</h2>

    <p v-if="showSignUpFields" class="switch-page">
      Already have an acount? <a href="#" @click.prevent="switchToSignIn()">Sign in</a>
    </p>
    <p v-else class="switch-page">
      Need to create an account? <a href="#" @click.prevent="switchToSignUp()">Sign up</a>
    </p>

    <text-input v-model="username" :placeholder="usernameLabel" autocomplete="username">
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_account.svg" />
      </template>
    </text-input>
    <text-input
      v-if="showSignUpFields"
      v-model="email"
      :valid="validation.email"
      placeholder="Email"
      autocomplete="email"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_email.svg" />
      </template>
    </text-input>

    <text-input
      v-model="password"
      :valid="validation.password"
      name="password"
      type="password"
      placeholder="Password"
      autocomplete="new-password"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_password.svg" />
      </template>
    </text-input>
    <text-input
      v-if="showSignUpFields"
      v-model="confirmPassword"
      :valid="validation.confirmPassword"
      type="password"
      placeholder="Confirm password"
      autocomplete="current-password"
    >
      <template v-slot:left>
        <img class="input-icon" src="../../assets/ic_password.svg" />
      </template>
    </text-input>

    <checkbox v-if="!showSignUpFields" v-model="rememberMeChecked">Remember me</checkbox>

    <div class="bottom-row">
      <input id="submit" type="submit" :value="submitTitle" />
      <router-link to="/forgot-password" v-if="false">Forgot password?</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { getPersistedValue, persistValue } from '../../utils';
import md5 from 'md5';
import { useStore } from 'vuex';
import { ActionTypes } from '../../store/action-types';

enum Mode {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
}
// eslint-disable-next-line no-useless-escape
const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default defineComponent({
  name: 'LoginForm',
  setup() {
    // Mode
    const route = useRoute();
    const mode = ref<Mode>(route.path === '/sign-in' ? Mode.SIGN_IN : Mode.SIGN_UP);

    const switchToSignIn = () => (mode.value = Mode.SIGN_IN);
    const switchToSignUp = () => (mode.value = Mode.SIGN_UP);
    const showSignUpFields = computed<boolean>(() => mode.value === Mode.SIGN_UP);
    const usernameLabel = computed<string>((): string =>
      mode.value === Mode.SIGN_IN ? 'Username or email' : 'Username',
    );
    const title = computed<string>((): string =>
      mode.value === Mode.SIGN_IN ? 'Welcome!' : 'Get Started',
    );

    // Form validation
    const rememberMeChecked = ref<boolean>(!!getPersistedValue('rememberMeChecked'));
    const initializeUsername = () =>
      (rememberMeChecked.value && !showSignUpFields.value && getPersistedValue('username')) || '';
    const username = ref<string>(initializeUsername());
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');
    const validation = reactive({
      email: true,
      password: true,
      confirmPassword: true,
    });

    watch(showSignUpFields, () => {
      username.value = initializeUsername();
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    });
    watch(email, () => {
      validation.email = VALID_EMAIL_REGEX.test(email.value.toLowerCase());
    });
    const passwordWatcher = () => {
      validation.confirmPassword =
        password.value === '' || password.value === confirmPassword.value;
    };
    watch(password, passwordWatcher);
    watch(confirmPassword, passwordWatcher);

    // Submitting
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
    const store = useStore();

    const submitTitle = computed<string>(() =>
      mode.value === Mode.SIGN_IN ? 'Sign In' : 'Create Account',
    );

    const onSubmit = async (): Promise<void> => {
      await recaptchaLoaded();
      const recaptchaResponse = await executeRecaptcha(mode.value);
      if (mode.value === Mode.SIGN_IN) {
        persistValue('rememberMeChecked', rememberMeChecked.value);
        if (rememberMeChecked.value) {
          persistValue('username', username.value);
        }
        store.dispatch(ActionTypes.SIGN_IN, {
          recaptchaResponse,
          usernameOrEmail: username.value,
          passwordHash: md5(password.value),
        });
      } else {
        store.dispatch(ActionTypes.SIGN_UP, {
          recaptchaResponse,
          username: username.value,
          email: username.value,
          passwordHash: md5(password.value),
        });
      }
    };

    return {
      switchToSignIn,
      switchToSignUp,
      showSignUpFields,
      submitTitle,
      usernameLabel,
      title,
      onSubmit,
      rememberMeChecked,
      username,
      email,
      password,
      confirmPassword,
      validation,
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

  input[type='submit'] {
    background-color: #2b78e0;
    height: 32px;
    padding: 0 16px;
    border: none;
    font-weight: 600;
    border-radius: 4px;
    transition: filter 200ms;
    cursor: pointer;

    &:hover {
      filter: brightness(110%);
    }
    &:hover:active {
      filter: brightness(120%);
    }
  }
}
</style>
