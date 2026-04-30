/**
 * Integration tests for POST /api/chat.
 * Validates request validation, mock mode, and error handling.
 *
 * Run with: npx jest tests/api-chat.test.ts
 */

import { POST } from '../src/app/api/chat/route';

describe('POST /api/chat', () => {
  it('should return 400 for missing messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toContain('messages');
  });

  it('should return 400 for non-array messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: 'not an array' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('should return a mock response when no API key is set', async () => {
    // When GEMINI_API_KEY is not set, aiClient is null → mock mode
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'How do I vote?' }],
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    // Should succeed with a mock response (if no key is configured in test env)
    expect(response.status).toBe(200);
    expect(data.content).toBeDefined();
  });
});
