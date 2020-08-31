# web

This is the main website for <https://www.anime-skip.com>.

It uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) (object syntax) as the frontend framework, [Vuex](https://vuex.vuejs.org/) for state management, and [TypeScript](https://www.typescriptlang.org/) as the language.

## Project setup

Standard vue project setup. See the [Vue 3 getting started page](https://v3.vuejs.org/guide/introduction.html) for more info.

```bash
yarn install
# Run webpack and hot-reloader
yarn start

# Build a /dist directory for production
yarn build
# Lint the project
yarn lint
```

### Running Tests

Right now, there are no unit or end to end tests.

```
yarn test:unit
yarn test:e2e
```

### IDE Setup

All IDEs are supported, but I (Aaron) use VS Code. Make sure to install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plug-ins. A spell checker is also recommended.

This repo does have some shared vscode settings to make development easier.
