import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: string;
  UInt: string;
};

/** Account info that should only be accessible by the authorized user */
export type Account = {
  __typename?: 'Account';
  /**
   * The linking object that associates a user to the shows they are admins of.
   *
   * > This data is also accessible on the `User` model. It has been added here for convenience
   */
  adminOfShows: Array<ShowAdmin>;
  createdAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
  email: Scalars['String'];
  /** If the user's email is verified. Emails must be verified before the user can call a mutation */
  emailVerified: Scalars['Boolean'];
  id: Scalars['ID'];
  /** The user's preferences */
  preferences: Preferences;
  /** Url to an image that is the user's profile picture */
  profileUrl: Scalars['String'];
  /** The user's administrative role. Most users are `Role.USER` */
  role: Role;
  /** Unique string slug that is the easy to remember identifier */
  username: Scalars['String'];
};

export type ApiClient = {
  __typename?: 'ApiClient';
  appName: Scalars['String'];
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  id: Scalars['String'];
  rateLimitRpm?: Maybe<Scalars['UInt']>;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
  /** The user this client belongs to */
  user: User;
  /** The ID of the user this client belongs to */
  userId: Scalars['ID'];
};

export type ApiClientChanges = {
  appName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  /** Rate limits can only be changed by admins */
  rateLimitRpm?: InputMaybe<Scalars['UInt']>;
};

/**
 * The base model has all the fields you would expect a fully fleshed out item in the database would
 * have. It is used to track who create, updated, and deleted items
 */
export type BaseModel = {
  /** Time that the item was created at */
  createdAt: Scalars['Time'];
  /** The entire user that created the item */
  createdBy: User;
  /** The user's `id` that created the item */
  createdByUserId: Scalars['ID'];
  /** Time that the item was updated at. If this value is present, the item is considered deleted */
  deletedAt?: Maybe<Scalars['Time']>;
  /** The entire user that deleted the item */
  deletedBy?: Maybe<User>;
  /** The user's `id` that deleted the item */
  deletedByUserId?: Maybe<Scalars['ID']>;
  /** Unique, v4 UUID. When asked for an `id` of an object, use this field */
  id: Scalars['ID'];
  /** Time that the item was updated at */
  updatedAt: Scalars['Time'];
  /** The entire user that last updated the item */
  updatedBy: User;
  /** The user's `id` that last updated the item */
  updatedByUserId: Scalars['ID'];
};

/** Color theme the user prefers */
export enum ColorTheme {
  AnimeSkipBlue = 'ANIME_SKIP_BLUE',
  CrunchyrollOrange = 'CRUNCHYROLL_ORANGE',
  FunimationPurple = 'FUNIMATION_PURPLE',
  /** Change to match where you're watching */
  PerService = 'PER_SERVICE',
  VrvYellow = 'VRV_YELLOW'
}

export type CreateApiClient = {
  appName: Scalars['String'];
  description: Scalars['String'];
};

/**
 * Basic information about an episode, including season, numbers, a list of timestamps, and urls that
 * it can be watched at
 */
export type Episode = BaseModel & {
  __typename?: 'Episode';
  /**
   * The absolute episode number out of all the episodes of the show. Generally only regular episodes
   * should have this field
   */
  absoluteNumber?: Maybe<Scalars['String']>;
  /**
   * The duration of the episode's first url, which can be used to calculate a suggested offset for new
   * episode urls. Episodes at different URLs have different branding intros, and that difference can
   * be computed using: `EpisodeUrl.duration - Episode.baseDuration`
   * Generally, this works because each service has it's own branding at the beginning of the show, not
   * at the end of it
   */
  baseDuration?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** The episode's name */
  name?: Maybe<Scalars['String']>;
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
  number?: Maybe<Scalars['String']>;
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
  season?: Maybe<Scalars['String']>;
  /** The show that the episode belongs to */
  show: Show;
  /** The id of the show that the episode belongs to */
  showId: Scalars['ID'];
  /** If the episode is the source episode for a `Template`, this will resolve to that template */
  template?: Maybe<Template>;
  /**
   * The list of current timestamps.
   *
   * Timestamps are apart apart of the `Episode` instead of the `EpisodeUrl` so that they can be shared
   * between urls and not need duplicate data
   */
  timestamps: Array<Timestamp>;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
  /** The list of urls and services that the episode can be accessed from */
  urls: Array<EpisodeUrl>;
  /**
   * List the user reports for the episode. Requires the REVIEWER role.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to query this property.
   */
  userReports: Array<UserReport>;
};


/**
 * Basic information about an episode, including season, numbers, a list of timestamps, and urls that
 * it can be watched at
 */
export type EpisodeUserReportsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Which of the supported services the `EpisodeUrl` was created for. This is a simple enum that allows
 * for simple checks, but this data can also be pulled from the url in the case of UNKNOWN
 */
export enum EpisodeSource {
  /** Data is from <crunchyroll.com> and <beta.crunchyroll.com> */
  Crunchyroll = 'CRUNCHYROLL',
  /** Data is from <funimation.com> */
  Funimation = 'FUNIMATION',
  /** Data came from an external source */
  Unknown = 'UNKNOWN',
  /** Data is from <vrv.co> */
  Vrv = 'VRV'
}

/** Stores information about what where an episode can be watched from */
export type EpisodeUrl = {
  __typename?: 'EpisodeUrl';
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  /**
   * The length of the episode at this url. For more information on why this field exists, check out
   * the `Episode.baseDuration`. If an `Episode` does not have a duration, that `Episode` and this
   * `EpisodeUrl` should be given the same value, and the `EpisodeUrl.timestampsOffset` should be set to 0
   */
  duration?: Maybe<Scalars['Float']>;
  /** The `Episode` that this url belongs to */
  episode: Episode;
  /** The `Episode.id` that this url belongs to */
  episodeId: Scalars['ID'];
  /** What service this url points to. This is computed when the `EpisodeUrl` is created */
  source: EpisodeSource;
  /**
   * How much a episode's timestamps should be offset for this `EpisodeUrl`, since different services
   * have different branding animations, leading to offsets between services. This field can be edited
   * to whatever, but it should be suggested to be `EpisodeUrl.duration - Episode.baseDuration`.
   * It can be positive or negative.
   */
  timestampsOffset?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
  /**
   * The url that would take a user to watch the `episode`.
   *
   * This url should be stripped of all query params.
   */
  url: Scalars['String'];
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  service: Scalars['String'];
  serviceId?: Maybe<Scalars['String']>;
  show: Show;
  showId: Scalars['ID'];
  url: Scalars['String'];
};

/** Allowed services for show's external links */
export enum ExternalService {
  Anilist = 'ANILIST'
}

