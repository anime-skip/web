<template>
  <div class="alert shadow-lg">
    <div class="flex gap-4">
      <div v-if="$slots.icon" class="flex-shrink-0 pl-1">
        <slot name="icon" />
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div v-if="$slots.buttons" class="flex-none">
      <slot name="buttons" />
    </div>
  </div>
</template>
