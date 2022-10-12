<template>
  <base-navbar>
    <div class="min-h-screen flex flex-col mt-20">
      <div class="flex-grow">
        <slot />
      </div>
      <site-footer />
    </div>
  </base-navbar>
</template>
