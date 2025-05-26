"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin } from "lucide-react";

const allProperties = [
  {
    id: "serenity-height-villas",
    title: "Serenity Height Villas",
    location: "15 S Aurora Ave, Miami",
    price: 570000,
    image: "https://ext.same-assets.com/2009473017/3139036848.svg",
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
    type: "Villa",
    featured: true
  },
  {
    id: "mountain-retreat-villa",
    title: "Mountain Retreat Villa",
    location: "18 S Aurora Ave, Miami",
    price: 575000,
    image: "https://ext.same-assets.com/2009473017/1292219655.jpeg",
    bedrooms: 5,
    bathrooms: 2,
    area: 150,
    type: "Villa"
  },
  {
    id: "vista-grand",
    title: "Vista Grand",
    location: "Modern Luxe Villa",
    price: 580000,
    image: "https://ext.same-assets.com/2009473017/742755443.jpeg",
    bedrooms: 3,
    bathrooms: 4,
    area: 180,
    type: "Modern Villa"
  },
  {
    id: "maplewood-residence",
    title: "Maplewood Residence",
    location: "12 Emerald Heights, Los Angeles",
    price: 590000,
    image: "https://ext.same-assets.com/2009473017/3432988897.jpeg",
    bedrooms: 6,
    bathrooms: 3,
    area: 200,
    type: "Residence"
  },
  {
    id: "whispering-pines",
    title: "Whispering Pines",
    location: "25 Skyline Boulevard, San Diego",
    price: 710000,
    image: "https://ext.same-assets.com/2009473017/1802305335.jpeg",
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    type: "Modern Home"
  },
  {
    id: "catalyst-center",
    title: "The Catalyst Center",
    location: "18 Sapphire Bay Road, Naples",
    price: 630000,
    image: "https://ext.same-assets.com/2009473017/2758244008.jpeg",
    bedrooms: 4,
    bathrooms: 2,
    area: 130,
    type: "Center"
  },
  {
    id: "ocean-breeze-villa",
    title: "Ocean Breeze Villa",
    location: "45 Coastal Drive, Malibu",
    price: 1250000,
    image: "https://ext.same-assets.com/2009473017/299352832.jpeg",
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    type: "Luxury Villa"
  },
  {
    id: "city-lights-penthouse",
    title: "City Lights Penthouse",
    location: "88 Metropolitan Ave, New York",
    price: 2100000,
    image: "https://ext.same-assets.com/2009473017/923357109.jpeg",
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    type: "Penthouse"
  }
];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = propertyType === "all" || property.type.toLowerCase() === propertyType.toLowerCase();

    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = property.price;
      switch (priceRange) {
        case "under-600k":
          matchesPrice = price < 600000;
          break;
        case "600k-1m":
          matchesPrice = price >= 600000 && price < 1000000;
          break;
        case "1m-2m":
          matchesPrice = price >= 1000000 && price < 2000000;
          break;
        case "over-2m":
          matchesPrice = price >= 2000000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return 0; // Would sort by date if available
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-radio-canada font-bold mb-4">
              Premium Properties
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover exceptional homes and investment opportunities in prime locations
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search properties, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Property Type */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="modern villa">Modern Villa</SelectItem>
                <SelectItem value="residence">Residence</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="modern home">Modern Home</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-600k">Under $600K</SelectItem>
                <SelectItem value="600k-1m">$600K - $1M</SelectItem>
                <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                <SelectItem value="over-2m">Over $2M</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-radio-canada font-bold text-gray-900">
                {sortedProperties.length} Properties Found
              </h2>
              <p className="text-gray-600 mt-1">
                Showing premium properties in your area
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>

          {/* Properties Grid */}
          {sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available properties.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setPropertyType("all");
                  setPriceRange("all");
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {sortedProperties.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
