import {
  GqlAccount,
  GqlEpisode,
  GqlPreferences,
  GqlShow,
  GqlTimestampType,
} from '@anime-skip/axios-api';

namespace Api {
  type StateAccount = Pick<
    GqlAccount,
    'id' | 'email' | 'username' | 'emailVerified' | 'profileUrl'
  >;

  type StatePreferences = Pick<
    GqlPreferences,
    | 'enableAutoPlay'
    | 'enableAutoSkip'
    | 'minimizeToolbarWhenEditing'
    | 'hideTimelineWhenMinimized'
    | 'skipBranding'
    | 'skipCanon'
    | 'skipCredits'
    | 'skipFiller'
    | 'skipIntros'
    | 'skipMixedCredits'
    | 'skipMixedIntros'
    | 'skipNewCredits'
    | 'skipNewIntros'
    | 'skipPreview'
    | 'skipRecaps'
    | 'skipTitleCard'
    | 'skipTransitions'
  >;

  type TimestampType = Pick<GqlTimestampType, 'id' | 'name' | 'description'>;

  type RecentEpisode = Pick<
    GqlEpisode,
    'id' | 'name' | 'absoluteNumber' | 'createdAt' | 'number' | 'season'
  > & {
    show?: Pick<GqlShow, 'name'>;
  };
}
