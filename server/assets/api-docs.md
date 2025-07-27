[GraphQL Playground](/api/playground) &bull; [Download OpenAPI Spec](/api/openapi.json)

&nbsp;

**Table of Contents:**

- [Overview](#description/overview)
- [Environments](#description/environments)
- [Client IDs](#description/client-ids)
- [User Authentication](#description/user-authentication)
- [GraphQL Endpoints](#tag/graphql-endpoints)
- [HTTP Endpoints](#tag/http-endpoints)
- [Models](#models)

&nbsp;

---

&nbsp;

## Overview

Welcome to the Anime Skip API! The API can be broken down into two parts:

1. [**GraphQL endpoints**](#tag/graphql-endpoints): Provide read/write access Anime Skip's data on shows, episodes, timestamps, accounts, and more.
2. [**HTTP endpoints**](#tag/http-endpoints): Handle anything GraphQL can't do (file uploads, serve dynamic images, etc).

It is unlikely you'll ever need to use the HTTP endpoints directly, but they are documented here if you need to do so.

Here's what your basic GraphQL request will look like:

```sh
curl 'http://localhost:3001/api/graphql' \
  -X POST \
  -H 'content-type: application/json' \
  -H 'X-Client-ID: {{SHARED_CLIENT_ID}}' \
  --data-raw '{
    "query": "query GetCounts {
      counts {
        episodes
        shows
        timestamps
      }
    }",
    "operationName": "GetCounts"
  }'
```

&nbsp;

---

&nbsp;

## Environments

There are two servers you can make requests to:

| Environment | URL                            |
| ----------- | ------------------------------ |
| Test        | http://test.anime-skip.com/api |
| Production  | http://anime-skip.com/api      |

### Test Environment

Start with using the test environment. It does not include any any production data, **including accounts and client IDs**.

To create an account in the test environment to test mutations that require authentication, you can create a user with the following query:

```gql
mutation {
  createAccount(
    username: "{{change-me}}"
    email: "{{change-me}}"
    passwordHash: "{{md5-hash-of-password}}"
    recaptchaResponse: "password1"
  ) {
    authToken
    refreshToken
    account {
      username
      email
    }
  }
}
```

### Production Environment

You cannot create users using the API in production, accounts must be created at https://anime-skip.com/sign-up.

&nbsp;

---

&nbsp;

## Client IDs

Most API endpoints requite a "client ID" be passed via the `X-Client-ID` header. This header is how the API know's what app is making the request and how it should be rate limited. Client IDs can be created from your [account settings](/account/api-clients).

Client IDs are not secrets, but you should avoid committing or sharing them unnecessarily. If someone gets ahold of yours, the requests they make will contribute to your rate limit.

If you're just trying out the API, you can use the shared client ID:

```
X-Client-ID: {{SHARED_CLIENT_ID}}
```

**This ID is heavily rate limited**, so you should create your own client ID if you're going to build something with Anime Skip.

&nbsp;

---

&nbsp;

## User Authentication

Some endpoints and GraphQL queries require user authorization, like for getting an account's preferences. It is passed in the `Authorization` header like so:

```
Authorization: Bearer {{authToken}}
```

To get an auth token, use the `login` or `loginRefresh` GraphQL queries:

```gql
{
  login(usernameEmail: "username-or-email", passwordHash: "md5-of-password") {
    authToken
    refreshToken
  }
}
```
