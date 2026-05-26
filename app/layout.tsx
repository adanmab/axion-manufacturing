'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, Clock, Shield, Settings, Zap, Layers3, Wrench, MapPin, Phone, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroFileUpload } from '@/components/hero-file-upload'

interface FileWithPreview {
  file: File
  id: string
}

const services = [
  {
    title: 'CNC Machining',
    description: 'Multi-axis CNC machining for complex parts and prototypes with tight tolerances. Aluminum, steel, stainless, titanium, and more.',
    href: '/services/cnc-machining',
    icon: Settings,
    color: 'from-blue-600 to-cyan-600',
    spec: 'Tolerances to ±0.0001"'
  },
  {
    title: 'Laser Cutting',
    description: 'High-precision CO2 and fiber laser cutting for sheet metal, plastics, and specialty materials up to 1" thick.',
    href: '/services/laser-cutting',
    icon: Zap,
    color: 'from-slate-600 to-gray-600',
    spec: 'Thickness up to 1"'
  },
  {
    title: '3D Printing',
    description: 'Rapid prototyping and production using FDM, SLA, and SLS technologies. Ideal for design validation and low-volume runs.',
    href: '/services/3d-printing',
    icon: Layers3,
    color: 'from-emerald-600 to-teal-600',
    spec: 'FDM · SLA · SLS'
  },
  {
    title: 'Sheet Metal Fabrication',
    description: 'Complete sheet metal services including press brake forming, TIG/MIG welding, assembly, and surface finishing.',
    href: '/services/sheet-metal',
    icon: Wrench,
    color: 'from-blue-700 to-slate-700',
    spec: 'Forming · Welding · Assembly'
  }
]

const industries = [
  { name: 'Oil & Gas', icon: '⚙️' },
  { name: 'Energy', icon: '⚡' },
  { name: 'Aerospace', icon: '✈️' },
  { name: 'Industrial Equipment', icon: '🏭' },
  { name: 'Medical Devices', icon: '🔬' },
  { name: 'Defense', icon: '🛡️' },
]

const whyUs = [
  {
    title: 'Fast Turnaround',
    description: 'Most orders ship in 2–5 business days. Rush options available for urgent needs.',
    icon: Clock,
    stat: '2–5 days'
  },
  {
    title: 'Quality Inspection',
    description: 'Every part goes through dimensional inspection. Material certifications available on request.',
    icon: Shield,
    stat: 'Inspected'
  },
  {
    title: '24-Hour Quotes',
    description: 'Upload your files and receive a detailed quote within one business day.',
    icon: CheckCircle,
    stat: '< 24 hrs'
  },
  {
    title: 'Houston-Based',
    description: 'Serving the Houston metro and US industrial markets. CST business hours, responsive team.',
    icon: MapPin,
    stat: 'Houston, TX'
  }
]

