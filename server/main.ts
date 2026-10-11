import { app } from "./app";
import { initJobs } from "./jobs/index.main";
import { initTelemetry } from "./utils/telemetry";

initTelemetry();
initJobs();

export default app;
