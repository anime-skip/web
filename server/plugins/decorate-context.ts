import { createApp } from "@aklinker1/zeta";
import { container } from "server/dependencies";

export const decorateContext = createApp()
  .decorate(container.resolveAll())
  .export();
