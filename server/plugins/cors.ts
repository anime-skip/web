import { createApp } from "@aklinker1/zeta";

const CORS_PATH = "/api";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Client-ID",
  "Access-Control-Expose-Headers": "X-Rate-Limit-Limit, X-Rate-Limit-Remaining, X-Rate-Limit-Reset",
};

export const corsPlugin = createApp()
  .onGlobalRequest(({ method, set, path }) => {
    if (!path.startsWith(CORS_PATH)) return;

    // Respond to preflight
    if (method === "OPTIONS") return new Response(null, { status: 200, headers: CORS_HEADERS });

    // Add headers to other requests
    Object.assign(set.headers, CORS_HEADERS);
  })
  .export();