/** Data required to create a new `Episode`. See `Episode` for a description of each field */
export type InputEpisode = {
  /** See `Episode.absoluteNumber` */
  absoluteNumber?: InputMaybe<Scalars['String']>;
  /** See `Episode.baseDuration` */
  baseDuration: Scalars['Float'];
  /** See `Episode.name` */
  name?: InputMaybe<Scalars['String']>;
  /** See `Episode.number` */
  number?: InputMaybe<Scalars['String']>;
  /** See `Episode.season` */
  season?: InputMaybe<Scalars['String']>;
};

/** Data required to create a new `EpisodeUrl`. See `EpisodeUrl` for a description of each field */
export type InputEpisodeUrl = {
  duration?: InputMaybe<Scalars['Float']>;
  timestampsOffset?: InputMaybe<Scalars['Float']>;
  url: Scalars['String'];
};

export type InputExistingTimestamp = {
  /** The id of the timestamp you want to modify */
  id: Scalars['ID'];
  /** The new values for the timestamp */
  timestamp: InputTimestamp;
};

/**
 * Data used to update a user's `Preferences`. See `Preferences` for a description of each field. If a
 * field is not passed or passed as `null`, it will leave the value as is and skip updating it
 */
export type InputPreferences = {
  colorTheme?: InputMaybe<ColorTheme>;
  enableAutoPlay?: InputMaybe<Scalars['Boolean']>;
  enableAutoSkip?: InputMaybe<Scalars['Boolean']>;
  hideTimelineWhenMinimized?: InputMaybe<Scalars['Boolean']>;
  minimizeToolbarWhenEditing?: InputMaybe<Scalars['Boolean']>;
  skipBranding?: InputMaybe<Scalars['Boolean']>;
  skipCanon?: InputMaybe<Scalars['Boolean']>;
  skipCredits?: InputMaybe<Scalars['Boolean']>;
  skipFiller?: InputMaybe<Scalars['Boolean']>;
  skipIntros?: InputMaybe<Scalars['Boolean']>;
  skipMixedCredits?: InputMaybe<Scalars['Boolean']>;
  skipMixedIntros?: InputMaybe<Scalars['Boolean']>;
  skipNewCredits?: InputMaybe<Scalars['Boolean']>;
  skipNewIntros?: InputMaybe<Scalars['Boolean']>;
  skipPreview?: InputMaybe<Scalars['Boolean']>;
  skipRecaps?: InputMaybe<Scalars['Boolean']>;
  skipTitleCard?: InputMaybe<Scalars['Boolean']>;
  skipTransitions?: InputMaybe<Scalars['Boolean']>;
};

