'use client'

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Car, Wine, MapPin, Phone, Eye, Heart, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedPropertySection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(1247);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Bed, title: '4 Bedrooms', subtitle: 'Spacious and elegant', color: 'from-blue-500 to-purple-500' },
    { icon: Bath, title: '3 Bathrooms', subtitle: 'Modern fixtures', color: 'from-cyan-500 to-blue-500' },
    { icon: Car, title: 'Parking Space', subtitle: '3 car garage', color: 'from-green-500 to-emerald-500' },
    { icon: Wine, title: '2 Bar Areas', subtitle: 'Entertainment ready', color: 'from-red-500 to-pink-500' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="order-2 space-y-8 lg:order-1 group">
            <div className="space-y-6 transform transition-all duration-700 group-hover:translate-x-2">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <Badge variant="secondary" className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  ✨ Featured Property
                </Badge>
              </div>
              
              <div className="relative">
                <h2 className="font-radio-canada text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent md:text-6xl leading-tight transform transition-all duration-500 hover:scale-105">
                  Heritage Villas
                </h2>
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-700"></div>
              </div>
              
              <div className="flex items-center text-gray-600 group/location hover:text-red-500 transition-colors duration-300">
                <div className="relative mr-3">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-0 group-hover/location:opacity-100 blur transition-opacity duration-300"></div>
                  <MapPin className="relative h-6 w-6 transform transition-transform duration-300 group-hover/location:scale-110" />
                </div>
                <span className="text-xl font-medium">Ngong 46, Oloolua, Ngong Town</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="relative text-xl leading-relaxed text-gray-700 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-105">
                Experience luxury living at Heritage Villas, located at Ngong 42,
                Oloolua, Priced at Ksh 27.5M, this 240m² smart home offers 4
                bedrooms, 3 bathrooms, and spacious living areas. Enjoy energy
                efficiency, natural light, security systems, outdoor spaces, and 2
                bar areas perfect for 8+ guests. Built in 2025.
              </p>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group/feature relative">
                  <div className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover/feature:opacity-100 rounded-2xl blur transition-opacity duration-300" style={{backgroundImage: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}></div>
                  <div className="relative flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} shadow-lg transform transition-all duration-300 group-hover/feature:scale-110 group-hover/feature:rotate-12`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{feature.title}</p>
                      <p className="text-gray-600">{feature.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA and Price */}
            <div className="relative group/cta">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col items-start justify-between rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50/50 backdrop-blur-sm p-8 border border-gray-200/50 shadow-2xl sm:flex-row sm:items-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <div className="mb-6 sm:mb-0">
                  <p className="mb-2 text-sm text-gray-600 font-medium">💰 Discounted Price</p>
                  <div className="flex items-baseline space-x-3">
                    <span className="font-radio-canada text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Ksh 27,500,000
                    </span>
                    <span className="text-xl text-gray-500 line-through relative">
                      Ksh 35,000,000
                    </span>
                  </div>
                  <p className="text-green-600 font-semibold mt-1">💸 Save Ksh 7,500,000</p>
                </div>
                
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`group/heart relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 ${
                      isLiked 
                        ? 'bg-red-500 border-red-500 text-white' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-6 w-6 transition-all duration-300 ${isLiked ? 'fill-current' : 'group-hover/heart:scale-125'}`} />
                  </button>
                  
                  <a
                    href="tel:0729170156"
                    className="group/phone relative bg-gradient-to-r from-red-600 to-red-500 px-4 py-4 text-white font-semibold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25 active:scale-95 flex items-center space-x-3"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-2xl opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300"></div>
                    <Phone className="relative h-5 w-5 transform transition-transform duration-300 group-hover/phone:rotate-12" />
                    <span className="relative">Get in Touch</span>
                    <ArrowRight className="relative h-5 w-5 transform transition-transform duration-300 group-hover/phone:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Content - Property Image */}
          <div className="relative order-1 lg:order-2 group/image">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-4xl">
              {/* Main Image */}
              <div className="relative">
                <img
                  src="https://i.ytimg.com/vi/Pz03N2A6b0U/maxresdefault.jpg"
                  alt="Heritage Villas"
                  className="h-[700px] w-full object-cover transform transition-all duration-700 group-hover/image:scale-110"
                />
                
                {/* Interactive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover/image:opacity-40 transition-opacity duration-500" />
                
                {/* Floating Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col space-y-3">
                  <button className="group/share bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl">
                    <Share2 className="h-5 w-5 text-gray-700 group-hover/share:text-blue-500" />
                  </button>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">{viewCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6 transform transition-all duration-500 group-hover/image:translate-y-0 translate-y-2">
                <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-2xl border border-white/20">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center group/stat">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-300"></div>
                        <p className="relative text-sm text-gray-600 font-medium">Total Area</p>
                        <p className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">240m²</p>
                      </div>
                    </div>
                    <div className="text-center group/stat">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-300"></div>
                        <p className="relative text-sm text-gray-600 font-medium">Built Year</p>
                        <p className="relative text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">2025</p>
                      </div>
                    </div>
                    <div className="text-center group/stat">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-0 group-hover/stat:opacity-20 blur transition-opacity duration-300"></div>
                        <p className="relative text-sm text-gray-600 font-medium">Smart Home</p>
                        <p className="relative text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Yes ✨</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Location Badge */}
              <div className="absolute left-6 top-6">
                <div className="relative group/badge">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-75 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="relative bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105">
                    📍 Ngong 46, Oloolua
                  </Badge>
                </div>
              </div>
            </div>

            {/* Enhanced Background Decorations */}
            <div className="absolute -right-12 -top-12 -z-10 w-40 h-40 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 -z-10 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -right-8 -z-10 w-32 h-32 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(3deg); }
          66% { transform: translateY(10px) rotate(-2deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}