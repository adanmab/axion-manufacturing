import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { request_id } = await request.json()
    const statusResponse = await fetch(
      'https://apps.abacus.ai/api/getConvertHtmlToPdfStatus',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id,
          deployment_token: process.env.ABACUSAI_API_KEY,
        }),
      }
    )
    const statusResult = await statusResponse.json()
    const status = statusResult?.status || 'FAILED'
    const result = statusResult?.result || null

    if (status === 'SUCCESS') {
      if (result && result.result) {
        return NextResponse.json({ status, pdf_base64: result.result })
      }
      return NextResponse.json({ status: 'FAILED', error: 'PDF sin datos' })
    }
    if (status === 'FAILED') {
      return NextResponse.json({ status, error: result?.error || 'Falló la generación del PDF' })
    }
    return NextResponse.json({ status })
  } catch (error: any) {
    return NextResponse.json(
      { status: 'FAILED', error: error?.message || 'Error al consultar el PDF' },
      { status: 500 }
    )
  }
}
