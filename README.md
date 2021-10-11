# web

This is the main website for <https://www.anime-skip.com>.

It uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) (object syntax) as the frontend framework, [Vuex](https://vuex.vuejs.org/) for state management, and [TypeScript](https://www.typescriptlang.org/) as the language.

## Project setup

Standard vue project setup. See the [Vue 3 getting started page](https://v3.vuejs.org/guide/introduction.html) for more info.

```bash
pnpm install
# Run webpack and hot-reloader
pnpm start

# Build a /dist directory for production
pnpm build
# Lint the project
pnpm lint
```

To run in a specific environment:

```bash
pnpm start # defaults to development
pnpm start -- --mode development
pnpm start -- --mode staged
pnpm start -- --mode production

pnpm build # default to production
pnpm build -- --mode development
pnpm build -- --mode staged
pnpm build -- --mode production
```

### Running Tests

Right now, there are no unit or end to end tests.

```
pnpm test:unit
pnpm test:e2e
```

### Visualizing Bundle Size

`pnpm build` will output a `stats.html`. Open it in the browser to see chunks and large modules

### IDE Setup

All IDEs are supported, but I (Aaron) use VS Code. Make sure to install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plug-ins. A spell checker is also recommended.

This repo does have some shared vscode settings to make development easier.
