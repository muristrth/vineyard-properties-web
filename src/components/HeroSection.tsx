import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bed, Car, Home, MapPin, Play, Camera, MousePointer, Star, Users, Award, ChevronLeft, ChevronRight, Eye } from 'lucide-react';


export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isVirtualTourActive, setIsVirtualTourActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  const luxuryImages = [
    'https://i.pinimg.com/474x/b1/e3/8f/b1e38ffac0937e95cf160ad9e5832c66.jpg',
    'https://media.licdn.com/dms/image/v2/C4D1BAQHTDmjdbF5aPQ/company-background_10000/company-background_10000/0/1619939865102/fine_urban_interiors_limited_cover?e=2147483647&v=beta&t=8c3YkvCM28lK3FIuVTILb6RyZ7yVSUVSL-_3ZoP3gcI',
    'https://mkaazirealestate.com/wp-content/uploads/2022/11/Heritage-villas-4.jpeg',
    'https://i0.wp.com/www.kachwanya.com/wp-content/uploads/2021/09/Heritage-villas.jpeg?fit=600%2C420&ssl=1',
    'https://ext.same-assets.com/2880436944/1376571947.jpeg',
    'https://ext.same-assets.com/2880436944/2026814827.png',
    'https://twende.ke/wp-content/uploads/2025/04/Ngong-Resort-1.jpg',
    'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  useEffect(() => {
    // Preload images
    luxuryImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsImageLoaded(true);
    });
  }, []);

  useEffect(() => {
    // Auto-rotate images every 4 seconds
    const interval = setInterval(() => {
      setImageTransition(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
        setImageTransition(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [luxuryImages.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startVirtualTour = () => {
    setIsVirtualTourActive(true);
    setTimeout(() => setIsVirtualTourActive(false), 10000);
  };

  const nextImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
      setImageTransition(false);
    }, 300);
  };

  const prevImage = () => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + luxuryImages.length) % luxuryImages.length);
      setImageTransition(false);
    }, 300);
  };

  const goToImage = (index: number) => {
    if (index !== currentImage) {
      setImageTransition(true);
      setTimeout(() => {
        setCurrentImage(index);
        setImageTransition(false);
      }, 300);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}></div>
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 0.3s ease-out'
          }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div 
            className="space-y-8 transform transition-all duration-1000 ease-out"
            style={{
              transform: `translateX(${mousePosition.x * 5}px) rotateY(${mousePosition.x * 2}deg)`,
            }}
          >
            {/* Location Badge */}
            <div className="space-y-2 animate-slideInLeft">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <MapPin className="mr-2 h-4 w-4 text-red-600 animate-bounce" />
                <span className="text-sm font-medium text-gray-700">South B, Mkoma Road</span>
                <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl animate-slideInLeft delay-200">
                Most trusted{' '}
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  Real Estate
                </span>
                <br />
                Agency in Kenya
              </h1>

              <p className="max-w-xl text-xl leading-relaxed text-gray-600 animate-slideInLeft delay-300">
                Discover luxury living at its finest with our exclusive
                collection of premium properties at Vineyard Properties Ltd. Where modern architecture
                meets timeless elegance.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 animate-slideInLeft delay-400">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">1000+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Award Winning</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row animate-slideInLeft delay-500">
                <button 
                  className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-lg text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Link href="tel:0729170156"><span>Call to View</span></Link>
                    <div className={`transform transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
                      📞
                    </div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                <button className="group border-2 border-gray-300 px-8 py-4 text-lg rounded-xl hover:border-red-600 hover:text-red-600 transform hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                  <span className="flex items-center justify-center space-x-2">
                    <span>View Property</span>
                    <MousePointer className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8 animate-slideInLeft delay-600">
              {[
                { icon: Bed, label: 'Bedrooms', value: '4', color: 'red' },
                { icon: Home, label: 'Bathrooms', value: '5', color: 'blue' },
                { icon: Car, label: 'Parking Space', value: '3 Cars', color: 'green' }
              ].map((feature, index) => (
                <div key={index} className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transform hover:scale-105 transition-all duration-300">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${feature.color}-50 group-hover:bg-${feature.color}-100 transition-colors duration-300`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{feature.label}</p>
                    <p className="font-bold text-gray-900 text-lg">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="pt-6 animate-slideInLeft delay-700">
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Ksh.27,500,000
                </span>
                <div className="animate-bounce">✨</div>
              </div>
              <p className="text-gray-500 mt-1">Starting price • Flexible payment terms available</p>
            </div>
          </div>

          {/* Right Content - Enhanced Image Section */}
          <div className="relative animate-slideInRight">
            <div 
              className="relative transform transition-all duration-300 hover:scale-105"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * 3}deg)`,
              }}
            >
              {/* Main Property Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="relative h-[600px] w-full">
                  {/* Interactive Image Background */}
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={luxuryImages[currentImage]}
                      alt={`Luxury Property ${currentImage + 1}`}
                      className={`h-full w-full object-cover transition-all duration-1000 ${
                        imageTransition ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
                      } ${isVirtualTourActive ? 'brightness-110 contrast-110' : 'brightness-100'}`}
                    />
                    
                    {/* Image Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    
                    {/* Interactive Hotspots */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-ping cursor-pointer hover:scale-150 transition-transform duration-300" 
                         onClick={() => alert('Living Room - Premium Italian marble flooring')} />
                    <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-blue-500 rounded-full animate-ping cursor-pointer hover:scale-150 transition-transform duration-300" 
                         onClick={() => alert('Master Bedroom - King-size with panoramic views')} />
                    <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-ping cursor-pointer hover:scale-150 transition-transform duration-300" 
                         onClick={() => alert('Kitchen - Modern appliances & granite countertops')} />
                  </div>

                  {/* Loading State */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10"
                    style={{
                      transform: `translateY(-50%) scale(${isHovered ? 1.1 : 1})`,
                    }}
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10"
                    style={{
                      transform: `translateY(-50%) scale(${isHovered ? 1.1 : 1})`,
                    }}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>

                 {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                
                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {luxuryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImage 
                          ? 'bg-red-500 scale-125 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentImage + 1} / {luxuryImages.length}
                  </span>
                </div>

                {/* Property Features Overlay */}
                <div className="absolute bottom-4 right-4 space-y-2">
                  <button 
                    onClick={() => alert('360° Virtual Reality Tour Available')}
                    className="block bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => alert('Floor Plans & Blueprints Available')}
                    className="block bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300"
                  >
                    <Home className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>

              {/* Floating Property Info Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Heritage Villas, Ngong</p>
                    <p className="text-xs text-gray-500">📍 Oloolua Ridge</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Ksh 27.5M
                  </p>
                  <div className="flex justify-center mt-1">
                    <div className="text-xs text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      Available
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Floating Elements */}
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-float blur-sm" />
              </div>
              <div className="absolute top-1/4 -right-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float-delayed blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>



      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }

        .animate-scaleX {
          animation: scaleX 1s ease-out 1s forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}