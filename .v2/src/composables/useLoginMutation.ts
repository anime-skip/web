import { useMutation } from 'vue-query';

export default () => useMutation(useApiClient(false).login);
