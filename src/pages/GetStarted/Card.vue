<template>
  <div class="Card" :class="{ done, selected }">
    <div class="left">
      <div class="number">
        <span v-if="!done">{{ number }}</span>
        <img v-else src="../../assets/ic_done.svg" />
      </div>
    </div>
    <div class="right">
      <h2 @click="toggleExpanded">{{ title }}</h2>
      <slot v-if="shouldShowMessage" name="message" />
      <div v-if="shouldShowButtons" class="buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  props: {
    number: { type: Number, default: undefined },
    title: { type: String, default: undefined },
    selected: Boolean,
    done: Boolean,
    message: { type: String, default: undefined },
  },
  setup(props, context) {
    const expanded = ref<boolean>(false);
    const toggleExpanded = () => {
      if (props.done) {
        expanded.value = !expanded.value;
      }
    };

    const shouldShowMessage = computed<boolean>(() => expanded.value || !props.done);
    const shouldShowButtons = computed<boolean>(
      () => shouldShowMessage.value && context.slots.buttons != null,
    );

    return {
      expanded,
      toggleExpanded,

      shouldShowMessage,
      shouldShowButtons,
    };
  },
});
</script>

<style lang="scss">
@import '@/scss/theme.scss';

.Card {
  padding: 28px;
  background-color: $dark400;
  border-radius: 16px;
  transition: 500ms;
  display: flex;
  flex-direction: row;

  .left {
    flex-grow: 0;
  }

  .right {
    flex-grow: 1;
    flex-basis: 0;

    & > * {
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 4px;
      }
    }
  }

  .number {
    background-color: $primary500;
    width: 36px;
    height: 36px;
    margin-right: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: $overpassFontFamily;
      color: $textTitleColor;
      font-weight: 700;
      font-size: 24px;
      margin-top: 5px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    row-gap: 8px;
    gap: 8px;
    flex-wrap: wrap;
    & > * {
      margin-right: 24px;
    }
  }

  h2 {
    margin-top: 2px;
    min-height: 36px;
    line-height: 36px;
    align-self: flex-start;
  }

  &.selected {
    background-color: $backgroundColor;
    border: 2px solid $primary500;
    padding: 24px;
    margin-top: 0px !important;
    margin-bottom: 64px !important;
    box-shadow: 0 8px 24px 4px rgba($color: #000000, $alpha: 0.24);
  }

  &.done {
    background-color: transparent;
    border: none;
    padding: 28px;
    h2 {
      cursor: pointer;
    }

    img {
      opacity: 0.7;
    }

    .number {
      background-color: $dark400;
    }

    h2 {
      color: $textDisabledColor;
    }
  }
}
</style>
