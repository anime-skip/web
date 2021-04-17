import { RequestState } from '@/utils/enums';
import { computed, ref } from 'vue';

export function useRequestState(initialState = RequestState.SUCCESS) {
  const requestState = ref(initialState);
  const errorMessage = ref<string | undefined>();

  function setLoading() {
    requestState.value = RequestState.LOADING;
    errorMessage.value = undefined;
  }
  function setSuccess() {
    requestState.value = RequestState.SUCCESS;
    errorMessage.value = undefined;
  }
  function setFailure(err: Error) {
    requestState.value = RequestState.FAILURE;
    errorMessage.value = err.message;
  }

  const isLoading = computed(() => requestState.value === RequestState.LOADING);
  const isSuccess = computed(() => requestState.value === RequestState.SUCCESS);
  const isFailure = computed(() => requestState.value === RequestState.FAILURE);

  function tryCatch(callback: () => Promise<void> | void) {
    return async (): Promise<void> => {
      try {
        setLoading();
        await callback();
        setSuccess();
      } catch (err) {
        setFailure(err);
      }
    };
  }

  return {
    requestState,

    setLoading,
    setSuccess,
    setFailure,

    tryCatch,

    isLoading,
    isSuccess,
    isFailure,
  };
}
