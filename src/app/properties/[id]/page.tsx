"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Calendar,
  Share,
  Heart,
  Phone,
  Mail,
  ArrowLeft,
  Play,
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

// Define an interface for the Agent data
interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
}

// Define an interface for a single Property
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number; // Optional property
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize: number;
  yearBuilt: number;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  agent: Agent;
  virtualTour: boolean;
  featured: boolean;
}

// Mock property data - in a real app, this would come from an API
const propertyData: Record<string, Property> = { // Changed `any` to `Property`
  "serenity-height-villas": {
    id: "serenity-height-villas",
    title: "Serenity Height Villas",
    location: "15 S Aurora Ave, Miami, FL 33139",
    price: 570000,
    originalPrice: 620000,
    type: "Luxury Villa",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 1200,
    lotSize: 0.25,
    yearBuilt: 2023,
    images: [
      "https://ext.same-assets.com/2009473017/3139036848.svg",
      "https://ext.same-assets.com/2009473017/1292219655.jpeg",
      "https://ext.same-assets.com/2009473017/742755443.jpeg",
      "https://ext.same-assets.com/2009473017/299352832.jpeg",
      "https://ext.same-assets.com/2009473017/923357109.jpeg"
    ],
    description: "Experience luxury living at its finest in this stunning modern villa. Located in the prestigious Aurora Avenue neighborhood, this property offers exceptional design, premium finishes, and breathtaking views. The open-concept layout seamlessly blends indoor and outdoor living, perfect for entertaining and relaxation.",
    features: [
      "Open concept living",
      "Gourmet kitchen with premium appliances",
      "Master suite with walk-in closet",
      "Private pool and spa",
      "3-car garage",
      "Smart home technology",
      "Solar panels",
      "Landscaped gardens",
      "Security system",
      "Wine cellar"
    ],
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Spa",
      "Concierge Service",
      "Private Beach Access",
      "Tennis Court"
    ],
    agent: {
      name: "Sarah Vineyard",
      title: "Senior Real Estate Advisor",
      phone: "+1-555-VINEYARD",
      email: "sarah@vineyardproperties.com",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "futuristic-haven": {
    id: "futuristic-haven",
    title: "Futuristic Haven",
    location: "Palm Springs, CA 92262",
    price: 4750000,
    type: "Modern Architecture",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 2800,
    lotSize: 1.2,
    yearBuilt: 2024,
    images: [
      "https://ext.same-assets.com/2009473017/1082928151.svg",
      "https://ext.same-assets.com/2009473017/299352832.jpeg",
      "https://ext.same-assets.com/2009473017/923357109.jpeg"
    ],
    description: "A masterpiece of modern architecture featuring cutting-edge design and sustainable living. This futuristic haven represents the pinnacle of luxury living with smart home integration, energy-efficient systems, and breathtaking desert views.",
    features: [
      "Smart home automation",
      "Solar energy system",
      "Infinity pool",
      "Home theater",
      "Wine cellar",
      "Elevator",
      "Security system",
      "Landscaped gardens"
    ],
    amenities: [
      "Private Pool",
      "Mountain Views",
      "Desert Landscape",
      "Privacy",
      "Luxury Finishes"
    ],
    agent: {
      name: "Michael Chen",
      title: "Luxury Property Specialist",
      phone: "+1-555-VINEYARD",
      email: "michael@vineyardproperties.com",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  }
};

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = propertyData[propertyId];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/properties" className="text-primary hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Back Button */}
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/properties">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Property Gallery */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {property.virtualTour && (
                    <Button
                      onClick={() => setShowVirtualTour(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Virtual Tour
                    </Button>
                  )}
                  <Button variant="secondary" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    {property.images.length} Photos
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
                {property.images.slice(0, 4).map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 lg:h-24 rounded-lg overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {property.images.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium">
                        +{property.images.length - 4}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary text-white">{property.status}</Badge>
                  <Badge variant="secondary">{property.type}</Badge>
                  {property.featured && (
                    <Badge variant="outline" className="border-yellow-400 text-yellow-600">
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl font-radio-canada font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-radio-canada font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                  {property.originalPrice && property.originalPrice > property.price && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(property.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Property Stats */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Bed className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                      <p className="text-gray-600">Bedrooms</p>
                    </div>
                    <div className="text-center">
                      <Bath className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                      <p className="text-gray-600">Bathrooms</p>
                    </div>
                    <div className="text-center">
                      <Maximize className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.area.toLocaleString()}</p>
                      <p className="text-gray-600">Sq Ft</p>
                    </div>
                    <div className="text-center">
                      <Car className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{property.lotSize}</p>
                      <p className="text-gray-600">Acres</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-radio-canada font-bold text-gray-900 mb-4">
                    About This Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-radio-canada font-bold text-gray-900 mb-4">
                    Property Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-radio-canada font-bold text-gray-900 mb-4">
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-1">Year Built</p>
                      <p className="font-semibold">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Property Type</p>
                      <p className="font-semibold">{property.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Lot Size</p>
                      <p className="font-semibold">{property.lotSize} acres</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Status</p>
                      <p className="font-semibold">{property.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                    Contact Agent
                  </h3>

                  <div className="flex items-center mb-4">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{property.agent.name}</h4>
                      <p className="text-gray-600 text-sm">{property.agent.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone className="w-4 h-4 mr-2" />
                      Call {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Viewing
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />
                      Save Property
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share className="w-4 h-4 mr-2" />
                      Share Property
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Mortgage Calculator */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                    Mortgage Calculator
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(Math.round(property.price * 0.004))}
                      </p>
                      <p className="text-xs text-gray-500">*Based on 20% down, 30-year fixed at 7% APR</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Get Pre-Approved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}