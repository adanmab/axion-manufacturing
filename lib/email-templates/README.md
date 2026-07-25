
# Plantillas de Email Profesionales - Axion Manufacturing

## 📧 Plantilla de Cotización

Esta plantilla profesional se utiliza para enviar cotizaciones a clientes con un diseño moderno y profesional que incluye:

✨ **Características:**
- Logo de Axion Manufacturing
- Diseño responsive
- Tabla de items detallada
- Cálculo automático de subtotal, impuestos y total
- Sección de notas importantes
- Términos y condiciones
- Call-to-action para contacto
- Footer con información de contacto

---

## 🚀 Cómo Usar

### Opción 1: Desde código (API)

```typescript
import { generateQuoteEmail } from '@/lib/email-templates/quote-template'

const quoteData = {
  quoteId: 'QT-2025-001',
  clientName: 'Juan Pérez',
  clientEmail: 'juan@example.com',
  companyName: 'Mi Empresa S.A.',
  projectName: 'Proyecto XYZ',
  service: 'CNC Machining',
  items: [
    {
      description: 'Pieza CNC de aluminio',
      quantity: 100,
      unitPrice: 45.50,
      total: 4550.00
    }
  ],
  subtotal: 4550.00,
  tax: 728.00,
  total: 5278.00,
  validUntil: '30 de Noviembre, 2025',
  notes: 'Tiempo de entrega: 3 semanas',
  terms: 'Pago: 50% anticipo, 50% contra entrega'
}

const html = generateQuoteEmail(quoteData)
```

### Opción 2: Usando la API `/api/send-quote`

```typescript
const response = await fetch('/api/send-quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    quoteId: 'QT-2025-001',
    clientName: 'Juan Pérez',
    clientEmail: 'juan@example.com',
    companyName: 'Mi Empresa S.A.',
    service: 'CNC Machining',
    items: [
      {
        description: 'Pieza CNC de aluminio',
        quantity: 100,
        unitPrice: 45.50,
        total: 4550.00
      }
    ],
    subtotal: 4550.00,
    tax: 728.00,
    total: 5278.00,
    validUntil: '30 de Noviembre, 2025',
    notes: 'Notas importantes aquí',
    terms: 'Términos y condiciones aquí'
  })
})

const result = await response.json()
```

---

## 📋 Campos Requeridos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `quoteId` | string | ✅ | ID único de la cotización |
| `clientName` | string | ✅ | Nombre del cliente |
| `clientEmail` | string | ✅ | Email del cliente |
| `service` | string | ✅ | Servicio solicitado |
| `items` | array | ✅ | Lista de items cotizados |
| `subtotal` | number | ✅ | Subtotal de la cotización |
| `total` | number | ✅ | Total final |
| `validUntil` | string | ✅ | Fecha de validez |
| `companyName` | string | ❌ | Nombre de la empresa |
| `projectName` | string | ❌ | Nombre del proyecto |
| `tax` | number | ❌ | Monto de impuestos |
| `notes` | string | ❌ | Notas importantes |
| `terms` | string | ❌ | Términos y condiciones |

---

## 💡 Ejemplo Completo

Ver el archivo `quote-example.ts` para un ejemplo completo con todos los campos.

---

## 🎨 Personalización

Para personalizar la plantilla, edita el archivo `quote-template.ts`:

- **Colores:** Modifica los colores en los estilos inline
- **Logo:** Cambia la URL del logo en la sección del header
- **Footer:** Actualiza la información de contacto en el footer
- **Estilos:** Ajusta los estilos CSS según tus necesidades

---

## 📧 Configuración de Email

Asegúrate de tener configurado:

1. **API Key de Resend** en `.env`:
   ```
   RESEND_API_KEY=tu_api_key_aquí
   ```

2. **Dominio verificado** en Resend: `quote@axionmfg.net`

---

## 🔒 Seguridad

- Los emails se envían usando Resend con autenticación segura
- Se envía una copia (BCC) a `quote@axionmfg.net` para registro
- Las cotizaciones se archivan automáticamente

---

## 📞 Soporte

Si tienes preguntas sobre la plantilla, contacta al equipo de desarrollo.
