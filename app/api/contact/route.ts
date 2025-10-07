
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, company, subject, message } = body
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Dynamic import of prisma to avoid build-time errors
    const { prisma } = await import('@/lib/db')

    // Check if database is available
    if (!prisma) {
      console.error('Database not configured')
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Save contact form to database
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        company: company || null,
        subject,
        message,
        status: 'unread'
      }
    })

    return NextResponse.json({
      success: true,
      contactId: contactForm.id
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
