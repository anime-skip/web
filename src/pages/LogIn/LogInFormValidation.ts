import { Ref, computed, ref, watch } from 'vue';
import api from '@/api';
import { useRequestState } from '@/composition/request-state';
import { getPersistedValue, persistValue } from '@/utils';

export function useUsername() {
  const rememberMe = ref<boolean>(!!getPersistedValue('rememberMeChecked'));
  watch(rememberMe, () => {
    persistValue('rememberMeChecked', rememberMe.value);
    if (!rememberMe.value) persistValue('username', '');
  });

  const hasEnteredUsername = ref<boolean>(false);
  const username = ref<string>((rememberMe.value && getPersistedValue('username')) || '');
  const isUsernameInUse = ref<boolean>(false);
  const hasCheckedUsername = ref<boolean>(false);
  const { tryCatch, isLoading: isCheckingUsername } = useRequestState();

  const isUsernameValid = computed<boolean>(
    () => username.value.length >= 3 && !isUsernameInUse.value,
  );
  const isUsernameBlockingSubmit = computed<boolean>(
    () => !hasCheckedUsername.value || (hasEnteredUsername.value && !isUsernameValid.value),
  );

  const checkUsername = tryCatch(async () => {
    if (!isUsernameValid) return;
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
    isUsernameValid,
    isUsernameBlockingSubmit,
    checkUsername,
    isCheckingUsername,
    hasCheckedUsername,
    persistUsername,
  };
}

// eslint-disable-next-line no-useless-escape
const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useEmail() {
  const email = ref('');
  const hasEnteredEmail = ref(false);
  const isEmailValid = computed<boolean>(() => VALID_EMAIL_REGEX.test(email.value.toLowerCase()));
  const isEmailBlockingSubmit = computed<boolean>(() => hasEnteredEmail.value && !isEmailValid);

  watch(email, () => {
    hasEnteredEmail.value = true;
  });

  return {
    email,
    hasEnteredEmail,
    isEmailValid,
    isEmailBlockingSubmit,
  };
}

export function usePassword() {
  const password = ref('');
  const hasEnteredPassword = ref(false);
  const isPasswordValid = computed<boolean>(() => !!password.value);
  const isPasswordBlockingSubmit = computed<boolean>(
    () => hasEnteredPassword.value && !isPasswordValid.value,
  );

  watch(password, () => {
    hasEnteredPassword.value = true;
  });

  return {
    password,
    hasEnteredPassword,
    isPasswordValid,
    isPasswordBlockingSubmit,
  };
}

export function useConfirmPassword(password: Ref<string>) {
  const {
    hasEnteredPassword: hasEnteredConfirmPassword,
    password: confirmPassword,
    isPasswordValid,
    isPasswordBlockingSubmit,
  } = usePassword();

  const isConfirmPasswordValid = computed<boolean>(
    () => isPasswordValid.value && password.value === confirmPassword.value,
  );
  const isConfirmPasswordBlockingSubmit = computed<boolean>(
    () => isPasswordBlockingSubmit.value || !isConfirmPasswordValid.value,
  );

  return {
    confirmPassword,
    hasEnteredConfirmPassword,
    isConfirmPasswordValid,
    isConfirmPasswordBlockingSubmit,
  };
}

export function useRememberMe() {
  return {
    rememberMe,
  };
}
