
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FileWithPreview {
  file: File
  id: string
}

interface FileUploadHeroProps {
  onFilesChange: (files: FileWithPreview[]) => void
  initialFiles?: FileWithPreview[]
}

export function FileUploadHero({ onFilesChange, initialFiles = [] }: FileUploadHeroProps) {
  const [files, setFiles] = useState<FileWithPreview[]>(initialFiles)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const newFiles: FileWithPreview[] = Array.from(selectedFiles).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles) return

    const newFiles: FileWithPreview[] = Array.from(droppedFiles).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Manufacturing Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload your CAD files to start the process. We'll analyze your designs and provide a detailed quote within 24 hours.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Drop your CAD files here
                </h3>
                <p className="text-gray-600 mb-2">or click to browse from your computer</p>
                <p className="text-sm text-gray-500 mb-6">
                  Supported formats: .step, .stp, .dwg, .dxf, .pdf, .stl, .iges
                </p>
                <input
                  type="file"
                  multiple
                  accept=".step,.stp,.dwg,.dxf,.pdf,.stl,.iges,.igs,.3dm,.x_t"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="hero-file-upload"
                />
                <Button 
                  type="button" 
                  size="lg" 
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                  onClick={() => document.getElementById('hero-file-upload')?.click()}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Select Files
                </Button>
              </div>
              
              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Uploaded Files</h4>
                    <span className="text-sm text-gray-500">{files.length} file{files.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="grid gap-3">
                    {files.map((fileWithPreview) => (
                      <div key={fileWithPreview.id} className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          </div>
                          <FileText className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <span className="text-sm font-medium text-gray-700">{fileWithPreview.file.name}</span>
                            <p className="text-xs text-gray-500">
                              {(fileWithPreview.file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileWithPreview.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {files.length > 0 && (
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Great! Your files are ready. Now fill out the form below to complete your quote request.
                      </p>
                      <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
