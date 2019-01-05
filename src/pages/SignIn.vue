<template>
  <div class="background">
    <div class="sign-in">
      <router-link class="top-bar" to="/">
        <img src="../assets/logo.png">
        <span>TV Skip</span>
      </router-link>
      <form class="width-adjust">
        <h2>Sign In</h2>
        <div v-if="notSignedIn">
          <TextInput id="username" type="text" label="Username" defaultValue="apklinker@sourceallies.com"/>
          <TextInput
            id="password"
            type="password"
            defaultValue="ak013096"
            label="Password"
            help="This field is case sensitive"
          />
          <Checkbox id="remember-me" label="Remember Me"/>
          <div class="button-bar flexRow">
            <router-link id="sign-up" to="/sign-up">Sign Up!</router-link>
            <Button id="sign-in" label="Sign In" :click="onClickSignIn" :loading="isSigningIn"/>
          </div>
        </div>
        <div v-else>
          <p class="signed-in-as">You've already signed in as <b>{{signedInUsername}}</b>.</p>
          <div class="flexRow button-bar">
            <Button label="Log Out" :click="onClickReset"/>
            <Button label="Stay Signed In" :click="onClickContinueAs"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";
import NavBar from "@/components/NavBar.vue";
import TextInput from "@/components/TextInput.vue";
import Auth from "@/utils/Auth";
import Api from "@/utils/Api";
import { AxiosPromise, AxiosResponse } from 'axios';
import { TokenResponse } from '@/utils/types';
import { URL } from 'url';

@Component({
  components: {
    Button,
    Checkbox,
    NavBar,
    TextInput
  }
})
export default class SignIn extends Vue {
  private validationMessage?: string;
  private isSigningIn: boolean = false;

  public async onClickSignIn(event: Event): Promise<void> {
    this.isSigningIn = true;
    event.preventDefault();
    const username = (document.querySelector("#username input") as HTMLInputElement).value;
    const password = (document.querySelector("#password input") as HTMLInputElement).value;
    const md5Hash = await Auth.hashPassword(password);
    const rememberMe = (document.querySelector("#remember-me input") as HTMLInputElement).checked;
    
    try {
      const response: AxiosResponse<TokenResponse> = await Api.token(username, md5Hash);
      
      // save token
      let storage: Storage = sessionStorage;
      if (rememberMe) {
        storage = localStorage;
      }
      storage.setItem('token', response.data.token);
      storage.setItem('username', username);

      // Go to the homepage
      window.location.pathname = 'home';
    } catch (err) {
      this.validationMessage = err.message;
      this.isSigningIn = false;
    }
  }
  public onClickContinueAs(event: Event): void {
    event.preventDefault();
    window.location.pathname = 'home';
  }
  public onClickReset(event: Event): void {
    event.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    window.location.pathname = window.location.pathname
  }

  public get notSignedIn(): boolean {
    return localStorage.getItem('token') === null && sessionStorage.getItem('token') === null;
  }
  public get signedInUsername(): string {
    return localStorage.getItem('username') || sessionStorage.getItem('username')!;
  }
}
</script>

<style lang="scss" scoped>
$cardRadius: 8px;

.background {
  height: 100%;
  position: relative;
  background-image: url("../assets/bg-sign-in.png");
  background-blend-mode: multiply;
  background-color: $primary500;
  background-size: cover;
  background-position: center;
  .sign-in {
    background: linear-gradient(
      $primary700,
      rgba($color: $secondary700, $alpha: 0.7)
    );
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .top-bar {
      height: 128px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      img {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }
      span {
        font-weight: 600;
        color: white;
      }
    }
    form {
      background-color: white;
      display: flex;
      flex-direction: column;
      padding: 16px;
      box-sizing: border-box;
      h2 {
        text-align: start;
        font-size: 18px;
        margin-bottom: 8px;
      }
      #remember-me {
        margin: 8px 0;
      }
      .button-bar {
        justify-content: space-between;
        align-items: center;
      }
      .signed-in-as {
        margin-bottom: 16px;
      }
    }
  }
}
@media only screen and (min-width: 321px) {
  .background {
    .sign-in {
      display: flex;
      flex-direction: column;
      .width-adjust {
        min-width: 320px;
        width: 50%;
        max-width: 400px;
        border-radius: $cardRadius;
        align-self: center;
      }
    }
  }
}
</style>
