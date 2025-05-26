import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Car, Wine, MapPin } from "lucide-react";
import Link from "next/link";

export default function FeaturedPropertySection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Featured Property
              </Badge>
              <h2 className="text-4xl md:text-5xl font-radio-canada font-bold text-gray-900">
                Modern Luxe Villa
              </h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">20 S Aurora Ave, Miami</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Experience luxury living at Modern Luxe Villa, located at 20 S Aurora Ave, Miami.
              Priced at $1,650,500, this 560 ft smart home offers 4 bedrooms, 3 bathrooms, and
              spacious living areas. Enjoy energy efficiency, natural light, security systems,
              outdoor spaces, and 2 bar areas perfect for 8+ guests. Built in 2025.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bed className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">4 Bedrooms</p>
                  <p className="text-sm text-gray-600">Spacious and elegant</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bath className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">3 Bathrooms</p>
                  <p className="text-sm text-gray-600">Modern fixtures</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Parking Space</p>
                  <p className="text-sm text-gray-600">3 car garage</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wine className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2 Bar Areas</p>
                  <p className="text-sm text-gray-600">Entertainment ready</p>
                </div>
              </div>
            </div>

            {/* CTA and Price */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 rounded-2xl p-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-600 mb-1">Discounted Price</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-radio-canada font-bold text-gray-900">$1,650,500</span>
                  <span className="text-lg text-gray-500 line-through">$1,850,000</span>
                </div>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-3">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Property Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://ext.same-assets.com/2009473017/299352832.jpeg"
                alt="Modern Luxe Villa"
                className="w-full h-[600px] object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="font-bold text-lg text-gray-900">560 ft²</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Built Year</p>
                      <p className="font-bold text-lg text-gray-900">2025</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Smart Home</p>
                      <p className="font-bold text-lg text-primary">Yes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Tour Badge */}
              <div className="absolute top-6 right-6">
                <Badge className="bg-primary text-white px-4 py-2">
                  360° Virtual Tour
                </Badge>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
