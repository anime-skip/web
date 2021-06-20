<template>
  <nav-and-footer>
    <div class="w-full max-w-screen-lg mx-auto space-y-4 p-16 box-border">
      <h1 class="heading-3">API Docs</h1>
      <p class="body-1">
        The Anime Skip API is a GraphQL API. If you're unfamiliar with GraphQL, head over to their
        <a class="body-1" href="https://graphql.org/" target="_blank">official docs</a> to learn
        more.
      </p>
      <pre v-highlightjs><code class="bash">curl --request POST \
  --url https://api.anime-skip.com/graphql \
  --header 'content-type: application/json' \
  --header 'x-client-id: ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE' \
  --data '{"query":"{\n  searchShows(search: \"spider\", limit: 10) {\n    id\n    name\n    originalName\n  }\n}\n"}'</code></pre>
      <h2 class="heading-4 pt-8">Getting Started</h2>
      <p class="body-1">
        Head over to the
        <a class="body-1" href="http://test.api.anime-skip.com/graphiql" target="_blank"
          >test environment's playground</a
        >
        to mess around with it in your browser.
        <strong>The playground also contains all the API documentation</strong> for the types,
        queries, and mutations in the "Docs" side menu.
      </p>
      <p class="body-1">
        If you're ready to use your own scripts or tools to call the API, please start out in the
        test environment. Once you've worked out the kinks, feel free to switch to the production
        environment!
      </p>
      <h3 class="heading-5 pt-8">Test Environment</h3>
      <p>
        <code class="text-primary">http://test.api.anime-skip.com/graphql</code>
      </p>
      <ul class="list-disc space-y-2">
        <li class="ml-8"><p class="body-1">Production accounts are not present</p></li>
        <li class="ml-8"><p class="body-1">Production data is not available</p></li>
        <li class="ml-8">
          <p class="body-1">Data (except for accounts) is deleted every once in a while</p>
        </li>
        <li class="ml-8">
          <p class="body-1">The <code>X-Client-ID</code> header is not required</p>
        </li>
      </ul>
      <pre v-highlightjs><code class="graphql"># Example query to create a test account
mutation {
  createAccount(
    username: "&lt;change-me&gt;",
    email: "&lt;change-me&gt;",
    passwordHash: "&lt;md5-hash-of-password&gt;",
    recaptchaResponse: "password1",
  ) {
    authToken
    refreshToken
    account {
      username
      email
    }
  }
}</code></pre>
      <h3 class="heading-5 pt-8">Production</h3>
      <p>
        <code class="text-primary">https://api.anime-skip.com/graphql</code>
      </p>
      <ul class="list-disc space-y-2">
        <li class="ml-8">
          <p class="body-1">The <code>X-Client-ID</code> header is required</p>
        </li>
        <li class="ml-8">
          <p class="body-1">Some queries cannot be called by third party clients</p>
        </li>
      </ul>
      <p class="body-1">
        Lets talk about the <code>X-Client-ID</code> header. This is just used to help me identify
        who is calling the API, as well as setup rate limiting to prevent abuse. Client IDs are tied
        to specific origins, and requests can only be made from those origins.
      </p>
      <p class="body-1">
        Don't hesitate to reach out to me to get a client ID setup for your app! It means nothing,
        and there are no requirements. Just send an email to
        <a href="mailto:aaron@anime-skip.com?subject=Request for Client ID">aaron@anime-skip.com</a>
        with the following details:
      </p>
      <ul class="list-disc space-y-2">
        <li class="ml-8">
          <p class="body-1">Username</p>
        </li>
        <li class="ml-8">
          <p class="body-1">Account email tied to username</p>
        </li>
        <li class="ml-8">
          <p class="body-1">Description of what you're using the API for</p>
        </li>
      </ul>
      <p class="body-1">
        If you still don't want to get a unique one for yourself, you can use this one:
      </p>
      <pre v-highlightjs><code class="text">ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE</code></pre>
      <p class="body-1">
        This client ID is more heavilty rate limitted and only works with requests from
        <code>localhost</code>.
      </p>
      <p class="body-1">
        Eventually I'll have a apps dashboard that you can manage third party apps and client ids
        through, but that's not a high priority right now.
      </p>
    </div>
  </nav-and-footer>
</template>

<script lang="ts">
import NavAndFooter from '@/layouts/NavAndFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { NavAndFooter },
  setup() {
    return {};
  },
});
</script>

<style scoped>
a {
  @apply hover:underline text-secondaryPalette-200;
}
pre {
  @apply mx-2 overflow-x-auto;
}
pre > code {
  @apply py-4 px-5 bg-control rounded-lg;
}
code {
  @apply bg-control rounded px-1.5 py-1 text-on-surface text-opacity-medium;
}
</style>
