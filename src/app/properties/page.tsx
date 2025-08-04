'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, MapPin, Phone, Eye, ArrowRight, Star, Users, Award, ChevronDown, Play, Camera, Bed, Bath, Square, X } from 'lucide-react';
const allProperties = [

  {
    id: 'panari-hotel',
    title: '5 STAR HOTEL FOR SALE: THE PANARI HOTEL',
    location: 'Mombasa Road, Nairobi',
    price: 3500000000,
    image: '/p40 ph/1.jpg',
    bedrooms: 136,
    bathrooms: 200,
    area: 9000,
    type: 'Hotel',
    featured: true,
  },
    
  {
    id: 'carol-wangan-nguthi-kitengela',
    title: 'Old Namanga Plot for Sale in Kitengela Phase 11,Chief Mutonkei',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 750000,
    image: 'https://i.roamcdn.net/prop/brk/listing-thumb-400w/08ad908aa8bb4740ee829379cf70ded5/-/prod-property-core-backend-media-brk/7612881/abf7c089-79a0-483f-80d4-dbe90d72fb6f.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'Thorngroove-Kitengela',
    title: 'Thorngroove 1/8 Acre Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    image: 'https://i.roamcdn.net/prop/brk/listing-thumb-400w/ae9159b02748a236a3d049c2900f73ab/-/prod-property-core-backend-media-brk/7615572/94b19998-895d-4e50-87c0-fd50e00036ac.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: '1/8 Acre Plot in Epz Tank, Kitengela',
    title: '1/8 Acre Plot in Epz Tank, Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    image: 'https://i0.wp.com/kimisituinvestment.co.ke/wp-content/uploads/2021/06/DJI_0349-scaled.jpg?fit=2560%2C1440&ssl=1',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'solomon-ndungu-kitengela',
    title: 'Affordable Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    image: '/p kite 11/Screenshot 2024-02-12 090327.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'omulindi-mukoto-kitengela',
    title: 'Plot in Developing Area of Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 750000,
    image: '/p kite 11/Screenshot 2024-02-12 090336.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'mary-mutembei-kitengela',
    title: 'Prime Plot in Kitengela near amenities',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    image: '/p kite 11/Screenshot 2024-02-12 090519.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'lukenya-plot',
    title: 'Buy and Build Plot in Lukenya-Muthwani, Kagundo Road, Koma',
    location: 'Lukenya-Muthwani, Koma, Kagundo Road, Machakos County, Kenya',
    price: 380000,
    image: '/p kite 11/Screenshot 2024-02-12 090519.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'peter-ngunyi-kitengela',
    title: 'Strategic Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    image: '/p kite 11/Screenshot 2024-02-12 090510.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'robert-nyaroo-joska',
    title: 'Residential Plot for Sale in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 800000,
    image: '/p11 joska/20180630_140804.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'peter-ngobu-kantafu',
    title: 'Developing Plot in Kantafu',
    location: 'Kantafu, Machakos County, Kenya',
    price: 1200000,
    image: '/p/20180630_140800.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'frank-ombongi-kantafu',
    title: 'Plot with Potential in Kantafu',
    location: 'Kantafu, Machakos County, Kenya',
    price: 700000,
    image: '/p/20180630_140804.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'nancy-njambi-kitengela',
    title: 'Prime Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1000000,
    image: '/p/20180630_140808.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'teresia-magiri-kantafu',
    title: 'Spacious Plots in Kantafu (Plots 6 & 7)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 650000,
    image: '/p/20180630_140812.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'catherine-wairimu-kitengela',
    title: 'Commercial/Residential Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    image: '/p/20180630_144535.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'teresia-njeri-maina-kitengela',
    title: '1/8 Acre Plot in Kitengela (Behind New Light)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 950000,
    image: '/p/20180630_144546.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'githagia-maina-kitengela',
    title: 'Well-Located Plot in Kitengela (Behind New Light)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    image: '/p/20180630_144551.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'hilda-joska-kantafu-road',
    title: 'Large Farm Land (1.74 Acres) Joska-Kantafu Road',
    location: 'Joska, Kangundo Road, Machakos County, Kenya',
    price: 3000000,
    image: '/p11 joska/20180630_140804.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'njeru-ngai-kantafu',
    title: 'Residential Plots in Kantafu (Plots 13 & 14)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 1100000,
    image: '/p11 joska/20180630_140804.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'pauline-mwaura-kantafu',
    title: 'Developing Plot in Kantafu (Plot 40)',
    location: 'Kantafu, Machakos County, Kenya',
    price: 700000,
    image: 'p27 utawala/20181027_153442.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'kauriki-waihenya-joska',
    title: 'Residential Plot in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 700000,
    image: 'p27 utawala/images-2023-05-27T123510.688.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'ruth-njeri-njiraini-kitengela',
    title: 'Prime Plots in Kitengela (Plots 5 & 6)',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 900000,
    image: 'p27 utawala/20181110_130305.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'celia-wairimu-joska',
    title: 'Affordable Plot in Joska',
    location: 'Joska, Machakos County, Kenya',
    price: 600000,
    image: 'p27 utawala/20181110_130310.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'lucy-mumbi-utawala',
    title: 'Residential Plot for Sale in Utawala (Plot 55)',
    location: 'Utawala, Nairobi County, Kenya',
    price: 2800000,
    image: 'p27 utawala/20181110_130316.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'faith-ntinyari-kantafu',
    title: 'Plot in Kantafu near developing areas',
    location: 'Kantafu, Machakos County, Kenya',
    price: 680000,
    image: 'p27 utawala/20181110_130323.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'liza-nyambura-kitengela',
    title: 'Prime Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1000000,
    image: 'p27 utawala/65330b49-3a9e-425d-ab7b-2ecaf86515e0-300x188.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
  id: 'heritage-villas-ngong',
  title: 'Luxurious 4 Bedroom All Ensuite Plus DSQ For Sale Heritage Villas, Ngong',
  location: 'Ngong, Ngong ward, Kajiado North, Kajiado, Rift Valley, Kenya',
  price: 27500000,
  image: '/p17 heritage/IMG-20250421-WA0093.jpg',
  bedrooms: 4,
  bathrooms: 5,
  area: 240,
  type: 'House',
  featured: true,
  },
  {
    id: 'kitengela-plots-near-new-life-academy',
    title: 'Plots for Sale Near New Life Academy, Kitengela',
    location: 'Kitengela, Kajiado County, Rift Valley, Kenya',
    price: 1800000,
    image: '/p/20190207_094225.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 465,
    type: 'Land',
    featured: false,
  },
  {
    id: 'uchumi-house-cbd',
    title: 'Uchumi House Commercial Building for Sale, Nairobi CBD',
    location: 'Aga Khan Walk, Nkrumah Lane, Central Business District, Nairobi, Nairobi County, Kenya',
    price: 570000000,
    image: '/p43 uchumi/Screenshot 2025-07-05 114627.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 4491,
    type: 'Commercial Building',
    featured: true,
  },
  {
    id: 'langata-house-jambo-estate',
    title: '4 Bedroom Maisonette Plus Extension For Sale, Jambo Estate, Langata',
    location: 'Jambo Estate, Langata, Nairobi, Nairobi County, Kenya',
    price: 30000000,
    image: '/p41 langata/Screenshot 2025-07-05 115338.png',
    bedrooms: 5,
    bathrooms: 4,
    area: 203,
    type: 'House',
    featured: false,
  },
  {
    id: 'kiambu-windsor',
    title:'4bdrm House Ensuite + 2 ensuite DSQs in Windsor Villas, Mushroom Gardens',
    location: 'Mushroom Gardens, Kiambu Road',
    price: 80000000,
    image:'https://austinerealtors.co.ke/wp-content/smush-webp/2024/02/1E2ACC81-C233-441F-BEF0-A6C448D14BBB-1170x720.jpeg.webp',
    bedrooms: 4,
    bathrooms: 6,
    area: 2000,
    type: 'House',
    featured: true,
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
    type: 'Land',
    featured: true,
  },
  {
    id: 'mlolongo-warehouse',
    title: '1/2 acre Warehouse GoDown for sale',
    location: 'Mlolongo, Mombasa Road',
    price: 95000000,
    image: '/p25 godown mlolo/IMG-20250512-WA0032.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 11600,
    type: 'Commercial Property',
    featured: false,
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
    type: 'House',
    featured: true,
  },
  {
    id: 'emali-land',
    title: '550 Acres Land for Sale in Emali Road',
    location: 'Kajiado, Loitoktok',
    price: 4125000000,
    image: 'https://ext.same-assets.com/2880436944/311664710.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'muthaiga-mansion',
    title: '3bdrm Mansion in 3 Acres Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 350000000,
    image: 'https://ext.same-assets.com/2880436944/2862327400.jpeg',
    bedrooms: 3,
    bathrooms: 4,
    area: 500,
    type: 'House',
    featured: true,
  },
  {
    id: 'edenville-villa',
    title: '3bdrm Villa in Edenville',
    location: 'Kiambu, Kiambu / Kiambu',
    price: 26000000,
    image: '/p24 edenville/IMG-20250510-WA0251.jpg',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: 'House',
    featured: false,
  },
  {
    id: 'muthaiga-land',
    title: '1 Acres Residential Vacant Land for Sale in Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 230000000,
    image: 'p26 1a muthaiga/IMG-20250510-WA0215.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'kitengela-plot',
    title: '50 by 100 Acre Plot for Sale in Kitengela',
    location: 'Kajiado, Kitengela',
    price: 700000,
    image: 'https://ext.same-assets.com/2880436944/515128159.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'karen-6acres',
    title: '6 Acres Residential Vacant Land for Sale in Karen',
    location: 'Nairobi, Karen',
    price: 540000000,
    image: 'https://ext.same-assets.com/3634728786/2403051608.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'syokimau-industrial',
    title: '2.5 Acres Commercial Industrial Property for Sale in Syokimau',
    location: 'Machakos, Syokimau',
    price: 400000000,
    image: 'https://ext.same-assets.com/3634728786/3440863984.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 57000,
    type: 'Commercial Land',
    featured: true,
  },
  {
    id: 'cbd-commercial',
    title: '3506 m² Commercial Building for Sale in Central Business District',
    location: 'Nairobi, Central Business District',
    price: 475000000,
    image: 'https://ext.same-assets.com/3634728786/2651965371.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 3506,
    type: 'Commercial Property',
    featured: true,
  },
  {
    id: 'westlands-land',
    title: '0.95 Acres Residential Vacant Land for Sale in Westlands',
    location: 'Nairobi, Westlands',
    price: 430000000,
    image: 'https://ext.same-assets.com/3634728786/3896291020.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'isinya-land',
    title: '50 Acres in Isinya Land for Sale',
    location: 'Kajiado, Isinya',
    price: 14000000,
    image: 'https://ext.same-assets.com/2880436944/2122315454.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Agricultural Land',
    featured: false,
  },
  {
    id: 'neema-gardens',
    title: '50 by 100 Land for Sale in Neema Gardens',
    location: 'Kajiado, Kitengela',
    price: 1800000,
    image: 'https://ext.same-assets.com/2880436944/986284101.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'kinoo-plot',
    title: 'Kinoo 1/4 Acre Plot in Nairobi',
    location: 'Kiambu, Kikuyu',
    price: 20000000,
    image: 'p10 kinoo/IMG-20250421-WA0107.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'joska-plots',
    title: 'Joska Land for Sale',
    location: 'Nairobi, Kamulu',
    price: 950000,
    image: 'https://ext.same-assets.com/2880436944/3179128645.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'utawala-plots',
    title: 'Utawala Zebra Plots for Sale',
    location: 'Nairobi, Utawala',
    price: 2000000,
    image: 'https://ext.same-assets.com/2880436944/1522192692.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: false,
  },
  {
    id: 'syokimau-5acres',
    title: '5 Acres Vacant Land for Sale in Syokimau',
    location: 'Machakos, Syokimau',
    price: 200000000,
    image: 'https://ext.same-assets.com/2880436944/2093076440.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Commercial Land',
    featured: true,
  },
  {
    id: 'kisaju-10acres',
    title: '10 Acres in Kisaju Along Namanga Road',
    location: 'Kajiado, Kisaju',
    price: 140000000,
    image: 'https://ext.same-assets.com/2880436944/2390980102.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Agricultural Land',
    featured: false,
  },
  {
    id: 'syokimau-katani',
    title: 'Syokimau Katani Road Plots for Sale',
    location: 'Machakos, Syokimau',
    price: 4500000,
    image: 'https://ext.same-assets.com/2880436944/2884670387.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Plot',
    featured: false,
  },
  {
    id: 'kitengela-bungalow',
    title: '3bdrm Bungalow In Mlimani Court',
    location: 'Kajiado, Kitengela',
    price: 2800000,
    image: 'https://ext.same-assets.com/2880436944/413641261.jpeg',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: 'Bungalow',
    featured: false,
  },
  {
    id: 'kiambu-road-10acres',
    title: '10 Acres Vacant Land for Sale in Kiambu Road',
    location: 'Nairobi, Nairobi Central',
    price: 600000000,
    image: 'https://ext.same-assets.com/2880436944/3792112934.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Commercial Land',
    featured: true,
  },
  {
    id: 'karen-mansion',
    title: '13bdrm Mansion in Mayeast Road',
    location: 'Nairobi, Karen',
    price: 400000000,
    image: 'https://ext.same-assets.com/2880436944/312339966.jpeg',
    bedrooms: 13,
    bathrooms: 8,
    area: 8000,
    type: 'Luxury Mansion',
    featured: true,
  },
  {
    id: 'lavington-land',
    title: '1/2 Acre Land in Lavington',
    location: 'Nairobi, Kileleshwa',
    price: 135000000,
    image: '/p13 lavi/IMG-20250510-WA0209.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Land',
    featured: false,
  },
  {
    id: 'cbd-building',
    title: '3500m2 Commercial Building for Sale in Nairobi Town CBD',
    location: 'Nairobi, Nairobi Central',
    price: 475000000,
    image: 'https://ext.same-assets.com/2880436944/2115884790.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 3500,
    type: 'Commercial Building',
    featured: true,
  },
  {
    id: 'athi-river-maisonette',
    title: '3bdrm Maisonette in Sidai Village',
    location: 'Machakos, Athi River',
    price: 8500000,
    image: 'https://ext.same-assets.com/2880436944/638900844.jpeg',
    bedrooms: 3,
    bathrooms: 2,
    area: 505,
    type: 'Maisonette',
    featured: false,
  },
  {
    id: 'lavington-quarter-acre',
    title: '1/4 an Acre Touching James Gichuru Lavington Land for Sale',
    location: 'Nairobi, Kileleshwa',
    price: 140000000,
    image: 'https://ext.same-assets.com/2880436944/2969919925.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Land',
    featured: true,
  },
  {
    id: 'thika-commercial',
    title: '12.5 Acres Commercial Vacant Land for Sale in Thika',
    location: 'Kiambu, Thika',
    price: 300000000,
    image: 'https://ext.same-assets.com/2880436944/2292786202.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Commercial Land',
    featured: false,
  },
  {
    id: 'karen-villa',
    title: '4bdrm Villa in Karen, Nairobi Central for sale',
    location: 'Nairobi, Karen',
    price: 400000000,
    image: 'https://ext.same-assets.com/2880436944/3531345130.jpeg',
    bedrooms: 4,
    bathrooms: 3,
    area: 5000,
    type: 'Luxury Villa',
    featured: true,
  },
  {
    id: 'kiambu-road-house',
    title: '5bdrm House in Kiambu Road',
    location: 'Nairobi, Nairobi Central',
    price: 550000000,
    image: '/p18 5b 550M kia rd/IMG-20250510-WA0150.jpg',
    bedrooms: 5,
    bathrooms: 4,
    area: 5000,
    type: 'Luxury House',
    featured: true,
  },
  {
    id: 'chyuna-estate',
    title: '5bdrm Mansion in Chyuna Estate',
    location: 'Kajiado, Kitengela',
    price: 35000000,
    image: 'https://ext.same-assets.com/2880436944/831122591.jpeg',
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    type: 'Mansion',
    featured: false,
  },
  {
    id: 'ngong-plots',
    title: 'Fully Serviced Plots for Sale in Ngong Oluulua Ngong 46',
    location: 'Ngong, Kajiado',
    price: 7500000,
    image: 'https://ext.same-assets.com/2880436944/4176058206.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Plot',
    featured: false,
  },
  {
    id: 'mombasa-industrial',
    title: '3 acres commercial industrial property for sale in Mombasa Road',
    location: 'Nairobi, Mombasa Road',
    price: 990000000,
    image: 'https://ext.same-assets.com/3634728786/575370584.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 100000,
    type: 'Commercial Industrial',
    featured: true,
  },
  {
    id: 'redhill-land',
    title: '7.9 acres vacant land for sale in Redhill',
    location: 'Nairobi, Redhill',
    price: 750000000,
    image: 'https://ext.same-assets.com/3634728786/3300708784.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Land',
    featured: true,
  },
  {
    id: 'muthaiga-5bedroom',
    title: '5 bedroom house for sale in Muthaiga',
    location: 'Nairobi, Muthaiga',
    price: 600000000,
    image: 'https://ext.same-assets.com/3634728786/3519000104.jpeg',
    bedrooms: 5,
    bathrooms: 4,
    area: 542,
    type: 'Luxury House',
    featured: true,
  },
  {
    id: 'karen-9acres',
    title: '9 acres vacant land for sale in Karen',
    location: 'Nairobi, Karen',
    price: 540000000,
    image: 'https://ext.same-assets.com/3634728786/204887299.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Residential Land',
    featured: true,
  },
  {
    id: 'kikambala-beach',
    title: '15 acres vacant land for sale in Kikambala',
    location: 'Kilifi, Kikambala',
    price: 420000000,
    image: 'https://ext.same-assets.com/3634728786/1077470987.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Beach Land',
    featured: true,
  },
  {
    id: 'kileleshwa-apartment',
    title: '3 bedroom apartment for sale in Kileleshwa',
    location: 'Nairobi, Kileleshwa',
    price: 18000000,
    image: '/* Image placeholder - add your image here */',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Apartment',
    featured: false,
  },

  {
    id: 'rongai-bungalow',
    title: '3 bedroom bungalow for sale in Rongai',
    location: 'Kajiado, Rongai',
    price: 8500000,
    image: '/* Image placeholder - add your image here */',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: 'Bungalow',
    featured: false,
  },
  
];

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  featured: boolean;
}

