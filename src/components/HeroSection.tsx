'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Car, Home, MapPin } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-sm px-4 py-2 bg-white text-black-700 border-red-200">
                <MapPin className="w-4 h-4 mr-1" />
                <a href="https://maps.app.goo.gl/cwn8XL6mS2VndSoB9">South B, Mukoma Road</a>
              </Badge>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-radio-canada font-bold text-gray-900 leading-tight">
                EXQUISITE
                <br />
                <span className="text-red-600">REFINEMENT</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Discover luxury living at its finest with our exclusive collection of
                premium properties. Where modern architecture meets timeless elegance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg shadow-lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" className="px-8 py-3 text-lg border-gray-300 hover:border-red-600 hover:text-red-600">
                  <Link href="/properties/futuristic-haven">View Details</Link>
                </Button>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-semibold text-gray-900">4</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold text-gray-900">5</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-red-600" />
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
                <span className="text-4xl font-radio-canada font-bold text-gray-900">Ksh.27,500,000 </span>
                
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.ytimg.com/vi/Pz03N2A6b0U/maxresdefault.jpg"
                  alt="Futuristic Haven - Modern Luxury Villa"
                  className="w-full h-[600px] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">Heritage Villas, Ngong 46, Oloolua</span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="font-bold text-lg text-gray-900">Ksh 24.5M</p>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
              <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
