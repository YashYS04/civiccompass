/**
 * ChatService — Handles all AI-related network requests.
 * Standardizes API communication and error handling.
 */
export const ChatService = {
  /**
   * Sends a list of messages to the backend AI proxy.
   * @param messages Full message history
   * @returns The assistant's response string
   */
  async getAiResponse(messages: { role: string; content: string }[]): Promise<string> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to communicate with AI service');
    }

    return data.content;
  }
};
