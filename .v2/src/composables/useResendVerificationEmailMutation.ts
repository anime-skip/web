import { useMutation } from 'vue-query';
import { executeRecaptcha } from '~~/utils/recaptcha';

export default function () {
  const api = useApiClient();
  return useMutation(async () => {
    const recaptchaResponse = await executeRecaptcha('verify_email');
    return api.resendVerificationEmail({ recaptchaResponse });
  });
}
