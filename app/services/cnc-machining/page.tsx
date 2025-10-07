
import Link from 'next/link'
import Image from 'next/image'
import { Factory, CheckCircle, ArrowRight, Cog, Target, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const capabilities = [
  '3-axis, 4-axis, and 5-axis CNC machining',
  'Precision tolerances up to ±0.0001"',
  'Parts from 0.5" to 60" in any dimension',
  'Production quantities from 1 to 10,000+ pieces',
  'Various materials: aluminum, steel, stainless steel, titanium, plastics'
]

const materials = [
  { name: 'Aluminum Alloys', description: '6061, 7075, and other aerospace grades' },
  { name: 'Stainless Steel', description: '304, 316, 17-4 PH, and specialty grades' },
  { name: 'Carbon Steel', description: '1018, 4140, A36, and tool steels' },
  { name: 'Titanium', description: 'Grade 2, Grade 5 (Ti-6Al-4V)' },
  { name: 'Engineering Plastics', description: 'PEEK, POM, Nylon, HDPE, and more' }
]

const industries = [
  { name: 'Aerospace', icon: Target },
  { name: 'Automotive', icon: Cog },
  { name: 'Medical Device', icon: CheckCircle },
  { name: 'Electronics', icon: Factory },
  { name: 'Defense', icon: Target },
  { name: 'Energy', icon: Cog }
]

export default function CNCMachiningPage() {
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
              <Link href="/services" className="text-blue-600 font-semibold">
                Services
              </Link>
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cog className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CNC Machining Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Precision CNC machining for complex parts and prototypes with industry-leading tolerances
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Advanced CNC Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              State-of-the-art CNC equipment operated by skilled machinists
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-4">
                {capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://cdn.abacus.ai/images/3280c72c-86d9-48ba-8afd-e20d45d83e3d.png"
                alt="CNC Machining in action - precision aluminum parts manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Materials We Work With
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wide range of materials to meet your specific requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{material.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by leading companies across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="text-center">
                <industry.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Clock className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fast Turnaround Times
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              From quote to delivery in record time without compromising quality
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-200 mb-2">24hrs</div>
                <div className="text-blue-100">Quote Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-200 mb-2">3-7 Days</div>
                <div className="text-blue-100">Prototype Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-200 mb-2">2-3 Weeks</div>
                <div className="text-blue-100">Production Parts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Your Parts Machined?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your CAD files and get a detailed CNC machining quote in 24 hours
          </p>
          <Link href="/quote">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Request CNC Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
