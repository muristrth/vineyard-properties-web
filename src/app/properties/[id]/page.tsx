'use client';

import React from 'react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  ChevronRight,
  Calculator, // Added for calculator icons
  DollarSign, // Added for financial icons
  TrendingUp,
  XCircle, // Added for ROI
} from 'lucide-react';
import Link from 'next/link';

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
const propertyData: Record<string, Property> = {
  // Changed `any` to `Property`
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
    'Minutes from Nairobi’s CBD and SGR station',
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
  
  virtualTour: true, // Set to true for demonstration
  featured: true,

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
    lotSize: 0.125, // Assuming 1/8th acre for a typical plot
    yearBuilt: 0, // Not applicable for a plot
    images: [
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
  },
  'pauline-mwaura-kitengela': {
    id: 'pauline-mwaura-kitengela',
    title: 'Prime Plot for Sale in Kitengela',
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
  },
  'lawrence-mugambi-kitengela': {
    id: 'lawrence-mugambi-kitengela',
    title: 'Well-Located Plot in Kitengela',
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
    '/p/20180630_140800.jpg',
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
    lotSize: 0.25, // Assuming this might be a quarter acre given the higher price
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
    lotSize: 0.25, // Assuming two plots, so quarter acre
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
  },
  'githagia-maina-kitengela': {
    id: 'githagia-maina-kitengela',
    title: 'Well-Located Plot in Kitengela (Behind New Light)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    type: 'Land',
    status: '0722611353', // This seems to be a phone number, assuming it means "available" or "contact for details"
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
      phone: '0729170156', // Assuming this is the agent's number if not the status
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
  },
  'hilda-joska-kantafu-road': {
    id: 'hilda-joska-kantafu-road',
    title: 'Large Farm Land (1.74 Acres) Joska-Kantafu Road',
    location: 'Joska, Kangundo Road, Machakos County, Kenya',
    price: 3000000,
    type: 'Land',
    status: '0722760529', // Assuming this is a phone number for direct contact
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 1.74, // In acres
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
      phone: '0729170156', // Assuming this is the agent's number if not the status
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
  },
  'njeru-ngai-kantafu': {
    id: 'njeru-ngai-kantafu',
    title: 'Residential Plots in Kantafu (Plots 13 & 14)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 1100000,
    type: 'Land',
    status: '0722455100', // Assuming this is a phone number
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 0.25, // Assuming two plots make a quarter acre
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
      phone: '0729170156', // Assuming this is the agent's number if not the status
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: true,
  },
  'pauline-mwaura-kantafu': {
    id: 'pauline-mwaura-kantafu',
    title: 'Developing Plot in Kantafu (Plot 40)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 700000,
    type: 'Land',
    status: '0722234859', // Assuming this is a phone number
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
      phone: '0729170156', // Assuming this is the agent's number if not the status
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
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
    lotSize: 0.25, // Assuming two plots
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
    "virtualTour": true, // Set to true for demonstration
    "featured": true
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
      'Windsor Villas is a new development of 4 elegant houses on approximately 2 acres of land located on Mushroom road. On offer is villas sitting on half an acre in leafy Kiambu popular for it’s sought after views and serene country living. Nearby social amenities include the Ciata Mall, The Paradise Lost, and Windsor Golf Club.',
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
      'Wine cellar', // Added for demo
      'Elevator', // Added for demo
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
  },
  'karen-mansion': {
    id: 'karen-mansion',
    title: '13bdrm Mansion in Mayeast Road',
    location: 'Nairobi, Karen',
    price: 400000000,
    originalPrice: 450000000,
    type: 'Luxury Mansion',
    status: 'For Rent',
    bedrooms: 13,
    bathrooms: 8,
    area: 8000,
    lotSize: 2,
    yearBuilt: 2012,
    images: [
      'https://ext.same-assets.com/2880436944/312339966.jpeg',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
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
  },
  'redhill-land': {
    id: 'redhill-land',
    title: '7.9 acres vacant land for sale in Redhill',
    location: 'Nairobi, Redhill',
    price: 750000000,
    type: 'Residential Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 7.9,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/3634728786/3300708784.jpeg',
      'https://ext.same-assets.com/3634728786/2893186496.jpeg',
      'https://ext.same-assets.com/3634728786/3348063986.jpeg',
    ],
    description:
      'Discover a rare opportunity to own 7.9 acres of pristine land in the highly sought-after Rosslyn neighborhood. Nestled close to the road, this expansive property offers unparalleled convenience with seamless access to major roads.',
    features: [
      '7.9 acres',
      'Rosslyn neighborhood',
      'Close to road',
      'Major road access',
      'Pristine land',
      'Development potential',
      'Convenient location',
      'Clear title',
      'All utilities nearby',
      'Investment opportunity',
    ],
    amenities: [
      'Prime Location',
      'Road Access',
      'Development Ready',
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
  },
  'muthaiga-5bedroom': {
    id: 'muthaiga-5bedroom',
    title: '5 bedroom house for sale in Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 600000000,
    type: 'Luxury House',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 542,
    lotSize: 2.8,
    yearBuilt: 2014,
    images: [
      'https://ext.same-assets.com/3634728786/3519000104.jpeg',
      'https://ext.same-assets.com/3634728786/4125891741.jpeg',
      'https://ext.same-assets.com/3634728786/4032461120.jpeg',
    ],
    description:
      'Introducing a captivating masterpiece nestled within Muthaiga, this lovely 5-bedroom house sits majestically on 2.8 acres of sheer bliss. Boasting bedrooms that offer a harmonious blend of comfort and luxury, this enchanting home provides an idyllic retreat.',
    features: [
      '5 bedrooms',
      '4 bathrooms',
      '2.8 acres',
      'Muthaiga location',
      'Swimming pool',
      'Beautiful gardens',
      'Staff quarters',
      'Security system',
      'Generator backup',
      'Luxury finishes',
    ],
    amenities: [
      'Swimming Pool',
      'Large Grounds',
      'Muthaiga Location',
      'Luxury Features',
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
  },
  'karen-9acres': {
    id: 'karen-9acres',
    title: '9 acres vacant land for sale in Karen',
    location: 'Nairobi, Karen',
    price: 540000000,
    type: 'Residential Land',
    status: 'Under Offer',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 9,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/3634728786/204887299.jpeg',
      'https://ext.same-assets.com/3634728786/3303940439.jpeg',
      'https://ext.same-assets.com/3634728786/3143503855.jpeg',
    ],
    description:
      'Discover this exceptional 9-acre parcel of land, perfectly positioned for redevelopment. Strategically located along a main road, this property offers unmatched visibility, accessibility, and versatility.',
    features: [
      '9 acres',
      'Karen location',
      'Main road frontage',
      'Redevelopment potential',
      'High visibility',
      'Excellent access',
      'Strategic location',
      'Investment grade',
      'Clear title',
      'All utilities',
    ],
    amenities: [
      'Road Frontage',
      'Karen Location',
      'High Visibility',
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
    featured: true,
  },
  'kikambala-beach': {
    id: 'kikambala-beach',
    title: '15 acres vacant land for sale in Kikambala',
    location: 'Kilifi, Kikambala',
    price: 420000000,
    type: 'Beach Land',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    lotSize: 15,
    yearBuilt: 0,
    images: [
      'https://ext.same-assets.com/3634728786/1077470987.jpeg',
      'https://ext.same-assets.com/3634728786/479723351.jpeg',
      'https://ext.same-assets.com/3634728786/4241474228.jpeg',
    ],
    description:
      'Discover an unparalleled opportunity with this 15-acre parcel of land on the stunning Kikambala Beach. Boasting expansive beachfrontage and pristine white sandy beaches, this property offers breathtaking views of the Indian Ocean.',
    features: [
      '15 acres beachfront',
      'Kikambala Beach',
      'White sandy beach',
      'Indian Ocean views',
      'Beach frontage',
      'Tourism potential',
      'Development opportunity',
      'Clear title',
      'Strategic location',
      'Investment grade',
    ],
    amenities: [
      'Beach Frontage',
      'Ocean Views',
      'Tourism Potential',
      'Prime Location',
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
  },
  'kileleshwa-apartment': {
    id: 'kileleshwa-apartment',
    title: '3 bedroom apartment for sale in Kileleshwa',
    location: 'Nairobi, Kileleshwa',
    price: 18000000,
    type: 'Apartment',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    lotSize: 0,
    yearBuilt: 2020,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Modern 3-bedroom apartment in the heart of Kileleshwa. Spacious living areas with contemporary finishes and excellent amenities.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      'Modern kitchen',
      'Balcony',
      'Parking space',
      'Swimming pool',
      'Gym',
      'Security',
      'Lift access',
      'Generator backup',
    ],
    amenities: ['Swimming Pool', 'Gym', 'Security', 'Lift Access'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
  },
  'runda-townhouse': {
    id: 'runda-townhouse',
    title: '4 bedroom townhouse for sale in Runda',
    location: 'Nairobi, Runda',
    price: 45000000,
    type: 'Townhouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    lotSize: 0.125,
    yearBuilt: 2019,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Elegant 4-bedroom townhouse in prestigious Runda estate. Modern design with beautiful finishes and access to estate amenities.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      'Double garage',
      'Private garden',
      'Modern kitchen',
      'Swimming pool',
      'Club house',
      'Security',
      'Generator',
      'Water backup',
    ],
    amenities: ['Swimming Pool', 'Club House', 'Security', 'Runda Estate'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
  },
  'westgate-mall-shop': {
    id: 'westgate-mall-shop',
    title: 'Retail shop for sale at Westgate Mall',
    location: 'Nairobi, Westlands',
    price: 25000000,
    type: 'Commercial Retail',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    lotSize: 0,
    yearBuilt: 2013,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Prime retail space at Westgate Mall. High foot traffic location perfect for retail business with excellent visibility.',
    features: [
      '85 sqm retail space',
      'Westgate Mall',
      'High foot traffic',
      'Prime location',
      'AC installed',
      'Parking available',
      'Security',
      'Mall amenities',
      'Investment opportunity',
      'Rental potential',
    ],
    amenities: ['Mall Location', 'High Traffic', 'Security', 'Parking'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: false,
    featured: false,
  },
  'nyali-beachfront': {
    id: 'nyali-beachfront',
    title: '5 bedroom beachfront villa in Nyali',
    location: 'Mombasa, Nyali',
    price: 180000000,
    type: 'Beach Villa',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    lotSize: 0.5,
    yearBuilt: 2017,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Spectacular 5-bedroom beachfront villa in Nyali with direct beach access. Perfect for luxury living or holiday home investment.',
    features: [
      '5 bedrooms',
      '4 bathrooms',
      'Beachfront location',
      'Swimming pool',
      'Direct beach access',
      'Ocean views',
      'Mature gardens',
      'Staff quarters',
      'Generator',
      'Security',
    ],
    amenities: ['Beach Access', 'Ocean Views', 'Swimming Pool', 'Security'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
  },
  'nakuru-farm': {
    id: 'nakuru-farm',
    title: '200 acres dairy farm for sale in Nakuru',
    location: 'Nakuru, Nakuru County',
    price: 150000000,
    type: 'Dairy Farm',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    lotSize: 200,
    yearBuilt: 2010,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Fully operational 200-acre dairy farm in Nakuru County. Includes farmhouse, dairy facilities, and excellent water sources.',
    features: [
      '200 acres',
      'Dairy facilities',
      'Farmhouse',
      'Water sources',
      'Fertile land',
      'Good climate',
      'Access roads',
      'Electricity',
      'Staff quarters',
      'Equipment included',
    ],
    amenities: [
      'Dairy Facilities',
      'Water Sources',
      'Agricultural Land',
      'Infrastructure',
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
  },
  'thika-factory': {
    id: 'thika-factory',
    title: 'Manufacturing factory for sale in Thika',
    location: 'Kiambu, Thika',
    price: 800000000,
    type: 'Industrial Factory',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    lotSize: 2,
    yearBuilt: 2005,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Fully equipped manufacturing factory in Thika Industrial area. Includes machinery, offices, and all necessary infrastructure.',
    features: [
      '5000 sqm factory',
      '2 acres land',
      'Manufacturing equipment',
      'Office spaces',
      'Power backup',
      'Water treatment',
      'Security',
      'Access roads',
      'Railway access',
      'Investment opportunity',
    ],
    amenities: [
      'Manufacturing Setup',
      'Industrial Zone',
      'Infrastructure',
      'Railway Access',
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
  },
  'gigiri-penthouse': {
    id: 'gigiri-penthouse',
    title: 'Luxury penthouse for sale in Gigiri',
    location: 'Nairobi, Gigiri',
    price: 85000000,
    type: 'Penthouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    lotSize: 0,
    yearBuilt: 2021,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Stunning luxury penthouse in Gigiri with panoramic city views. Premium finishes and exclusive amenities in diplomatic zone.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      'Panoramic views',
      'Terrace garden',
      'Swimming pool',
      'Gym',
      'Concierge',
      'Parking bays',
      'Generator backup',
    ],
    amenities: ['City Views', 'Swimming Pool', 'Gym', 'Concierge Service'],
    agent: {
      name: 'Mark James',
      title: 'Senior Property Agent',
      phone: '0729170156',
      email: 'mark.muriithi@vineyardproperties.co.ke',
      image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    },
    virtualTour: true,
    featured: true,
  },
  'eldoret-maisonette': {
    id: 'eldoret-maisonette',
    title: '4 bedroom maisonette for sale in Eldoret',
    location: 'Uasin Gishu, Eldoret',
    price: 12000000,
    type: 'Maisonette',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    lotSize: 0.125,
    yearBuilt: 2018,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Modern 4-bedroom maisonette in Eldoret town. Well-designed family home with spacious rooms and modern amenities.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      'Modern design',
      'Spacious rooms',
      'Parking space',
      'Garden area',
      'Security',
      'Water backup',
      'Quality finishes',
      'Good neighborhood',
    ],
    amenities: [
      'Modern Design',
      'Security',
      'Garden Space',
      'Quality Finishes',
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
  },
  'nanyuki-cottage': {
    id: 'nanyuki-cottage',
    title: 'Mountain cottage for sale in Nanyuki',
    location: 'Laikipia, Nanyuki',
    price: 35000000,
    type: 'Cottage',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    lotSize: 1,
    yearBuilt: 2016,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Charming mountain cottage in Nanyuki with stunning views of Mount Kenya. Perfect retreat with rustic charm and modern amenities.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      'Mountain views',
      '1 acre land',
      'Fireplace',
      'Mature gardens',
      'Staff quarters',
      'Water sources',
      'Generator',
      'Peaceful location',
    ],
    amenities: [
      'Mountain Views',
      'Large Grounds',
      'Peaceful Location',
      'Natural Setting',
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
  },
  'kisumu-commercial': {
    id: 'kisumu-commercial',
    title: 'Commercial building for sale in Kisumu CBD',
    location: 'Kisumu, Kisumu Central',
    price: 120000000,
    type: 'Commercial Building',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 6,
    area: 1200,
    lotSize: 0.125,
    yearBuilt: 2012,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      '5-storey commercial building in Kisumu CBD. Excellent rental income with prime location and high occupancy rates.',
    features: [
      '5 storeys',
      '1200 sqm total',
      'CBD location',
      'High occupancy',
      'Rental income',
      'Lift access',
      'Parking available',
      'Generator backup',
      'Investment grade',
      'Lake proximity',
    ],
    amenities: [
      'CBD Location',
      'Rental Income',
      'Lift Access',
      'Lake Proximity',
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
  },
  'machakos-villa': {
    id: 'machakos-villa',
    title: 'Executive villa for sale in Machakos',
    location: 'Machakos, Machakos Town',
    price: 28000000,
    type: 'Executive Villa',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    lotSize: 0.25,
    yearBuilt: 2019,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Executive 4-bedroom villa in Machakos town. Modern design with spacious living areas and beautiful landscaping.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      'Executive design',
      'Spacious living',
      'Modern kitchen',
      'Beautiful landscaping',
      'Security',
      'Water backup',
      'Generator ready',
      'Good neighborhood',
    ],
    amenities: [
      'Executive Design',
      'Beautiful Landscaping',
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
    featured: false,
  },
  'meru-mansion': {
    id: 'meru-mansion',
    title: '6 bedroom mansion for sale in Meru',
    location: 'Meru, Meru County',
    price: 65000000,
    type: 'Mansion',
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 5,
    area: 500,
    lotSize: 1.5,
    yearBuilt: 2015,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Magnificent 6-bedroom mansion in Meru with panoramic views. Luxury family home with extensive grounds and premium finishes.',
    features: [
      '6 bedrooms',
      '5 bathrooms',
      'Panoramic views',
      '1.5 acres',
      'Swimming pool',
      'Staff quarters',
      'Generator',
      'Security system',
      'Beautiful gardens',
      'Premium finishes',
    ],
    amenities: [
      'Swimming Pool',
      'Panoramic Views',
      'Large Grounds',
      'Premium Features',
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
  },
  'malindi-beach-house': {
    id: 'malindi-beach-house',
    title: 'Beach house for sale in Malindi',
    location: 'Kilifi, Malindi',
    price: 95000000,
    type: 'Beach House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    lotSize: 0.5,
    yearBuilt: 2018,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Stunning beach house in Malindi with direct beach access. Perfect for holiday home or rental investment with ocean views.',
    features: [
      '4 bedrooms',
      '3 bathrooms',
      'Beach access',
      'Ocean views',
      'Swimming pool',
      'Tropical gardens',
      'Staff quarters',
      'Security',
      'Rental potential',
      'Tourism location',
    ],
    amenities: [
      'Beach Access',
      'Ocean Views',
      'Swimming Pool',
      'Tourism Location',
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
  },
  'naivasha-resort': {
    id: 'naivasha-resort',
    title: 'Lakefront resort for sale in Naivasha',
    location: 'Nakuru, Naivasha',
    price: 500000000,
    type: 'Resort Property',
    status: 'For Sale',
    bedrooms: 20,
    bathrooms: 25,
    area: 2000,
    lotSize: 5,
    yearBuilt: 2008,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Established lakefront resort in Naivasha with 20 rooms and extensive facilities. Prime tourism investment opportunity.',
    features: [
      '20 guest rooms',
      'Lakefront location',
      'Restaurant facilities',
      'Conference halls',
      'Swimming pool',
      '5 acres land',
      'Tourism license',
      'Staff accommodation',
      'Boat landing',
      'Investment opportunity',
    ],
    amenities: [
      'Lakefront Location',
      'Tourism Facilities',
      'Conference Facilities',
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
  },
  'rongai-bungalow': {
    id: 'rongai-bungalow',
    title: '3 bedroom bungalow for sale in Rongai',
    location: 'Kajiado, Rongai',
    price: 8500000,
    type: 'Bungalow',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    lotSize: 0.125,
    yearBuilt: 2020,
    images: [
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
      '/* Image placeholder - add your image here */',
    ],
    description:
      'Affordable 3-bedroom bungalow in Rongai. Perfect starter home with modern amenities and good transport connections.',
    features: [
      '3 bedrooms',
      '2 bathrooms',
      'Modern amenities',
      'Good transport',
      'Affordable pricing',
      'Garden space',
      'Parking',
      'Security',
      'Water backup',
      'Ready to move',
    ],
    amenities: [
      'Affordable Housing',
      'Transport Links',
      'Modern Amenities',
      'Garden Space',
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
  },

  'futuristic-haven': {
    id: 'futuristic-haven',
    title: 'Futuristic Haven',
    location: 'Palm Springs, CA 92262',
    price: 4750000,
    type: 'Modern Architecture',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 2800,
    lotSize: 1.2,
    yearBuilt: 2024,
    images: [
      'https://ext.same-assets.com/2009473017/1082928151.svg',
      'https://ext.same-assets.com/2009473017/299352832.jpeg',
      'https://ext.same-assets.com/2009473017/923357109.jpeg',
    ],
    description:
      'A masterpiece of modern architecture featuring cutting-edge design and sustainable living. This futuristic haven represents the pinnacle of luxury living with smart home integration, energy-efficient systems, and breathtaking desert views.',
    features: [
      'Smart home automation',
      'Solar energy system',
      'Infinity pool',
      'Home theater',
      'Wine cellar',
      'Elevator',
      'Security system',
      'Landscaped gardens',
    ],
    amenities: [
      'Private Pool',
      'Mountain Views',
      'Desert Landscape',
      'Privacy',
      'Luxury Finishes',
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
  },
};

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params && 'id' in params ? (params.id as string) : '';
  const property = propertyData[propertyId];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  // Mortgage Calculator States
  const [mortgagePrincipal, setMortgagePrincipal] = useState(property ? property.price : 0);
  const [mortgageInterestRate, setMortgageInterestRate] = useState(7); // Annual interest rate in %
  const [mortgageLoanTerm, setMortgageLoanTerm] = useState(30); // Loan term in years
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(0);

  // Property Valuation States
  const [valuationInputPrice, setValuationInputPrice] = useState(property ? property.price : 0);
  const [valuationResult, setValuationResult] = useState<number | null>(null);

  // Investment ROI Calculator States
  const [roiInvestmentCost, setRoiInvestmentCost] = useState(property ? property.price : 0);
  const [roiAnnualReturn, setRoiAnnualReturn] = useState(0); // Expected annual return
  const [roiResult, setRoiResult] = useState<number | null>(null);

  // Calculate initial mortgage payment on load
  React.useEffect(() => {
    if (property) {
      setMortgagePrincipal(property.price);
      calculateMortgagePayment(property.price, mortgageInterestRate, mortgageLoanTerm);
    }
  }, [property, mortgageInterestRate, mortgageLoanTerm]); // Recalculate if these change

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Property Not Found
          </h1>
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
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  // Mortgage Calculator Logic
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

  // Property Valuation Logic (Simplified/Simulated)
  const handleValuationCalculate = () => {
    if (valuationInputPrice <= 0) {
      setValuationResult(null);
      return;
    }
    // Simulate a valuation: e.g., +/- 10% of input price
    const randomFactor = (Math.random() * 0.2) - 0.1; // -0.1 to +0.1
    const estimatedValue = valuationInputPrice * (1 + randomFactor);
    setValuationResult(Math.round(estimatedValue));
  };

  // Investment ROI Logic
  const handleROICalculate = () => {
    if (roiInvestmentCost <= 0) {
      setRoiResult(null);
      return;
    }
    const roi = (roiAnnualReturn / roiInvestmentCost) * 100;
    setRoiResult(roi);
  };


  return (
    <div className="min-h-screen">
      <Header />

      {/* Back Button */}
      <div className="border-b bg-white pb-4 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Property Gallery */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-96 overflow-hidden rounded-2xl bg-gray-100 lg:h-[500px]">
                {/* Conditional rendering for Virtual Tour */}
                {showVirtualTour && property.virtualTour ? (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        {/* Placeholder for actual virtual tour embed */}
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Example YouTube embed, replace with actual tour
                            title="Virtual Property Tour"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                        <Button
                            onClick={() => setShowVirtualTour(false)}
                            className="absolute top-4 right-4 bg-white text-gray-800 hover:bg-gray-100"
                        >
                            <XCircle className="h-5 w-5 mr-2" /> Close Tour
                        </Button>
                    </div>
                ) : (
                    <img
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        className="h-full w-full object-cover"
                    />
                )}


                {/* Image Navigation (only if not showing virtual tour) */}
                {!showVirtualTour && property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/80 shadow-lg transition-colors hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/80 shadow-lg transition-colors hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter (only if not showing virtual tour) */}
                {!showVirtualTour && (
                    <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                        {currentImageIndex + 1} / {property.images.length}
                    </div>
                )}


                {/* Actions */}
                <div className="absolute right-4 top-4 flex space-x-2">
                  {property.virtualTour && !showVirtualTour && ( // Only show if virtual tour exists and not currently showing
                    <Button
                      onClick={() => setShowVirtualTour(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Virtual Tour
                    </Button>
                  )}
                  {!showVirtualTour && ( // Only show if not showing virtual tour
                    <Button variant="secondary" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      {property.images.length} Photos
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 lg:grid-cols-1">
                {property.images
                  .slice(0, 4)
                  .map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 overflow-hidden rounded-lg lg:h-24 ${
                        currentImageIndex === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {property.images.length > 4 && index === 3 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
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
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Header */}
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <Badge className="bg-primary text-white">
                    {property.status}
                  </Badge>
                  <Badge variant="secondary">{property.type}</Badge>
                  {property.featured && (
                    <Badge
                      variant="outline"
                      className="border-yellow-400 text-yellow-600"
                    >
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="mb-2 font-radio-canada text-4xl font-bold text-gray-900">
                  {property.title}
                </h1>

                <div className="mb-6 flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="font-radio-canada text-4xl font-bold text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                  {property.originalPrice &&
                    property.originalPrice > property.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(property.originalPrice)}
                      </span>
                    )}
                </div>
              </div>

              {/* Property Stats */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="text-center">
                      <Bed className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-2xl font-bold text-gray-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-gray-600">Bedrooms</p>
                    </div>
                    <div className="text-center">
                      <Bath className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-2xl font-bold text-gray-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-gray-600">Bathrooms</p>
                    </div>
                    <div className="text-center">
                      <Maximize className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-2xl font-bold text-gray-900">
                        {property.area.toLocaleString()}
                      </p>
                      <p className="text-gray-600">Sq Ft</p>
                    </div>
                    <div className="text-center">
                      <Car className="mx-auto mb-2 h-8 w-8 text-primary" />
                      <p className="text-2xl font-bold text-gray-900">
                        {property.lotSize}
                      </p>
                      <p className="text-gray-600">Acres</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
                    About This Property
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
                    Property Features
                  </h2>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {property.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-3 h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-1 text-gray-600">Year Built</p>
                      <p className="font-semibold">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-gray-600">Property Type</p>
                      <p className="font-semibold">{property.type}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-gray-600">Lot Size</p>
                      <p className="font-semibold">{property.lotSize} acres</p>
                    </div>
                    <div>
                      <p className="mb-1 text-gray-600">Status</p>
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
                  <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900">
                    Contact Agent
                  </h3>

                  <div className="mb-4 flex items-center">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="mr-4 h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {property.agent.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {property.agent.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone className="mr-2 h-4 w-4" />
                      Call {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {/* Schedule Viewing */}
                    <a href="tel:0729170156" className="block">
                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Viewing
                      </Button>
                    </a>

                    {/* Save Property via WhatsApp */}
                    <a
                      href="https://wa.me/254729170156?text=I'm%20interested%20in%20this%20property%20you%20listed."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Save Property
                      </Button>
                    </a>

                    {/* Share Property */}
                    <a
                      href={typeof window !== 'undefined' ? window.location.href : '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        if (navigator.share) {
                          navigator
                            .share({
                              title: 'Check out this property!',
                              url: window.location.href,
                            })
                            .catch((error) => console.log('Share failed:', error));
                        } else {
                          // fallback: copy to clipboard
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }
                      }}
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        <Share className="mr-2 h-4 w-4" />
                        Share Property
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Mortgage Calculator (Enhanced) */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900 flex items-center">
                    <Calculator className="mr-2 h-5 w-5 text-primary" /> Mortgage Calculator
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount (KES)
                      </label>
                      <input
                        type="number"
                        id="principal"
                        value={mortgagePrincipal}
                        onChange={(e) => {
                            setMortgagePrincipal(Number(e.target.value));
                            calculateMortgagePayment(Number(e.target.value), mortgageInterestRate, mortgageLoanTerm);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        id="interestRate"
                        value={mortgageInterestRate}
                        onChange={(e) => {
                            setMortgageInterestRate(Number(e.target.value));
                            calculateMortgagePayment(mortgagePrincipal, Number(e.target.value), mortgageLoanTerm);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Term (Years)
                      </label>
                      <input
                        type="number"
                        id="loanTerm"
                        value={mortgageLoanTerm}
                        onChange={(e) => {
                            setMortgageLoanTerm(Number(e.target.value));
                            calculateMortgagePayment(mortgagePrincipal, mortgageInterestRate, Number(e.target.value));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        min="1"
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-gray-600">Estimated Monthly Payment</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(Math.round(monthlyMortgagePayment))}
                      </p>
                      <p className="text-xs text-gray-500">
                        *Calculated based on provided inputs.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Get Pre-Approved
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Valuation Tool */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900 flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" /> Property Valuation Tool
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="valuationPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Property Price (KES)
                      </label>
                      <input
                        type="number"
                        id="valuationPrice"
                        value={valuationInputPrice}
                        onChange={(e) => setValuationInputPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        min="0"
                      />
                    </div>
                    <Button onClick={handleValuationCalculate} className="w-full bg-primary hover:bg-primary/90">
                      Calculate Estimated Value
                    </Button>
                    {valuationResult !== null && (
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Estimated Property Value</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(valuationResult)}
                        </p>
                        <p className="text-xs text-gray-500">
                          *This is an estimate and not a professional appraisal.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Investment ROI Calculator */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Investment ROI Calculator
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="investmentCost" className="block text-sm font-medium text-gray-700 mb-1">
                        Total Investment Cost (KES)
                      </label>
                      <input
                        type="number"
                        id="investmentCost"
                        value={roiInvestmentCost}
                        onChange={(e) => setRoiInvestmentCost(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="annualReturn" className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Annual Return (KES)
                      </label>
                      <input
                        type="number"
                        id="annualReturn"
                        value={roiAnnualReturn}
                        onChange={(e) => setRoiAnnualReturn(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        min="0"
                      />
                    </div>
                    <Button onClick={handleROICalculate} className="w-full bg-primary hover:bg-primary/90">
                      Calculate ROI
                    </Button>
                    {roiResult !== null && (
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Estimated Annual ROI</p>
                        <p className="text-2xl font-bold text-primary">
                          {roiResult.toFixed(2)}%
                        </p>
                        <p className="text-xs text-gray-500">
                          *Return on Investment based on provided figures.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
      {property.id === 'heritage-villas-ngong' && (
        <div className="my-6 w-full max-w-4xl mx-auto">
          <h2 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
            Visit this Property on Google Maps

          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.3420990810407!2d36.67286523063698!3d-1.3661591034223453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f03766481ad61%3A0x552e8a8bb94e5ff7!2sHeritage%20Villas%2C%20Ngong%2046!5e0!3m2!1sen!2ske!4v1748959191473!5m2!1sen!2ske"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-md"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
