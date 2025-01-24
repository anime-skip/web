import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

/**
 * A user's role in the system. Higher roles allow a user write access to certain data that a normal
 * user would not. Some queries and mutations are only allowed by certain roles
 */
export enum Role {
  /** Highest role. Has super user access to all queries and mutations */
  Dev = 'DEV',
  /** Administrator role. Has some elevated permissions */
  Admin = 'ADMIN',
  /** Reviewer role. Lets the user review issues with timestamps */
  Reviewer = 'REVIEWER',
  /** Basic role. Has no elevated permissions */
  User = 'USER'
}

/**
 * Which of the supported services the `EpisodeUrl` was created for. This is a simple enum that allows
 * for simple checks, but this data can also be pulled from the url in the case of UNKNOWN
 */
export enum EpisodeSource {
  /** Data came from an external source */
  Unknown = 'UNKNOWN',
  /** Data is from <vrv.co> */
  Vrv = 'VRV',
  /** Data is from <funimation.com> */
  Funimation = 'FUNIMATION',
  /** Data is from <crunchyroll.com> and <beta.crunchyroll.com> */
  Crunchyroll = 'CRUNCHYROLL'
}

/** Where a timestamp originated from */
export enum TimestampSource {
  AnimeSkip = 'ANIME_SKIP',
  BetterVrv = 'BETTER_VRV'
}

/** The scope that a template applies to */
export enum TemplateType {
  /** The template is loaded for all episodes of a given show */
  Show = 'SHOW',
  /** The template is loaded for episodes of a given show where their season is included in `Template.seasons` */
  Seasons = 'SEASONS'
}

/** Color theme the user prefers */
export enum ColorTheme {
  /** Change to match where you're watching */
  PerService = 'PER_SERVICE',
  AnimeSkipBlue = 'ANIME_SKIP_BLUE',
  VrvYellow = 'VRV_YELLOW',
  FunimationPurple = 'FUNIMATION_PURPLE',
  CrunchyrollOrange = 'CRUNCHYROLL_ORANGE'
}

/** Allowed services for show's external links */
export enum ExternalService {
  Anilist = 'ANILIST'
}

/** When logging in with a password or refresh token, you can get new tokens and account info */
export type LoginData = {
  __typename?: 'LoginData';
  /** A JWT that should be used in the header of all requests: `Authorization: Bearer <authToken>` */
  authToken: Scalars['String']['output'];
  /** A JWT used for the `loginRefresh` query to get new `LoginData` */
  refreshToken: Scalars['String']['output'];
  /** The personal account information of the user that got authenticated */
  account: Account;
};

export type UpdatedTimestamps = {
  __typename?: 'UpdatedTimestamps';
  created: Array<Timestamp>;
  updated: Array<Timestamp>;
  deleted: Array<Timestamp>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Create a user account. 3rd party applications will not have access to this function because of
   * `recaptchaResponse`. Redirect new users to create an account on <anime-skip.com>
   */
  createAccount: LoginData;
  /**
   * Change a user's password by first confirming the old one. This is not a forgot password flow
   *
   * > Note the passwords aren't md5 hashes. The regular login will be moving to this as well eventually
   */
  changePassword: LoginData;
  /** Resend the verification email for the account of the authenticated user */
  resendVerificationEmail?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Callback to handle the verification token included in the email sent using
   * `resendVerificationEmail`
   */
  verifyEmailAddress: Account;
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
  resetPassword: LoginData;
  /**
   * Request your account be deleted. The user will receive an email with a link to confirm deleting
   * their account
   */
  deleteAccountRequest: Account;
  /** Handle a deleteToken from `deleteAccountRequest` and actually delete the user's account */
  deleteAccount: Account;
  /** Update user preferences */
  savePreferences: Preferences;
  /** Create a show and optionally become an admin */
  createShow: Show;
  /** Update show data */
  updateShow: Show;
  /**
   * Delete a show and all it's children (episodes, episode urls, timestamps, admins, etc)
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteShow: Show;
  /**
   * Give admin privilege to a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  createShowAdmin: ShowAdmin;
  /**
   * Remove admin privileges from a user for a show.
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteShowAdmin: ShowAdmin;
  /** Create an episode under a `Show` */
  createEpisode: Episode;
  /** Update episode info */
  updateEpisode: Episode;
  /**
   * Delete an episode and all it's child data
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisode: Episode;
  /** Link an `Episode` to a service URL */
  createEpisodeUrl: EpisodeUrl;
  /**
   * Unlink an `Episode` to from service URL
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteEpisodeUrl: EpisodeUrl;
  /** Update episode url info */
  updateEpisodeUrl: EpisodeUrl;
  /** Add a timestamp to an `Episode` */
  createTimestamp: Timestamp;
  /** Update timestamp data */
  updateTimestamp: Timestamp;
  /** Delete a timestamp */
  deleteTimestamp: Timestamp;
  /** Will create, update, and delete timestamps as passed. Partial failures are completely rolled back */
  updateTimestamps: UpdatedTimestamps;
  /**
   * Create a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  createTimestampType: TimestampType;
  /**
   * Update a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  updateTimestampType: TimestampType;
  /**
   * Delete a timestamp type
   *
   * > `@hasRole(role: ADMIN)` - The user must have the `ADMIN` role to perform this action
   */
  deleteTimestampType: TimestampType;
  /** Make changes to an existing template */
  createTemplate: Template;
  /** Make changes to an existing template */
  updateTemplate: Template;
  /**
   * Delete an existing template
   *
   * > `@isShowAdmin` - You need to be an admin of the show to do this action
   */
  deleteTemplate: Template;
  /** Add a timestamp to an existing template */
  addTimestampToTemplate: TemplateTimestamp;
  /** Remove a timestamp from an existing template */
  removeTimestampFromTemplate: TemplateTimestamp;
  /** Create a new API client for the authenticated user to use */
  createApiClient: ApiClient;
  /** Update one of the authenticated user's API clients */
  updateApiClient: ApiClient;
  /** Delete one of the authenticated user's API clients */
  deleteApiClient: ApiClient;
  addExternalLink: ExternalLink;
  removeExternalLink: ExternalLink;
  /** Report an issue with a single timestamp, episode, episode URL, or show. */
  createUserReport: UserReport;
  /**
   * Mark a report as fixed
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this operation.
   */
  resolveUserReport: UserReport;
};


