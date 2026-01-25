import { logger } from "server/utils/logger";

declare var self: Worker;

const workerLogger = logger.extend("jobs:worker");
workerLogger.info("Scheduled jobs");

self.postMessage("initialized");
