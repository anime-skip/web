<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import useGqlVerifyEmailAddressMutation from "app/composables/useGqlVerifyEmailAddressMutation";
import DefaultLayout from "app/layouts/DefaultLayout.vue";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

useHead({
  title: "Email Verification – Anime Skip",
});

const route = useRoute();
const router = useRouter();

const validationToken = route.query.token as string | undefined;

const { mutate, isError, error } = useGqlVerifyEmailAddressMutation();

onMounted(() => {
  if (!validationToken) return;
  mutate(
    { validationToken },
    {
      onSuccess: () => router.replace("/account"),
    },
  );
});

const errorMessage = computed(() => {
  if (!validationToken) return "Missing verification token";
  return (error.value as any)?.message ?? String(error.value);
});
</script>

<template>
  <DefaultLayout>
    <div class="m-auto p-8">
      <p v-if="isError || !validationToken" class="text-error">
        Failed to verify email address: {{ errorMessage }}
      </p>
      <p v-else>Verifying email address...</p>
    </div>
  </DefaultLayout>
</template>