export type MutationCreateAccountArgs = {
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
  recaptchaResponse: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmNewPassword: Scalars['String']['input'];
};


export type MutationResendVerificationEmailArgs = {
  recaptchaResponse: Scalars['String']['input'];
};


export type MutationVerifyEmailAddressArgs = {
  validationToken: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  recaptchaResponse: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  passwordResetToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmNewPassword: Scalars['String']['input'];
};


export type MutationDeleteAccountRequestArgs = {
  passwordHash: Scalars['String']['input'];
};


export type MutationDeleteAccountArgs = {
  deleteToken: Scalars['String']['input'];
};


export type MutationSavePreferencesArgs = {
  preferences: InputPreferences;
};


export type MutationCreateShowArgs = {
  showInput: InputShow;
  becomeAdmin: Scalars['Boolean']['input'];
};


export type MutationUpdateShowArgs = {
  showId: Scalars['ID']['input'];
  newShow: InputShow;
};


export type MutationDeleteShowArgs = {
  showId: Scalars['ID']['input'];
};


export type MutationCreateShowAdminArgs = {
  showAdminInput: InputShowAdmin;
};


export type MutationDeleteShowAdminArgs = {
  showAdminId: Scalars['ID']['input'];
};


export type MutationCreateEpisodeArgs = {
  showId: Scalars['ID']['input'];
  episodeInput: InputEpisode;
};


export type MutationUpdateEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
  newEpisode: InputEpisode;
};


export type MutationDeleteEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
};


export type MutationCreateEpisodeUrlArgs = {
  episodeId: Scalars['ID']['input'];
  episodeUrlInput: InputEpisodeUrl;
};


export type MutationDeleteEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
};


export type MutationUpdateEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
  newEpisodeUrl: InputEpisodeUrl;
};


export type MutationCreateTimestampArgs = {
  episodeId: Scalars['ID']['input'];
  timestampInput: InputTimestamp;
};


export type MutationUpdateTimestampArgs = {
  timestampId: Scalars['ID']['input'];
  newTimestamp: InputTimestamp;
};


export type MutationDeleteTimestampArgs = {
  timestampId: Scalars['ID']['input'];
};


export type MutationUpdateTimestampsArgs = {
  create: Array<InputTimestampOn>;
  update: Array<InputExistingTimestamp>;
  delete: Array<Scalars['ID']['input']>;
};


export type MutationCreateTimestampTypeArgs = {
  timestampTypeInput: InputTimestampType;
};


export type MutationUpdateTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
  newTimestampType: InputTimestampType;
};


export type MutationDeleteTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
};


export type MutationCreateTemplateArgs = {
  newTemplate: InputTemplate;
};


export type MutationUpdateTemplateArgs = {
  templateId: Scalars['ID']['input'];
  newTemplate: InputTemplate;
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['ID']['input'];
};


export type MutationAddTimestampToTemplateArgs = {
  templateTimestamp: InputTemplateTimestamp;
};


export type MutationRemoveTimestampFromTemplateArgs = {
  templateTimestamp: InputTemplateTimestamp;
};


export type MutationCreateApiClientArgs = {
  client: CreateApiClient;
};


export type MutationUpdateApiClientArgs = {
  id: Scalars['String']['input'];
  changes: ApiClientChanges;
};


export type MutationDeleteApiClientArgs = {
  id: Scalars['String']['input'];
};


export type MutationAddExternalLinkArgs = {
  showId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};


export type MutationRemoveExternalLinkArgs = {
  showId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};


export type MutationCreateUserReportArgs = {
  report?: InputMaybe<InputUserReport>;
};