interface PropertyCardProps {
  property: Property;
  index: number;
  onImageClick: (imageUrl: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 });
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)}B`;
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg) translateZ(10px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Featured Badge */}
      {property.featured && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg">
          FEATURED
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Interactive Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
            <Camera className="w-4 h-4 text-gray-700" />
          </button>
          <button 
            onClick={() => onImageClick(property.image)}
            className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl">
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-black text-gray-900">
              KSH {formatPrice(property.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-red-500" />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        {/* Property Details */}
        {(property.bedrooms > 0 || property.bathrooms > 0 || property.area > 0) && (
          <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span className="font-semibold text-gray-900">{property.bedrooms}</span>
                <span>Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                <span>Baths</span>
              </div>
            )}
            {property.area > 0 && (
              <div className="flex items-center space-x-1">
                <Square className="w-4 h-4" />
                <span className="font-semibold text-gray-900">{property.area.toLocaleString()}</span>
                <span>sqft</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <a
            href="tel:0729170156"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-bold text-center hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Call Now
          </a>
          <button className="flex-1 border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transform hover:scale-105 transition-all duration-300">
            <Eye 
              className="w-4 h-4 inline mr-2 cursor-pointer" 
              onClick={() => onImageClick(property.image)}
            />
              <Link href={`/properties/${property.id}`}>View Details</Link>
          </button>
        </div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-300"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={imageUrl}
          alt="Property"
          className="w-full h-full object-contain rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
};

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      propertyType === 'all' ||
      property.type.toLowerCase() === propertyType.toLowerCase();

    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = property.price;
      switch (priceRange) {
        case 'under-10m':
          matchesPrice = price < 10000000;
          break;
        case '10m-50m':
          matchesPrice = price >= 10000000 && price < 50000000;
          break;
        case '50m-100m':
          matchesPrice = price >= 50000000 && price < 100000000;
          break;
        case 'over-100m':
          matchesPrice = price >= 100000000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return 0;
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const displayedProperties = sortedProperties.slice(0, displayCount);
  const hasMoreProperties = displayCount < sortedProperties.length;

  const loadMoreProperties = () => {
    setDisplayCount(prev => Math.min(prev + 10, sortedProperties.length));
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl rotate-45 opacity-60"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(${45 + mousePosition.x * 10}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px) scale(${1 + Math.abs(mousePosition.y) * 0.1})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl rotate-12 opacity-40"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -20}px) rotate(${12 + mousePosition.y * 15}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-2/3 right-1/3 w-16 h-16 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-full opacity-30"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * 25}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full opacity-30"
            style={{
              left: `${10 + (i * 4.5)}%`,
              top: `${15 + (i * 4)}%`,
              transform: `translate(${Math.sin(mousePosition.x * i) * 10}px, ${Math.cos(mousePosition.y * i) * 10}px)`,
              animation: `float ${2 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`,
              transition: 'transform 0.2s ease-out'
            }}
          />
        ))}

        {/* Large background shapes */}
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-full opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) scale(${1 + Math.abs(mousePosition.x) * 0.05})`,
            transition: 'transform 0.4s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-15"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px) scale(${1 + Math.abs(mousePosition.y) * 0.05})`,
            transition: 'transform 0.4s ease-out'
          }}
        />
      </div>

      {/* Header Section */}
           <Header />
      <div className="relative z-10 bg-gradient-to-r from-red-500 to-red-600 border-b border-red-400 sticky top-0 mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Premium Properties
            </h1>
            <p className="text-red-100 text-lg">
              Discover exceptional homes and investment opportunities in Kenya
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-red-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>

            {/* Property Type */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <option value="all">All Types</option>
              <option value="house">Houses</option>
              <option value="mansion">Mansions</option>
              <option value="commercial">Commercial</option>
              <option value="hotel">Hotels</option>
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <option value="all">All Prices</option>
              <option value="under-10m">Under 10M</option>
              <option value="10m-50m">10M - 50M</option>
              <option value="50m-100m">50M - 100M</option>
              <option value="over-100m">Over 100M</option>
            </select>
          </div>
        </div>
      </div>
      

      {/* Properties List Section */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Showing {displayedProperties.length} of {sortedProperties.length} Properties
              </h2>
              <p className="text-gray-600">
                Premium listings in Kenya's top locations
              </p>
            </div>
            
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Properties Grid */}
          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-slideInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard 
                    property={property} 
                    index={index} 
                    onImageClick={handleImageClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                No Properties Found
              </h3>
              <p className="mb-8 text-gray-600 max-w-md mx-auto">
                Try adjusting your search criteria or browse all available properties.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPropertyType('all');
                  setPriceRange('all');
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMoreProperties && (
            <div className="mt-12 text-center">
              <button 
                onClick={loadMoreProperties}
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:border-red-500 hover:text-red-500 transform hover:scale-105 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
              >
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative z-10 bg-gradient-to-r from-red-50 to-orange-50 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Let our experts help you discover the perfect property in Kenya's premium locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0729170156"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Call Expert Now
            </a>
            <button className="border-2 border-red-500 text-red-500 px-8 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transform hover:scale-105 transition-all duration-300">
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal imageUrl={selectedImage} onClose={closeImageModal} />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(120deg); }
          66% { transform: translateY(-4px) rotate(240deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}