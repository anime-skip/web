# base image
FROM node:lts-alpine as pnpm-lts-alpine
RUN npm i -g pnpm

# build stage
FROM pnpm-lts-alpine as build-stage
WORKDIR /app
ARG GITHUB_PACKAGES_TOKEN
ARG MODE=production
COPY docker/.npmrc .npmrc
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build -- --mode ${MODE}

# production stage
FROM nginx:stable-alpine as production-stage
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

COPY docker/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
