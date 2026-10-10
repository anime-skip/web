FROM oven/bun:1.4.3 AS base
WORKDIR /app

FROM base AS install
# Install all deps
RUN mkdir -p /temp/dev
WORKDIR /temp/dev
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
# Install prod deps
RUN mkdir -p /temp/prod
WORKDIR /temp/prod
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS build
# System libraries required by Chrome
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    ca-certificates unzip fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnss3 libx11-xcb1 \
    libxcomposite1 libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 \
    && rm -rf /var/lib/apt/lists/*
COPY package.json bun.lock ./
COPY --from=install /temp/dev/node_modules node_modules
# Install the exact Chrome version for the locked puppeteer version
RUN ./node_modules/.bin/puppeteer browsers install chrome
COPY . .
RUN bun run build
RUN rm -rf .output/node_modules

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /app/.output .
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server-entry.ts" ]
