import { Ref, computed, ref, watch } from 'vue';
import api from '@/api';
import { useRequestState } from '@/composition/request-state';
import { getPersistedValue, persistValue } from '@/utils';

export function useUsername(ignoreRememberMe = false) {
  const rememberMe = ref<boolean>(!!getPersistedValue('rememberMeChecked'));
  watch(rememberMe, () => {
    persistValue('rememberMeChecked', rememberMe.value);
    if (!rememberMe.value) persistValue('username', '');
  });

  const hasEnteredUsername = ref<boolean>(false);
  const username = ref<string>(
    (!ignoreRememberMe && rememberMe.value && getPersistedValue('username')) || '',
  );
  const isUsernameInUse = ref<boolean>(false);
  const hasCheckedUsername = ref<boolean>(false);
  const { tryCatch, isLoading: isCheckingUsername } = useRequestState();

  /**
   * Simple checks to make sure the entered username is a valid username string.
   */
  const validateUsername = computed<boolean>(() => username.value.length >= 3);
  /**
   * Adds to the simple checks, makes sure the username is not already in use
   */
  const isUsernameValid = computed<boolean>(
    () => hasCheckedUsername.value && !isUsernameInUse.value && validateUsername.value,
  );
  /**
   * The input will show as valid when nothing has been entered, or if the username is valid and
   * that username is not in use
   */
  const isUsernameInputValid = computed<boolean>(
    () => !hasEnteredUsername.value || (validateUsername.value && !isUsernameInUse.value),
  );

  const checkUsername = tryCatch(async () => {
    if (!validateUsername.value) return;
    isUsernameInUse.value = await api.isUsernameInUse(username.value);
    hasCheckedUsername.value = true;
  });

  watch(username, () => {
    hasEnteredUsername.value = true;
    isUsernameInUse.value = false;
    hasCheckedUsername.value = false;
  });

  const persistUsername = () => {
    if (rememberMe.value) persistValue('username', username.value);
  };

  return {
    rememberMe,

    username,
    hasEnteredUsername,
    isUsernameInputValid,
    isUsernameValid,
    checkUsername,
    isCheckingUsername,
    hasCheckedUsername,
    isUsernameInUse,
    persistUsername,
  };
}

// eslint-disable-next-line no-useless-escape
const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useEmail() {
  const email = ref('');
  const hasEnteredEmail = ref(false);

  /**
   * Basic check to make sure email is a valid email string via REGEX
   */
  const isEmailValid = computed<boolean>(() => VALID_EMAIL_REGEX.test(email.value.toLowerCase()));
  /**
   * Uses the `isEmailValid`, but is also valid when nothing has been entered yet
   */
  const isEmailInputValid = computed<boolean>(() => !hasEnteredEmail.value || isEmailValid.value);

  watch(email, () => {
    hasEnteredEmail.value = true;
  });

  return {
    email,
    hasEnteredEmail,
    isEmailValid,
    isEmailInputValid,
  };
}

export function usePassword() {
  const password = ref('');
  const hasEnteredPassword = ref(false);

  /**
   * The only password requirement is that you've entered something
   */
  const isPasswordValid = computed<boolean>(() => !!password.value);
  /**
   * Uses the `isPasswordValid`, but is also valid when nothing has been entered yet
   */
  const isPasswordInputValid = computed<boolean>(
    () => !hasEnteredPassword.value || isPasswordValid.value,
  );

  watch(password, () => {
    hasEnteredPassword.value = true;
  });

  return {
    password,
    hasEnteredPassword,
    isPasswordValid,
    isPasswordInputValid,
  };
}

export function useConfirmPassword(password: Ref<string>) {
  const {
    hasEnteredPassword: hasEnteredConfirmPassword,
    password: confirmPassword,
  } = usePassword();

  /**
   * Confirm password must match the actual password
   */
  const isConfirmPasswordValid = computed<boolean>(() => password.value === confirmPassword.value);
  /**
   * Uses the `isConfirmPasswordValid`, but is also valid when nothing has been entered yet
   */
  const isConfirmPasswordInputValid = computed<boolean>(
    () => !hasEnteredConfirmPassword.value || password.value === '' || isConfirmPasswordValid.value,
  );

  return {
    confirmPassword,
    hasEnteredConfirmPassword,
    isConfirmPasswordValid,
    isConfirmPasswordInputValid,
  };
}
