<template>
  <button class="checkbox hover" v-ripple @click="toggleChecked" @mousedown="onMouseDown" @mouseup="onMouseUp">
    <input type="checkbox" :checked="checked" autocomplete="off">
    <CheckboxSVG color="#673AB7" :down="down" :checked="checked" />
    <label class="label">{{label}}</label>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckboxSVG from '@/assets/CheckboxSVG.vue';

@Component({
  components: {
    CheckboxSVG,
  },
})
export default class Checkbox extends Vue {
  @Prop() private label!: string;
  @Prop() private defaultChecked?: boolean;

  private checked: boolean = this.defaultChecked || false;
  private isFocused: boolean = false;
  private down: boolean = false;

  public toggleChecked(event: Event) {
    event.preventDefault();
    this.checked = !this.checked;
  }
  public onMouseDown(event: MouseEvent) {
    this.down = true;
  }
  public onMouseUp(event: MouseEvent) {
    this.down = false;
  }
}
</script>

<style lang="scss">
$height: 24px;
$padding: 8px;

.checkbox {
  height: $height + $padding * 2;
  display: flex;
  padding: $padding;
  outline: none;
  box-sizing: content-box;
  background-color: transparent;
  border: none;
  input {
    display: none;
  }
  label {
    flex: 1;
    height: $height;
    line-height: $height + 2px;
    font-size: 14px;
    text-align: start;
    margin-left: 12px;
    margin-right: 4px;
  }
}
</style>
