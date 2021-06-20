<template>
  <loading-overlay class="min-h-item" :is-loading="isLoading">
    <div v-if="isFailure" class="p-8 flex flex-col items-center space-y-4">
      <div class="flex space-x-4">
        <icon-error class="fill-error" />
        <span>Hmm, something went wrong</span>
      </div>
      <raised-button @click="fetchEpisodes">Retry</raised-button>
    </div>
    <ul v-else class="divide-y divide-control">
      <li
        v-for="episode of recentEpisodes"
        :key="episode.id"
        class="flex items-center px-6 pt-3 pb-4"
      >
        <div class="flex-1 flex flex-col space-y-1">
          <p class="text-lg text-on-surface font-medium">
            {{ listItemEpisode(episode) }}
          </p>
          <p class="body-2">
            <span class="text-primary">{{ listItemShow(episode.show) }}</span>
            <span class="text-on-surface text-opacity-high">{{ listItemSubtitle(episode) }}</span>
          </p>
        </div>
        <p class="body-1 text-on-surface text-opacity-medium pt-1">
          {{ listItemTimeSinceCreated(episode) }} ago
        </p>
      </li>
    </ul>
  </loading-overlay>
</template>

<script lang="ts">
import { Api } from '@/@types/api';
import api from '@/api';
import IconError from '@/assets/IconError.vue';
import { useRequestState } from '@/composition/request-state';
import { RequestState } from '@/utils/enums';
import EpisodeUtils from '@/utils/EpisodeUtils';
import TimeUtils from '@/utils/time';
import { LoadingOverlay, RaisedButton } from '@anime-skip/ui';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: { LoadingOverlay, RaisedButton, IconError },
  setup() {
    const { isLoading, isFailure, tryCatch } = useRequestState(RequestState.LOADING);
    const recentEpisodes = ref<Api.RecentEpisode[]>([]);
    const fetchEpisodes = tryCatch(async () => {
      const data = await api.recentlyAddedEpisodes(
        `{
          id
          name
          season
          number
          absoluteNumber
          show {
            name
          }
        }`,
        {
          limit: 10,
        },
      );
      recentEpisodes.value = (data ?? [])?.map(episode => ({
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number,
        absoluteNumber: episode.absoluteNumber,
        createdAt: episode.createdAt,
        show: {
          name: episode.show.name,
        },
      }));
    });

    return {
      fetchEpisodes,
      recentEpisodes,
      isLoading,
      isFailure,
    };
  },
  mounted(): void {
    this.fetchEpisodes();
  },
  methods: {
    listItemShow(show: Api.RecentEpisode['show'] | undefined): string {
      return show?.name ?? 'Unknown Show';
    },
    listItemEpisode(episode: Api.RecentEpisode): string {
      return episode.name ?? 'Unknown Epiosde';
    },
    listItemSubtitle(episode: Api.RecentEpisode): string {
      const result = EpisodeUtils.seasonAndNumberDisplay(episode);
      return result ? ` • ${result}` : '';
    },
    listItemTimeSinceCreated(episode: Api.RecentEpisode): string {
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

<style scoped lang="css">
.min-h-item {
  min-height: 128px;
}

/*
.RecentEpisodesList {
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 600px) {
    // background-color: $backgroundColor;
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
      // border-bottom: 1px solid $dark400;
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
        // color: $textTitleColor;
        font-size: 17px;
      }

      .subtitle,
      .subtitle * {
        // color: $textSecondaryColor;
        font-size: 14px;
        .show {
          // color: $primary500;
        }
      }

      .time {
        // color: $textDisabledColor;
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
*/
</style>
