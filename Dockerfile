# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
ARG GITHUB_PACKAGES_TOKEN
COPY docker/.yarnrc.yml .yarnrc.yml
COPY .yarn .yarn
COPY package.json yarn.lock ./
RUN yarn install --immutable --skip-builds
COPY . .
RUN yarn build

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
