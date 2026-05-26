import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, Clock, Shield, Settings, Zap, Layers3, Wrench, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    title: 'CNC Machining',
    description: 'Multi-axis CNC machining for precision components, prototypes, and production runs. We hold tight tolerances on a wide range of materials — including challenging alloys used in the energy and aerospace sectors.',
    features: [
      '3-axis and 5-axis CNC machining',
      'Tolerances to ±0.0001"',
      'Aluminum, stainless steel, carbon steel, titanium, Inconel, PEEK, and more',
      'Prototype to high-volume production',
      'Dimensional inspection report included',
    ],
    href: '/services/cnc-machining',
    image: 'https://cdn.abacus.ai/images/3404bbdc-7c53-415f-88cc-d9f02ecc9a8b.png'
  },
  {
    title: 'Laser Cutting',
    description: 'High-precision CO2 and fiber laser cutting for sheet metal, plastics, and specialty materials. Ideal for complex geometries, flanges, brackets, and enclosures.',
    features: [
      'CO2 and fiber laser cutting',
      'Material thickness up to 1"',
      'Mild steel, stainless, aluminum, copper, plastics',
      'Complex geometries with tight dimensional accuracy',
      'Deburring and finishing available',
    ],
    href: '/services/laser-cutting',
    image: 'https://cdn.abacus.ai/images/a2556af3-c600-432c-b436-798048037213.png'
  },
  {
    title: '3D Printing',
    description: 'Rapid prototyping and low-volume production using FDM, SLA, and SLS technologies. Get physical parts in hand fast for design validation, fit checks, and functional testing.',
    features: [
      'FDM, SLA, and SLS technologies',
      'Engineering-grade materials: Nylon, ABS, PETG, Resin, TPU',
      'Ideal for prototypes and low-volume orders',
      'Fast turnaround — often same or next day',
      'Post-processing and finishing options',
    ],
    href: '/services/3d-printing',
    image: 'https://cdn.abacus.ai/images/61f61c69-6de5-4822-919d-11925715aede.png'
  },
  {
    title: 'Sheet Metal Fabrication',
    description: 'Full-service sheet metal fabrication including cutting, forming, welding, and assembly. We handle one-off custom parts and repeat production runs for industrial applications.',
    features: [
      'Press brake forming and bending',
      'TIG and MIG welding',
      'Structural assembly and hardware insertion',
      'Powder coat, anodize, and other finishing options',
      'Mild steel, stainless steel, aluminum',
    ],
    href: '/services/sheet-metal',
    image: 'https://cdn.abacus.ai/images/45aa2848-af16-4e6c-9a7e-f094d1ce4066.png'
  }
]

const industries = [
  'Oil & Gas', 'Energy & Power', 'Aerospace', 'Industrial Equipment',
  'Medical Devices', 'Defense', 'Automation', 'Marine'
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-slate-700 to-teal-800 text-white py-24 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delay opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-teal-300" />
            <span className="text-teal-300 font-medium">Houston, TX — Serving the US Market</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-3xl">
            Precision <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-teal-300 bg-clip-text text-transparent">Manufacturing Services</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl font-medium">
            CNC machining, laser cutting, sheet metal fabrication, and 3D printing — delivered with speed, accuracy, and full documentation.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-6">Industries Served</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, i) => (
              <span key={i} className="bg-white/10 border border-white/10 text-gray-300 text-sm font-medium px-4 py-2 rounded-full">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From prototype to production — we deliver quality parts with full traceability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-0 bg-white overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-8">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="object-contain group-hover:scale-105 transition-transform duration-700 filter drop-shadow-lg"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 font-semibold">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-slate-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get a Quote?</h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Upload your CAD files or drawings and receive a detailed quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105">
                Request Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Talk to Our Team
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <Phone className="h-4 w-4" />
            <span>Or call us: <a href="tel:+18325550100" className="text-white font-semibold hover:underline">(832) 555-0100</a></span>
          </div>
        </div>
      </section>
    </div>
  )
}
