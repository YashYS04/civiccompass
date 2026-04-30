/**
 * Unit tests for utility functions in src/lib/utils.ts.
 * Covers: sanitizeInput, isValidPincode, checkRateLimit.
 *
 * Run with: npx jest tests/utils.test.ts
 */

import { sanitizeInput, isValidPincode, checkRateLimit } from '../src/lib/utils';

describe('sanitizeInput', () => {
  it('should strip HTML tags to prevent XSS', () => {
    const result = sanitizeInput('<script>alert("xss")</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('should enforce max length of 2000 characters', () => {
    const longInput = 'a'.repeat(3000);
    expect(sanitizeInput(longInput).length).toBe(2000);
  });

  it('should escape quotes', () => {
    expect(sanitizeInput('"test"')).toBe('&quot;test&quot;');
  });
});

describe('isValidPincode', () => {
  it('should accept valid 6-digit Indian PIN codes', () => {
    expect(isValidPincode('110001')).toBe(true);
    expect(isValidPincode('560034')).toBe(true);
  });

  it('should reject PIN codes starting with 0', () => {
    expect(isValidPincode('010001')).toBe(false);
  });

  it('should reject PIN codes with wrong length', () => {
    expect(isValidPincode('1234')).toBe(false);
    expect(isValidPincode('1234567')).toBe(false);
  });

  it('should reject non-numeric input', () => {
    expect(isValidPincode('abcdef')).toBe(false);
  });
});

describe('checkRateLimit', () => {
  it('should allow requests under the limit', () => {
    const ip = 'test-ip-1';
    expect(checkRateLimit(ip, 5, 60000)).toBe(true);
    expect(checkRateLimit(ip, 5, 60000)).toBe(true);
  });

  it('should block requests over the limit', () => {
    const ip = 'test-ip-2';
    for (let i = 0; i < 3; i++) {
      checkRateLimit(ip, 3, 60000);
    }
    expect(checkRateLimit(ip, 3, 60000)).toBe(false);
  });
});
