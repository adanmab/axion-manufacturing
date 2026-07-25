
import { generateQuoteEmail } from './quote-template'

// Ejemplo de uso de la plantilla de cotización
export const exampleQuoteData = {
  quoteId: 'QT-2025-001',
  clientName: 'John Smith',
  clientEmail: 'john.smith@example.com',
  companyName: 'Innovative Industries Inc.',
  projectName: 'Industrial Machinery Components Manufacturing',
  service: 'CNC Machining',
  items: [
    {
      description: 'CNC machined aluminum 6061-T6 parts with blue anodized finish. Includes precision machining with tolerances of ±0.05mm.',
      quantity: 100,
      unitPrice: 45.50,
      total: 4550.00
    },
    {
      description: '3D printed prototypes in high-strength resin. Includes post-processing and painting.',
      quantity: 5,
      unitPrice: 85.00,
      total: 425.00
    },

  ],
  subtotal: 4975.00,
  tax: 0,
  total: 4975.00,
  validUntil: 'November 15, 2025',
  notes: `• Estimated lead times are 3-4 weeks from order confirmation.
• A 50% deposit is required to start production.
• Final CAD files must be approved before manufacturing begins.
• Includes quality inspection and material certification.`,
  terms: `1. Payment: 50% deposit, 50% upon delivery. ACH, wire transfer, or check accepted.
2. Shipping: FOB origin. Shipping costs not included.
3. Warranty: 90 days against manufacturing defects.
4. Changes: Design modifications after approval may incur additional costs.
5. Cancellation: Orders canceled after production starts will incur a 25% charge.`
}

// Para generar el HTML:
// const html = generateQuoteEmail(exampleQuoteData)
