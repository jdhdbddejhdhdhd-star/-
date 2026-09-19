/**
 * Web Security & Input Sanitization Layer
 * Protects against XSS, input poisoning, and malicious character injections.
 */

// Regular expressions for sanitization
const HTML_TAG_REGEX = /<[^>]*>?/gm;
const JAVASCRIPT_PROTOCOL_REGEX = /javascript:/gi;
const SAFE_TABLE_NUMBER_REGEX = /^[a-zA-Z0-9\u0621-\u064A\s\-_]{1,15}$/;

/**
 * Sanitizes arbitrary text input by stripping HTML tags and dangerous protocols.
 * Limits character length to prevent buffer/payload inflation attacks.
 */
export function sanitizeText(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(HTML_TAG_REGEX, '')
    .replace(JAVASCRIPT_PROTOCOL_REGEX, '')
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes table numbers, preventing injection of malicious path or ID strings.
 */
export function sanitizeTableNumber(input: unknown): string {
  if (typeof input !== 'string') return '1';
  const trimmed = input.trim().slice(0, 10);
  if (!SAFE_TABLE_NUMBER_REGEX.test(trimmed)) {
    // Strip non-alphanumeric/spaces
    const cleaned = trimmed.replace(/[^a-zA-Z0-9\u0621-\u064A]/g, '');
    return cleaned || '1';
  }
  return trimmed || '1';
}

/**
 * Validates and sanitizes monetary prices to guarantee positive finite numbers.
 */
export function sanitizePrice(price: unknown): number {
  const num = typeof price === 'number' ? price : Number(price);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.min(Math.round(num), 10_000_000); // 10 million IQD safety ceiling
}

/**
 * Validates and sanitizes order notes.
 */
export function sanitizeOrderNotes(notes: unknown): string {
  if (!notes) return '';
  return sanitizeText(notes, 300);
}
