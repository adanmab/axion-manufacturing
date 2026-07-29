import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, ADMIN_COOKIE } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const expectedUser = process.env.ADMIN_USERNAME
    const expectedPass = process.env.ADMIN_PASSWORD

    if (!expectedUser || !expectedPass) {
      return NextResponse.json(
        { error: 'El acceso no está configurado en el servidor.' },
        { status: 500 }
      )
    }

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos.' },
        { status: 401 }
      )
    }

    const token = await createAdminToken(username)
    const res = NextResponse.json({ success: true })
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    })
    return res
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al iniciar sesión.', details: error?.message },
      { status: 500 }
    )
  }
}
