<template>
  <div
    class="
      flex-1
      w-full
      max-w-screen-lg
      flex flex-col
      md:flex-row
      px-16
      md:px-12
      space-y-8
      md:space-y-0 md:space-x-12
      py-16
      md:py-12
      mx-auto
    "
  >
    <header class="space-y-4 w-full max-w-sm md:w-56 self-center md:self-start md:sticky md:top-28">
      <slot name="side" />
    </header>
    <section class="md:flex-1 self-stretch">
      <slot name="content" />
    </section>
  </div>
</template>
