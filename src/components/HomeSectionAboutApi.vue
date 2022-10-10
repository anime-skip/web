<script lang="ts" setup>
import Logo from '~~/assets/logo.svg';
</script>

<template>
  <section id="api">
    <div class="max-w-screen-sm mx-auto px-4 py-32 space-y-8 text-center">
      <p class="flex gap-4 justify-center items-center">
        <img class="w-16" alt="Anime Skip logo" :src="Logo" />
        <span class="text-4xl opacity-50">+</span>
        <div class="i-logos-graphql text-6xl" />
      </p>
      <h2 class="text-3xl font-stylized">Anime Skip API</h2>
      <p>
        Anime Skip provides a GraphQL API for devlopers to use to integrate timestamps into your own applications.
      </p>
      <p>
        To get started, head over to the
        <nuxt-link class="link link-hover link-secondary" to="/docs/api"
          >API documentation</nuxt-link
        >.
      </p>
    </div>
  </section>
</template>
