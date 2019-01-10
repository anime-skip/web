<template>
  <div class="background">
    <div class="sign-up">
      <router-link class="top-bar" to="/">
        <img src="../assets/logo.svg">
        <span>TV Skip</span>
      </router-link>
      <form class="width-adjust">
        <h2>Create an Account</h2>
        <TextInput
          id="username" 
          type="text" 
          label="Username"
          autocomplete="username"
          v-model="username"
          :validity="usernameValidity"
          defaultValue="aklinker1"
        />
        <TextInput 
          id="email"
          type="text" 
          label="Email"
          autocomplete="email"
          v-model="email"
          :validity="emailValidity"
          defaultValue="aaronklinker1@gmail.com"
        />
        <p class="password-help">
          Your password must be at least <b>8 characters</b> long and needs to include at least one of <b>each of</b> the following characters:
          <ul>
            <li>Lowercase <code class="letter-list">a-z</code></li>
            <li>Uppercase <code class="letter-list">A-Z</code></li>
            <li>Numeric <code class="letter-list">0-9</code></li>
            <li>Special <code class="letter-list">!"#$%&'()*+,-./:;&gt;=&lt;?@[\]^_`{|}~</code></li>
          </ul>
        </p>
        <TextInput
          id="password1"
          type="password"
          label="Password"
          autocomplete="password"
          :validity="password1Validity"
          v-model="password1"
          :help="passwordHelp"
          defaultValue="AK4x#b8?ty0-"
        />
        <TextInput
          id="password2"
          type="password"
          label="Re-enter Password"
          autocomplete="password"
          v-model="password2"
          :validity="password2Validity"
          defaultValue="AK4x#b8?ty0-"
        />
        <Checkbox id="remember-me" label="Remember Me"/>
        <div class="button-bar flexRow">
          <Button 
            id="have-account"
            flat="true"
            link="/sign-in"
            label="Already have an account?"
          />
          <vue-recaptcha sitekey="6LcIIocUAAAAAJBPYWFkeX-F91fFu72lum7oFxl9">
            <Button 
              id="create"
              label="Create"
              :click="() => {}"
              :loading="isCreatingAccount"
              :disabled="usernameValidity !== 1 || emailValidity !== 1 || password1Validity !== 1 || password2Validity !== 1"
            />
          </vue-recaptcha>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import NavBar from '@/components/NavBar.vue';
import TextInput from '@/components/TextInput.vue';
import Auth from '@/utils/Auth';
import { ValidState } from '@/utils/types';
import Const from '@/utils/Const';
import Api from '@/utils/Api';
import VueRecaptcha from 'vue-recaptcha';

@Component({
  components: {
    Button,
    Checkbox,
    NavBar,
    TextInput,
    VueRecaptcha,
  },
})
export default class SignIn extends Vue {
  private isEmailValid: ValidState = ValidState.NONE;
  private isCreatingAccount: boolean = false;

  private username: string = '';
  private email: string = '';
  private password1: string = '';
  private password2: string = '';

  public get usernameValidity(): ValidState {
    if (this.username === '') {
      return ValidState.NONE;
    }
    return ValidState.VALID;
  }
  public get emailValidity(): ValidState {
    if (this.email === '') {
      return ValidState.NONE;
    } else if (this.email.trim().search(Const.EMAIL_REGEX) >= 0) {
      return ValidState.VALID;
    } else {
      return ValidState.ERROR;
    }
  }
  public get password1Validity(): ValidState {
    if (this.password1 === null) {
      return ValidState.NONE;
    }

    const lower = this.password1.search(Const.LOWER_REGEX) >= 0;
    const upper = this.password1.search(Const.UPPER_REGEX) >= 0;
    const numeric = this.password1.search(Const.NUMERIC_REGEX) >= 0;
    const special = this.password1.search(Const.SPECIAL_REGEX) >= 0;
    const length = this.password1.length >= 8;
    if (lower && upper && numeric && special && length) {
      return ValidState.VALID;
    }

    return ValidState.ERROR;
  }
  public get passwordHelp(): string | undefined {
    const password = this.password1.trim();
    if (password === '') {
      return undefined;
    }
    const helpList: string[] = [];

    if (password.search(Const.LOWER_REGEX) < 0) {
      helpList.push('Lowercase');
    }
    if (password.search(Const.UPPER_REGEX) < 0) {
      helpList.push('Uppercase');
    }
    if (password.search(Const.NUMERIC_REGEX) < 0) {
      helpList.push('Numeric');
    }
    if (password.search(Const.SPECIAL_REGEX) < 0) {
      helpList.push('Special');
    }
    if (password.length < 8) {
      helpList.push('Minimum length');
    }
    if (helpList.length > 0) {
      return `Missing: ${helpList.join(', ')}`;
    }
    return undefined;
  }
  public get password2Validity(): ValidState {
    const toMatch = this.password1;
    const confirm = this.password2;
    if (toMatch === '') {
      if (confirm === '') {
        return ValidState.NONE;
      }
      return ValidState.ERROR;
    }
    if (toMatch !== confirm && toMatch.startsWith(confirm)) {
      return ValidState.NONE;
    }
    if (toMatch === this.password2) {
      return ValidState.VALID;
    }
    return ValidState.ERROR;
  }

  public async onClickCreate() {
    const md5Hash = await Auth.hashPassword(this.password1);
    const response = await Api.createAccount(this.username, this.email, md5Hash);
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
  .sign-up {
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
        line-height: 18px;
        margin-bottom: 16px;
      }
      .text-input {
        padding-bottom: 8px;
      }
      .password-help {
        text-align: left;
        margin-top: 8px;
        ul {
          margin-left: 16px;
          li {
            margin: 8px 0;
          }
        }
      }
      .button-bar {
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
      }
    }
  }
}
@media only screen and (min-width: 321px) {
  .background {
    .sign-up {
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
