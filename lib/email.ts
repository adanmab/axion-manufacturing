
import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  bcc?: string | string[]
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

export async function sendEmail(options: EmailOptions) {
  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // App password from Gmail
    },
  })

  // Send email
  const info = await transporter.sendMail({
    from: `"Axion Manufacturing" <${process.env.GMAIL_USER}>`,
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc) : undefined,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  })

  return info
}
