
import Image from 'next/image'
import Link from 'next/link'
import { Factory, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    title: 'CNC Machining',
    description: 'Precision CNC machining services for complex parts and prototypes with tight tolerances.',
    features: ['5-axis CNC machining', 'Precision tolerances ±0.0001"', 'Various materials supported', 'High-volume production'],
    href: '/services/cnc-machining',
    image: 'https://cdn.abacus.ai/images/3404bbdc-7c53-415f-88cc-d9f02ecc9a8b.png'
  },
  {
    title: 'Laser Cutting',
    description: 'High-precision laser cutting for sheet metal, plastics, and other materials.',
    features: ['CO2 and Fiber laser cutting', 'Thickness up to 1 inch', 'Complex geometries', 'Fast turnaround times'],
    href: '/services/laser-cutting',
    image: 'https://cdn.abacus.ai/images/a2556af3-c600-432c-b436-798048037213.png'
  },
  {
    title: '3D Printing',
    description: 'Rapid prototyping and production using advanced 3D printing technologies.',
    features: ['FDM, SLA, SLS technologies', 'Multiple material options', 'Rapid prototyping', 'Low-volume production'],
    href: '/services/3d-printing',
    image: 'https://cdn.abacus.ai/images/61f61c69-6de5-4822-919d-11925715aede.png'
  },
  {
    title: 'Sheet Metal Fabrication',
    description: 'Complete sheet metal fabrication services including bending, welding, and assembly.',
    features: ['Press brake forming', 'TIG/MIG welding', 'Assembly services', 'Finishing options'],
    href: '/services/sheet-metal',
    image: 'https://cdn.abacus.ai/images/45aa2848-af16-4e6c-9a7e-f094d1ce4066.png'
  }
]

export default function ServicesPage() {
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
              <span className="text-blue-600 font-semibold">Services</span>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link href="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-slate-700 to-teal-800 text-white py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delay opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <span className="text-sm font-semibold">🔧 Professional Manufacturing</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Our <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">Manufacturing Services</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-medium">
            Comprehensive manufacturing solutions with American quality standards and Mexican efficiency. 
            Experience precision, speed, and cost-effectiveness in every project.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-slate-100 text-slate-700 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">⚙️ What We Do</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Precision Manufacturing Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From rapid prototyping to high-volume production, we deliver exceptional quality across all manufacturing processes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-8">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="object-contain group-hover:scale-110 transition-transform duration-700 filter drop-shadow-lg"
                  />
                  
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 group-hover:from-blue-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
                  
                  {/* Service title overlay on hover */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">{service.title}</h3>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-0">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <div className="h-2 w-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={service.href} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 group-hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
            Transform Your Designs Into <br />
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
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
