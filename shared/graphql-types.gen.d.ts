// oxlint-lint-ignore-file
// prettier-ignore
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Standard [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp in UTC
   *
   * ### Example
   *
   * ```
   * 2020-08-04T23:43:27Z
   * ```
   */
  Time: { input: any; output: any; }
  /** A positive integer, specifically Golang's [uint](https://pkg.go.dev/builtin#uint) */
  UInt: { input: any; output: any; }
};

type GqlInputExistingTimestamp = {
  /** The id of the timestamp you want to modify */
  id: Scalars['ID']['input'];
  /** The new values for the timestamp */
  timestamp: GqlInputTimestamp;
};

type GqlInputTimestampOn = {
  /** The episode id the timestamp will be created on */
  episodeId: Scalars['ID']['input'];
  /** The new values for the timestamp */
  timestamp: GqlInputTimestamp;
};

/**
 * A user's role in the system. Higher roles allow a user write access to certain data that a normal
 * user would not. Some queries and mutations are only allowed by certain roles
 */
type GqlRole =
  /** Highest role. Has super user access to all queries and mutations */
  | 'DEV'
  /** Administrator role. Has some elevated permissions */
  | 'ADMIN'
  /** Reviewer role. Lets the user review issues with timestamps */
  | 'REVIEWER'
  /** Basic role. Has no elevated permissions */
  | 'USER';

/**
 * Which of the supported services the `EpisodeUrl` was created for. This is a simple enum that allows
 * for simple checks, but this data can also be pulled from the url in the case of UNKNOWN
 */
type GqlEpisodeSource =
  /** Data came from an external source */
  | 'UNKNOWN'
  /** Data is from <vrv.co> */
  | 'VRV'
  /** Data is from <funimation.com> */
  | 'FUNIMATION'
  /** Data is from <crunchyroll.com> and <beta.crunchyroll.com> */
  | 'CRUNCHYROLL';

/** Where a timestamp originated from */
type GqlTimestampSource =
  | 'ANIME_SKIP'
  | 'BETTER_VRV';

/** The scope that a template applies to */
type GqlTemplateType =
  /** The template is loaded for all episodes of a given show */
  | 'SHOW'
  /** The template is loaded for episodes of a given show where their season is included in `Template.seasons` */
  | 'SEASONS';

/** Color theme the user prefers */
type GqlColorTheme =
  /** Change to match where you're watching */
  | 'PER_SERVICE'
  | 'ANIME_SKIP_BLUE'
  | 'VRV_YELLOW'
  | 'FUNIMATION_PURPLE'
  | 'CRUNCHYROLL_ORANGE';

/** Allowed services for show's external links */
type GqlExternalService =
  | 'ANILIST';

/**
 * The base model has all the fields you would expect a fully fleshed out item in the database would
 * have. It is used to track who create, updated, and deleted items
 */
type GqlBaseModel = {
  /** Unique, v4 UUID. When asked for an `id` of an object, use this field */
  id: Scalars['ID']['output'];
  /** Time that the item was created at */
  createdAt: Scalars['Time']['output'];
  /** The user's `id` that created the item */
  createdByUserId: Scalars['ID']['output'];
  /** The entire user that created the item */
  createdBy: GqlUser;
  /** Time that the item was updated at */
  updatedAt: Scalars['Time']['output'];
  /** The user's `id` that last updated the item */
  updatedByUserId: Scalars['ID']['output'];
  /** The entire user that last updated the item */
  updatedBy: GqlUser;
  /** Time that the item was updated at. If this value is present, the item is considered deleted */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** The user's `id` that deleted the item */
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  /** The entire user that deleted the item */
  deletedBy?: Maybe<GqlUser>;
};

/**
 * Basic information about an episode, including season, numbers, a list of timestamps, and urls that
 * it can be watched at
 */
type GqlEpisode = GqlBaseModel & {
  __typename?: 'Episode';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /**
   * The season number that this episode belongs to
   *
   * ### Examples:
   *
   * - "1"
   * - "1 Directors Cut"
   * - "2"
   * - "Movies"
   */
  season?: Maybe<Scalars['String']['output']>;
  /**
   * The episode number in the current season
   *
   * ### Examples:
   *
   * - "1"
   * - "2"
   * - "5.5"
   * - "OVA 1"
   */
  number?: Maybe<Scalars['String']['output']>;
  /**
   * The absolute episode number out of all the episodes of the show. Generally only regular episodes
   * should have this field
   */
  absoluteNumber?: Maybe<Scalars['String']['output']>;
  /**
   * The duration of the episode's first url, which can be used to calculate a suggested offset for new
   * episode urls. Episodes at different URLs have different branding intros, and that difference can
   * be computed using: `EpisodeUrl.duration - Episode.baseDuration`
   * Generally, this works because each service has it's own branding at the beginning of the show, not
   * at the end of it
   */
  baseDuration?: Maybe<Scalars['Float']['output']>;
  /** The episode's name */
  name?: Maybe<Scalars['String']['output']>;
  /** The show that the episode belongs to */
  show: GqlShow;
  /** The id of the show that the episode belongs to */
  showId: Scalars['ID']['output'];
  /**
   * The list of current timestamps.
   *
   * Timestamps are apart apart of the `Episode` instead of the `EpisodeUrl` so that they can be shared
   * between urls and not need duplicate data
   */
  timestamps: Array<GqlTimestamp>;
  /** The list of urls and services that the episode can be accessed from */
  urls: Array<GqlEpisodeUrl>;
  /** If the episode is the source episode for a `Template`, this will resolve to that template */
  template?: Maybe<GqlTemplate>;
  /**
   * List the user reports for the episode. Requires the REVIEWER role.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to query this property.
   */
  userReports: Array<GqlUserReport>;
};


