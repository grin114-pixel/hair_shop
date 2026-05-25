export async function hashPin(pin: string) {
  const normalized = pin.trim()
  const bytes = new TextEncoder().encode(normalized)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
  return hex
}
