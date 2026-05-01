import { aiClient, CIVIC_COMPASS_SYSTEM_PROMPT } from '@/lib/ai';
import { sanitizeInput } from '@/lib/utils';

/**
 * AiService — Backend service for interacting with Google Gemini.
 * Quality: Encapsulates model configuration and prompt engineering.
 * Efficiency: Uses the lightweight Gemini 2.5 Flash model and limits context history.
 */
export const AiService = {
  /**
   * Generates a response from Gemini based on history.
   * @param messages Sanitized message history
   */
  async generateResponse(messages: { role: string; content: string }[]): Promise<string> {
    if (!aiClient) return this.getMockResponse();

    // Prepare context: Only take last 5 turns to keep context window efficient
    const latestUserMessage = sanitizeInput(messages[messages.length - 1]?.content || '');
    const history = messages.slice(-5, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: sanitizeInput(m.content) }],
    }));

    try {
      const result = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...history, { role: 'user', parts: [{ text: latestUserMessage }] }],
        config: {
          systemInstruction: CIVIC_COMPASS_SYSTEM_PROMPT,
          temperature: 0.1,
        },
      });

      return result.text || 'I could not generate a response. Please try again.';
    } catch (error) {
      console.error('[AiService] Generation Error:', error);
      throw new Error('AI generation failed');
    }
  },

  /** Helper for fallback response */
  getMockResponse(): string {
    return "Namaste! I am in **mock mode**. Add your `GEMINI_API_KEY` to enable live AI guidance.";
  }
};
