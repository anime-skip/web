<script lang="ts" setup>
defineProps<{
  labelTl?: string;
  labelTr?: string;
  labelBr?: string;
}>();
</script>

<template>
  <!-- https://daisyui.com/components/input/#with-form-control-and-labels -->
  <div class="form-control">
    <label v-if="$slots.labelTl || $slots.labelTr" class="label">
      <span v-if="$slots.labelTl" class="label-text"><slot name="labelTl" /></span>
      <span v-if="$slots.labelTr" class="label-text-alt"><slot name="labelTr" /></span>
    </label>
    <label class="input-group">
      <span v-if="$slots.left"><slot name="left" /></span>
      <slot />
      <span v-if="$slots.right"><slot name="right" /></span>
    </label>
    <label v-if="$slots.labelBl || $slots.labelBr" class="label">
      <span v-if="$slots.labelBl" class="label-text"><slot name="labelBl" /></span>
      <span v-if="$slots.labelBr" class="label-text-alt"><slot name="labelBr" /></span>
    </label>
  </div>
</template>
