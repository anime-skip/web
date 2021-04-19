<template>
  <div
    :class="{
      'pb-24': selected,
    }"
  >
    <div
      class="GetStartedCard p-7 rounded-3xl transition-all flex space-x-6 border-primary"
      :class="{
        done,
        'bg-control': !selected && !done,
        'selected framing-shadow border-2': selected,
      }"
    >
      <div class="flex-grow-0">
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          :class="{
            'bg-primary': !done,
            'bg-control': done,
          }"
        >
          <span
            v-if="!done"
            class="font-heading text-on-primary font-extrabold mt-1 text-xl transition-all"
            >{{ number }}</span
          >
          <icon-check v-else class="w-6 fill-on-surface" />
        </div>
      </div>
      <div class="Content flex-1 flex-shrink-0 space-y-6">
        <h4
          class="mt-1 transition-all"
          :class="{
            'opacity-medium': done && !expanded,
            'cursor-pointer': done,
          }"
          @click="toggleExpanded"
        >
          {{ title }}
        </h4>
        <slot v-if="shouldShowMessage" name="message" />
        <div v-if="shouldShowButtons" class="flex gap-4 flex-wrap py-1">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IconCheck from '@/assets/IconCheck.vue';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  components: {
    IconCheck,
  },
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

<style>
.GetStartedCard {
}

.GetStartedCard .flex-basis-0 {
  flex-basis: 0;
}

.GetStartedCard .mt-5px {
  margin-top: 8px;
}

/* .Card {

  &.selected {
    // background-color: $backgroundColor;
    // border: 2px solid $primary500;
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
      // background-color: $dark400;
    }

    h2 {
      // color: $textDisabledColor;
    }
  }
} */
</style>
