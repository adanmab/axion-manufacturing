import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_COOKIE = 'axion_admin_session'

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET is not configured')
  }
  return new TextEncoder().encode(secret)
}

/** Create a signed session token valid for 12 hours. */
export async function createAdminToken(username: string): Promise<string> {
  return await new SignJWT({ role: 'admin', username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(getSecret())
}

/** Verify a session token. Returns the payload or null when invalid/expired. */
export async function verifyAdminToken(token: string | undefined | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (payload?.role !== 'admin') return null
    return payload
  } catch {
    return null
  }
}
