
import Link from 'next/link'
import Image from 'next/image'
import { Factory, CheckCircle, ArrowRight, Zap, Layers, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const capabilities = [
  'CO2 and Fiber laser cutting technologies',
  'Material thickness from 0.5mm to 25mm',
  'Cutting area up to 60" x 120"',
  'Complex geometries and intricate patterns',
  'Clean, precise cuts with minimal post-processing'
]

const materials = [
  { name: 'Mild Steel', thickness: 'Up to 25mm', description: 'A36, 1018, and structural grades' },
  { name: 'Stainless Steel', thickness: 'Up to 20mm', description: '304, 316, and 17-4 PH' },
  { name: 'Aluminum', thickness: 'Up to 15mm', description: '5052, 6061, and other alloys' },
  { name: 'Brass & Copper', thickness: 'Up to 10mm', description: 'Various copper alloys' },
  { name: 'Plastics', thickness: 'Up to 12mm', description: 'Acrylic, polycarbonate, and more' }
]

const applications = [
  { title: 'Prototyping', description: 'Fast iteration and design validation' },
  { title: 'Sheet Metal Parts', description: 'Brackets, panels, and enclosures' },
  { title: 'Decorative Elements', description: 'Architectural and artistic pieces' },
  { title: 'Industrial Components', description: 'Machine parts and assemblies' }
]

export default function LaserCuttingPage() {
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
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 text-orange-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Laser Cutting Services
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              High-precision laser cutting for sheet metal, plastics, and complex geometries
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Advanced Laser Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              State-of-the-art CO2 and Fiber laser systems for superior cut quality
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
                src="https://cdn.abacus.ai/images/53cb9cbf-2c92-4b74-b92b-4835e7e87ef6.png"
                alt="Laser cutting metal in action with precision and sparks"
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
              Materials & Thickness Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wide range of materials with varying thickness capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <div className="text-sm text-orange-600 font-semibold">{material.thickness}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{material.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Laser Cutting Applications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Versatile solutions for various industries and applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Layers className="h-8 w-8 text-orange-600 mb-3" />
                  <CardTitle className="text-xl">{application.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{application.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Clock className="h-16 w-16 mx-auto mb-6 text-orange-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our Laser Cutting?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-200 mb-2">±0.003"</div>
                <div className="text-orange-100 text-lg">Cutting Tolerance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-200 mb-2">2-5 Days</div>
                <div className="text-orange-100 text-lg">Typical Turnaround</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-200 mb-2">99%+</div>
                <div className="text-orange-100 text-lg">First-Pass Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready for Precision Laser Cutting?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your design files and get a competitive laser cutting quote
          </p>
          <Link href="/quote">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 px-8 py-3">
              Request Laser Cutting Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
