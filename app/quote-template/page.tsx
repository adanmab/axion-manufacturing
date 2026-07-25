
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function QuoteTemplatePage() {
  const [formData, setFormData] = useState({
    quoteId: 'QT-' + Date.now(),
    clientName: '',
    clientEmail: '',
    companyName: '',
    projectName: '',
    service: '',
    // Items array
    items: [
      { description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    // Totals
    subtotal: 0,
    taxRate: 0,
    tax: 0,
    total: 0,
    // Additional info
    validUntil: '',
    deliveryTime: '',
    paymentTerms: '50% anticipo, 50% contra entrega',
    notes: '',
  })

  const [generatedHtml, setGeneratedHtml] = useState('')

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    })
  }

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
    calculateTotals(newItems)
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    // Calculate item total
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
    }
    
    setFormData({ ...formData, items: newItems })
    calculateTotals(newItems)
  }

  const calculateTotals = (items: any[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * (formData.taxRate / 100)
    const total = subtotal + tax
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }))
  }

  const generateTemplate = () => {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización ${formData.quoteId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <img src="https://i.pinimg.com/736x/6d/03/f7/6d03f7df5b105d6e8d65404354c52a50.jpg" alt="Axion Manufacturing" style="height: 60px; margin-bottom: 20px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Cotización</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">ID: #${formData.quoteId}</p>
            </td>
          </tr>

          <!-- Client Information -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align: top;">
                    <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Para:</h3>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600; line-height: 1.6;">
                      ${formData.clientName}
                    </p>
                    ${formData.companyName ? `<p style="margin: 5px 0 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">${formData.companyName}</p>` : ''}
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      ${formData.clientEmail}
                    </p>
                  </td>
                  <td width="50%" style="vertical-align: top; text-align: right;">
                    <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">De:</h3>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600; line-height: 1.6;">
                      Axion Manufacturing
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      Premium Manufacturing Services
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      quote@axionmfg.net
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${formData.projectName ? `
          <!-- Project Information -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Proyecto:</h3>
                <p style="margin: 0; color: #1e3a8a; font-size: 18px; font-weight: 600;">${formData.projectName}</p>
                ${formData.service ? `<p style="margin: 5px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 500;">${formData.service}</p>` : ''}
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                    <th style="padding: 15px; text-align: left; color: #374151; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Descripción</th>
                    <th style="padding: 15px; text-align: center; color: #374151; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Cantidad</th>
                    <th style="padding: 15px; text-align: right; color: #374151; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Precio Unit.</th>
                    <th style="padding: 15px; text-align: right; color: #374151; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${formData.items.map((item) => `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                      <td style="padding: 20px 15px; color: #1f2937; font-size: 15px; line-height: 1.5;">
                        ${item.description}
                      </td>
                      <td style="padding: 20px 15px; text-align: center; color: #4b5563; font-size: 15px; font-weight: 500;">
                        ${item.quantity}
                      </td>
                      <td style="padding: 20px 15px; text-align: right; color: #4b5563; font-size: 15px; font-weight: 500;">
                        $${item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </td>
                      <td style="padding: 20px 15px; text-align: right; color: #1f2937; font-size: 16px; font-weight: 600;">
                        $${item.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="60%"></td>
                  <td width="40%">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 15px;">Subtotal:</td>
                        <td style="padding: 8px 0; text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                          $${formData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                      ${formData.tax > 0 ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 15px;">Tax (${formData.taxRate}%):</td>
                        <td style="padding: 8px 0; text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                          $${formData.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                      ` : ''}
                      <tr style="border-top: 2px solid #e5e7eb;">
                        <td style="padding: 15px 0 0 0; color: #1e3a8a; font-size: 18px; font-weight: 700;">Total:</td>
                        <td style="padding: 15px 0 0 0; text-align: right; color: #1e3a8a; font-size: 22px; font-weight: 700;">
                          $${formData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery and Payment Info -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-right: 10px;">
                      <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⏰ Tiempo de Entrega:</p>
                      <p style="margin: 5px 0 0 0; color: #b45309; font-size: 15px; font-weight: 600;">${formData.deliveryTime || 'Por definir'}</p>
                    </td>
                    <td width="50%" style="padding-left: 10px;">
                      <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📅 Válida Hasta:</p>
                      <p style="margin: 5px 0 0 0; color: #b45309; font-size: 15px; font-weight: 600;">${formData.validUntil || 'Por definir'}</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 5px 0; color: #065f46; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">💳 Términos de Pago:</p>
                <p style="margin: 0; color: #047857; font-size: 15px; font-weight: 500;">${formData.paymentTerms}</p>
              </div>
            </td>
          </tr>

          ${formData.notes ? `
          <!-- Notes -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">📝 Notas Importantes:</h3>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${formData.notes}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Terms and Conditions -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <h3 style="color: #374151; margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">📋 Términos y Condiciones:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 13px; line-height: 1.8;">
                  <li>Esta cotización es válida por el periodo indicado</li>
                  <li>Los precios están en dólares americanos (USD)</li>
                  <li>Se requiere anticipo para iniciar producción</li>
                  <li>Los tiempos de entrega comienzan después de la aprobación del diseño</li>
                  <li>Costos de envío no incluidos</li>
                  <li>Garantía de 90 días contra defectos de fabricación</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                ¿Tienes preguntas sobre esta cotización? Estamos aquí para ayudarte.
              </p>
              <a href="mailto:quote@axionmfg.net" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                Confirmar Cotización
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #1f2937; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                Axion Manufacturing
              </p>
              <p style="margin: 0 0 15px 0; color: #9ca3af; font-size: 13px; line-height: 1.6;">
                Premium Manufacturing Services<br>
                📧 quote@axionmfg.net | 🌐 axionmfg.net
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                © ${new Date().getFullYear()} Axion Manufacturing. Todos los derechos reservados.<br>
                Fabricación de precisión CNC, impresión 3D, corte láser y manufactura de metal.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    setGeneratedHtml(html)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml)
    alert('✅ HTML copiado al portapapeles! Ahora puedes pegarlo en tu email.')
  }

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Cotizacion-${formData.quoteId}.html`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-900">
              📝 Generador de Cotización
            </CardTitle>
            <CardDescription className="text-lg">
              Llena los datos y genera una cotización profesional lista para enviar por email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Client Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4 text-lg">👤 Información del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nombre del Cliente *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email del Cliente *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Empresa (opcional)</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <Label htmlFor="projectName">Nombre del Proyecto (opcional)</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Fabricación de Componentes"
                  />
                </div>
              </div>
            </div>

            {/* Quote Info */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-4 text-lg">📋 Información de la Cotización</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quoteId">ID de Cotización</Label>
                  <Input
                    id="quoteId"
                    value={formData.quoteId}
                    onChange={(e) => setFormData({ ...formData, quoteId: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="service">Servicio</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="CNC Machining"
                  />
                </div>
                <div>
                  <Label htmlFor="validUntil">Válida Hasta</Label>
                  <Input
                    id="validUntil"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    placeholder="30 de Noviembre, 2025"
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime">Tiempo de Entrega</Label>
                  <Input
                    id="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    placeholder="3-4 semanas"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="paymentTerms">Términos de Pago</Label>
                  <Input
                    id="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-green-900 text-lg">🛠️ Items de la Cotización</h3>
                <Button onClick={addItem} variant="outline" size="sm">
                  + Agregar Item
                </Button>
              </div>
              
              {formData.items.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg mb-3 border border-green-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-semibold text-gray-700">Item {index + 1}</span>
                    {formData.items.length > 1 && (
                      <Button 
                        onClick={() => removeItem(index)} 
                        variant="destructive" 
                        size="sm"
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2">
                      <Label>Descripción</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Descripción detallada del item"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Cantidad</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label>Precio Unitario (USD)</Label>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm text-gray-600">Total: </span>
                    <span className="font-bold text-lg text-green-700">
                      ${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                    </span>
                  </div>
                </div>
              ))}

              {/* Totals Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-300 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-lg">${formData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Tax:</span>
                    <Input
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => {
                        const rate = parseFloat(e.target.value) || 0
                        const tax = formData.subtotal * (rate / 100)
                        setFormData({ ...formData, taxRate: rate, tax, total: formData.subtotal + tax })
                      }}
                      className="w-20 h-8"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="text-gray-700">%</span>
                  </div>
                  <span className="font-semibold text-lg">${formData.tax.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-2 border-blue-400">
                  <span className="text-blue-900 font-bold text-lg">TOTAL:</span>
                  <span className="font-bold text-2xl text-blue-900">${formData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-4 text-lg">📝 Notas Adicionales (opcional)</h3>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Cualquier información adicional importante para el cliente..."
                rows={4}
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button 
                onClick={generateTemplate}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
              >
                ✨ Generar Cotización
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview and Actions */}
        {generatedHtml && (
          <Card>
            <CardHeader>
              <CardTitle>📧 Vista Previa y Acciones</CardTitle>
              <CardDescription>
                Revisa la cotización y cópiala para enviarla por email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={copyToClipboard} size="lg" variant="default">
                    📋 Copiar HTML
                  </Button>
                  <Button onClick={downloadHtml} size="lg" variant="outline">
                    💾 Descargar HTML
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">📖 Cómo usar la cotización:</h4>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                    <li><strong>Gmail:</strong> Haz clic en "Copiar HTML" → Abre Gmail → Ctrl+V (pegar) en el cuerpo del email</li>
                    <li><strong>Outlook:</strong> Descarga el HTML → Abre el archivo en navegador → Ctrl+A (seleccionar todo) → Ctrl+C (copiar) → Pega en Outlook</li>
                    <li><strong>Alternativa:</strong> Descarga el HTML y envíalo como adjunto, o ábrelo en navegador y envía el link</li>
                  </ol>
                </div>

                {/* Preview */}
                <div className="border rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold">
                    Vista Previa
                  </div>
                  <iframe
                    srcDoc={generatedHtml}
                    className="w-full"
                    style={{ height: '600px' }}
                    title="Vista previa del email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
