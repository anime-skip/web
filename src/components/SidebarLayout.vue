<template>
  <div
    class="flex-1 w-full max-w-screen-xl flex flex-col md:flex-row px-16 md:px-12 gap-8 md:space-y-0 md:gap-16 py-16 md:py-12 mx-auto"
  >
    <header class="space-y-4 w-96 md:w-64 self-center md:self-start md:sticky md:top-28">
      <slot name="side" />
    </header>
    <section class="md:flex-1 self-stretch">
      <slot name="content" />
    </section>
  </div>
</template>
