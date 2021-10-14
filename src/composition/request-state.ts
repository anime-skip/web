import { Store } from '@/store';
import { RequestState } from '@/utils/enums';
import { computed, Ref, ref } from 'vue';
import { useStore } from 'vuex';

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

  const { tryCatch } = useTryCatch(
    newRequestState => {
      requestState.value = newRequestState;
    },
    err => {
      errorMessage.value = err.message;
    },
  );

  return {
    requestState,
    errorMessage,

    setLoading,
    setSuccess,
    setFailure,

    tryCatch,

    ...useRequestStateChecks(requestState),
  };
}

export function useStoreRequestState(
  getter: (store: Store) => RequestState,
  mutation: (requestState: RequestState) => void,
) {
  const store = useStore();
  const requestState = computed(() => getter(store));

  const { tryCatch } = useTryCatch(mutation);

  return {
    requestState,
    tryCatch,
    ...useRequestStateChecks(requestState),
  };
}

function useTryCatch(
  setRequestState: (requestState: RequestState) => void,
  setError?: (err: Error) => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function tryCatch(callback: () => Promise<void> | void, isError?: (error: any) => boolean) {
    return async (): Promise<void> => {
      try {
        setRequestState(RequestState.LOADING);
        await callback();
        setRequestState(RequestState.SUCCESS);
      } catch (err) {
        console.log('Caught errors', err);
        if (!isError || isError(err)) {
          setRequestState(RequestState.FAILURE);
          setError?.(err);
        }
      }
    };
  }

  return {
    tryCatch,
  };
}

function useRequestStateChecks(requestState: Ref<RequestState>) {
  const isLoading = computed(() => requestState.value === RequestState.LOADING);
  const isSuccess = computed(() => requestState.value === RequestState.SUCCESS);
  const isFailure = computed(() => requestState.value === RequestState.FAILURE);

  return {
    isLoading,
    isSuccess,
    isFailure,
  };
}
