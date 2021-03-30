<template>
  <NavAndFooterLayout>
    <div class="NotFound">
      <div class="centered">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist</p>
      </div>
    </div>
  </NavAndFooterLayout>
</template>

<style lang="scss" scoped>
@import '@/scss/theme.scss';

.NotFound {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;

  .centered {
    text-align: center;

    h1 {
      font-size: 192px;
      font-weight: 500;
      color: $textSecondaryColor;
    }

    p {
      font-size: 17px;
      color: $textSecondaryColor;
    }
  }
}
</style>
