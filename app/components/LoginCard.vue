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
      class="flex flex-col gap-4 p-8 rounded-lg shadow-2xl shadow-neutral self-center justify-self-center border border-neutral max-w-sm"
      @submit.prevent="emit('submit')"
    >
      <template v-if="session">
        <p class="text-base-content/50">Logged in as:</p>
        <div class="flex items-center gap-4">
          <img :src="session.profileUrl" class="rounded-full size-12" />
          <p class="font-overpass font-bold text-2xl">{{ session.username }}</p>
        </div>
      </template>

      <template v-else>
        <h2 class="text-center font-overpass font-bold text-2xl">
          {{ title }}
        </h2>
        <h3
          v-if="subtitle"
          class="text-center text-sm text-base-content/90 px-8"
        >
          {{ subtitle }}
        </h3>

        <slot />
      </template>
    </form>
  </div>
</template>
