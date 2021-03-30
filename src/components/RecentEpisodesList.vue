<template>
  <div class="RecentEpisodesList">
    <ul v-if="requestState === RequestState.SUCCESS">
      <li v-for="episode of recentEpisodes" :key="episode.id">
        <div class="left">
          <p class="title">
            {{ listItemEpisode(episode) }}
            <span class="episode" />
          </p>
          <p class="subtitle">
            <span class="show">{{ listItemShow(episode.show) }}</span>
            <span>{{ listItemSubtitle(episode) }}</span>
          </p>
        </div>
        <div class="right">
          <p class="time">{{ listItemTimeSinceCreated(episode) }} ago</p>
        </div>
      </li>
    </ul>
    <div v-else-if="requestState === RequestState.LOADING" class="loading">
      <LoadingIndicator />
    </div>
    <div v-else class="error">
      <div>
        <img src="../assets/ic_error.svg" />
        <span>Hmm, something went wrong</span>
      </div>
      <button class="button primary retry" @click="fetchEpisodes">Retry</button>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api';
import { RequestState } from '@/utils/enums';
import { Api } from '@anime-skip/types';
import { defineComponent, ref } from 'vue';
import EpisodeUtils from '@/utils/EpisodeUtils';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import TimeUtils from '@/utils/time';

export default defineComponent({
  components: { LoadingIndicator },
  setup() {
    const requestState = ref(RequestState.LOADING);
    const recentEpisodes = ref<(Api.Episode & { createdAt: number })[]>([]);
    const fetchEpisodes = async (): Promise<void> => {
      try {
        requestState.value = RequestState.LOADING;
        recentEpisodes.value = await api.recentlyAddedEpisodes(10);
        requestState.value = RequestState.SUCCESS;
      } catch (err) {
        requestState.value = RequestState.FAILURE;
      }
    };

    return {
      fetchEpisodes,
      recentEpisodes,
      requestState,
      RequestState,
    };
  },
  mounted(): void {
    this.fetchEpisodes();
  },
  methods: {
    listItemShow(show: Api.Show | undefined): string {
      return show?.name ?? 'Unknown Show';
    },
    listItemEpisode(episode: Api.Episode): string {
      return episode.name ?? 'Unknown Epiosde';
    },
    listItemSubtitle(episode: Api.Episode): string {
      const result = EpisodeUtils.seasonAndNumberDisplay(episode);
      return result ? ` • ${result}` : '';
    },
    listItemTimeSinceCreated(episode: Api.Episode & { createdAt: number }): string {
      const now = Date.now();
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const createdAt = new Date((episode as any).createdAt);
      const msDiff = Math.abs(now - createdAt.getTime());

      const weeks = Math.floor(msDiff / TimeUtils.WEEKS);
      if (weeks >= 1) {
        return `${weeks} week${weeks === 1 ? '' : 's'}`;
      }
      const days = Math.floor(msDiff / TimeUtils.DAYS);
      if (days >= 1) {
        return `${days} day${days === 1 ? '' : 's'}`;
      }
      const hours = Math.floor(msDiff / TimeUtils.HOURS);
      if (hours >= 1) {
        return `${hours} hour${hours === 1 ? '' : 's'}`;
      }
      const minutes = Math.floor(msDiff / TimeUtils.MINUTES);
      if (minutes > 1) {
        return `${minutes} minutes`;
      }
      return '1 minute';
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/scss/theme.scss';

.RecentEpisodesList {
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 600px) {
    background-color: $backgroundColor;
    border-radius: 16px;
    box-shadow: 0px 8px 24px 8px rgba(0, 0, 0, 0.24);
  }

  ul {
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      list-style: none;
      padding: 16px 24px;
      border-bottom: 1px solid $dark400;
      &:last-child {
        border-bottom: none;
      }

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .right {
        flex-shrink: 0;
        margin-left: 16px;
      }

      .title {
        color: $textTitleColor;
        font-size: 17px;
      }

      .subtitle,
      .subtitle * {
        color: $textSecondaryColor;
        font-size: 14px;
        .show {
          color: $primary500;
        }
      }

      .time {
        color: $textDisabledColor;
      }
    }
  }

  .loading,
  .error {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .error {
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      max-width: 75%;
      img {
        margin-right: 12px;
      }
    }

    .retry {
      margin-top: 16px;
    }
  }
}
</style>
