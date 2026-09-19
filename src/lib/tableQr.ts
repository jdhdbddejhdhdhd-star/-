// Helper to generate deterministic or secure verification tokens for tables 1 to 100
// A customer cannot access the customer menu without a valid secret QR token matching the table.

const TABLE_SECRET_SALT = 'ITL_ALITALI_IQ_TABLE_2026_';

export function generateTableToken(tableNumber: string | number): string {
  const num = typeof tableNumber === 'string' ? parseInt(tableNumber, 10) : tableNumber;
  if (isNaN(num) || num < 1 || num > 100) {
    return '';
  }
  // Deterministic 10-char token based on table number + secret salt
  let hash = 0;
  const str = `${TABLE_SECRET_SALT}#${num}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(36).toUpperCase().padStart(6, '0');
  return `TAB${num}-${hex}`;
}

export function verifyTableToken(tableNumber: string | number, token: string): boolean {
  if (!token || !tableNumber) return false;
  const expected = generateTableToken(tableNumber);
  return token.trim() === expected.trim();
}

// Generate the exact direct URL for customer QR code scanning
export function getTableQRUrl(tableNumber: number, baseUrl?: string): string {
  const token = generateTableToken(tableNumber);
  const origin = baseUrl || window.location.origin;
  return `${origin}/customer?table=${tableNumber}&token=${token}`;
}
