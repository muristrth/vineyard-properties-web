import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Bed, Bath, Square, MapPin, Heart, Eye, Camera, Play, Star, TrendingUp, Award, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredProperties = [
  {
    id: 'heritage-villas-ngong',
    title: 'Luxurious 4 Bedroom Plus DSQ For Sale Heritage Villas, Ngong',
    location: 'Ngong Town, Kenya',
    price: 27500000,
    image: '/p17 heritage/IMG-20250421-WA0093.jpg',
    bedrooms: 4,
    bathrooms: 5,
    area: 240,
    type: 'House',
    featured: true,
    rating: 4.9,
    views: 1250,
    status: 'Available'
  },
  {
    id: 'plot-nrbwest',
    title: '1/4 Acre Prime Plot in Nairobi West Shopping Centre',
    location: 'Nairobi West, Nairobi',
    price: 120000000,
    image: 'https://ext.same-assets.com/2880436944/513979610.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    type: 'Residential Property',
    featured: true,
    rating: 4.8,
    views: 890,
    status: 'Hot Deal'
  },
  {
    id: 'kiambu-windsor',
    title: '4bdrm House Ensuite + 2 ensuite DSQs in Windsor Villas, Mushroom Gardens',
    location: 'Mushroom Gardens, Kiambu Road',
    price: 80000000,
    image: 'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/1E2ACC81-C233-441F-BEF0-A6C448D14BBB-1170x720.jpeg.webp',
    bedrooms: 4,
    bathrooms: 6,
    area: 2000,
    type: 'House',
    featured: true,
    rating: 4.7,
    views: 2100,
    status: 'Premium'
  },
  {
    id: 'ridgeways-mansion',
    title: '9bdrm Mansion in Ridgeways Gardens',
    location: 'Nairobi, Ridgeways',
    price: 165000000,
    image: 'https://ext.same-assets.com/2880436944/2026814827.png',
    bedrooms: 9,
    bathrooms: 6,
    area: 5000,
    type: 'Luxury Mansion',
    featured: true,
    rating: 5.0,
    views: 3200,
    status: 'Exclusive'
  },
  {
    id: 'muthaiga-mansion',
    title: '3bdrm Mansion in 3 Acres Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 350000000,
    image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800',
    bedrooms: 3,
    bathrooms: 4,
    area: 500,
    type: 'Luxury Mansion',
    featured: true,
    rating: 4.9,
    views: 4500,
    status: 'Ultra Luxury'
  },
  {
    id: 'kinoo-plot',
    title: 'Kinoo 1/4 Acre Plot in Nairobi',
    location: 'Kiambu, Kikuyu',
    price: 20000000,
    image: 'p10 kinoo/IMG-20250421-WA0107.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 180,
    type: 'Land',
    featured: false,
    rating: 3.9,
    views: 780,
    status: 'New Listing'
  },
];

export default function PropertiesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVirtualTourActive, setIsVirtualTourActive] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const toggleLike = (propertyId: string) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const startVirtualTour = (propertyId: string) => {
    setIsVirtualTourActive(propertyId);
    setTimeout(() => setIsVirtualTourActive(null), 6000);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `Ksh ${(price / 1000000).toFixed(1)}M`;
    }
    return `Ksh ${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Deal': return 'bg-red-500';
      case 'Premium': return 'bg-purple-500';
      case 'Exclusive': return 'bg-blue-500';
      case 'Ultra Luxury': return 'bg-yellow-500';
      case 'New Listing': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
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
        {[...Array(12)].map((_, i) => (
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center animate-slideInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg mb-6">
            <Award className="mr-2 h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Premium Properties</span>
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Discover{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              Inspiring Designed
            </span>
            <br />
            Homes
          </h2>
          
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 mb-8">
            Curated homes where elegance, style, and comfort unite in perfect harmony
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>500+ Properties Sold</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Award Winning Agency</span>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="group relative transform transition-all duration-500 hover:scale-105 animate-slideInUp"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: hoveredProperty === property.id 
                  ? `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * 1}deg) scale(1.05)` 
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
              }}
              onMouseEnter={() => setHoveredProperty(property.id)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              {/* Property Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-3xl transition-all duration-500 border border-white/20">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      filter: isVirtualTourActive === property.id ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)',
                    }}
                  />
                  
                  {/* Virtual Tour Overlay */}
                  {isVirtualTourActive === property.id && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-center animate-pulse">
                        <Camera className="w-12 h-12 mx-auto mb-2 animate-spin" />
                        <p className="text-sm font-semibold">Virtual Tour</p>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(property.status)} shadow-lg`}>
                    {property.status}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleLike(property.id)}
                      className={`p-2 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 ${
                        likedProperties.has(property.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedProperties.has(property.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => startVirtualTour(property.id)}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-blue-600 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(property.image)}
                      className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-green-600 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Views Counter */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 text-xs text-gray-600">
                    <Eye className="w-3 h-3" />
                    <span>{property.views}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(property.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{property.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{property.type}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Features */}
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="w-4 h-4" />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-xs text-gray-500">Starting price</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-medium">
                      <Link href={`/properties/${property.id}`}>View Property</Link>
                    </button>
                  </div>
                </div>

                {/* 3D Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-float-delayed blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-slideInUp delay-800">
          <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Link href={`/properties/`}>
              <span>View All Listings</span></Link>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
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
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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
          animation: float 2s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 2s ease-in-out infinite 1s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}