
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

// Increase body size limit to 50MB for large CAD files
export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const companyName = formData.get('companyName') as string || null
    const contactName = formData.get('contactName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string || null
    const projectName = formData.get('projectName') as string || null
    const description = formData.get('description') as string
    const service = formData.get('service') as string
    const material = formData.get('material') as string || null
    const quantity = parseInt(formData.get('quantity') as string)
    const timeline = formData.get('timeline') as string
    const requirements = formData.get('requirements') as string || null

    // Validate required fields
    if (!contactName || !email || !description || !service || !quantity || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create quote request in database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        companyName,
        contactName,
        email,
        phone,
        projectName,
        description,
        service,
        material,
        quantity,
        timeline,
        requirements,
        status: 'pending'
      }
    })

    // Handle file uploads and prepare attachments for email
    const uploadedFiles: Array<{
      fileName: string
      originalName: string
      filePath: string
      fileSize: number
      mimeType: string
    }> = []

    const emailAttachments: Array<{
      filename: string
      content: string
    }> = []

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Process uploaded files
    const entries = Array.from(formData.entries())
    console.log('📋 Total entries in formData:', entries.length)
    
    for (const [key, value] of entries) {
      if (key.startsWith('file_') && value instanceof File) {
        const file = value
        console.log(`📎 Processing file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`)
        
        if (file.size > 0) {
          // Convert file to buffer
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          // Generate unique filename
          const timestamp = Date.now()
          const randomId = Math.random().toString(36).substr(2, 9)
          const fileExtension = path.extname(file.name)
          const fileName = `${timestamp}_${randomId}${fileExtension}`
          const filePath = path.join(uploadsDir, fileName)
          
          // Save to disk
          await writeFile(filePath, buffer)
          
          // Store file info
          uploadedFiles.push({
            fileName,
            originalName: file.name,
            filePath: `uploads/${fileName}`,
            fileSize: file.size,
            mimeType: file.type || 'application/octet-stream'
          })

          // Prepare attachment for email (Resend requires base64)
          const base64Content = buffer.toString('base64')
          console.log(`✅ File converted to base64: ${file.name} (${base64Content.length} chars)`)
          
          emailAttachments.push({
            filename: file.name,
            content: base64Content
          })
        }
      }
    }
    
    console.log(`📧 Total attachments to send via email: ${emailAttachments.length}`)

    // Save file records to database
    if (uploadedFiles.length > 0) {
      await prisma.fileUpload.createMany({
        data: uploadedFiles.map(fileInfo => ({
          ...fileInfo,
          quoteRequestId: quoteRequest.id
        }))
      })
    }

    // Format email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
            .value { color: #1f2937; margin-bottom: 15px; }
            .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #3b82f6; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Nueva Solicitud de Cotización</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">ID: #${quoteRequest.id}</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>Información de Contacto</h2>
                ${companyName ? `<div><div class="label">Empresa:</div><div class="value">${companyName}</div></div>` : ''}
                <div><div class="label">Nombre de Contacto:</div><div class="value">${contactName}</div></div>
                <div><div class="label">Email:</div><div class="value">${email}</div></div>
                ${phone ? `<div><div class="label">Teléfono:</div><div class="value">${phone}</div></div>` : ''}
              </div>

              <div class="section">
                <h2>Detalles del Proyecto</h2>
                ${projectName ? `<div><div class="label">Nombre del Proyecto:</div><div class="value">${projectName}</div></div>` : ''}
                <div><div class="label">Servicio Solicitado:</div><div class="value">${service}</div></div>
                ${material ? `<div><div class="label">Material:</div><div class="value">${material}</div></div>` : ''}
                <div><div class="label">Cantidad:</div><div class="value">${quantity} unidades</div></div>
                <div><div class="label">Plazo de Entrega:</div><div class="value">${timeline}</div></div>
              </div>

              <div class="section">
                <h2>Descripción del Proyecto</h2>
                <div class="value" style="white-space: pre-wrap;">${description}</div>
              </div>

              ${requirements ? `
              <div class="section">
                <h2>Requerimientos Adicionales</h2>
                <div class="value" style="white-space: pre-wrap;">${requirements}</div>
              </div>
              ` : ''}

              ${uploadedFiles.length > 0 ? `
              <div class="section">
                <h2>Archivos Adjuntos (${uploadedFiles.length})</h2>
                <p style="color: #059669; font-weight: 500; margin-bottom: 10px;">
                  ✅ Los archivos están adjuntos a este correo. Revisa la sección de adjuntos de tu cliente de email.
                </p>
                <div class="value">
                  ${uploadedFiles.map(file => `
                    <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; margin-bottom: 8px;">
                      📎 ${file.originalName} (${(file.fileSize / 1024).toFixed(2)} KB)
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
            </div>

            <div class="footer">
              <p><strong>Axion Manufacturing</strong></p>
              <p>Esta es una solicitud de cotización automática generada desde axionmfg.net</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email using Resend
    try {
      // Initialize Resend only when needed
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      console.log(`📨 Sending email with ${emailAttachments.length} attachments`)
      emailAttachments.forEach(att => {
        console.log(`   - ${att.filename} (${att.content.length} chars in base64)`)
      })
      
      await resend.emails.send({
        from: 'Axion Manufacturing <quote@axionmfg.net>',
        to: ['quote@axionmfg.net'],
        replyTo: email,
        subject: `Nueva Cotización: ${service} - ${contactName}${companyName ? ` (${companyName})` : ''}`,
        html: emailHtml,
        attachments: emailAttachments.length > 0 ? emailAttachments : undefined
      })
      
      console.log('✅ Email sent successfully to quote@axionmfg.net')
    } catch (emailError: any) {
      console.error('❌ Error sending email:', emailError)
      console.error('Error details:', {
        message: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name
      })
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      quoteRequestId: quoteRequest.id,
      filesUploaded: uploadedFiles.length
    })

  } catch (error) {
    console.error('Error processing quote request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
