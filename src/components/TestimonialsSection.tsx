import React, { useState, useEffect } from 'react';
import { Star, Quote, Play, Camera, Users, Award, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    quote: "This property exceeded all our expectations. The virtual tour was incredibly detailed and helped us make the perfect choice. Absolutely loved every moment!",
    name: "John Doe",
    role: "Property Investor",
    rating: 5,
    location: "Nairobi, Kenya",
    propertyType: "Luxury Villa"
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    quote: "A beautiful experience from start to finish. The attention to detail in both the property and the service was incredible. Highly professional team!",
    name: "Jane Smith",
    role: "First-time Buyer",
    rating: 5,
    location: "Mombasa, Kenya",
    propertyType: "Modern Apartment"
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    quote: "The best real estate experience ever! The 3D virtual tours and professional guidance made everything seamless. Will definitely recommend to friends.",
    name: "Emily Johnson",
    role: "Real Estate Developer",
    rating: 5,
    location: "Kisumu, Kenya",
    propertyType: "Commercial Space"
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    quote: "Truly luxurious and comfortable properties. The virtual reality experience was mind-blowing. Perfect investment opportunity with great returns.",
    name: "Michael Brown",
    role: "Business Owner",
    rating: 5,
    location: "Eldoret, Kenya",
    propertyType: "Investment Property"
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800',
    quote: "Fantastic service and amazing properties! The team's expertise and the innovative virtual tour technology made our decision easy. Highly recommend!",
    name: "Sarah Lee",
    role: "Interior Designer",
    rating: 5,
    location: "Nakuru, Kenya",
    propertyType: "Designer Home"
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVirtualTourActive, setIsVirtualTourActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const startVirtualTour = (_testimonial: { id: number; image: string; quote: string; name: string; role: string; rating: number; location: string; propertyType: string; } | undefined) => {
    setIsVirtualTourActive(true);
    setTimeout(() => setIsVirtualTourActive(false), 8000);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl animate-bounce" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slideInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg mb-6">
            <Users className="mr-2 h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Client Testimonials</span>
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              Happy Clients
            </span>
            <br />
            Say About Us
          </h2>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-green-500" />
              <span>500+ Happy Clients</span>
            </div>
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Testimonial Content */}
          <div 
            className="space-y-8 transform transition-all duration-1000"
            style={{
              transform: `translateX(${mousePosition.x * 3}px) rotateY(${mousePosition.x * 1}deg)`,
            }}
          >
            {/* Quote Icon */}
            <div className="relative">
              <Quote className="w-16 h-16 text-blue-500/20 absolute -top-4 -left-4" />
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <blockquote className="text-xl md:text-2xl font-light italic text-gray-800 leading-relaxed mb-6">
                  "{currentTestimonial ? currentTestimonial.quote : ''}"
                </blockquote>
                
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(currentTestimonial?.rating ?? 0)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                {/* Client Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{currentTestimonial?.name}</p>
                      <p className="text-sm text-gray-600">{currentTestimonial?.role}</p>
                      <p className="text-xs text-gray-500 mt-1">📍 {currentTestimonial?.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{currentTestimonial?.propertyType}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                        <span className="text-xs text-gray-500">Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevSlide}
                  className="group bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                </button>
                <button
                  onClick={nextSlide}
                  className="group bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/80 text-gray-600 border border-gray-300'
                }`}
              >
                {isAutoPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          {/* Right Side - Property Image with Virtual Tour */}
          <div className="relative">
            <div 
              className="relative transform transition-all duration-300 hover:scale-105"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * 2}deg)`,
              }}
            >
              {/* Main Property Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="relative h-[500px] w-full">
                  <img
                    src={currentTestimonial?.image}
                    alt={`Property testimonial from ${currentTestimonial?.name ?? ''}`}
                    className="h-full w-full object-cover transition-all duration-1000"
                    style={{
                      filter: isVirtualTourActive ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)',
                    }}
                  />
                  
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Interactive Buttons */}
                <button
                  onClick={() => startVirtualTour(currentTestimonial)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2 z-10"
                >
                  <Play className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Virtual Tour</span>
                </button>

                <button
                  onClick={() => setSelectedImage(currentTestimonial?.image ?? null)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2 z-10"
                >
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Full View</span>
                </button>

                {/* Property Info Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{currentTestimonial?.propertyType}</p>
                      <p className="text-xs text-gray-500">📍 {currentTestimonial?.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Floating Elements */}
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float blur-sm" />
              </div>
              <div className="absolute top-1/4 -right-8">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-float-delayed blur-sm" />
              </div>
            </div>
          </div>
        </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white/10 rounded-xl shadow-2xl overflow-hidden transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition-all duration-300 hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
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

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
}