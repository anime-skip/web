<script lang="ts" setup>
import { DEFAULT_PROFILE_URL } from '~~/utils/constants';

defineProps<{
  user: {
    username: string;
    profileUrl?: string;
  };
}>();
</script>

<template>
  <nuxt-link
    class="block rounded-full ring-0 ring-primary ring-opacity-40 hover:ring-4 transition overflow-hidden"
    :to="`/user/${user.username}`"
    :title="user.username"
  >
    <img
      class="w-full h-full"
      :src="user.profileUrl || DEFAULT_PROFILE_URL"
      :alt="`${user.username} profile picture`"
    />
  </nuxt-link>
</template>
