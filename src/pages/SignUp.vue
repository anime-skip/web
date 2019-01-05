<template>
  <div class="background">
    <div class="sign-in">
      <router-link class="top-bar" to="/">
        <img src="../assets/logo.png">
        <span>TV Skip</span>
      </router-link>
      <form class="width-adjust">
        <h2>Sign In</h2>
        <TextInput id="username" type="text" label="Username"/>
        <TextInput
          id="password"
          type="password"
          label="Password"
          help="This field is case sensitive"
        />
        <Checkbox id="remember-me" label="Remember Me"/>
        <div class="button-bar flexRow">
          <router-link id="sign-up" to="/sign-up">Sign Up!</router-link>
          <Button id="sign-in" label="Sign In" :click="onClickSignIn"/>
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

@Component({
  components: {
    Button,
    Checkbox,
    NavBar,
    TextInput
  }
})
export default class SignIn extends Vue {
  public async onClickSignIn(event: Event): Promise<void> {
    event.preventDefault();
    const username = (document.querySelector(
      "#username input"
    ) as HTMLInputElement).value;
    const passwordHash = await Auth.hashPassword(
      (document.querySelector("#password input") as HTMLInputElement).value
    );
    const rememberMe = (document.querySelector(
      "#remember-me input"
    ) as HTMLInputElement).checked;
    console.log({ username, passwordHash, rememberMe });
  }
}
</script>

<style lang="scss" scoped>
$cardRadius: 8px;

.background {
  height: 100%;
  position: relative;
  // background-image: url("../assets/bg-sign-in.png");
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
