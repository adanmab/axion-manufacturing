import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Clock, Shield, Settings, Zap, Layers3, Wrench, MapPin, Phone, Globe, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const capabilities = [
  {
    title: 'Precision Engineering',
    description: 'Our team holds tolerances down to ±0.0001" across CNC machining, laser cutting, and sheet metal work. Every part is dimensionally verified before it ships.',
    icon: Award
  },
  {
    title: 'Responsive Team',
    description: 'We operate on Central time and respond to quote requests and engineering questions the same business day. No runaround, no unanswered emails.',
    icon: Clock
  },
  {
    title: 'Quality Documentation',
    description: 'We provide material certifications, dimensional inspection reports, and first article inspection (FAI) on request — the documentation procurement teams need.',
    icon: Shield
  },
  {
    title: 'Broad Capabilities',
    description: 'CNC machining, laser cutting, sheet metal fabrication, and 3D printing under one roof. Prototype runs and production orders both welcome.',
    icon: Settings
  }
]

const qualityProcesses = [
  'Dimensional inspection on every order',
  'Material certifications available',
  'First Article Inspection (FAI) on request',
  'Inspection reports provided with shipment',
  'Non-conformance review process',
  'Secure file handling for proprietary designs',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 flex items-center">
                <Image src="/logo.png" alt="Axion Manufacturing Logo" width={144} height={32} className="object-contain" />
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
              <span className="text-blue-600 font-semibold">About</span>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-teal-300" />
              <span className="text-teal-300 font-medium">Houston, TX</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Precision Manufacturing<br />
              <span className="text-blue-200">for Demanding Applications</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Axion Manufacturing delivers precision-machined parts, fabricated assemblies, and rapid prototypes to engineers and procurement teams across the US energy and industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="prose prose-lg text-gray-700 space-y-5">
            <p>
              Axion Manufacturing was founded by engineers who spent years on the other side of the table — sourcing parts, chasing quotes, and dealing with delivery delays. We built this company to solve those problems directly.
            </p>
            <p>
              We specialize in precision CNC machining, laser cutting, sheet metal fabrication, and 3D printing, with a focus on serving Houston's oil & gas, energy, and industrial equipment sectors. Our team brings over 30 years of combined manufacturing experience to every project.
            </p>
            <p>
              We keep things simple: you send us your files, we send you an accurate quote within 24 hours, and we deliver parts that meet your specs on time. No surprises, no excuses.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Axion Difference</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What sets us apart isn't a tagline — it's how we operate day to day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-blue-600 mb-3" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Quality You Can Verify</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We don't just say our parts meet spec — we document it. Every order includes dimensional inspection, and we can provide full material traceability and first article reports for regulated industries.
              </p>
              <ul className="space-y-3">
                {qualityProcesses.map((process, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{process}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-10 text-center">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '< 24 hrs', label: 'Quote Response' },
                  { value: '2–5 days', label: 'Avg. Lead Time' },
                  { value: '100%', label: 'Parts Inspected' },
                  { value: 'CST', label: 'Business Hours' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Send us your files or reach out to discuss your project. We respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-50 px-8 py-3 font-semibold">
                Request a Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-3 font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Image src="/logo.png" alt="Axion Manufacturing Logo" width={192} height={40} className="object-contain [filter:brightness(0)_invert(1)]" />
              </div>
              <p className="text-gray-300 mb-6 text-base leading-relaxed max-w-md">
                Precision manufacturing services for Houston's energy, industrial, and aerospace sectors.
              </p>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-blue-400" /><span>Houston, TX</span></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-teal-400" /><a href="tel:+18325550100" className="hover:text-white">(832) 555-0100</a></div>
                <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-green-400" /><span>Mon–Fri 8:00 AM – 6:00 PM CST</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-5">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/services/cnc-machining" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"><Settings className="h-4 w-4" />CNC Machining</Link></li>
                <li><Link href="/services/laser-cutting" className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2"><Zap className="h-4 w-4" />Laser Cutting</Link></li>
                <li><Link href="/services/3d-printing" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><Layers3 className="h-4 w-4" />3D Printing</Link></li>
                <li><Link href="/services/sheet-metal" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"><Wrench className="h-4 w-4" />Sheet Metal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-5">Company</h3>
              <ul className="space-y-3 text-sm mb-8">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors">Get Quote</Link></li>
              </ul>
              <Link href="/quote">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-sm">
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