/** Data required to create a new `Show`. See `Show` for a description of each field */
export type InputShow = {
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  originalName?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** Data required to create a new `ShowAdmin`. See `ShowAdmin` for a description of each field */
export type InputShowAdmin = {
  showId: Scalars['ID'];
  userId: Scalars['ID'];
};

/** Data required to create a new template. See `Template` for a description of each field */
export type InputTemplate = {
  seasons?: InputMaybe<Array<Scalars['String']>>;
  showId: Scalars['ID'];
  sourceEpisodeId: Scalars['ID'];
  type: TemplateType;
};

/** Data required to modify the timestamps on a template */
export type InputTemplateTimestamp = {
  templateId: Scalars['ID'];
  timestampId: Scalars['ID'];
};

/** Data required to create a new `Timestamp`. See `Timestamp` for a description of each field */
export type InputTimestamp = {
  at: Scalars['Float'];
  source?: InputMaybe<TimestampSource>;
  typeId: Scalars['ID'];
};

export type InputTimestampOn = {
  /** The episode id the timestamp will be created on */
  episodeId: Scalars['ID'];
  /** The new values for the timestamp */
  timestamp: InputTimestamp;
};

/** Data required to create a new `TimestampType`. See `TimestampType` for a description of each field */
export type InputTimestampType = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type InputUserReport = {
  /** The ID of an episode if you're reporting an issue with a specific episode. */
  episodeId?: InputMaybe<Scalars['ID']>;
  /**
   * The URL of the epiosde URL if you're reporting an issue with a specific episode URL.
   *
   * This is different from `reportedFromUrl`, this is related to an EpisodeUrl model, not the url the report is coming from.
   */
  episodeUrl?: InputMaybe<Scalars['String']>;
  /** The content of the report stating what is wrong with the reported data. */
  message: Scalars['String'];
  /** The URL the user made the report from so the reviewer can easily navigate to it. */
  reportedFromUrl: Scalars['String'];
  /** The ID of an show if you're reporting an issue with a specific show. */
  showId?: InputMaybe<Scalars['ID']>;
  /** The ID of a timestamp if you're reporting an issue with a specific timestamp. */
  timestampId?: InputMaybe<Scalars['ID']>;
};

/** When logging in with a password or refresh token, you can get new tokens and account info */
export type LoginData = {
  __typename?: 'LoginData';
  /** The personal account information of the user that got authenticated */
  account: Account;
  /** A JWT that should be used in the header of all requests: `Authorization: Bearer <authToken>` */
  authToken: Scalars['String'];
  /** A JWT used for the `loginRefresh` query to get new `LoginData` */
  refreshToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExternalLink: ExternalLink;
  /** Add a timestamp to an existing template */
  addTimestampToTemplate: TemplateTimestamp;
  /**
   * Change a user's password by first confirming the old one. This is not a forgot password flow
   *
   * > Note the passwords aren't md5 hashes. The regular login will be moving to this as well eventually
   */
  changePassword: LoginData;
  /**
   * Create a user account. 3rd party applications will not have access to this function because of
   * `recaptchaResponse`. Redirect new users to create an account on <anime-skip.com>
   */
  createAccount: LoginData;
  /** Create a new API client for the authenticated user to use */
  createApiClient: ApiClient;
  /** Create an episode under a `Show` */
  createEpisode: Episode;
  /** Link an `Episode` to a service URL */
  createEpisodeUrl: EpisodeUrl;
  /** Create a show and optionally become an admin */
  createShow: Show;
  /**
   * Give admin privilege to a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  createShowAdmin: ShowAdmin;
  /** Make changes to an existing template */
  createTemplate: Template;
  /** Add a timestamp to an `Episode` */
  createTimestamp: Timestamp;
  /**
   * Create a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  createTimestampType: TimestampType;
  /** Report an issue with a single timestamp, episode, episode URL, or show. */
  createUserReport: UserReport;
  /** Handle a deleteToken from `deleteAccountRequest` and actually delete the user's account */
  deleteAccount: Account;
  /**
   * Request your account be deleted. The user will receive an email with a link to confirm deleting
   * their account
   */
  deleteAccountRequest: Account;
  /** Delete one of the authenticated user's API clients */
  deleteApiClient: ApiClient;
  /**
   * Delete an episode and all it's child data
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisode: Episode;
  /**
   * Unlink an `Episode` to from service URL
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisodeUrl: EpisodeUrl;
  /**
   * Delete a show and all it's children (episodes, episode urls, timestamps, admins, etc)
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteShow: Show;
  /**
   * Remove admin privileges from a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteShowAdmin: ShowAdmin;
  /**
   * Delete an existing template
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteTemplate: Template;
  /** Delete a timestamp */
  deleteTimestamp: Timestamp;
  /**
   * Delete a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteTimestampType: TimestampType;
  removeExternalLink: ExternalLink;
  /** Remove a timestamp from an existing template */
  removeTimestampFromTemplate: TemplateTimestamp;
  /**
   * The first step in the password reset process
   *
   * It sends an email containing a link to reset your password with. That link includes a token, the
   * `passwordResetToken`, that can be passed into the `resetPassword` mutation.
   *
   * > Because the `recaptchaResponse` is required, this can not be performed by 3rd parties
   */
  requestPasswordReset: Scalars['Boolean'];
  /** Resend the verification email for the account of the authenticated user */
  resendVerificationEmail?: Maybe<Scalars['Boolean']>;
  /**
   * The second step in the password reset process, coming after `requestPasswordReset`
   *
   * This step is pretty self explanatory, this is when the password is actually reset for a user
   */
  resetPassword: LoginData;
  /**
   * Mark a report as fixed
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this operation.
   */
  resolveUserReport: UserReport;
  /** Update user preferences */
  savePreferences: Preferences;
  /** Update one of the authenticated user's API clients */
  updateApiClient: ApiClient;
  /** Update episode info */
  updateEpisode: Episode;
  /** Update episode url info */
  updateEpisodeUrl: EpisodeUrl;
  /** Update show data */
  updateShow: Show;
  /** Make changes to an existing template */
  updateTemplate: Template;
  /** Update timestamp data */
  updateTimestamp: Timestamp;
  /**
   * Update a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  updateTimestampType: TimestampType;
  /** Will create, update, and delete timestamps as passed. Partial failures are completely rolled back */
  updateTimestamps: UpdatedTimestamps;
  /**
   * Callback to handle the verification token included in the email sent using
   * `resendVerificationEmail`
   */
  verifyEmailAddress: Account;
};


export type MutationAddExternalLinkArgs = {
  showId: Scalars['ID'];
  url: Scalars['String'];
};


export type MutationAddTimestampToTemplateArgs = {
  templateTimestamp: InputTemplateTimestamp;
};


export type MutationChangePasswordArgs = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  passwordHash: Scalars['String'];
  recaptchaResponse: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateApiClientArgs = {
  client: CreateApiClient;
};


export type MutationCreateEpisodeArgs = {
  episodeInput: InputEpisode;
  showId: Scalars['ID'];
};


export type MutationCreateEpisodeUrlArgs = {
  episodeId: Scalars['ID'];
  episodeUrlInput: InputEpisodeUrl;
};


export type MutationCreateShowArgs = {
  becomeAdmin: Scalars['Boolean'];
  showInput: InputShow;
};


export type MutationCreateShowAdminArgs = {
  showAdminInput: InputShowAdmin;
};


export type MutationCreateTemplateArgs = {
  newTemplate: InputTemplate;
};


export type MutationCreateTimestampArgs = {
  episodeId: Scalars['ID'];
  timestampInput: InputTimestamp;
};


export type MutationCreateTimestampTypeArgs = {
  timestampTypeInput: InputTimestampType;
};


export type MutationCreateUserReportArgs = {
  report?: InputMaybe<InputUserReport>;
};


export type MutationDeleteAccountArgs = {
  deleteToken: Scalars['String'];
};


export type MutationDeleteAccountRequestArgs = {
  passwordHash: Scalars['String'];
};


export type MutationDeleteApiClientArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEpisodeArgs = {
  episodeId: Scalars['ID'];
};


export type MutationDeleteEpisodeUrlArgs = {
  episodeUrl: Scalars['String'];
};


export type MutationDeleteShowArgs = {
  showId: Scalars['ID'];
};


export type MutationDeleteShowAdminArgs = {
  showAdminId: Scalars['ID'];
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['ID'];
};


export type MutationDeleteTimestampArgs = {
  timestampId: Scalars['ID'];
};


export type MutationDeleteTimestampTypeArgs = {
  timestampTypeId: Scalars['ID'];
};


export type MutationRemoveExternalLinkArgs = {
  showId: Scalars['ID'];
  url: Scalars['String'];
};


export type MutationRemoveTimestampFromTemplateArgs = {
  templateTimestamp: InputTemplateTimestamp;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
  recaptchaResponse: Scalars['String'];
};


export type MutationResendVerificationEmailArgs = {
  recaptchaResponse: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  passwordResetToken: Scalars['String'];
};


export type MutationResolveUserReportArgs = {
  id: Scalars['ID'];
  resolvedMessage?: InputMaybe<Scalars['String']>;
};


export type MutationSavePreferencesArgs = {
  preferences: InputPreferences;
};


export type MutationUpdateApiClientArgs = {
  changes: ApiClientChanges;
  id: Scalars['String'];
};


export type MutationUpdateEpisodeArgs = {
  episodeId: Scalars['ID'];
  newEpisode: InputEpisode;
};


export type MutationUpdateEpisodeUrlArgs = {
  episodeUrl: Scalars['String'];
  newEpisodeUrl: InputEpisodeUrl;
};


export type MutationUpdateShowArgs = {
  newShow: InputShow;
  showId: Scalars['ID'];
};


export type MutationUpdateTemplateArgs = {
  newTemplate: InputTemplate;
  templateId: Scalars['ID'];
};


export type MutationUpdateTimestampArgs = {
  newTimestamp: InputTimestamp;
  timestampId: Scalars['ID'];
};


export type MutationUpdateTimestampTypeArgs = {
  newTimestampType: InputTimestampType;
  timestampTypeId: Scalars['ID'];
};


export type MutationUpdateTimestampsArgs = {
  create: Array<InputTimestampOn>;
  delete: Array<Scalars['ID']>;
  update: Array<InputExistingTimestamp>;
};


export type MutationVerifyEmailAddressArgs = {
  validationToken: Scalars['String'];
};

/**
 * Where all the user preferences are stored. This includes what timestamps the user doesn't want to
 * watch
 */
export type Preferences = {
  __typename?: 'Preferences';
  colorTheme: ColorTheme;
  createdAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
  /** Whether or not the user wants to auto-play the videos. Default: `true` */
  enableAutoPlay: Scalars['Boolean'];
  /** Whether or not the user wants to automatically skip section. Default: `true` */
  enableAutoSkip: Scalars['Boolean'];
  /**
   * When false, timeline is pinned to the bottom of the screen after inactivity. When true, it is
   * hidden completely
   */
  hideTimelineWhenMinimized: Scalars['Boolean'];
  id: Scalars['ID'];
  /**
   * Whether or not the bottom toolbar with the video progress and play button is minimized after
   * inactivity while editing
   */
  minimizeToolbarWhenEditing: Scalars['Boolean'];
  /** Whether or not the user whats to skip branding timestamps. Default: `true` */
  skipBranding: Scalars['Boolean'];
  /** Whether or not the user whats to skip canon content. Default: `false` */
  skipCanon: Scalars['Boolean'];
  /** Whether or not the user whats to skip credits/outros. Default: `true` */
  skipCredits: Scalars['Boolean'];
  /** Whether or not the user whats to skip filler content. Default: `true` */
  skipFiller: Scalars['Boolean'];
  /** Whether or not the user whats to skip regular intros. Default: `true` */
  skipIntros: Scalars['Boolean'];
  /** Whether or not the user whats to skip credits/outros that have plot progression rather than the standard animation. Default: `false` */
  skipMixedCredits: Scalars['Boolean'];
  /** Whether or not the user whats to kip intros that have plot progression rather than the standard animation. Default: `false` */
  skipMixedIntros: Scalars['Boolean'];
  /** Whether or not the user whats to skip the first of a credits/outro. Default: `false` */
  skipNewCredits: Scalars['Boolean'];
  /** Whether or not the user whats to skip the first of an intro. Default: `false` */
  skipNewIntros: Scalars['Boolean'];
  /** Whether or not to skip the next episode's preview. Default: `true` */
  skipPreview: Scalars['Boolean'];
  /** Whether or not the user whats to skip recaps at the beginning of episodes. Default: `true` */
  skipRecaps: Scalars['Boolean'];
  /** Whether or not to skip an episode's static title card. Default: `true` */
  skipTitleCard: Scalars['Boolean'];
  /** Whether or not the user whats to skip commercial transitions. Default: `true` */
  skipTransitions: Scalars['Boolean'];
  updatedAt: Scalars['Time'];
  /** The `User` that the preferences belong to */
  user: User;
  /** The `User.id` that this preferences object belongs to */
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Get the logged in user's private account information */
  account: Account;
  /** List all the `TimestampType`s. Items come back in a random order */
  allTimestampTypes: Array<TimestampType>;
  counts?: Maybe<TotalCounts>;
  /** Find an API Client that you created based on it's ID. This will not return other users' clients */
  findApiClient: ApiClient;
  /** Find episode with a matching `Episode.id` */
  findEpisode: Episode;
  /**
   * Get a list of third party episodes for a given `Episode.name`. Since this can return an array of
   * multiple items, always use `findEpisodeUrl` first, then fallback to this query.
   *
   * Current 3rd party timestamp providers include:
   * - [BetterVRV](http://tuckerchap.in/BetterVRV/)
   *
   * > See `ThirdPartyEpisode` for more information about how to create data based on this type
   */
  findEpisodeByName: Array<ThirdPartyEpisode>;
  /**
   * Find an episode based on a URL. This is the primary method used to lookup data for a known service
   * URL. See `findEpisodeByName` for looking up fallback data.
   */
  findEpisodeUrl: EpisodeUrl;
  /** List all the `EpisodeUrl`s for a given `Episode.id` */
  findEpisodeUrlsByEpisodeId: Array<EpisodeUrl>;
  /** Get a list of episodes for a given `Show.id` */
  findEpisodesByShowId: Array<Episode>;
  /** Find show with a matching `Show.id` */
  findShow: Show;
  /** Find show admin with a matching `ShowAdmin.id` */
  findShowAdmin: ShowAdmin;
  /** Get a list of admins for a given `Show.id` */
  findShowAdminsByShowId: Array<ShowAdmin>;
  /** Get a list of show admins for a given `User.id` */
  findShowAdminsByUserId: Array<ShowAdmin>;
  findShowsByExternalId: Array<Show>;
  /**
   * Get template info based on a `Template.id`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will get a not found error, same as if the template was not found.
   */
  findTemplate: Template;
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
  findTemplateByDetails: Template;
  /**
   * Get a list of templates based on the `Template.showId`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will receive an empty list.
   */
  findTemplatesByShowId: Array<Template>;
  /** Get timestamp info based on a `Timestamp.id` */
  findTimestamp: Timestamp;
  /** Get timestamp type info based on a `TimestampType.id` */
  findTimestampType: TimestampType;
  /** Get all the timestamps for an episode */
  findTimestampsByEpisodeId: Array<Timestamp>;
  /** Find user with a matching `User.id` */
  findUser: User;
  /** Find user with a matching `User.username` */
  findUserByUsername: User;
  /**
   * Get a single user report, even if it's been resolved/deleted.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReport: UserReport;
  /**
   * List all user reports.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReports: Array<UserReport>;
  /**
   * Use either the username or email and an md5 hash of the user's password to get an access and
   * refresh token
   */
  login: LoginData;
  /** Use a refresh token get a new access and refresh token */
  loginRefresh: LoginData;
  /** List or search through the authenticated user's API clients */
  myApiClients: Array<ApiClient>;
  /**
   * Get a list of recently added episodes that have timestamps.
   *
   * > Since this is a rather intensive query, it is cached for 20 minutes before it will look for new
   * > episodes again
   */
  recentlyAddedEpisodes: Array<Episode>;
  /**
   * Search for episodes that include the `search` in the `Episode.name`. Results are sorted by
   * `Show.name`as `ASC` or `DESC`
   *
   * Results can be limited to a single show by passing `showId`
   */
  searchEpisodes: Array<Episode>;
  /**
   * Search for shows that include the `search` in the `Show.name`. Results are sorted by `Show.name`
   * as `ASC` or `DESC`
   */
  searchShows: Array<Show>;
};


export type QueryFindApiClientArgs = {
  id: Scalars['String'];
};


export type QueryFindEpisodeArgs = {
  episodeId: Scalars['ID'];
};


export type QueryFindEpisodeByNameArgs = {
  name: Scalars['String'];
};


export type QueryFindEpisodeUrlArgs = {
  episodeUrl: Scalars['String'];
};


export type QueryFindEpisodeUrlsByEpisodeIdArgs = {
  episodeId: Scalars['ID'];
};


export type QueryFindEpisodesByShowIdArgs = {
  showId: Scalars['ID'];
};


export type QueryFindShowArgs = {
  showId: Scalars['ID'];
};


export type QueryFindShowAdminArgs = {
  showAdminId: Scalars['ID'];
};


export type QueryFindShowAdminsByShowIdArgs = {
  showId: Scalars['ID'];
};


export type QueryFindShowAdminsByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryFindShowsByExternalIdArgs = {
  service: ExternalService;
  serviceId: Scalars['String'];
};


export type QueryFindTemplateArgs = {
  templateId: Scalars['ID'];
};


export type QueryFindTemplateByDetailsArgs = {
  episodeId?: InputMaybe<Scalars['ID']>;
  season?: InputMaybe<Scalars['String']>;
  showName?: InputMaybe<Scalars['String']>;
};


export type QueryFindTemplatesByShowIdArgs = {
  showId: Scalars['ID'];
};


export type QueryFindTimestampArgs = {
  timestampId: Scalars['ID'];
};


export type QueryFindTimestampTypeArgs = {
  timestampTypeId: Scalars['ID'];
};


export type QueryFindTimestampsByEpisodeIdArgs = {
  episodeId: Scalars['ID'];
};


export type QueryFindUserArgs = {
  userId: Scalars['ID'];
};


export type QueryFindUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryFindUserReportArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserReportsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  resolved?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  passwordHash: Scalars['String'];
  usernameEmail: Scalars['String'];
};


