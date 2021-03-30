# web

This is the main website for <https://www.anime-skip.com>.

It uses [Vue 3](https://v3.vuejs.org/guide/introduction.html) (object syntax) as the frontend framework, [Vuex](https://vuex.vuejs.org/) for state management, and [TypeScript](https://www.typescriptlang.org/) as the language.

## Project setup

### Setup Access to `@anime-skip/*` Libraries

Follow [this guide](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to setup a personal access token in GitHub, then generate your yarn settings in your home directory. Make sure to use your PAT for the `npmAuthToken` field:

```bash
echo "npmRegistries:
  //npm.pkg.github.com:
    npmAlwaysAuth: true
    npmAuthToken: <personal-access-token>
" > ~/.yarnrc.yml
```

### Running the App

```bash
# Install dependencies
yarn install

# Start the app at :3000
yarn start

# Build `dist/` folder
yarn build
```

<br />

## IDE Setup

All IDEs are supported, but I (Aaron) use VS Code. Make sure to install [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plug-ins. A [spell checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) is also recommended.

This repo has some shared vscode settings to make development easier.
