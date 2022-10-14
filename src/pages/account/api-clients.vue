<script lang="ts" setup>
useHead({
  title: 'My API Clients – Anime Skip',
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <h1 class="font-stylized text-3xl font-bold">My API Clients</h1>
      <p class="text-base-content text-opacity-70">
        Manage your API clients used to access the Anime Skip API.
      </p>
    </div>

    <div>
      <button class="btn btn-primary gap-2">
        <div class="inline-block text-2xl i-mdi-plus" />
        <span>Create</span>
      </button>
    </div>

    <api-client-list />
  </div>
</template>
