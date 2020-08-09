<template>
  <div id="SignIn">
    <header>
      <router-link to="/">
        <img src="../../assets/logo_nav.svg" />
        <h1>Anime Skip</h1>
      </router-link>
    </header>
    <div class="card">
      <section class="section-1">
        <img src="../../assets/logo.svg" />
        <h3>watch anime like a pro</h3>
      </section>
      <section class="section-2">
        <div v-if="isSignedIn">
          <h2 class="already-logged-in">Already logged in</h2>
          <button class="log-out dark" @click="logOut">Log Out</button>
          <button @click="followRedirect">Continue</button>
        </div>
        <sign-in-form v-else />
      </section>
    </div>
    <footer>
      <page-footer showReCaptchaMessage />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SignInForm from './SignInForm.vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { SIGN_IN_REDIRECT } from '../../utils/constants';
import { ActionTypes } from '../../store/action-types';

export default defineComponent({
  components: { SignInForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const isSignedIn = computed<boolean>(() => store.getters.IS_SIGNED_IN);
    const followRedirect = () => {
      const redirectUrl = (route.query.redirect as string | undefined) || SIGN_IN_REDIRECT;
      router.push({ path: redirectUrl });
    };
    const logOut = () => {
      store.dispatch(ActionTypes.LOG_OUT, undefined);
    };

    return {
      isSignedIn,
      followRedirect,
      logOut,
    };
  },
});
</script>

<style lang="scss" scoped>
#SignIn {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    height: 48px;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 24px;

    a {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    h1 {
      font-size: 18px;
      margin-right: 16px;
    }

    img {
      height: 24px;
      margin-right: 16px;
    }
  }

  .card {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    width: 75%;
    min-width: 350px;
    max-width: 500px;
    padding: 24px;
    background-color: #282f37;

    .section-1 {
      display: none;
    }

    .already-logged-in {
      margin-bottom: 16px;
    }

    .log-out {
      margin-right: 16px;
    }
  }
}

@media only screen and (min-width: 768px) {
  #SignIn {
    .card {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      border-radius: 16px;
      width: 90%;
      height: 500px;
      min-width: 700px;
      max-width: 900px;
      padding: 0px;
      box-shadow: 0px 16px 24px 8px rgba(0, 0, 0, 0.18);
      overflow: hidden;

      .section-1 {
        display: unset;
        background-color: #1b2025;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url('../../assets/sign_in_stars.svg');
        background-size: cover;
        background-position: center;

        img {
          width: 50%;
          padding: 32px 0;
          margin-left: 16px;
        }

        h3 {
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.48);
        }
      }

      .section-2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px 48px;
        flex-basis: 0;
      }
    }
  }
}
</style>
