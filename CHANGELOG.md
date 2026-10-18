# Changelog

## v2.0.0-alpha.19

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.18...v2.0.0-alpha.19)

### 🩹 Fixes

- Error in `onGlobalAfterResponse` ([`f88c28f`](https://github.com/anime-skip/web/commit/f88c28fcb7fd3a8f3e16e9a1adfccd7ac70c24b9))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)


## v2.0.0-alpha.18

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.17...v2.0.0-alpha.18)

### 🚀 Features

- Update account (username + email) ([`ba4abb7`](https://github.com/anime-skip/web/commit/ba4abb7e8913bd3ef18a8306fa898390deb4035a))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.17

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.16...v2.0.0-alpha.17)

### 🩹 Fixes

- Fix email verified text and add check icon ([`9c0ea17`](https://github.com/anime-skip/web/commit/9c0ea17d25b259168e7fb7e53e6e084ea0549a4e))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.16

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.15...v2.0.0-alpha.16)

### 🩹 Fixes

- Use `anime-skip.com` instead of `www.anime-skip.com`, simplify verification email ([`74b4770`](https://github.com/anime-skip/web/commit/74b4770404793ea5487e1b5cd898d9c105cbd232))
- Use fallback profile icon ([`189c053`](https://github.com/anime-skip/web/commit/189c053b53892037e269242c7ba95df51830f94e))
- Add email verified text to account settings page ([`6938d87`](https://github.com/anime-skip/web/commit/6938d87acb76d1319a05c01ea632c8efbaed51c0))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.15

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.14...v2.0.0-alpha.15)

### 🚀 Features

- Add back email verification page ([`c822090`](https://github.com/anime-skip/web/commit/c822090d87c26ebde783f737be9fb20a1a665b92))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.14

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.13...v2.0.0-alpha.14)

### 🩹 Fixes

- Invalid mail headers causing emails to not send ([`43f3160`](https://github.com/anime-skip/web/commit/43f316020d19b6437e62191ad4cb006e5db7797e))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.13

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.12...v2.0.0-alpha.13)

### 🩹 Fixes

- Fix bad nodemailer logger ([`e14fb6a`](https://github.com/anime-skip/web/commit/e14fb6a6e98a18b8b8038691605de348ed06ad02))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.12

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.11...v2.0.0-alpha.12)

### 🩹 Fixes

- Fix issues sending emails due to improper binding ([`ed8c335`](https://github.com/anime-skip/web/commit/ed8c33565e68523baab77829900fa9a71c7d7263))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.11

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.10...v2.0.0-alpha.11)

### 🚀 Features

- Add `DATABASE_ENABLE_TLS` env var ([`0ffeeee`](https://github.com/anime-skip/web/commit/0ffeeee121b7c29447319db4e97b7f7acc2fe66e))

### 🩹 Fixes

- Throw 404 for `/api/*` ([`aac3134`](https://github.com/anime-skip/web/commit/aac31341224489ab73d67b93fbadf5e1b87bc279))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.10

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.9...v2.0.0-alpha.10)

### 🩹 Fixes

- Cleanup account settings layout ([`6edf296`](https://github.com/anime-skip/web/commit/6edf296655f0a9e027a69c0b4f4f19f02b5a1c63))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.9

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.8...v2.0.0-alpha.9)

## v2.0.0-alpha.8

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.7...v2.0.0-alpha.8)

### 🩹 Fixes

- Ignore blank strings when formatting season/episode number text ([`5f5839a`](https://github.com/anime-skip/web/commit/5f5839a9740aab8938613236aed66af3aca8eb3d))

### 🏡 Chore

- Fix localhost in prerendered output ([`003673b`](https://github.com/anime-skip/web/commit/003673bc0ec61dfdbf4267aeca8abcd1d5cddf09))
- Cleanup telemetry init ([`8a44569`](https://github.com/anime-skip/web/commit/8a44569dfbe5b620b31a0e0ffc1ecd96c33c467e))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.7

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.6...v2.0.0-alpha.7)

### 🏡 Chore

- Add otel spans to debug performance issues ([`59daf1f`](https://github.com/anime-skip/web/commit/59daf1fa4585db298f7de73efc938fdb8a384280))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.6

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.5...v2.0.0-alpha.6)

### 🩹 Fixes

- Fix dataloader query results order ([`2975ea7`](https://github.com/anime-skip/web/commit/2975ea7940ae28d6d7df28d676eb24c282a8ecd1))

### 🏡 Chore

- Fix lint ([`edcad88`](https://github.com/anime-skip/web/commit/edcad884c86a5a1fe63941bc9696e5ef33ae8bd7))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.5

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.4...v2.0.0-alpha.5)

### 🩹 Fixes

- Fix playground content type ([`8b41116`](https://github.com/anime-skip/web/commit/8b4111624ade3a7fc145ee02d6ad5d324e35d759))

### 🏡 Chore

- Fix lint ([`b46c0ea`](https://github.com/anime-skip/web/commit/b46c0ea5271e61248e474f365e8b69124c882e7b))

### 🤖 CI

- Upgrade runners to `ubuntu-26.04` ([`6a9fb9e`](https://github.com/anime-skip/web/commit/6a9fb9e757b44db8915cb4276d68db5efec9170e))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.4

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.3...v2.0.0-alpha.4)

### 🩹 Fixes

- Add back show admins to schema as deprecated to prevent breaking changes ([`9e87d30`](https://github.com/anime-skip/web/commit/9e87d30f8a737b764e667066eb2974c9c8a5acea))

### 🤖 CI

- Add back deploy webhook ([`24a4418`](https://github.com/anime-skip/web/commit/24a4418ddd5b309873cebd829f1c6b8dcf43ce3f))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.3

[compare changes](https://github.com/anime-skip/web/compare/v2.0.0-alpha.2...v2.0.0-alpha.3)

### 🩹 Fixes

- Remove default gql operation name ([`573d925`](https://github.com/anime-skip/web/commit/573d925c9f113ad5688c406cf6b0d2c97bed2627))

### 🏡 Chore

- Ignore changelog formatting ([`e5bf889`](https://github.com/anime-skip/web/commit/e5bf8895a6a714ef64e79802eb5938bc07492d4f))

### 🤖 CI

- Push `latest` tag during deploy ([`c97149e`](https://github.com/anime-skip/web/commit/c97149ea7a41298f37a922021d16b024b45582e9))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v2.0.0-alpha.2

### 🚀 Features

- Initial commit for backend rewrite ([`2d31287`](https://github.com/anime-skip/web/commit/2d31287a2a546f628fab2bdbbc34aa5d803b964f))
- Scaffold out and begin implementing graphql resolvers ([`01de9e5`](https://github.com/anime-skip/web/commit/01de9e5df9f1dda6fded557d923199430954875d))
- Basic landing page ([`a18112d`](https://github.com/anime-skip/web/commit/a18112d10a9ada4ad99e6891038d779c2f440288))
- Refactor App.vue into multiple components, implement rate limiting ([`80d04f8`](https://github.com/anime-skip/web/commit/80d04f8bfeaa009eebdc5367f4cafa057266fd89))
- Footer ([`082ba47`](https://github.com/anime-skip/web/commit/082ba47984a7099586dde048b95c2c26d223bf5a))
- Implement scalars ([`575601b`](https://github.com/anime-skip/web/commit/575601b13637aa8891307d7ca5d9bd94919591d6))
- Implement account resolvers ([`e27a2af`](https://github.com/anime-skip/web/commit/e27a2afe0fe98a28fb7ecc66c840344d7c8433ff))
- Implement all basic `getById` queries and field resolvers ([`e35a488`](https://github.com/anime-skip/web/commit/e35a488875ee53965efc88fb6e8c64c963362214))
- Implement basic field resolvers and queries ([`59e01d3`](https://github.com/anime-skip/web/commit/59e01d30e3811a28ca429ab8663f64b3d5bb2213))
- Implement basic mutations ([`60f11c2`](https://github.com/anime-skip/web/commit/60f11c2bcce40be1a61904159bd1ca4c06857fba))
- Implement send email functions ([`ca943ad`](https://github.com/anime-skip/web/commit/ca943ad4e15121cf541345b5dee579ccbe46160b))
- Implement optional auth directive ([`db05a1e`](https://github.com/anime-skip/web/commit/db05a1e5df91b3e8bb39bfa3d604fe73f4e456bb))
- Implement getRecentlyAddedEpisodes query ([`570c2ca`](https://github.com/anime-skip/web/commit/570c2ca0f495e3847a8ab9e6c70328063bc0ed66))
- Improve site performance (gzip, preloading, etc) ([`5858898`](https://github.com/anime-skip/web/commit/5858898a209c1693e43c5c616fe089b84abc646d))
- Re-implement rest of the UI ([`5af7aa8`](https://github.com/anime-skip/web/commit/5af7aa851719f90a7bd01eda7c124ab6f2b0114d))
- Implement basic delete functions ([`9a3875b`](https://github.com/anime-skip/web/commit/9a3875b3c7aefcb15459c34b37123a1f5b71e2be))
- Implement recursive deletes ([`38cd657`](https://github.com/anime-skip/web/commit/38cd6576f94e2fb09c71e802407698df38ce35c2))
- Implement utils for deleting users ([`9e51749`](https://github.com/anime-skip/web/commit/9e517498e8346433ed809ac82736b337f62de349))
- Implement the `deleteMyAccount` mutation. ([`bfdf615`](https://github.com/anime-skip/web/commit/bfdf615b5c5c741e0f506fd96ec835aff9d9b7d1))
- Implement `deleteAccount` mutation for admins ([`3dd4bd9`](https://github.com/anime-skip/web/commit/3dd4bd9e18fb2027ddfe74cca02dbbcf5584c12a))
- Enable the delete account button on your profile settings page ([`3507b87`](https://github.com/anime-skip/web/commit/3507b870b2bd4e827f1c94cb9e19d083de3b9bff))
- Implement remaining external link resolvers ([`38647cf`](https://github.com/anime-skip/web/commit/38647cf32bd20bc5eafdaa3f61343863dac65dfa))
- Implement remaining template resolvers ([`3f0c3c7`](https://github.com/anime-skip/web/commit/3f0c3c71de56054dc38ceaae2432eb3b4488cea2))
- Implement remaining user report resolvers ([`f1adc2e`](https://github.com/anime-skip/web/commit/f1adc2e2d4a19707f7373e5696f33e149978673c))
- Implement updateTimestamps mutation ([`3e71098`](https://github.com/anime-skip/web/commit/3e71098542aaa6768e5c71b47a34fa3a440ac4ae))
- Implement third party timestamp resolvers ([`e3caad2`](https://github.com/anime-skip/web/commit/e3caad247ab83bb9e1f0980568288c41d580a5ea))
- Implement third party episode services ([`ea8038c`](https://github.com/anime-skip/web/commit/ea8038cd8ca60b580bc67ae6a09bf07c46f8c598))
- Implement the `hasRole` directive ([`358863c`](https://github.com/anime-skip/web/commit/358863cebc7dd1aa5c983841994c860d1492f9ea))
- Implement final show resolvers ([`370f32d`](https://github.com/anime-skip/web/commit/370f32d8e98ef43003134e86174aaad18943f60b))
- Sync external links when creating show ([`dace3af`](https://github.com/anime-skip/web/commit/dace3af862fbf7ac10fc293e8409ad4cbad906fe))
- Basic alerter service ([`fcd0e70`](https://github.com/anime-skip/web/commit/fcd0e706897015744eb828eda04a1a17754aa4b4))
- Add back timestamp validation utils ([`b79df76`](https://github.com/anime-skip/web/commit/b79df769ad01ffe92aea484a8994257fe8cb07fb))
- Log query hash ([`b5dd0d3`](https://github.com/anime-skip/web/commit/b5dd0d3eae81af532966819bfd766faa51265789))
- Remove show admin support, enable CORS, script to review timestamps, ([`21aacea`](https://github.com/anime-skip/web/commit/21aacea3beec2b9928229fc5c657a17b156be4fd))
- Port anilist backfill and timestamp review jobs to TS ([`b918326`](https://github.com/anime-skip/web/commit/b91832643873613af9dff6d2cf2f588afa4153aa))
- Read env values from `*_FILE` files ([`a75fd7d`](https://github.com/anime-skip/web/commit/a75fd7d339639154dd2d66f95d52085903bd3409))
- Configure stmp hostname/port via env ([`3cc2918`](https://github.com/anime-skip/web/commit/3cc2918c719b4b9d3a5a50840fe7a7f8db625191))

### 🩹 Fixes

- More pixel pushing ([`531842f`](https://github.com/anime-skip/web/commit/531842f9a8f996ce1557d17d74951b6cb5f8c348))
- Implement episode source mapper ([`34d48f8`](https://github.com/anime-skip/web/commit/34d48f8af7b6f9b228b6660bf84374691234a76b))
- Fix padding on get-started page ([`ca9e545`](https://github.com/anime-skip/web/commit/ca9e5455b7e149885b6e67a1882ed9ea37a28b9a))
- Upgrade postgres deps and enable TLS ([`a00d063`](https://github.com/anime-skip/web/commit/a00d063f541661c2884ab2f335d319aa5d05d669))
- Cleanup buttons and main navigation component sizes ([`ca18f3f`](https://github.com/anime-skip/web/commit/ca18f3fe0c55b37fcdf7c45cdd3aa39dc93ac3c8))
- Add docs from v1, cleanup overall layout ([`f9ba268`](https://github.com/anime-skip/web/commit/f9ba26808b80977c22982fd19ee8d36f823d04db))
- **ui**: Make API client list look better on smaller screens ([`52d57f2`](https://github.com/anime-skip/web/commit/52d57f2ce87702607711519ba6bc362c47d27859))
- Return same info as old `/status` endpoint for `/api/health` ([`ff02537`](https://github.com/anime-skip/web/commit/ff02537fb97fcde7599074247ab37c4cc6036837))
- Fix layout widths ([`1bf4d94`](https://github.com/anime-skip/web/commit/1bf4d943365a6e35ae8650a36408ac17c2814240))
- Remove "isShowAdmin" and related code completely ([`ec3c4dd`](https://github.com/anime-skip/web/commit/ec3c4dd5b09533d72aed48c093e5e33ac759795d))
- Stub database while prerendering ([`25efb87`](https://github.com/anime-skip/web/commit/25efb87620fdc0bfcb95def4c09a7ef27fd3dc5f))

### 💅 Refactors

- Standardize with latest patterns ([`8f6317e`](https://github.com/anime-skip/web/commit/8f6317edea7a27cc5f80d5da105585a0891b676b))
- Parse env vars in helper modules ([`1832cdd`](https://github.com/anime-skip/web/commit/1832cddc8a36f7837ffe671245a2ff99b6bff2e9))
- Break app out into own file, boilerplate worker for jobs ([`55f0824`](https://github.com/anime-skip/web/commit/55f0824b506d385425ca110096d2182562485762))

### 📖 Documentation

- Add README.md ([`20d485a`](https://github.com/anime-skip/web/commit/20d485aa30e12f6e6494c1dfd142703826df7b1c))

### 🏡 Chore

- Fix build and dev scripts ([`a4df137`](https://github.com/anime-skip/web/commit/a4df1375592027ecfa3d606628adddbec3ed5997))
- Add tailwindcss ([`c68869e`](https://github.com/anime-skip/web/commit/c68869ee752d5ed07e64f0291f48a03d8657f6af))
- Naive SSR setup that doesn't work ([`ac1b24c`](https://github.com/anime-skip/web/commit/ac1b24ccffc9aa7f1c7b6dbd8dafc898c88ec054))
- Scaffold out the rest of the GQL resolvers and mappers ([`6ce0b05`](https://github.com/anime-skip/web/commit/6ce0b052be79efe71837e92a2edba8666dc2a301))
- Fix type errors ([`b0e1cde`](https://github.com/anime-skip/web/commit/b0e1cde71f069c555f6d4d109f74ad9b7109e57e))
- Fix lint ([`45368e9`](https://github.com/anime-skip/web/commit/45368e9eb011ee76645cdd5db1943489a8ce2859))
- Switch to bun ([`d0c574b`](https://github.com/anime-skip/web/commit/d0c574b40fa6cea6419b2f1433be56d347dc4196))
- Don't format generated files ([`5c1026b`](https://github.com/anime-skip/web/commit/5c1026bb9319c271d4ba76ac5b38ca65e1722e14))
- Update preview script env file ([`e72d6a4`](https://github.com/anime-skip/web/commit/e72d6a4db05774579b7996df337e352237f20abc))
- Refactor to using text file imports ([`ef5b3f6`](https://github.com/anime-skip/web/commit/ef5b3f67521c05bedf858845a3c0b40c810d0e4f))
- Migrate to use `@aklinker1\aframe` ([`5e6e582`](https://github.com/anime-skip/web/commit/5e6e582577c769d8be31f43ce34b3a4f8d5caab4))
- Upgrade to aframe 0.2.0 ([`e9318bb`](https://github.com/anime-skip/web/commit/e9318bb0d75df9491cc88a1c4cdefe7ea1d41de8))
- Refactor from oak to elysia ([`82e5213`](https://github.com/anime-skip/web/commit/82e5213006672b9b566dc2305dada784e8f72135))
- Break out routes and plugins to separate files ([`bbeaf33`](https://github.com/anime-skip/web/commit/bbeaf339e53e6c8869872bf5ef08d1484b15bcb1))
- Add missing `AS_RECAPTCHA_SECRET` env to template ([`e0ede1d`](https://github.com/anime-skip/web/commit/e0ede1da97e486eaff87458f8d8f0cc2da2a5330))
- Update logger padding to "-" ([`5edd30a`](https://github.com/anime-skip/web/commit/5edd30aed512c9108c0fa7f22939ccda98c38758))
- Add `@aklinker1/zero-ioc` ([`f9b0de6`](https://github.com/anime-skip/web/commit/f9b0de678aa011bb46a1c43b139353f68b2b58ec))
- Cleanup shared login code ([`1728b7b`](https://github.com/anime-skip/web/commit/1728b7bcbcaefe701dd1e2d4eb7029869589f862))
- Fix type errors ([`3142c19`](https://github.com/anime-skip/web/commit/3142c19f1a42eb8e83b25868daad92733f761a5a))
- Fix container class usage ([`3f745f3`](https://github.com/anime-skip/web/commit/3f745f3cf24607919d26e9ba03c47fabda1c3c48))
- Refactor to `@aklinker1/zeta` ([`be5c702`](https://github.com/anime-skip/web/commit/be5c7023721cfe83ecddddb791dd13f4a8867d12))
- Fix checks ([`4b0427f`](https://github.com/anime-skip/web/commit/4b0427f64a8df27a2c63b5f0a9a2c4ea7978227b))
- Throw "Not implemented" errors instead of "todo" in a few cases ([`354c05f`](https://github.com/anime-skip/web/commit/354c05f6b73b4c75341aff35e081239bd835a8f7))
- Fix checks ([`bc9d125`](https://github.com/anime-skip/web/commit/bc9d1259aff2b14230a1990379b319cac8281c40))
- Fix formatting ([`36ffef9`](https://github.com/anime-skip/web/commit/36ffef9749619e7a665a37b3328e0cb59dd34660))
- Move tool definitions to `.tool-versions` ([`da3451b`](https://github.com/anime-skip/web/commit/da3451b67ff3ddf6a8fd8a6bf6ad85134a4774d3))
- Use `@aklinker1/logger` ([`783cfd1`](https://github.com/anime-skip/web/commit/783cfd18954a612c5efc49ee41e7d59131c37594))
- Upgrade to bun 1.4.2 ([`0980bd9`](https://github.com/anime-skip/web/commit/0980bd97fa913e41c450fea6c5e654574527c905))
- Upgrade dependencies, use `oxfmt` ([`c2ad306`](https://github.com/anime-skip/web/commit/c2ad306304ebd152d68cc97e70a5926150cab5cc))
- Uncomment migration code, enable seeding, update env setup, update deps registration, remove old log level enum ([`333f607`](https://github.com/anime-skip/web/commit/333f6078316ce6f2592b4146b6483820f5e73eb2))
- Improve worker logs ([`3e3847e`](https://github.com/anime-skip/web/commit/3e3847e051a5fc0c6c8dddaa73f417ff1c709ac3))
- Format jsdoc ([`cbcebe4`](https://github.com/anime-skip/web/commit/cbcebe4b217327b51d5b4f185bb677ad5d5b55a5))
- Rename db service ([`8f86ce1`](https://github.com/anime-skip/web/commit/8f86ce1de6af597ce2e6dcd72576aaead83f6234))

### 🤖 CI

- Add docker files ([`32931f6`](https://github.com/anime-skip/web/commit/32931f69dcfe039d52e982cfdb0c2d00b6bbb23e))
- Add validation workflow ([`eed30e4`](https://github.com/anime-skip/web/commit/eed30e4d61bcbcf0e1d2e5ededbd60efecf171a9))
- Fix validation branch ([`ef25d9f`](https://github.com/anime-skip/web/commit/ef25d9f6305a9fe21b668462514acd8aeea24ebc))
- Upgrade actions ([`6da2ada`](https://github.com/anime-skip/web/commit/6da2ada1a328509bad2768435236f29c2fc8bc04))
- Update docker setup ([`af6e7b8`](https://github.com/anime-skip/web/commit/af6e7b86c4bbf373055dde53ddceeaa167763538))
- Don't compile binary ([`c53f49a`](https://github.com/anime-skip/web/commit/c53f49ac1f785eb642a197f2645f1852dda58460))
- Update deploy script ([`bd207d5`](https://github.com/anime-skip/web/commit/bd207d5b3c28fdf09dbecb5055cf0c9cc4813cd2))
- Update image name ([`9f7ca69`](https://github.com/anime-skip/web/commit/9f7ca69b104e4e5ad2b57f44fe67e7dc2099f92a))
- Disable deploy webhook ([`964dded`](https://github.com/anime-skip/web/commit/964ddedabf5100e93174cfed5e04e3f89efccef2))
- Add missing install step ([`b04e220`](https://github.com/anime-skip/web/commit/b04e2202708f97ec3fa31e259de02dd42fd34a15))
- Fix `bun-version-file` param ([`cd618b0`](https://github.com/anime-skip/web/commit/cd618b084e6cd50a160f702a49227464b151a7c9))

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)
