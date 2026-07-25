
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
}

export function generateQuoteEmail(data: QuoteEmailData): string {
  const taxAmount = data.tax || 0
  const taxRate = data.subtotal > 0 ? (taxAmount / data.subtotal * 100) : 0

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización ${data.quoteId}</title>
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
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">ID: #${data.quoteId}</p>
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
                      ${data.clientName}
                    </p>
                    ${data.companyName ? `<p style="margin: 5px 0 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">${data.companyName}</p>` : ''}
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      ${data.clientEmail}
                    </p>
                  </td>
                  <td width="50%" style="vertical-align: top; text-align: right;">
                    <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">De:</h3>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600; line-height: 1.6;">
                      Axion Manufacturing
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      3902 Creekmont Drive, Houston, TX<br>
                      United States
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      quote@axionmfg.net
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${data.projectName ? `
          <!-- Project Information -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Proyecto:</h3>
                <p style="margin: 0; color: #1e3a8a; font-size: 18px; font-weight: 600;">${data.projectName}</p>
                <p style="margin: 5px 0 0 0; color: #3b82f6; font-size: 14px; font-weight: 500;">${data.service}</p>
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
                  ${data.items.map((item, index) => `
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
                          $${data.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                      ${taxAmount > 0 ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 15px;">Tax (${taxRate.toFixed(0)}%):</td>
                        <td style="padding: 8px 0; text-align: right; color: #1f2937; font-size: 15px; font-weight: 600;">
                          $${taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                      ` : ''}
                      <tr style="border-top: 2px solid #e5e7eb;">
                        <td style="padding: 15px 0 0 0; color: #1e3a8a; font-size: 18px; font-weight: 700;">Total:</td>
                        <td style="padding: 15px 0 0 0; text-align: right; color: #1e3a8a; font-size: 22px; font-weight: 700;">
                          $${data.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Validity Period -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 8px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                  ⏰ Esta cotización es válida hasta: <strong style="color: #b45309;">${data.validUntil}</strong>
                </p>
              </div>
            </td>
          </tr>

          ${data.notes ? `
          <!-- Notes -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Notas Importantes:</h3>
                <p style="margin: 0; color: #047857; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.notes}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          ${data.terms ? `
          <!-- Terms and Conditions -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <h3 style="color: #374151; margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Términos y Condiciones:</h3>
                <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.7; white-space: pre-wrap;">${data.terms}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Call to Action -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                ¿Tienes preguntas sobre esta cotización? Estamos aquí para ayudarte.
              </p>
              <a href="mailto:quote@axionmfg.net" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                Contactar con Ventas
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
                3902 Creekmont Drive, Houston, TX, United States<br>
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
}
