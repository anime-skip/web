import { createLogger } from "@aklinker1/logger";

const logger = createLogger("jobs");

export function initJobs() {
  logger.info("Starting jobs worker");
  const workerUrl = new URL("./index.worker.ts", import.meta.url);
  const worker = new Worker(workerUrl);

  worker.onmessage = (message) => {
    if (message.data === "initialized") logger.info("Worker initialized!");
    else logger.info("Worker message", { message });
  };

  worker.onerror = (error) => {
    logger.error("Worker error", { error });
  };
}
