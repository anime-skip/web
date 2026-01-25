export interface Alerter {
  notify(message: string): Promise<void>;
  notifyInThread(message: string, messages: string[]): Promise<void>;
}