/**
 * Basic information about an episode, including season, numbers, a list of timestamps, and urls that
 * it can be watched at
 */
type GqlEpisodeUserReportsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Episode info provided by a third party. See `Episode` for a description of each field.
 *
 * When creating data based on this type, fill out and post an episode, then timestamps based on the
 * data here. All fields will map 1 to 1 with the exception of `source`. Since a source belongs to a
 * episode for third party data, but belongs to timestamps in Anime Skip, the source should be
 * propagated down to each of the timestamps. This way when more timestamps are added, a episode can
 * have multiple timestamp sources.
 *
 * > Make sure to fill out the `source` field so that original owner of the timestamp is maintained
 */
type GqlThirdPartyEpisode = {
  __typename?: 'ThirdPartyEpisode';
  /** The Anime Skip `Episode.id` when the `source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']['output']>;
  season?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  absoluteNumber?: Maybe<Scalars['String']['output']>;
  baseDuration?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  source?: Maybe<GqlTimestampSource>;
  timestamps: Array<GqlThirdPartyTimestamp>;
  /** The id of the show from the third party */
  showId: Scalars['String']['output'];
  show: GqlThirdPartyShow;
};

/** Data required to create a new `Episode`. See `Episode` for a description of each field */
type GqlInputEpisode = {
  /** See `Episode.season` */
  season?: InputMaybe<Scalars['String']['input']>;
  /** See `Episode.number` */
  number?: InputMaybe<Scalars['String']['input']>;
  /** See `Episode.absoluteNumber` */
  absoluteNumber?: InputMaybe<Scalars['String']['input']>;
  /** See `Episode.name` */
  name?: InputMaybe<Scalars['String']['input']>;
  /** See `Episode.baseDuration` */
  baseDuration: Scalars['Float']['input'];
};

/** Stores information about what where an episode can be watched from */
type GqlEpisodeUrl = {
  __typename?: 'EpisodeUrl';
  /**
   * The url that would take a user to watch the `episode`.
   *
   * This url should be stripped of all query params.
   */
  url: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  /**
   * The length of the episode at this url. For more information on why this field exists, check out
   * the `Episode.baseDuration`. If an `Episode` does not have a duration, that `Episode` and this
   * `EpisodeUrl` should be given the same value, and the `EpisodeUrl.timestampsOffset` should be set to 0
   */
  duration?: Maybe<Scalars['Float']['output']>;
  /**
   * How much a episode's timestamps should be offset for this `EpisodeUrl`, since different services
   * have different branding animations, leading to offsets between services. This field can be edited
   * to whatever, but it should be suggested to be `EpisodeUrl.duration - Episode.baseDuration`.
   * It can be positive or negative.
   */
  timestampsOffset?: Maybe<Scalars['Float']['output']>;
  /** The `Episode.id` that this url belongs to */
  episodeId: Scalars['ID']['output'];
  /** The `Episode` that this url belongs to */
  episode: GqlEpisode;
  /** What service this url points to. This is computed when the `EpisodeUrl` is created */
  source: GqlEpisodeSource;
};

/** Data required to create a new `EpisodeUrl`. See `EpisodeUrl` for a description of each field */
type GqlInputEpisodeUrl = {
  url: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  timestampsOffset?: InputMaybe<Scalars['Float']['input']>;
};

/** Account info that should only be accessible by the authorized user */
type GqlAccount = {
  __typename?: 'Account';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Unique string slug that is the easy to remember identifier */
  username: Scalars['String']['output'];
  email: Scalars['String']['output'];
  /** Url to an image that is the user's profile picture */
  profileUrl: Scalars['String']['output'];
  /**
   * The linking object that associates a user to the shows they are admins of.
   *
   * > This data is also accessible on the `User` model. It has been added here for convenience
   */
  adminOfShows: Array<GqlShowAdmin>;
  /** If the user's email is verified. Emails must be verified before the user can call a mutation */
  emailVerified: Scalars['Boolean']['output'];
  /** The user's administrative role. Most users are `Role.USER` */
  role: GqlRole;
  /** The user's preferences */
  preferences: GqlPreferences;
};

