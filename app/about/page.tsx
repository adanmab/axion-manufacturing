
import Link from 'next/link'
import Image from 'next/image'
import { Factory, CheckCircle, Globe, Users, Award, Clock, Shield, Settings, Zap, Layers3, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const advantages = [
  {
    title: 'Strategic Operations',
    description: 'Our facilities are strategically positioned for efficient logistics, faster shipping and seamless communication.',
    icon: Globe
  },
  {
    title: 'Expert Team',
    description: 'Skilled engineers and technicians with decades of experience in precision manufacturing.',
    icon: Users
  },
  {
    title: 'Quality Standards',
    description: 'Advanced quality control systems ensuring the highest manufacturing standards and consistency.',
    icon: Award
  },
  {
    title: 'Fast Delivery',
    description: 'Optimized logistics enable faster turnaround times for rapid project completion.',
    icon: Clock
  }
]

const stats = [
  { value: '24hrs', label: 'Average Quote Response Time' },
  { value: '99.5%', label: 'Quality Acceptance Rate' },
  { value: '500+', label: 'Projects Completed' },
  { value: '100%', label: 'Customer Satisfaction Focus' }
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
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <span className="text-blue-600 font-semibold">About</span>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Delivering Innovation <br />
              <span className="text-blue-200">and Manufacturing Excellence</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We combine the best of precision engineering standards and manufacturing efficiency
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600">
              Founded with the vision of making high-quality manufacturing accessible to American businesses
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-700">
            <p>
              Axion Manufacturing was born from a simple yet powerful idea: businesses deserve access to 
              high-quality manufacturing at competitive prices without compromising on quality or turnaround times.
            </p>
            
            <p>
              Our founders, with over 30 years of combined experience in the manufacturing industry, recognized 
              the challenges faced by companies in balancing cost, quality, and speed. Traditional overseas 
              manufacturing often meant long lead times, communication barriers, and quality concerns. Domestic 
              manufacturing, while high-quality, often came with prohibitive costs.
            </p>
            
            <p>
              We present the perfect solution. With strategic operations, skilled workforce, and modern 
              manufacturing infrastructure, we offer our clients the best of both worlds: competitive 
              pricing with efficiency and quality assurance.
            </p>
            
            <p>
              Today, we operate state-of-the-art facilities equipped with the latest CNC machinery, laser cutting 
              systems, 3D printing technology, and sheet metal fabrication equipment. Our team of skilled engineers 
              and technicians work closely with clients to deliver precision parts and components that meet 
              the highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Axion Advantage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Why companies choose Axion for their manufacturing needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <advantage.icon className="h-12 w-12 text-blue-600 mb-4" />
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

      {/* Quality Assurance */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Quality You Can Trust
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our advanced facilities and rigorous quality control processes ensure that every 
              part meets your exact specifications and quality requirements.
            </p>
            <Link href="/quote">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3">
                Start Your Project
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
