<template>
  <nav id="NavBar">
    <div class="column">
      <router-link class="link no-highlight" to="/">
        <img src="../assets/logo_nav.svg" />
        <h1>Anime Skip</h1>
      </router-link>

      <div class="space" />

      <div v-if="isSignedIn" class="right-buttons">
        <!-- <router-link class="link" to="/contributing">Contributing</router-link> -->
        <router-link class="link" to="/account"> Account </router-link>
        <div class="link" @click="logout">Logout</div>
      </div>
      <div v-else class="right-buttons">
        <router-link class="link" to="/get-started"> Get Started </router-link>
        <router-link class="link" to="/log-in"> Log In </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/action-types';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const logout = () => store.dispatch(ActionTypes.LOG_OUT, undefined);
    const isSignedIn = computed<boolean>(() => store.getters.IS_SIGNED_IN);

    return {
      isSignedIn,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/theme.scss';

#NavBar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  background-color: $dark500;

  .column {
    display: flex;
    flex-direction: row;
    max-width: 1128px;
    width: 100%;
    height: $navBarHeight;
    box-sizing: border-box;
    padding: 0 8px;
    @media only screen and (min-width: $GRID_BREAK_SMALL) {
      padding: 0 24px;
    }
  }

  h1 {
    font-size: 18px;
    margin-right: 16px;
  }

  img {
    height: 24px;
    margin-right: 16px;
  }

  .link {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    margin: 0 8px;
    padding-left: 2px;
    padding-right: 2px;
    transition: 200ms;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    font-family: $overpassFontFamily;
    cursor: pointer;
    text-align: center;
    @media only screen and (min-width: $GRID_BREAK_SMALL) {
      padding-left: 8px;
      padding-right: 6px;
    }

    &,
    * {
      color: $textSecondaryColor;
      transition: 200ms;
    }

    &.router-link-active,
    &:hover {
      color: $textTitleColor;
      &,
      * {
        color: $textTitleColor;
      }
    }
    &.router-link-active:not(.no-highlight) {
      border-top: 2px solid transparent;
      border-bottom: 2px solid $primary500;
    }
  }

  .space {
    flex: 1;
  }

  .right-buttons {
    display: flex;
    flex-direction: row;
  }
}
</style>
