
'use client'

import { useState } from 'react'
import { generateQuoteEmail } from '@/lib/email-templates/quote-template'
import { exampleQuoteData } from '@/lib/email-templates/quote-example'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function QuotePreviewPage() {
  const [emailHtml, setEmailHtml] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const generatePreview = () => {
    const html = generateQuoteEmail(exampleQuoteData)
    setEmailHtml(html)
    setShowPreview(true)
  }

  const sendTestEmail = async () => {
    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exampleQuoteData)
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`✅ Email de prueba enviado exitosamente a ${result.sentTo}`)
      } else {
        alert(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      alert('❌ Error al enviar el email de prueba')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-900">
              📧 Plantilla de Cotización Profesional
            </CardTitle>
            <CardDescription className="text-lg">
              Vista previa de la plantilla de email para enviar cotizaciones a clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={generatePreview}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                🔍 Ver Vista Previa
              </Button>
              <Button 
                onClick={sendTestEmail}
                variant="outline"
                size="lg"
              >
                📨 Enviar Email de Prueba
              </Button>
              <Button 
                onClick={() => window.open('/api/send-quote', '_blank')}
                variant="outline"
                size="lg"
              >
                📖 Ver Documentación API
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Información:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Esta plantilla se genera dinámicamente con los datos de la cotización</li>
                <li>• Incluye logo de Axion Manufacturing, items detallados, totales y términos</li>
                <li>• Los emails se envían usando Resend desde quote@axionmfg.net</li>
                <li>• Se envía una copia (BCC) a quote@axionmfg.net para archivo</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {showPreview && (
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa del Email</CardTitle>
              <CardDescription>
                Así es como se verá el email que recibirán tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <iframe
                  srcDoc={emailHtml}
                  className="w-full"
                  style={{ height: '800px' }}
                  title="Vista previa del email"
                />
              </div>
              
              <div className="mt-4 flex gap-4">
                <Button
                  onClick={() => {
                    const blob = new Blob([emailHtml], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'plantilla-cotizacion.html'
                    a.click()
                  }}
                  variant="outline"
                >
                  💾 Descargar HTML
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(emailHtml)
                    alert('✅ HTML copiado al portapapeles')
                  }}
                  variant="outline"
                >
                  📋 Copiar HTML
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Cómo Usar esta Plantilla</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">1. Usar la API /api/send-quote</h4>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`fetch('/api/send-quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    quoteId: 'QT-2025-001',
    clientName: 'Juan Pérez',
    clientEmail: 'cliente@ejemplo.com',
    service: 'CNC Machining',
    items: [{
      description: 'Pieza CNC',
      quantity: 100,
      unitPrice: 45.50,
      total: 4550.00
    }],
    subtotal: 4550.00,
    total: 4550.00,
    validUntil: '30 de Noviembre, 2025'
  })
})`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">2. Generar HTML Manualmente</h4>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import { generateQuoteEmail } from '@/lib/email-templates/quote-template'

const html = generateQuoteEmail({
  // ... datos de la cotización
})`}
                </pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Requisitos:</h4>
                <ul className="text-yellow-800 space-y-1">
                  <li>• RESEND_API_KEY configurado en .env</li>
                  <li>• Dominio quote@axionmfg.net verificado en Resend</li>
                  <li>• Todos los campos requeridos deben estar presentes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
