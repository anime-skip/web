<script lang="ts" setup>
defineProps<{
  name: string;
  modalTitle: string;
  closeButton?: boolean;
  disableDismiss?: boolean;
}>();
</script>

<template>
  <label :for="name"><slot name="button" /></label>

  <teleport to="body">
    <input type="checkbox" :id="name" class="modal-toggle" />
    <label :for="name" class="modal cursor-pointer">
      <label for="" class="modal-box relative">
        <label
          v-if="closeButton"
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 class="font-bold text-lg">{{ modalTitle }}</h3>
        <div class="pt-4 space-y-2">
          <slot name="content" />
        </div>
        <div class="modal-action">
          <label :for="name" class="btn">Close</label>
        </div>
      </label>
    </label>
  </teleport>
</template>
