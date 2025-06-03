'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bed, Car, Home, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="animate-fade-in space-y-8">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="text-black-700 border-red-200 bg-white px-4 py-2 text-sm"
              >
                <MapPin className="mr-1 h-4 w-4" />
                <a href="https://maps.app.goo.gl/cwn8XL6mS2VndSoB9">
                  South B, Mkoma Road
                </a>
              </Badge>
            </div>

            <div className="space-y-6">
              <h1 className="font-radio-canada text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
                Most trusted Real Estate
                <br />
                <span className="text-red-600">Agency in Kenya</span>
              </h1>

              <p className="max-w-xl text-xl leading-relaxed text-gray-600">
                Discover luxury living at its finest with our exclusive
                collection of premium properties. Where modern architecture
                meets timeless elegance.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  className="bg-red-600 px-8 py-3 text-lg text-white shadow-lg hover:bg-red-700"
                >
                  <a href="tel:0729170156" className="flex items-center space-x-2">
                    Call to View
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 px-8 py-3 text-lg hover:border-red-600 hover:text-red-600"
                >
                  <Link href="/properties/heritage-villas-ngong">View Property</Link>
                </Button>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <Bed className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-semibold text-gray-900">4</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <Home className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold text-gray-900">5</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <Car className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parking Space</p>
                  <p className="font-semibold text-gray-900">3 Cars</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="pt-6">
              <div className="flex items-baseline space-x-2">
                <span className="font-radio-canada text-4xl font-bold text-gray-900">
                  Ksh.27,500,000{' '}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://i.ytimg.com/vi/Pz03N2A6b0U/maxresdefault.jpg"
                  alt="Futuristic Haven - Modern Luxury Villa"
                  className="h-[600px] w-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-red-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Heritage Villas, Ngong 46, Oloolua
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-lg font-bold text-gray-900">Ksh 24.5M</p>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 transform">
              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gray-400/5 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
