<template>
  <NavAndFooterLayout>
    <side-navigation>
      <template #side>
        <side-navigation-group>
          <side-navigation-link to="/account">Account Info</side-navigation-link>
          <side-navigation-link to="/account/security">Security</side-navigation-link>
          <side-navigation-link to="/account/email-verification">
            Email Verification
          </side-navigation-link>
        </side-navigation-group>

        <side-navigation-group>
          <side-navigation-link
            to="/get-started"
            :class="{ 'pointer-events-none': isExtensionInstalled }"
          >
            <span class="flex-1" :class="{ 'text-opacity-medium': isExtensionInstalled }"
              >Web Extension</span
            >
            <icon-circle-check v-if="isExtensionInstalled" class="w-6 fill-success" />
            <icon-circle-x v-else class="w-6 fill-error" />
          </side-navigation-link>
          <side-navigation-button
            v-if="isShowingDevInstallEventButton"
            @click="sendMockInstallMessage"
          >
            <span class="flex-1">Send Install Event</span>
            <img src="../../assets/ic_chevron_right.svg" />
          </side-navigation-button>
          <side-navigation-button :disabled="!isExtensionInstalled" @click="openPlayerSettings">
            <span class="flex-1" :class="{ 'text-opacity-medium': !isExtensionInstalled }"
              >Player Settings</span
            >
            <img
              :class="{ hidden: !isExtensionInstalled }"
              src="../../assets/ic_chevron_right.svg"
            />
          </side-navigation-button>
        </side-navigation-group>
      </template>
      <template #content>
        <router-view />
      </template>
    </side-navigation>
  </NavAndFooterLayout>
</template>

<script lang="ts" setup>
import useExtensionStatus from '@/composition/extension-status';
import useExtensionInteraction from '@/composition/extension-interaction';
import { computed, onMounted } from 'vue';
import icCheckmarkBlue from '../../assets/ic_checkmark_secondary.svg';
import icXRed from '../../assets/ic_x_red.svg';
import SideNavigation from '@/layouts/SideNavigation.vue';
import SideNavigationGroup from '@/components/SideNavigationGroup.vue';
import SideNavigationLink from '@/components/SideNavigationLink.vue';
import SideNavigationButton from '@/components/SideNavigationButton.vue';
import IconCircleCheck from '@/assets/IconCircleCheck.vue';
import IconCircleX from '@/assets/IconCircleX.vue';
import { useReloadAccount } from '@/composition/account';
import { useWindowEvent } from '@/composition/events';

const { isExtensionInstalled } = useExtensionStatus();
const { openPlayerSettings, sendMockInstallMessage } = useExtensionInteraction();

const isDev = import.meta.env.DEV;
const isShowingDevInstallEventButton = computed(() => isDev && !isExtensionInstalled.value);

const extensionInstalledIcon = computed(() =>
  isExtensionInstalled.value ? icCheckmarkBlue : icXRed,
);
const extensionInstalledTitle = computed(() =>
  isExtensionInstalled.value ? 'Extension installed!' : 'Extension not installed',
);

const _reloadAccount = useReloadAccount();
function reloadAccount() {
  console.log('reloading account...');
  _reloadAccount();
}
onMounted(reloadAccount);
useWindowEvent('focus', event => {
  // @ts-expect-error
  if (event.explicitOriginalTarget === window) reloadAccount();
});
</script>
