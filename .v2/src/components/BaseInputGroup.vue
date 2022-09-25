<script lang="ts" setup>
defineProps<{
  labelTl?: string;
  labelTr?: string;
  labelBl?: string;
  labelBr?: string;
}>();
</script>

<template>
  <!-- https://daisyui.com/components/input/#with-form-control-and-labels -->
  <div class="form-control">
    <label v-if="labelTl || labelTr" class="label">
      <span class="label-text">labelTl</span>
      <span class="label-text-alt">labelTr</span>
    </label>
    <label class="input-group">
      <span v-if="$slots.left"><slot name="left" /></span>
      <slot />
      <span v-if="$slots.right"><slot name="right" /></span>
    </label>
    <label class="label">
      <span class="label-text-alt">Alt label</span>
      <span class="label-text-alt">Alt label</span>
    </label>
  </div>
</template>
