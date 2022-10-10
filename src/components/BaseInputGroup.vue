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
    <label v-if="labelTl || labelTr" class="label">
      <span v-if="labelTl" class="label-text">{{ labelTl }}</span>
      <span v-if="labelTr" class="label-text-alt">{{ labelTr }}</span>
    </label>
    <label class="input-group">
      <span v-if="$slots.left"><slot name="left" /></span>
      <slot />
      <span v-if="$slots.right"><slot name="right" /></span>
    </label>
    <label v-if="$slots.labelBl || labelBr" class="label">
      <span v-if="$slots.labelBl" class="label-text"><slot name="labelBl" /></span>
      <span v-if="labelBr" class="label-text-alt">{{ labelBr }}</span>
    </label>
  </div>
</template>
