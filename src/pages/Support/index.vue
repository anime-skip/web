<template>
  <div class="Support">
    <div class="column">
      <h1>Support</h1>
      <p>
        Anime Skip is a one-man team, so I spend a lot of time each day responding to questions or
        issues. I will happly respond to any emails about issues or questions you may have, but I'd
        also like to point out other resouces you can use to answer your question or resolve your
        issue:
      </p>
      <ul>
        <li>
          <strong>FAQ</strong> - Please check out the frequently asked questions to see if your
          question has already been answered
        </li>
        <li>
          <strong><a href="https://discord.gg/9wVhwZg" target="_blank">Discord</a></strong> - Ask
          the community for help, report bugs, create feature requests
        </li>
      </ul>
      <p>
        If you'd like to reach out to me directly, you can do so by emailing
        <a href="mailto:support@anime-skip.com">support@anime-skip.com</a>, and I'll respond as soon
        as possible!
      </p>

      <h2 id="faq">FAQ</h2>
      <FaqList />

      <h2 id="timestamp-types">Timestamp Types</h2>
      <div>
        <Faq v-for="type of timestampTypes" :key="type.id" :question="type.name">
          <template v-slot:default>
            <p>{{ type.description }}</p>
          </template>
        </Faq>
      </div>

      <h2 id="editing-best-practices">Editing - Best Practices</h2>
      <p>
        This section has not been written yet
      </p>
    </div>
  </div>
  <div class="fill" />
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

<style lang="scss" scoped>
.Support {
  display: flex;
  flex-direction: column;
  align-items: center;

  .column {
    width: 100%;
    max-width: 1128px;
    padding: 64px 32px;
    box-sizing: border-box;
  }

  h1,
  h2,
  p,
  ul {
    margin-bottom: 16px;
  }

  ul {
    margin-top: 24px;
  }

  h2 {
    margin-top: 48px;
  }

  ul {
    margin-left: 24px;
  }
}

.fill {
  flex: 1;
}
</style>
