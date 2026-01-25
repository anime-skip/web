import { logger } from "server/utils/logger";

const jobsLogger = logger.extend("jobs");

export function initJobs() {
  jobsLogger.info("Starting jobs worker...");
  const workerUrl = new URL("./index.worker.ts", import.meta.url);
  const worker = new Worker(workerUrl);

  worker.onmessage = (message) => {
    if (message.data === "initialized") jobsLogger.info("Worker initialized!");
    else jobsLogger.info("Message from worker:", message);
  };

  worker.onerror = (err) => {
    jobsLogger.error("Worker Error:", err);
  };
}
