<template>
  <NavAndFooterLayout>
    <div class="min-h-90vh flex flex-col px-8 lg:px-16">
      <div class="flex flex-col flex-1 justify-center">
        <div
          class="card w-full max-w-lg overflow-hidden lg:max-w-login-card mx-auto my-16 lg:flex lg:rounded-2xl lg:framing-shadow lg:min-h-450px"
        >
          <section
            class="hidden lg:flex bg-control bg-stars w-50% flex-col items-center justify-center space-y-8"
          >
            <img class="w-50%" src="../../assets/logo.svg" />
            <h6 class="font-bold text-on-surface text-opacity-medium">watch anime like a pro</h6>
          </section>
          <loading-overlay
            :is-loading="isLoggingIn"
            class="w-full lg:w-50% px-4 box-border lg:px-16 lg:py-16 lg:self-center"
          >
            <section>
              <div v-if="shouldShowAlreadyLoggedIn" class="space-y-6">
                <h5>Already logged in</h5>
                <div class="flex space-x-4">
                  <raised-button @click="followRedirect">Continue</raised-button>
                  <raised-button dark @click="logOut">Log Out</raised-button>
                </div>
              </div>
              <router-view v-else />
            </section>
          </loading-overlay>
        </div>
      </div>
      <RecaptchaFooter v-if="!isLoggedIn" class="justify-self-end" show-re-captcha-message />
    </div>
  </NavAndFooterLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { LOG_IN_REDIRECT } from '../../utils/constants';
import { ActionTypes } from '../../store/action-types';
import RecaptchaFooter from '@/components/RecaptchaFooter.vue';
import { RaisedButton, LoadingOverlay } from '@anime-skip/ui';
import { useStoreRequestState } from '@/composition/request-state';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  components: {
    RecaptchaFooter,
    RaisedButton,
    LoadingOverlay,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const isLoggedIn = computed<boolean>(() => store.getters.IS_SIGNED_IN);
    const shouldShowAlreadyLoggedIn = computed<boolean>(
      () => isLoggedIn.value && route.path !== '/log-out',
    );
    const followRedirect = () => {
      const redirectUrl = (route.query.redirect as string | undefined) || LOG_IN_REDIRECT;
      router.push({ path: redirectUrl });
    };
    const logOut = () => {
      store.dispatch(ActionTypes.LOG_OUT, undefined);
    };

    const { isLoading: isLoggingIn } = useStoreRequestState(
      s => s.state.signInRequestState,
      requestState => store.commit(MutationTypes.LOG_IN_REQUEST_STATE, requestState),
    );

    return {
      isLoggedIn,
      isLoggingIn,
      shouldShowAlreadyLoggedIn,
      followRedirect,
      logOut,
    };
  },
});
</script>

<style scoped>
.bg-stars {
  background-image: url('../../assets/sign_in_stars.svg');
  background-size: cover;
  background-position: center;
}

.w-50\% {
  width: 50%;
}
@media (min-width: 1024px) {
  .lg\:w-50\% {
    width: 50%;
  }
}

.min-w-256px {
  min-width: 192px;
}

.min-h-90vh {
  min-height: 90vh;
}

@media (min-width: 1024px) {
  .lg\:max-w-login-card {
    max-width: 900px;
  }
}

@media (min-width: 1024px) {
  .lg\:min-h-450px {
    min-height: 450px;
  }
}

/*
// #Login {
//   flex: 1;
//   display: flex;
//   flex-direction: column;

//   .centered {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//   }

//   .card {
//     box-sizing: border-box;
//     display: grid;
//     grid-template-columns: auto;
//     grid-template-rows: auto auto;
//     width: 75%;
//     min-width: 350px;
//     max-width: 500px;
//     // margin: $navBarHeight 0;
//     padding: 24px;
//     background-color: #282f37;

//     .section-1 {
//       display: none;
//     }

//     .already-logged-in {
//       margin-bottom: 16px;
//     }

//     .log-out {
//       margin-right: 16px;
//     }
//   }
// }

// @media only screen and (min-width: 768px) {
//   #Login {
//     .card {
//       grid-template-columns: 1fr 1fr;
//       grid-template-rows: auto;
//       border-radius: 16px;
//       width: 90%;
//       height: 500px;
//       min-width: 700px;
//       max-width: 900px;
//       padding: 0px;
//       box-shadow: 0px 8px 24px 8px rgba(0, 0, 0, 0.24);
//       overflow: hidden;

//       .section-1 {
//         display: unset;
//         // background-color: $dark500;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         background-image: url('../../assets/sign_in_stars.svg');
//         background-size: cover;
//         background-position: center;

//         img {
//           width: 50%;
//           padding: 32px 0;
//           margin-left: 16px;
//         }

//         h3 {
//           margin-top: 4px;
//           color: rgba(255, 255, 255, 0.48);
//         }
//       }

//       .section-2 {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         padding: 24px 48px;
//         flex-basis: 0;
//       }
//     }
//   }
// }
*/
</style>
