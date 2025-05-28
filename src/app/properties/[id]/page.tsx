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
  "plot-nrbwest": {
    id: "plot-nrbwest",
    title: "1/4 Acre Prime Plot in Nairobi West Shopping Centre",
    location: "Nairobi West, Nairobi",
    price: 120000000,
    type: "Commercial Property",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    lotSize: 0.25,
    yearBuilt: 2020,
    images: [
      "https://ext.same-assets.com/2880436944/513979610.jpeg",
      "/* Image placeholder - add your image here */",
      "https://ext.same-assets.com/2009473017/742755443.jpeg",
      "https://ext.same-assets.com/2009473017/299352832.jpeg"
    ],
    description: "Commercial Property behind Equity Bank in prime Nairobi West location near Nyayo Stadium. Excellent investment opportunity in a high-traffic commercial area.",
    features: [
      "Prime commercial location",
      "Behind Equity Bank",
      "High foot traffic area",
      "Near Nyayo Stadium",
      "Commercial zoning",
      "Easy access to main roads",
      "Established neighborhood",
      "Investment opportunity"
    ],
    amenities: [
      "Commercial Zone",
      "High Traffic",
      "Banking Facilities Nearby",
      "Transport Links"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "kiambu-windsor": {
    id: "kiambu-windsor",
    title: "4bdrm House Ensuite + 2 ensuite DSQs in Windsor Villas, Mushroom Gardens",
    location: "Mushroom Gardens, Kiambu Road",
    price: 80000000,
    type: "House",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 2000,
    lotSize: 0.5,
    yearBuilt: 2020,
    images: [
      "https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/1E2ACC81-C233-441F-BEF0-A6C448D14BBB-1170x720.jpeg.webp",
      "https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/A71AB30F-F3A2-4B78-AF13-2E629BBEA788-1170x720.jpeg.webp",
      "https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/BF1C8D1D-AD37-4DEE-BBC0-7ACCE035B7CE-750x785.jpeg.webp",
      "https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/CDDC6A32-6F34-4E61-B5E1-7D7A0FB8C0F7-1170x640.jpeg.webp"
    ],
    description: "Windsor Villas is a new development of 4 elegant houses on approximately 2 acres of land located on Mushroom road. On offer is villas sitting on half an acre in leafy Kiambu popular for it’s sought after views and serene country living. Nearby social amenities include the Ciata Mall, The Paradise Lost, and Windsor Golf Club.",
    features: [
      "A spacious lounge with a beautiful terrace overlooking the back garden",
      " 4 parking spaces",
      "24/7 manned main gate",
      "Perimeter wall with an electric fence",
      "Shower and a jacuzzi",
      "Two ensuite DSQs",
      "Established neighborhood",
      "Investment opportunity"
    ],
    amenities: [
      "A police post dedicated to serving Mushroom Gardens",
      "CCTV along common areas operated from a central command facility Stone wall with an electric fence and razor wire",
      "Banking Facilities Nearby",
      "Transport Links"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "mlolongo-warehouse": {
    id: "mlolongo-warehouse",
    title: "1/2 acre Warehouse GoDown for sale",
    location: "Mlolongo, Mombasa Road",
    price: 95000000,
    type: "Commercial Property",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 11600,
    lotSize: 0.5,
    yearBuilt: 2018,
    images: [
      "/p25 godown mlolo/IMG-20250512-WA0030.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0031.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0032.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0033.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0034.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0035.jpg",
      "/p25 godown mlolo/IMG-20250512-WA0036.jpg"
    ],
    description: "11,600sqft warehouse/godown facility strategically located in Mlolongo along Mombasa Road. Perfect for logistics, storage, and distribution operations.",
    features: [
      "11,600 sq ft warehouse space",
      "Strategic Mombasa Road location",
      "Easy access to JKIA",
      "Good for logistics operations",
      "Concrete construction",
      "Loading bays",
      "Security features",
      "Power backup"
    ],
    amenities: [
      "Strategic Location",
      "Airport Access",
      "Loading Facilities",
      "Security"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "ridgeways-mansion": {
    id: "ridgeways-mansion",
    title: "9bdrm Mansion in Ridgeways Gardens",
    location: "Nairobi, Ridgeways",
    price: 165000000,
    type: "Luxury Mansion",
    status: "For Sale",
    bedrooms: 9,
    bathrooms: 6,
    area: 5000,
    lotSize: 1.2,
    yearBuilt: 2015,
    images: [
      "https://ext.same-assets.com/2880436944/2026814827.png",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Spectacular 9-bedroom mansion set on 5000sqm in the prestigious Ridgeways Gardens. This luxurious family home offers spacious living areas, beautiful gardens, and premium finishes throughout.",
    features: [
      "9 spacious bedrooms",
      "6 modern bathrooms",
      "Large living areas",
      "Modern fitted kitchen",
      "Beautiful gardens",
      "Swimming pool",
      "Staff quarters",
      "Ample parking",
      "Security system",
      "Generator backup"
    ],
    amenities: [
      "Swimming Pool",
      "Large Gardens",
      "Security",
      "Staff Quarters",
      "Premium Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "emali-land": {
    id: "emali-land",
    title: "550 Acres Land for Sale in Emali Road",
    location: "Kajiado, Loitoktok",
    price: 4125000000,
    type: "Agricultural Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 550,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/311664710.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Massive 550-acre land parcel along Emali Road at KSh 7,500,000 per acre. Perfect for large-scale agricultural projects, ranching, or subdivision development.",
    features: [
      "550 acres of land",
      "Along Emali Road",
      "Good for agriculture",
      "Subdivision potential",
      "Strategic location",
      "Clear title deed",
      "Water availability",
      "Road access"
    ],
    amenities: [
      "Road Access",
      "Water Rights",
      "Agricultural Potential",
      "Investment Opportunity"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "muthaiga-mansion": {
    id: "muthaiga-mansion",
    title: "3bdrm Mansion in 3 Acres Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 350000000,
    type: "Luxury Mansion",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 4,
    area: 500,
    lotSize: 3,
    yearBuilt: 2010,
    images: [
      "https://ext.same-assets.com/2880436944/2862327400.jpeg",
      "https://ext.same-assets.com/3634728786/3519000104.jpeg",
      "https://ext.same-assets.com/3634728786/4125891741.jpeg"
    ],
    description: "Exquisite 3-bedroom mansion situated on 3 acres in the exclusive Muthaiga area. This property combines luxury living with privacy and tranquility in one of Nairobi's most prestigious neighborhoods.",
    features: [
      "3 spacious bedrooms",
      "4 bathrooms",
      "3-acre private grounds",
      "Swimming pool",
      "Landscaped gardens",
      "Staff quarters",
      "Generator",
      "Security system",
      "Garage parking",
      "Mature trees"
    ],
    amenities: [
      "Swimming Pool",
      "Private Gardens",
      "Security",
      "Staff Accommodation",
      "Prestigious Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "edenville-villa": {
    id: "edenville-villa",
    title: "3bdrm Villa in Edenville",
    location: "Kiambu, Kiambu / Kiambu",
    price: 26000000,
    type: "Villa",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    lotSize: 0.125,
    yearBuilt: 2019,
    images: [
      "https://ext.same-assets.com/2880436944/1376571947.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 3-bedroom villa in the sought-after Edenville estate. Features contemporary design, quality finishes, and access to estate amenities in a secure gated community.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Modern kitchen",
      "Living/dining area",
      "Garden space",
      "Parking",
      "Estate amenities",
      "Security",
      "Gated community",
      "Quality finishes"
    ],
    amenities: [
      "Gated Community",
      "Security",
      "Estate Amenities",
      "Modern Design"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "muthaiga-land": {
    id: "muthaiga-land",
    title: "1 Acres Residential Vacant Land for Sale in Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 230000000,
    type: "Residential Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 1,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/4206399667.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Prime 1-acre residential land in exclusive Muthaiga. Perfect for building your dream home in one of Nairobi's most prestigious addresses with excellent infrastructure and security.",
    features: [
      "1 acre of land",
      "Residential zoning",
      "Prime Muthaiga location",
      "Clear title deed",
      "All utilities available",
      "Excellent drainage",
      "Security",
      "Good access roads",
      "Mature neighborhood",
      "Investment potential"
    ],
    amenities: [
      "Prestigious Location",
      "All Utilities",
      "Security",
      "Good Infrastructure"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "kitengela-plot": {
    id: "kitengela-plot",
    title: "50 by 100 Acre Plot for Sale in Kitengela",
    location: "Kajiado, Kitengela",
    price: 700000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.11,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/515128159.png",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Affordable 50x100 residential plot in the rapidly growing Kitengela area. Great investment opportunity with good accessibility and development potential.",
    features: [
      "50x100 plot size",
      "Residential zoning",
      "Growing area",
      "Good access roads",
      "Electricity nearby",
      "Water connection available",
      "Affordable pricing",
      "Investment potential",
      "Clear title deed",
      "Ready to build"
    ],
    amenities: [
      "Road Access",
      "Utilities Available",
      "Growing Neighborhood",
      "Investment Potential"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "karen-6acres": {
    id: "karen-6acres",
    title: "6 Acres Residential Vacant Land for Sale in Karen",
    location: "Nairobi, Karen",
    price: 540000000,
    type: "Residential Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 6,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/3634728786/2403051608.jpeg",
      "https://ext.same-assets.com/3634728786/839530001.jpeg",
      "https://ext.same-assets.com/3634728786/3957476372.jpeg"
    ],
    description: "Discover an exceptional opportunity to own a prime 6-acre vacant land in the heart of Karen, one of Nairobi's most sought-after locations. This expansive parcel boasts a gentle slope and rich red soil, making it ideal for a variety of development options.",
    features: [
      "6 acres of prime land",
      "Gentle slope terrain",
      "Rich red soil",
      "Karen location",
      "Development potential",
      "All utilities available",
      "Clear title deed",
      "Strategic location",
      "Good drainage",
      "Mature neighborhood"
    ],
    amenities: [
      "Prime Karen Location",
      "All Utilities",
      "Development Ready",
      "Prestigious Area"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "syokimau-industrial": {
    id: "syokimau-industrial",
    title: "2.5 Acres Commercial Industrial Property for Sale in Syokimau",
    location: "Machakos, Syokimau",
    price: 400000000,
    type: "Commercial Industrial",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 57000,
    lotSize: 2.5,
    yearBuilt: 2016,
    images: [
      "https://ext.same-assets.com/3634728786/3440863984.jpeg",
      "https://ext.same-assets.com/3634728786/2901773263.jpeg",
      "https://ext.same-assets.com/3634728786/22836051.jpeg"
    ],
    description: "Unlock a high-yield investment opportunity with this strategically located 2.5-acre industrial property, ideal for both investors and owner-occupiers. Boasting a 57,000 sq. ft. warehousing space across six go-downs, this property offers a rare chance to acquire a fully functional industrial facility.",
    features: [
      "2.5 acres of land",
      "57,000 sq ft warehouse",
      "Six go-downs",
      "Strategic location",
      "High yield investment",
      "Fully functional facility",
      "Good road access",
      "Power supply",
      "Security features",
      "Development potential"
    ],
    amenities: [
      "Industrial Facility",
      "Strategic Location",
      "High Yield Investment",
      "Functional Infrastructure"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "cbd-commercial": {
    id: "cbd-commercial",
    title: "3506 m² Commercial Building for Sale in Central Business District",
    location: "Nairobi, Central Business District",
    price: 475000000,
    type: "Commercial Building",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 3506,
    lotSize: 0.1,
    yearBuilt: 1995,
    images: [
      "https://ext.same-assets.com/3634728786/2651965371.jpeg",
      "https://ext.same-assets.com/3634728786/500845845.jpeg",
      "https://ext.same-assets.com/3634728786/1726011918.jpeg"
    ],
    description: "The property is situated in a prominent position within the Nairobi CBD at the junction of Tom Mboya Street and Hakati Road. Notable establishments in the immediate neighborhood include The KICC, Times Tower, Cooperative House, National Bank House, Development House.",
    features: [
      "3506 m² building",
      "Prime CBD location",
      "Junction of Tom Mboya & Hakati",
      "Near KICC",
      "Commercial zoning",
      "High foot traffic",
      "Multiple floors",
      "Lift access",
      "Parking available",
      "Investment opportunity"
    ],
    amenities: [
      "Prime CBD Location",
      "High Traffic Area",
      "Commercial Zone",
      "Public Transport"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "westlands-land": {
    id: "westlands-land",
    title: "0.95 Acres Residential Vacant Land for Sale in Westlands",
    location: "Nairobi, Westlands",
    price: 430000000,
    type: "Residential Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.95,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/3634728786/3896291020.jpeg",
      "https://ext.same-assets.com/3634728786/2705632412.jpeg",
      "/* Image placeholder - add your image here */"
    ],
    description: "Prime land for sale at Brookside Gardens, an exclusive location in Nairobi's sought-after Westlands area. This rare gem offers a serene environment, excellent accessibility, and a prestigious address.",
    features: [
      "0.95 acres",
      "Brookside Gardens",
      "Westlands location",
      "Serene environment",
      "Excellent accessibility",
      "Prestigious address",
      "Development ready",
      "Clear title deed",
      "All utilities",
      "High-value neighborhood"
    ],
    amenities: [
      "Prestigious Westlands",
      "All Utilities",
      "Excellent Access",
      "High-Value Area"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "isinya-land": {
    id: "isinya-land",
    title: "50 Acres in Isinya Land for Sale",
    location: "Kajiado, Isinya",
    price: 14000000,
    type: "Agricultural Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 50,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2122315454.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "50 acres of prime agricultural land in Isinya, Kajiado County. Excellent for farming, ranching, or future subdivision development with good access roads.",
    features: [
      "50 acres of land",
      "Good for agriculture",
      "Access roads available",
      "Clear title deed",
      "Water sources nearby",
      "Flat terrain",
      "Rich soil",
      "Development potential"
    ],
    amenities: [
      "Agricultural Potential",
      "Road Access",
      "Water Sources",
      "Clear Title"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "neema-gardens": {
    id: "neema-gardens",
    title: "50 by 100 Land for Sale in Neema Gardens",
    location: "Kajiado, Kitengela",
    price: 1800000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.11,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/986284101.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "50x100 residential plot in the popular Neema Gardens estate, Kitengela. Well-planned neighborhood with good infrastructure and security.",
    features: [
      "50x100 plot size",
      "Neema Gardens estate",
      "Good infrastructure",
      "Security",
      "Electricity connection",
      "Water connection",
      "Access roads",
      "Ready title deed"
    ],
    amenities: [
      "Estate Living",
      "Security",
      "Infrastructure",
      "Utilities Available"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "kinoo-plot": {
    id: "kinoo-plot",
    title: "Kinoo 1/4 Acre Plot in Nairobi",
    location: "Kiambu, Kikuyu",
    price: 20000000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/3486551979.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Quarter acre residential plot in Kinoo area, perfect for building your dream home. Located in a rapidly developing area with good access to Nairobi CBD.",
    features: [
      "1/4 acre plot",
      "Kinoo location",
      "Good access to CBD",
      "Developing area",
      "Clear title deed",
      "All utilities available",
      "Good drainage",
      "Investment potential"
    ],
    amenities: [
      "CBD Access",
      "Utilities Available",
      "Development Area",
      "Investment Potential"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "joska-plots": {
    id: "joska-plots",
    title: "Joska Land for Sale",
    location: "Nairobi, Kamulu",
    price: 950000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/3179128645.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Affordable residential plots in Joska area near Kamulu. Great investment opportunity in a fast-growing residential area with easy access to transport.",
    features: [
      "Affordable pricing",
      "Joska location",
      "Near transport",
      "Growing area",
      "Clear title",
      "Ready to build",
      "Water nearby",
      "Good access roads"
    ],
    amenities: [
      "Transport Access",
      "Growing Area",
      "Affordable Investment",
      "Development Ready"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "utawala-plots": {
    id: "utawala-plots",
    title: "Utawala Zebra Plots for Sale",
    location: "Nairobi, Utawala",
    price: 2000000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/1522192692.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Prime residential plots in Utawala's Zebra area. Well-located with good infrastructure and easy access to the Eastern Bypass.",
    features: [
      "Prime Utawala location",
      "Zebra area",
      "Good infrastructure",
      "Eastern Bypass access",
      "Electricity available",
      "Water connection",
      "Security",
      "Ready title deed"
    ],
    amenities: [
      "Infrastructure",
      "Bypass Access",
      "Security",
      "Utilities Ready"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "syokimau-5acres": {
    id: "syokimau-5acres",
    title: "5 Acres Vacant Land for Sale in Syokimau",
    location: "Machakos, Syokimau",
    price: 200000000,
    type: "Commercial Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 5,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2093076440.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "5 acres of prime redevelopment land in Syokimau. Excellent for commercial or residential development with proximity to JKIA and major transport routes.",
    features: [
      "5 acres of land",
      "Redevelopment potential",
      "Near JKIA",
      "Commercial zoning",
      "Transport routes",
      "All utilities available",
      "Strategic location",
      "High appreciation potential"
    ],
    amenities: [
      "JKIA Proximity",
      "Transport Routes",
      "Commercial Potential",
      "Strategic Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "kisaju-10acres": {
    id: "kisaju-10acres",
    title: "10 Acres in Kisaju Along Namanga Road",
    location: "Kajiado, Kisaju",
    price: 140000000,
    type: "Agricultural Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 10,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2390980102.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "10 acres of prime land along the busy Namanga Road in Kisaju. Perfect for commercial development, logistics, or agricultural use with excellent road frontage.",
    features: [
      "10 acres",
      "Namanga Road frontage",
      "Commercial potential",
      "Good for logistics",
      "Agricultural use",
      "Excellent access",
      "High traffic area",
      "Development potential"
    ],
    amenities: [
      "Road Frontage",
      "High Traffic",
      "Commercial Potential",
      "Strategic Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "syokimau-katani": {
    id: "syokimau-katani",
    title: "Syokimau Katani Road Plots for Sale",
    location: "Machakos, Syokimau",
    price: 4500000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2884670387.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Residential plots along Katani Road in Syokimau. Well-planned area with good infrastructure and proximity to SGR station.",
    features: [
      "Katani Road location",
      "Near SGR station",
      "Good infrastructure",
      "Planned development",
      "Water connection",
      "Electricity",
      "Security",
      "Ready title"
    ],
    amenities: [
      "SGR Proximity",
      "Infrastructure",
      "Planned Development",
      "Transport Links"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "kitengela-bungalow": {
    id: "kitengela-bungalow",
    title: "3bdrm Bungalow In Mlimani Court",
    location: "Kajiado, Kitengela",
    price: 2800000,
    type: "Bungalow",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    lotSize: 0.125,
    yearBuilt: 2020,
    images: [
      "https://ext.same-assets.com/2880436944/413641261.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 3-bedroom bungalow in Mlimani Court, Kitengela. Well-designed home in a secure estate with good amenities and transport access.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Modern design",
      "Mlimani Court estate",
      "Security",
      "Parking space",
      "Garden area",
      "Good transport"
    ],
    amenities: [
      "Estate Living",
      "Security",
      "Modern Design",
      "Transport Access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "kiambu-road-10acres": {
    id: "kiambu-road-10acres",
    title: "10 Acres Vacant Land for Sale in Kiambu Road",
    location: "Nairobi, Nairobi Central",
    price: 600000000,
    type: "Commercial Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 10,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/3792112934.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "10 acres of prime vacant land along Kiambu Road. Excellent for commercial or mixed-use development with high visibility and accessibility.",
    features: [
      "10 acres",
      "Kiambu Road frontage",
      "Commercial potential",
      "High visibility",
      "Excellent access",
      "All utilities",
      "Mixed-use zoning",
      "Investment opportunity"
    ],
    amenities: [
      "Road Frontage",
      "Commercial Potential",
      "High Visibility",
      "Investment Grade"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "karen-mansion": {
    id: "karen-mansion",
    title: "13bdrm Mansion in Mayeast Road",
    location: "Nairobi, Karen",
    price: 400000000,
    originalPrice: 450000000,
    type: "Luxury Mansion",
    status: "For Rent",
    bedrooms: 13,
    bathrooms: 8,
    area: 8000,
    lotSize: 2,
    yearBuilt: 2012,
    images: [
      "https://ext.same-assets.com/2880436944/312339966.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Spectacular 13-bedroom mansion in prestigious Karen along Mayeast Road. Perfect for large families or corporate use with extensive grounds and luxury finishes.",
    features: [
      "13 spacious bedrooms",
      "8 bathrooms",
      "Large living areas",
      "Swimming pool",
      "Beautiful gardens",
      "Staff quarters",
      "Generator backup",
      "Security system",
      "Ample parking",
      "Corporate suitable"
    ],
    amenities: [
      "Swimming Pool",
      "Large Gardens",
      "Staff Quarters",
      "Security",
      "Karen Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "lavington-land": {
    id: "lavington-land",
    title: "1/2 Acre Land in Lavington",
    location: "Nairobi, Kileleshwa",
    price: 135000000,
    type: "Residential Land",
    status: "SOLD",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.5,
    yearBuilt: 0,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Half acre plot in prime Lavington area. This property has been sold but similar properties are available.",
    features: [
      "Half acre plot",
      "Prime Lavington",
      "Residential zoning",
      "Good access",
      "All utilities",
      "Mature neighborhood",
      "High value area",
      "Investment grade"
    ],
    amenities: [
      "Prime Location",
      "Utilities Available",
      "Mature Neighborhood",
      "High Value"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "cbd-building": {
    id: "cbd-building",
    title: "3500m2 Commercial Building for Sale in Nairobi Town CBD",
    location: "Nairobi, Nairobi Central",
    price: 475000000,
    type: "Commercial Building",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 3500,
    lotSize: 0.15,
    yearBuilt: 1990,
    images: [
      "https://ext.same-assets.com/2880436944/2115884790.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "3500m² commercial building in the heart of Nairobi CBD. Prime location with excellent rental income potential and high foot traffic.",
    features: [
      "3500m² building",
      "CBD location",
      "Multiple floors",
      "High rental yield",
      "Elevator access",
      "Parking available",
      "Prime position",
      "Investment grade"
    ],
    amenities: [
      "CBD Location",
      "High Traffic",
      "Elevator Access",
      "Parking"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "athi-river-maisonette": {
    id: "athi-river-maisonette",
    title: "3bdrm Maisonette in Sidai Village",
    location: "Machakos, Athi River",
    price: 8500000,
    type: "Maisonette",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 505,
    lotSize: 0.125,
    yearBuilt: 2021,
    images: [
      "https://ext.same-assets.com/2880436944/638900844.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 3-bedroom maisonette in Sidai Village, Athi River. Well-designed home in a planned estate with good amenities.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "505 sqm plot",
      "Modern design",
      "Sidai Village estate",
      "Security",
      "Water & electricity",
      "Good transport"
    ],
    amenities: [
      "Estate Living",
      "Modern Design",
      "Security",
      "Transport Access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "lavington-quarter-acre": {
    id: "lavington-quarter-acre",
    title: "1/4 an Acre Touching James Gichuru Lavington Land for Sale",
    location: "Nairobi, Kileleshwa",
    price: 140000000,
    type: "Residential Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2969919925.jpeg",
      "https://ext.same-assets.com/2880436944/1057443694.jpeg",
      "/* Image placeholder - add your image here */"
    ],
    description: "Quarter acre land touching James Gichuru Road in Lavington. Prime location with excellent access and development potential.",
    features: [
      "1/4 acre",
      "James Gichuru frontage",
      "Lavington location",
      "Prime access",
      "All utilities",
      "High value area",
      "Development ready",
      "Investment grade"
    ],
    amenities: [
      "Road Frontage",
      "Prime Lavington",
      "Utilities Ready",
      "High Value"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "thika-commercial": {
    id: "thika-commercial",
    title: "12.5 Acres Commercial Vacant Land for Sale in Thika",
    location: "Kiambu, Thika",
    price: 300000000,
    type: "Commercial Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 12.5,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/2292786202.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "12.5 acres of commercial vacant land in Thika. Excellent for industrial, commercial, or mixed-use development with good infrastructure.",
    features: [
      "12.5 acres",
      "Commercial zoning",
      "Thika location",
      "Good infrastructure",
      "Industrial potential",
      "Mixed-use suitable",
      "Power available",
      "Good access roads"
    ],
    amenities: [
      "Commercial Zone",
      "Infrastructure",
      "Industrial Potential",
      "Strategic Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "karen-villa": {
    id: "karen-villa",
    title: "4bdrm Villa in Karen, Nairobi Central for sale",
    location: "Nairobi, Karen",
    price: 400000000,
    type: "Luxury Villa",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 5000,
    lotSize: 1.2,
    yearBuilt: 2018,
    images: [
      "https://ext.same-assets.com/2880436944/3531345130.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Stunning 4-bedroom villa in Karen on 5000sqm. Luxury living with beautiful gardens, swimming pool, and premium finishes throughout.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "5000sqm plot",
      "Swimming pool",
      "Beautiful gardens",
      "Premium finishes",
      "Staff quarters",
      "Security system",
      "Generator backup",
      "Karen location"
    ],
    amenities: [
      "Swimming Pool",
      "Large Gardens",
      "Karen Location",
      "Luxury Finishes",
      "Security"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "kiambu-road-house": {
    id: "kiambu-road-house",
    title: "5bdrm House in Kiambu Road",
    location: "Nairobi, Nairobi Central",
    price: 550000000,
    type: "Luxury House",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 5000,
    lotSize: 1.5,
    yearBuilt: 2016,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Magnificent 5-bedroom house along Kiambu Road on 5000sqm. Luxury family home with excellent access to the city and international schools.",
    features: [
      "5 bedrooms",
      "4 bathrooms",
      "5000sqm plot",
      "Kiambu Road",
      "Swimming pool",
      "Large compound",
      "Modern kitchen",
      "Staff quarters",
      "Security",
      "Generator"
    ],
    amenities: [
      "Swimming Pool",
      "Large Compound",
      "Strategic Location",
      "Security",
      "Modern Features"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "chyuna-estate": {
    id: "chyuna-estate",
    title: "5bdrm Mansion in Chyuna Estate",
    location: "Kajiado, Kitengela",
    price: 35000000,
    type: "Mansion",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    lotSize: 0.5,
    yearBuilt: 2019,
    images: [
      "https://ext.same-assets.com/2880436944/831122591.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Beautiful 5-bedroom mansion in Chyuna Estate, Kitengela. Modern design with spacious rooms and excellent finishes in a secure estate.",
    features: [
      "5 bedrooms",
      "4 bathrooms",
      "500sqm area",
      "Modern design",
      "Chyuna Estate",
      "Security",
      "Parking",
      "Garden space",
      "Quality finishes",
      "Estate amenities"
    ],
    amenities: [
      "Estate Living",
      "Security",
      "Modern Design",
      "Garden Space"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "nairobi-warehouse": {
    id: "nairobi-warehouse",
    title: "3 Acres Commercial Property Warehouse for Sale in Nairobi",
    location: "Nairobi, Nairobi Central",
    price: 1000000000,
    type: "Commercial Warehouse",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 30000,
    lotSize: 3,
    yearBuilt: 2010,
    images: [
      "https://ext.same-assets.com/2880436944/3311501830.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "3 acres commercial warehouse property in Nairobi with 30,000sqm of commercial space. Prime investment opportunity for logistics and distribution.",
    features: [
      "3 acres of land",
      "30,000sqm warehouse",
      "Commercial zoning",
      "Strategic location",
      "Loading bays",
      "High ceiling",
      "Power backup",
      "Security systems",
      "Investment grade",
      "Rental income"
    ],
    amenities: [
      "Commercial Facility",
      "Strategic Location",
      "Investment Grade",
      "Security Features"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "ngong-plots": {
    id: "ngong-plots",
    title: "Fully Serviced Plots for Sale in Ngong Oluulua Ngong 46",
    location: "Ngong, Kajiado",
    price: 7500000,
    type: "Residential Plot",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/2880436944/4176058206.jpeg",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Fully serviced residential plots in Ngong Oluulua area. Great investment opportunity with all infrastructure in place and beautiful views.",
    features: [
      "Fully serviced plots",
      "Ngong location",
      "All infrastructure",
      "Beautiful views",
      "Clear title deeds",
      "Security",
      "Water & electricity",
      "Good access roads"
    ],
    amenities: [
      "Fully Serviced",
      "Beautiful Views",
      "Infrastructure",
      "Security"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "mombasa-industrial": {
    id: "mombasa-industrial",
    title: "3 acres commercial industrial property for sale in Mombasa Road",
    location: "Nairobi, Mombasa Road",
    price: 990000000,
    type: "Commercial Industrial",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 100000,
    lotSize: 3,
    yearBuilt: 2008,
    images: [
      "https://ext.same-assets.com/3634728786/575370584.jpeg",
      "https://ext.same-assets.com/3634728786/1355486781.jpeg",
      "https://ext.same-assets.com/3634728786/1776235649.jpeg"
    ],
    description: "Property Highlights: Location: Prime position along Main Mombasa Road, inbound to CBD Total Built-Up Area: Approximately 100,000 sq. ft. Land Area: 3 acres Facilities: Showroom & Offices Block: 30,000 sq. ft. total 10,000 sq. ft. of road-facing, double-volume showrooms",
    features: [
      "3 acres land area",
      "100,000 sq ft built-up",
      "Prime Mombasa Road",
      "30,000 sq ft showroom",
      "Road-facing showrooms",
      "Industrial facility",
      "Office space",
      "Strategic location",
      "High visibility",
      "Investment grade"
    ],
    amenities: [
      "Industrial Facility",
      "Prime Location",
      "High Visibility",
      "Investment Grade"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "redhill-land": {
    id: "redhill-land",
    title: "7.9 acres vacant land for sale in Redhill",
    location: "Nairobi, Redhill",
    price: 750000000,
    type: "Residential Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 7.9,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/3634728786/3300708784.jpeg",
      "https://ext.same-assets.com/3634728786/2893186496.jpeg",
      "https://ext.same-assets.com/3634728786/3348063986.jpeg"
    ],
    description: "Discover a rare opportunity to own 7.9 acres of pristine land in the highly sought-after Rosslyn neighborhood. Nestled close to the road, this expansive property offers unparalleled convenience with seamless access to major roads.",
    features: [
      "7.9 acres",
      "Rosslyn neighborhood",
      "Close to road",
      "Major road access",
      "Pristine land",
      "Development potential",
      "Convenient location",
      "Clear title",
      "All utilities nearby",
      "Investment opportunity"
    ],
    amenities: [
      "Prime Location",
      "Road Access",
      "Development Ready",
      "Investment Grade"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "muthaiga-5bedroom": {
    id: "muthaiga-5bedroom",
    title: "5 bedroom house for sale in Muthaiga",
    location: "Nairobi, Muthaiga",
    price: 600000000,
    type: "Luxury House",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 542,
    lotSize: 2.8,
    yearBuilt: 2014,
    images: [
      "https://ext.same-assets.com/3634728786/3519000104.jpeg",
      "https://ext.same-assets.com/3634728786/4125891741.jpeg",
      "https://ext.same-assets.com/3634728786/4032461120.jpeg"
    ],
    description: "Introducing a captivating masterpiece nestled within Muthaiga, this lovely 5-bedroom house sits majestically on 2.8 acres of sheer bliss. Boasting bedrooms that offer a harmonious blend of comfort and luxury, this enchanting home provides an idyllic retreat.",
    features: [
      "5 bedrooms",
      "4 bathrooms",
      "2.8 acres",
      "Muthaiga location",
      "Swimming pool",
      "Beautiful gardens",
      "Staff quarters",
      "Security system",
      "Generator backup",
      "Luxury finishes"
    ],
    amenities: [
      "Swimming Pool",
      "Large Grounds",
      "Muthaiga Location",
      "Luxury Features",
      "Security"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "karen-9acres": {
    id: "karen-9acres",
    title: "9 acres vacant land for sale in Karen",
    location: "Nairobi, Karen",
    price: 540000000,
    type: "Residential Land",
    status: "Under Offer",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 9,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/3634728786/204887299.jpeg",
      "https://ext.same-assets.com/3634728786/3303940439.jpeg",
      "https://ext.same-assets.com/3634728786/3143503855.jpeg"
    ],
    description: "Discover this exceptional 9-acre parcel of land, perfectly positioned for redevelopment. Strategically located along a main road, this property offers unmatched visibility, accessibility, and versatility.",
    features: [
      "9 acres",
      "Karen location",
      "Main road frontage",
      "Redevelopment potential",
      "High visibility",
      "Excellent access",
      "Strategic location",
      "Investment grade",
      "Clear title",
      "All utilities"
    ],
    amenities: [
      "Road Frontage",
      "Karen Location",
      "High Visibility",
      "Development Ready"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "kikambala-beach": {
    id: "kikambala-beach",
    title: "15 acres vacant land for sale in Kikambala",
    location: "Kilifi, Kikambala",
    price: 420000000,
    type: "Beach Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 15,
    yearBuilt: 0,
    images: [
      "https://ext.same-assets.com/3634728786/1077470987.jpeg",
      "https://ext.same-assets.com/3634728786/479723351.jpeg",
      "https://ext.same-assets.com/3634728786/4241474228.jpeg"
    ],
    description: "Discover an unparalleled opportunity with this 15-acre parcel of land on the stunning Kikambala Beach. Boasting expansive beachfrontage and pristine white sandy beaches, this property offers breathtaking views of the Indian Ocean.",
    features: [
      "15 acres beachfront",
      "Kikambala Beach",
      "White sandy beach",
      "Indian Ocean views",
      "Beach frontage",
      "Tourism potential",
      "Development opportunity",
      "Clear title",
      "Strategic location",
      "Investment grade"
    ],
    amenities: [
      "Beach Frontage",
      "Ocean Views",
      "Tourism Potential",
      "Prime Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "kileleshwa-apartment": {
    id: "kileleshwa-apartment",
    title: "3 bedroom apartment for sale in Kileleshwa",
    location: "Nairobi, Kileleshwa",
    price: 18000000,
    type: "Apartment",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    lotSize: 0,
    yearBuilt: 2020,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 3-bedroom apartment in the heart of Kileleshwa. Spacious living areas with contemporary finishes and excellent amenities.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Modern kitchen",
      "Balcony",
      "Parking space",
      "Swimming pool",
      "Gym",
      "Security",
      "Lift access",
      "Generator backup"
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Security",
      "Lift Access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "runda-townhouse": {
    id: "runda-townhouse",
    title: "4 bedroom townhouse for sale in Runda",
    location: "Nairobi, Runda",
    price: 45000000,
    type: "Townhouse",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    lotSize: 0.125,
    yearBuilt: 2019,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Elegant 4-bedroom townhouse in prestigious Runda estate. Modern design with beautiful finishes and access to estate amenities.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Double garage",
      "Private garden",
      "Modern kitchen",
      "Swimming pool",
      "Club house",
      "Security",
      "Generator",
      "Water backup"
    ],
    amenities: [
      "Swimming Pool",
      "Club House",
      "Security",
      "Runda Estate"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "westgate-mall-shop": {
    id: "westgate-mall-shop",
    title: "Retail shop for sale at Westgate Mall",
    location: "Nairobi, Westlands",
    price: 25000000,
    type: "Commercial Retail",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    lotSize: 0,
    yearBuilt: 2013,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Prime retail space at Westgate Mall. High foot traffic location perfect for retail business with excellent visibility.",
    features: [
      "85 sqm retail space",
      "Westgate Mall",
      "High foot traffic",
      "Prime location",
      "AC installed",
      "Parking available",
      "Security",
      "Mall amenities",
      "Investment opportunity",
      "Rental potential"
    ],
    amenities: [
      "Mall Location",
      "High Traffic",
      "Security",
      "Parking"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "nyali-beachfront": {
    id: "nyali-beachfront",
    title: "5 bedroom beachfront villa in Nyali",
    location: "Mombasa, Nyali",
    price: 180000000,
    type: "Beach Villa",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    lotSize: 0.5,
    yearBuilt: 2017,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Spectacular 5-bedroom beachfront villa in Nyali with direct beach access. Perfect for luxury living or holiday home investment.",
    features: [
      "5 bedrooms",
      "4 bathrooms",
      "Beachfront location",
      "Swimming pool",
      "Direct beach access",
      "Ocean views",
      "Mature gardens",
      "Staff quarters",
      "Generator",
      "Security"
    ],
    amenities: [
      "Beach Access",
      "Ocean Views",
      "Swimming Pool",
      "Security"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "nakuru-farm": {
    id: "nakuru-farm",
    title: "200 acres dairy farm for sale in Nakuru",
    location: "Nakuru, Nakuru County",
    price: 150000000,
    type: "Dairy Farm",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    lotSize: 200,
    yearBuilt: 2010,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Fully operational 200-acre dairy farm in Nakuru County. Includes farmhouse, dairy facilities, and excellent water sources.",
    features: [
      "200 acres",
      "Dairy facilities",
      "Farmhouse",
      "Water sources",
      "Fertile land",
      "Good climate",
      "Access roads",
      "Electricity",
      "Staff quarters",
      "Equipment included"
    ],
    amenities: [
      "Dairy Facilities",
      "Water Sources",
      "Agricultural Land",
      "Infrastructure"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "thika-factory": {
    id: "thika-factory",
    title: "Manufacturing factory for sale in Thika",
    location: "Kiambu, Thika",
    price: 800000000,
    type: "Industrial Factory",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    lotSize: 2,
    yearBuilt: 2005,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Fully equipped manufacturing factory in Thika Industrial area. Includes machinery, offices, and all necessary infrastructure.",
    features: [
      "5000 sqm factory",
      "2 acres land",
      "Manufacturing equipment",
      "Office spaces",
      "Power backup",
      "Water treatment",
      "Security",
      "Access roads",
      "Railway access",
      "Investment opportunity"
    ],
    amenities: [
      "Manufacturing Setup",
      "Industrial Zone",
      "Infrastructure",
      "Railway Access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true
  },
  "gigiri-penthouse": {
    id: "gigiri-penthouse",
    title: "Luxury penthouse for sale in Gigiri",
    location: "Nairobi, Gigiri",
    price: 85000000,
    type: "Penthouse",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    lotSize: 0,
    yearBuilt: 2021,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Stunning luxury penthouse in Gigiri with panoramic city views. Premium finishes and exclusive amenities in diplomatic zone.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Panoramic views",
      "Premium finishes",
      "Terrace garden",
      "Swimming pool",
      "Gym",
      "Concierge",
      "Parking bays",
      "Generator backup"
    ],
    amenities: [
      "City Views",
      "Swimming Pool",
      "Gym",
      "Concierge Service"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "eldoret-maisonette": {
    id: "eldoret-maisonette",
    title: "4 bedroom maisonette for sale in Eldoret",
    location: "Uasin Gishu, Eldoret",
    price: 12000000,
    type: "Maisonette",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    lotSize: 0.125,
    yearBuilt: 2018,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 4-bedroom maisonette in Eldoret town. Well-designed family home with spacious rooms and modern amenities.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Modern design",
      "Spacious rooms",
      "Parking space",
      "Garden area",
      "Security",
      "Water backup",
      "Quality finishes",
      "Good neighborhood"
    ],
    amenities: [
      "Modern Design",
      "Security",
      "Garden Space",
      "Quality Finishes"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "nanyuki-cottage": {
    id: "nanyuki-cottage",
    title: "Mountain cottage for sale in Nanyuki",
    location: "Laikipia, Nanyuki",
    price: 35000000,
    type: "Cottage",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    lotSize: 1,
    yearBuilt: 2016,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Charming mountain cottage in Nanyuki with stunning views of Mount Kenya. Perfect retreat with rustic charm and modern amenities.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Mountain views",
      "1 acre land",
      "Fireplace",
      "Mature gardens",
      "Staff quarters",
      "Water sources",
      "Generator",
      "Peaceful location"
    ],
    amenities: [
      "Mountain Views",
      "Large Grounds",
      "Peaceful Location",
      "Natural Setting"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "kisumu-commercial": {
    id: "kisumu-commercial",
    title: "Commercial building for sale in Kisumu CBD",
    location: "Kisumu, Kisumu Central",
    price: 120000000,
    type: "Commercial Building",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 6,
    area: 1200,
    lotSize: 0.125,
    yearBuilt: 2012,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "5-storey commercial building in Kisumu CBD. Excellent rental income with prime location and high occupancy rates.",
    features: [
      "5 storeys",
      "1200 sqm total",
      "CBD location",
      "High occupancy",
      "Rental income",
      "Lift access",
      "Parking available",
      "Generator backup",
      "Investment grade",
      "Lake proximity"
    ],
    amenities: [
      "CBD Location",
      "Rental Income",
      "Lift Access",
      "Lake Proximity"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "machakos-villa": {
    id: "machakos-villa",
    title: "Executive villa for sale in Machakos",
    location: "Machakos, Machakos Town",
    price: 28000000,
    type: "Executive Villa",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    lotSize: 0.25,
    yearBuilt: 2019,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Executive 4-bedroom villa in Machakos town. Modern design with spacious living areas and beautiful landscaping.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Executive design",
      "Spacious living",
      "Modern kitchen",
      "Beautiful landscaping",
      "Security",
      "Water backup",
      "Generator ready",
      "Good neighborhood"
    ],
    amenities: [
      "Executive Design",
      "Beautiful Landscaping",
      "Security",
      "Modern Features"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "meru-mansion": {
    id: "meru-mansion",
    title: "6 bedroom mansion for sale in Meru",
    location: "Meru, Meru County",
    price: 65000000,
    type: "Mansion",
    status: "For Sale",
    bedrooms: 6,
    bathrooms: 5,
    area: 500,
    lotSize: 1.5,
    yearBuilt: 2015,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Magnificent 6-bedroom mansion in Meru with panoramic views. Luxury family home with extensive grounds and premium finishes.",
    features: [
      "6 bedrooms",
      "5 bathrooms",
      "Panoramic views",
      "1.5 acres",
      "Swimming pool",
      "Staff quarters",
      "Generator",
      "Security system",
      "Beautiful gardens",
      "Premium finishes"
    ],
    amenities: [
      "Swimming Pool",
      "Panoramic Views",
      "Large Grounds",
      "Premium Features"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "malindi-beach-house": {
    id: "malindi-beach-house",
    title: "Beach house for sale in Malindi",
    location: "Kilifi, Malindi",
    price: 95000000,
    type: "Beach House",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    lotSize: 0.5,
    yearBuilt: 2018,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Stunning beach house in Malindi with direct beach access. Perfect for holiday home or rental investment with ocean views.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Beach access",
      "Ocean views",
      "Swimming pool",
      "Tropical gardens",
      "Staff quarters",
      "Security",
      "Rental potential",
      "Tourism location"
    ],
    amenities: [
      "Beach Access",
      "Ocean Views",
      "Swimming Pool",
      "Tourism Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "naivasha-resort": {
    id: "naivasha-resort",
    title: "Lakefront resort for sale in Naivasha",
    location: "Nakuru, Naivasha",
    price: 500000000,
    type: "Resort Property",
    status: "For Sale",
    bedrooms: 20,
    bathrooms: 25,
    area: 2000,
    lotSize: 5,
    yearBuilt: 2008,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Established lakefront resort in Naivasha with 20 rooms and extensive facilities. Prime tourism investment opportunity.",
    features: [
      "20 guest rooms",
      "Lakefront location",
      "Restaurant facilities",
      "Conference halls",
      "Swimming pool",
      "5 acres land",
      "Tourism license",
      "Staff accommodation",
      "Boat landing",
      "Investment opportunity"
    ],
    amenities: [
      "Lakefront Location",
      "Tourism Facilities",
      "Conference Facilities",
      "Investment Grade"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: true,
    featured: true
  },
  "rongai-bungalow": {
    id: "rongai-bungalow",
    title: "3 bedroom bungalow for sale in Rongai",
    location: "Kajiado, Rongai",
    price: 8500000,
    type: "Bungalow",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    lotSize: 0.125,
    yearBuilt: 2020,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Affordable 3-bedroom bungalow in Rongai. Perfect starter home with modern amenities and good transport connections.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Modern amenities",
      "Good transport",
      "Affordable pricing",
      "Garden space",
      "Parking",
      "Security",
      "Water backup",
      "Ready to move"
    ],
    amenities: [
      "Affordable Housing",
      "Transport Links",
      "Modern Amenities",
      "Garden Space"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
  },
  "ruaka-duplex": {
    id: "ruaka-duplex",
    title: "4 bedroom duplex for sale in Ruaka",
    location: "Kiambu, Ruaka",
    price: 22000000,
    type: "Duplex",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    lotSize: 0.125,
    yearBuilt: 2021,
    images: [
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */",
      "/* Image placeholder - add your image here */"
    ],
    description: "Modern 4-bedroom duplex in Ruaka town. Contemporary design with spacious living areas and excellent finishes.",
    features: [
      "4 bedrooms",
      "3 bathrooms",
      "Duplex design",
      "Contemporary style",
      "Spacious living",
      "Modern kitchen",
      "Parking",
      "Security",
      "Water backup",
      "Good location"
    ],
    amenities: [
      "Contemporary Design",
      "Spacious Living",
      "Security",
      "Good Location"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false
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
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
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
      currency: 'KES',
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