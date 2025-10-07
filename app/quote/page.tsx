
'use client'

import { useState, useEffect } from 'react'
import { QuoteRequestForm } from '@/components/quote-request-form'
import { FileUploadHero } from '@/components/file-upload-hero'
import { Factory } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface FileWithPreview {
  file: File
  id: string
}

export default function QuotePage() {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])
  const [hasPreloadedFiles, setHasPreloadedFiles] = useState(false)

  // Check for files from hero upload on mount
  useEffect(() => {
    const storedFiles = localStorage.getItem('uploadedFiles')
    if (storedFiles) {
      try {
        const filesData = JSON.parse(storedFiles)
        
        if (filesData && filesData.length > 0) {
          // Convert base64 back to File objects
          const reconstructedFiles: FileWithPreview[] = filesData.map((fileData: any) => {
            // Decode base64 to binary
            const binaryString = atob(fileData.base64)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i)
            }
            
            // Create File object
            const file = new File([bytes], fileData.name, { type: fileData.type })
            
            return {
              file: file,
              id: fileData.id
            }
          })
          
          setUploadedFiles(reconstructedFiles)
          setHasPreloadedFiles(true)
        }
        
        // Clear localStorage after reading
        localStorage.removeItem('uploadedFiles')
      } catch (error) {
        console.error('Error parsing stored files:', error)
      }
    }
  }, [])

  const handleFilesChange = (files: FileWithPreview[]) => {
    setUploadedFiles(files)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 flex items-center">
                <Image src="/logo.png" alt="Axion Manufacturing Logo" width={144} height={32} className="object-contain" />
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with File Upload - Only show if no preloaded files */}
      {!hasPreloadedFiles ? (
        <FileUploadHero onFilesChange={handleFilesChange} initialFiles={uploadedFiles} />
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Archivos Cargados!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Tus archivos CAD fueron subidos exitosamente. Ahora solo completa el formulario abajo para obtener tu cotización.
              </p>
              <div className="inline-flex items-center text-sm text-blue-600 font-semibold">
                <svg className="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Continúa abajo con tu información
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteRequestForm uploadedFiles={uploadedFiles} />
        </div>
      </div>
    </div>
  )
}
