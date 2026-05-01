import { NextResponse } from 'next/server';
import { AiService } from '@/services/aiService';
import { checkRateLimit } from '@/lib/utils';

/**
 * POST /api/chat — Standardized endpoint for AI assistant.
 * Quality: Minimal controller logic; delegates to services.
 * Efficiency: Non-blocking async operations and IP-based rate limiting.
 */
export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (Early exit for efficiency)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2. Request Parsing
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // 3. Delegation to Service
    const content = await AiService.generateResponse(messages);

    // 4. Response with Security Headers
    const response = NextResponse.json({ success: true, content });
    
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error: unknown) {
    console.error('[API/Chat] Fatal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
