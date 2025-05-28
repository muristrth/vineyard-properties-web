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
    id: "kiambu-windsor",
    title: "4bdrm House Ensuite + 2 ensuite DSQs in Windsor Villas, Mushroom Gardens",
    location: "Mushroom Gardens, Kiambu Road",
    price: 80000000,
    image: "https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/1E2ACC81-C233-441F-BEF0-A6C448D14BBB-1170x720.jpeg.webp",
    bedrooms: 4,
    bathrooms: 6,
    area: 2000,
    type: "House",
    featured: true
  },
  {
    id: "plot-nrbwest",
    title: "1/4 Acre Prime Plot in Nairobi West Shopping Centre",
    location: "Nairobi West, Nairobi",
    price: 120000000,
    image: "https://ext.same-assets.com/2880436944/513979610.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    type: "Land",
    featured: true
  },
  {
    id: "mlolongo-warehouse",
    title: "1/2 acre Warehouse GoDown for sale",
    location: "Mlolongo, Mombasa Road",
    price: 95000000,
    image: "/p25 godown mlolo/IMG-20250512-WA0032.jpg",
    bedrooms: 0,
    bathrooms: 0,
    area: 11600,
    type: "Commercial Property",
    featured: false
  },
  {
    id: "ridgeways-mansion",
    title: "9bdrm Mansion in Ridgeways Gardens",
    location: "Nairobi, Ridgeways",
    price: 165000000,
    image: "https://ext.same-assets.com/2880436944/2026814827.png",
    bedrooms: 9,
    bathrooms: 6,
    area: 5000,
    type: "House",
    featured: true
  },
  {
    id: "emali-land",
    title: "550 Acres Land for Sale in Emali Road",
    location: "Kajiado, Loitoktok",
    price: 4125000000,
    image: "https://ext.same-assets.com/2880436944/311664710.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "muthaiga-mansion",
    title: "3bdrm Mansion in 3 Acres Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 350000000,
    image: "https://ext.same-assets.com/2880436944/2862327400.jpeg",
    bedrooms: 3,
    bathrooms: 4,
    area: 500,
    type: "House",
    featured: true
  },
  {
    id: "edenville-villa",
    title: "3bdrm Villa in Edenville",
    location: "Kiambu, Kiambu / Kiambu",
    price: 26000000,
    image: "https://ext.same-assets.com/2880436944/1376571947.jpeg",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "House",
    featured: false
  },
  {
    id: "muthaiga-land",
    title: "1 Acres Residential Vacant Land for Sale in Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 230000000,
    image: "https://ext.same-assets.com/2880436944/4206399667.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: true
  },
  {
    id: "kitengela-plot",
    title: "50 by 100 Acre Plot for Sale in Kitengela",
    location: "Kajiado, Kitengela",
    price: 700000,
    image: "https://ext.same-assets.com/2880436944/515128159.png",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "karen-6acres",
    title: "6 Acres Residential Vacant Land for Sale in Karen",
    location: "Nairobi, Karen",
    price: 540000000,
    image: "https://ext.same-assets.com/3634728786/2403051608.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: true
  },
  {
    id: "syokimau-industrial",
    title: "2.5 Acres Commercial Industrial Property for Sale in Syokimau",
    location: "Machakos, Syokimau",
    price: 400000000,
    image: "https://ext.same-assets.com/3634728786/3440863984.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 57000,
    type: "Commercial Land",
    featured: true
  },
  {
    id: "cbd-commercial",
    title: "3506 m² Commercial Building for Sale in Central Business District",
    location: "Nairobi, Central Business District",
    price: 475000000,
    image: "https://ext.same-assets.com/3634728786/2651965371.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 3506,
    type: "Commercial Property",
    featured: true
  },
  {
    id: "westlands-land",
    title: "0.95 Acres Residential Vacant Land for Sale in Westlands",
    location: "Nairobi, Westlands",
    price: 430000000,
    image: "https://ext.same-assets.com/3634728786/3896291020.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "isinya-land",
    title: "50 Acres in Isinya Land for Sale",
    location: "Kajiado, Isinya",
    price: 14000000,
    image: "https://ext.same-assets.com/2880436944/2122315454.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Agricultural Land",
    featured: false
  },
  {
    id: "neema-gardens",
    title: "50 by 100 Land for Sale in Neema Gardens",
    location: "Kajiado, Kitengela",
    price: 1800000,
    image: "https://ext.same-assets.com/2880436944/986284101.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "kinoo-plot",
    title: "Kinoo 1/4 Acre Plot in Nairobi",
    location: "Kiambu, Kikuyu",
    price: 20000000,
    image: "https://ext.same-assets.com/2880436944/3486551979.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "joska-plots",
    title: "Joska Land for Sale",
    location: "Nairobi, Kamulu",
    price: 950000,
    image: "https://ext.same-assets.com/2880436944/3179128645.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "utawala-plots",
    title: "Utawala Zebra Plots for Sale",
    location: "Nairobi, Utawala",
    price: 2000000,
    image: "https://ext.same-assets.com/2880436944/1522192692.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Land",
    featured: false
  },
  {
    id: "syokimau-5acres",
    title: "5 Acres Vacant Land for Sale in Syokimau",
    location: "Machakos, Syokimau",
    price: 200000000,
    image: "https://ext.same-assets.com/2880436944/2093076440.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Commercial Land",
    featured: true
  },
  {
    id: "kisaju-10acres",
    title: "10 Acres in Kisaju Along Namanga Road",
    location: "Kajiado, Kisaju",
    price: 140000000,
    image: "https://ext.same-assets.com/2880436944/2390980102.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Agricultural Land",
    featured: false
  },
  {
    id: "syokimau-katani",
    title: "Syokimau Katani Road Plots for Sale",
    location: "Machakos, Syokimau",
    price: 4500000,
    image: "https://ext.same-assets.com/2880436944/2884670387.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Plot",
    featured: false
  },
  {
    id: "kitengela-bungalow",
    title: "3bdrm Bungalow In Mlimani Court",
    location: "Kajiado, Kitengela",
    price: 2800000,
    image: "https://ext.same-assets.com/2880436944/413641261.jpeg",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Bungalow",
    featured: false
  },
  {
    id: "kiambu-road-10acres",
    title: "10 Acres Vacant Land for Sale in Kiambu Road",
    location: "Nairobi, Nairobi Central",
    price: 600000000,
    image: "https://ext.same-assets.com/2880436944/3792112934.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Commercial Land",
    featured: true
  },
  {
    id: "karen-mansion",
    title: "13bdrm Mansion in Mayeast Road",
    location: "Nairobi, Karen",
    price: 400000000,
    image: "https://ext.same-assets.com/2880436944/312339966.jpeg",
    bedrooms: 13,
    bathrooms: 8,
    area: 8000,
    type: "Luxury Mansion",
    featured: true
  },
  {
    id: "lavington-land",
    title: "1/2 Acre Land in Lavington",
    location: "Nairobi, Kileleshwa",
    price: 135000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Land",
    featured: false
  },
  {
    id: "cbd-building",
    title: "3500m2 Commercial Building for Sale in Nairobi Town CBD",
    location: "Nairobi, Nairobi Central",
    price: 475000000,
    image: "https://ext.same-assets.com/2880436944/2115884790.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 3500,
    type: "Commercial Building",
    featured: true
  },
  {
    id: "athi-river-maisonette",
    title: "3bdrm Maisonette in Sidai Village",
    location: "Machakos, Athi River",
    price: 8500000,
    image: "https://ext.same-assets.com/2880436944/638900844.jpeg",
    bedrooms: 3,
    bathrooms: 2,
    area: 505,
    type: "Maisonette",
    featured: false
  },
  {
    id: "lavington-quarter-acre",
    title: "1/4 an Acre Touching James Gichuru Lavington Land for Sale",
    location: "Nairobi, Kileleshwa",
    price: 140000000,
    image: "https://ext.same-assets.com/2880436944/2969919925.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Land",
    featured: true
  },
  {
    id: "thika-commercial",
    title: "12.5 Acres Commercial Vacant Land for Sale in Thika",
    location: "Kiambu, Thika",
    price: 300000000,
    image: "https://ext.same-assets.com/2880436944/2292786202.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Commercial Land",
    featured: false
  },
  {
    id: "karen-villa",
    title: "4bdrm Villa in Karen, Nairobi Central for sale",
    location: "Nairobi, Karen",
    price: 400000000,
    image: "https://ext.same-assets.com/2880436944/3531345130.jpeg",
    bedrooms: 4,
    bathrooms: 3,
    area: 5000,
    type: "Luxury Villa",
    featured: true
  },
  {
    id: "kiambu-road-house",
    title: "5bdrm House in Kiambu Road",
    location: "Nairobi, Nairobi Central",
    price: 550000000,
    image: "/p18 5b 550M kia rd/IMG-20250510-WA0150.jpg",
    bedrooms: 5,
    bathrooms: 4,
    area: 5000,
    type: "Luxury House",
    featured: true
  },
  {
    id: "chyuna-estate",
    title: "5bdrm Mansion in Chyuna Estate",
    location: "Kajiado, Kitengela",
    price: 35000000,
    image: "https://ext.same-assets.com/2880436944/831122591.jpeg",
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    type: "Mansion",
    featured: false
  },
  {
    id: "ngong-plots",
    title: "Fully Serviced Plots for Sale in Ngong Oluulua Ngong 46",
    location: "Ngong, Kajiado",
    price: 7500000,
    image: "https://ext.same-assets.com/2880436944/4176058206.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Plot",
    featured: false
  },
  {
    id: "mombasa-industrial",
    title: "3 acres commercial industrial property for sale in Mombasa Road",
    location: "Nairobi, Mombasa Road",
    price: 990000000,
    image: "https://ext.same-assets.com/3634728786/575370584.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 100000,
    type: "Commercial Industrial",
    featured: true
  },
  {
    id: "redhill-land",
    title: "7.9 acres vacant land for sale in Redhill",
    location: "Nairobi, Redhill",
    price: 750000000,
    image: "https://ext.same-assets.com/3634728786/3300708784.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Land",
    featured: true
  },
  {
    id: "muthaiga-5bedroom",
    title: "5 bedroom house for sale in Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 600000000,
    image: "https://ext.same-assets.com/3634728786/3519000104.jpeg",
    bedrooms: 5,
    bathrooms: 4,
    area: 542,
    type: "Luxury House",
    featured: true
  },
  {
    id: "karen-9acres",
    title: "9 acres vacant land for sale in Karen",
    location: "Nairobi, Karen",
    price: 540000000,
    image: "https://ext.same-assets.com/3634728786/204887299.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Residential Land",
    featured: true
  },
  {
    id: "kikambala-beach",
    title: "15 acres vacant land for sale in Kikambala",
    location: "Kilifi, Kikambala",
    price: 420000000,
    image: "https://ext.same-assets.com/3634728786/1077470987.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Beach Land",
    featured: true
  },
  {
    id: "kileleshwa-apartment",
    title: "3 bedroom apartment for sale in Kileleshwa",
    location: "Nairobi, Kileleshwa",
    price: 18000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "Apartment",
    featured: false
  },
  {
    id: "runda-townhouse",
    title: "4 bedroom townhouse for sale in Runda",
    location: "Nairobi, Runda",
    price: 45000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    type: "Townhouse",
    featured: true
  },
  {
    id: "westgate-mall-shop",
    title: "Retail shop for sale at Westgate Mall",
    location: "Nairobi, Westlands",
    price: 25000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    type: "Commercial Retail",
    featured: false
  },
  {
    id: "nyali-beachfront",
    title: "5 bedroom beachfront villa in Nyali",
    location: "Mombasa, Nyali",
    price: 180000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    type: "Beach Villa",
    featured: true
  },
  {
    id: "nakuru-farm",
    title: "200 acres dairy farm for sale in Nakuru",
    location: "Nakuru, Nakuru County",
    price: 150000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    type: "Dairy Farm",
    featured: false
  },
  {
    id: "thika-factory",
    title: "Manufacturing factory for sale in Thika",
    location: "Kiambu, Thika",
    price: 800000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    type: "Industrial Factory",
    featured: true
  },
  {
    id: "gigiri-penthouse",
    title: "Luxury penthouse for sale in Gigiri",
    location: "Nairobi, Gigiri",
    price: 85000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    type: "Penthouse",
    featured: true
  },
  {
    id: "eldoret-maisonette",
    title: "4 bedroom maisonette for sale in Eldoret",
    location: "Uasin Gishu, Eldoret",
    price: 12000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "Maisonette",
    featured: false
  },
  {
    id: "nanyuki-cottage",
    title: "Mountain cottage for sale in Nanyuki",
    location: "Laikipia, Nanyuki",
    price: 35000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "Cottage",
    featured: false
  },
  {
    id: "kisumu-commercial",
    title: "Commercial building for sale in Kisumu CBD",
    location: "Kisumu, Kisumu Central",
    price: 120000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 0,
    bathrooms: 6,
    area: 1200,
    type: "Commercial Building",
    featured: false
  },
  {
    id: "machakos-villa",
    title: "Executive villa for sale in Machakos",
    location: "Machakos, Machakos Town",
    price: 28000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "Executive Villa",
    featured: false
  },
  {
    id: "meru-mansion",
    title: "6 bedroom mansion for sale in Meru",
    location: "Meru, Meru County",
    price: 65000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 6,
    bathrooms: 5,
    area: 500,
    type: "Mansion",
    featured: true
  },
  {
    id: "malindi-beach-house",
    title: "Beach house for sale in Malindi",
    location: "Kilifi, Malindi",
    price: 95000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    type: "Beach House",
    featured: true
  },
  {
    id: "naivasha-resort",
    title: "Lakefront resort for sale in Naivasha",
    location: "Nakuru, Naivasha",
    price: 500000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 20,
    bathrooms: 25,
    area: 2000,
    type: "Resort Property",
    featured: true
  },
  {
    id: "rongai-bungalow",
    title: "3 bedroom bungalow for sale in Rongai",
    location: "Kajiado, Rongai",
    price: 8500000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Bungalow",
    featured: false
  },
  {
    id: "ruaka-duplex",
    title: "4 bedroom duplex for sale in Ruaka",
    location: "Kiambu, Ruaka",
    price: 22000000,
    image: "/* Image placeholder - add your image here */",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: "Duplex",
    featured: false
  },
  {
    id: "futuristic-haven",
    title: "Futuristic Haven",
    location: "Palm Springs, CA 92262",
    price: 4750000,
    image: "https://ext.same-assets.com/2009473017/1082928151.svg",
    bedrooms: 5,
    bathrooms: 4,
    area: 2800,
    type: "Modern Architecture",
    featured: true
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
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartments">Rental Apartments</SelectItem>
                <SelectItem value="commercial-land">Commercial Land</SelectItem>
                <SelectItem value="commercial-property">Commercial Property</SelectItem>
                <SelectItem value="rental-houses">Rental Houses</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-600k">Under 500K</SelectItem>
                <SelectItem value="500k-1m">500K - 1M</SelectItem>
                <SelectItem value="1m-2m">1M - 2M</SelectItem>
                <SelectItem value="over-2m">Over 2M</SelectItem>
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
