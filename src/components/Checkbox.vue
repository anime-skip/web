<template>
  <div class="Checkbox" @click="toggle">
    <input v-model="value" type="checkbox" />
    <label><slot /></label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Boolean, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (value: boolean) => emit('update:modelValue', value),
    });
    const toggle = () => emit('update:modelValue', !value.value);
    return {
      value,
      toggle,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  cursor: pointer;
}

.Checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  align-self: flex-start;
  border-radius: 4px;
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  &:hover:active {
    background-color: rgba(255, 255, 255, 0.12);
  }

  label {
    margin-left: 12px;
    color: rgba(255, 255, 255, 0.48);
    font-size: 14px;
  }
}
</style>
