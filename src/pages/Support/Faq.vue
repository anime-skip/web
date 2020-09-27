<template>
  <div class="FAQ" :class="{ expanded }">
    <img src="../../assets/ic_chevron_down.svg" alt="expand" @click="toggleExpanded" />
    <div class="right">
      <h3 @click="toggleExpanded">{{ question }}</h3>
      <slot v-if="expanded" @click.stop />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    question: { type: String, required: true },
  },
  setup() {
    const expanded = ref<boolean>(false);
    const toggleExpanded = () => {
      expanded.value = !expanded.value;
    };
    return {
      expanded,
      toggleExpanded,
    };
  },
});
</script>

<style lang="scss">
.FAQ {
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 24px;
  margin: 16px 0;

  img,
  h3 {
    cursor: pointer;
  }

  h3 {
    font-weight: 500;
    color: $textPrimaryColor;
    font-size: 16px;
    padding-top: 4px;
  }

  p {
    margin-top: 12px;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    opacity: 0.64;
    transition: 200ms;
  }

  &.expanded {
    background-color: $dark400;
    padding: 24px 24px 20px 20px;
    transition: 200ms;

    h3 {
      padding-top: 0;
      margin-bottom: 16px;
      font-weight: bold;
      color: $textTitleColor;
      font-size: 20px;
    }

    img {
      transform: rotateZ(180deg);
      opacity: 1;
    }
  }
}
</style>
