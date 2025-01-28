<template>
  <div class="flex fixed top-0 inset-x-0 z-10 bg-base">
    <div class="container flex items-center h-main-navigation">
      <RouterLink to="/" class="btn btn-ghost hover:transform-none shrink-0">
        <img src="app/assets/logo-nav.svg" class="w-10" />
        <span
          class="hidden sm:block font-black font-overpass text-primary tracking-tighter text-2xl pt-1"
        >
          Anime Skip
        </span>
      </RouterLink>
      <RouterLink
        to="/get-started"
        class="btn btn-ghost shrink-0 hover:transform-none text-base-content font-medium text-lg"
      >
        <span class="">Get Started</span>
      </RouterLink>
      <div class="flex-1" />
      <RouterLink to="/sign-in" class="btn btn-shadow shrink-0">
        Log In
      </RouterLink>
    </div>
  </div>
</template>
