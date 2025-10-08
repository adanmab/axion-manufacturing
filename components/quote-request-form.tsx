
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface FileWithPreview {
  file: File
  id: string
}

interface QuoteRequestFormProps {
  uploadedFiles?: FileWithPreview[]
}

export function QuoteRequestForm({ uploadedFiles = [] }: QuoteRequestFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [localFiles, setLocalFiles] = useState<FileWithPreview[]>(uploadedFiles)
  
  // Sync localFiles with uploadedFiles prop when it changes
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setLocalFiles(uploadedFiles)
    }
  }, [uploadedFiles])
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectName: '',
    description: '',
    service: '',
    material: '',
    quantity: '',
    timeline: '',
    requirements: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const newFiles: FileWithPreview[] = Array.from(selectedFiles).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }))

    setLocalFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId: string) => {
    setLocalFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      
      // Append files
      localFiles.forEach((fileWithPreview, index) => {
        submitData.append(`file_${index}`, fileWithPreview.file)
      })

      const response = await fetch('/api/quote-request', {
        method: 'POST',
        body: submitData
      })

      if (!response.ok) {
        throw new Error('Failed to submit quote request')
      }

      const result = await response.json()
      
      // 🎯 GOOGLE ADS CONVERSION TRACKING
      // Este código se ejecuta cuando alguien envía una cotización exitosamente
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-874962281/vQU6CNbIkakbEOm6m6ED',
          'value': 500.0,
          'currency': 'MXN',
          'transaction_id': result.quoteId || Math.random().toString(36).substr(2, 9)
        });
        
        // También registrar como evento para Google Analytics
        (window as any).gtag('event', 'generate_lead', {
          'event_category': 'engagement',
          'event_label': 'quote_form_submission',
          'value': 500
        });
      }
      
      setIsSubmitted(true)
      toast.success('Quote request submitted successfully!')
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        projectName: '',
        description: '',
        service: '',
        material: '',
        quantity: '',
        timeline: '',
        requirements: ''
      })

    } catch (error) {
      console.error('Error submitting quote request:', error)
      toast.error('Failed to submit quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Quote Request Submitted!</h2>
            <p className="text-gray-600">
              Thank you for your request. We'll review your project details and respond with a detailed quote within 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              Quote ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <div className="pt-4">
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mr-4">
                Submit Another Quote
              </Button>
              <Button onClick={() => router.push('/')}>
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Project Details & Contact Information</CardTitle>
        <CardDescription>
          Please provide your project details and upload your CAD files below. We'll review everything and send you a quote within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                required
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="Brief project name or identifier"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Manufacturing Service *</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select manufacturing service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cnc-machining">CNC Machining</SelectItem>
                <SelectItem value="laser-cutting">Laser Cutting</SelectItem>
                <SelectItem value="3d-printing">3D Printing</SelectItem>
                <SelectItem value="sheet-metal">Sheet Metal Fabrication</SelectItem>
                <SelectItem value="multiple">Multiple Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="material">Preferred Material</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                placeholder="e.g., Aluminum 6061, Steel 304, PLA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Number of parts needed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline *</Label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
              <SelectTrigger>
                <SelectValue placeholder="When do you need this completed?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rush">Rush (1-3 days)</SelectItem>
                <SelectItem value="standard">Standard (1-2 weeks)</SelectItem>
                <SelectItem value="flexible">Flexible (2-4 weeks)</SelectItem>
                <SelectItem value="future">Future project (1+ months)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your project, intended use, and any important specifications"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="Special tolerances, finishes, testing requirements, etc."
              rows={3}
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-lg font-semibold">Files & Documents *</Label>
              <p className="text-sm text-gray-500">
                Upload any files: CAD files, drawings, photos, PDFs, Fusion 360 files (.f3d), images - all file types accepted!
              </p>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                  className="w-full sm:w-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {localFiles.length > 0 ? 'Add More Files' : 'Upload Files'}
                </Button>
                <input
                  id="file-upload-input"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {localFiles.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {localFiles.length} file{localFiles.length !== 1 ? 's' : ''} selected
                  </span>
                )}
              </div>
            </div>

            {/* Display uploaded files */}
            {localFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Files:</Label>
                <div className="grid gap-2">
                  {localFiles.map((fileWithPreview) => (
                    <div key={fileWithPreview.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center min-w-0">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <FileText className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-gray-700 truncate block">{fileWithPreview.file.name}</span>
                          <span className="text-xs text-gray-500">
                            {(fileWithPreview.file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileWithPreview.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.contactName || !formData.email || !formData.service || !formData.description || !formData.quantity || !formData.timeline}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Quote Request...
                </>
              ) : (
                'Submit Quote Request'
              )}
            </Button>
            <p className="text-sm text-gray-500 text-center mt-2">
              We'll respond with a detailed quote within 24 hours
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
