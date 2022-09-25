# Anime Skip Website

This project uses Nuxt 3, Dasiy UI, Pinia, and Apollo for it's main libraries.

## Required Tools

- NodeJS
- `pnpm`: `npm i -g pnpm`
- Docker

## Start Local Server

Install dependencies, and then run the `dev` command:

```bash
pnpm install
pnpm dev
```

### Configuration

```env
# Use a specific URL when making API calls (defaults to prod as shown below)
NUXT_PUBLIC_API_URL=https://api.anime-skip.com/graphql
```