/**
 * Where all the user preferences are stored. This includes what timestamps the user doesn't want to
 * watch
 */
type GqlPreferences = {
  __typename?: 'Preferences';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  updatedAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** The `User.id` that this preferences object belongs to */
  userId: Scalars['ID']['output'];
  /** The `User` that the preferences belong to */
  user: GqlUser;
  /** Whether or not the user wants to automatically skip section. Default: `true` */
  enableAutoSkip: Scalars['Boolean']['output'];
  /** Whether or not the user wants to auto-play the videos. Default: `true` */
  enableAutoPlay: Scalars['Boolean']['output'];
  /**
   * Whether or not the bottom toolbar with the video progress and play button is minimized after
   * inactivity while editing
   */
  minimizeToolbarWhenEditing: Scalars['Boolean']['output'];
  /**
   * When false, timeline is pinned to the bottom of the screen after inactivity. When true, it is
   * hidden completely
   */
  hideTimelineWhenMinimized: Scalars['Boolean']['output'];
  colorTheme: GqlColorTheme;
  /** Whether or not the user whats to skip branding timestamps. Default: `true` */
  skipBranding: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip regular intros. Default: `true` */
  skipIntros: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip the first of an intro. Default: `false` */
  skipNewIntros: Scalars['Boolean']['output'];
  /** Whether or not the user whats to kip intros that have plot progression rather than the standard animation. Default: `false` */
  skipMixedIntros: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip recaps at the beginning of episodes. Default: `true` */
  skipRecaps: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip filler content. Default: `true` */
  skipFiller: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip canon content. Default: `false` */
  skipCanon: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip commercial transitions. Default: `true` */
  skipTransitions: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip credits/outros. Default: `true` */
  skipCredits: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip the first of a credits/outro. Default: `false` */
  skipNewCredits: Scalars['Boolean']['output'];
  /** Whether or not the user whats to skip credits/outros that have plot progression rather than the standard animation. Default: `false` */
  skipMixedCredits: Scalars['Boolean']['output'];
  /** Whether or not to skip the next episode's preview. Default: `true` */
  skipPreview: Scalars['Boolean']['output'];
  /** Whether or not to skip an episode's static title card. Default: `true` */
  skipTitleCard: Scalars['Boolean']['output'];
};

/**
 * Data used to update a user's `Preferences`. See `Preferences` for a description of each field. If a
 * field is not passed or passed as `null`, it will leave the value as is and skip updating it
 */
