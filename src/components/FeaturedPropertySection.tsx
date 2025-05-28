import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Car, Wine, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedPropertySection() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="order-2 space-y-8 lg:order-1">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Featured Property
              </Badge>
              <h2 className="font-radio-canada text-4xl font-bold text-gray-900 md:text-5xl">
                Heritage Villas
              </h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5" />
                <span className="text-lg">Ngong 46, Oloolua, Ngong Town</span>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-600">
              Experience luxury living at Heritage Villas, located at Ngong 42,
              Oloolua, Priced at Ksh 27.5M, this 240m² smart home offers 4
              bedrooms, 3 bathrooms, and spacious living areas. Enjoy energy
              efficiency, natural light, security systems, outdoor spaces, and 2
              bar areas perfect for 8+ guests. Built in 2025.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Bed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">4 Bedrooms</p>
                  <p className="text-sm text-gray-600">Spacious and elegant</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Bath className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">3 Bathrooms</p>
                  <p className="text-sm text-gray-600">Modern fixtures</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Parking Space</p>
                  <p className="text-sm text-gray-600">3 car garage</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wine className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2 Bar Areas</p>
                  <p className="text-sm text-gray-600">Entertainment ready</p>
                </div>
              </div>
            </div>

            {/* CTA and Price */}
            <div className="flex flex-col items-start justify-between rounded-2xl bg-gray-50 p-6 sm:flex-row sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="mb-1 text-sm text-gray-600">Discounted Price</p>
                <div className="flex items-baseline space-x-2">
                  <span className="font-radio-canada text-3xl font-bold text-gray-900">
                    Ksh 27,500,000
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    Ksh 35,000,000
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="bg-primary px-6 py-3 text-white hover:bg-primary/90"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Property Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://i.ytimg.com/vi/Pz03N2A6b0U/maxresdefault.jpg"
                alt="Heritage Villas"
                className="h-[600px] w-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl bg-white/95 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="text-lg font-bold text-gray-900">240m²</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Built Year</p>
                      <p className="text-lg font-bold text-gray-900">2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Smart Home</p>
                      <p className="text-lg font-bold text-primary">Yes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Tour Badge */}
              <div className="absolute right-6 top-6">
                <Badge className="bg-primary px-4 py-2 text-white">
                  Ngong 46, Oloolua
                </Badge>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
