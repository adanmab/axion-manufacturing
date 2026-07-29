import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, ADMIN_COOKIE } from '@/lib/admin-auth'

// Protect the private admin area and its APIs.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public exceptions inside the protected trees
  const isLoginPage = pathname === '/admin/login'
  const isLoginApi = pathname === '/api/admin/login'
  const isLogoutApi = pathname === '/api/admin/logout'

  if (isLoginPage || isLoginApi || isLogoutApi) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const payload = await verifyAdminToken(token)

  if (!payload) {
    // API routes: return 401 JSON
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    // Pages: redirect to login
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
