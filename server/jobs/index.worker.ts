import { createLogger } from "@aklinker1/logger";

declare var self: Worker;

const logger = createLogger("worker");
logger.info("Scheduled jobs");

self.postMessage("initialized");
