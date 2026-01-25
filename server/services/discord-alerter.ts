import { env } from "server/env";
import type { Alerter } from "./alerter";

export function createDiscordAlerter(): Alerter {
  const botToken = `Bot ${env.DISCORD_BOT_TOKEN}`;
  const channelId = env.DISCORD_ALERTS_CHANNEL_ID;

  async function sendMessage(
    channelId: string,
    content: string,
  ): Promise<{ id: string }> {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: botToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to send Discord message: ${response.statusText}`);
    }

    return response.json();
  }

  async function createThread(
    channelId: string,
    messageId: string,
    threadName: string,
  ): Promise<{ id: string }> {
    const archiveAfterMinutes = 7 * 24 * 60; // 7 days in minutes

    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}/threads`,
      {
        method: "POST",
        headers: {
          Authorization: botToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: threadName,
          auto_archive_duration: archiveAfterMinutes,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to create Discord thread: ${response.statusText}`,
      );
    }

    return response.json();
  }

  return {
    async notify(message: string): Promise<void> {
      await sendMessage(channelId, message);
    },

    async notifyInThread(message: string, messages: string[]): Promise<void> {
      const initialMessage = await sendMessage(channelId, message);
      const thread = await createThread(
        channelId,
        initialMessage.id,
        `Thread ${new Date().toISOString()}`,
      );

      for (const msg of messages) {
        await sendMessage(thread.id, msg);
        // Rate limiting - wait 1 second between messages
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
  };
}
