FROM oven/bun:1.4.3-alpine
WORKDIR /app
COPY .output .
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server-entry.ts" ]
