
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Axion Manufacturing - US Quality Manufacturing in Mexico',
  description: 'Premium manufacturing services including CNC machining, laser cutting, 3D printing, and sheet metal fabrication with competitive pricing and fast turnaround.',
  keywords: 'manufacturing, CNC machining, laser cutting, 3D printing, sheet metal, Mexico manufacturing, US quality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster 
            position="top-right"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
