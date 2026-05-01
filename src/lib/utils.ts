/**
 * Utility functions for Civic Compass AI.
 * Provides input sanitization, validation, and a simple caching mechanism.
 */

/**
 * Sanitizes user input to prevent XSS and injection attacks.
 * Strips HTML-like characters and trims whitespace.
 * @param input Raw user input
 * @returns Sanitized string capped at 2000 characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 2000);
}

/**
 * Validates an Indian PIN code format.
 * Must be 6 digits and not start with zero.
 * @param pincode String representing the PIN code
 */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

/**
 * Simple in-memory rate limiter for API routes.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 20,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count++;
  return true;
}

/**
 * Simple Generic Cache for client-side optimizations.
 */
class SimpleCache<T> {
  private cache = new Map<string, { value: T; expiry: number }>();

  set(key: string, value: T, ttlMs: number = 300_000): void {
    this.cache.set(key, { value, expiry: Date.now() + ttlMs });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }
}

export const appCache = new SimpleCache<any>();
