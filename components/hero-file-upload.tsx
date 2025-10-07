
'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, File, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileWithPreview {
  file: File
  id: string
}

interface HeroFileUploadProps {
  onFilesChange: (files: FileWithPreview[]) => void
  initialFiles?: FileWithPreview[]
}

export function HeroFileUpload({ onFilesChange, initialFiles = [] }: HeroFileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>(initialFiles)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return

    setUploadStatus('uploading')
    const newFiles: FileWithPreview[] = []

    Array.from(fileList).forEach((file) => {
      newFiles.push({
        file,
        id: Math.random().toString(36).substr(2, 9)
      })
    })

    setTimeout(() => {
      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
      setUploadStatus('success')
      setTimeout(() => setUploadStatus('idle'), 2000)
    }, 800)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }, [files])

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-3xl p-8 md:p-12 text-center transition-all duration-300 backdrop-blur-md
          ${isDragging 
            ? 'border-white bg-white/20 scale-105' 
            : 'border-white/30 bg-white/10 hover:bg-white/15 hover:border-white/40'
          }
          ${uploadStatus === 'success' ? 'border-green-400 bg-green-400/20' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {uploadStatus === 'uploading' ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-white font-semibold text-lg">Uploading files...</p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
            <p className="text-white font-semibold text-lg">Files uploaded successfully!</p>
            <p className="text-white/80 text-sm mt-2">Redirecting to quote...</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Upload className="w-20 h-20 text-white animate-float" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Upload Your Files
            </h3>

            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Drag and drop any files here or click to select. 
              CAD files, drawings, photos, PDFs - we accept everything!
            </p>

            <Button
              onClick={handleFileSelect}
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6"
            >
              <Upload className="mr-3 h-5 w-5" />
              Select Files
            </Button>

            <div className="flex flex-wrap justify-center gap-2 text-sm text-white/70">
              <span>Accepted formats:</span>
              <span className="font-mono bg-white/10 px-2 py-1 rounded">STEP</span>
              <span className="font-mono bg-white/10 px-2 py-1 rounded">DWG</span>
              <span className="font-mono bg-white/10 px-2 py-1 rounded">STL</span>
              <span className="font-mono bg-white/10 px-2 py-1 rounded">PDF</span>
              <span className="text-white/50">and more...</span>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center">
              <File className="mr-2 h-5 w-5" />
              Uploaded Files ({files.length})
            </h4>
            
            <div className="grid gap-3">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center">
                      <File className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate text-sm">
                        {fileItem.file.name}
                      </p>
                      <p className="text-white/60 text-xs">
                        {formatFileSize(fileItem.file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <X className="h-4 w-4 text-white/70 hover:text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
