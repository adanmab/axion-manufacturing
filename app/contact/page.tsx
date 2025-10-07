
import { ContactForm } from '@/components/contact-form'
import { Factory, MapPin, Mail, Clock, Globe, Shield, Settings, Zap, Layers3, Wrench } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const contactInfo = [
  {
    title: 'Address',
    icon: MapPin,
    details: ['Chihuahua 31114', 'Mexico']
  },
  {
    title: 'Email',
    icon: Mail,
    details: ['quote@axionmfg.net']
  },
  {
    title: 'Business Hours',
    icon: Clock,
    details: ['Monday - Friday: 8:00 AM - 6:00 PM PST', 'Saturday: 9:00 AM - 2:00 PM PST']
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
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <span className="text-blue-600 font-semibold">Contact</span>
              <Link href="/quote" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100">
            Ready to discuss your manufacturing project? We're here to help.
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg text-gray-900">
                        <info.icon className="h-5 w-5 text-blue-600 mr-3" />
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Quick Response Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    We respond to all inquiries within 24 hours via email. 
                    For urgent quotes, please use our contact form or email us directly.
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

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-lg text-gray-600">
              Strategically located in Chihuahua for easy access to US markets
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Chihuahua 31114, Mexico</h3>
              <p>Strategic location for efficient cross-border operations</p>
              <p>Easy logistics and communication with US customers</p>
            </div>
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
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Premium manufacturing services connecting US innovation with Mexican excellence. 
                Your trusted partner for quality manufacturing solutions.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span>Serving customers across North America</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal-400" />
                  <span>24-hour quote response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Quality controlled facilities</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services/cnc-machining" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Settings className="h-4 w-4" /><span>CNC Machining</span>
                </Link></li>
                <li><Link href="/services/laser-cutting" className="text-gray-400 hover:text-slate-400 transition-colors flex items-center space-x-2">
                  <Zap className="h-4 w-4" /><span>Laser Cutting</span>
                </Link></li>
                <li><Link href="/services/3d-printing" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center space-x-2">
                  <Layers3 className="h-4 w-4" /><span>3D Printing</span>
                </Link></li>
                <li><Link href="/services/sheet-metal" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Wrench className="h-4 w-4" /><span>Sheet Metal</span>
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors font-semibold">Get Quote</Link></li>
              </ul>
              
              {/* CTA in footer */}
              <div className="mt-8">
                <Link href="/quote">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Axion Manufacturing. All rights reserved. Made with ❤️ for US-Mexico manufacturing partnership.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