export type MutationResolveUserReportArgs = {
  id: Scalars['ID']['input'];
  resolvedMessage?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get the logged in user's private account information */
  account: Account;
  /**
   * Use either the username or email and an md5 hash of the user's password to get an access and
   * refresh token
   */
  login: LoginData;
  /** Use a refresh token get a new access and refresh token */
  loginRefresh: LoginData;
  /** Find user with a matching `User.id` */
  findUser: User;
  /** Find user with a matching `User.username` */
  findUserByUsername: User;
  /** Find show with a matching `Show.id` */
  findShow: Show;
  findShowsByExternalId: Array<Show>;
  /**
   * Search for shows that include the `search` in the `Show.name`. Results are sorted by `Show.name`
   * as `ASC` or `DESC`
   */
  searchShows: Array<Show>;
  /** Find show admin with a matching `ShowAdmin.id` */
  findShowAdmin: ShowAdmin;
  /** Get a list of admins for a given `Show.id` */
  findShowAdminsByShowId: Array<ShowAdmin>;
  /** Get a list of show admins for a given `User.id` */
  findShowAdminsByUserId: Array<ShowAdmin>;
  /**
   * Get a list of recently added episodes that have timestamps.
   *
   * > Since this is a rather intensive query, it is cached for 20 minutes before it will look for new
   * > episodes again
   */
  recentlyAddedEpisodes: Array<Episode>;
  /** Find episode with a matching `Episode.id` */
  findEpisode: Episode;
  /** Get a list of episodes for a given `Show.id` */
  findEpisodesByShowId: Array<Episode>;
  /**
   * Search for episodes that include the `search` in the `Episode.name`. Results are sorted by
   * `Show.name`as `ASC` or `DESC`
   *
   * Results can be limited to a single show by passing `showId`
   */
  searchEpisodes: Array<Episode>;
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
  /** Get timestamp info based on a `Timestamp.id` */
  findTimestamp: Timestamp;
  /** Get all the timestamps for an episode */
  findTimestampsByEpisodeId: Array<Timestamp>;
  /** Get timestamp type info based on a `TimestampType.id` */
  findTimestampType: TimestampType;
  /** List all the `TimestampType`s. Items come back in a random order */
  allTimestampTypes: Array<TimestampType>;
  /**
   * Get template info based on a `Template.id`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will get a not found error, same as if the template was not found.
   */
  findTemplate: Template;
  /**
   * Get a list of templates based on the `Template.showId`
   *
   * Only templates you've created are returned. If you don't include a token in the authorization
   * header, you will receive an empty list.
   */
  findTemplatesByShowId: Array<Template>;
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
  /** List or search through the authenticated user's API clients */
  myApiClients: Array<ApiClient>;
  /** Find an API Client that you created based on it's ID. This will not return other users' clients */
  findApiClient: ApiClient;
  counts?: Maybe<TotalCounts>;
  /**
   * List all user reports.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReports: Array<UserReport>;
  /**
   * Get a single user report, even if it's been resolved/deleted.
   *
   * > `@hasRole(role: REVIEWER)` - The user must have the `REVIEWER` role to perform this query.
   */
  findUserReport: UserReport;
};


export type QueryLoginArgs = {
  usernameEmail: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
};


export type QueryLoginRefreshArgs = {
  refreshToken: Scalars['String']['input'];
};


export type QueryFindUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryFindUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindShowArgs = {
  showId: Scalars['ID']['input'];
};


export type QueryFindShowsByExternalIdArgs = {
  service: ExternalService;
  serviceId: Scalars['String']['input'];
};


export type QuerySearchShowsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindShowAdminArgs = {
  showAdminId: Scalars['ID']['input'];
};


export type QueryFindShowAdminsByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


export type QueryFindShowAdminsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryRecentlyAddedEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
};


export type QueryFindEpisodesByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


export type QuerySearchEpisodesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  showId?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindEpisodeByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindEpisodeUrlArgs = {
  episodeUrl: Scalars['String']['input'];
};


export type QueryFindEpisodeUrlsByEpisodeIdArgs = {
  episodeId: Scalars['ID']['input'];
};


export type QueryFindTimestampArgs = {
  timestampId: Scalars['ID']['input'];
};


export type QueryFindTimestampsByEpisodeIdArgs = {
  episodeId: Scalars['ID']['input'];
};


export type QueryFindTimestampTypeArgs = {
  timestampTypeId: Scalars['ID']['input'];
};


export type QueryFindTemplateArgs = {
  templateId: Scalars['ID']['input'];
};


export type QueryFindTemplatesByShowIdArgs = {
  showId: Scalars['ID']['input'];
};


