<template>
  <NavAndFooterLayout>
    <div class="mt-32 pb-24">
      <div class="max-w-screen-lg mx-auto px-16 space-y-24">
        <div class="space-y-4">
          <h1 class="heading-3 pb-4">Support</h1>
          <p class="body-1 text-on-surface text-opacity-high">
            Anime Skip is a one-man team, so I expect to be spending a lot of time each day
            responding to questions or issues after the user base grows. I will happily respond to
            any emails you send me, but I'd also like to point out other resouces you can use to
            answer your question or resolve your issue:
          </p>
          <ul class="list-disc ml-8 space-y-2">
            <li class="body-1 text-on-surface text-opacity-high">
              <strong>FAQ</strong> - Check out the section below to see if your question has already
              been answered
            </li>
            <li class="body-1 text-on-surface text-opacity-high">
              <strong
                ><a
                  class="text-secondaryPalette-200 hover:underline"
                  href="https://discord.gg/9wVhwZg"
                  target="_blank"
                  >Discord</a
                ></strong
              >
              - Ask the community for help, report bugs, create feature requests
            </li>
          </ul>
          <p class="body-1 text-on-surface text-opacity-high">
            If you'd like to reach out to me directly, you can do so by emailing
            <a
              class="text-secondaryPalette-200 hover:underline"
              href="mailto:support@anime-skip.com"
              >support@anime-skip.com</a
            >, and I'll respond as soon as possible!
          </p>
        </div>

        <div class="space-y-8">
          <h2 id="faq" class="heading-4">FAQ</h2>
          <FaqList />
        </div>

        <div class="space-y-8">
          <h2 id="timestamp-types" class="heading-4">Timestamp Types</h2>
          <Faq v-for="type of timestampTypes" :key="type.id" :question="type.name">
            <template #default>
              <p>{{ type.description }}</p>
            </template>
          </Faq>
        </div>

        <div id="contributing" />
      </div>
    </div>
    <div class="fill" />
  </NavAndFooterLayout>
</template>

<script lang="ts">
import api from '@/api';
import { Api } from '@anime-skip/types';
import { defineComponent, ref } from 'vue';
import FaqList from './FaqList.vue';
import Faq from './Faq.vue';

export default defineComponent({
  components: { FaqList, Faq },
  setup() {
    const timestampTypes = ref<Api.TimestampType[]>([]);
    api
      .getAllTimestampTypes()
      .then(result => {
        timestampTypes.value = result;
      })
      .catch(() => {
        // TODO: add a failure mode
      });

    return {
      timestampTypes,
    };
  },
});
</script>
