
import Link from 'next/link'
import Image from 'next/image'
import { Factory, CheckCircle, ArrowRight, Box, Layers, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const technologies = [
  {
    name: 'FDM (Fused Deposition Modeling)',
    description: 'Most cost-effective for functional prototypes and production parts',
    materials: ['PLA', 'ABS', 'PETG', 'Nylon', 'Carbon Fiber']
  },
  {
    name: 'SLA (Stereolithography)',
    description: 'High-resolution prints with smooth surface finish',
    materials: ['Standard Resin', 'Tough Resin', 'Flexible Resin', 'Castable Resin']
  },
  {
    name: 'SLS (Selective Laser Sintering)',
    description: 'Strong, functional parts without support structures',
    materials: ['Nylon PA12', 'Glass-filled Nylon', 'Metal-filled Nylon']
  }
]

const applications = [
  { title: 'Rapid Prototyping', description: 'Fast iterations for design validation and testing' },
  { title: 'Low-Volume Production', description: 'Cost-effective for small batch manufacturing' },
  { title: 'Complex Geometries', description: 'Parts impossible with traditional manufacturing' },
  { title: 'Custom Tooling', description: 'Jigs, fixtures, and manufacturing aids' }
]

const advantages = [
  { title: 'Speed', description: 'From design to part in 24-72 hours', icon: Clock },
  { title: 'Complexity', description: 'No geometry limitations', icon: Box },
  { title: 'Cost-Effective', description: 'No tooling costs for small quantities', icon: Layers }
]

export default function ThreeDPrintingPage() {
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
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Box className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              3D Printing Services
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Rapid prototyping and low-volume production using advanced 3D printing technologies
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              3D Printing Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple technologies to meet your specific requirements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Box className="h-10 w-10 text-purple-600 mb-3" />
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-2">Materials:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.materials.map((material, materialIndex) => (
                      <span key={materialIndex} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                        {material}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src="https://cdn.abacus.ai/images/683a912b-7fbe-4f75-9e60-9a28b5fe35cd.png"
              alt="Professional 3D printing technology creating complex parts"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              3D Printing Applications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From prototyping to production, we have you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Layers className="h-8 w-8 text-purple-600 mb-3" />
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose 3D Printing?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unique advantages for modern product development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <advantage.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{advantage.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Clock className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fast Turnaround Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-200 mb-2">Step 1</div>
                <div className="text-purple-100">Upload CAD files</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-200 mb-2">Step 2</div>
                <div className="text-purple-100">Quote within 24hrs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-200 mb-2">Step 3</div>
                <div className="text-purple-100">Print & quality check</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-200 mb-2">Step 4</div>
                <div className="text-purple-100">Ship within 72hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Bring Your Design to Life?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your STL files and get a 3D printing quote today
          </p>
          <Link href="/quote">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              Request 3D Printing Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
