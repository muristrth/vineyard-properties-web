'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, MapPin } from 'lucide-react';

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
    title: 'Spacious Plot for Sale in Kitengela Phase 11',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 750000,
    image: '/p kite 11/Screenshot 2024-02-12 090319.png',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'pauline-mwaura-kitengela',
    title: 'Prime Plot for Sale in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 1100000,
    image: '/p6 kite11b/P_20171020_172051.jpg',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Land',
    featured: true,
  },
  {
    id: 'lawrence-mugambi-kitengela',
    title: 'Well-Located Plot in Kitengela',
    location: 'Kitengela, Kajiado County, Kenya',
    price: 700000,
    image: 'https://ext.same-assets.com/2880436944/986284101.jpeg',
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

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

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
        case 'under-600k':
          matchesPrice = price < 600000;
          break;
        case '600k-1m':
          matchesPrice = price >= 600000 && price < 1000000;
          break;
        case '1m-2m':
          matchesPrice = price >= 1000000 && price < 2000000;
          break;
        case 'over-2m':
          matchesPrice = price >= 2000000;
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
        return 0; // Would sort by date if available
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-12 pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 font-radio-canada text-4xl font-bold md:text-5xl">
              Premium Properties
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Discover exceptional homes and investment opportunities in prime
              locations
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
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
                <SelectItem value="commercial-property">
                  Commercial Property
                </SelectItem>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-radio-canada text-2xl font-bold text-gray-900">
                {sortedProperties.length} Properties Found
              </h2>
              <p className="mt-1 text-gray-600">
                Showing premium properties in your area
              </p>
            </div>
            <Button variant="outline" className="hidden items-center md:flex">
              <MapPin className="mr-2 h-4 w-4" />
              Map View
            </Button>
          </div>

          {/* Properties Grid */}
          {sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 font-radio-canada text-xl font-bold text-gray-900">
                No Properties Found
              </h3>
              <p className="mb-6 text-gray-600">
                Try adjusting your search criteria or browse all available
                properties.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setPropertyType('all');
                  setPriceRange('all');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {sortedProperties.length > 0 && (
            <div className="mt-12 text-center">
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