type GqlInputPreferences = {
  enableAutoSkip?: InputMaybe<Scalars['Boolean']['input']>;
  enableAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  minimizeToolbarWhenEditing?: InputMaybe<Scalars['Boolean']['input']>;
  hideTimelineWhenMinimized?: InputMaybe<Scalars['Boolean']['input']>;
  colorTheme?: InputMaybe<GqlColorTheme>;
  skipBranding?: InputMaybe<Scalars['Boolean']['input']>;
  skipIntros?: InputMaybe<Scalars['Boolean']['input']>;
  skipNewIntros?: InputMaybe<Scalars['Boolean']['input']>;
  skipMixedIntros?: InputMaybe<Scalars['Boolean']['input']>;
  skipRecaps?: InputMaybe<Scalars['Boolean']['input']>;
  skipFiller?: InputMaybe<Scalars['Boolean']['input']>;
  skipCanon?: InputMaybe<Scalars['Boolean']['input']>;
  skipTransitions?: InputMaybe<Scalars['Boolean']['input']>;
  skipCredits?: InputMaybe<Scalars['Boolean']['input']>;
  skipNewCredits?: InputMaybe<Scalars['Boolean']['input']>;
  skipMixedCredits?: InputMaybe<Scalars['Boolean']['input']>;
  skipPreview?: InputMaybe<Scalars['Boolean']['input']>;
  skipTitleCard?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A show containing a list of episodes and relevant links */
type GqlShow = GqlBaseModel & {
  __typename?: 'Show';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /**
   * The show name
   *
   * ### Examples
   *
   * - "Death Note"
   * - "My Hero Academia"
   */
  name: Scalars['String']['output'];
  /**
   * The show's original Japanese name
   *
   * ### Examples
   *
   * - "Desu Nōto"
   * - "Boku no Hīrō Akademia"
   */
  originalName?: Maybe<Scalars['String']['output']>;
  /** A link to the anime's official website */
  website?: Maybe<Scalars['String']['output']>;
  /** A link to a show poster */
  image?: Maybe<Scalars['String']['output']>;
  /** The list of admins for the show */
  admins: Array<GqlShowAdmin>;
  /** All the episodes that belong to the show */
  episodes: Array<GqlEpisode>;
  /** All the templates that belong to this show */
  templates: Array<GqlTemplate>;
  /** Any links to external sites (just Anilist right now) for the show */
  externalLinks: Array<GqlExternalLink>;
  /** How many seasons are associated with this show */
  seasonCount: Scalars['Int']['output'];
  /** How many episodes are apart of this show */
  episodeCount: Scalars['Int']['output'];
};

type GqlThirdPartyShow = {
  __typename?: 'ThirdPartyShow';
  name: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

/** Data required to create a new `Show`. See `Show` for a description of each field */
type GqlInputShow = {
  name: Scalars['String']['input'];
  originalName?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A list of users that have elevated permissions when making changes to a show, it's episodes, and
 * timestamps. Show admins are responsible for approving any changes that users might submit.
 *
 * If a user has the `ADMIN` or `DEV` roles, they do not need to be show admins to approve changes or
 * make changes directly. Likewise, if a show doesn't have an admin, the user that create the
 * show/episode will have temporary access to editing the data until someone becomes that shows admin.
 *
 * Admins can be created using the API and will soon come to the Anime Skip player/website.
 */
type GqlShowAdmin = GqlBaseModel & {
  __typename?: 'ShowAdmin';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /** The `Show.id` that the admin has elevated privileges for */
  showId: Scalars['ID']['output'];
  /** The `Show` that the admin has elevated privileges for */
  show: GqlShow;
  /** The `User.id` that the admin privileges belong to */
  userId: Scalars['ID']['output'];
  /** The `User` that the admin privileges belong to */
  user: GqlUser;
};

/** Data required to create a new `ShowAdmin`. See `ShowAdmin` for a description of each field */
type GqlInputShowAdmin = {
  showId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

type GqlTimestamp = GqlBaseModel & {
  __typename?: 'Timestamp';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /** The actual time the timestamp is at */
  at: Scalars['Float']['output'];
  source: GqlTimestampSource;
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID']['output'];
  /**
   * The type the timestamp is. This field is a constant string so including it has no effect on
   * performance or query complexity.
   */
  type: GqlTimestampType;
  /** The `Episode.id` that the timestamp belongs to */
  episodeId: Scalars['ID']['output'];
  /** The `Episode` that the timestamp belongs to */
  episode: GqlEpisode;
};

type GqlThirdPartyTimestamp = {
  __typename?: 'ThirdPartyTimestamp';
  /** The Anime Skip `Timestamp.id` when the `Episode.source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']['output']>;
  /** The actual time the timestamp is at */
  at: Scalars['Float']['output'];
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID']['output'];
  type: GqlTimestampType;
};

/** Data required to create a new `Timestamp`. See `Timestamp` for a description of each field */
type GqlInputTimestamp = {
  at: Scalars['Float']['input'];
  typeId: Scalars['ID']['input'];
  source?: InputMaybe<GqlTimestampSource>;
};

/**
 * The type a timestamp can be. This table rarely changes so the values fetched can either be hard
 * coded or fetch occasionally. Anime Skip website and web extension use hardcoded maps to store this
 * data, but a third party might want to fetch and cache this instead since you won't know when Anime
 * Skip adds timestamps
 */
type GqlTimestampType = GqlBaseModel & {
  __typename?: 'TimestampType';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /** The name of the timestamp type */
  name: Scalars['String']['output'];
  /** The description for what this type represents */
  description: Scalars['String']['output'];
};

/** Data required to create a new `TimestampType`. See `TimestampType` for a description of each field */
type GqlInputTimestampType = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

/** Information about a user that is public. See `Account` for a description of each field */
type GqlUser = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  username: Scalars['String']['output'];
  profileUrl: Scalars['String']['output'];
  adminOfShows: Array<GqlShowAdmin>;
};

/** When no timestamps exist for a specific episode, templates are setup to provide fallback timestamps */
type GqlTemplate = GqlBaseModel & {
  __typename?: 'Template';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /** The id of the show that this template is for */
  showId: Scalars['ID']['output'];
  /** The show that this template is for */
  show: GqlShow;
  /** Specify the scope of the template, if it's for the entire show, or just for a set of seasons */
  type: GqlTemplateType;
  /** When the template is for a set of seasons, this is the set of seasons it is applied to */
  seasons?: Maybe<Array<Scalars['String']['output']>>;
  /** The id of the episode used to create the template. All the timestamps are from this episode */
  sourceEpisodeId: Scalars['ID']['output'];
  /** The episode used to create the template. All the timestamps are from this episode */
  sourceEpisode: GqlEpisode;
  /** The list of timestamps that are apart of this template */
  timestamps: Array<GqlTimestamp>;
  /**
   * The list of timestamp ids that are apart of this template. Since this is a many-to-many
   * relationship, this field will resolve quicker than `timestamps` since it doesn't have to do an
   * extra join
   *
   * This is useful when you already got the episode and timestamps, and you just need to know what
   * timestamps are apart of the template
   */
  timestampIds: Array<Scalars['ID']['output']>;
};

/** Data required to create a new template. See `Template` for a description of each field */
type GqlInputTemplate = {
  showId: Scalars['ID']['input'];
  type: GqlTemplateType;
  seasons?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceEpisodeId: Scalars['ID']['input'];
};

/** The many to many object that links a timestamp to a template */
type GqlTemplateTimestamp = {
  __typename?: 'TemplateTimestamp';
  templateId: Scalars['ID']['output'];
  template: GqlTemplate;
  timestampId: Scalars['ID']['output'];
  timestamp: GqlTimestamp;
};

/** Data required to modify the timestamps on a template */
type GqlInputTemplateTimestamp = {
  templateId: Scalars['ID']['input'];
  timestampId: Scalars['ID']['input'];
};

type GqlApiClient = {
  __typename?: 'ApiClient';
  id: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  /** The ID of the user this client belongs to */
  userId: Scalars['ID']['output'];
  /** The user this client belongs to */
  user: GqlUser;
  appName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  rateLimitRpm?: Maybe<Scalars['UInt']['output']>;
};

type GqlCreateApiClient = {
  appName: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

type GqlApiClientChanges = {
  appName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Rate limits can only be changed by admins */
  rateLimitRpm?: InputMaybe<Scalars['UInt']['input']>;
};

type GqlExternalLink = {
  __typename?: 'ExternalLink';
  url: Scalars['String']['output'];
  showId: Scalars['ID']['output'];
  show: GqlShow;
  service: Scalars['String']['output'];
  serviceId?: Maybe<Scalars['String']['output']>;
};

type GqlTotalCounts = {
  __typename?: 'TotalCounts';
  episodes: Scalars['Int']['output'];
  episodeUrls: Scalars['Int']['output'];
  shows: Scalars['Int']['output'];
  timestamps: Scalars['Int']['output'];
  timestampTypes: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
  templates: Scalars['Int']['output'];
};

type GqlUserReport = GqlBaseModel & {
  __typename?: 'UserReport';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: GqlUser;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: GqlUser;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<GqlUser>;
  message: Scalars['String']['output'];
  reportedFromUrl: Scalars['String']['output'];
  resolved: Scalars['Boolean']['output'];
  resolvedMessage?: Maybe<Scalars['String']['output']>;
  timestampId?: Maybe<Scalars['ID']['output']>;
  timestamp?: Maybe<GqlTimestamp>;
  episodeId?: Maybe<Scalars['ID']['output']>;
  episode?: Maybe<GqlEpisode>;
  episodeUrlString?: Maybe<Scalars['String']['output']>;
  episodeUrl?: Maybe<GqlEpisodeUrl>;
  showId?: Maybe<Scalars['ID']['output']>;
  show?: Maybe<GqlShow>;
};

type GqlInputUserReport = {
  /** The content of the report stating what is wrong with the reported data. */
  message: Scalars['String']['input'];
  /** The URL the user made the report from so the reviewer can easily navigate to it. */
  reportedFromUrl: Scalars['String']['input'];
  /** The ID of a timestamp if you're reporting an issue with a specific timestamp. */
  timestampId?: InputMaybe<Scalars['ID']['input']>;
  /** The ID of an episode if you're reporting an issue with a specific episode. */
  episodeId?: InputMaybe<Scalars['ID']['input']>;
  /**
   * The URL of the epiosde URL if you're reporting an issue with a specific episode URL.
   *
   * This is different from `reportedFromUrl`, this is related to an EpisodeUrl model, not the url the report is coming from.
   */
  episodeUrl?: InputMaybe<Scalars['String']['input']>;
  /** The ID of an show if you're reporting an issue with a specific show. */
  showId?: InputMaybe<Scalars['ID']['input']>;
};

type GqlMutation = {
  __typename?: 'Mutation';
  /**
   * Create a user account. 3rd party applications will not have access to this function because of
   * `recaptchaResponse`. Redirect new users to create an account on <anime-skip.com>
   */
  createAccount: GqlLoginData;
  /**
   * Change a user's password by first confirming the old one. This is not a forgot password flow
   *
   * > Note the passwords aren't md5 hashes. The regular login will be moving to this as well eventually
   */
  changePassword: GqlLoginData;
  /** Resend the verification email for the account of the authenticated user */
  resendVerificationEmail?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Callback to handle the verification token included in the email sent using
   * `resendVerificationEmail`
   */
  verifyEmailAddress: GqlAccount;
  /**
   * The first step in the password reset process
   *
   * It sends an email containing a link to reset your password with. That link includes a token, the
   * `passwordResetToken`, that can be passed into the `resetPassword` mutation.
   *
   * > Because the `recaptchaResponse` is required, this can not be performed by 3rd parties
   */
  requestPasswordReset: Scalars['Boolean']['output'];
  /**
   * The second step in the password reset process, coming after `requestPasswordReset`
   *
   * This step is pretty self explanatory, this is when the password is actually reset for a user
   */
  resetPassword: GqlLoginData;
  /** Delete the authenticated user's account */
  deleteMyAccount: GqlAccount;
  /** Update user preferences */
  savePreferences: GqlPreferences;
  /** Create a show and optionally become an admin */
  createShow: GqlShow;
  /** Update show data */
  updateShow: GqlShow;
  /**
   * Delete a show and all it's children (episodes, episode urls, timestamps, admins, etc)
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteShow: GqlShow;
  /**
   * Give admin privilege to a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  createShowAdmin: GqlShowAdmin;
  /**
   * Remove admin privileges from a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteShowAdmin: GqlShowAdmin;
  /** Create an episode under a `Show` */
  createEpisode: GqlEpisode;
  /** Update episode info */
  updateEpisode: GqlEpisode;
  /**
   * Delete an episode and all it's child data
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisode: GqlEpisode;
  /** Link an `Episode` to a service URL */
  createEpisodeUrl: GqlEpisodeUrl;
  /**
   * Unlink an `Episode` to from service URL
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisodeUrl: GqlEpisodeUrl;
  /** Update episode url info */
  updateEpisodeUrl: GqlEpisodeUrl;
  /** Add a timestamp to an `Episode` */
  createTimestamp: GqlTimestamp;
  /** Update timestamp data */
  updateTimestamp: GqlTimestamp;
  /** Delete a timestamp */
  deleteTimestamp: GqlTimestamp;
  /** Will create, update, and delete timestamps as passed. Partial failures are completely rolled back */
  updateTimestamps: GqlUpdatedTimestamps;
  /**
   * Create a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  createTimestampType: GqlTimestampType;
  /**
   * Update a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  updateTimestampType: GqlTimestampType;
  /**
   * Delete a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteTimestampType: GqlTimestampType;
  /** Make changes to an existing template */
  createTemplate: GqlTemplate;
  /** Make changes to an existing template */
  updateTemplate: GqlTemplate;
  /**
   * Delete an existing template
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteTemplate: GqlTemplate;
  /** Add a timestamp to an existing template */
  addTimestampToTemplate: GqlTemplateTimestamp;
  /** Remove a timestamp from an existing template */
  removeTimestampFromTemplate: GqlTemplateTimestamp;
  /** Create a new API client for the authenticated user to use */
  createApiClient: GqlApiClient;
  /** Update one of the authenticated user's API clients */
  updateApiClient: GqlApiClient;
  /** Delete one of the authenticated user's API clients */
  deleteApiClient: GqlApiClient;
  addExternalLink: GqlExternalLink;
  removeExternalLink: GqlExternalLink;
  /** Report an issue with a single timestamp, episode, episode URL, or show. */
  createUserReport: GqlUserReport;
  /**
   * Mark a report as fixed
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this operation.
   */
  resolveUserReport: GqlUserReport;
};


type GqlMutationCreateAccountArgs = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
  recaptchaResponse: Scalars['String']['input'];
};


type GqlMutationChangePasswordArgs = {
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmNewPassword: Scalars['String']['input'];
};


type GqlMutationResendVerificationEmailArgs = {
  recaptchaResponse: Scalars['String']['input'];
};


type GqlMutationVerifyEmailAddressArgs = {
  validationToken: Scalars['String']['input'];
};


type GqlMutationRequestPasswordResetArgs = {
  recaptchaResponse: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


type GqlMutationResetPasswordArgs = {
  passwordResetToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmNewPassword: Scalars['String']['input'];
};


type GqlMutationSavePreferencesArgs = {
  preferences: GqlInputPreferences;
};


type GqlMutationCreateShowArgs = {
  showInput: GqlInputShow;
  becomeAdmin: Scalars['Boolean']['input'];
};


type GqlMutationUpdateShowArgs = {
  showId: Scalars['ID']['input'];
  newShow: GqlInputShow;
};


type GqlMutationDeleteShowArgs = {
  showId: Scalars['ID']['input'];
};


type GqlMutationCreateShowAdminArgs = {
  showAdminInput: GqlInputShowAdmin;
};


type GqlMutationDeleteShowAdminArgs = {
  showAdminId: Scalars['ID']['input'];
};


type GqlMutationCreateEpisodeArgs = {
  showId: Scalars['ID']['input'];
  episodeInput: GqlInputEpisode;
};


type GqlMutationUpdateEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
  newEpisode: GqlInputEpisode;
};


type GqlMutationDeleteEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
};


type GqlMutationCreateEpisodeUrlArgs = {
  episodeId: Scalars['ID']['input'];
  episodeUrlInput: GqlInputEpisodeUrl;
};


type GqlMutationDeleteEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
};


type GqlMutationUpdateEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
  newEpisodeUrl: GqlInputEpisodeUrl;
};


