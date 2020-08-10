import { Ref, ComputedRef, computed, ref, watch } from 'vue';
import api from '@/api';
import { RequestState } from '@/utils/enums';

// eslint-disable-next-line no-useless-escape
const VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Validation {
  isUsernameValid: ComputedRef<boolean>;
  isEmailValid: ComputedRef<boolean>;
  isPasswordValid: ComputedRef<boolean>;
  isConfirmPasswordValid: ComputedRef<boolean>;
  isSubmitDisabled: ComputedRef<boolean>;
  isUsernameInUse: Ref<boolean>;
  checkUsername: () => Promise<void>;
}

export default function useSignInValidation(
  isSignIn: ComputedRef<boolean>,
  signInRequestState: ComputedRef<RequestState>,
  username: Ref<string>,
  email: Ref<string>,
  password: Ref<string>,
  confirmPassword: Ref<string>,
): Validation {
  const hasEnteredUsername = ref<boolean>(false);
  const hasEnteredEmail = ref<boolean>(false);
  const hasEnteredPassword = ref<boolean>(false);
  const hasEnteredConfirmPassword = ref<boolean>(false);

  watch(isSignIn, () => {
    hasEnteredUsername.value = false;
    hasEnteredEmail.value = false;
    hasEnteredPassword.value = false;
    hasEnteredConfirmPassword.value = false;
  });

  const isUsernameInUse = ref<boolean>(false);
  const isCheckingUsername = ref<boolean>(false);
  const hasCheckedUsername = ref<boolean>(false);

  watch(username, () => {
    isUsernameInUse.value = false;
    hasCheckedUsername.value = false;

    hasEnteredUsername.value = true;
  });
  watch(email, () => {
    hasEnteredEmail.value = true;
  });
  watch(password, () => {
    hasEnteredPassword.value = true;
  });
  watch(confirmPassword, () => {
    hasEnteredConfirmPassword.value = true;
  });

  const checkUsername = async () => {
    if (isSignIn.value || username.value.length < 3) return;

    isCheckingUsername.value = true;
    isUsernameInUse.value = await api.isUsernameInUse(username.value);
    isCheckingUsername.value = false;
    hasCheckedUsername.value = true;
  };

  const isUsernameValid = computed<boolean>(
    () =>
      !hasEnteredUsername.value ||
      isSignIn.value ||
      (username.value.length >= 3 && !isUsernameInUse.value),
  );
  const isEmailValid = computed<boolean>(
    () => !hasEnteredEmail.value || VALID_EMAIL_REGEX.test(email.value.toLowerCase()),
  );
  const isPasswordValid = computed<boolean>(
    () => !hasEnteredPassword.value || isSignIn.value || password.value !== '',
  );
  const isConfirmPasswordValid = computed<boolean>(
    () =>
      !hasEnteredConfirmPassword.value ||
      isSignIn.value ||
      (confirmPassword.value === password.value && confirmPassword.value !== ''),
  );

  watch(signInRequestState, () => {
    console.log('Sign in request state changed: ' + signInRequestState.value);
  });

  const isSubmitDisabled = computed<boolean>(() => {
    console.log('isSubmitDisabled', signInRequestState.value === RequestState.LOADING);
    if (signInRequestState.value === RequestState.LOADING) return true;
    if (isSignIn.value) return false;

    const usernameNeedsChecked = isCheckingUsername.value || !hasCheckedUsername.value;

    const somethingIsNotValid =
      !isUsernameValid.value ||
      !isEmailValid.value ||
      !isPasswordValid.value ||
      !isConfirmPasswordValid.value;

    const somethingHasNotBeenEntered =
      !username.value || !email.value || !password.value || !confirmPassword.value;

    console.log({ usernameNeedsChecked, somethingIsNotValid, somethingHasNotBeenEntered });
    return usernameNeedsChecked || somethingIsNotValid || somethingHasNotBeenEntered;
  });

  return {
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isSubmitDisabled,
    checkUsername,
    isUsernameInUse,
  };
}
