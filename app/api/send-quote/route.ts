
import { NextRequest, NextResponse } from 'next/server'
import { generateQuoteEmail } from '@/lib/email-templates/quote-template'
import { sendEmail } from '@/lib/email'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = "force-dynamic"
export const runtime = 'nodejs'
export const maxDuration = 60

interface QuoteEmailData {
  quoteId: string
  clientName: string
  clientEmail: string
  companyName?: string
  projectName?: string
  service: string
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal: number
  tax?: number
  total: number
  validUntil: string
  notes?: string
  terms?: string
  attachments?: Array<{
    filename: string
    path: string // Path to file in the system
  }>
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteEmailData = await request.json()

    // Validate required fields
    if (!data.quoteId || !data.clientName || !data.clientEmail || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos (quoteId, clientName, clientEmail, items)' },
        { status: 400 }
      )
    }

    console.log(`📧 Sending quote ${data.quoteId} to ${data.clientEmail}`)

    // Generate the HTML email
    const emailHtml = generateQuoteEmail(data)

    // Prepare attachments if any
    const emailAttachments: Array<{ filename: string; content: Buffer }> = []
    
    if (data.attachments && data.attachments.length > 0) {
      for (const attachment of data.attachments) {
        try {
          const fileBuffer = await fs.readFile(attachment.path)
          emailAttachments.push({
            filename: attachment.filename,
            content: fileBuffer
          })
          console.log(`📎 Attached file: ${attachment.filename}`)
        } catch (fileError) {
          console.error(`❌ Error reading file ${attachment.filename}:`, fileError)
        }
      }
    }

    // Get Gmail user email from environment
    const gmailUser = process.env.GMAIL_USER || 'quote@axionmfg.net'

    // Send email using Gmail SMTP
    const emailResult = await sendEmail({
      to: data.clientEmail,
      bcc: gmailUser, // Send a copy to ourselves
      subject: `Cotización #${data.quoteId} - ${data.service}${data.projectName ? ` - ${data.projectName}` : ''}`,
      html: emailHtml,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined
    })

    console.log('✅ Quote email sent successfully:', emailResult)

    return NextResponse.json({
      success: true,
      quoteId: data.quoteId,
      emailId: emailResult.messageId || 'unknown',
      sentTo: data.clientEmail
    })

  } catch (error: any) {
    console.error('❌ Error sending quote email:', error)
    return NextResponse.json(
      { 
        error: 'Error al enviar la cotización',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
