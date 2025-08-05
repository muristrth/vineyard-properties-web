'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Bed, Bath, Maximize, Car, Calendar, Share, Heart, Phone, Mail, ArrowLeft, Play, Camera, ChevronLeft, ChevronRight, Calculator, DollarSign, TrendingUp, XCircle, Star, Award, Shield, CheckCircle, MessageCircle, Download, Eye, Clock, Users, Home, Building, TreePine, Wifi, CarIcon, CookingPot as SwimmingPool, Zap, PhoneCall, Apple as WhatsApp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropertyQuickActions } from '@/components/QuickActions';

// Define interfaces (same as original)
interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
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
  downloadUrl: string;
}

export interface ViewingRequest {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

// Enhanced property data with more details
const propertyData: Record<string, Property> = {
  'heritage-villas-ngong': {
    id: 'heritage-villas-ngong',
    title: 'Luxurious 4 Bedroom All Ensuite Plus DSQ For Sale Heritage Villas, Ngong',
    location: 'Ngong, Ngong ward, Kajiado North, Kajiado, Rift Valley, Kenya',
    price: 27500000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    area: 240,
    lotSize: 0.125,
    yearBuilt: 2025,
    images: [
      '/p17 heritage/IMG-20250421-WA0093.jpg',
      '/p17 heritage/IMG-20250421-WA0092.jpg',
      '/p17 heritage/IMG-20250421-WA0091.jpg',
      '/p17 heritage/IMG-20250421-WA0094.jpg',
      '/p17 heritage/IMG-20250421-WA0095.jpg',
      '/p17 heritage/IMG-20250421-WA0096.jpg',
      '/p17 heritage/IMG-20250421-WA0097.jpg',
      '/p17 heritage/IMG-20250421-WA0098.jpg',
      '/p17 heritage/IMG-20250421-WA0098.jpg',
      '/p17 heritage/IMG-20250421-WA0099.jpg',
      '/p17 heritage/IMG-20250421-WA00100.jpg',
      '/p17 heritage/IMG-20250421-WA00101.jpg',
    ],
    description: `Heritage Villas Ngong – Unrivaled Luxury in the Ngong Hills
Nestled amidst the lush, rolling landscapes of the Ngong Hills, Heritage Villas offers an exclusive sanctuary of refined living for the discerning homeowner. This gated enclave occupies a manicured 6-acre estate and is limited to just 46 bespoke villas, ensuring ultimate privacy and prestige. Each home is a masterpiece of architectural elegance, boasting soaring double-volume living spaces and floor-to-ceiling windows that capture sweeping panoramic views of the iconic Ngong Hills. Every design detail, from imported finishes to seamless indoor-outdoor flow, has been curated to create a serene retreat where luxury meets nature.`,
    features: [
      'Exclusive 6-Acre Enclave: Only 46 ultra-luxury villas',
      'Panoramic Ngong Hills Vistas with private balconies',
      'Dramatic Double-Volume Living and open-plan design',
      '100 SQM rooftop terrace per villa',
      'Solar water heating system for energy efficiency',
      'En-suite guest bedroom in every villa',
      'High-end fittings and imported finishes',
      'Minutes from Nairobis CBD and SGR station',
    ],
    amenities: [
      'Prime connectivity to top schools and hospitals',
      'Efficient access to SGR station & Nairobi CBD',
      'Secure gated community',
      'Lush landscaped gardens and scenic walkways',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/heritage-villas-ngong-brochure.pdf'
  },
  'kitengela-plots-near-new-life-academy': {
    id: 'kitengela-plots-near-new-life-academy',
    title: 'Plots for Sale Near New Life Academy, Kitengela',
    location: 'Kitengela, Kajiado County, Rift Valley, Kenya',
    price: 1800000,
    type: 'Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 465,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20190207_094225.jpg',
      '/p/20190207_094318.jpg',
      '/p/20190207_094321.jpg',
      '/p/20190207_094722.jpg',
    ],
    description: `Discover prime plots for sale in Kitengela, strategically located near New Life Academy. These versatile plots offer excellent opportunities for residential development or investment. With varying sizes and competitive pricing, they provide a flexible solution for your real estate needs. Enjoy proximity to essential amenities and key transportation routes, making these plots highly desirable.`,
    features: [
      'Proximity to New Life Academy',
      '500m from Namanga Highway (for some plots)',
      'Access to electricity and water',
      'Near schools, shopping centers, and bus stops',
      'Sizes varying, including 50x100 sq ft',
    ],
    amenities: [
      'Developed infrastructure in the vicinity',
      'Close to social amenities',
      'Good road network access',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kitengela-plots-brochure.pdf'
  },
  'uchumi-house-cbd': {
    id: 'uchumi-house-cbd',
    title: 'Uchumi House Commercial Building for Sale, Nairobi CBD',
    location: 'Aga Khan Walk, Nkrumah Lane, Central Business District, Nairobi, Nairobi County, Kenya',
    price: 570000000,
    type: 'Commercial Building',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 4491,
    lotSize: 0.2893,
    yearBuilt: 0,
    images: [
      '/p43 uchumi/Screenshot 2025-07-05 114627.png',
      '/p43 uchumi/Screenshot 2025-07-05 114636.png',
      '/p43 uchumi/Screenshot 2025-07-05 114650.png',
      '/p43 uchumi/Screenshot 2025-07-05 114704.png',
    ],
    description: `Seize the unparalleled opportunity to own a landmark commercial building in the vibrant heart of Nairobi's Central Business District. Uchumi House offers a strategic location with excellent visibility and accessibility, guaranteeing a steady income stream from its established tenants. This five-story building with a basement and mezzanine provides immediate rental returns, making it an ideal investment for those seeking a prominent presence in Nairobi's thriving commercial landscape.`,
    features: [
      'Prime CBD location along Aga Khan Walk and Nkrumah Lane',
      '0.2893-acre rectangular plot with level terrain',
      'Five-story commercial building with basement and mezzanine',
      'Annual income of KSh 45,000,000',
      '38 years remaining on the lease',
      'Proximity to Sunken Parking, Electricity House, Nairobi Cinema, Kenya-Re Building',
    ],
    amenities: [
      'Excellent visibility and access',
      'Well-established commercial neighborhood',
      'Proximity to major transportation hubs and government offices',
      'High foot traffic and commercial activity',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/uchumi-house-cbd-brochure.pdf'
  },
  'langata-house-jambo-estate': {
    id: 'langata-house-jambo-estate',
    title: '4 Bedroom Maisonette Plus Extension For Sale, Jambo Estate, Langata',
    location: 'Jambo Estate, Langata, Nairobi, Nairobi County, Kenya',
    price: 30000000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 203,
    lotSize: 0.0845,
    yearBuilt: 1977,
    images: [
      '/p41 langata/Screenshot 2025-07-05 115338.png',
      '/p41 langata/Screenshot 2025-07-05 115352.png',
      '/p41 langata/Screenshot 2025-07-05 115402.png',
      '/p41 langata/Screenshot 2025-07-05 115423.png',
      '/p41 langata/Screenshot 2025-07-05 115438.png',
      '/p41 langata/Screenshot 2025-07-05 115450.png',
      '/p41 langata/Screenshot 2025-07-05 115515.png',
      '/p41 langata/Screenshot 2025-07-05 115524.png',
      '/p41 langata/Screenshot 2025-07-05 115537.png',
      '/p41 langata/Screenshot 2025-07-05 115546.png',
      '/p41 langata/Screenshot 2025-07-05 115610.png',
      '/p41 langata/Screenshot 2025-07-05 115537.png',
    ],
    description: `A spacious 4-bedroom maisonette with an external extension featuring an additional en-suite bedroom and gym room, located in the highly sought-after Jambo Estate, Langata. This property offers an ideal family home in a well-established neighborhood, boasting strong rental demand and excellent connectivity to key amenities and social services. The house is in good condition, with recent interior upgrades, and sits on a rectangular corner plot with a secure masonry stone wall.`,
    features: [
      '4-bedroom Maisonette (Double Storey) family house',
      'External extension with additional en-suite bedroom and gym room',
      'Estimate rental income of KSh 100,000 per month (main house)',
      'Estimate rental income of KSh 20,000 per month (external guest bedroom)',
      'Rectangular shaped residential corner plot (0.0845 Acres)',
      'Walled-in internal yard with 2-car covered parking bay and covered laundry area',
      'Mains water, electricity, and sewer connected with a water reservoir',
      'Recent interior upgrades/renovations within the last 3 years',
    ],
    amenities: [
      'Adjacent to Uhuru Gardens Primary School and KRA Flats',
      'Neighbors Sunvalley and Royal Park Estates',
      'Tarmac surfaced immediate access road to the estate',
      'Proximity to Nairobi National Park, T-Mall, Wilson Airport, Strathmore University, Carnivore Restaurant',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQEOPeZoDQNxFw/profile-displayphoto-scale_200_200/B4DZguPzwvHAAc-/0/1753122553451?e=2147483647&v=beta&t=68wLq_5H8IFEURj2crG7sh3kHPZKw2mVFUeLPwEXzfc',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/langata-jambo-estate-brochure.pdf'
  },
  'carol-wangan-nguthi-kitengela': {
    id: 'carol-wangan-nguthi-kitengela',
    title: 'Spacious Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 750000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      'https://i.roamcdn.net/prop/brk/listing-thumb-400w/08ad908aa8bb4740ee829379cf70ded5/-/prod-property-core-backend-media-brk/7612881/abf7c089-79a0-483f-80d4-dbe90d72fb6f.jpg',
      '/p kite 11/Screenshot 2024-02-12 090319.png',
      '/p kite 11/Screenshot 2024-02-12 090327.png',
      '/p kite 11/Screenshot 2024-02-12 090336.png',
    ],
    description: `An excellent opportunity to own a prime 1/8 acre plot in Kitengela, ideal for residential development. Located in a rapidly growing area with access to essential services and future infrastructure projects. This plot offers a blank canvas for building your dream home or for investment purposes.`,
    features: [
      'Ready for development',
      'Good access roads',
      'Proximity to social amenities',
      'Favorable for residential construction',
    ],
    amenities: [
      'Nearby schools',
      'Hospitals and clinics',
      'Shopping centers',
      'Public transport access',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/carol-wangan-kitengela-brochure.pdf'
  },
  "crest-gardens-phase-1b": {
    id: "crest-gardens-phase-1b",
    title: "Crest Gardens Phase 1B",
    location: "1.5K from Tarmac",
    price: 1900000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://fanaka.co.ke/storage/IMG-20250708-WA0053.webp",
      "https://fanaka.co.ke//storage/images/84d8cdd7-591c-431a-b4cc-0409a2938b84.webp",
      "https://fanaka.co.ke/storage/w1.webp"
    ],
    description: "Introducing Crest Gardens Phase 1B, the latest addition to the highly sought-after Crest Gardens development, nestled right next to the successful Crest Gardens Phase 1A in the vibrant Katani neighborhood.",
    features: [
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/crest-gardens-phase-1b-brochure.pdf'
  },
  "jabali-court-ruiru-kamakis": {
    id: "jabali-court-ruiru-kamakis",
    title: "Jabali Court Ruiru Kamakis",
    location: "Ruiru Kamakis, 6.5km from Eastern Bypass",
    price: 2500000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://fanaka.co.ke/storage/8x5 jabali 4.webp",
      "https://fanaka.co.ke//storage/images/5a33c969-ee19-4f2d-ada9-093de6547ca1.webp",
      "https://fanaka.co.ke//storage/images/19a9a191-4458-4148-90f6-aa2d39751a2e.webp"
    ],
    description: "Looking to buy land in Kenya that is affordable, well-located, and boasts high growth potential? Welcome to Jabali Court, a premium collection of 1/8-acre plots for sale in Kamakis, Ruiru, strategically positioned just off the Eastern Bypass and a mere few minutes from Thika Road.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/jabali-court-ruiru-kamakis-brochure.pdf'
  },
  "ahadi-gardens-phase-2-prime-plots-for-sale-in-malaa": {
    id: "ahadi-gardens-phase-2-prime-plots-for-sale-in-malaa",
    title: "Ahadi Gardens Phase 2 -  Prime Plots for sale in  Malaa",
    location: "2Km off Kangundo Road",
    price: 1500000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "https://fanaka.co.ke/storage/Ahadi%20Gardens%20Phase%202%20-%20Plots%20For%20Sale%20in%20Malaa.jpg",
      "https://fanaka.co.ke/storage/Ahadi%20Gardens%20Phase%202%20-%20Plots%20For%20Sale%20in%20Malaa.jpg",
      "https://fanaka.co.ke//storage/images/9d05364e-749c-4073-9ade-0a1ae3ca5ba6.jpg",
      "https://fanaka.co.ke//storage/images/96a2f5b3-4b3b-4f62-ad91-8b67513d5d08.jpg"
    ],
    description: "Welcome to Ahadi Gardens Phase 2, a unique opportunity to own a prime 50x100 (1/8-acre plot) residential plot in the fast-growing township of Malaa, just 2 km off Kangundo Road and a short drive from Nairobi.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/ahadi-gardens-phase-2-malaa-brochure.pdf'
  },
  "jujafarm-gardens-phase-2": {
    id: "jujafarm-gardens-phase-2",
    title: "Jujafarm Gardens Phase 2",
    location: "3.8km from Jujafarm Shopping Centre",
    price: 1200000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/8x5 web 4.jpg",
      "https://fanaka.co.ke//storage/images/add2b0a6-1a4b-49be-82bc-4a660c18e51a.jpg",
      "https://fanaka.co.ke//storage/images/5c9bcc14-37db-4673-a7ef-29a02d8bd05a.jpg"
    ],
    description: "Looking for plots for sale in Juja Farm or prime land for sale in Kenya near Nairobi? Welcome to Jujafarm Gardens Phase 2—your perfect opportunity to own land in a strategic and fast-developing location. This project offers affordable, ready-to-build plots in one of the most promising growth areas along the Thika Road corridor.",
    features: [
      "Ready for development",
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/jujafarm-gardens-phase-2-brochure.pdf'
  },
  "crest-gardens-phase-1": {
    id: "crest-gardens-phase-1",
    title: "Crest Gardens Phase 1",
    location: "15 min drive to Mombasa Road",
    price: 2700000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/w1.webp",
      "https://fanaka.co.ke//storage/images/a74054e3-454c-4398-b5f0-34dffbedcfd3.webp",
      "https://fanaka.co.ke//storage/images/6585da8a-5d44-4bd6-9a7b-e2df2d40dcac.webp"
    ],
    description: "At Crest Gardens Phase 1, we don't just sell land—we create thriving communities where families build, live, and grow. With Katani Gardens Phases 1, 2 & 6 already SOLD OUT, this is your chance to secure a prime plot in the next hotspot!",
    features: [
      "Ready for development",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/crest-gardens-phase-1-brochure.pdf'
  },
  "commercial-plots-for-sale-malaa": {
    id: "commercial-plots-for-sale-malaa",
    title: "Commercial Plots For Sale Malaa",
    location: "3 Minutes drive from Malaa Shopping Center",
    price: 2200000,
    type: "Commercial",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/7e7699fe-6254-4324-87a6-bae28942bbe0.jpg",
      "https://fanaka.co.ke//storage/images/e9bc05fd-285f-4740-a602-e0e70023ad51.jpg",
      "https://fanaka.co.ke/storage/springfield-by-fanaka.jpg"
    ],
    description: "Here are 50 by 100 ft (1/8 acre) commercial plots in Malaa that present the perfect opportunity for you seeking long-term value real estate",
    features: [
      "Prime location",
      "Ready title deeds",
      "Good investment opportunity"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/commercial-plots-malaa-brochure.pdf'
  },
  "mugutha-court": {
    id: "mugutha-court",
    title: "Mugutha Court",
    location: "4.5 Km off Thika Road",
    price: 4300000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/Ruiru-Mugutha-Plots-For-Sale-along-thika-road-7.jpg",
      "https://fanaka.co.ke/storage/Ruiru-Mugutha-Plots-For-Sale.jpg",
      "https://fanaka.co.ke/storage/Ruiru-Mugutha-Plots-For-Sale-along-thika-road.jpg"
    ],
    description: "Mugutha Court is nestled in a serene and rapidly developing neighborhood, with an 1/8 acre plots, offering the perfect opportunity to build your dream home or invest in one of the most sought-after areas near Nairobi. Located just 4.5 Kilometres off Thika Road, these plots combine accessibility, tranquillity, and convenience.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/mugutha-court-brochure.pdf'
  },
  "katani-gardens-phase-8": {
    id: "katani-gardens-phase-8",
    title: "Katani Gardens Phase 8",
    location: "Just 1.5km off Katani  Road,",
    price: 2700000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/1e3f0894-7f3f-4fb1-9fcd-431dc6778dbf.webp",
      "https://fanaka.co.ke//storage/images/64a27cef-65d5-4769-88f9-cd2b64a337cd.webp",
      "https://fanaka.co.ke/storage/katani-plots-2.webp"
    ],
    description: "Imagine: Owning prime, ready-to-build land in the highly sought-after Syokimau/Katani neighborhood. Welcome to Katani Gardens Phase 8 (MEGA CLOSE) – where your vision of the perfect home becomes a reality!",
    features: [
      "Ready for development",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/katani-gardens-phase-8-brochure.pdf'
  },
  "amani-gardens-phase-2": {
    id: "amani-gardens-phase-2",
    title: "Amani Gardens Phase 2",
    location: "5 Minutes drive from Koma-Kenol tarmac",
    price: 650000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/6ac7ba05-c946-4036-9d50-95caf4db3e01.jpg",
      "https://fanaka.co.ke//storage/images/d11f1239-1d5b-4af7-ae0f-67ba0b9b64f2.jpg",
      "https://fanaka.co.ke//storage/images/d441ed81-eca1-45c8-b04d-f66291cc8086.jpg"
    ],
    description: "Introducing Amani Gardens Phase 2  an ideal ready-to-build affordable residential project in Koma Town, just after Malaa Town.",
    features: [
      "Ready for development",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/amani-gardens-phase-2-brochure.pdf'
  },
  "prime-court-phase-6": {
    id: "prime-court-phase-6",
    title: "Prime Court Phase 6",
    location: "10 minutes drive from Eastern Bypass",
    price: 1295000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/prime 6 6.jpg",
      "https://fanaka.co.ke//storage/images/1dfd74b0-7351-4ccd-a733-101c9de9dc17.jpg",
      "https://fanaka.co.ke//storage/images/a26b88ef-f7d5-4c72-951b-8449298a00aa.jpg"
    ],
    description: "Prime Court Phase 6 is located in one of the fastest growing satellite town along Eastern Bypass in Ruiru Kamakis, just a few minutes drive off Thika Road.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/prime-court-phase-6-brochure.pdf'
  },
  "kitengela-gardens-phase-1": {
    id: "kitengela-gardens-phase-1",
    title: "Kitengela Gardens Phase 1",
    location: "1.5km off tarmac from Kimalat Shell Station",
    price: 1800000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/f7530ab3-3533-4af8-b000-82d3b2fc22fe.jpg",
      "https://fanaka.co.ke//storage/images/fc2af9c0-5a36-4944-b71c-6c7e18332e85.jpg",
      "https://fanaka.co.ke/storage/Buy-and-build-Kitengela-plots-for-sale.jpg"
    ],
    description: "Are you searching for the perfect plot of land to build your dream home or make a smart investment in a rapidly growing area? Look no further than Kitengela Gardens Phase 1, offering exceptional Residential and Commercial plots for sale in Kitengela that combine affordability, strategic location, and the assurance of genuine title deeds.",
    features: [
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kitengela-gardens-phase-1-brochure.pdf'
  },
  "juja-commercial-phase-2": {
    id: "juja-commercial-phase-2",
    title: "Juja Commercial Phase 2",
    location: "5 minutes off Thika Road",
    price: 4200000,
    type: "Commercial",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/8x5 banner 5.jpg",
      "https://fanaka.co.ke//storage/images/001750ef-69c6-47f3-8eaf-8f81fb29f165.jpg",
      "https://fanaka.co.ke//storage/images/0e4c7f9f-9aac-4bf6-bb16-ef602bec78a0.jpg"
    ],
    description: "Are you looking for a commercial property in a developed area and with high return on investment? Or are you an entrepreneur seeking the strategic location to start your business? We've got you! We're excited to offer prime commercial plots in the heart of Juja just touching tarmac.",
    features: [
      "Prime location",
      "Ready title deeds",
      "Good investment opportunity"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/juja-commercial-phase-2-brochure.pdf'
  },
  "katani-gardens-phase-7": {
    id: "katani-gardens-phase-7",
    title: "Katani Gardens Phase 7",
    location: "20 Minutes drive from Nairobi CBD",
    price: 2700000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/Katani-gardens-Phase-7.jpg",
      "https://fanaka.co.ke//storage/images/76c59de4-c816-4566-8ded-c7013a50ff81.jpg",
      "https://fanaka.co.ke//storage/images/b345201e-2a5e-478a-a70c-ff7621a7c9a8.jpg"
    ],
    description: "Are you ready to own a piece of one of Nairobi's most sought-after developments? Katani Gardens Phase 7 is here, offering prime plots in a location that combines convenience, growth potential, and unmatched value. Here's why this is the opportunity you've been waiting for:-Strategic Location – Unbeatable Connectivity, located just 7km off Mombasa Road, Katani Gardens Phase 7 is perfectly positioned for growth.",
    features: [
      "Ready for development",
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/katani-gardens-phase-7-brochure.pdf'
  },
  "prestige-gardens-phase-3": {
    id: "prestige-gardens-phase-3",
    title: "Prestige Gardens Phase 3",
    location: "5 Minutes drive from Kangundo Road",
    price: 1400000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/2d4b573d-0baf-4730-8731-6f42a6a392ba.webp",
      "https://fanaka.co.ke//storage/images/ae5cf31d-e808-42e5-aedd-dd01516b05c1.webp",
      "https://fanaka.co.ke//storage/images/d1aec83e-21d8-43fb-b778-f068179b9173.webp"
    ],
    description: "Located just 5 minutes' drive from Kangundo Road Tarmac, these prime plots in Kamulu offer an unmatched opportunity for:",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/prestige-gardens-phase-3-brochure.pdf'
  },
  "prime-court-phase-5": {
    id: "prime-court-phase-5",
    title: "Prime Court Phase 5",
    location: "9 minutes drive from Eastern Bypass",
    price: 1400000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/Prime 5 -1 .jpg",
      "https://fanaka.co.ke//storage/images/37d21fd1-ebe8-47b8-9cc4-0b84269c7e5f.jpg",
      "https://fanaka.co.ke//storage/images/c284357d-1489-46cc-a573-fb817febbb07.jpg"
    ],
    description: "Invest in one of the fastest growing satellite town of Ruiru - Kamakis along Eastern Bypass and around Nairobi Metropolitan, just a few minutes drive off Thika Road. It is an ideal location for residential investment.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/prime-court-phase-5-brochure.pdf'
  },
  "maple-court-phase-1-kamakis": {
    id: "maple-court-phase-1-kamakis",
    title: "Maple Court Phase 1 Kamakis",
    location: "5km off Eastern Bypass",
    price: 2400000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/b22a8470-07c7-4b27-88b0-6cf87af72ee9.jpg",
      "https://fanaka.co.ke//storage/images/a2b7b544-505b-4b1c-8697-5dc6a25ae371.jpg",
      "https://fanaka.co.ke/storage/1Plots-For-Sale-In-Ruiru_Maple-court.jpg"
    ],
    description: "Maple Court is a serviced project by Fanaka Real Estate located at Sillicon Valley estate at Ruiru Kamakis, only 5KM off Eastern Bypass.",
    features: [
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/maple-court-phase-1-kamakis-brochure.pdf'
  },
  "enclave-katani-gardens-phase-6": {
    id: "enclave-katani-gardens-phase-6",
    title: "Enclave Katani Gardens Phase 6",
    location: "1.5Km  off Katani Road",
    price: 2700000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke//storage/images/826dc362-393b-48e6-a4de-1d5d98e394ba.jpg",
      "https://fanaka.co.ke//storage/images/a1113250-5248-40fd-adfc-9914f046210a.jpg",
      "https://fanaka.co.ke//storage/images/1a4a70a9-ac5f-4399-a6b8-1f5de84260de.jpg"
    ],
    description: "Enclave Katani Gardens Phase 6 is a prime real estate project strategically located between Katani Gardens Phases 1 & 2. Set in a well-developed neighborhood, it offers a unique opportunity for buyers looking for ready-to-build plots in an area where construction is already ongoing.",
    features: [
      "Ready for development",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/enclave-katani-gardens-phase-6-brochure.pdf'
  },
  "joska-crest-gardens": {
    id: "joska-crest-gardens",
    title: "Joska Crest Gardens",
    location: "Joska, 7 km from Kangundo Road",
    price: 1100000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/joska crest 1.jpg",
      "https://fanaka.co.ke/storage/joska crest 2.jpg",
      "https://fanaka.co.ke/storage/joska crest 3.jpg"
    ],
    description: "Introducing Joska Crest – the perfect place to build your dream home or invest for the future! 10 minutes' drive from Joska town along Kangundo road, these prime 50 by 100 plots in Joska offer the ideal opportunity for residential living, future investments, or creating a legacy for your children.Why Joska Crest?",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/joska-crest-gardens-brochure.pdf'
  },
  "prime-court-phase-4": {
    id: "prime-court-phase-4",
    title: "Prime Court Phase 4",
    location: "15 minutes from Eastern Bypass",
    price: 999000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/PRIME 4 1.jpg",
      "https://fanaka.co.ke/storage/images/1b05092f-2cc3-4105-b8c4-e17b64314fe1.jpg",
      "https://fanaka.co.ke/storage/PRIME 4 2.jpg"
    ],
    description: "Ruiru - Kamakis is one of the fastest growing satellite town along Eastern Bypass and around Nairobi Metropolitan, just a few minutes drive off Thika Road.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/prime-court-phase-4-brochure.pdf'
  },
  "katani-gardens-phase-5": {
    id: "katani-gardens-phase-5",
    title: "Katani Gardens Phase 5",
    location: "Syokimau Katani, 1.5km off Tarmac",
    price: 2600000,
    type: "Land",
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      "",
      "https://fanaka.co.ke/storage/images/80581eb3-39ba-45f9-aa0d-ba321648166d.jpg",
      "https://fanaka.co.ke/storage/images/96f54a2b-5a13-46d2-b0ff-1d6499b5737f.webp",
      "https://fanaka.co.ke/storage/w1.webp"
    ],
    description: "A remarkable investment opportunity just 7 minutes from Mombasa Road, nestled within the prestigious Twiga Court gated community. Located in a highly developed neighborhood, this prime project offers the perfect blend of convenience, tranquility, and modern living.",
    features: [
      "Good access roads",
      "Favorable for residential construction"
    ],
    amenities: [
      "Nearby schools",
      "Hospitals and clinics",
      "Shopping centers",
      "Public transport access"
    ],
    agent: {
      name: "Mark James",
      title: "Senior Property Agent",
      phone: "0729170156",
      email: "mark.muriithi@vineyardproperties.co.ke",
      image: "https://ext.same-assets.com/2009473017/3756399664.png"
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/katani-gardens-phase-5-brochure.pdf'
  },
  'lukenya-plot': {
    id: 'lukenya-plot',
    title: 'Scenic Plots for Sale in Lukenya',
    location: 'Lukenya, Machakos County, Kenya',
    price: 380000,
    type: 'Land',
    status: 'Available',
    bedrooms: 0,
    bathrooms: 0,
    area: 505,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
        '/p/20190123_113658.jpg',
        '/p/20190123_113704.jpg',
        '/p/20190123_113713.jpg',
        '/p/20190207_090902.jpg',
        '/p/20190207_090904.jpg',
        '/p/20190207_090906.jpg',
    ],
    description: `An ideal investment opportunity or perfect for a serene holiday home, these plots in Lukenya offer unparalleled peace and quiet. Enjoy breathtaking views of Ngong Hills, Kamulu Plains, Lukenya Hills, and Mua Hills from this elevated location. The community is well-established with long-term residents.

Located approximately 15km off Mombasa Road, branching at the diversion to Lukenya Schools. The plots are situated near Kusyombunguo Guest House and overlook Lukenya and Mua hills. This block comprises 37 plots, each measuring 1/8 acre.`,
    features: [
        'Good for long-term investment',
        'Ideal for a holiday home',
        'Quiet, serene, and peaceful environment',
        'High ground with panoramic views',
        'All plots well marked',
        'Title deeds available',
        'Abundant building materials nearby',
        'Easily accessible',
        'Gated Community',
        'Excellent customer service post-purchase',
    ],
    amenities: [
        'Proximity to Lukenya Schools',
        'Near Kusyombunguo Guest house',
        'Opposite a commercial poultry farm',
    ],
    agent: {
        name: 'Mark James',
        title: 'Senior Property Agent',
        phone: '0729170156',
        email: 'mark.muriithi@vineyardproperties.co.ke',
        image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/lukenya-plot-brochure.pdf'
  },
  'Thorngroove-Kitengela': {
    id: 'Thorngroove-Kitengela',
    title: 'Thorngroove 1/8 Acre Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      'https://i.roamcdn.net/prop/brk/listing-thumb-400w/ae9159b02748a236a3d049c2900f73ab/-/prod-property-core-backend-media-brk/7615572/94b19998-895d-4e50-87c0-fd50e00036ac.jpg',
      '/p6 kite11b/P_20171020_172051.jpg',
      '/p6 kite11b/P_20171028_115636.jpg',
      '/p6 kite11b/P_20171028_115638.jpg',
    ],
    description: `A highly sought-after 1/8 acre plot situated in a developed part of Kitengela. This plot is perfect for those looking to build immediately or invest in an area with high appreciation potential. Connected to water and electricity mains.`,
    features: [
      'Developed neighborhood',
      'Water and electricity access',
      'Flat terrain, easy to build',
      'Clear title deed',
    ],
    amenities: [
      'Close to major roads (Namanga Road)',
      'Shopping malls nearby',
      'Religious institutions',
      'Recreational facilities',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/thorngroove-kitengela-brochure.pdf'
  },
  '1/8 Acre Plot in Epz Tank, Kitengela': {
    id: '1/8 Acre Plot in Epz Tank, Kitengela',
    title: '1/8 Acre Plot in Epz Tank, Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
    'https://i0.wp.com/kimisituinvestment.co.ke/wp-content/uploads/2021/06/DJI_0349-scaled.jpg?fit=2560%2C1440&ssl=1',
    '/p/20180630_140804.jpg',
    '/p/20180630_140808.jpg',
    ],
    description: `An accessible 1/8 acre plot in Kitengela, offering a serene environment for family living. This plot is ideal for anyone seeking a peaceful residential area with good connectivity to Kitengela town center.`,
    features: [
      'Accessible location',
      'Good for residential development',
      'Serene environment',
      'Ready for transfer',
    ],
    amenities: [
      'Proximity to public transport',
      'Local shops and markets',
      'Community services',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/epz-tank-kitengela-brochure.pdf'
  },
  'solomon-ndungu-kitengela': {
    id: 'solomon-ndungu-kitengela',
    title: 'Affordable Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180630_140812.jpg',
      '/p/20180630_144535.jpg',
      '/p/20180630_144546.jpg',
    ],
    description: `An affordable 1/8 acre plot in Kitengela, perfect for a first-time buyer or an investor looking for a high-growth area. This plot offers great value for money and is located in a rapidly expanding zone.`,
    features: [
      'Great investment opportunity',
      'Rapidly developing area',
      'Easy access to main road',
      'Clean title available',
    ],
    amenities: [
      'Emerging social amenities',
      'Future infrastructure plans',
      'Good security',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/solomon-ndungu-kitengela-brochure.pdf'
  },
  'omulindi-mukoto-kitengela': {
    id: 'omulindi-mukoto-kitengela',
    title: 'Plot in Developing Area of Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 750000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180630_144551.jpg',
      '/p/20180630_144604.jpg',
      '/p/20180707_102311.jpg',
    ],
    description: `A promising 1/8 acre plot in a developing part of Kitengela, ideal for future residential or commercial ventures. The area is experiencing significant growth, making this a smart long-term investment.`,
    features: [
      'High growth potential',
      'Suitable for multiple uses (subject to zoning)',
      'Expanding infrastructure',
      'Accessible by all-weather roads',
    ],
    amenities: [
      'New developments nearby',
      'Upcoming commercial centers',
      'Peaceful environment',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/omulindi-mukoto-kitengela-brochure.pdf'
  },
  'mary-mutembei-kitengela': {
    id: 'mary-mutembei-kitengela',
    title: 'Prime Plot in Kitengela near amenities',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_102317.jpg',
      '/p/20180707_102320.jpg',
      '/p/20180707_102325.jpg',
    ],
    description: `A well-situated 1/8 acre plot in Kitengela, offering close proximity to various amenities. This plot is perfect for a family home, ensuring convenience and easy access to daily necessities.`,
    features: [
      'Close to Kitengela town',
      'Developed and secure area',
      'Water and electricity available for connection',
      'Ready for immediate transfer',
    ],
    amenities: [
      'Walking distance to shops',
      'Access to schools and health centers',
      'Reliable public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/mary-mutembei-kitengela-brochure.pdf'
  },
  'peter-ngunyi-kitengela': {
    id: 'peter-ngunyi-kitengela',
    title: 'Strategic Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_102329.jpg',
      '/p/20180707_102333.jpg',
      '/p/20180707_102346.jpg',
    ],
    description: `A strategically located 1/8 acre plot in Kitengela, offering excellent connectivity and potential for both residential and light commercial use. This plot is ideal for those seeking a vibrant community.`,
    features: [
      'Excellent connectivity',
      'Suitable for mixed development',
      'Thriving neighborhood',
      'Accessible land',
    ],
    amenities: [
      'Near major transport routes',
      'Shopping complexes',
      'Healthcare facilities',
      'Educational institutions',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/peter-ngunyi-kitengela-brochure.pdf'
  },
  'robert-nyaroo-joska': {
    id: 'robert-nyaroo-joska',
    title: 'Residential Plot for Sale in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 800000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_102432.jpg',
      '/p/20180707_105411.jpg',
      '/p/20180707_105412.jpg',
    ],
    description: `A prime 1/8 acre residential plot in Joska, offering a tranquil living environment away from the city's hustle and bustle. This area is rapidly developing with new homes and amenities.`,
    features: [
      'Peaceful residential area',
      'Good for family home',
      'Developing infrastructure',
      'Well-drained land',
    ],
    amenities: [
      'Proximity to Kangundo Road',
      'Local schools and clinics',
      'Community markets',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/robert-nyaroo-joska-brochure.pdf'
  },
  'peter-ngobu-kantafu': {
    id: 'peter-ngobu-kantafu',
    title: 'Developing Plot in Kantafu',
    location: 'Kantafu, Machakos County, Kenya',
    price: 1200000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      '/p/20180707_105416.jpg',
      '/p/20180707_105501.jpg',
      '/p/20180707_105502.jpg',
    ],
    description: `A promising quarter-acre plot in the fast-growing Kantafu area, ideal for residential or mixed-use development. The location benefits from ongoing road improvements and increased accessibility.`,
    features: [
      'High appreciation potential',
      'Accessible to Kangundo Road',
      'Suitable for multiple dwellings',
      'Flat and ready for construction',
    ],
    amenities: [
      'Developing commercial hubs',
      'New housing estates nearby',
      'Good public transport links',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/peter-ngobu-kantafu-brochure.pdf'
  },
  'frank-ombongi-kantafu': {
    id: 'frank-ombongi-kantafu',
    title: 'Plot with Potential in Kantafu',
    location: 'Kantafu, Machakos County, Kenya',
    price: 700000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_105506.jpg',
      '/p/20180707_105511.jpg',
      '/p/20180707_105618.jpg',
    ],
    description: `An excellent 1/8 acre plot in Kantafu, offering significant potential for future development. This area is experiencing rapid expansion, making it a sound investment for capital appreciation.`,
    features: [
      'Good investment returns',
      'Area experiencing rapid growth',
      'Accessible by all-weather roads',
      'Ready for site visit',
    ],
    amenities: [
      'Developing social infrastructure',
      'Peaceful rural setting',
      'Access to local markets',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/frank-ombongi-kantafu-brochure.pdf'
  },
  'nancy-njambi-kitengela': {
    id: 'nancy-njambi-kitengela',
    title: 'Prime Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1000000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_105623.jpg',
      '/p/20180707_105811.jpg',
      '/p/20180707_105823.jpg',
    ],
    description: `A highly desirable 1/8 acre plot in Kitengela, located in a well-established and secure neighborhood. This plot is perfect for building a family home with easy access to all essential services.`,
    features: [
      'Established neighborhood',
      'Secure living environment',
      'Ready for immediate construction',
      'Accessible main roads',
    ],
    amenities: [
      'Close to major schools',
      'Reputable hospitals nearby',
      'Shopping and entertainment centers',
      'Reliable public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/nancy-njambi-kitengela-brochure.pdf'
  },
  'teresia-magiri-kantafu': {
    id: 'teresia-magiri-kantafu',
    title: 'Spacious Plots in Kantafu (Plots 6 & 7)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 650000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      '/p/20180707_105836.jpg',
      '/p/20180707_105840.jpg',
      '/p/20180707_105841.jpg',
    ],
    description: `Two adjacent 1/8 acre plots (total 1/4 acre) for sale in Kantafu, offering a larger space for comprehensive development. Ideal for building a spacious home or multiple units.`,
    features: [
      'Adjoining plots for larger development',
      'Good accessibility',
      'Developing residential zone',
      'Flexible for various uses',
    ],
    amenities: [
      'Proximity to local shopping areas',
      'Schools within reach',
      'Easy access to public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/teresia-magiri-kantafu-brochure.pdf'
  },
  'catherine-wairimu-kitengela': {
    id: 'catherine-wairimu-kitengela',
    title: 'Commercial/Residential Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_110935.jpg',
      '/p/20180707_111014.jpg',
      '/p/20180707_111022.jpg',
    ],
    description: `A versatile 1/8 acre plot in Kitengela, suitable for both residential and commercial development, given its strategic location. This plot offers flexibility for investors and homeowners alike.`,
    features: [
      'Strategic location for mixed-use',
      'High visibility potential',
      'Good road network access',
      'Flat and easily developable',
    ],
    amenities: [
      'Near existing businesses',
      'Residential estates nearby',
      'Public transport routes',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/catherine-wairimu-kitengela-brochure.pdf'
  },
  'teresia-njeri-maina-kitengela': {
    id: 'teresia-njeri-maina-kitengela',
    title: '1/8 Acre Plot in Kitengela (Behind New Light)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_111029.jpg',
      '/p/20180707_111036.jpg',
      '/p/20180707_111038.jpg',
    ],
    description: `A prime 1/8 acre plot located behind the prominent New Light area in Kitengela, known for its rapid development and accessibility. Ideal for a serene residential home with urban conveniences close by.`,
    features: [
      'Located in a prime developing area',
      'Close to major landmarks',
      'Access to water and electricity',
      'Ready for title transfer',
    ],
    amenities: [
      'Near New Light Schools',
      'Shopping centers and supermarkets',
      'Healthcare facilities',
      'Reliable transport system',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/teresia-njeri-maina-kitengela-brochure.pdf'
  },
  'githagia-maina-kitengela': {
    id: 'githagia-maina-kitengela',
    title: 'Well-Located Plot in Kitengela (Behind New Light)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    type: 'Land',
    status: '0722611353',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_111124.jpg',
      '/p/20180707_111132.jpg',
      '/p/20180707_114625.jpg',
    ],
    description: `A premium 1/8 acre plot in Kitengela, strategically positioned behind the New Light area. This plot offers excellent potential for residential development with easy access to modern amenities and infrastructure.`,
    features: [
      'Prime location',
      'High appreciation value',
      'Accessible road network',
      'Good for immediate development',
    ],
    amenities: [
      'Close to educational institutions',
      'Access to medical services',
      'Vibrant community',
      'Shopping centers',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/githagia-maina-kitengela-brochure.pdf'
  },
  'hilda-joska-kantafu-road': {
    id: 'hilda-joska-kantafu-road',
    title: 'Large Farm Land (1.74 Acres) Joska-Kantafu Road',
    location: 'Joska, Kangundo Road, Machakos County, Kenya',
    price: 3000000,
    type: 'Land',
    status: '0722760529',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 1.74,
    yearBuilt: 0,
    images: [
      '/p/20180707_114638.jpg',
      '/p/20180707_114643.jpg',
      '/p/20180707_114646.jpg',
    ],
    description: `An expansive 1.74-acre parcel of farm land strategically located along the Joska-Kantafu Road. Ideal for agricultural ventures, country home development, or subdivision for investment purposes. The area is experiencing growth, making it a valuable long-term asset.`,
    features: [
      'Large acreage for diverse use',
      'Roadside access',
      'Suitable for farming or subdivision',
      'Flat and fertile land',
    ],
    amenities: [
      'Access to water sources (borehole potential)',
      'Developing infrastructure nearby',
      'Peaceful rural setting',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/hilda-joska-kantafu-road-brochure.pdf'
  },
  'njeru-ngai-kantafu': {
    id: 'njeru-ngai-kantafu',
    title: 'Residential Plots in Kantafu (Plots 13 & 14)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 1100000,
    type: 'Land',
    status: '0722455100',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      '/p/20180707_114707.jpg',
      '/p/20180707_114712.jpg',
      '/p/20180707_114717.jpg',
    ],
    description: `Two well-positioned 1/8 acre plots (total 1/4 acre) in Kantafu, perfect for a family residential development. The area offers a serene environment with ongoing infrastructure improvements.`,
    features: [
      'Adjacent plots for spacious design',
      'Residential friendly neighborhood',
      'Good access roads',
      'Ready for development',
    ],
    amenities: [
      'Nearby schools and health centers',
      'Local markets and shops',
      'Developing public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/njeru-ngai-kantafu-brochure.pdf'
  },
  'pauline-mwaura-kantafu': {
    id: 'pauline-mwaura-kantafu',
    title: 'Developing Plot in Kantafu (Plot 40)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 700000,
    type: 'Land',
    status: '0722234859',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
    '/p/20180707_114752.jpg',
    '/p/20180707_114830.jpg',
    '/p/20180707_114837.jpg',
    ],
    description: `A promising 1/8 acre plot in Kantafu, located in a rapidly developing zone ideal for residential construction. This plot offers excellent potential for capital growth and a peaceful living environment.`,
    features: [
      'Fast-growing area',
      'Suitable for a family home',
      'Good connectivity to main roads',
      'Clear title deed',
    ],
    amenities: [
      'Proximity to upcoming amenities',
      'Quiet and serene setting',
      'Easy access to public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/pauline-mwaura-kantafu-brochure.pdf'
  },
  'kauriki-waihenya-joska': {
    id: 'kauriki-waihenya-joska',
    title: 'Residential Plot in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 700000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_114849.jpg',
      '/p/20180707_114916.jpg',
      '/p/20180707_114921.jpg',
    ],
    description: `An accessible 1/8 acre residential plot in Joska, offering a tranquil setting for a home. This area is experiencing steady growth, making it an ideal choice for a serene family environment.`,
    features: [
      'Peaceful residential area',
      'Good for a quiet lifestyle',
      'Developing infrastructure',
      'Ready for construction',
    ],
    amenities: [
      'Close to Kangundo Road',
      'Local shops and services',
      'Community schools',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kauriki-waihenya-joska-brochure.pdf'
  },
  'ruth-njeri-njiraini-kitengela': {
    id: 'ruth-njeri-njiraini-kitengela',
    title: 'Prime Plots in Kitengela (Plots 5 & 6)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 900000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      '/p/20180707_114924.jpg',
      '/p/20180707_114939.jpg',
      '/p/20180707_115245.jpg',
    ],
    description: `Two adjacent 1/8 acre plots (total 1/4 acre) in a prime Kitengela location. These plots offer ample space for a significant residential development or a multi-unit project, benefiting from the area's growth.`,
    features: [
      'Two plots for larger space',
      'Prime residential area',
      'Good infrastructure in place',
      'Ideal for family homes or apartments',
    ],
    amenities: [
      'Close to Kitengela town amenities',
      'Access to schools and hospitals',
      'Good transport links',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/ruth-njeri-njiraini-kitengela-brochure.pdf'
  },
  'celia-wairimu-joska': {
    id: 'celia-wairimu-joska',
    title: 'Affordable Plot in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 600000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180707_115259.jpg',
      '/p/20180807_140608.jpg',
      '/p/20180807_140611.jpg',
    ],
    description: `A very affordable 1/8 acre plot in Joska, presenting an excellent entry-level investment or a budget-friendly option for building a home. The area promises future growth.`,
    features: [
      'Highly affordable',
      'Good for starter home or investment',
      'Developing area',
      'Accessible location',
    ],
    amenities: [
      'Local convenience stores',
      'Public transport routes',
      'Quiet environment',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/celia-wairimu-joska-brochure.pdf'
  },
  'lucy-mumbi-utawala': {
    id: 'lucy-mumbi-utawala',
    title: 'Residential Plot for Sale in Utawala (Plot 55)',
    location: 'Utawala, Nairobi County, Kenya',
    price: 2800000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180807_140614.jpg',
      '/p/20180807_140617.jpg',
      '/p/20180807_140622.jpg',
    ],
    description: `A prime 1/8 acre residential plot in the highly sought-after Utawala area, Nairobi. This location offers excellent connectivity to the city center and Jomo Kenyatta International Airport, making it ideal for urban living.`,
    features: [
      'Highly developed area',
      'Proximity to CBD and JKIA',
      'Access to all urban amenities',
      'Ready for immediate construction',
    ],
    amenities: [
      'Major shopping malls (e.g., Eastgate, Garden City)',
      'International and local schools',
      'Top-tier hospitals',
      'Reliable public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/lucy-mumbi-utawala-brochure.pdf'
  },
  'faith-ntinyari-kantafu': {
    id: 'faith-ntinyari-kantafu',
    title: 'Plot in Kantafu near developing areas',
    location: 'Kantafu, Machakos County, Kenya',
    price: 680000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180807_140652.jpg',
      '/p/20180807_141013.jpg',
      '/p/20180807_141015.jpg',
    ],
    description: `An affordable 1/8 acre plot in Kantafu, located close to developing residential and commercial areas. This plot offers excellent value and is ideal for those looking to invest in a growing region.`,
    features: [
      'Affordable investment opportunity',
      'Close to new developments',
      'Good road access',
      'Suitable for residential building',
    ],
    amenities: [
      'Local shops and services',
      'Proximity to major routes',
      'Peaceful rural setting',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/faith-ntinyari-kantafu-brochure.pdf'
  },
  'liza-nyambura-kitengela': {
    id: 'liza-nyambura-kitengela',
    title: 'Prime Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1000000,
    type: 'Land',
    status: 'Signed',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20180807_141026.jpg',
      '/p/20180922_131018.jpg',
      '/p/20180922_131022.jpg',
    ],
    description: `A well-situated 1/8 acre plot in a desirable part of Kitengela, offering a perfect foundation for a modern family home. The area boasts excellent infrastructure and amenities.`,
    features: [
      'Established residential area',
      'Access to piped water and electricity',
      'Good security',
      'Ready for development',
    ],
    amenities: [
      'Close to urban conveniences',
      'Reputable schools nearby',
      'Shopping centers and markets',
      'Reliable public transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/liza-nyambura-kitengela-brochure.pdf'
  },
  "panari-hotel": {
    "id": "5-star-hotel-nairobi",
    "title": "5-Star Executive The Panari Hotel for Sale in Nairobi West",
    "location": "Mombasa Road, Nairobi",
    "price": 3500000000,
    "type": "Hotel",
    "status": "For Sale",
    "bedrooms": 136,
    "bathrooms": 200,
    "area": 27000,
    "lotSize": 2.5,
    "yearBuilt": 2014,
    "images": [
      "/p40 ph/1.jpg",
      "/p40 ph/2.jpg",
      "/p40 ph/117888582.jpg",
      "/p40 ph/117898178.jpg",
      "/p40 ph/117898178.jpg",
      "/p40 ph/117898333.jpg",
      "/p40 ph/117907909.jpg",
      "/p40 ph/117909731.jpg",
      "/p40 ph/117909748.jpg",
      "/p40 ph/173113867.jpg",
      "/p40 ph/173115984.jpg",
      "/p40 ph/180138466.jpg",
    ],
    "description": "A magnificent 5-star hotel situated along Mombasa Road in Nairobi West, offering luxury accommodations and state-of-the-art amenities. This well-established facility is a prime investment opportunity, boasting a strategic location with easy access to Nairobi's CBD and Jomo Kenyatta International Airport via the Nairobi Expressway. This is a great and well established business facility situated along Mombasa Road, with few minutes drive from both the CBD and JKIA via the Expressway. Sitting on 2.5 acres, the facility is nestled in a well developed and secure area hosting several international clients and other business dignitaries across the globe, giving value for money on ROI.",
    "features": [
      "136 recently refurbished rooms",
      "12 meeting rooms",
      "4 executive restaurants",
      "4 executive bars",
      "2 fully equipped gyms",
      "1 swimming pool",
      "Parking for up to 350 vehicles",
      "Fully equipped kitchen",
      "5 super rooms for persons with disabilities",
      "Double-glazed windows with panoramic views of Nairobi National Park and CBD"
    ],
    "amenities": [
      "24/7 security services",
      "High-speed internet access",
      "Business center",
      "Event and conference facilities",
      "Spa and wellness center",
      "On-site laundry services",
      "Room service",
      "Valet parking",
      "Currency exchange",
      "Travel desk"
    ],
    "agent": {
      "name": "Gaitho Marketing Masters Limited",
      "title": "Senior Property Agent",
      "phone": "0729170156",
      "email": "info@gaithomarketingmasters.com",
      "image": "https://images.openai.com/thumbnails/6e502fcccbd8109ef0bada70a01636b9.jpeg"
    },
    "virtualTour": true,
    "featured": true,
    downloadUrl: '/brochures/panari-hotel-brochure.pdf'
  },
  'plot-nrbwest': {
    id: 'plot-nrbwest',
    title: '1/4 Acre Prime Plot in Nairobi West Shopping Centre',
    location: 'Nairobi West, Nairobi',
    price: 120000000,
    type: 'Commercial Property',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    lotSize: 0.25,
    yearBuilt: 2020,
    images: [
      'https://ext.same-assets.com/2880436944/513979610.jpeg',
      '/p38 NRBW plot/-land-in-westlands-njuguna-waiyaki-way-for-lease-gsctq.jpg',
      '/p38 NRBW plot/ 93c441d3-34cc-408a-9a57-a3b9999eaae1.jpeg',
      '/p38 NRBW plot/IMG-20250510-WA0202.jpg',
    ],
    description:
      'Commercial Property behind Equity Bank in prime Nairobi West location near Nyayo Stadium. Excellent investment opportunity in a high-traffic commercial area.',
    features: [
      'Prime commercial location',
      'Behind Equity Bank',
      'High foot traffic area',
      'Near Nyayo Stadium',
      'Commercial zoning',
      'Easy access to main roads',
      'Established neighborhood',
      'Investment opportunity',
    ],
    amenities: [
      'Commercial Zone',
      'High Traffic',
      'Banking Facilities Nearby',
      'Transport Links',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'https://maps.app.goo.gl/Ncnh8sSh15m2fQK59',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/plot-nrbwest-brochure.pdf'
  },
  'kiambu-windsor': {
    id: 'kiambu-windsor',
    title:
      '4bdrm House Ensuite + 2 ensuite DSQs in Windsor Villas, Mushroom Gardens',
    location: 'Mushroom Gardens, Kiambu Road',
    price: 80000000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    area: 2000,
    lotSize: 0.5,
    yearBuilt: 2020,
    images: [
      'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/1E2ACC81-C233-441F-BEF0-A6C448D14BBB-1170x720.jpeg.webp',
      'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/A71AB30F-F3A2-4B78-AF13-2E629BBEA788-1170x720.jpeg.webp',
      'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/BF1C8D1D-AD37-4DEE-BBC0-7ACCE035B7CE-750x785.jpeg.webp',
      'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/CDDC6A32-6F34-4E61-B5E1-7D7A0FB8C0F7-1170x640.jpeg.webp',
    ],
    description:
      'Windsor Villas is a new development of 4 elegant houses on approximately 2 acres of land located on Mushroom road. On offer is villas sitting on half an acre in leafy Kiambu popular for its sought after views and serene country living. Nearby social amenities include the Ciata Mall, The Paradise Lost, and Windsor Golf Club.',
    features: [
      'A spacious lounge with a beautiful terrace overlooking the back garden',
      ' 4 parking spaces',
      '24/7 manned main gate',
      'Perimeter wall with an electric fence',
      'Shower and a jacuzzi',
      'Two ensuite DSQs',
      'Established neighborhood',
      'Investment opportunity',
    ],
    amenities: [
      'A police post dedicated to serving Mushroom Gardens',
      'CCTV along common areas operated from a central command facility Stone wall with an electric fence and razor wire',
      'Banking Facilities Nearby',
      'Transport Links',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/kiambu-windsor-brochure.pdf'
  },
  'mlolongo-warehouse': {
    id: 'mlolongo-warehouse',
    title: '1/2 acre Warehouse GoDown for sale',
    location: 'Mlolongo, Mombasa Road',
    price: 95000000,
    type: 'Commercial Property',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 11600,
    lotSize: 0.5,
    yearBuilt: 2018,
    images: [
      '/p25 godown mlolo/IMG-20250512-WA0030.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0031.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0032.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0033.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0034.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0035.jpg',
      '/p25 godown mlolo/IMG-20250512-WA0036.jpg',
    ],
    description:
      '11,600sqft warehouse/godown facility strategically located in Mlolongo along Mombasa Road. Perfect for logistics, storage, and distribution operations.',
    features: [
      '11,600 sq ft warehouse space',
      'Strategic Mombasa Road location',
      'Easy access to JKIA',
      'Good for logistics operations',
      'Concrete construction',
      'Loading bays',
      'Security features',
      'Power backup',
    ],
    amenities: [
      'Strategic Location',
      'Airport Access',
      'Loading Facilities',
      'Security',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/mlolongo-warehouse-brochure.pdf'
  },
  'ridgeways-mansion': {
    id: 'ridgeways-mansion',
    title: '9bdrm Mansion in Ridgeways Gardens',
    location: 'Nairobi, Ridgeways',
    price: 165000000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 9,
    bathrooms: 6,
    area: 5000,
    lotSize: 1.2,
    yearBuilt: 2015,
    images: [
      'https://ext.same-assets.com/2880436944/2026814827.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212040.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212040.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212049.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212100.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212112.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212124.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212133.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212142.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212151.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212159.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212211.png',
      '/p2 9b ridgeways/Screenshot 2025-05-10 212220.png',
    ],
    description:
      'Spectacular 9-bedroom mansion set on 5000sqm in the prestigious Ridgeways Gardens. This luxurious family home offers spacious living areas, beautiful gardens, and premium finishes throughout.',
    features: [
      '9 spacious bedrooms',
      '6 modern bathrooms',
      'Large living areas',
      'Modern fitted kitchen',
      'Beautiful gardens',
      'Swimming pool',
      'Staff quarters',
      'Ample parking',
      'Security system',
      'Generator backup',
    ],
    amenities: [
      'Swimming Pool',
      'Large Gardens',
      'Security',
      'Staff Quarters',
      'Premium Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/ridgeways-mansion-brochure.pdf'
  },
  'emali-land': {
    id: 'emali-land',
    title: '550 Acres Land for Sale in Emali Road',
    location: 'Kajiado, Loitoktok',
    price: 4125000000,
    type: 'Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 550,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/311664710.jpeg',
      '/p3 Emali/20180807_140608.jpg',
      '/p3 Emali/20180807_140611.jpg',
      '/p3 Emali/20180807_140617.jpg',
      '/p3 Emali/20180807_140652.jpg',
    ],
    description:
      'Massive 550-acre land parcel along Emali Road at KSh 7,500,000 per acre. Perfect for large-scale agricultural projects, ranching, or subdivision development.',
    features: [
      '550 acres of land',
      'Along Emali Road',
      'Good for agriculture',
      'Subdivision potential',
      'Strategic location',
      'Clear title deed',
      'Water availability',
      'Road access',
    ],
    amenities: [
      'Road Access',
      'Water Rights',
      'Agricultural Potential',
      'Investment Opportunity',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/emali-land-brochure.pdf'
  },
  'muthaiga-mansion': {
    id: 'muthaiga-mansion',
    title: '3bdrm Mansion in 3 Acres Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 350000000,
    type: 'Luxury Mansion',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 4,
    area: 500,
    lotSize: 3,
    yearBuilt: 2010,
    images: [
      'https://ext.same-assets.com/2880436944/2862327400.jpeg',
      'https://ext.same-assets.com/3634728786/3519000104.jpeg',
      'https://ext.same-assets.com/3634728786/4125891741.jpeg',
    ],
    description:
      "Exquisite 3-bedroom mansion situated on 3 acres in the exclusive Muthaiga area. This property combines luxury living with privacy and tranquility in one of Nairobi's most prestigious neighborhoods.",
    features: [
      '3 spacious bedrooms',
      '4 bathrooms',
      '3-acre private grounds',
      'Swimming pool',
      'Landscaped gardens',
      'Staff quarters',
      'Wine cellar',
      'Elevator',
      'Generator',
      'Security system',
      'Garage parking',
      'Mature trees',
    ],
    amenities: [
      'Private Pool',
      'Private Gardens',
      'Security',
      'Staff Accommodation',
      'Prestigious Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/muthaiga-mansion-brochure.pdf'
  },
  'edenville-villa': {
    id: 'edenville-villa',
    title: '3bdrm Villa in Edenville',
    location: 'Kiambu, Kiambu / Kiambu',
    price: 26000000,
    type: 'Villa',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    lotSize: 0.125,
    yearBuilt: 2019,
    images: [
      '/p24 edenville/IMG-20250510-WA0251.jpg',
      '/p24 edenville/IMG-20250510-WA0250.jpg',
      '/p24 edenville/IMG-20250510-WA0249.jpg',
      '/p24 edenville/IMG-20250510-WA0252.jpg',
      '/p24 edenville/IMG-20250510-WA0253.jpg',
      '/p24 edenville/IMG-20250510-WA0254.jpg',
      '/p24 edenville/IMG-20250510-WA0255.jpg',
      '/p24 edenville/IMG-20250510-WA0256.jpg',
      '/p24 edenville/IMG-20250510-WA0257.jpg',
      '/p24 edenville/IMG-20250510-WA0258.jpg',
      '/p24 edenville/IMG-20250510-WA0259.jpg',
    ],
    description:
      'Modern 3-bedroom villa in the sought-after Edenville estate. Features contemporary design, quality finishes, and access to estate amenities in a secure gated community.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      'Modern kitchen',
      'Living/dining area',
      'Garden space',
      'Parking',
      'Estate amenities',
      'Security',
      'Gated community',
      'Quality finishes',
    ],
    amenities: [
      'Gated Community',
      'Security',
      'Estate Amenities',
      'Modern Design',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/edenville-villa-brochure.pdf'
  },
  'muthaiga-land': {
    id: 'muthaiga-land',
    title: '1 Acres Residential Vacant Land for Sale in Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 230000000,
    type: 'Residential Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 1,
    yearBuilt: 0,
    images: [
      'p26 1a muthaiga/IMG-20250510-WA0215.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0224.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0225.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0226.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0227.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0228.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0229.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0230.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0231.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0232.jpg',
      'p26 1a muthaiga/IMG-20250510-WA0234.jpg',
    ],
    description:
      "Prime 1-acre residential land in exclusive Muthaiga. Perfect for building your dream home in one of Nairobi's most prestigious addresses with excellent infrastructure and security.",
    features: [
      '1 acre of land',
      'Residential zoning',
      'Prime Muthaiga location',
      'Clear title deed',
      'All utilities available',
      'Excellent drainage',
      'Security',
      'Good access roads',
      'Mature neighborhood',
      'Investment potential',
    ],
    amenities: [
      'Prestigious Location',
      'All Utilities',
      'Security',
      'Good Infrastructure',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/muthaiga-land-brochure.pdf'
  },
  'kitengela-plot': {
    id: 'kitengela-plot',
    title: '50 by 100 Acre Plot for Sale in Kitengela',
    location: 'Kajiado, Kitengela',
    price: 700000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.11,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/515128159.png',
      '/p kite 11/Screenshot 2024-02-12 090319.png',
      '/p kite 11/Screenshot 2024-02-12 090327.png',
      '/p kite 11/Screenshot 2024-02-12 090336.png',
      '/p kite 11/Screenshot 2024-02-12 090510.png',
      '/p kite 11/Screenshot 2024-02-12 090519.png',
    ],
    description:
      'Affordable 50x100 residential plot in the rapidly growing Kitengela area. Great investment opportunity with good accessibility and development potential.',
    features: [
      '50x100 plot size',
      'Residential zoning',
      'Growing area',
      'Good access roads',
      'Electricity nearby',
      'Water connection available',
      'Affordable pricing',
      'Investment potential',
      'Clear title deed',
      'Ready to build',
    ],
    amenities: [
      'Road Access',
      'Utilities Available',
      'Growing Neighborhood',
      'Investment Potential',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kitengela-plot-brochure.pdf'
  },
  'karen-6acres': {
    id: 'karen-6acres',
    title: '6 Acres Residential Vacant Land for Sale in Karen',
    location: 'Nairobi, Karen',
    price: 540000000,
    type: 'Residential Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 6,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/3634728786/2403051608.jpeg',
      'https://ext.same-assets.com/3634728786/839530001.jpeg',
      'https://ext.same-assets.com/3634728786/3957476372.jpeg',
    ],
    description:
      "Discover an exceptional opportunity to own a prime 6-acre vacant land in the heart of Karen, one of Nairobi's most sought-after locations. This expansive parcel boasts a gentle slope and rich red soil, making it ideal for a variety of development options.",
    features: [
      '6 acres of prime land',
      'Gentle slope terrain',
      'Rich red soil',
      'Karen location',
      'Development potential',
      'All utilities available',
      'Clear title deed',
      'Strategic location',
      'Good drainage',
      'Mature neighborhood',
    ],
    amenities: [
      'Prime Karen Location',
      'All Utilities',
      'Development Ready',
      'Prestigious Area',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/karen-6acres-brochure.pdf'
  },
  'syokimau-industrial': {
    id: 'syokimau-industrial',
    title: '2.5 Acres Commercial Industrial Property for Sale in Syokimau',
    location: 'Machakos, Syokimau',
    price: 400000000,
    type: 'Commercial Industrial',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 57000,
    lotSize: 2.5,
    yearBuilt: 2016,
    images: [
      'https://ext.same-assets.com/3634728786/3440863984.jpeg',
      'https://ext.same-assets.com/3634728786/2901773263.jpeg',
      'https://ext.same-assets.com/3634728786/22836051.jpeg',
    ],
    description:
      'Unlock a high-yield investment opportunity with this strategically located 2.5-acre industrial property, ideal for both investors and owner-occupiers. Boasting a 57,000 sq. ft. warehousing space across six go-downs, this property offers a rare chance to acquire a fully functional industrial facility.',
    features: [
      '2.5 acres of land',
      '57,000 sq ft warehouse',
      'Six go-downs',
      'Strategic location',
      'High yield investment',
      'Fully functional facility',
      'Good road access',
      'Power backup',
      'Security features',
      'Development potential',
    ],
    amenities: [
      'Industrial Facility',
      'Strategic Location',
      'High Yield Investment',
      'Functional Infrastructure',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/syokimau-industrial-brochure.pdf'
  },
  'cbd-commercial': {
    id: 'cbd-commercial',
    title: '3506 m² Commercial Building for Sale in Central Business District',
    location: 'Nairobi, Central Business District',
    price: 475000000,
    type: 'Commercial Building',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 3506,
    lotSize: 0.1,
    yearBuilt: 1995,
    images: [
      'https://ext.same-assets.com/3634728786/2651965371.jpeg',
      'https://ext.same-assets.com/3634728786/500845845.jpeg',
      'https://ext.same-assets.com/3634728786/1726011918.jpeg',
    ],
    description:
      'The property is situated in a prominent position within the Nairobi CBD at the junction of Tom Mboya Street and Hakati Road. Notable establishments in the immediate neighborhood include The KICC, Times Tower, Cooperative House, National Bank House, Development House.',
    features: [
      '3506 m² building',
      'Prime CBD location',
      'Junction of Tom Mboya & Hakati',
      'Near KICC',
      'Commercial zoning',
      'High foot traffic',
      'Multiple floors',
      'Lift access',
      'Parking available',
      'Investment opportunity',
    ],
    amenities: [
      'Prime CBD Location',
      'High Traffic',
      'Commercial Zone',
      'Public Transport',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/cbd-commercial-brochure.pdf'
  },
  'westlands-land': {
    id: 'westlands-land',
    title: '0.95 Acres Residential Vacant Land for Sale in Westlands',
    location: 'Nairobi, Westlands',
    price: 430000000,
    type: 'Residential Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.95,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/3634728786/3896291020.jpeg',
      'https://ext.same-assets.com/3634728786/2705632412.jpeg',
    ],
    description:
      "Prime land for sale at Brookside Gardens, an exclusive location in Nairobi's sought-after Westlands area. This rare gem offers a serene environment, excellent accessibility, and a prestigious address.",
    features: [
      '0.95 acres',
      'Brookside Gardens',
      'Westlands location',
      'Serene environment',
      'Excellent accessibility',
      'Prestigious address',
      'Development ready',
      'Clear title deed',
      'All utilities',
      'High-value neighborhood',
    ],
    amenities: [
      'Prestigious Westlands',
      'All Utilities',
      'Excellent Access',
      'High-Value Area',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/westlands-land-brochure.pdf'
  },
  'isinya-land': {
    id: 'isinya-land',
    title: '50 Acres in Isinya Land for Sale',
    location: 'Kajiado, Isinya',
    price: 14000000,
    type: 'Agricultural Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 50,
    yearBuilt: 0,
    images: [
      '/p/20181110_130305.jpg',
      '/p/20181110_130309.jpg',
      '/p/20181110_130310.jpg',
    ],
    description:
      '50 acres of prime agricultural land in Isinya, Kajiado County. Excellent for farming, ranching, or future subdivision development with good access roads.',
    features: [
      '50 acres of land',
      'Good for agriculture',
      'Access roads available',
      'Clear title deed',
      'Water sources nearby',
      'Flat terrain',
      'Rich soil',
      'Development potential',
    ],
    amenities: [
      'Agricultural Potential',
      'Road Access',
      'Water Sources',
      'Clear Title',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/isinya-land-brochure.pdf'
  },
  'neema-gardens': {
    id: 'neema-gardens',
    title: '50 by 100 Land for Sale in Neema Gardens',
    location: 'Kajiado, Kitengela',
    price: 1800000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.11,
    yearBuilt: 0,
    images: [
      '/p/20180928_162943.jpg',
      '/p/20180928_163049.jpg',
      '/p/20180928_163052.jpg',
    ],
    description:
      '50x100 residential plot in the popular Neema Gardens estate, Kitengela. Well-planned neighborhood with good infrastructure and security.',
    features: [
      '50x100 plot size',
      'Neema Gardens estate',
      'Good infrastructure',
      'Security',
      'Electricity connection',
      'Water connection',
      'Access roads',
      'Ready title deed',
    ],
    amenities: [
      'Estate Living',
      'Security',
      'Infrastructure',
      'Utilities Available',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/neema-gardens-brochure.pdf'
  },
  'kinoo-plot': {
    id: 'kinoo-plot',
    title: 'Kinoo 1/4 Acre Plot in Nairobi',
    location: 'Kiambu, Kikuyu',
    price: 20000000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      'p10 kinoo/IMG-20250421-WA0107.jpg',
      'p10 kinoo/IMG-20250421-WA0248.jpg',
    ],
    description:
      'Quarter acre residential plot in Kinoo area, perfect for building your dream home. Located in a rapidly developing area with good access to Nairobi CBD.',
    features: [
      '1/4 acre plot',
      'Kinoo location',
      'Good access to CBD',
      'Developing area',
      'Clear title deed',
      'All utilities available',
      'Good drainage',
      'Investment potential',
    ],
    amenities: [
      'CBD Access',
      'Utilities Available',
      'Development Area',
      'Investment Potential',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kinoo-plot-brochure.pdf'
  },
  'joska-plots': {
    id: 'joska-plots',
    title: 'Joska Land for Sale',
    location: 'Nairobi, Kamulu',
    price: 950000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/3179128645.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Affordable residential plots in Joska area near Kamulu. Great investment opportunity in a fast-growing residential area with easy access to transport.',
    features: [
      'Affordable pricing',
      'Joska location',
      'Near transport',
      'Growing area',
      'Clear title',
      'Ready to build',
      'Water nearby',
      'Good access roads',
    ],
    amenities: [
      'Transport Access',
      'Growing Area',
      'Affordable Investment',
      'Development Ready',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/joska-plots-brochure.pdf'
  },
  'utawala-plots': {
    id: 'utawala-plots',
    title: 'Utawala Zebra Plots for Sale',
    location: 'Nairobi, Utawala',
    price: 2000000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/1522192692.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      "Prime residential plots in Utawala's Zebra area. Well-located with good infrastructure and easy access to the Eastern Bypass.",
    features: [
      'Prime Utawala location',
      'Zebra area',
      'Good infrastructure',
      'Eastern Bypass access',
      'Electricity available',
      'Water connection',
      'Security',
      'Ready title deed',
    ],
    amenities: [
      'Infrastructure',
      'Bypass Access',
      'Security',
      'Utilities Ready',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/utawala-plots-brochure.pdf'
  },
  'syokimau-5acres': {
    id: 'syokimau-5acres',
    title: '5 Acres Vacant Land for Sale in Syokimau',
    location: 'Machakos, Syokimau',
    price: 200000000,
    type: 'Commercial Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 5,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/2093076440.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '5 acres of prime redevelopment land in Syokimau. Excellent for commercial or residential development with proximity to JKIA and major transport routes.',
    features: [
      '5 acres of land',
      'Redevelopment potential',
      'Near JKIA',
      'Commercial zoning',
      'Transport routes',
      'All utilities available',
      'Strategic location',
      'High appreciation potential',
    ],
    amenities: [
      'JKIA Proximity',
      'Transport Routes',
      'Commercial Potential',
      'Strategic Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/syokimau-5acres-brochure.pdf'
  },
  'kisaju-10acres': {
    id: 'kisaju-10acres',
    title: '10 Acres in Kisaju Along Namanga Road',
    location: 'Kajiado, Kisaju',
    price: 140000000,
    type: 'Agricultural Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 10,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/2390980102.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '10 acres of prime land along the busy Namanga Road in Kisaju. Perfect for commercial development, logistics, or agricultural use with excellent road frontage.',
    features: [
      '10 acres',
      'Namanga Road frontage',
      'Commercial potential',
      'Good for logistics',
      'Agricultural use',
      'Excellent access',
      'High traffic area',
      'Development potential',
    ],
    amenities: [
      'Road Frontage',
      'High Traffic',
      'Commercial Potential',
      'Strategic Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kisaju-10acres-brochure.pdf'
  },
  'syokimau-katani': {
    id: 'syokimau-katani',
    title: 'Syokimau Katani Road Plots for Sale',
    location: 'Machakos, Syokimau',
    price: 4500000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20181110_130316.jpg',
      '/p/20181110_130323.jpg',
      '/p/20181110_130451.jpg',
    ],
    description:
      'Residential plots along Katani Road in Syokimau. Well-planned area with good infrastructure and proximity to SGR station.',
    features: [
      'Katani Road location',
      'Near SGR station',
      'Good infrastructure',
      'Planned development',
      'Water connection',
      'Electricity',
      'Security',
      'Ready title',
    ],
    amenities: [
      'SGR Proximity',
      'Infrastructure',
      'Planned Development',
      'Transport Links',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/syokimau-katani-brochure.pdf'
  },
  'kitengela-bungalow': {
    id: 'kitengela-bungalow',
    title: '3bdrm Bungalow In Mlimani Court',
    location: 'Kajiado, Kitengela',
    price: 2800000,
    type: 'Bungalow',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    lotSize: 0.125,
    yearBuilt: 2020,
    images: [
      'https://ext.same-assets.com/2880436944/413641261.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Modern 3-bedroom bungalow in Mlimani Court, Kitengela. Well-designed home in a secure estate with good amenities and transport access.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      'Modern design',
      'Mlimani Court estate',
      'Security',
      'Parking space',
      'Garden area',
      'Good transport',
    ],
    amenities: [
      'Estate Living',
      'Security',
      'Modern Design',
      'Transport Access',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/kitengela-bungalow-brochure.pdf'
  },
  'kiambu-road-10acres': {
    id: 'kiambu-road-10acres',
    title: '10 Acres Vacant Land for Sale in Kiambu Road',
    location: 'Nairobi, Nairobi Central',
    price: 600000000,
    type: 'Commercial Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 10,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/3792112934.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '10 acres of prime vacant land along Kiambu Road. Excellent for commercial or mixed-use development with high visibility and accessibility.',
    features: [
      '10 acres',
      'Kiambu Road frontage',
      'Commercial potential',
      'High visibility',
      'Excellent access',
      'All utilities',
      'Mixed-use zoning',
      'Investment opportunity',
    ],
    amenities: [
      'Road Frontage',
      'Commercial Potential',
      'High Visibility',
      'Investment Grade',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/kiambu-road-10acres-brochure.pdf'
  },
  'karen-mansion': {
    id: 'karen-mansion',
    title: '13bdrm Mansion in Mayeast Road',
    location: 'Nairobi, Karen',
    price: 400000,
    originalPrice: 450000,
    type: 'Luxury Mansion',
    status: 'For Rent',
    bedrooms: 13,
    bathrooms: 8,
    area: 8000,
    lotSize: 2,
    yearBuilt: 2012,
    images: [
      'p35 may east/IMG-20250510-WA0072.jpg',
      'p35 may east/IMG-20250510-WA0073.jpg',
      'p35 may east/IMG-20250510-WA0074.jpg',
      'p35 may east/IMG-20250510-WA0075.jpg',
      'p35 may east/IMG-20250510-WA0083.jpg',
    ],
    description:
      'Spectacular 13-bedroom mansion in prestigious Karen along Mayeast Road. Perfect for large families or corporate use with extensive grounds and luxury finishes.',
    features: [
      '13 spacious bedrooms',
      '8 bathrooms',
      'Large living areas',
      'Swimming pool',
      'Beautiful gardens',
      'Staff quarters',
      'Generator backup',
      'Security system',
      'Ample parking',
      'Corporate suitable',
    ],
    amenities: [
      'Swimming Pool',
      'Large Gardens',
      'Staff Quarters',
      'Security',
      'Karen Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/karen-mansion-brochure.pdf'
  },
  'lavington-land': {
    id: 'lavington-land',
    title: '1/2 Acre Land in Lavington',
    location: 'Nairobi, Kileleshwa',
    price: 135000000,
    type: 'Residential Land',
    status: 'SOLD',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.5,
    yearBuilt: 0,
    images: [
      '/p13 lavi/IMG-20250510-WA0209.jpg',
      '/p13 lavi/IMG-20250510-WA0212.jpg',
      '/p13 lavi/IMG-20250510-WA0213.jpg',
    ],
    description:
      'Half acre plot in prime Lavington area. This property has been sold but similar properties are available.',
    features: [
      'Half acre plot',
      'Prime Lavington',
      'Residential zoning',
      'Good access',
      'All utilities',
      'Mature neighborhood',
      'High value area',
      'Investment grade',
    ],
    amenities: [
      'Prime Location',
      'Utilities Available',
      'Mature Neighborhood',
      'High Value',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/lavington-land-brochure.pdf'
  },
  'cbd-building': {
    id: 'cbd-building',
    title: '3500m2 Commercial Building for Sale in Nairobi Town CBD',
    location: 'Nairobi, Nairobi Central',
    price: 475000000,
    type: 'Commercial Building',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 3500,
    lotSize: 0.15,
    yearBuilt: 1990,
    images: [
      'https://ext.same-assets.com/2880436944/2115884790.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '3500m² commercial building in the heart of Nairobi CBD. Prime location with excellent rental income potential and high foot traffic.',
    features: [
      '3500m² building',
      'CBD location',
      'Multiple floors',
      'High rental yield',
      'Elevator access',
      'Parking available',
      'Prime position',
      'Investment grade',
    ],
    amenities: ['CBD Location', 'High Traffic', 'Elevator Access', 'Parking'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/cbd-building-brochure.pdf'
  },
  'athi-river-maisonette': {
    id: 'athi-river-maisonette',
    title: '3bdrm Maisonette in Sidai Village',
    location: 'Machakos, Athi River',
    price: 8500000,
    type: 'Maisonette',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 505,
    lotSize: 0.125,
    yearBuilt: 2021,
    images: [
      'https://ext.same-assets.com/2880436944/638900844.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Modern 3-bedroom maisonette in Sidai Village, Athi River. Well-designed home in a planned estate with good amenities.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      '505 sqm plot',
      'Modern design',
      'Sidai Village estate',
      'Security',
      'Water & electricity',
      'Good transport',
    ],
    amenities: [
      'Estate Living',
      'Modern Design',
      'Security',
      'Transport Access',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/athi-river-maisonette-brochure.pdf'
  },
  'lavington-quarter-acre': {
    id: 'lavington-quarter-acre',
    title: '1/4 an Acre Touching James Gichuru Lavington Land for Sale',
    location: 'Nairobi, Kileleshwa',
    price: 140000000,
    type: 'Residential Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/2969919925.jpeg',
      'https://ext.same-assets.com/2880436944/1057443694.jpeg',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Quarter acre land touching James Gichuru Road in Lavington. Prime location with excellent access and development potential.',
    features: [
      '1/4 acre',
      'James Gichuru frontage',
      'Lavington location',
      'Prime access',
      'All utilities',
      'High value area',
      'Development ready',
      'Investment grade',
    ],
    amenities: [
      'Road Frontage',
      'Prime Lavington',
      'Utilities Ready',
      'High Value',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/lavington-quarter-acre-brochure.pdf'
  },
  'thika-commercial': {
    id: 'thika-commercial',
    title: '12.5 Acres Commercial Vacant Land for Sale in Thika',
    location: 'Kiambu, Thika',
    price: 300000000,
    type: 'Commercial Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 12.5,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/2880436944/2292786202.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '12.5 acres of commercial vacant land in Thika. Excellent for industrial, commercial, or mixed-use development with good infrastructure.',
    features: [
      '12.5 acres',
      'Commercial zoning',
      'Thika location',
      'Good infrastructure',
      'Industrial potential',
      'Mixed-use suitable',
      'Power available',
      'Good access roads',
    ],
    amenities: [
      'Commercial Zone',
      'Infrastructure',
      'Industrial Potential',
      'Strategic Location',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/thika-commercial-brochure.pdf'
  },
  'karen-villa': {
    id: 'karen-villa',
    title: '4bdrm Villa in Karen, Nairobi Central for sale',
    location: 'Nairobi, Karen',
    price: 400000000,
    type: 'Luxury Villa',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 5000,
    lotSize: 1.2,
    yearBuilt: 2018,
    images: [
      'https://ext.same-assets.com/2880436944/3531345130.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Stunning 4-bedroom villa in Karen on 5000sqm. Luxury living with beautiful gardens, swimming pool, and premium finishes throughout.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      '5000sqm plot',
      'Swimming pool',
      'Beautiful gardens',
      'Premium finishes',
      'Staff quarters',
      'Security system',
      'Generator backup',
      'Karen location',
    ],
    amenities: [
      'Swimming Pool',
      'Large Gardens',
      'Karen Location',
      'Luxury Finishes',
      'Security',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/karen-villa-brochure.pdf'
  },
  'kiambu-road-house': {
    id: 'kiambu-road-house',
    title: '5bdrm House in Kiambu Road',
    location: 'Nairobi, Nairobi Central',
    price: 550000000,
    type: 'Luxury House',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 5000,
    lotSize: 1.5,
    yearBuilt: 2016,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Magnificent 5-bedroom house along Kiambu Road on 5000sqm. Luxury family home with excellent access to the city and international schools.',
    features: [
      '5 bedrooms',
      '4 bathrooms',
      '5000sqm plot',
      'Kiambu Road',
      'Swimming pool',
      'Large compound',
      'Modern kitchen',
      'Staff quarters',
      'Security',
      'Generator',
    ],
    amenities: [
      'Swimming Pool',
      'Large Compound',
      'Strategic Location',
      'Security',
      'Modern Features',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/kiambu-road-house-brochure.pdf'
  },
  'chyuna-estate': {
    id: 'chyuna-estate',
    title: '5bdrm Mansion in Chyuna Estate',
    location: 'Kajiado, Kitengela',
    price: 35000000,
    type: 'Mansion',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    lotSize: 0.5,
    yearBuilt: 2019,
    images: [
      'https://ext.same-assets.com/2880436944/831122591.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Beautiful 5-bedroom mansion in Chyuna Estate, Kitengela. Modern design with spacious rooms and excellent finishes in a secure estate.',
    features: [
      '5 bedrooms',
      '4 bathrooms',
      '500sqm area',
      'Modern design',
      'Chyuna Estate',
      'Security',
      'Parking',
      'Garden space',
      'Quality finishes',
      'Estate amenities',
    ],
    amenities: ['Estate Living', 'Security', 'Modern Design', 'Garden Space'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/chyuna-estate-brochure.pdf'
  },
  'nairobi-warehouse': {
    id: 'nairobi-warehouse',
    title: '3 Acres Commercial Property Warehouse for Sale in Nairobi',
    location: 'Nairobi, Nairobi Central',
    price: 1000000000,
    type: 'Commercial Warehouse',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 30000,
    lotSize: 3,
    yearBuilt: 2010,
    images: [
      'https://ext.same-assets.com/2880436944/3311501830.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '3 acres commercial warehouse property in Nairobi with 30,000sqm of commercial space. Prime investment opportunity for logistics and distribution.',
    features: [
      '3 acres of land',
      '30,000sqm warehouse',
      'Commercial zoning',
      'Strategic location',
      'Loading bays',
      'High ceiling',
      'Power backup',
      'Security systems',
      'Investment grade',
      'Rental income',
    ],
    amenities: [
      'Commercial Facility',
      'Strategic Location',
      'Investment Grade',
      'Security Features',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
    downloadUrl: '/brochures/nairobi-warehouse-brochure.pdf'
  },
  'ngong-plots': {
    id: 'ngong-plots',
    title: 'Fully Serviced Plots for Sale in Ngong Oluulua Ngong 46',
    location: 'Ngong, Kajiado',
    price: 7500000,
    type: 'Residential Plot',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.125,
    yearBuilt: 0,
    images: [
      '/p/20181112_100429.jpg',
      '/p/20181112_100434.jpg',
      '/p/20190123_094902.jpg',
    ],
    description:
      'Fully serviced residential plots in Ngong Oluulua area. Great investment opportunity with all infrastructure in place and beautiful views.',
    features: [
      'Fully serviced plots',
      'Ngong location',
      'All infrastructure',
      'Beautiful views',
      'Clear title deeds',
      'Security',
      'Water & electricity',
      'Good access roads',
    ],
    amenities: [
      'Fully Serviced',
      'Beautiful Views',
      'Infrastructure',
      'Security',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
    downloadUrl: '/brochures/ngong-plots-brochure.pdf'
  },
  'mombasa-industrial': {
    id: 'mombasa-industrial',
    title: '3 acres commercial industrial property for sale in Mombasa Road',
    location: 'Nairobi, Mombasa Road',
    price: 990000000,
    type: 'Commercial Industrial',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 100000,
    lotSize: 3,
    yearBuilt: 2008,
    images: [
      'https://ext.same-assets.com/3634728786/575370584.jpeg',
      'https://ext.same-assets.com/3634728786/1355486781.jpeg',
      'https://ext.same-assets.com/3634728786/1776235649.jpeg',
    ],
    description:
      'Property Highlights: Location: Prime position along Main Mombasa Road, inbound to CBD Total Built-Up Area: Approximately 100,000 sq. ft. Land Area: 3 acres Facilities: Showroom & Offices Block: 30,000 sq. ft. total 10,000 sq. ft. of road-facing, double-volume showrooms',
    features: [
      '3 acres land area',
      '100,000 sq ft built-up',
      'Prime Mombasa Road',
      '30,000 sq ft showroom',
      'Road-facing showrooms',
      'Industrial facility',
      'Office space',
      'Strategic location',
      'High visibility',
      'Investment grade',
    ],
    amenities: [
      'Industrial Facility',
      'Prime Location',
      'High Visibility',
      'Investment Grade',
    ],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
    downloadUrl: '/brochures/mombasa-industrial-brochure.pdf'
  },
}

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params && 'id' in params ? (params.id as string) : 'heritage-villas-ngong';
  const property = propertyData[propertyId] || propertyData['heritage-villas-ngong'];

  // Enhanced state management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 500) + 100);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Calculator states
  const [mortgagePrincipal, setMortgagePrincipal] = useState(property?.price ?? 0);
  const [mortgageInterestRate, setMortgageInterestRate] = useState(12);
  const [mortgageLoanTerm, setMortgageLoanTerm] = useState(25);
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(0);
  
  // Auto-slider functionality
  useEffect(() => {
    if (property && isAutoSliding && property.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
    // Explicitly return undefined if no cleanup is needed
    return undefined;
  }, [isAutoSliding, property && property.images.length]);

  // Calculate mortgage payment
  useEffect(() => {
    calculateMortgagePayment(mortgagePrincipal, mortgageInterestRate, mortgageLoanTerm);
  }, [mortgagePrincipal, mortgageInterestRate, mortgageLoanTerm]);

  // Track view count
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewCount(prev => prev + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center transform hover:scale-105 transition-all duration-300">
          <div className="mb-4 animate-bounce">
            <Home className="h-16 w-16 mx-auto text-blue-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Property Not Found</h1>
          <p className="mb-6 text-gray-600">The property you're looking for doesn't exist.</p>
          <Link href="/properties">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    setIsAutoSliding(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    setIsAutoSliding(false);
  };

  const calculateMortgagePayment = (principal: number, annualInterestRate: number, loanTermYears: number) => {
    if (principal <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
      setMonthlyMortgagePayment(0);
      return;
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    if (monthlyInterestRate === 0) {
      setMonthlyMortgagePayment(principal / numberOfPayments);
    } else {
      const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
      setMonthlyMortgagePayment(numerator / denominator);
    }
  };

  const toggleSaveProperty = () => {
    setSavedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const shareProperty = async (platform?: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = property.title;
    const text = `Check out this amazing property: ${title}`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "image": property.images,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.3661591034223453,
      "longitude": 36.67286523063698
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area,
      "unitText": "sqm"
    },
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "yearBuilt": property.yearBuilt,
    "price": {
      "@type": "PriceSpecification",
      "price": property.price,
      "priceCurrency": "KES"
    },
    "realEstateAgent": {
      "@type": "RealEstateAgent",
      "name": property.agent.name,
      "telephone": property.agent.phone,
      "email": property.agent.email
    }
  };

  return (
    <>
      <Header />
      <Head>
        <title>{property.title} - Premium Real Estate</title>
        <meta name="description" content={property.description.substring(0, 160)} />
        <meta name="keywords" content={`${property.type}, ${property.location}, real estate, property for sale, ${property.bedrooms} bedroom`} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description.substring(0, 160)} />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.title} />
        <meta name="twitter:description" content={property.description.substring(0, 160)} />
        <meta name="twitter:image" content={property.images[0]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Floating Back Button */}
        <div className="fixed top-24 left-6 z-50">
          <Link href="/properties">
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Hero Section with Enhanced Gallery */}
        <section className="relative pt-16 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Property Status Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={`${property.status === 'For Sale' ? 'bg-emerald-500' : 'bg-blue-500'} text-white animate-pulse`}>
                  {property.status}
                </Badge>
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                  {property.type}
                </Badge>
                {property.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Award className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="h-4 w-4" />
                <span>{viewCount} views</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>Updated today</span>
              </div>
            </div>

            {/* Enhanced Image Gallery */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {/* Main Image Container */}
              <div className="lg:col-span-3">
                <div className="relative h-96 lg:h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
                  {/* Auto-sliding indicator */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    {isAutoSliding && (
                      <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                        <Play className="mr-1 h-3 w-3" />
                        Auto-sliding
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsAutoSliding(!isAutoSliding)}
                      className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    >
                      {isAutoSliding ? 'Pause' : 'Play'}
                    </Button>
                  </div>

                  {showVirtualTour && property.virtualTour ? (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <iframe
                          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                          title="Virtual Property Tour"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-3xl"
                        />
                        <Button
                          onClick={() => setShowVirtualTour(false)}
                          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Close Tour
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={property.images[currentImageIndex]}
                        alt={`${property.title} - Image ${currentImageIndex + 1}`}
                        className={`h-full w-full object-cover transition-all duration-700 transform ${isImageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                        onLoad={() => setIsImageLoaded(true)}
                      />
                      
                      {/* Gradient Overlays for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
                    </>
                  )}

                  {/* Enhanced Navigation Controls */}
                  {!showVirtualTour && property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                    </>
                  )}

                  {/* Image Progress Indicators */}
                  {!showVirtualTour && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setIsAutoSliding(false);
                          }}
                          className={`h-2 w-8 rounded-full transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'bg-white shadow-lg transform scale-125' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  {!showVirtualTour && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/60 backdrop-blur-sm px-4 py-2 text-sm text-white font-medium">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    {property.virtualTour && !showVirtualTour && (
                      <Button
                        onClick={() => setShowVirtualTour(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Virtual Tour
                      </Button>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={toggleSaveProperty}
                        variant="secondary"
                        size="sm"
                        className={`bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                          savedProperties.includes(propertyId) ? 'text-red-600' : 'text-gray-700'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${savedProperties.includes(propertyId) ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <div className="relative">
                        <Button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        
                        {showShareMenu && (
                          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border p-2 z-10 min-w-[120px]">
                            <button
                              onClick={() => shareProperty('whatsapp')}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                            >
                              <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                              WhatsApp
                            </button>
                            <button
                              onClick={() => shareProperty('twitter')}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                            >
                              <Share className="mr-2 h-4 w-4 text-blue-600" />
                              Twitter
                            </button>
                            <button
                              onClick={() => shareProperty()}
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
                            >
                              <Download className="mr-2 h-4 w-4 text-gray-600" />
                              Copy Link
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Thumbnail Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {property.images.slice(0, 6).map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsAutoSliding(false);
                      }}
                      className={`relative h-20 lg:h-28 overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        currentImageIndex === index 
                          ? 'ring-4 ring-blue-500 shadow-xl' 
                          : 'hover:ring-2 hover:ring-blue-300 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {property.images.length > 6 && index === 5 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white font-medium">
                          <Camera className="mr-1 h-4 w-4" />
                          +{property.images.length - 6}
                        </div>
                      )}
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 rounded-xl" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* View All Photos Button */}
                <Button variant="outline" className="w-full transform hover:scale-105 transition-all duration-300">
                  <Camera className="mr-2 h-4 w-4" />
                  View All {property.images.length} Photos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Property Information */}
        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-8 lg:col-span-2">
                {/* Property Header */}
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <h1 className="mb-4 font-bold text-4xl lg:text-5xl text-gray-900 leading-tight">
                    {property.title}
                  </h1>

                  <div className="mb-6 flex items-center text-gray-600 text-lg">
                    <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-baseline space-x-4 mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(property.price)}
                    </span>
                    {property.originalPrice && property.originalPrice > property.price && (
                      <div className="flex flex-col">
                        <span className="text-xl text-gray-500 line-through">
                          {formatPrice(property.originalPrice)}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          Save {formatPrice(property.originalPrice - property.price)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center space-x-6 py-4">
                    <div className="flex items-center text-green-600">
                      <Shield className="mr-2 h-5 w-5" />
                      <span className="text-sm font-medium">Verified Property</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Award className="mr-2 h-5 w-5" />
                      <span className="text-sm font-medium">Premium Location</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span className="text-sm font-medium">Ready Title</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Property Stats */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 transform hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Property Overview</h2>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                      {[
                        { icon: Bed, value: property.bedrooms, label: 'Bedrooms', color: 'text-blue-600' },
                        { icon: Bath, value: property.bathrooms, label: 'Bathrooms', color: 'text-green-600' },
                        { icon: Maximize, value: property.area.toLocaleString(), label: 'Sq M', color: 'text-purple-600' },
                        { icon: TreePine, value: property.lotSize, label: 'Acres', color: 'text-orange-600' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center group transform hover:scale-110 transition-all duration-300">
                          <stat.icon className={`mx-auto mb-3 h-10 w-10 ${stat.color} group-hover:animate-bounce`} />
                          <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                          <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Description */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 transform hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 flex items-center">
                      <Home className="mr-3 h-6 w-6 text-blue-600" />
                      About This Property
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {property.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Features */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 transform hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 flex items-center">
                      <Star className="mr-3 h-6 w-6 text-yellow-500" />
                      Premium Features
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {property.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-300">
                          <div className="mr-4 h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mt-2 group-hover:animate-pulse"></div>
                          <span className="text-gray-700 group-hover:text-gray-900 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Amenities */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 transform hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 flex items-center">
                      <Building className="mr-3 h-6 w-6 text-orange-600" />
                      Community Amenities
                    </h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {[
                        { icon: Wifi, name: 'High-Speed Internet' },
                        { icon: CarIcon, name: 'Parking' },
                        { icon: SwimmingPool, name: 'Swimming Pool' },
                        { icon: Shield, name: '24/7 Security' },
                        { icon: Zap, name: 'Backup Power' },
                        { icon: TreePine, name: 'Landscaped Gardens' }
                      ].map((amenity, index) => (
                        <div key={index} className="flex items-center p-3 bg-white/50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105">
                          <amenity.icon className="mr-3 h-5 w-5 text-orange-600" />
                          <span className="text-gray-700 font-medium text-sm">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Property Details Table */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 transform hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Property Details</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        { label: 'Property Type', value: property.type },
                        { label: 'Year Built', value: property.yearBuilt },
                        { label: 'Lot Size', value: `${property.lotSize} acres` },
                        { label: 'Status', value: property.status },
                        { label: 'Bedrooms', value: property.bedrooms },
                        { label: 'Bathrooms', value: property.bathrooms }
                      ].map((detail, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <p className="text-sm text-gray-600 mb-1">{detail.label}</p>
                          <p className="font-semibold text-gray-900">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Enhanced Agent Card */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 top-6 transform hover:scale-[1.02] duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Contact Agent</h3>
                    
                    <div className="mb-6 flex items-center">
                      <div className="relative">
                        <img
                          src={property.agent.image}
                          alt={property.agent.name}
                          className="mr-4 h-16 w-16 rounded-full object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{property.agent.name}</h4>
                        <p className="text-sm text-gray-600">{property.agent.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-xs text-gray-600">5.0 (127 reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a href={`tel:${property.agent.phone}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                          <PhoneCall className="mr-2 h-4 w-4" />
                          Call {property.agent.phone}
                        </Button>
                      </a>
                      
                      <a 
                        href={`https://wa.me/254${property.agent.phone.slice(1)}?text=Hi, I'm interested in the property: ${property.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp
                        </Button>
                      </a>
                      
                      <a href={`mailto:${property.agent.email}?subject=Inquiry about ${property.title}`} className="block">
                        <Button variant="outline" className="w-full border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </Button>
                      </a>
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Response Time</p>
                      <p className="font-semibold text-green-600">Usually within 1 hour</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Mortgage Calculator */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 transform hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-bold text-xl text-gray-900 flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-green-600" />
                      Mortgage Calculator
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Amount (KES)
                        </label>
                        <input
                          type="number"
                          value={mortgagePrincipal}
                          onChange={(e) => setMortgagePrincipal(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interest Rate (% per year)
                        </label>
                        <input
                          type="number"
                          value={mortgageInterestRate}
                          onChange={(e) => setMortgageInterestRate(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          step="0.1"
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Term (Years)
                        </label>
                        <input
                          type="number"
                          value={mortgageLoanTerm}
                          onChange={(e) => setMortgageLoanTerm(Number(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          min="1"
                        />
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          {formatPrice(Math.round(monthlyMortgagePayment))}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          *Principal and interest only
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full transform hover:scale-105 transition-all duration-300">
                        Get Pre-Approved
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <PropertyQuickActions property={property} />

                {/* Trust Badges */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-yellow-50 transform hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-4 font-bold text-lg text-gray-900">Why Choose Us?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center">
                        <Shield className="mr-2 h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">100% Verified Properties</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Award className="mr-2 h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">Award-Winning Service</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="mr-2 h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium">1000+ Happy Clients</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Map Section */}
        {property.id === 'heritage-villas-ngong' && (
          <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Location</h2>
                <p className="text-lg text-gray-600">Explore the neighborhood and nearby amenities</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.3420990810407!2d36.67286523063698!3d-1.3661591034223453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f03766481ad61%3A0x552e8a8bb94e5ff7!2sHeritage%20Villas%2C%20Ngong%2046!5e0!3m2!1sen!2ske!4v1748959191473!5m2!1sen!2ske"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          </section>
        )}

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-red-600 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make This Your Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't miss out on this incredible opportunity. Contact us today to schedule a viewing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${property.agent.phone}`}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now - {property.agent.phone}
                </Button>
              </a>
              <a 
                href={`https://wa.me/254${property.agent.phone.slice(1)}?text=Hi, I want to schedule a viewing for ${property.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Schedule Viewing
                </Button>
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}