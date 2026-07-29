import { NextRequest, NextResponse } from 'next/server'
import { renderQuoteHtml, QuoteData } from '@/lib/quote-render'
import { getLogoDataUri } from '@/lib/quote-logo'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

interface SendBody extends QuoteData {
  pdfBase64?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: SendBody = await request.json()

    if (!data.quoteId || !data.clientName || !data.clientEmail || !data.items?.length) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (número de cotización, cliente, email o items).' },
        { status: 400 }
      )
    }

    const emailHtml = renderQuoteHtml(data, getLogoDataUri(), true)

    const attachments = data.pdfBase64
      ? [
          {
            filename: `Quote-${data.quoteId}.pdf`,
            content: Buffer.from(data.pdfBase64, 'base64'),
          },
        ]
      : undefined

    const sender = process.env.GMAIL_USER || 'quote@axionmfg.net'

    const info = await sendEmail({
      to: data.clientEmail,
      bcc: sender,
      subject: `Axion Manufacturing – Quote ${data.quoteId}${data.projectName ? ` – ${data.projectName}` : ''}`,
      html: emailHtml,
      attachments,
    })

    return NextResponse.json({
      success: true,
      quoteId: data.quoteId,
      messageId: info?.messageId || 'unknown',
      sentTo: data.clientEmail,
    })
  } catch (error: any) {
    console.error('❌ Error sending quote:', error)
    return NextResponse.json(
      { error: 'No se pudo enviar la cotización.', details: error?.message },
      { status: 500 }
    )
  }
}