export type QueryLoginRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type QueryMyApiClientsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryRecentlyAddedEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  showId?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QuerySearchShowsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};

/**
 * A user's role in the system. Higher roles allow a user write access to certain data that a normal
 * user would not. Some queries and mutations are only allowed by certain roles
 */
export enum Role {
  /** Administrator role. Has some elevated permissions */
  Admin = 'ADMIN',
  /** Highest role. Has super user access to all queries and mutations */
  Dev = 'DEV',
  /** Reviewer role. Lets the user review issues with timestamps */
  Reviewer = 'REVIEWER',
  /** Basic role. Has no elevated permissions */
  User = 'USER'
}

/** A show containing a list of episodes and relevant links */
export type Show = BaseModel & {
  __typename?: 'Show';
  /** The list of admins for the show */
  admins: Array<ShowAdmin>;
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  /** How many episodes are apart of this show */
  episodeCount: Scalars['Int'];
  /** All the episodes that belong to the show */
  episodes: Array<Episode>;
  /** Any links to external sites (just Anilist right now) for the show */
  externalLinks: Array<ExternalLink>;
  id: Scalars['ID'];
  /** A link to a show poster */
  image?: Maybe<Scalars['String']>;
  /**
   * The show name
   *
   * ### Examples
   *
   * - "Death Note"
   * - "My Hero Academia"
   */
  name: Scalars['String'];
  /**
   * The show's original Japanese name
   *
   * ### Examples
   *
   * - "Desu Nōto"
   * - "Boku no Hīrō Akademia"
   */
  originalName?: Maybe<Scalars['String']>;
  /** How many seasons are associated with this show */
  seasonCount: Scalars['Int'];
  /** All the templates that belong to this show */
  templates: Array<Template>;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
  /** A link to the anime's official website */
  website?: Maybe<Scalars['String']>;
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
export type ShowAdmin = BaseModel & {
  __typename?: 'ShowAdmin';
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** The `Show` that the admin has elevated privileges for */
  show: Show;
  /** The `Show.id` that the admin has elevated privileges for */
  showId: Scalars['ID'];
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
  /** The `User` that the admin privileges belong to */
  user: User;
  /** The `User.id` that the admin privileges belong to */
  userId: Scalars['ID'];
};

/** When no timestamps exist for a specific episode, templates are setup to provide fallback timestamps */
export type Template = BaseModel & {
  __typename?: 'Template';
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** When the template is for a set of seasons, this is the set of seasons it is applied to */
  seasons?: Maybe<Array<Scalars['String']>>;
  /** The show that this template is for */
  show: Show;
  /** The id of the show that this template is for */
  showId: Scalars['ID'];
  /** The episode used to create the template. All the timestamps are from this episode */
  sourceEpisode: Episode;
  /** The id of the episode used to create the template. All the timestamps are from this episode */
  sourceEpisodeId: Scalars['ID'];
  /**
   * The list of timestamp ids that are apart of this template. Since this is a many-to-many
   * relationship, this field will resolve quicker than `timestamps` since it doesn't have to do an
   * extra join
   *
   * This is useful when you already got the episode and timestamps, and you just need to know what
   * timestamps are apart of the template
   */
  timestampIds: Array<Scalars['ID']>;
  /** The list of timestamps that are apart of this template */
  timestamps: Array<Timestamp>;
  /** Specify the scope of the template, if it's for the entire show, or just for a set of seasons */
  type: TemplateType;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
};

/** The many to many object that links a timestamp to a template */
export type TemplateTimestamp = {
  __typename?: 'TemplateTimestamp';
  template: Template;
  templateId: Scalars['ID'];
  timestamp: Timestamp;
  timestampId: Scalars['ID'];
};

/** The scope that a template applies to */
export enum TemplateType {
  /** The template is loaded for episodes of a given show where their season is included in `Template.seasons` */
  Seasons = 'SEASONS',
  /** The template is loaded for all episodes of a given show */
  Show = 'SHOW'
}

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
export type ThirdPartyEpisode = {
  __typename?: 'ThirdPartyEpisode';
  absoluteNumber?: Maybe<Scalars['String']>;
  baseDuration?: Maybe<Scalars['Float']>;
  /** The Anime Skip `Episode.id` when the `source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['String']>;
  show: ThirdPartyShow;
  /** The id of the show from the third party */
  showId: Scalars['String'];
  source?: Maybe<TimestampSource>;
  timestamps: Array<ThirdPartyTimestamp>;
};

export type ThirdPartyShow = {
  __typename?: 'ThirdPartyShow';
  createdAt?: Maybe<Scalars['Time']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['Time']>;
};

export type ThirdPartyTimestamp = {
  __typename?: 'ThirdPartyTimestamp';
  /** The actual time the timestamp is at */
  at: Scalars['Float'];
  /** The Anime Skip `Timestamp.id` when the `Episode.source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']>;
  type: TimestampType;
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID'];
};

export type Timestamp = BaseModel & {
  __typename?: 'Timestamp';
  /** The actual time the timestamp is at */
  at: Scalars['Float'];
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  /** The `Episode` that the timestamp belongs to */
  episode: Episode;
  /** The `Episode.id` that the timestamp belongs to */
  episodeId: Scalars['ID'];
  id: Scalars['ID'];
  source: TimestampSource;
  /**
   * The type the timestamp is. This field is a constant string so including it has no effect on
   * performance or query complexity.
   */
  type: TimestampType;
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID'];
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
};

/** Where a timestamp originated from */
export enum TimestampSource {
  AnimeSkip = 'ANIME_SKIP',
  BetterVrv = 'BETTER_VRV'
}

/**
 * The type a timestamp can be. This table rarely changes so the values fetched can either be hard
 * coded or fetch occasionally. Anime Skip website and web extension use hardcoded maps to store this
 * data, but a third party might want to fetch and cache this instead since you won't know when Anime
 * Skip adds timestamps
 */
export type TimestampType = BaseModel & {
  __typename?: 'TimestampType';
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  /** The description for what this type represents */
  description: Scalars['String'];
  id: Scalars['ID'];
  /** The name of the timestamp type */
  name: Scalars['String'];
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
};

export type TotalCounts = {
  __typename?: 'TotalCounts';
  episodeUrls: Scalars['Int'];
  episodes: Scalars['Int'];
  shows: Scalars['Int'];
  templates: Scalars['Int'];
  timestampTypes: Scalars['Int'];
  timestamps: Scalars['Int'];
  users: Scalars['Int'];
};

export type UpdatedTimestamps = {
  __typename?: 'UpdatedTimestamps';
  created: Array<Timestamp>;
  deleted: Array<Timestamp>;
  updated: Array<Timestamp>;
};

/** Information about a user that is public. See `Account` for a description of each field */
export type User = {
  __typename?: 'User';
  adminOfShows: Array<ShowAdmin>;
  createdAt: Scalars['Time'];
  deletedAt?: Maybe<Scalars['Time']>;
  id: Scalars['ID'];
  profileUrl: Scalars['String'];
  username: Scalars['String'];
};

export type UserReport = BaseModel & {
  __typename?: 'UserReport';
  createdAt: Scalars['Time'];
  createdBy: User;
  createdByUserId: Scalars['ID'];
  deletedAt?: Maybe<Scalars['Time']>;
  deletedBy?: Maybe<User>;
  deletedByUserId?: Maybe<Scalars['ID']>;
  episode?: Maybe<Episode>;
  episodeId?: Maybe<Scalars['ID']>;
  episodeUrl?: Maybe<EpisodeUrl>;
  episodeUrlString?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  message: Scalars['String'];
  reportedFromUrl: Scalars['String'];
  resolved: Scalars['Boolean'];
  resolvedMessage?: Maybe<Scalars['String']>;
  show?: Maybe<Show>;
  showId?: Maybe<Scalars['ID']>;
  timestamp?: Maybe<Timestamp>;
  timestampId?: Maybe<Scalars['ID']>;
  updatedAt: Scalars['Time'];
  updatedBy: User;
  updatedByUserId: Scalars['ID'];
};

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } };

