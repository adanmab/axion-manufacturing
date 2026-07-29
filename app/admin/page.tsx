'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { renderQuoteHtml, QuoteData, QuoteItem } from '@/lib/quote-render'
import { Download, Send, LogOut, Plus, Trash2, Loader2, CalendarIcon } from 'lucide-react'

type Status = { type: 'idle' | 'working' | 'success' | 'error'; msg?: string }

const SERVICE_OPTIONS = [
  'CNC Machining',
  '3D Printing',
  'CNC Machining & 3D Printing',
]

const LEAD_TIME_OPTIONS = [
  '1-2 business days',
  '3-5 business days',
  '1 week',
  '1-2 weeks',
  '2-3 weeks',
  '3-4 weeks',
  '4-6 weeks',
  '6-8 weeks',
]

const PAYMENT_TERMS_OPTIONS = [
  '50% deposit, 50% on delivery',
  '100% upfront',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Payment on delivery',
]

function formatDate(d: Date): string {
  return format(d, 'MMMM d, yyyy')
}

export default function AdminQuotePage() {
  const router = useRouter()

  const [quoteId, setQuoteId] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [service, setService] = useState('CNC Machining')
  const [items, setItems] = useState<QuoteItem[]>([
    { description: '', quantity: 1, unitPrice: 0, total: 0 },
  ])
  const [taxRate, setTaxRate] = useState(0)
  const [validUntilDate, setValidUntilDate] = useState<Date | undefined>(undefined)
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined)
  const [leadTime, setLeadTime] = useState('3-4 weeks')
  const [paymentTerms, setPaymentTerms] = useState('50% deposit, 50% on delivery')
  const [notes, setNotes] = useState('')

  const [downloadStatus, setDownloadStatus] = useState<Status>({ type: 'idle' })
  const [sendStatus, setSendStatus] = useState<Status>({ type: 'idle' })

  // Set date-dependent defaults on the client to avoid hydration mismatches
  useEffect(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const rand = String(Math.floor(Math.random() * 900) + 100)
    setQuoteId(`Q-${y}${m}${d}-${rand}`)
    setIssueDate(formatDate(now))
    const valid = new Date(now)
    valid.setDate(valid.getDate() + 30)
    setValidUntilDate(valid)
  }, [])

  const validUntil = validUntilDate ? formatDate(validUntilDate) : ''
  const deliveryDateStr = deliveryDate ? formatDate(deliveryDate) : ''

  // Lead time shown on the quote: explicit delivery date takes priority, else the range
  const leadTimeForQuote = deliveryDateStr
    ? `By ${deliveryDateStr}`
    : leadTime

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.quantity || 0) * (it.unitPrice || 0), 0),
    [items]
  )
  const tax = useMemo(() => subtotal * (taxRate / 100), [subtotal, taxRate])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  const quoteData: QuoteData = useMemo(
    () => ({
      quoteId,
      issueDate,
      clientName,
      clientEmail,
      companyName,
      projectName,
      service,
      items: items.map((it) => ({
        ...it,
        total: (it.quantity || 0) * (it.unitPrice || 0),
      })),
      subtotal,
      taxRate,
      tax,
      total,
      validUntil,
      leadTime: leadTimeForQuote,
      paymentTerms,
      notes,
    }),
    [quoteId, issueDate, clientName, clientEmail, companyName, projectName, service, items, subtotal, taxRate, tax, total, validUntil, leadTimeForQuote, paymentTerms, notes]
  )

  const previewHtml = useMemo(
    () => renderQuoteHtml(quoteData, '/quote-logo-v2.png', true),
    [quoteData]
  )

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      next[index].total = (next[index].quantity || 0) * (next[index].unitPrice || 0)
      return next
    })
  }
  const addItem = () =>
    setItems((p) => [...p, { description: '', quantity: 1, unitPrice: 0, total: 0 }])
  const removeItem = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i))

  const validate = (): string | null => {
    if (!clientName.trim()) return 'Please enter the client name.'
    if (!clientEmail.trim()) return 'Please enter the client email.'
    if (!items.some((it) => it.description.trim())) return 'Please add at least one item with a description.'
    return null
  }

  // Create the PDF and poll until ready. Returns base64 string.
  const generatePdfBase64 = async (): Promise<string> => {
    const createRes = await fetch('/api/admin/create-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    })
    const createData = await createRes.json()
    if (!createRes.ok || !createData.request_id) {
      throw new Error(createData.error || 'Could not start PDF generation.')
    }
    const requestId = createData.request_id

    for (let i = 0; i < 150; i++) {
      await new Promise((r) => setTimeout(r, 2000))
      const stRes = await fetch('/api/admin/pdf-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId }),
      })
      const stData = await stRes.json()
      if (stData.status === 'SUCCESS' && stData.pdf_base64) return stData.pdf_base64
      if (stData.status === 'FAILED') throw new Error(stData.error || 'PDF generation failed.')
    }
    throw new Error('PDF generation timed out.')
  }

  const handleDownload = async () => {
    const err = validate()
    if (err) {
      setDownloadStatus({ type: 'error', msg: err })
      return
    }
    setDownloadStatus({ type: 'working', msg: 'Generating PDF...' })
    try {
      const b64 = await generatePdfBase64()
      const blob = new Blob(
        [Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))],
        { type: 'application/pdf' }
      )
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Quote-${quoteId}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      setDownloadStatus({ type: 'success', msg: 'PDF downloaded.' })
    } catch (e: any) {
      setDownloadStatus({ type: 'error', msg: e?.message || 'Error generating the PDF.' })
    }
  }

  const handleSend = async () => {
    const err = validate()
    if (err) {
      setSendStatus({ type: 'error', msg: err })
      return
    }
    setSendStatus({ type: 'working', msg: 'Generating PDF...' })
    try {
      const pdfBase64 = await generatePdfBase64()
      setSendStatus({ type: 'working', msg: 'Sending email...' })
      const res = await fetch('/api/admin/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quoteData, pdfBase64 }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.details || 'Could not send the email.')
      setSendStatus({ type: 'success', msg: `Quote sent to ${clientEmail}.` })
    } catch (e: any) {
      setSendStatus({ type: 'error', msg: e?.message || 'Error sending the quote.' })
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const statusColor = (s: Status) =>
    s.type === 'error'
      ? 'text-red-600'
      : s.type === 'success'
      ? 'text-green-600'
      : 'text-slate-500'

  const usd = (n: number) =>
    '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-32">
              <Image src="/quote-logo-v2.png" alt="Axion Manufacturing" fill className="object-contain" priority />
            </div>
            <span className="text-slate-400 text-sm hidden sm:inline">| Quote Generator</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Log out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form column */}
        <div className="space-y-5">
          {/* Client */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Client</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Name *</Label>
                <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Smith" />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email *</Label>
                <Input id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="john@company.com" />
              </div>
              <div>
                <Label htmlFor="companyName">Company</Label>
                <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Inc." />
              </div>
              <div>
                <Label htmlFor="projectName">Project</Label>
                <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Custom Bracket Batch" />
              </div>
            </div>
          </section>

          {/* Quote meta */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Quote Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quoteId">Quote Number</Label>
                <Input id="quoteId" value={quoteId} onChange={(e) => setQuoteId(e.target.value)} />
              </div>
              <div>
                <Label>Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Lead Time</Label>
                <Select value={leadTime} onValueChange={setLeadTime}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LEAD_TIME_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Delivery Date (optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? formatDate(deliveryDate) : <span className="text-slate-400">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      initialFocus
                    />
                    {deliveryDate && (
                      <div className="p-2 border-t border-slate-100">
                        <Button variant="ghost" size="sm" className="w-full text-slate-500"
                          onClick={() => setDeliveryDate(undefined)}>
                          Clear date
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-slate-400 mt-1">Overrides Lead Time on the quote when set.</p>
              </div>
              <div>
                <Label>Valid Until</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {validUntilDate ? formatDate(validUntilDate) : <span className="text-slate-400">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={validUntilDate}
                      onSelect={setValidUntilDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Payment Terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TERMS_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Items */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Items</h2>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Item {index + 1}</span>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Description (material, tolerances, finish...)"
                    rows={2}
                    className="mb-2"
                  />
                  <div className="grid grid-cols-3 gap-2 items-end">
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input type="number" min="0" value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div>
                      <Label className="text-xs">Unit Price (USD)</Label>
                      <Input type="number" min="0" step="0.01" value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="text-right pb-2">
                      <span className="text-sm font-semibold text-slate-700">
                        {usd((item.quantity || 0) * (item.unitPrice || 0))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">{usd(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Tax</span>
                  <Input type="number" min="0" max="100" step="0.1" value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-16 h-7" />
                  <span className="text-slate-600">%</span>
                </div>
                <span className="font-semibold">{usd(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-[#123a6b]">TOTAL</span>
                <span className="font-bold text-xl text-[#123a6b]">{usd(total)}</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 mb-3">Notes (optional)</h2>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
              placeholder="Additional information for the client..." />
          </section>

          {/* Actions */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" onClick={handleDownload}
                disabled={downloadStatus.type === 'working'}>
                {downloadStatus.type === 'working'
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <Download className="h-4 w-4 mr-2" />}
                Download PDF
              </Button>
              <Button className="flex-1 bg-[#123a6b] hover:bg-[#0e2f57] text-white" onClick={handleSend}
                disabled={sendStatus.type === 'working'}>
                {sendStatus.type === 'working'
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <Send className="h-4 w-4 mr-2" />}
                Send by Email with PDF
              </Button>
            </div>
            {downloadStatus.msg && (
              <p className={`text-sm ${statusColor(downloadStatus)}`}>{downloadStatus.msg}</p>
            )}
            {sendStatus.msg && (
              <p className={`text-sm ${statusColor(sendStatus)}`}>{sendStatus.msg}</p>
            )}
          </section>
        </div>

        {/* Preview column */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-4 py-2 text-sm font-medium">Preview</div>
            <iframe srcDoc={previewHtml} title="Preview" className="w-full" style={{ height: '820px', border: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
