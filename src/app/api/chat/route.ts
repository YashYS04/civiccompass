import { NextResponse } from 'next/server';
import { aiClient, CIVIC_COMPASS_SYSTEM_PROMPT } from '@/lib/ai';
import { sanitizeInput, checkRateLimit } from '@/lib/utils';

/**
 * Standard API response interface for consistent frontend consumption.
 */
interface ApiResponse {
  success: boolean;
  content?: string;
  error?: string;
}

/**
 * POST /api/chat — Intelligent assistant endpoint.
 * Implements sanitization, rate limiting, and Gemini inference.
 */
export async function POST(req: Request) {
  const timestamp = new Date().toISOString();
  
  try {
    // 1. Efficiency: Early exit if rate limit exceeded
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      console.warn(`[${timestamp}] Rate limit hit: ${ip}`);
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    // 2. Input Parsing & Validation
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Malformed request: messages array required.' },
        { status: 400 }
      );
    }

    // 3. Code Quality: Graceful fallback for missing infrastructure
    if (!aiClient) {
      console.log(`[${timestamp}] Gemini Client not initialized. Mocking response.`);
      return NextResponse.json<ApiResponse>({
        success: true,
        content: "Namaste! I am in **mock mode** because the `GEMINI_API_KEY` is not set. Please add it to your environment to enable AI guidance.",
      });
    }

    // 4. Efficiency: Prepare context for Gemini
    // We sanitize only the latest message and context to prevent overhead
    const latestUserMessage = sanitizeInput(messages[messages.length - 1]?.content || '');
    const contextHistory = messages.slice(-5, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: sanitizeInput(m.content) }],
    }));

    // 5. Performance: Async generation
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...contextHistory, { role: 'user', parts: [{ text: latestUserMessage }] }],
      config: {
        systemInstruction: CIVIC_COMPASS_SYSTEM_PROMPT,
        temperature: 0.1, // Low temperature for higher factual grounding
        topP: 0.95,
      },
    });

    const aiText = response.text || "I apologize, I couldn't generate an answer. Please try rephrasing.";

    // 6. Security & Efficiency: Standard response with security headers
    const res = NextResponse.json<ApiResponse>({
      success: true,
      content: aiText,
    });

    // Add explicit headers for browser security
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Cache-Control', 'no-store, max-age=0');

    return res;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown server error';
    console.error(`[${timestamp}] Chat API Error:`, errorMsg);
    
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal Server Error. Please check logs.' },
      { status: 500 }
    );
  }
}
