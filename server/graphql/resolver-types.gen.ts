// oxlint-lint-ignore-file
// prettier-ignore
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GqlContext } from 'server/graphql/context.ts';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };


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
export type GqlResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  BaseModel: ( GqlEpisode ) | ( GqlShow ) | ( GqlShowAdmin ) | ( GqlTimestamp ) | ( GqlTimestampType ) | ( GqlTemplate ) | ( GqlUserReport );
};

/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = {
  InputExistingTimestamp: GqlInputExistingTimestamp;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  InputTimestampOn: GqlInputTimestampOn;
  Role: GqlRole;
  EpisodeSource: GqlEpisodeSource;
  TimestampSource: GqlTimestampSource;
  TemplateType: GqlTemplateType;
  ColorTheme: GqlColorTheme;
  ExternalService: GqlExternalService;
  BaseModel: ResolverTypeWrapper<GqlResolversInterfaceTypes<GqlResolversTypes>['BaseModel']>;
  Episode: ResolverTypeWrapper<GqlEpisode>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ThirdPartyEpisode: ResolverTypeWrapper<GqlThirdPartyEpisode>;
  InputEpisode: GqlInputEpisode;
  EpisodeUrl: ResolverTypeWrapper<GqlEpisodeUrl>;
  InputEpisodeUrl: GqlInputEpisodeUrl;
  Account: ResolverTypeWrapper<GqlAccount>;
  Preferences: ResolverTypeWrapper<GqlPreferences>;
  InputPreferences: GqlInputPreferences;
  Show: ResolverTypeWrapper<GqlShow>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ThirdPartyShow: ResolverTypeWrapper<GqlThirdPartyShow>;
  InputShow: GqlInputShow;
  ShowAdmin: ResolverTypeWrapper<GqlShowAdmin>;
  InputShowAdmin: GqlInputShowAdmin;
  Timestamp: ResolverTypeWrapper<GqlTimestamp>;
  ThirdPartyTimestamp: ResolverTypeWrapper<GqlThirdPartyTimestamp>;
  InputTimestamp: GqlInputTimestamp;
  TimestampType: ResolverTypeWrapper<GqlTimestampType>;
  InputTimestampType: GqlInputTimestampType;
  User: ResolverTypeWrapper<GqlUser>;
  Template: ResolverTypeWrapper<GqlTemplate>;
  InputTemplate: GqlInputTemplate;
  TemplateTimestamp: ResolverTypeWrapper<GqlTemplateTimestamp>;
  InputTemplateTimestamp: GqlInputTemplateTimestamp;
  ApiClient: ResolverTypeWrapper<GqlApiClient>;
  CreateApiClient: GqlCreateApiClient;
  ApiClientChanges: GqlApiClientChanges;
  ExternalLink: ResolverTypeWrapper<GqlExternalLink>;
  TotalCounts: ResolverTypeWrapper<GqlTotalCounts>;
  UserReport: ResolverTypeWrapper<GqlUserReport>;
  InputUserReport: GqlInputUserReport;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  LoginData: ResolverTypeWrapper<GqlLoginData>;
  UpdatedTimestamps: ResolverTypeWrapper<GqlUpdatedTimestamps>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UInt: ResolverTypeWrapper<Scalars['UInt']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = {
  InputExistingTimestamp: GqlInputExistingTimestamp;
  ID: Scalars['ID']['output'];
  InputTimestampOn: GqlInputTimestampOn;
  BaseModel: GqlResolversInterfaceTypes<GqlResolversParentTypes>['BaseModel'];
  Episode: GqlEpisode;
  String: Scalars['String']['output'];
  Float: Scalars['Float']['output'];
  Boolean: Scalars['Boolean']['output'];
  ThirdPartyEpisode: GqlThirdPartyEpisode;
  InputEpisode: GqlInputEpisode;
  EpisodeUrl: GqlEpisodeUrl;
  InputEpisodeUrl: GqlInputEpisodeUrl;
  Account: GqlAccount;
  Preferences: GqlPreferences;
  InputPreferences: GqlInputPreferences;
  Show: GqlShow;
  Int: Scalars['Int']['output'];
  ThirdPartyShow: GqlThirdPartyShow;
  InputShow: GqlInputShow;
  ShowAdmin: GqlShowAdmin;
  InputShowAdmin: GqlInputShowAdmin;
  Timestamp: GqlTimestamp;
  ThirdPartyTimestamp: GqlThirdPartyTimestamp;
  InputTimestamp: GqlInputTimestamp;
  TimestampType: GqlTimestampType;
  InputTimestampType: GqlInputTimestampType;
  User: GqlUser;
  Template: GqlTemplate;
  InputTemplate: GqlInputTemplate;
  TemplateTimestamp: GqlTemplateTimestamp;
  InputTemplateTimestamp: GqlInputTemplateTimestamp;
  ApiClient: GqlApiClient;
  CreateApiClient: GqlCreateApiClient;
  ApiClientChanges: GqlApiClientChanges;
  ExternalLink: GqlExternalLink;
  TotalCounts: GqlTotalCounts;
  UserReport: GqlUserReport;
  InputUserReport: GqlInputUserReport;
  Mutation: {};
  Query: {};
  LoginData: GqlLoginData;
  UpdatedTimestamps: GqlUpdatedTimestamps;
  Time: Scalars['Time']['output'];
  UInt: Scalars['UInt']['output'];
};

export type GqlAuthenticatedDirectiveArgs = { };

export type GqlAuthenticatedDirectiveResolver<Result, Parent, ContextType = GqlContext, Args = GqlAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GqlOptionalAuthenticatedDirectiveArgs = { };

export type GqlOptionalAuthenticatedDirectiveResolver<Result, Parent, ContextType = GqlContext, Args = GqlOptionalAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GqlHasRoleDirectiveArgs = {
  role: GqlRole;
};

export type GqlHasRoleDirectiveResolver<Result, Parent, ContextType = GqlContext, Args = GqlHasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GqlIsShowAdminDirectiveArgs = { };

export type GqlIsShowAdminDirectiveResolver<Result, Parent, ContextType = GqlContext, Args = GqlIsShowAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GqlBaseModelResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['BaseModel'] = GqlResolversParentTypes['BaseModel']> = {
  __resolveType: TypeResolveFn<'Episode' | 'Show' | 'ShowAdmin' | 'Timestamp' | 'TimestampType' | 'Template' | 'UserReport', ParentType, ContextType>;
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
};

export type GqlEpisodeResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Episode'] = GqlResolversParentTypes['Episode']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  season?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  absoluteNumber?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  baseDuration?: Resolver<Maybe<GqlResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  show?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType>;
  showId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  timestamps?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  urls?: Resolver<Array<GqlResolversTypes['EpisodeUrl']>, ParentType, ContextType>;
  template?: Resolver<Maybe<GqlResolversTypes['Template']>, ParentType, ContextType>;
  userReports?: Resolver<Array<GqlResolversTypes['UserReport']>, ParentType, ContextType, Partial<GqlEpisodeUserReportsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlThirdPartyEpisodeResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ThirdPartyEpisode'] = GqlResolversParentTypes['ThirdPartyEpisode']> = {
  id?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  season?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  absoluteNumber?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  baseDuration?: Resolver<Maybe<GqlResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<GqlResolversTypes['TimestampSource']>, ParentType, ContextType>;
  timestamps?: Resolver<Array<GqlResolversTypes['ThirdPartyTimestamp']>, ParentType, ContextType>;
  showId?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  show?: Resolver<GqlResolversTypes['ThirdPartyShow'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlEpisodeUrlResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['EpisodeUrl'] = GqlResolversParentTypes['EpisodeUrl']> = {
  url?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  duration?: Resolver<Maybe<GqlResolversTypes['Float']>, ParentType, ContextType>;
  timestampsOffset?: Resolver<Maybe<GqlResolversTypes['Float']>, ParentType, ContextType>;
  episodeId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  episode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType>;
  source?: Resolver<GqlResolversTypes['EpisodeSource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlAccountResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Account'] = GqlResolversParentTypes['Account']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  username?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  profileUrl?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  adminOfShows?: Resolver<Array<GqlResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  emailVerified?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  role?: Resolver<GqlResolversTypes['Role'], ParentType, ContextType>;
  preferences?: Resolver<GqlResolversTypes['Preferences'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlPreferencesResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Preferences'] = GqlResolversParentTypes['Preferences']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  userId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  enableAutoSkip?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  enableAutoPlay?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  minimizeToolbarWhenEditing?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  hideTimelineWhenMinimized?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  colorTheme?: Resolver<GqlResolversTypes['ColorTheme'], ParentType, ContextType>;
  skipBranding?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipIntros?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipNewIntros?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipMixedIntros?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipRecaps?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipFiller?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipCanon?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipTransitions?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipCredits?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipNewCredits?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipMixedCredits?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipPreview?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  skipTitleCard?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlShowResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Show'] = GqlResolversParentTypes['Show']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  admins?: Resolver<Array<GqlResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  episodes?: Resolver<Array<GqlResolversTypes['Episode']>, ParentType, ContextType>;
  templates?: Resolver<Array<GqlResolversTypes['Template']>, ParentType, ContextType>;
  externalLinks?: Resolver<Array<GqlResolversTypes['ExternalLink']>, ParentType, ContextType>;
  seasonCount?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  episodeCount?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlThirdPartyShowResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ThirdPartyShow'] = GqlResolversParentTypes['ThirdPartyShow']> = {
  name?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlShowAdminResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ShowAdmin'] = GqlResolversParentTypes['ShowAdmin']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  showId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType>;
  userId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlTimestampResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Timestamp'] = GqlResolversParentTypes['Timestamp']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  at?: Resolver<GqlResolversTypes['Float'], ParentType, ContextType>;
  source?: Resolver<GqlResolversTypes['TimestampSource'], ParentType, ContextType>;
  typeId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType>;
  episodeId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  episode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlThirdPartyTimestampResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ThirdPartyTimestamp'] = GqlResolversParentTypes['ThirdPartyTimestamp']> = {
  id?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  at?: Resolver<GqlResolversTypes['Float'], ParentType, ContextType>;
  typeId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlTimestampTypeResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['TimestampType'] = GqlResolversParentTypes['TimestampType']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlUserResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['User'] = GqlResolversParentTypes['User']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  username?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  profileUrl?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  adminOfShows?: Resolver<Array<GqlResolversTypes['ShowAdmin']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlTemplateResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Template'] = GqlResolversParentTypes['Template']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  showId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType>;
  type?: Resolver<GqlResolversTypes['TemplateType'], ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<GqlResolversTypes['String']>>, ParentType, ContextType>;
  sourceEpisodeId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  sourceEpisode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType>;
  timestamps?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  timestampIds?: Resolver<Array<GqlResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlTemplateTimestampResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['TemplateTimestamp'] = GqlResolversParentTypes['TemplateTimestamp']> = {
  templateId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  template?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType>;
  timestampId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<GqlResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlApiClientResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ApiClient'] = GqlResolversParentTypes['ApiClient']> = {
  id?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  appName?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  rateLimitRpm?: Resolver<Maybe<GqlResolversTypes['UInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlExternalLinkResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['ExternalLink'] = GqlResolversParentTypes['ExternalLink']> = {
  url?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  showId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  show?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType>;
  service?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  serviceId?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlTotalCountsResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['TotalCounts'] = GqlResolversParentTypes['TotalCounts']> = {
  episodes?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  episodeUrls?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  shows?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  timestamps?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  timestampTypes?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  templates?: Resolver<GqlResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlUserReportResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['UserReport'] = GqlResolversParentTypes['UserReport']> = {
  id?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  createdByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  updatedAt?: Resolver<GqlResolversTypes['Time'], ParentType, ContextType>;
  updatedByUserId?: Resolver<GqlResolversTypes['ID'], ParentType, ContextType>;
  updatedBy?: Resolver<GqlResolversTypes['User'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<GqlResolversTypes['Time']>, ParentType, ContextType>;
  deletedByUserId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  deletedBy?: Resolver<Maybe<GqlResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  reportedFromUrl?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  resolved?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>;
  resolvedMessage?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  timestampId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  episodeId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  episode?: Resolver<Maybe<GqlResolversTypes['Episode']>, ParentType, ContextType>;
  episodeUrlString?: Resolver<Maybe<GqlResolversTypes['String']>, ParentType, ContextType>;
  episodeUrl?: Resolver<Maybe<GqlResolversTypes['EpisodeUrl']>, ParentType, ContextType>;
  showId?: Resolver<Maybe<GqlResolversTypes['ID']>, ParentType, ContextType>;
  show?: Resolver<Maybe<GqlResolversTypes['Show']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlMutationResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Mutation'] = GqlResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<GqlResolversTypes['LoginData'], ParentType, ContextType, RequireFields<GqlMutationCreateAccountArgs, 'username' | 'email' | 'passwordHash' | 'recaptchaResponse'>>;
  changePassword?: Resolver<GqlResolversTypes['LoginData'], ParentType, ContextType, RequireFields<GqlMutationChangePasswordArgs, 'oldPassword' | 'newPassword' | 'confirmNewPassword'>>;
  resendVerificationEmail?: Resolver<Maybe<GqlResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GqlMutationResendVerificationEmailArgs, 'recaptchaResponse'>>;
  verifyEmailAddress?: Resolver<GqlResolversTypes['Account'], ParentType, ContextType, RequireFields<GqlMutationVerifyEmailAddressArgs, 'validationToken'>>;
  requestPasswordReset?: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRequestPasswordResetArgs, 'recaptchaResponse' | 'email'>>;
  resetPassword?: Resolver<GqlResolversTypes['LoginData'], ParentType, ContextType, RequireFields<GqlMutationResetPasswordArgs, 'passwordResetToken' | 'newPassword' | 'confirmNewPassword'>>;
  deleteAccountRequest?: Resolver<GqlResolversTypes['Account'], ParentType, ContextType, RequireFields<GqlMutationDeleteAccountRequestArgs, 'passwordHash'>>;
  deleteAccount?: Resolver<GqlResolversTypes['Account'], ParentType, ContextType, RequireFields<GqlMutationDeleteAccountArgs, 'deleteToken'>>;
  savePreferences?: Resolver<GqlResolversTypes['Preferences'], ParentType, ContextType, RequireFields<GqlMutationSavePreferencesArgs, 'preferences'>>;
  createShow?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType, RequireFields<GqlMutationCreateShowArgs, 'showInput' | 'becomeAdmin'>>;
  updateShow?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType, RequireFields<GqlMutationUpdateShowArgs, 'showId' | 'newShow'>>;
  deleteShow?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType, RequireFields<GqlMutationDeleteShowArgs, 'showId'>>;
  createShowAdmin?: Resolver<GqlResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<GqlMutationCreateShowAdminArgs, 'showAdminInput'>>;
  deleteShowAdmin?: Resolver<GqlResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<GqlMutationDeleteShowAdminArgs, 'showAdminId'>>;
  createEpisode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType, RequireFields<GqlMutationCreateEpisodeArgs, 'showId' | 'episodeInput'>>;
  updateEpisode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType, RequireFields<GqlMutationUpdateEpisodeArgs, 'episodeId' | 'newEpisode'>>;
  deleteEpisode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType, RequireFields<GqlMutationDeleteEpisodeArgs, 'episodeId'>>;
  createEpisodeUrl?: Resolver<GqlResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<GqlMutationCreateEpisodeUrlArgs, 'episodeId' | 'episodeUrlInput'>>;
  deleteEpisodeUrl?: Resolver<GqlResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<GqlMutationDeleteEpisodeUrlArgs, 'episodeUrl'>>;
  updateEpisodeUrl?: Resolver<GqlResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<GqlMutationUpdateEpisodeUrlArgs, 'episodeUrl' | 'newEpisodeUrl'>>;
  createTimestamp?: Resolver<GqlResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<GqlMutationCreateTimestampArgs, 'episodeId' | 'timestampInput'>>;
  updateTimestamp?: Resolver<GqlResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<GqlMutationUpdateTimestampArgs, 'timestampId' | 'newTimestamp'>>;
  deleteTimestamp?: Resolver<GqlResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<GqlMutationDeleteTimestampArgs, 'timestampId'>>;
  updateTimestamps?: Resolver<GqlResolversTypes['UpdatedTimestamps'], ParentType, ContextType, RequireFields<GqlMutationUpdateTimestampsArgs, 'create' | 'update' | 'delete'>>;
  createTimestampType?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<GqlMutationCreateTimestampTypeArgs, 'timestampTypeInput'>>;
  updateTimestampType?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<GqlMutationUpdateTimestampTypeArgs, 'timestampTypeId' | 'newTimestampType'>>;
  deleteTimestampType?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<GqlMutationDeleteTimestampTypeArgs, 'timestampTypeId'>>;
  createTemplate?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType, RequireFields<GqlMutationCreateTemplateArgs, 'newTemplate'>>;
  updateTemplate?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType, RequireFields<GqlMutationUpdateTemplateArgs, 'templateId' | 'newTemplate'>>;
  deleteTemplate?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType, RequireFields<GqlMutationDeleteTemplateArgs, 'templateId'>>;
  addTimestampToTemplate?: Resolver<GqlResolversTypes['TemplateTimestamp'], ParentType, ContextType, RequireFields<GqlMutationAddTimestampToTemplateArgs, 'templateTimestamp'>>;
  removeTimestampFromTemplate?: Resolver<GqlResolversTypes['TemplateTimestamp'], ParentType, ContextType, RequireFields<GqlMutationRemoveTimestampFromTemplateArgs, 'templateTimestamp'>>;
  createApiClient?: Resolver<GqlResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<GqlMutationCreateApiClientArgs, 'client'>>;
  updateApiClient?: Resolver<GqlResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<GqlMutationUpdateApiClientArgs, 'id' | 'changes'>>;
  deleteApiClient?: Resolver<GqlResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<GqlMutationDeleteApiClientArgs, 'id'>>;
  addExternalLink?: Resolver<GqlResolversTypes['ExternalLink'], ParentType, ContextType, RequireFields<GqlMutationAddExternalLinkArgs, 'showId' | 'url'>>;
  removeExternalLink?: Resolver<GqlResolversTypes['ExternalLink'], ParentType, ContextType, RequireFields<GqlMutationRemoveExternalLinkArgs, 'showId' | 'url'>>;
  createUserReport?: Resolver<GqlResolversTypes['UserReport'], ParentType, ContextType, Partial<GqlMutationCreateUserReportArgs>>;
  resolveUserReport?: Resolver<GqlResolversTypes['UserReport'], ParentType, ContextType, RequireFields<GqlMutationResolveUserReportArgs, 'id'>>;
};

export type GqlQueryResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = {
  account?: Resolver<GqlResolversTypes['Account'], ParentType, ContextType>;
  login?: Resolver<GqlResolversTypes['LoginData'], ParentType, ContextType, RequireFields<GqlQueryLoginArgs, 'usernameEmail' | 'passwordHash'>>;
  loginRefresh?: Resolver<GqlResolversTypes['LoginData'], ParentType, ContextType, RequireFields<GqlQueryLoginRefreshArgs, 'refreshToken'>>;
  findUser?: Resolver<GqlResolversTypes['User'], ParentType, ContextType, RequireFields<GqlQueryFindUserArgs, 'userId'>>;
  findUserByUsername?: Resolver<GqlResolversTypes['User'], ParentType, ContextType, RequireFields<GqlQueryFindUserByUsernameArgs, 'username'>>;
  findShow?: Resolver<GqlResolversTypes['Show'], ParentType, ContextType, RequireFields<GqlQueryFindShowArgs, 'showId'>>;
  findShowsByExternalId?: Resolver<Array<GqlResolversTypes['Show']>, ParentType, ContextType, RequireFields<GqlQueryFindShowsByExternalIdArgs, 'service' | 'serviceId'>>;
  searchShows?: Resolver<Array<GqlResolversTypes['Show']>, ParentType, ContextType, RequireFields<GqlQuerySearchShowsArgs, 'search' | 'offset' | 'limit' | 'sort'>>;
  findShowAdmin?: Resolver<GqlResolversTypes['ShowAdmin'], ParentType, ContextType, RequireFields<GqlQueryFindShowAdminArgs, 'showAdminId'>>;
  findShowAdminsByShowId?: Resolver<Array<GqlResolversTypes['ShowAdmin']>, ParentType, ContextType, RequireFields<GqlQueryFindShowAdminsByShowIdArgs, 'showId'>>;
  findShowAdminsByUserId?: Resolver<Array<GqlResolversTypes['ShowAdmin']>, ParentType, ContextType, RequireFields<GqlQueryFindShowAdminsByUserIdArgs, 'userId'>>;
  recentlyAddedEpisodes?: Resolver<Array<GqlResolversTypes['Episode']>, ParentType, ContextType, RequireFields<GqlQueryRecentlyAddedEpisodesArgs, 'limit' | 'offset'>>;
  findEpisode?: Resolver<GqlResolversTypes['Episode'], ParentType, ContextType, RequireFields<GqlQueryFindEpisodeArgs, 'episodeId'>>;
  findEpisodesByShowId?: Resolver<Array<GqlResolversTypes['Episode']>, ParentType, ContextType, RequireFields<GqlQueryFindEpisodesByShowIdArgs, 'showId'>>;
  searchEpisodes?: Resolver<Array<GqlResolversTypes['Episode']>, ParentType, ContextType, RequireFields<GqlQuerySearchEpisodesArgs, 'search' | 'offset' | 'limit' | 'sort'>>;
  findEpisodeByName?: Resolver<Array<GqlResolversTypes['ThirdPartyEpisode']>, ParentType, ContextType, RequireFields<GqlQueryFindEpisodeByNameArgs, 'name'>>;
  findEpisodeUrl?: Resolver<GqlResolversTypes['EpisodeUrl'], ParentType, ContextType, RequireFields<GqlQueryFindEpisodeUrlArgs, 'episodeUrl'>>;
  findEpisodeUrlsByEpisodeId?: Resolver<Array<GqlResolversTypes['EpisodeUrl']>, ParentType, ContextType, RequireFields<GqlQueryFindEpisodeUrlsByEpisodeIdArgs, 'episodeId'>>;
  findTimestamp?: Resolver<GqlResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<GqlQueryFindTimestampArgs, 'timestampId'>>;
  findTimestampsByEpisodeId?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<GqlQueryFindTimestampsByEpisodeIdArgs, 'episodeId'>>;
  findTimestampType?: Resolver<GqlResolversTypes['TimestampType'], ParentType, ContextType, RequireFields<GqlQueryFindTimestampTypeArgs, 'timestampTypeId'>>;
  allTimestampTypes?: Resolver<Array<GqlResolversTypes['TimestampType']>, ParentType, ContextType>;
  findTemplate?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType, RequireFields<GqlQueryFindTemplateArgs, 'templateId'>>;
  findTemplatesByShowId?: Resolver<Array<GqlResolversTypes['Template']>, ParentType, ContextType, RequireFields<GqlQueryFindTemplatesByShowIdArgs, 'showId'>>;
  findTemplateByDetails?: Resolver<GqlResolversTypes['Template'], ParentType, ContextType, Partial<GqlQueryFindTemplateByDetailsArgs>>;
  myApiClients?: Resolver<Array<GqlResolversTypes['ApiClient']>, ParentType, ContextType, RequireFields<GqlQueryMyApiClientsArgs, 'offset' | 'limit' | 'sort'>>;
  findApiClient?: Resolver<GqlResolversTypes['ApiClient'], ParentType, ContextType, RequireFields<GqlQueryFindApiClientArgs, 'id'>>;
  counts?: Resolver<Maybe<GqlResolversTypes['TotalCounts']>, ParentType, ContextType>;
  findUserReports?: Resolver<Array<GqlResolversTypes['UserReport']>, ParentType, ContextType, RequireFields<GqlQueryFindUserReportsArgs, 'offset' | 'limit' | 'sort'>>;
  findUserReport?: Resolver<GqlResolversTypes['UserReport'], ParentType, ContextType, RequireFields<GqlQueryFindUserReportArgs, 'id'>>;
};

export type GqlLoginDataResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['LoginData'] = GqlResolversParentTypes['LoginData']> = {
  authToken?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<GqlResolversTypes['String'], ParentType, ContextType>;
  account?: Resolver<GqlResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GqlUpdatedTimestampsResolvers<ContextType = GqlContext, ParentType extends GqlResolversParentTypes['UpdatedTimestamps'] = GqlResolversParentTypes['UpdatedTimestamps']> = {
  created?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  deleted?: Resolver<Array<GqlResolversTypes['Timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GqlTimeScalarConfig extends GraphQLScalarTypeConfig<GqlResolversTypes['Time'], any> {
  name: 'Time';
}

export interface GqlUIntScalarConfig extends GraphQLScalarTypeConfig<GqlResolversTypes['UInt'], any> {
  name: 'UInt';
}

export type GqlResolvers<ContextType = GqlContext> = {
  BaseModel?: GqlBaseModelResolvers<ContextType>;
  Episode?: GqlEpisodeResolvers<ContextType>;
  ThirdPartyEpisode?: GqlThirdPartyEpisodeResolvers<ContextType>;
  EpisodeUrl?: GqlEpisodeUrlResolvers<ContextType>;
  Account?: GqlAccountResolvers<ContextType>;
  Preferences?: GqlPreferencesResolvers<ContextType>;
  Show?: GqlShowResolvers<ContextType>;
  ThirdPartyShow?: GqlThirdPartyShowResolvers<ContextType>;
  ShowAdmin?: GqlShowAdminResolvers<ContextType>;
  Timestamp?: GqlTimestampResolvers<ContextType>;
  ThirdPartyTimestamp?: GqlThirdPartyTimestampResolvers<ContextType>;
  TimestampType?: GqlTimestampTypeResolvers<ContextType>;
  User?: GqlUserResolvers<ContextType>;
  Template?: GqlTemplateResolvers<ContextType>;
  TemplateTimestamp?: GqlTemplateTimestampResolvers<ContextType>;
  ApiClient?: GqlApiClientResolvers<ContextType>;
  ExternalLink?: GqlExternalLinkResolvers<ContextType>;
  TotalCounts?: GqlTotalCountsResolvers<ContextType>;
  UserReport?: GqlUserReportResolvers<ContextType>;
  Mutation?: GqlMutationResolvers<ContextType>;
  Query?: GqlQueryResolvers<ContextType>;
  LoginData?: GqlLoginDataResolvers<ContextType>;
  UpdatedTimestamps?: GqlUpdatedTimestampsResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UInt?: GraphQLScalarType;
};

export type GqlDirectiveResolvers<ContextType = GqlContext> = {
  authenticated?: GqlAuthenticatedDirectiveResolver<any, any, ContextType>;
  optionalAuthenticated?: GqlOptionalAuthenticatedDirectiveResolver<any, any, ContextType>;
  hasRole?: GqlHasRoleDirectiveResolver<any, any, ContextType>;
  isShowAdmin?: GqlIsShowAdminDirectiveResolver<any, any, ContextType>;
};
