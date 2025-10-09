import { createApp } from "@aklinker1/zeta";

export const resolveIpAddress = createApp()
  .onTransform(({ headers }) => {
    return {
      ip: headers?.["x-forwarded-for"] ?? headers?.["x-real-ip"] ?? "",
    };
  })
  .export();
