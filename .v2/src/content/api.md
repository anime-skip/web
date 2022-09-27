# API Documentation

Anime Skip's  API uses [GraphQL](https://graphql.org/). Here's an example query:

```graphql
{
  searchShows(search: "spider", limit: 10) {
    id
    name
    originalName
  }
}
```

Here's an example cURL request for that query:

```shell
curl --request POST \
  --url https://api.anime-skip.com/graphql \
  --header 'content-type: application/json' \
  --header 'x-client-id: ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE' \
  --data '{"query":"{ searchShows(search: \"spider\", limit: 10) { id name originalName } }"}'
```

There are two API environments:

|  | GraphQL Endpoint | Playground URL |
| --- | --- | --- |
| Test | <http://test.api.anime-skip.com/graphql> | <http://test.api.anime-skip.com> |
| Production | <https://api.anime-skip.com/graphql> | <https://api.anime-skip.com> |

## Get Started

Head over to the [test environment's playground](http://test.api.anime-skip.com) to try out the API and view the documentation in the "Docs" side menu.

If you're ready to use the API in your own app, please start out in the test environment. Once you've worked out the kinks, feel free to switch to the production environment! 

### Client IDs

To use the API, and client ID is required. You can use a shared client ID to get started:

```
X-Client-ID: ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE
```

It is heavily rate limitted and not suited for use in production. Pass the ID in the `X-Client-ID` header. To create a client ID, use the `createApiClient` mutation:

```graphql
mutation($client: CreateApiClient!) {
  createApiClient(client: $client) {	
    id
  }
}
```
```json
// Variables
{
  "client": {
    "appName": "<client-app-name>",
    "description": "<client-app-description>"
  }
}
```

### Authorization

Some queries and all mutations require authorization. Pass authorization in the `Authorization` header like so:

```
Authorization: Bearer <authToken>
```

To get an auth token, use the `login` or `loginRefresh` queries:

```graphql
{
  login(
    usernameEmail: "<username-or-email>",
    passwordHash: "<md5-of-password>"
  ) {
    authToken
    refreshToken
  }
}
```

### Test Environment

Start with using the test environment. It does not include any any production data, including accounts and client IDs.

To create an account in the test environment to test mutations that require authentication, you can create a user with the following query:

```graphql
mutation {
  createAccount(
    username: "<change-me>",
    email: "<change-me>",
    passwordHash: "<md5-hash-of-password>",
    recaptchaResponse: "password1",
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

You cannot create users using the API in production, accounts must be created at <https://anime-skip.com/sign-up>.
