import { createApp } from "@aklinker1/zeta";
import { container } from "server/dependencies";

export const decorateContext = createApp().decorate("deps", container.registrations).export();