export type AllTimestampTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTimestampTypesQuery = { __typename?: 'Query', allTimestampTypes: Array<{ __typename?: 'TimestampType', id: string, name: string, description: string }> };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmNewPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } } };

export type CountsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountsQuery = { __typename?: 'Query', counts?: { __typename?: 'TotalCounts', episodes: number, timestamps: number, shows: number } | null };

export type HomeCountsFragment = { __typename?: 'TotalCounts', episodes: number, timestamps: number, shows: number };

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  passwordHash: Scalars['String'];
  recaptchaResponse: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } } };

export type CreateApiClientMutationVariables = Exact<{
  client: CreateApiClient;
}>;


export type CreateApiClientMutation = { __typename?: 'Mutation', createApiClient: { __typename?: 'ApiClient', id: string, createdAt: string, updatedAt: string, appName: string, description: string, rateLimitRpm?: string | null } };

export type DeleteApiClientMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteApiClientMutation = { __typename?: 'Mutation', deleteApiClient: { __typename?: 'ApiClient', id: string, createdAt: string, updatedAt: string, appName: string, description: string, rateLimitRpm?: string | null } };

export type FindUserReportQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FindUserReportQuery = { __typename?: 'Query', findUserReport: { __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, resolvedMessage?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, timestamp?: { __typename?: 'Timestamp', id: string, type: { __typename?: 'TimestampType', id: string, name: string, description: string } } | null, episode?: { __typename?: 'Episode', id: string, name?: string | null, userReports: Array<{ __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, timestampId?: string | null, episodeId?: string | null, episodeUrlString?: string | null, showId?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string } }> } | null, episodeUrl?: { __typename?: 'EpisodeUrl', url: string, episode: { __typename?: 'Episode', id: string, name?: string | null } } | null, show?: { __typename?: 'Show', id: string, name: string } | null } };

