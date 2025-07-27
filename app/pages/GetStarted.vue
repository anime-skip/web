<script lang="ts" setup>
import GetStartedItem from "app/components/GetStartedItem.vue";
import SupportedServicesUl from "app/components/SupportedServicesUl.vue";
import useIsExtensionInstalled from "app/composables/useIsExtensionInstalled";
import useIsExtensionSignedIn from "app/composables/useIsExtensionSignedIn";
import useSession from "app/composables/useSession";
import ContentLayout from "app/layouts/ContentLayout.vue";
import { computed } from "vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Get Started – Anime Skip",
});

const { session } = useSession();

const downloadCompleted = useIsExtensionInstalled();
const createAnAccountCompleted = computed(() => session.value != null);
const loginCompleted = useIsExtensionSignedIn();
</script>

<template>
  <ContentLayout>
    <div class="py-16 px-8 flex flex-col gap-4">
      <GetStartedItem
        number="1"
        title="Download the Browser Extension"
        :completed="downloadCompleted"
      >
        <p>
          The "Anime Skip Player" extension adds a custom video player to your
          browser when watching anime on supported websites:
        </p>

        <SupportedServicesUl />

        <div class="flex gap-4 flex-wrap">
          <a
            class="btn btn-neutral"
            target="blank"
            href="https://chromewebstore.google.com/detail/anime-skip-player/mgmdkjcljneegjfajchedjpdhbadklcf"
          >
            <i class="i-logos-chrome size-5" />
            <span>Install on Chrome</span>
            <i
              class="i-heroicons-arrow-top-right-on-square text-neutral-content/50"
            />
          </a>
          <a
            class="btn btn-neutral"
            target="blank"
            href="https://addons.mozilla.org/en-US/firefox/addon/anime-skip/"
          >
            <i class="i-logos-firefox size-5" />
            <span>Install on Firefox</span>
            <i
              class="i-heroicons-arrow-top-right-on-square text-neutral-content/50"
            />
          </a>
        </div>

        <p class="text-sm text-base-content/50">
          You may need to reload this page after installing.
        </p>
      </GetStartedItem>

      <GetStartedItem
        number="2"
        title="Create an Account"
        :completed="createAnAccountCompleted"
      >
        <p>
          If you don't create an account, you still get all the features of the
          video player, except you won't be able to contribute timestamps back
          to the community.
        </p>

        <a
          v-if="!createAnAccountCompleted"
          class="btn self-start"
          href="/sign-up"
          target="blank"
          >Sign Up</a
        >
      </GetStartedItem>

      <GetStartedItem
        number="3"
        title="Log in to the Extension"
        :completed="loginCompleted"
      >
        <p>
          Once you're logged in, you can setup the timestamps you want to skip.
        </p>
        <p>
          There are a lot of different types of timestamps in anime, and you
          should be able to skip only what you want. To learn more about what
          each timestamp represents,
          <a class="link" href="/faq" target="">checkout the FAQ</a>.
        </p>
      </GetStartedItem>

      <GetStartedItem number="4" title="Start Watching Anime!" last>
        <p>
          You're done! Visit any of the supported services to start watching
          anime with the Anime Skip Player.
        </p>
        <SupportedServicesUl />
        <p>Some other helpful links:</p>
        <ul class="list-disc pl-8">
          <li>
            <a class="link" target="_blank" href="https://discord.gg/9wVhwZg"
              >FAQ</a
            >
            &ndash; go here first if you have problems with the extension.
          </li>
          <li>
            <a class="link" target="_blank" href="https://discord.gg/9wVhwZg"
              >Join the Discord</a
            >
            &ndash; There you'll find announcements, support, feature requests,
            bug reports, etc.
          </li>
          <li>
            <a class="link" target="_blank" href="https://discord.gg/9wVhwZg"
              >Recently added episodes</a
            >
            &ndash; See what other people are watching!
          </li>
        </ul>
      </GetStartedItem>
    </div>
  </ContentLayout>
</template>