type GqlMutationCreateTimestampArgs = {
  episodeId: Scalars['ID']['input'];
  timestampInput: GqlInputTimestamp;
};


type GqlMutationUpdateTimestampArgs = {
  timestampId: Scalars['ID']['input'];
  newTimestamp: GqlInputTimestamp;
};


type GqlMutationDeleteTimestampArgs = {
  timestampId: Scalars['ID']['input'];
};


type GqlMutationUpdateTimestampsArgs = {
  create: Array<GqlInputTimestampOn>;
  update: Array<GqlInputExistingTimestamp>;
  delete: Array<Scalars['ID']['input']>;
};


type GqlMutationCreateTimestampTypeArgs = {
  timestampTypeInput: GqlInputTimestampType;
};


type GqlMutationUpdateTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
  newTimestampType: GqlInputTimestampType;
};


type GqlMutationDeleteTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
};


type GqlMutationCreateTemplateArgs = {
  newTemplate: GqlInputTemplate;
};


type GqlMutationUpdateTemplateArgs = {
  templateId: Scalars['ID']['input'];
  newTemplate: GqlInputTemplate;
};


type GqlMutationDeleteTemplateArgs = {
  templateId: Scalars['ID']['input'];
};


type GqlMutationAddTimestampToTemplateArgs = {
  templateTimestamp: GqlInputTemplateTimestamp;
};


