import fs from 'fs'
import path from 'path'

let cached: string | null = null

/** Returns the Axion logo as a base64 data URI so it embeds reliably in email and PDF. */
export function getLogoDataUri(): string {
  if (cached) return cached
  try {
    const filePath = path.join(process.cwd(), 'public', 'quote-logo-v2.png')
    const buffer = fs.readFileSync(filePath)
    cached = `data:image/png;base64,${buffer.toString('base64')}`
    return cached
  } catch {
    // Fallback to a relative path if the file cannot be read
    return '/quote-logo.png'
  }
}
