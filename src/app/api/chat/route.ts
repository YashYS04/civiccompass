import { NextResponse } from 'next/server';
import { aiClient, CIVIC_COMPASS_SYSTEM_PROMPT } from '@/lib/ai';
import { sanitizeInput, checkRateLimit } from '@/lib/utils';

/**
 * POST /api/chat
 * Handles AI chat requests. Validates input, applies rate limiting,
 * sanitizes user messages, and forwards them to Google Gemini.
 */
export async function POST(req: Request) {
  try {
    // --- Rate Limiting ---
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // --- Input Validation ---
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    // --- Mock Mode (No API Key) ---
    if (!aiClient) {
      return NextResponse.json({
        role: 'model',
        content:
          "Namaste! I am Civic Compass AI running in **mock mode**. Please add your `GEMINI_API_KEY` to `.env.local` to enable full intelligence. How can I help you understand India's voting process today?",
      });
    }

    // --- Sanitize & Format Messages for Gemini ---
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: sanitizeInput(msg.content) }],
    }));

    const latestMessage = sanitizeInput(messages[messages.length - 1].content);

    // --- Call Gemini API ---
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...history, { role: 'user', parts: [{ text: latestMessage }] }],
      config: {
        systemInstruction: CIVIC_COMPASS_SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for factual, grounded answers
      },
    });

    // --- Security Headers on Response ---
    const res = NextResponse.json({
      role: 'model',
      content: response.text || 'Sorry, I could not generate a response.',
    });
    res.headers.set('X-Content-Type-Options', 'nosniff');
    return res;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Chat API Error:', message);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
