
import Link from 'next/link'
import Image from 'next/image'
import { Factory, CheckCircle, ArrowRight, Wrench, Settings, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const services = [
  {
    title: 'Cutting & Shearing',
    description: 'Precise cutting of sheet metal using various methods',
    processes: ['Laser cutting', 'Plasma cutting', 'Waterjet cutting', 'Shearing']
  },
  {
    title: 'Forming & Bending',
    description: 'Complex forming operations for custom shapes',
    processes: ['Press brake bending', 'Roll forming', 'Deep drawing', 'Stamping']
  },
  {
    title: 'Welding & Joining',
    description: 'Professional welding and assembly services',
    processes: ['TIG welding', 'MIG welding', 'Spot welding', 'Riveting']
  },
  {
    title: 'Finishing',
    description: 'Complete finishing services for professional results',
    processes: ['Powder coating', 'Anodizing', 'Plating', 'Painting']
  }
]

const materials = [
  { name: 'Mild Steel', thickness: '16 GA - 1/2"', description: 'A36, 1018, hot and cold rolled' },
  { name: 'Stainless Steel', thickness: '20 GA - 3/8"', description: '304, 316, 17-4 PH grades' },
  { name: 'Aluminum', thickness: '18 GA - 1/4"', description: '5052, 6061, and other alloys' },
  { name: 'Galvanized Steel', thickness: '18 GA - 1/4"', description: 'Hot-dip and electrogalvanized' },
  { name: 'Copper & Brass', thickness: '20 GA - 1/8"', description: 'Various copper alloys' }
]

const capabilities = [
  'Sheet sizes up to 60" x 120"',
  'Thickness from 20 GA to 1/2 inch',
  'Complex bends and forms',
  'Tight tolerances ±0.005"',
  'Assembly and sub-assembly services'
]

export default function SheetMetalPage() {
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
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Settings className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sheet Metal Fabrication
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete sheet metal fabrication services from cutting to finishing
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Fabrication Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From design to finished product, we handle all aspects of sheet metal fabrication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Wrench className="h-8 w-8 text-gray-600 mb-3" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.processes.map((process, processIndex) => (
                      <li key={processIndex} className="flex items-center text-gray-700">
                        <div className="h-2 w-2 bg-gray-600 rounded-full mr-3"></div>
                        {process}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced equipment and skilled craftsmen for superior results
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
                src="https://cdn.abacus.ai/images/ab6ef892-8180-4fa5-bf01-8749b22a207b.png"
                alt="Sheet metal fabrication with press brake machine"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Materials & Thickness Range
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wide selection of materials for all your fabrication needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <div className="text-sm text-gray-600 font-semibold">{material.thickness}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{material.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gray-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Clock className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Streamlined Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-300 mb-2">Week 1</div>
                <div className="text-gray-400">Design & Quote</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-300 mb-2">Week 2</div>
                <div className="text-gray-400">Material & Cutting</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-300 mb-2">Week 3</div>
                <div className="text-gray-400">Forming & Welding</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-300 mb-2">Week 4</div>
                <div className="text-gray-400">Finishing & Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready for Professional Sheet Metal Work?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your drawings and get a comprehensive fabrication quote
          </p>
          <Link href="/quote">
            <Button size="lg" className="bg-gray-700 hover:bg-gray-800 px-8 py-3">
              Request Fabrication Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
