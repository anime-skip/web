<template>
  <div class="TextInput" :class="{ invalid: !valid }" @click="focusOnInput">
    <slot name="left" class="left" />
    <slot>
      <input
        class="middle"
        ref="input"
        v-model="value"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
      />
    </slot>
    <slot name="right" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: String, required: true },
    placeholder: String,
    name: String,
    type: { type: String, default: 'text' },
    valid: { type: Boolean, required: false, default: true },
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    autocomplete: { type: String, required: false },
  },
  setup(props, { emit }) {
    const value = computed<string>({
      get: () => props.modelValue,
      set: (value: string) => emit('update:modelValue', value),
    });

    return {
      value,
    };
  },
  methods: {
    focusOnInput() {
      (this.$refs.input as HTMLInputElement | undefined)?.focus();
    },
  },
});
</script>

<style lang="scss" scoped>
.TextInput {
  display: flex;
  flex-direction: row;
  align-items: center;
  // background-color: rgba(0, 0, 0, 0.24);
  outline: none;
  background-color: #191e24cc;
  border-radius: 4px;
  cursor: text;

  &.invalid {
    outline: 1px solid #a83b27;
  }

  .left,
  .right {
    flex-shrink: 0;
  }

  .middle {
    flex-grow: 1;
    position: relative;
    height: 100%;
    height: 48px;
    box-sizing: border-box;
    display: block;
    padding: 0 12px;
    background-color: transparent;
    border: none;
    min-width: 0;
    caret-color: #b791f8;

    &::placeholder {
      color: rgba(255, 255, 255, 0.36);
    }
  }
}
</style>
