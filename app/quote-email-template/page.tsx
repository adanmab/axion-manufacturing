
'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function QuoteEmailTemplate() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    clientName: 'John Smith',
    clientCompany: 'ABC Manufacturing Inc.',
    clientEmail: 'john.smith@abcmfg.com',
    quoteNumber: 'Q-2025-001',
    validUntil: '30 days',
    
    // Items
    item1_desc: 'CNC Machining - Aluminum Parts (Qty: 100)',
    item1_cost: '2,500.00',
    item2_desc: 'Surface Treatment - Anodizing',
    item2_cost: '800.00',
    item3_desc: 'Quality Inspection & Testing',
    item3_cost: '350.00',
    
    // Costs
    subtotal: '3,650.00',
    tax: '292.00',
    shipping: '150.00',
    total: '4,092.00',
    
    leadTime: '3-4 weeks',
    paymentTerms: '50% deposit, 50% upon delivery',
    notes: 'All parts will be manufactured according to provided specifications and drawings.'
  });

  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">QUOTATION</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">Axion Manufacturing</p>
            </td>
          </tr>

          <!-- Client Info -->
          <tr>
            <td style="padding: 30px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Quote Number</p>
                    <p style="margin: 0; color: #111827; font-size: 16px; font-weight: bold;">${formData.quoteNumber}</p>
                  </td>
                  <td style="padding-bottom: 20px; text-align: right;">
                    <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Valid Until</p>
                    <p style="margin: 0; color: #111827; font-size: 16px; font-weight: bold;">${formData.validUntil}</p>
                  </td>
                </tr>
              </table>

              <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Prepared For</p>
                <p style="margin: 0 0 5px 0; color: #111827; font-size: 18px; font-weight: bold;">${formData.clientName}</p>
                <p style="margin: 0 0 3px 0; color: #4b5563; font-size: 14px;">${formData.clientCompany}</p>
                <p style="margin: 0; color: #3b82f6; font-size: 14px;">${formData.clientEmail}</p>
              </div>

              <!-- Items Table -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td colspan="2" style="border-bottom: 2px solid #1e40af; padding-bottom: 10px; margin-bottom: 15px;">
                    <p style="margin: 0; color: #111827; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #374151; font-size: 14px;">${formData.item1_desc}</p>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">$${formData.item1_cost}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #374151; font-size: 14px;">${formData.item2_desc}</p>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">$${formData.item2_cost}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #374151; font-size: 14px;">${formData.item3_desc}</p>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 600;">$${formData.item3_cost}</p>
                  </td>
                </tr>
              </table>

              <!-- Totals -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; text-align: right;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Subtotal:</p>
                  </td>
                  <td style="padding: 8px 0; text-align: right; width: 120px;">
                    <p style="margin: 0; color: #111827; font-size: 14px;">$${formData.subtotal}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; text-align: right;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Tax (8%):</p>
                  </td>
                  <td style="padding: 8px 0; text-align: right;">
                    <p style="margin: 0; color: #111827; font-size: 14px;">$${formData.tax}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 15px 0; text-align: right; border-bottom: 2px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">Shipping:</p>
                  </td>
                  <td style="padding: 8px 0 15px 0; text-align: right; border-bottom: 2px solid #e5e7eb;">
                    <p style="margin: 0; color: #111827; font-size: 14px;">$${formData.shipping}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0 0 0; text-align: right;">
                    <p style="margin: 0; color: #111827; font-size: 18px; font-weight: bold;">TOTAL:</p>
                  </td>
                  <td style="padding: 15px 0 0 0; text-align: right;">
                    <p style="margin: 0; color: #1e40af; font-size: 24px; font-weight: bold;">$${formData.total}</p>
                  </td>
                </tr>
              </table>

              <!-- Terms -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 15px; margin-bottom: 15px;">
                <p style="margin: 0 0 5px 0; color: #1e40af; font-size: 12px; font-weight: bold; text-transform: uppercase;">Lead Time</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px;">${formData.leadTime}</p>
              </div>

              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 15px; margin-bottom: 15px;">
                <p style="margin: 0 0 5px 0; color: #1e40af; font-size: 12px; font-weight: bold; text-transform: uppercase;">Payment Terms</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px;">${formData.paymentTerms}</p>
              </div>

              ${formData.notes ? `
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: bold; text-transform: uppercase;">Additional Notes</p>
                <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6;">${formData.notes}</p>
              </div>
              ` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #111827; font-size: 16px; font-weight: bold;">Questions about this quote?</p>
              <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">We're here to help!</p>
              <p style="margin: 0;">
                <a href="mailto:quotes@axionmfg.net" style="color: #3b82f6; text-decoration: none; font-weight: 600;">quotes@axionmfg.net</a>
              </p>
              <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 12px;">
                Axion Manufacturing | www.axionmfg.net<br>
                © 2025 Axion Manufacturing. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  };

  const copyToClipboard = async () => {
    const html = generateHTML();
    
    try {
      // Create a blob with HTML content
      const blob = new Blob([html], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      
      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to plain text if HTML copy fails
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quote Email Template</h1>
          <p className="text-gray-600">Edit the fields below, then copy the formatted email to paste into your email client</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Quote Details</h2>
            
            {/* Client Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <Input
                    value={formData.clientCompany}
                    onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quote Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quote Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Number</label>
                  <Input
                    value={formData.quoteNumber}
                    onChange={(e) => handleInputChange('quoteNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <Input
                    value={formData.validUntil}
                    onChange={(e) => handleInputChange('validUntil', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Items</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="border border-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item {num} Description</label>
                    <Input
                      value={formData[`item${num}_desc` as keyof typeof formData]}
                      onChange={(e) => handleInputChange(`item${num}_desc`, e.target.value)}
                      className="mb-2"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost (USD)</label>
                    <Input
                      value={formData[`item${num}_cost` as keyof typeof formData]}
                      onChange={(e) => handleInputChange(`item${num}_cost`, e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Totals</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtotal</label>
                  <Input
                    value={formData.subtotal}
                    onChange={(e) => handleInputChange('subtotal', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                  <Input
                    value={formData.tax}
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping</label>
                  <Input
                    value={formData.shipping}
                    onChange={(e) => handleInputChange('shipping', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                  <Input
                    value={formData.total}
                    onChange={(e) => handleInputChange('total', e.target.value)}
                    className="font-bold text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time</label>
                  <Input
                    value={formData.leadTime}
                    onChange={(e) => handleInputChange('leadTime', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <Input
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={copyToClipboard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy HTML Email
                </>
              )}
            </Button>
            
            <p className="text-sm text-gray-600 mt-3 text-center">
              Click the button above to copy, then paste directly into your email client (Gmail, Outlook, etc.)
            </p>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Preview</h2>
            <div 
              className="border border-gray-200 rounded-lg overflow-auto"
              style={{ maxHeight: '800px' }}
              dangerouslySetInnerHTML={{ __html: generateHTML() }}
            />
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Edit the fields in the form on the left to customize your quote</li>
            <li>Review the live preview on the right to see how it will look</li>
            <li>Click "Copy HTML Email" button to copy the formatted email</li>
            <li>Open your email client (Gmail, Outlook, etc.)</li>
            <li>Paste directly into the email body (the formatting will be preserved)</li>
            <li>Add your subject line and send!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
