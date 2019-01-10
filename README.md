# anime-skip-web

Website for [Anime Skipper](). Manage your account and better control your contributions.

## Setup

```bash
git clone https://github.com/aklinker1/anime-skip-web.git
cd anime-skip-web
yarn
yarn start:dev
```

If you are developing the full stack as well, set them up with the following structure:

```bash
anime-skip/
  backend/
  web/
  chrome-extension/
```

## Project Structure

- `public/` - The static file directory, nothing here should be referenced from the src directory
- `src/` - All the source code
  - `assets/` - All assets used by components
  - `components/` - All small/reusable components
  - `pages/` - All the root components for a given URL
  - `utils/` - Any utility functions or constants
- `tests/` - All the tests for the project

## Other Notes

- All `import`s in components should use the `@/*` notation. 
  - The `@` is the root of the project (where the `package.json` is located).
  - This is a Vue thing. Even if it works with relative paths, do this.
- For developing Vue, use VSCode and [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
