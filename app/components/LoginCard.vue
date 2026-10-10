<script lang="ts" setup>
import useSession from "app/composables/useSession";

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const emit = defineEmits<{
  submit: [];
}>();

const { session } = useSession();
</script>

<template>
  <div class="p-8">
    <form
      class="shadow-neutral border-neutral flex max-w-sm flex-col gap-4 self-center justify-self-center rounded-lg border p-8 shadow-2xl"
      @submit.prevent="emit('submit')"
    >
      <template v-if="session">
        <p class="text-base-content/50">Logged in as:</p>
        <div class="flex items-center gap-4">
          <img :src="session.profileUrl" class="size-12 rounded-full" />
          <p class="font-overpass text-2xl font-bold">{{ session.username }}</p>
        </div>
      </template>

      <template v-else>
        <h2 class="font-overpass text-center text-2xl font-bold">
          {{ title }}
        </h2>
        <h3 v-if="subtitle" class="text-base-content/90 px-8 text-center text-sm">
          {{ subtitle }}
        </h3>

        <slot />
      </template>
    </form>
  </div>
</template>
