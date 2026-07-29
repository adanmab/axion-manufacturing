export interface QuoteItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface QuoteData {
  quoteId: string
  issueDate: string
  clientName: string
  clientEmail: string
  companyName?: string
  projectName?: string
  service: string
  items: QuoteItem[]
  subtotal: number
  taxRate: number
  tax: number
  total: number
  validUntil: string
  leadTime: string
  paymentTerms: string
  notes?: string
}

const COMPANY = {
  name: 'Axion Manufacturing',
  addressLine: '3902 Creekmont Drive',
  cityLine: 'Houston, TX',
  email: 'quote@axionmfg.net',
  website: 'axionmfg.net',
}

const NAVY = '#123a6b'
const TEAL = '#1f8a70'
const INK = '#1a2332'
const MUTED = '#64748b'
const LINE = '#e5e9f0'

function usd(n: number): string {
  return (
    '$' +
    (n || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

function esc(s: string | undefined): string {
  if (!s) return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Renders a clean, professional US-style quote as a self-contained HTML document.
 * `logoSrc` should be an absolute URL or a base64 data URI so it renders in email and PDF.
 * `interactive` adds an "Approve Quote" mailto button (used for email / preview, not PDF).
 */
export function renderQuoteHtml(
  data: QuoteData,
  logoSrc: string,
  interactive = true
): string {
  const itemsRows = data.items
    .map(
      (item, i) => `
        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="padding:14px 16px; color:${INK}; font-size:14px; line-height:1.5; border-bottom:1px solid ${LINE}; white-space:pre-wrap;">${esc(item.description)}</td>
          <td style="padding:14px 16px; text-align:center; color:${MUTED}; font-size:14px; border-bottom:1px solid ${LINE};">${item.quantity}</td>
          <td style="padding:14px 16px; text-align:right; color:${MUTED}; font-size:14px; border-bottom:1px solid ${LINE}; white-space:nowrap;">${usd(item.unitPrice)}</td>
          <td style="padding:14px 16px; text-align:right; color:${INK}; font-size:14px; font-weight:600; border-bottom:1px solid ${LINE}; white-space:nowrap;">${usd(item.total)}</td>
        </tr>`
    )
    .join('')

  const approveButton = interactive
    ? `
          <tr>
            <td style="padding:8px 48px 40px 48px; text-align:center;">
              <a href="mailto:${COMPANY.email}?subject=Quote%20Approval%20-%20${encodeURIComponent(data.quoteId)}&body=Hello%20Axion%20Manufacturing%2C%0A%0AI%20would%20like%20to%20approve%20quote%20${encodeURIComponent(data.quoteId)}%20and%20move%20forward.%0A%0AThank%20you."
                 style="display:inline-block; background:${NAVY}; color:#ffffff; text-decoration:none; padding:15px 42px; border-radius:8px; font-weight:600; font-size:15px; letter-spacing:0.3px;">
                Approve Quote
              </a>
              <p style="margin:16px 0 0 0; color:${MUTED}; font-size:13px;">Questions? Reply to this email or contact ${COMPANY.email}</p>
            </td>
          </tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote ${esc(data.quoteId)}</title>
</head>
<body style="margin:0; padding:0; background-color:#eef1f6; font-family:'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f6; padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="680" cellpadding="0" cellspacing="0" style="width:680px; max-width:100%; background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(18,58,107,0.10);">

          <!-- Accent bar -->
          <tr><td style="height:6px; background:linear-gradient(90deg, ${NAVY} 0%, ${TEAL} 100%);"></td></tr>

          <!-- Header -->
          <tr>
            <td style="padding:34px 48px 24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logoSrc}" alt="${COMPANY.name}" style="height:46px; display:block;">
                  </td>
                  <td style="vertical-align:middle; text-align:right;">
                    <div style="color:${NAVY}; font-size:30px; font-weight:700; letter-spacing:2px;">QUOTE</div>
                    <div style="color:${MUTED}; font-size:13px; margin-top:4px;">${esc(data.quoteId)}</div>
                    <div style="color:${MUTED}; font-size:13px; margin-top:2px;">${esc(data.issueDate)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- From / Bill To -->
          <tr>
            <td style="padding:8px 48px 24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align:top;">
                    <div style="color:${TEAL}; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:8px;">From</div>
                    <div style="color:${INK}; font-size:15px; font-weight:700;">${COMPANY.name}</div>
                    <div style="color:${MUTED}; font-size:13px; line-height:1.7; margin-top:4px;">
                      ${COMPANY.addressLine}<br>
                      ${COMPANY.cityLine}<br>
                      ${COMPANY.email}
                    </div>
                  </td>
                  <td width="50%" style="vertical-align:top;">
                    <div style="color:${TEAL}; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:8px;">Bill To</div>
                    <div style="color:${INK}; font-size:15px; font-weight:700;">${esc(data.clientName)}</div>
                    <div style="color:${MUTED}; font-size:13px; line-height:1.7; margin-top:4px;">
                      ${data.companyName ? esc(data.companyName) + '<br>' : ''}
                      ${esc(data.clientEmail)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            data.projectName || data.service
              ? `<tr>
            <td style="padding:0 48px 24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb; border-radius:10px;">
                <tr>
                  <td style="padding:16px 20px;">
                    ${data.projectName ? `<div style="color:${INK}; font-size:15px; font-weight:600;">${esc(data.projectName)}</div>` : ''}
                    ${data.service ? `<div style="color:${TEAL}; font-size:13px; font-weight:600; margin-top:${data.projectName ? '4px' : '0'};">${esc(data.service)}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ''
          }

          <!-- Items -->
          <tr>
            <td style="padding:0 48px 8px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1px solid ${LINE}; border-radius:10px; overflow:hidden;">
                <thead>
                  <tr style="background:${NAVY};">
                    <th style="padding:13px 16px; text-align:left; color:#ffffff; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Description</th>
                    <th style="padding:13px 16px; text-align:center; color:#ffffff; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Qty</th>
                    <th style="padding:13px 16px; text-align:right; color:#ffffff; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Unit Price</th>
                    <th style="padding:13px 16px; text-align:right; color:#ffffff; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Amount</th>
                  </tr>
                </thead>
                <tbody>${itemsRows}</tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding:16px 48px 8px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="55%"></td>
                  <td width="45%">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0; color:${MUTED}; font-size:14px;">Subtotal</td>
                        <td style="padding:6px 0; text-align:right; color:${INK}; font-size:14px; font-weight:600;">${usd(data.subtotal)}</td>
                      </tr>
                      ${
                        data.tax > 0
                          ? `<tr>
                        <td style="padding:6px 0; color:${MUTED}; font-size:14px;">Tax (${data.taxRate}%)</td>
                        <td style="padding:6px 0; text-align:right; color:${INK}; font-size:14px; font-weight:600;">${usd(data.tax)}</td>
                      </tr>`
                          : ''
                      }
                      <tr>
                        <td colspan="2" style="padding-top:8px;"><div style="border-top:2px solid ${NAVY};"></div></td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0 0 0; color:${NAVY}; font-size:16px; font-weight:700;">Total (USD)</td>
                        <td style="padding:10px 0 0 0; text-align:right; color:${NAVY}; font-size:22px; font-weight:700;">${usd(data.total)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Terms row -->
          <tr>
            <td style="padding:20px 48px 8px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb; border-radius:10px;">
                <tr>
                  <td width="33%" style="padding:16px 18px; vertical-align:top; border-right:1px solid ${LINE};">
                    <div style="color:${MUTED}; font-size:10px; text-transform:uppercase; letter-spacing:1px; font-weight:700;">Lead Time</div>
                    <div style="color:${INK}; font-size:14px; font-weight:600; margin-top:5px;">${esc(data.leadTime) || 'TBD'}</div>
                  </td>
                  <td width="33%" style="padding:16px 18px; vertical-align:top; border-right:1px solid ${LINE};">
                    <div style="color:${MUTED}; font-size:10px; text-transform:uppercase; letter-spacing:1px; font-weight:700;">Valid Until</div>
                    <div style="color:${INK}; font-size:14px; font-weight:600; margin-top:5px;">${esc(data.validUntil) || 'TBD'}</div>
                  </td>
                  <td width="34%" style="padding:16px 18px; vertical-align:top;">
                    <div style="color:${MUTED}; font-size:10px; text-transform:uppercase; letter-spacing:1px; font-weight:700;">Payment Terms</div>
                    <div style="color:${INK}; font-size:14px; font-weight:600; margin-top:5px;">${esc(data.paymentTerms) || 'TBD'}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            data.notes
              ? `<tr>
            <td style="padding:16px 48px 8px 48px;">
              <div style="color:${TEAL}; font-size:11px; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:8px;">Notes</div>
              <div style="color:${INK}; font-size:13px; line-height:1.7; white-space:pre-wrap;">${esc(data.notes)}</div>
            </td>
          </tr>`
              : ''
          }

          <!-- Terms & conditions -->
          <tr>
            <td style="padding:18px 48px 8px 48px;">
              <div style="color:${MUTED}; font-size:11px; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:8px;">Terms &amp; Conditions</div>
              <ul style="margin:0; padding-left:18px; color:${MUTED}; font-size:12px; line-height:1.9;">
                <li>All prices are quoted in U.S. Dollars (USD).</li>
                <li>This quote is valid through the date indicated above.</li>
                <li>Production lead time begins upon design approval and receipt of deposit.</li>
                <li>Shipping and applicable taxes are not included unless stated otherwise.</li>
                <li>90-day warranty against manufacturing defects.</li>
              </ul>
            </td>
          </tr>

          ${approveButton}

          <!-- Footer -->
          <tr>
            <td style="background:${NAVY}; padding:24px 48px; text-align:center;">
              <div style="color:#ffffff; font-size:15px; font-weight:700;">${COMPANY.name}</div>
              <div style="color:#b9c6dc; font-size:12px; line-height:1.7; margin-top:8px;">
                ${COMPANY.addressLine}, ${COMPANY.cityLine} &nbsp;&middot;&nbsp; ${COMPANY.email} &nbsp;&middot;&nbsp; ${COMPANY.website}
              </div>
              <div style="color:#7f92b3; font-size:11px; margin-top:12px;">
                CNC Machining &amp; 3D Printing &nbsp;&middot;&nbsp; &copy; ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
