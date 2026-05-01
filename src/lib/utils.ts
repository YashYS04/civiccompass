/**
 * Utility functions for Civic Compass AI.
 * Provides input sanitization, validation, and a memory-efficient caching mechanism.
 */

/**
 * Sanitizes user input to prevent XSS and injection attacks.
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
 * Validates an Indian PIN code format (6 digits, first digit 1-9).
 */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

/**
 * In-memory rate limiter tracker.
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
 * Memory-Efficient Generic Cache with Least Recently Used (LRU) like behavior.
 * Prevents unbound memory growth.
 */
class SimpleCache<T> {
  private cache = new Map<string, { value: T; expiry: number }>();
  private readonly MAX_SIZE = 50; // Keep memory footprint small

  set(key: string, value: T, ttlMs: number = 300_000): void {
    // Basic cleanup if cache gets too large
    if (this.cache.size >= this.MAX_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
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
