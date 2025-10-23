
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, Factory, Globe, Clock, DollarSign, Zap, Settings, Layers3, Wrench, Shield, Star, Users, TrendingUp } from 'lucide-react'
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
    description: 'Precision CNC machining services for complex parts and prototypes with tight tolerances.',
    href: '/services/cnc-machining',
    icon: Settings,
    color: 'from-blue-600 to-cyan-600'
  },
  {
    title: 'Laser Cutting',
    description: 'High-precision laser cutting for sheet metal, plastics, and other materials.',
    href: '/services/laser-cutting',
    icon: Zap,
    color: 'from-slate-600 to-gray-600'
  },
  {
    title: '3D Printing',
    description: 'Rapid prototyping and production using advanced 3D printing technologies.',
    href: '/services/3d-printing',
    icon: Layers3,
    color: 'from-emerald-600 to-teal-600'
  },
  {
    title: 'Sheet Metal Fabrication',
    description: 'Complete sheet metal fabrication services including bending, welding, and assembly.',
    href: '/services/sheet-metal',
    icon: Wrench,
    color: 'from-blue-700 to-slate-700'
  }
]

const benefits = [
  {
    title: 'Competitive Pricing',
    description: 'Fair pricing with no hidden fees while maintaining exceptional quality',
    icon: DollarSign,
    color: 'from-emerald-600 to-green-700',
    stat: 'Best Value'
  },
  {
    title: 'Faster Turnaround',
    description: 'Efficient logistics enable faster shipping and communication',
    icon: Clock,
    color: 'from-blue-600 to-indigo-700',
    stat: '2-5 days'
  },
  {
    title: 'Quality Assurance',
    description: 'Advanced quality control processes and rigorous testing procedures',
    icon: Shield,
    color: 'from-slate-600 to-gray-700',
    stat: '99.9%'
  },
  {
    title: 'Manufacturing Excellence',
    description: 'Advanced technology with precision manufacturing capabilities',
    icon: Globe,
    color: 'from-teal-600 to-cyan-700',
    stat: '24/7'
  }
]

const stats = [
  {
    number: '1000+',
    label: 'Parts Manufactured',
    icon: Factory
  },
  {
    number: '50+',
    label: 'Happy Customers',
    icon: Users
  },
  {
    number: '99.9%',
    label: 'Quality Rate',
    icon: Star
  },
  {
    number: '24hrs',
    label: 'Quote Response',
    icon: TrendingUp
  }
]

export default function HomePage() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([])

  const handleFilesChange = async (files: FileWithPreview[]) => {
    setUploadedFiles(files)
    if (files.length > 0) {
      // Convert files to base64 and store in localStorage for the quote page
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
      
      // Auto-redirect to quote page when files are uploaded
      setTimeout(() => {
        router.push('/quote')
      }, 1000) // Small delay to show the upload success
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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://cdn.abacus.ai/images/82d5a33e-4a8d-47e3-8d67-d5cb8a786221.png)' }}
        ></div>
        
        {/* Gradient Overlays - More transparent to show background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-slate-800/60 to-teal-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delay opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/20">
                <span className="text-sm font-medium">🚀 Now Serving US Customers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)' }}>
                  Premium Quality
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  Manufacturing Services
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-white max-w-2xl mx-auto lg:mx-0 font-semibold" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)' }}>
                Get premium manufacturing services at competitive prices with faster turnaround times. 
                Experience the perfect blend of quality standards and cost efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
                <Link href="/services">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                    View Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-100">
                    <stat.icon className="h-5 w-5 text-blue-600 mx-auto lg:mx-0 mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
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

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-slate-100 text-slate-700 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">✨ Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Axion Manufacturing</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              We combine precision engineering standards with manufacturing efficiency to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative">
                <div className="benefit-card p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Stats badge */}
                  <div className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-bold mb-4">
                    {benefit.stat}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional trust indicators */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-8 font-medium">Trusted by companies across North America</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span className="font-semibold text-gray-700">Quality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-700">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span className="font-semibold text-gray-700">24h Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-slate-100 to-blue-100 text-slate-700 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">🔧 Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Manufacturing Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Complete manufacturing solutions powered by cutting-edge technology and expert craftsmanship
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <Link href={service.href}>
                  <div className="service-card p-8 rounded-2xl shadow-lg border border-gray-100 h-full relative overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors relative z-10">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 relative z-10">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Process flow */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Simple 3-Step Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold text-lg mb-4">1</div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Files</h4>
                <p className="text-gray-600 text-sm">Upload your CAD files and specifications</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-gray-600 text-white flex items-center justify-center font-bold text-lg mb-4">2</div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Quote</h4>
                <p className="text-gray-600 text-sm">Receive detailed quote within 24 hours</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg mb-4">3</div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Parts</h4>
                <p className="text-gray-600 text-sm">Receive high-quality parts on time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-slate-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delay opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <span className="text-sm font-semibold">🚀 Ready to Start Manufacturing?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Transform Your Ideas Into <br />
            <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">
              High-Quality Parts
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto font-medium">
            Upload your CAD files and get a custom quote within 24 hours. 
            Experience the Axion Manufacturing difference today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                Request Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                Talk to Expert
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
                <div className="relative h-10 w-48 flex items-center">
                  <Image src="/logo.png" alt="Axion Manufacturing Logo" width={192} height={40} className="object-contain [filter:brightness(0)_invert(1)]" />
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Premium manufacturing services delivering innovation and excellence. 
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
            <p className="text-gray-400">&copy; 2024 Axion Manufacturing. All rights reserved. Made with ❤️ for precision manufacturing excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
