<template>
  <div class="TextInput" :class="{ invalid: !valid, disabled }" @click="focusOnInput">
    <div class="left">
      <slot name="left" />
    </div>
    <slot>
      <input
        ref="input"
        v-model="value"
        class="middle"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </slot>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: String, required: true },
    placeholder: { type: String, default: undefined },
    name: { type: String, default: undefined },
    disabled: Boolean,
    type: { type: String, default: 'text' },
    valid: { type: Boolean, default: true },
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    autocomplete: { type: String, default: undefined },
  },
  emits: ['update:modelValue', 'focus', 'blur'],
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
@import '@/scss/theme.scss';

.TextInput {
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: none;
  background-color: $dark500;
  border-radius: 4px;
  cursor: text;

  &.invalid {
    outline: 1px solid #a83b27;
  }

  .left,
  .right {
    display: flex;
    flex-shrink: 0;
    align-self: center;
  }

  input.middle {
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
    color: $textTitleColor;

    &::placeholder {
      color: rgba(255, 255, 255, 0.36);
    }
  }

  &.disabled {
    .left {
      opacity: 0.48;
    }
    input.middle {
      color: $textDisabledColor;
    }
  }
}
</style>