export type ReviewableUserReportFragment = { __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, resolvedMessage?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, timestamp?: { __typename?: 'Timestamp', id: string, type: { __typename?: 'TimestampType', id: string, name: string, description: string } } | null, episode?: { __typename?: 'Episode', id: string, name?: string | null, userReports: Array<{ __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, timestampId?: string | null, episodeId?: string | null, episodeUrlString?: string | null, showId?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string } }> } | null, episodeUrl?: { __typename?: 'EpisodeUrl', url: string, episode: { __typename?: 'Episode', id: string, name?: string | null } } | null, show?: { __typename?: 'Show', id: string, name: string } | null };

export type FindUserReportsQueryVariables = Exact<{
  resolved?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type FindUserReportsQuery = { __typename?: 'Query', findUserReports: Array<{ __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, timestampId?: string | null, episodeId?: string | null, episodeUrlString?: string | null, showId?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string } }> };

export type UserReportListItemFragment = { __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, timestampId?: string | null, episodeId?: string | null, episodeUrlString?: string | null, showId?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string } };

export type OtherUserFragment = { __typename?: 'User', id: string, username: string, profileUrl: string };

export type LoginQueryVariables = Exact<{
  usernameEmail: Scalars['String'];
  passwordHash: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } } };

export type LoggedInAccountFragment = { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role };

export type AuthDetailsFragment = { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } };

export type MyApiClientsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type MyApiClientsQuery = { __typename?: 'Query', myApiClients: Array<{ __typename?: 'ApiClient', id: string, createdAt: string, updatedAt: string, appName: string, description: string, rateLimitRpm?: string | null }> };

export type ManagedApiClientFragment = { __typename?: 'ApiClient', id: string, createdAt: string, updatedAt: string, appName: string, description: string, rateLimitRpm?: string | null };

export type RecentlyAddedEpisodesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type RecentlyAddedEpisodesQuery = { __typename?: 'Query', recentlyAddedEpisodes: Array<{ __typename?: 'Episode', id: string, name?: string | null, season?: string | null, number?: string | null, absoluteNumber?: string | null, createdAt: string, show: { __typename?: 'Show', name: string } }> };

export type RecentEpisodeFragment = { __typename?: 'Episode', id: string, name?: string | null, season?: string | null, number?: string | null, absoluteNumber?: string | null, createdAt: string, show: { __typename?: 'Show', name: string } };

export type LoginRefreshQueryVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type LoginRefreshQuery = { __typename?: 'Query', loginRefresh: { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
  recaptchaResponse: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResendVerificationEmailMutationVariables = Exact<{
  recaptchaResponse: Scalars['String'];
}>;


export type ResendVerificationEmailMutation = { __typename?: 'Mutation', resendVerificationEmail?: boolean | null };

export type ResetPasswordMutationVariables = Exact<{
  passwordResetToken: Scalars['String'];
  newPassword: Scalars['String'];
  confirmNewPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'LoginData', authToken: string, refreshToken: string, account: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } } };

