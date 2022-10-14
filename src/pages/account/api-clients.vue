<script lang="ts" setup>
useHead({
  title: 'API Clients – Anime Skip',
});

const showCreateForm = ref(false);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      <h1 class="font-stylized text-3xl font-bold">API Clients</h1>
      <p class="text-base-content text-opacity-70">
        Manage your API clients used to access the Anime Skip API.
      </p>
    </div>

    <div>
      <button
        class="btn btn-primary gap-2"
        :class="{
          'btn-outline': showCreateForm,
        }"
        @click="showCreateForm = true"
      >
        <span>Add New Client</span>
        <div class="inline-block text-2xl i-mdi-plus transition" />
      </button>

      <teleport to="body">
        <input
          type="checkbox"
          id="create-api-client"
          class="modal-toggle"
          v-model="showCreateForm"
        />
        <div class="modal">
          <div class="modal-box">
            <create-api-client-form
              v-if="showCreateForm"
              @canceled="showCreateForm = false"
              @created="showCreateForm = false"
            />
          </div>
        </div>
      </teleport>
    </div>

    <api-client-list />
  </div>
</template>