export default function HomePage() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])

  const handleFilesChange = async (files: FileWithPreview[]) => {
    setUploadedFiles(files)
    if (files.length > 0) {
      const filesData = await Promise.all(
        files.map(async (f) => {
          const buffer = await f.file.arrayBuffer()
          const base64 = btoa(
            new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
          return {
            id: f.id,
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
            base64: base64
          }
        })
      )
      localStorage.setItem('uploadedFiles', JSON.stringify(filesData))
      setTimeout(() => {
        router.push('/quote')
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-8 flex items-center">
                <Image src="/logo.png" alt="Axion Manufacturing Logo" width={144} height={32} className="object-contain" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium">
                Contact
              </Link>
              <Link href="/quote">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 glow-effect">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://cdn.abacus.ai/images/82d5a33e-4a8d-47e3-8d67-d5cb8a786221.png)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-slate-800/60 to-teal-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-white/20">
                <MapPin className="h-4 w-4 mr-2 text-teal-300" />
                <span className="text-sm font-medium">Houston, TX — Serving the US Industrial Sector</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>
                  Precision Parts,
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  Fast Turnaround
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-white max-w-2xl mx-auto lg:mx-0 font-semibold" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8)' }}>
                CNC machining, laser cutting, sheet metal fabrication, and 3D printing — serving Houston's energy and industrial sectors with 24-hour quotes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
                <Link href="/quote">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                    Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-3 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    View Services
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { label: '24-Hr Quotes', icon: Clock },
                  { label: 'Parts Inspected', icon: Shield },
                  { label: 'Houston, TX', icon: MapPin },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                    <item.icon className="h-4 w-4 text-teal-300" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - File Upload */}
            <div className="flex justify-center">
              <HeroFileUpload onFilesChange={handleFilesChange} initialFiles={uploadedFiles} />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Industries We Serve</p>
            <h2 className="text-2xl font-bold text-white">Supporting Houston's Core Industries</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300">
                <span className="text-2xl">{industry.icon}</span>
                <span className="text-sm font-medium text-gray-300 text-center">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Axion</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Industrial Buyers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand what engineers and procurement teams need — accurate quotes, on-time delivery, and parts that meet spec.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, index) => (
              <div key={index} className="benefit-card p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide">{item.stat}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Manufacturing <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From prototype to production — precision manufacturing across four core processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <Link href={service.href}>
                  <div className="service-card p-8 rounded-2xl shadow-lg border border-gray-100 h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} mb-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">{service.spec}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Learn More <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Your Files', desc: 'Send us your CAD files, drawings, or specs. We accept STEP, DWG, STL, PDF, and more.' },
              { step: '02', title: 'Receive Your Quote', desc: 'We review your files and send a detailed quote — material, lead time, and pricing — within 24 hours.' },
              { step: '03', title: 'Get Your Parts', desc: 'We manufacture your parts to spec and ship to your door. Most orders ready in 2–5 business days.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-5xl font-bold text-blue-100 mb-3">{item.step}</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-slate-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Upload your CAD files and get a detailed quote within 24 hours. Our team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105">
                Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Talk to Our Team
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70">
            <Phone className="h-4 w-4" />
            <span className="text-sm">Call or text: <a href="tel:+18325550100" className="text-white font-semibold hover:underline">(832) 555-0100</a></span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <div className="relative h-10 w-48 flex items-center">
                  <Image src="/logo.png" alt="Axion Manufacturing Logo" width={192} height={40} className="object-contain [filter:brightness(0)_invert(1)]" />
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-base leading-relaxed max-w-md">
                Precision manufacturing services for Houston's energy, industrial, and aerospace sectors. Fast quotes, reliable delivery, quality you can verify.
              </p>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Houston, TX — Serving the US Industrial Market</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-teal-400 flex-shrink-0" />
                  <a href="tel:+18325550100" className="hover:text-white transition-colors">(832) 555-0100</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span>Mon–Fri 8:00 AM – 6:00 PM CST</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold mb-5 text-white">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services/cnc-machining" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"><Settings className="h-4 w-4" />CNC Machining</Link></li>
                <li><Link href="/services/laser-cutting" className="text-gray-400 hover:text-gray-300 transition-colors text-sm flex items-center gap-2"><Zap className="h-4 w-4" />Laser Cutting</Link></li>
                <li><Link href="/services/3d-printing" className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2"><Layers3 className="h-4 w-4" />3D Printing</Link></li>
                <li><Link href="/services/sheet-metal" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"><Wrench className="h-4 w-4" />Sheet Metal</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold mb-5 text-white">Company</h3>
              <ul className="space-y-3 mb-8">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors text-sm">Get Quote</Link></li>
              </ul>
              <Link href="/quote">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all duration-300 text-sm">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">&copy; 2025 Axion Manufacturing. All rights reserved.</p>
            <p className="text-gray-600 text-sm">Houston, TX · quote@axionmfg.net · (832) 555-0100</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
