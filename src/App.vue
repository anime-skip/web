<template>
  <router-view />
</template>

<style lang="scss">
@import '@/scss/theme.scss';

#app {
  height: 100%;

  .child {
    margin-top: $navBarHeight;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