export type ResolveUserReportMutationVariables = Exact<{
  id: Scalars['ID'];
  resolvedMessage: Scalars['String'];
}>;


export type ResolveUserReportMutation = { __typename?: 'Mutation', resolveUserReport: { __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, resolvedMessage?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, timestamp?: { __typename?: 'Timestamp', id: string, type: { __typename?: 'TimestampType', id: string, name: string, description: string } } | null, episode?: { __typename?: 'Episode', id: string, name?: string | null, userReports: Array<{ __typename?: 'UserReport', id: string, createdAt: string, updatedAt: string, reportedFromUrl: string, message: string, resolved: boolean, timestampId?: string | null, episodeId?: string | null, episodeUrlString?: string | null, showId?: string | null, createdBy: { __typename?: 'User', id: string, username: string, profileUrl: string }, updatedBy: { __typename?: 'User', id: string, username: string, profileUrl: string } }> } | null, episodeUrl?: { __typename?: 'EpisodeUrl', url: string, episode: { __typename?: 'Episode', id: string, name?: string | null } } | null, show?: { __typename?: 'Show', id: string, name: string } | null } };

export type SearchEpisodesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type SearchEpisodesQuery = { __typename?: 'Query', searchEpisodes: Array<{ __typename?: 'Episode', id: string, name?: string | null, number?: string | null, absoluteNumber?: string | null, season?: string | null, show: { __typename?: 'Show', id: string, name: string }, timestamps: Array<{ __typename?: 'Timestamp', id: string, at: number, type: { __typename?: 'TimestampType', id: string, name: string } }> }> };

export type EpisodeSearchResultFragment = { __typename?: 'Episode', id: string, name?: string | null, number?: string | null, absoluteNumber?: string | null, season?: string | null, show: { __typename?: 'Show', id: string, name: string }, timestamps: Array<{ __typename?: 'Timestamp', id: string, at: number, type: { __typename?: 'TimestampType', id: string, name: string } }> };

export type SearchShowsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type SearchShowsQuery = { __typename?: 'Query', searchShows: Array<{ __typename?: 'Show', id: string, name: string, episodeCount: number, seasonCount: number, image?: string | null }> };

export type ShowSearchResultFragment = { __typename?: 'Show', id: string, name: string, episodeCount: number, seasonCount: number, image?: string | null };

export type UpdateApiClientMutationVariables = Exact<{
  id: Scalars['String'];
  changes: ApiClientChanges;
}>;


export type UpdateApiClientMutation = { __typename?: 'Mutation', updateApiClient: { __typename?: 'ApiClient', id: string, createdAt: string, updatedAt: string, appName: string, description: string, rateLimitRpm?: string | null } };

export type VerifyEmailAddressMutationVariables = Exact<{
  validationToken: Scalars['String'];
}>;


export type VerifyEmailAddressMutation = { __typename?: 'Mutation', verifyEmailAddress: { __typename?: 'Account', id: string, username: string, email: string, emailVerified: boolean, profileUrl: string, role: Role } };

export const HomeCountsFragmentDoc = gql`
    fragment HomeCounts on TotalCounts {
  episodes
  timestamps
  shows
}
    `;
export const OtherUserFragmentDoc = gql`
    fragment OtherUser on User {
  id
  username
  profileUrl
}
    `;
export const UserReportListItemFragmentDoc = gql`
    fragment UserReportListItem on UserReport {
  id
  createdAt
  createdBy {
    ...OtherUser
  }
  updatedAt
  updatedBy {
    ...OtherUser
  }
  reportedFromUrl
  message
  resolved
  timestampId
  episodeId
  episodeUrlString
  showId
}
    ${OtherUserFragmentDoc}`;
export const ReviewableUserReportFragmentDoc = gql`
    fragment ReviewableUserReport on UserReport {
  id
  createdAt
  createdBy {
    ...OtherUser
  }
  updatedAt
  updatedBy {
    ...OtherUser
  }
  reportedFromUrl
  message
  resolved
  resolvedMessage
  timestamp {
    id
    type {
      id
      name
      description
    }
  }
  episode {
    id
    name
    userReports(resolved: false) {
      ...UserReportListItem
    }
  }
  episodeUrl {
    url
    episode {
      id
      name
    }
  }
  show {
    id
    name
  }
}
    ${OtherUserFragmentDoc}
${UserReportListItemFragmentDoc}`;
export const LoggedInAccountFragmentDoc = gql`
    fragment LoggedInAccount on Account {
  id
  username
  email
  emailVerified
  profileUrl
  role
}
    `;
export const AuthDetailsFragmentDoc = gql`
    fragment AuthDetails on LoginData {
  authToken
  refreshToken
  account {
    ...LoggedInAccount
  }
}
    ${LoggedInAccountFragmentDoc}`;
export const ManagedApiClientFragmentDoc = gql`
    fragment ManagedApiClient on ApiClient {
  id
  createdAt
  updatedAt
  appName
  description
  rateLimitRpm
}
    `;
export const RecentEpisodeFragmentDoc = gql`
    fragment RecentEpisode on Episode {
  id
  name
  season
  number
  absoluteNumber
  createdAt
  show {
    name
  }
}
    `;
export const EpisodeSearchResultFragmentDoc = gql`
    fragment EpisodeSearchResult on Episode {
  id
  name
  number
  absoluteNumber
  season
  show {
    id
    name
  }
  timestamps {
    id
    at
    type {
      id
      name
    }
  }
}
    `;
export const ShowSearchResultFragmentDoc = gql`
    fragment ShowSearchResult on Show {
  id
  name
  episodeCount
  seasonCount
  image
}
    `;
export const AccountDocument = gql`
    query account {
  account {
    ...LoggedInAccount
  }
}
    ${LoggedInAccountFragmentDoc}`;