export type QueryFindTemplateByDetailsArgs = {
  episodeId?: InputMaybe<Scalars['ID']['input']>;
  showName?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyApiClientsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindApiClientArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindUserReportsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindUserReportArgs = {
  id: Scalars['ID']['input'];
};

export type InputExistingTimestamp = {
  /** The id of the timestamp you want to modify */
  id: Scalars['ID']['input'];
  /** The new values for the timestamp */
  timestamp: InputTimestamp;
};

export type InputTimestampOn = {
  /** The episode id the timestamp will be created on */
  episodeId: Scalars['ID']['input'];
  /** The new values for the timestamp */
  timestamp: InputTimestamp;
};

/**
 * The base model has all the fields you would expect a fully fleshed out item in the database would
 * have. It is used to track who create, updated, and deleted items
 */
export type BaseModel = {
  /** Unique, v4 UUID. When asked for an `id` of an object, use this field */
  id: Scalars['ID']['output'];
  /** Time that the item was created at */
  createdAt: Scalars['Time']['output'];
  /** The user's `id` that created the item */
  createdByUserId: Scalars['ID']['output'];
  /** The entire user that created the item */
  createdBy: User;
  /** Time that the item was updated at */
  updatedAt: Scalars['Time']['output'];
  /** The user's `id` that last updated the item */
  updatedByUserId: Scalars['ID']['output'];
  /** The entire user that last updated the item */
  updatedBy: User;
  /** Time that the item was updated at. If this value is present, the item is considered deleted */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** The user's `id` that deleted the item */
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  /** The entire user that deleted the item */
  deletedBy?: Maybe<User>;
};

/**
 * Basic information about an episode, including season, numbers, a list of timestamps, and urls that
 * it can be watched at
 */
export type Episode = BaseModel & {
  __typename?: 'Episode';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
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
  show: Show;
  /** The id of the show that the episode belongs to */
  showId: Scalars['ID']['output'];
  /**
   * The list of current timestamps.
   *
   * Timestamps are apart apart of the `Episode` instead of the `EpisodeUrl` so that they can be shared
   * between urls and not need duplicate data
   */
  timestamps: Array<Timestamp>;
  /** The list of urls and services that the episode can be accessed from */
  urls: Array<EpisodeUrl>;
  /** If the episode is the source episode for a `Template`, this will resolve to that template */
  template?: Maybe<Template>;
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
export type ThirdPartyEpisode = {
  __typename?: 'ThirdPartyEpisode';
  /** The Anime Skip `Episode.id` when the `source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']['output']>;
  season?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  absoluteNumber?: Maybe<Scalars['String']['output']>;
  baseDuration?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  source?: Maybe<TimestampSource>;
  timestamps: Array<ThirdPartyTimestamp>;
  /** The id of the show from the third party */
  showId: Scalars['String']['output'];
  show: ThirdPartyShow;
};

/** Data required to create a new `Episode`. See `Episode` for a description of each field */
export type InputEpisode = {
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
export type EpisodeUrl = {
  __typename?: 'EpisodeUrl';
  /**
   * The url that would take a user to watch the `episode`.
   *
   * This url should be stripped of all query params.
   */
  url: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
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
  episode: Episode;
  /** What service this url points to. This is computed when the `EpisodeUrl` is created */
  source: EpisodeSource;
};

/** Data required to create a new `EpisodeUrl`. See `EpisodeUrl` for a description of each field */
export type InputEpisodeUrl = {
  url: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Float']['input']>;
  timestampsOffset?: InputMaybe<Scalars['Float']['input']>;
};

/** Account info that should only be accessible by the authorized user */
export type Account = {
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
  adminOfShows: Array<ShowAdmin>;
  /** If the user's email is verified. Emails must be verified before the user can call a mutation */
  emailVerified: Scalars['Boolean']['output'];
  /** The user's administrative role. Most users are `Role.USER` */
  role: Role;
  /** The user's preferences */
  preferences: Preferences;
};

/**
 * Where all the user preferences are stored. This includes what timestamps the user doesn't want to
 * watch
 */
export type Preferences = {
  __typename?: 'Preferences';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  updatedAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** The `User.id` that this preferences object belongs to */
  userId: Scalars['ID']['output'];
  /** The `User` that the preferences belong to */
  user: User;
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
  colorTheme: ColorTheme;
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
export type InputPreferences = {
  enableAutoSkip?: InputMaybe<Scalars['Boolean']['input']>;
  enableAutoPlay?: InputMaybe<Scalars['Boolean']['input']>;
  minimizeToolbarWhenEditing?: InputMaybe<Scalars['Boolean']['input']>;
  hideTimelineWhenMinimized?: InputMaybe<Scalars['Boolean']['input']>;
  colorTheme?: InputMaybe<ColorTheme>;
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
export type Show = BaseModel & {
  __typename?: 'Show';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
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
  admins: Array<ShowAdmin>;
  /** All the episodes that belong to the show */
  episodes: Array<Episode>;
  /** All the templates that belong to this show */
  templates: Array<Template>;
  /** Any links to external sites (just Anilist right now) for the show */
  externalLinks: Array<ExternalLink>;
  /** How many seasons are associated with this show */
  seasonCount: Scalars['Int']['output'];
  /** How many episodes are apart of this show */
  episodeCount: Scalars['Int']['output'];
};

export type ThirdPartyShow = {
  __typename?: 'ThirdPartyShow';
  name: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Time']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

/** Data required to create a new `Show`. See `Show` for a description of each field */
export type InputShow = {
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
export type ShowAdmin = BaseModel & {
  __typename?: 'ShowAdmin';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  /** The `Show.id` that the admin has elevated privileges for */
  showId: Scalars['ID']['output'];
  /** The `Show` that the admin has elevated privileges for */
  show: Show;
  /** The `User.id` that the admin privileges belong to */
  userId: Scalars['ID']['output'];
  /** The `User` that the admin privileges belong to */
  user: User;
};

/** Data required to create a new `ShowAdmin`. See `ShowAdmin` for a description of each field */
export type InputShowAdmin = {
  showId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Timestamp = BaseModel & {
  __typename?: 'Timestamp';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  /** The actual time the timestamp is at */
  at: Scalars['Float']['output'];
  source: TimestampSource;
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID']['output'];
  /**
   * The type the timestamp is. This field is a constant string so including it has no effect on
   * performance or query complexity.
   */
  type: TimestampType;
  /** The `Episode.id` that the timestamp belongs to */
  episodeId: Scalars['ID']['output'];
  /** The `Episode` that the timestamp belongs to */
  episode: Episode;
};

export type ThirdPartyTimestamp = {
  __typename?: 'ThirdPartyTimestamp';
  /** The Anime Skip `Timestamp.id` when the `Episode.source` is `ANIME_SKIP`, otherwise this is null */
  id?: Maybe<Scalars['ID']['output']>;
  /** The actual time the timestamp is at */
  at: Scalars['Float']['output'];
  /** The id specifying the type the timestamp is */
  typeId: Scalars['ID']['output'];
  type: TimestampType;
};

/** Data required to create a new `Timestamp`. See `Timestamp` for a description of each field */
export type InputTimestamp = {
  at: Scalars['Float']['input'];
  typeId: Scalars['ID']['input'];
  source?: InputMaybe<TimestampSource>;
};

/**
 * The type a timestamp can be. This table rarely changes so the values fetched can either be hard
 * coded or fetch occasionally. Anime Skip website and web extension use hardcoded maps to store this
 * data, but a third party might want to fetch and cache this instead since you won't know when Anime
 * Skip adds timestamps
 */
export type TimestampType = BaseModel & {
  __typename?: 'TimestampType';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  /** The name of the timestamp type */
  name: Scalars['String']['output'];
  /** The description for what this type represents */
  description: Scalars['String']['output'];
};

/** Data required to create a new `TimestampType`. See `TimestampType` for a description of each field */
export type InputTimestampType = {
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

/** Information about a user that is public. See `Account` for a description of each field */
export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  username: Scalars['String']['output'];
  profileUrl: Scalars['String']['output'];
  adminOfShows: Array<ShowAdmin>;
};

/** When no timestamps exist for a specific episode, templates are setup to provide fallback timestamps */
export type Template = BaseModel & {
  __typename?: 'Template';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  /** The id of the show that this template is for */
  showId: Scalars['ID']['output'];
  /** The show that this template is for */
  show: Show;
  /** Specify the scope of the template, if it's for the entire show, or just for a set of seasons */
  type: TemplateType;
  /** When the template is for a set of seasons, this is the set of seasons it is applied to */
  seasons?: Maybe<Array<Scalars['String']['output']>>;
  /** The id of the episode used to create the template. All the timestamps are from this episode */
  sourceEpisodeId: Scalars['ID']['output'];
  /** The episode used to create the template. All the timestamps are from this episode */
  sourceEpisode: Episode;
  /** The list of timestamps that are apart of this template */
  timestamps: Array<Timestamp>;
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
export type InputTemplate = {
  showId: Scalars['ID']['input'];
  type: TemplateType;
  seasons?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceEpisodeId: Scalars['ID']['input'];
};

/** The many to many object that links a timestamp to a template */
export type TemplateTimestamp = {
  __typename?: 'TemplateTimestamp';
  templateId: Scalars['ID']['output'];
  template: Template;
  timestampId: Scalars['ID']['output'];
  timestamp: Timestamp;
};

/** Data required to modify the timestamps on a template */
export type InputTemplateTimestamp = {
  templateId: Scalars['ID']['input'];
  timestampId: Scalars['ID']['input'];
};

export type ApiClient = {
  __typename?: 'ApiClient';
  id: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  /** The ID of the user this client belongs to */
  userId: Scalars['ID']['output'];
  /** The user this client belongs to */
  user: User;
  appName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  rateLimitRpm?: Maybe<Scalars['UInt']['output']>;
};

export type CreateApiClient = {
  appName: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type ApiClientChanges = {
  appName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Rate limits can only be changed by admins */
  rateLimitRpm?: InputMaybe<Scalars['UInt']['input']>;
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  url: Scalars['String']['output'];
  showId: Scalars['ID']['output'];
  show: Show;
  service: Scalars['String']['output'];
  serviceId?: Maybe<Scalars['String']['output']>;
};

export type TotalCounts = {
  __typename?: 'TotalCounts';
  episodes: Scalars['Int']['output'];
  episodeUrls: Scalars['Int']['output'];
  shows: Scalars['Int']['output'];
  timestamps: Scalars['Int']['output'];
  timestampTypes: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
  templates: Scalars['Int']['output'];
};

export type UserReport = BaseModel & {
  __typename?: 'UserReport';
  id: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  createdByUserId: Scalars['ID']['output'];
  createdBy: User;
  updatedAt: Scalars['Time']['output'];
  updatedByUserId: Scalars['ID']['output'];
  updatedBy: User;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deletedByUserId?: Maybe<Scalars['ID']['output']>;
  deletedBy?: Maybe<User>;
  message: Scalars['String']['output'];
  reportedFromUrl: Scalars['String']['output'];
  resolved: Scalars['Boolean']['output'];
  resolvedMessage?: Maybe<Scalars['String']['output']>;
  timestampId?: Maybe<Scalars['ID']['output']>;
  timestamp?: Maybe<Timestamp>;
  episodeId?: Maybe<Scalars['ID']['output']>;
  episode?: Maybe<Episode>;
  episodeUrlString?: Maybe<Scalars['String']['output']>;
  episodeUrl?: Maybe<EpisodeUrl>;
  showId?: Maybe<Scalars['ID']['output']>;
  show?: Maybe<Show>;
};

export type InputUserReport = {
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  BaseModel: ( Episode ) | ( Show ) | ( ShowAdmin ) | ( Timestamp ) | ( TimestampType ) | ( Template ) | ( UserReport );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Role: Role;
  EpisodeSource: EpisodeSource;
  TimestampSource: TimestampSource;
  TemplateType: TemplateType;
  ColorTheme: ColorTheme;
  ExternalService: ExternalService;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UInt: ResolverTypeWrapper<Scalars['UInt']['output']>;
  LoginData: ResolverTypeWrapper<LoginData>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdatedTimestamps: ResolverTypeWrapper<UpdatedTimestamps>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InputExistingTimestamp: InputExistingTimestamp;
  InputTimestampOn: InputTimestampOn;
  BaseModel: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseModel']>;
  Episode: ResolverTypeWrapper<Episode>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ThirdPartyEpisode: ResolverTypeWrapper<ThirdPartyEpisode>;
  InputEpisode: InputEpisode;
  EpisodeUrl: ResolverTypeWrapper<EpisodeUrl>;
  InputEpisodeUrl: InputEpisodeUrl;
  Account: ResolverTypeWrapper<Account>;
  Preferences: ResolverTypeWrapper<Preferences>;
  InputPreferences: InputPreferences;
  Show: ResolverTypeWrapper<Show>;
  ThirdPartyShow: ResolverTypeWrapper<ThirdPartyShow>;
  InputShow: InputShow;
  ShowAdmin: ResolverTypeWrapper<ShowAdmin>;
  InputShowAdmin: InputShowAdmin;
  Timestamp: ResolverTypeWrapper<Timestamp>;
  ThirdPartyTimestamp: ResolverTypeWrapper<ThirdPartyTimestamp>;
  InputTimestamp: InputTimestamp;
  TimestampType: ResolverTypeWrapper<TimestampType>;
  InputTimestampType: InputTimestampType;
  User: ResolverTypeWrapper<User>;
  Template: ResolverTypeWrapper<Template>;
  InputTemplate: InputTemplate;
  TemplateTimestamp: ResolverTypeWrapper<TemplateTimestamp>;
  InputTemplateTimestamp: InputTemplateTimestamp;
  ApiClient: ResolverTypeWrapper<ApiClient>;
  CreateApiClient: CreateApiClient;
  ApiClientChanges: ApiClientChanges;
  ExternalLink: ResolverTypeWrapper<ExternalLink>;
  TotalCounts: ResolverTypeWrapper<TotalCounts>;
  UserReport: ResolverTypeWrapper<UserReport>;
  InputUserReport: InputUserReport;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Time: Scalars['Time']['output'];
  UInt: Scalars['UInt']['output'];
  LoginData: LoginData;
  String: Scalars['String']['output'];
  UpdatedTimestamps: UpdatedTimestamps;
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Query: {};
  Int: Scalars['Int']['output'];
  InputExistingTimestamp: InputExistingTimestamp;
  InputTimestampOn: InputTimestampOn;
  BaseModel: ResolversInterfaceTypes<ResolversParentTypes>['BaseModel'];
  Episode: Episode;
  Float: Scalars['Float']['output'];
  ThirdPartyEpisode: ThirdPartyEpisode;
  InputEpisode: InputEpisode;
  EpisodeUrl: EpisodeUrl;
  InputEpisodeUrl: InputEpisodeUrl;
  Account: Account;
  Preferences: Preferences;
  InputPreferences: InputPreferences;
  Show: Show;
  ThirdPartyShow: ThirdPartyShow;
  InputShow: InputShow;
  ShowAdmin: ShowAdmin;
  InputShowAdmin: InputShowAdmin;
  Timestamp: Timestamp;
  ThirdPartyTimestamp: ThirdPartyTimestamp;
  InputTimestamp: InputTimestamp;
  TimestampType: TimestampType;
  InputTimestampType: InputTimestampType;
  User: User;
  Template: Template;
  InputTemplate: InputTemplate;
  TemplateTimestamp: TemplateTimestamp;
  InputTemplateTimestamp: InputTemplateTimestamp;
  ApiClient: ApiClient;
  CreateApiClient: CreateApiClient;
  ApiClientChanges: ApiClientChanges;
  ExternalLink: ExternalLink;
  TotalCounts: TotalCounts;
  UserReport: UserReport;
  InputUserReport: InputUserReport;
};

export type AuthenticatedDirectiveArgs = { };

export type AuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = AuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type OptionalAuthenticatedDirectiveArgs = { };

export type OptionalAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = OptionalAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = {
  role: Role;
};

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsShowAdminDirectiveArgs = { };

export type IsShowAdminDirectiveResolver<Result, Parent, ContextType = any, Args = IsShowAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UInt'], any> {
  name: 'UInt';
}

export type LoginDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginData'] = ResolversParentTypes['LoginData']> = {
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatedTimestampsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatedTimestamps'] = ResolversParentTypes['UpdatedTimestamps']> = {
  created?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  deleted?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['LoginData'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'username' | 'email' | 'passwordHash' | 'recaptchaResponse'>>;
  changePassword?: Resolver<ResolversTypes['LoginData'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'oldPassword' | 'newPassword' | 'confirmNewPassword'>>;
  resendVerificationEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResendVerificationEmailArgs, 'recaptchaResponse'>>;
  verifyEmailAddress?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationVerifyEmailAddressArgs, 'validationToken'>>;
  requestPasswordReset?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRequestPasswordResetArgs, 'recaptchaResponse' | 'email'>>;
  resetPassword?: Resolver<ResolversTypes['LoginData'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'passwordResetToken' | 'newPassword' | 'confirmNewPassword'>>;
  deleteAccountRequest?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationDeleteAccountRequestArgs, 'passwordHash'>>;
  deleteAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'deleteToken'>>;
  savePreferences?: Resolver<ResolversTypes['Preferences'], ParentType, ContextType, RequireFields<MutationSavePreferencesArgs, 'preferences'>>;
  createShow?: Resolver<ResolversTypes['Show'], ParentType, ContextType, RequireFields<MutationCreateShowArgs, 'showInput' | 'becomeAdmin'>>;
  updateShow?: Resolver<ResolversTypes['Show'], ParentType, ContextType, RequireFields<MutationUpdateShowArgs, 'showId' | 'newShow'>>;
  deleteShow?: Resolver<ResolversTypes['Show'], ParentType, ContextType, RequireFields<MutationDeleteShowArgs, 'showId'>>;
  createShowAdmin?: Resolver<ResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<MutationCreateShowAdminArgs, 'showAdminInput'>>;
  deleteShowAdmin?: Resolver<ResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<MutationDeleteShowAdminArgs, 'showAdminId'>>;
  createEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<MutationCreateEpisodeArgs, 'showId' | 'episodeInput'>>;
  updateEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<MutationUpdateEpisodeArgs, 'episodeId' | 'newEpisode'>>;
  deleteEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<MutationDeleteEpisodeArgs, 'episodeId'>>;
  createEpisodeUrl?: Resolver<ResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<MutationCreateEpisodeUrlArgs, 'episodeId' | 'episodeUrlInput'>>;
  deleteEpisodeUrl?: Resolver<ResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<MutationDeleteEpisodeUrlArgs, 'episodeUrl'>>;
  updateEpisodeUrl?: Resolver<ResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<MutationUpdateEpisodeUrlArgs, 'episodeUrl' | 'newEpisodeUrl'>>;
  createTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationCreateTimestampArgs, 'episodeId' | 'timestampInput'>>;
  updateTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationUpdateTimestampArgs, 'timestampId' | 'newTimestamp'>>;
  deleteTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationDeleteTimestampArgs, 'timestampId'>>;
  updateTimestamps?: Resolver<ResolversTypes['UpdatedTimestamps'], ParentType, ContextType, RequireFields<MutationUpdateTimestampsArgs, 'create' | 'update' | 'delete'>>;
  createTimestampType?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<MutationCreateTimestampTypeArgs, 'timestampTypeInput'>>;
  updateTimestampType?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<MutationUpdateTimestampTypeArgs, 'timestampTypeId' | 'newTimestampType'>>;
  deleteTimestampType?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<MutationDeleteTimestampTypeArgs, 'timestampTypeId'>>;
  createTemplate?: Resolver<ResolversTypes['Template'], ParentType, ContextType, RequireFields<MutationCreateTemplateArgs, 'newTemplate'>>;
  updateTemplate?: Resolver<ResolversTypes['Template'], ParentType, ContextType, RequireFields<MutationUpdateTemplateArgs, 'templateId' | 'newTemplate'>>;
  deleteTemplate?: Resolver<ResolversTypes['Template'], ParentType, ContextType, RequireFields<MutationDeleteTemplateArgs, 'templateId'>>;
  addTimestampToTemplate?: Resolver<ResolversTypes['TemplateTimestamp'], ParentType, ContextType, RequireFields<MutationAddTimestampToTemplateArgs, 'templateTimestamp'>>;
  removeTimestampFromTemplate?: Resolver<ResolversTypes['TemplateTimestamp'], ParentType, ContextType, RequireFields<MutationRemoveTimestampFromTemplateArgs, 'templateTimestamp'>>;
  createApiClient?: Resolver<ResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<MutationCreateApiClientArgs, 'client'>>;
  updateApiClient?: Resolver<ResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<MutationUpdateApiClientArgs, 'id' | 'changes'>>;
  deleteApiClient?: Resolver<ResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<MutationDeleteApiClientArgs, 'id'>>;
  addExternalLink?: Resolver<ResolversTypes['ExternalLink'], ParentType, ContextType, RequireFields<MutationAddExternalLinkArgs, 'showId' | 'url'>>;
  removeExternalLink?: Resolver<ResolversTypes['ExternalLink'], ParentType, ContextType, RequireFields<MutationRemoveExternalLinkArgs, 'showId' | 'url'>>;
  createUserReport?: Resolver<ResolversTypes['UserReport'], ParentType, ContextType, Partial<MutationCreateUserReportArgs>>;
  resolveUserReport?: Resolver<ResolversTypes['UserReport'], ParentType, ContextType, RequireFields<MutationResolveUserReportArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['LoginData'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'usernameEmail' | 'passwordHash'>>;
  loginRefresh?: Resolver<ResolversTypes['LoginData'], ParentType, ContextType, RequireFields<QueryLoginRefreshArgs, 'refreshToken'>>;
  findUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserArgs, 'userId'>>;
  findUserByUsername?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserByUsernameArgs, 'username'>>;
  findShow?: Resolver<ResolversTypes['Show'], ParentType, ContextType, RequireFields<QueryFindShowArgs, 'showId'>>;
  findShowsByExternalId?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QueryFindShowsByExternalIdArgs, 'service' | 'serviceId'>>;
  searchShows?: Resolver<Array<ResolversTypes['Show']>, ParentType, ContextType, RequireFields<QuerySearchShowsArgs, 'search' | 'offset' | 'limit' | 'sort'>>;
  findShowAdmin?: Resolver<ResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<QueryFindShowAdminArgs, 'showAdminId'>>;
  findShowAdminsByShowId?: Resolver<Array<ResolversTypes['ShowAdmin']>, ParentType, ContextType, RequireFields<QueryFindShowAdminsByShowIdArgs, 'showId'>>;
  findShowAdminsByUserId?: Resolver<Array<ResolversTypes['ShowAdmin']>, ParentType, ContextType, RequireFields<QueryFindShowAdminsByUserIdArgs, 'userId'>>;
  recentlyAddedEpisodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryRecentlyAddedEpisodesArgs, 'limit' | 'offset'>>;
  findEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<QueryFindEpisodeArgs, 'episodeId'>>;
  findEpisodesByShowId?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryFindEpisodesByShowIdArgs, 'showId'>>;
  searchEpisodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QuerySearchEpisodesArgs, 'search' | 'offset' | 'limit' | 'sort'>>;
  findEpisodeByName?: Resolver<Array<ResolversTypes['ThirdPartyEpisode']>, ParentType, ContextType, RequireFields<QueryFindEpisodeByNameArgs, 'name'>>;
  findEpisodeUrl?: Resolver<ResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<QueryFindEpisodeUrlArgs, 'episodeUrl'>>;
  findEpisodeUrlsByEpisodeId?: Resolver<Array<ResolversTypes['EpisodeUrl']>, ParentType, ContextType, RequireFields<QueryFindEpisodeUrlsByEpisodeIdArgs, 'episodeId'>>;
  findTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<QueryFindTimestampArgs, 'timestampId'>>;
  findTimestampsByEpisodeId?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<QueryFindTimestampsByEpisodeIdArgs, 'episodeId'>>;
  findTimestampType?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<QueryFindTimestampTypeArgs, 'timestampTypeId'>>;
  allTimestampTypes?: Resolver<Array<ResolversTypes['TimestampType']>, ParentType, ContextType>;
  findTemplate?: Resolver<ResolversTypes['Template'], ParentType, ContextType, RequireFields<QueryFindTemplateArgs, 'templateId'>>;
  findTemplatesByShowId?: Resolver<Array<ResolversTypes['Template']>, ParentType, ContextType, RequireFields<QueryFindTemplatesByShowIdArgs, 'showId'>>;
  findTemplateByDetails?: Resolver<ResolversTypes['Template'], ParentType, ContextType, Partial<QueryFindTemplateByDetailsArgs>>;
  myApiClients?: Resolver<Array<ResolversTypes['ApiClient']>, ParentType, ContextType, RequireFields<QueryMyApiClientsArgs, 'offset' | 'limit' | 'sort'>>;
  findApiClient?: Resolver<ResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<QueryFindApiClientArgs, 'id'>>;
  counts?: Resolver<Maybe<ResolversTypes['TotalCounts']>, ParentType, ContextType>;
  findUserReports?: Resolver<Array<ResolversTypes['UserReport']>, ParentType, ContextType, RequireFields<QueryFindUserReportsArgs, 'offset' | 'limit' | 'sort'>>;
  findUserReport?: Resolver<ResolversTypes['UserReport'], ParentType, ContextType, RequireFields<QueryFindUserReportArgs, 'id'>>;
};

export type BaseModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseModel'] = ResolversParentTypes['BaseModel']> = {
  __resolveType: TypeResolveFn<'Episode' | 'Show' | 'ShowAdmin' | 'Timestamp' | 'TimestampType' | 'Template' | 'UserReport', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  season?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  absoluteNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseDuration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  showId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  urls?: Resolver<Array<ResolversTypes['EpisodeUrl']>, ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['Template']>, ParentType, ContextType>;
  userReports?: Resolver<Array<ResolversTypes['UserReport']>, ParentType, ContextType, Partial<EpisodeUserReportsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThirdPartyEpisodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThirdPartyEpisode'] = ResolversParentTypes['ThirdPartyEpisode']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  season?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  absoluteNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseDuration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['TimestampSource']>, ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['ThirdPartyTimestamp']>, ParentType, ContextType>;
  showId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  show?: Resolver<ResolversTypes['ThirdPartyShow'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['EpisodeUrl'] = ResolversParentTypes['EpisodeUrl']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestampsOffset?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  episodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  episode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['EpisodeSource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  adminOfShows?: Resolver<Array<ResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  preferences?: Resolver<ResolversTypes['Preferences'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  enableAutoSkip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  enableAutoPlay?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  minimizeToolbarWhenEditing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hideTimelineWhenMinimized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  colorTheme?: Resolver<ResolversTypes['ColorTheme'], ParentType, ContextType>;
  skipBranding?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipIntros?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipNewIntros?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipMixedIntros?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipRecaps?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipFiller?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipCanon?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipTransitions?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipCredits?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipNewCredits?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipMixedCredits?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipPreview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  skipTitleCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['Show'] = ResolversParentTypes['Show']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admins?: Resolver<Array<ResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  episodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  templates?: Resolver<Array<ResolversTypes['Template']>, ParentType, ContextType>;
  externalLinks?: Resolver<Array<ResolversTypes['ExternalLink']>, ParentType, ContextType>;
  seasonCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  episodeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThirdPartyShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThirdPartyShow'] = ResolversParentTypes['ThirdPartyShow']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShowAdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShowAdmin'] = ResolversParentTypes['ShowAdmin']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  showId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timestamp'] = ResolversParentTypes['Timestamp']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  at?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['TimestampSource'], ParentType, ContextType>;
  typeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType>;
  episodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  episode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThirdPartyTimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThirdPartyTimestamp'] = ResolversParentTypes['ThirdPartyTimestamp']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  at?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  typeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TimestampType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampType'] = ResolversParentTypes['TimestampType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  adminOfShows?: Resolver<Array<ResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  showId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TemplateType'], ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  sourceEpisodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sourceEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  timestampIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplateTimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateTimestamp'] = ResolversParentTypes['TemplateTimestamp']> = {
  templateId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  template?: Resolver<ResolversTypes['Template'], ParentType, ContextType>;
  timestampId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApiClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApiClient'] = ResolversParentTypes['ApiClient']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  appName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rateLimitRpm?: Resolver<Maybe<ResolversTypes['UInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalLink'] = ResolversParentTypes['ExternalLink']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  showId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<ResolversTypes['Show'], ParentType, ContextType>;
  service?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TotalCountsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TotalCounts'] = ResolversParentTypes['TotalCounts']> = {
  episodes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  episodeUrls?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamps?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestampTypes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  templates?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserReport'] = ResolversParentTypes['UserReport']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reportedFromUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resolved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resolvedMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestampId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  episodeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  episode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType>;
  episodeUrlString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeUrl?: Resolver<Maybe<ResolversTypes['EpisodeUrl']>, ParentType, ContextType>;
  showId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  show?: Resolver<Maybe<ResolversTypes['Show']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Time?: GraphQLScalarType;
  UInt?: GraphQLScalarType;
  LoginData?: LoginDataResolvers<ContextType>;
  UpdatedTimestamps?: UpdatedTimestampsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  BaseModel?: BaseModelResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  ThirdPartyEpisode?: ThirdPartyEpisodeResolvers<ContextType>;
  EpisodeUrl?: EpisodeUrlResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  Preferences?: PreferencesResolvers<ContextType>;
  Show?: ShowResolvers<ContextType>;
  ThirdPartyShow?: ThirdPartyShowResolvers<ContextType>;
  ShowAdmin?: ShowAdminResolvers<ContextType>;
  Timestamp?: TimestampResolvers<ContextType>;
  ThirdPartyTimestamp?: ThirdPartyTimestampResolvers<ContextType>;
  TimestampType?: TimestampTypeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Template?: TemplateResolvers<ContextType>;
  TemplateTimestamp?: TemplateTimestampResolvers<ContextType>;
  ApiClient?: ApiClientResolvers<ContextType>;
  ExternalLink?: ExternalLinkResolvers<ContextType>;
  TotalCounts?: TotalCountsResolvers<ContextType>;
  UserReport?: UserReportResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  authenticated?: AuthenticatedDirectiveResolver<any, any, ContextType>;
  optionalAuthenticated?: OptionalAuthenticatedDirectiveResolver<any, any, ContextType>;
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>;
  isShowAdmin?: IsShowAdminDirectiveResolver<any, any, ContextType>;
};
