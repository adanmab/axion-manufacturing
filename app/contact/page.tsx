import { ContactForm } from '@/components/contact-form'
import { MapPin, Mail, Clock, Phone, Shield, Settings, Zap, Layers3, Wrench } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const contactInfo = [
  {
    title: 'Location',
    icon: MapPin,
    details: ['Houston, TX 77002', 'Serving the US industrial market'],
    highlight: true
  },
  {
    title: 'Phone',
    icon: Phone,
    details: ['(832) 555-0100', 'Call or text during business hours'],
    link: 'tel:+18325550100'
  },
  {
    title: 'Email',
    icon: Mail,
    details: ['quote@axionmfg.net', 'Best for sending files and specs'],
    link: 'mailto:quote@axionmfg.net'
  },
  {
    title: 'Business Hours',
    icon: Clock,
    details: ['Mon–Fri: 8:00 AM – 6:00 PM CST', 'Sat: 9:00 AM – 1:00 PM CST'],
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <span className="text-blue-600 font-semibold">Contact</span>
              <Link href="/quote" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-teal-300" />
            <span className="text-teal-300 font-medium">Houston, TX</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Have a project in mind? Send us your files, specs, or questions — we respond within one business day.
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              {contactInfo.map((info, index) => (
                <Card key={index} className={`hover:shadow-md transition-shadow ${info.highlight ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-base text-gray-900">
                      <info.icon className={`h-5 w-5 mr-3 ${info.highlight ? 'text-blue-600' : 'text-blue-500'}`} />
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {info.details.map((detail, i) => (
                      <p key={i} className={`text-sm ${i === 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                        {info.link && i === 0 ? (
                          <a href={info.link} className="text-blue-600 hover:underline font-medium">{detail}</a>
                        ) : detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-green-50 border-green-200 mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-800 text-base flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    24-Hour Response Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 text-sm leading-relaxed">
                    We respond to all inquiries by the next business day. For urgent RFQs, call or text us directly at (832) 555-0100.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Area</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Based in Houston, TX — we ship precision parts to customers across the United States. Local pickup available by appointment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Houston Metro', desc: 'Same-day pickup available' },
              { label: 'Texas & Gulf Coast', desc: 'Next-day delivery options' },
              { label: 'Continental US', desc: 'Standard FedEx / UPS shipping' },
            ].map((area, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="font-bold text-gray-900 mb-1">{area.label}</div>
                <div className="text-sm text-gray-500">{area.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Image src="/logo.png" alt="Axion Manufacturing Logo" width={192} height={40} className="object-contain [filter:brightness(0)_invert(1)] mb-6" />
              <p className="text-gray-300 mb-6 text-base leading-relaxed max-w-md">
                Precision manufacturing services for Houston's energy, industrial, and aerospace sectors.
              </p>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-blue-400" /><span>Houston, TX 77002</span></div>
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
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white">Get Quote</Link></li>
              </ul>
              <Link href="/quote">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-sm">Start Your Project</Button>
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
