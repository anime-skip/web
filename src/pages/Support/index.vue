<template>
  <NavAndFooterLayout>
    <div class="mt-32 pb-24">
      <div class="max-w-screen-lg mx-auto px-16">
        <div class="space-y-4">
          <h1 class="heading-3 pb-4">Support</h1>
          <p>
            Anime Skip is a one-man team, so I expect to be spending a lot of time each day
            responding to questions or issues after the user base grows. I will happily respond to
            any emails you send me, but I'd also like to point out other resouces you can use to
            answer your question or resolve your issue:
          </p>
          <ul class="list-disc ml-8 space-y-2">
            <li>
              <router-link to="#faq">FAQ</router-link> - Check out the section below to see if your
              question has already been answered
            </li>
            <li>
              <a href="https://discord.gg/9wVhwZg" target="_blank">Discord</a> - Ask the community
              for help, report bugs, create feature requests
            </li>
          </ul>
          <p>
            If you'd like to reach out to me directly, you can do so by emailing
            <a href="mailto:support@anime-skip.com">support@anime-skip.com</a>, and I'll respond as
            soon as possible!
          </p>
        </div>

        <div id="faq" class="space-y-8 pt-20">
          <h2 class="heading-4">FAQ</h2>
          <FaqList />
        </div>

        <div id="timestamp-types" class="space-y-8 pt-20">
          <h2 class="heading-4">Timestamp Types</h2>
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
import { Api } from '@/@types/api';
import api from '@/api';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Faq from './Faq.vue';
import FaqList from './FaqList.vue';

export default defineComponent({
  components: { FaqList, Faq },
  setup() {
    const scrollTo = (selector: string) => {
      setTimeout(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    };
    const route = useRoute();
    watch(
      () => route.hash,
      () => {
        if (!route.hash) return;
        scrollTo(route.hash);
      },
    );

    const timestampTypes = ref<Api.TimestampType[]>([]);
    api
      .allTimestampTypes(`{ id name description }`)
      .then(result => {
        if (result == null) {
          timestampTypes.value = [];
        } else {
          timestampTypes.value = result.map(type => ({
            id: type.id,
            name: type.name,
            description: type.description,
          }));
        }
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