export const AllTimestampTypesDocument = gql`
    query allTimestampTypes {
  allTimestampTypes {
    id
    name
    description
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!, $confirmNewPassword: String!) {
  changePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
    confirmNewPassword: $confirmNewPassword
  ) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;
export const CountsDocument = gql`
    query counts {
  counts {
    ...HomeCounts
  }
}
    ${HomeCountsFragmentDoc}`;
export const CreateAccountDocument = gql`
    mutation createAccount($username: String!, $email: String!, $passwordHash: String!, $recaptchaResponse: String!) {
  createAccount(
    username: $username
    email: $email
    passwordHash: $passwordHash
    recaptchaResponse: $recaptchaResponse
  ) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;
export const CreateApiClientDocument = gql`
    mutation createApiClient($client: CreateApiClient!) {
  createApiClient(client: $client) {
    ...ManagedApiClient
  }
}
    ${ManagedApiClientFragmentDoc}`;
export const DeleteApiClientDocument = gql`
    mutation deleteApiClient($id: String!) {
  deleteApiClient(id: $id) {
    ...ManagedApiClient
  }
}
    ${ManagedApiClientFragmentDoc}`;
export const FindUserReportDocument = gql`
    query findUserReport($id: ID!) {
  findUserReport(id: $id) {
    ...ReviewableUserReport
  }
}
    ${ReviewableUserReportFragmentDoc}`;
export const FindUserReportsDocument = gql`
    query findUserReports($resolved: Boolean, $offset: Int, $limit: Int, $sort: String) {
  findUserReports(
    resolved: $resolved
    offset: $offset
    limit: $limit
    sort: $sort
  ) {
    ...UserReportListItem
  }
}
    ${UserReportListItemFragmentDoc}`;
export const LoginDocument = gql`
    query login($usernameEmail: String!, $passwordHash: String!) {
  login(usernameEmail: $usernameEmail, passwordHash: $passwordHash) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;
export const MyApiClientsDocument = gql`
    query myApiClients($search: String, $offset: Int, $limit: Int, $sort: String) {
  myApiClients(search: $search, offset: $offset, limit: $limit, sort: $sort) {
    ...ManagedApiClient
  }
}
    ${ManagedApiClientFragmentDoc}`;
export const RecentlyAddedEpisodesDocument = gql`
    query recentlyAddedEpisodes($limit: Int) {
  recentlyAddedEpisodes(limit: $limit) {
    ...RecentEpisode
  }
}
    ${RecentEpisodeFragmentDoc}`;
export const LoginRefreshDocument = gql`
    query loginRefresh($refreshToken: String!) {
  loginRefresh(refreshToken: $refreshToken) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!, $recaptchaResponse: String!) {
  requestPasswordReset(email: $email, recaptchaResponse: $recaptchaResponse)
}
    `;
export const ResendVerificationEmailDocument = gql`
    mutation resendVerificationEmail($recaptchaResponse: String!) {
  resendVerificationEmail(recaptchaResponse: $recaptchaResponse)
}
    `;
export const ResetPasswordDocument = gql`
    mutation resetPassword($passwordResetToken: String!, $newPassword: String!, $confirmNewPassword: String!) {
  resetPassword(
    passwordResetToken: $passwordResetToken
    newPassword: $newPassword
    confirmNewPassword: $confirmNewPassword
  ) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;
export const ResolveUserReportDocument = gql`
    mutation resolveUserReport($id: ID!, $resolvedMessage: String!) {
  resolveUserReport(id: $id, resolvedMessage: $resolvedMessage) {
    ...ReviewableUserReport
  }
}
    ${ReviewableUserReportFragmentDoc}`;
export const SearchEpisodesDocument = gql`
    query searchEpisodes($search: String, $limit: Int, $offset: Int, $sort: String) {
  searchEpisodes(search: $search, limit: $limit, offset: $offset, sort: $sort) {
    ...EpisodeSearchResult
  }
}
    ${EpisodeSearchResultFragmentDoc}`;
export const SearchShowsDocument = gql`
    query searchShows($search: String, $limit: Int, $offset: Int, $sort: String) {
  searchShows(search: $search, limit: $limit, offset: $offset, sort: $sort) {
    ...ShowSearchResult
  }
}
    ${ShowSearchResultFragmentDoc}`;
export const UpdateApiClientDocument = gql`
    mutation updateApiClient($id: String!, $changes: ApiClientChanges!) {
  updateApiClient(id: $id, changes: $changes) {
    ...ManagedApiClient
  }
}
    ${ManagedApiClientFragmentDoc}`;
export const VerifyEmailAddressDocument = gql`
    mutation verifyEmailAddress($validationToken: String!) {
  verifyEmailAddress(validationToken: $validationToken) {
    ...LoggedInAccount
  }
}
    ${LoggedInAccountFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    account(variables?: AccountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AccountQuery>(AccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'account', 'query');
    },
    allTimestampTypes(variables?: AllTimestampTypesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllTimestampTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllTimestampTypesQuery>(AllTimestampTypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allTimestampTypes', 'query');
    },
    changePassword(variables: ChangePasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChangePasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangePasswordMutation>(ChangePasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'changePassword', 'mutation');
    },
    counts(variables?: CountsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CountsQuery>(CountsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'counts', 'query');
    },
    createAccount(variables: CreateAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAccountMutation>(CreateAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAccount', 'mutation');
    },
    createApiClient(variables: CreateApiClientMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateApiClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateApiClientMutation>(CreateApiClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createApiClient', 'mutation');
    },
    deleteApiClient(variables: DeleteApiClientMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteApiClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteApiClientMutation>(DeleteApiClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteApiClient', 'mutation');
    },
    findUserReport(variables: FindUserReportQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindUserReportQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindUserReportQuery>(FindUserReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findUserReport', 'query');
    },
    findUserReports(variables?: FindUserReportsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindUserReportsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindUserReportsQuery>(FindUserReportsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findUserReports', 'query');
    },
    login(variables: LoginQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginQuery>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'query');
    },
    myApiClients(variables?: MyApiClientsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MyApiClientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MyApiClientsQuery>(MyApiClientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'myApiClients', 'query');
    },
    recentlyAddedEpisodes(variables?: RecentlyAddedEpisodesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecentlyAddedEpisodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecentlyAddedEpisodesQuery>(RecentlyAddedEpisodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'recentlyAddedEpisodes', 'query');
    },
    loginRefresh(variables: LoginRefreshQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginRefreshQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginRefreshQuery>(LoginRefreshDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginRefresh', 'query');
    },
    requestPasswordReset(variables: RequestPasswordResetMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RequestPasswordResetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestPasswordResetMutation>(RequestPasswordResetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'requestPasswordReset', 'mutation');
    },
    resendVerificationEmail(variables: ResendVerificationEmailMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResendVerificationEmailMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResendVerificationEmailMutation>(ResendVerificationEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resendVerificationEmail', 'mutation');
    },
    resetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPassword', 'mutation');
    },
    resolveUserReport(variables: ResolveUserReportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResolveUserReportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResolveUserReportMutation>(ResolveUserReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resolveUserReport', 'mutation');
    },
    searchEpisodes(variables?: SearchEpisodesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchEpisodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchEpisodesQuery>(SearchEpisodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchEpisodes', 'query');
    },
    searchShows(variables?: SearchShowsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchShowsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchShowsQuery>(SearchShowsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchShows', 'query');
    },
    updateApiClient(variables: UpdateApiClientMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateApiClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateApiClientMutation>(UpdateApiClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateApiClient', 'mutation');
    },
    verifyEmailAddress(variables: VerifyEmailAddressMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyEmailAddressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyEmailAddressMutation>(VerifyEmailAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyEmailAddress', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;