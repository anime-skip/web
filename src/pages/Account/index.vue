<template>
  <div class="Account">
    <div class="nav-bar">
      <div class="group">
        <router-link to="/account" class="nav-item">Account Info</router-link>
        <router-link to="/account/email-verification" class="nav-item"
          >Email Verification</router-link
        >
      </div>

      <div class="group">
        <router-link to="/get-started" class="nav-item">
          <span>Web Extension</span>
          <img :src="extensionInstalledIcon" :title="extensionInstalledTitle" />
        </router-link>
        <div
          class="nav-item"
          :class="{ disabled: !isExtensionInstalled }"
          @click="openKeyboardShortcuts"
        >
          <span>Keyboard Shortcuts</span>
          <img src="../../assets/ic_chevron_right.svg" />
        </div>
        <div class="nav-item" :class="{ disabled: !isExtensionInstalled }" @click="openPopup">
          <span>Player Settings</span>
          <img src="../../assets/ic_chevron_right.svg" />
        </div>
      </div>

      <div v-if="isDev" class="group">
        <div v-if="!isExtensionInstalled" class="nav-item" @click="sendMockInstallMessage">
          <span>Send Install Event</span>
          <img src="../../assets/ic_chevron_right.svg" />
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import useExtensionStatus from '@/composition/extension-status';
import useExtensionInteraction from '@/composition/extension-interaction';
import { computed, defineComponent } from 'vue';
import icCheckmarkBlue from '../../assets/ic_checkmark_secondary.svg';
import icXRed from '../../assets/ic_x_red.svg';
import useEnv from '@/composition/env';

export default defineComponent({
  setup() {
    const { isDev } = useEnv();
    const { isExtensionInstalled } = useExtensionStatus();
    const { openPopup, openKeyboardShortcuts, sendMockInstallMessage } = useExtensionInteraction();

    const extensionInstalledIcon = computed(() =>
      isExtensionInstalled.value ? icCheckmarkBlue : icXRed,
    );
    const extensionInstalledTitle = computed(() =>
      isExtensionInstalled.value ? 'Extension installed!' : 'Extension not installed',
    );
    return {
      isDev,
      isExtensionInstalled,
      extensionInstalledIcon,
      extensionInstalledTitle,
      openPopup,
      openKeyboardShortcuts,
      sendMockInstallMessage,
    };
  },
});
</script>

<style scoped lang="scss">
.Account {
  width: 100%;
  max-width: 900px;
  min-height: 90vh;
  align-self: center;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: $GRID_BREAK_SMALL) {
    flex-direction: row;
  }

  .nav-bar {
    @media only screen and (min-width: $GRID_BREAK_SMALL) {
      min-width: 232px;
      margin-right: 24px;
    }
    .group {
      border-radius: 4px;
      margin-bottom: 16px;
      background-color: $dark400;
      &:last-child {
        margin-bottom: 32px;
        @media only screen and (min-width: $GRID_BREAK_SMALL) {
          margin-bottom: 0;
        }
      }
    }

    .nav-item {
      height: 41px;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      padding-left: 16px;
      padding-right: 8px;
      color: $textTitleColor;
      cursor: pointer;
      position: relative;
      padding-bottom: 1px;
      &::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        content: '';
        height: 1px;
        background-color: $backgroundColor;
      }
      &:last-child {
        border-bottom: none;
      }

      &.disabled {
        cursor: default;
        color: $textDisabledColor;
        pointer-events: none;
        span {
          color: $textDisabledColor;
        }
        img {
          display: none;
        }
      }

      &.router-link-exact-active {
        border-left: 4px solid $primary500;
        padding-left: 12px;
        &:first-child {
          border-top-left-radius: 4px;
        }
        &:last-child {
          border-bottom-left-radius: 4px;
        }
      }

      span {
        flex: 1;
      }

      img {
        margin-left: 24px;
      }
    }
  }

  .content {
    @media only screen and (min-width: $GRID_BREAK_SMALL) {
      flex: 1;
      padding: 24px 0 24px 24px;
    }
  }
}
</style>
