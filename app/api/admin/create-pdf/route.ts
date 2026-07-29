import { NextRequest, NextResponse } from 'next/server'
import { renderQuoteHtml, QuoteData } from '@/lib/quote-render'
import { getLogoDataUri } from '@/lib/quote-logo'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const data: QuoteData = await request.json()
    const html = renderQuoteHtml(data, getLogoDataUri(), false)

    const createResponse = await fetch(
      'https://apps.abacus.ai/api/createConvertHtmlToPdfRequest',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          html_content: html,
          pdf_options: {
            format: 'A4',
            print_background: true,
            margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
          },
        }),
      }
    )

    if (!createResponse.ok) {
      const err = await createResponse.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, error: err.error || 'No se pudo crear el PDF' },
        { status: 500 }
      )
    }

    const { request_id } = await createResponse.json()
    if (!request_id) {
      return NextResponse.json(
        { success: false, error: 'No se recibió el identificador del PDF' },
        { status: 500 }
      )
    }
    return NextResponse.json({ success: true, request_id })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error al generar el PDF' },
      { status: 500 }
    )
  }
}