type GqlMutationRemoveTimestampFromTemplateArgs = {
  templateTimestamp: GqlInputTemplateTimestamp;
};


type GqlMutationCreateApiClientArgs = {
  client: GqlCreateApiClient;
};


type GqlMutationUpdateApiClientArgs = {
  id: Scalars['String']['input'];
  changes: GqlApiClientChanges;
};


type GqlMutationDeleteApiClientArgs = {
  id: Scalars['String']['input'];
};


type GqlMutationAddExternalLinkArgs = {
  showId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};


type GqlMutationRemoveExternalLinkArgs = {
  showId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};


type GqlMutationCreateUserReportArgs = {
  report?: InputMaybe<GqlInputUserReport>;
};


type GqlMutationResolveUserReportArgs = {
  id: Scalars['ID']['input'];
  resolvedMessage?: InputMaybe<Scalars['String']['input']>;
};

type GqlQuery = {
  __typename?: 'Query';
  /** Get the logged in user's private account information */
  account: GqlAccount;
  /**
   * Use either the username or email and an md5 hash of the user's password to get an access and
   * refresh token
   */
  login: GqlLoginData;
  /** Use a refresh token get a new access and refresh token */
  loginRefresh: GqlLoginData;
  /** Find user with a matching `User.id` */
  findUser: GqlUser;
  /** Find user with a matching `User.username` */
  findUserByUsername: GqlUser;
  /** Find show with a matching `Show.id` */
  findShow: GqlShow;
  findShowsByExternalId: Array<GqlShow>;
  /**
   * Search for shows that include the `search` in the `Show.name`. Results are sorted by `Show.name`
   * as `ASC` or `DESC`
   */
  searchShows: Array<GqlShow>;
  /** Find show admin with a matching `ShowAdmin.id` */
  findShowAdmin: GqlShowAdmin;
  /** Get a list of admins for a given `Show.id` */
  findShowAdminsByShowId: Array<GqlShowAdmin>;
  /** Get a list of show admins for a given `User.id` */
  findShowAdminsByUserId: Array<GqlShowAdmin>;
  /**
   * Get a list of recently added episodes that have timestamps.
   *
   * > Since this is a rather intensive query, it is cached for 20 minutes before it will look for new
   * > episodes again
   */
  recentlyAddedEpisodes: Array<GqlEpisode>;
  /** Find episode with a matching `Episode.id` */
  findEpisode: GqlEpisode;
  /** Get a list of episodes for a given `Show.id` */
  findEpisodesByShowId: Array<GqlEpisode>;
  /**
   * Search for episodes that include the `search` in the `Episode.name`. Results are sorted by
   * `Show.name`as `ASC` or `DESC`
   *
   * Results can be limited to a single show by passing `showId`
   */
  searchEpisodes: Array<GqlEpisode>;
  /**
   * Get a list of third party episodes for a given `Episode.name`. Since this can return an array of
   * multiple items, always use `findEpisodeUrl` first, then fallback to this query.
   *
   * Current 3rd party timestamp providers include:
   * - [BetterVRV](http://tuckerchap.in/BetterVRV/)
   *
   * > See `ThirdPartyEpisode` for more information about how to create data based on this type
   */
  findEpisodeByName: Array<GqlThirdPartyEpisode>;
  /**
   * Find an episode based on a URL. This is the primary method used to lookup data for a known service
   * URL. See `findEpisodeByName` for looking up fallback data.
   */
  findEpisodeUrl: GqlEpisodeUrl;
  /** List all the `EpisodeUrl`s for a given `Episode.id` */
  findEpisodeUrlsByEpisodeId: Array<GqlEpisodeUrl>;
  /** Get timestamp info based on a `Timestamp.id` */
  findTimestamp: GqlTimestamp;
  /** Get all the timestamps for an episode */
  findTimestampsByEpisodeId: Array<GqlTimestamp>;
  /** Get timestamp type info based on a `TimestampType.id` */
  findTimestampType: GqlTimestampType;
  /** List all the `TimestampType`s. Items come back in a random order */
  allTimestampTypes: Array<GqlTimestampType>;
  /**
   * Get template info based on a `Template.id`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will get a not found error, same as if the template was not found.
   */
  findTemplate: GqlTemplate;
  /**
   * Get a list of templates based on the `Template.showId`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will receive an empty list.
   */
  findTemplatesByShowId: Array<GqlTemplate>;
  /**
   * Find the most relevant template based on a few search criteria. If multiple templates are found,
   * their priority is like so:
   *
   * 1. Matching `sourceEpisodeID`
   * 2. Matching show name (case sensitive) and season (case sensitive)
   * 3. Matching show name (case sensitive)
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will get a not found error, same as if the template was not found.
   */
  findTemplateByDetails: GqlTemplate;
  /** List or search through the authenticated user's API clients */
  myApiClients: Array<GqlApiClient>;
  /** Find an API Client that you created based on it's ID. This will not return other users' clients */
  findApiClient: GqlApiClient;
  counts?: Maybe<GqlTotalCounts>;
  /**
   * List all user reports.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReports: Array<GqlUserReport>;
  /**
   * Get a single user report, even if it's been resolved/deleted.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReport: GqlUserReport;
};


type GqlQueryLoginArgs = {
  usernameEmail: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
};


type GqlQueryLoginRefreshArgs = {
  refreshToken: Scalars['String']['input'];
};


type GqlQueryFindUserArgs = {
  userId: Scalars['ID']['input'];
};


type GqlQueryFindUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


type GqlQueryFindShowArgs = {
  showId: Scalars['ID']['input'];
};


type GqlQueryFindShowsByExternalIdArgs = {
  service: GqlExternalService;
  serviceId: Scalars['String']['input'];
};


type GqlQuerySearchShowsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


type GqlQueryFindShowAdminArgs = {
  showAdminId: Scalars['ID']['input'];
};


type GqlQueryFindShowAdminsByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


type GqlQueryFindShowAdminsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


type GqlQueryRecentlyAddedEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


type GqlQueryFindEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
};


type GqlQueryFindEpisodesByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


type GqlQuerySearchEpisodesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  showId?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


type GqlQueryFindEpisodeByNameArgs = {
  name: Scalars['String']['input'];
};


type GqlQueryFindEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
};


type GqlQueryFindEpisodeUrlsByEpisodeIdArgs = {
  episodeId: Scalars['ID']['input'];
};


type GqlQueryFindTimestampArgs = {
  timestampId: Scalars['ID']['input'];
};


type GqlQueryFindTimestampsByEpisodeIdArgs = {
  episodeId: Scalars['ID']['input'];
};


type GqlQueryFindTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
};


type GqlQueryFindTemplateArgs = {
  templateId: Scalars['ID']['input'];
};


type GqlQueryFindTemplatesByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


type GqlQueryFindTemplateByDetailsArgs = {
  episodeId?: InputMaybe<Scalars['ID']['input']>;
  showName?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['String']['input']>;
};


type GqlQueryMyApiClientsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


type GqlQueryFindApiClientArgs = {
  id: Scalars['String']['input'];
};


type GqlQueryFindUserReportsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


type GqlQueryFindUserReportArgs = {
  id: Scalars['ID']['input'];
};

/** When logging in with a password or refresh token, you can get new tokens and account info */
type GqlLoginData = {
  __typename?: 'LoginData';
  /** A JWT that should be used in the header of all requests: `Authorization: Bearer <authToken>` */
  authToken: Scalars['String']['output'];
  /** A JWT used for the `loginRefresh` query to get new `LoginData` */
  refreshToken: Scalars['String']['output'];
  /** The personal account information of the user that got authenticated */
  account: GqlAccount;
};

type GqlUpdatedTimestamps = {
  __typename?: 'UpdatedTimestamps';
  created: Array<GqlTimestamp>;
  updated: Array<GqlTimestamp>;
  deleted: Array<GqlTimestamp>;
};
