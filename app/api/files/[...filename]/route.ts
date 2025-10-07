
import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  try {
    const filename = params.filename.join('/')
    const filePath = path.join(process.cwd(), 'uploads', filename)
    
    try {
      const fileBuffer = await readFile(filePath)
      
      // Determine content type based on file extension
      const ext = path.extname(filename).toLowerCase()
      let contentType = 'application/octet-stream'
      
      const mimeTypes: { [key: string]: string } = {
        '.pdf': 'application/pdf',
        '.dwg': 'application/dwg',
        '.dxf': 'application/dxf',
        '.step': 'application/step',
        '.stp': 'application/step',
        '.stl': 'model/stl',
        '.iges': 'model/iges',
        '.igs': 'model/iges',
        '.3dm': 'model/3dm',
        '.x_t': 'model/parasolid'
      }
      
      if (mimeTypes[ext]) {
        contentType = mimeTypes[ext]
      }
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${path.basename(filename)}"`
        }
      })
    } catch (fileError) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
