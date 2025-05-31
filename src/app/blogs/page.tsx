'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, User, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'home-buying-tips',
    title: 'Essential Home Buying Tips for First-Time Buyers',
    excerpt:
      'Navigate the home buying process with confidence using these expert tips and strategies for first-time buyers.',
    content:
      'Buying your first home is an exciting milestone, but it can also feel overwhelming...',
    author: 'Mark Muriithi',
    category: 'Tips',
    date: '2025-02-05',
    readTime: '8 min read',
    image: 'https://ext.same-assets.com/2009473017/2828581621.jpeg',
    featured: true,
  },
  {
    id: 'serviced-apartments-vs-hotels',
    title: 'Services apartments vs Hotels: Which is Right for You?',
    excerpt:
      'Investing in serviced apartments is a fairly new concept, especially in the Kenyan real estate market.',
    content:
      'Sustainability has become a driving force in modern home design and construction...',
    author: 'Mark Muriithi',
    category: 'Trends',
    date: '2024-05-13',
    readTime: '10 min read',
    image: 'https://ext.same-assets.com/2009473017/923357109.jpeg',
  },
  {
    id: 'real-estate-investment-amount-kenya',
    title: 'How Much Do You Need to Invest in Real Estate in Kenya',
    excerpt:
      'Investing in real estate in Kenya has become a popular option for many investors looking to diversify their portfolios and build long-term wealth.',
    content:
      'Investing in real estate in Kenya has become a popular option for many investors looking...',
    author: 'Mark Muriithi',
    category: 'Investment',
    date: '2023-07-19',
    readTime: '10 min read',
    image: 'https://ext.same-assets.com/616702439/4224781709.jpeg',
  },
  {
    id: 'making-money-real-estate-kenya',
    title: 'How to Make Money in Real Estate in Kenya',
    excerpt:
      'Overview of the real estate in Kenya. Real estate in Kenya is one of the most lucrative investment opportunities available today.',
    content:
      'The mortgage landscape continues to evolve, and staying informed is crucial for buyers...',
    author: 'Mark Muriithi',
    category: 'Updates',
    date: '2022-10-10',
    readTime: '15 min read',
    image: 'https://images.ctfassets.net/eoa1vvg9v30r/1dFqN08SsUlz9PLb8CfU8g/8792a8bb4464c768a8e93570819fe362/How_to_invest_in_real_estate_Kenya_to_make_money.png',
  },
  {
    id: 'what-is-real-estate-investment',
    title: 'What is Real Estate Investment?',
    excerpt:
      'Real estate investment is the purchase, ownership, management, rental, and/or sale of real estate for profit. Learn the fundamentals of property investment.',
    content: 'Real estate investment involves putting capital into property...',
    author: 'Mark Muriithi',
    category: 'Investment',
    date: '2022-10-10',
    readTime: '9 min read',
    image: 'https://vijayshanthibuilders.com/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-15-at-00.39.10_dda4402c-1.jpg',
  },
  {
    id: 'boost-home-value',
    title: '10 Ways to Boost Your Home Value Before Selling',
    excerpt:
      "Discover strategic improvements that can significantly increase your property's market value and appeal to buyers.",
    content:
      'As we move through 2025, real estate investment opportunities continue to evolve...',
    author: 'Mark Muriithi',
    category: 'Guides',
    date: '2025-01-09',
    readTime: '12 min read',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9TNftQyTb7mipltoRRV_Dp80w7WZOeNFQAA&s',
  },
  {
  id: "kenyas-affordable-housing-progress-challenges-and-your-role-as-an-investor",
  title: "Kenya's Affordable Housing: Progress, Challenges, and Your Role as an Investor",
  excerpt: "Explore Kenya's journey toward affordable housing and learn how investors can tap into this growing market.",
  content: "Kenya's affordable housing initiative is a cornerstone of the country's development agenda...",
  author: "Mark Muriithi",
  category: "Affordable Housing",
  date: "2025-05-28",
  readTime: "6 min read",
  image: "https://www.kenyaforum.net/wp-content/uploads/2024/12/images-8.jpeg"
},
{
  id: "rent-to-own-schemes-in-kenya",
  title: "Rent-to-Own Schemes in Kenya: A Path to Homeownership for Many",
  excerpt: "Discover how rent-to-own housing schemes in Kenya are making homeownership more accessible through flexible financing options.",
  content: "Rent-to-own schemes are changing the homeownership landscape in Kenya...",
  author: "Mark Muriithi",
  category: "Affordable Housing",
  date: "2025-05-28",
  readTime: "7 min read",
  image: "https://property254.co.ke/blogs/wp-content/uploads/2024/05/Rent-to-own-schemes-in-Kenya-1.jpg"
},
{
  id: "investing-in-kenyas-affordable-housing-projects",
  title: "Investing in Kenya's Affordable Housing Projects: What You Need to Know",
  excerpt: "Explore the opportunities and risks of investing in Kenya’s affordable housing sector, one of the country’s fastest-growing real estate segments.",
  content: "Kenya's affordable housing sector has emerged as a high-potential investment opportunity...",
  author: "Mark Muriithi",
  category: "Investment",
  date: "2025-05-28",
  readTime: "8 min read",
  image: "https://coastproperties.co.ke/wp-content/uploads/2023/07/Facebook-card-010.jpg"
},

{
  id: "the-rise-of-satellite-towns-in-kenya",
  title: "The Rise of Satellite Towns: Affordable Land & Housing Hotspots in Kenya",
  excerpt: "Discover why satellite towns like Ruiru, Kitengela, and Athi River are emerging as key investment destinations for affordable real estate in Kenya.",
  content: "Satellite towns around Nairobi are becoming highly attractive for land and housing investors...",
  author: "Mark Muriithi",
  category: "Location Insights",
  date: "2025-05-28",
  readTime: "8 min read",
  image: "https://eloidevelopers.co.ke/_next/image?url=https%3A%2F%2Fpower.nillavee.co.ke%2F%2Fimgs%2Fblogs%2FA%20panoramic%20view%20of%20a%20thriving%20satellite%20town%20near%20Nairobi%2C%20Kenya%2C%20featuring%20modern%20residential%20and%20commercial%20buildings%20interspersed%20with%20green%20space.webp&w=1080&q=75"
},
{
  id: "cheap-houses-for-sale-in-nairobi",
  title: "Unlocking Value: Finding Cheap Houses for Sale in Nairobi and Beyond",
  excerpt: "Looking for affordable housing in Kenya? Explore top locations and tips for finding cheap houses for sale in Nairobi and its growing suburbs.",
  content: "Kenya’s urban population is on the rise, and with it comes a growing demand for affordable housing options...",
  author: "Mark Muriithi",
  category: "Affordable Housing",
  date: "2025-05-28",
  readTime: "7 min read",
  image: "https://realhub.co.ke/blog/wp-content/uploads/2023/02/afford.png"
},
{
  id: "government-housing-projects-kenya",
  title: "Government Initiatives Driving Real Estate Growth in Kenya: A Deep Dive",
  excerpt: "Explore how government policies, infrastructure projects, and public-private partnerships are accelerating real estate growth in Kenya.",
  content: "Kenya's real estate landscape is being reshaped by ambitious government initiatives and infrastructure development plans...",
  author: "Mark Muriithi",
  category: "Investment",
  date: "2025-05-28",
  readTime: "8 min read",
  image: "https://proxima.co.ke/assets/img/1740380938-new-blog-feb-23.jpg"
},
{
  id: "housing-levy-kenya-investment",
  title: "Is the Housing Levy a Good Investment for Kenyans? Expert Analysis",
  excerpt: "The housing levy has sparked national debate in Kenya. Discover whether this government-led initiative is a wise investment for individuals and the country’s real estate sector.",
  content: "Kenya’s housing levy was introduced to support affordable housing development...",
  author: "Mark Muriithi",
  category: "Investment",
  date: "2025-05-28",
  readTime: "7 min read",
  image: "https://media.licdn.com/dms/image/v2/D4D22AQHcX__hGFNZiA/feedshare-shrink_800/B4DZUc2Mg3HYAg-/0/1739945727667?e=2147483647&v=beta&t=wVvY7FTaFsIN0ZtOVHgprKjOW4T1m5_tfBI_qrhNVxE"
},
{
  id: "emerging-affordable-property-hubs",
  title: "Beyond Nairobi: Emerging Investment Hubs for Affordable Property in Kenya",
  excerpt: "Explore Kenya’s rising real estate destinations outside Nairobi. From Eldoret to Thika, discover where to find affordable properties and promising investment returns.",
  content: "Kenya’s real estate landscape is expanding beyond Nairobi...",
  author: "Mark Muriithi",
  category: "Investment",
  date: "2025-05-28",
  readTime: "8 min read",
  image: "https://usernameproperties.com/blog/wp-content/uploads/2025/04/Property-Investment-Trends-Emerging-Opportunities-in-Kenyas-Market.jpg"
},
{
  id: "sustainable-designs-kenyan-housing",
  title: "The Future of Affordable Living: Sustainable Designs in Kenyan Housing",
  excerpt: "Explore how eco-friendly and sustainable building designs are shaping affordable housing in Kenya. Learn why going green is becoming essential for developers and buyers.",
  content: "Sustainable housing is transforming the way Kenyans think about affordability...",
  author: "Mark Muriithi",
  category: "Development",
  date: "2025-05-28",
  readTime: "10 min read",
  image: "https://static.ntvkenya.co.ke/uploads/2023/12/WhatsApp-Image-2022-12-07-at-11.48.33-1-1-e1701848346908-1320x762.jpg"
},
{
  id: "kenyan-real-estate-covid-impact",
  title: "How COVID-19 Reshaped the Kenyan Real Estate Market",
  excerpt: "Discover how the pandemic transformed Kenya's property market—from shifting buyer preferences to the surge in digital transactions and suburban growth.",
  content: "The COVID-19 pandemic disrupted nearly every industry, and Kenyan real estate was no exception...",
  author: "James Mwangi",
  category: "Investment",
  date: "2025-05-28",
  readTime: "10 min read",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOMAVkulcPrlDqtg5FgGf9nQ7Kg1HXUkNiw&s"
},
{
  id: "kenya-land-vs-apartment-investment",
  title: "Land vs Apartments in Kenya: Which Is the Better Investment?",
  excerpt: "Choosing between land and apartments can be tough for investors in Kenya. Here’s a deep dive into the pros and cons of each to help you decide.",
  content: "If you're planning to invest in Kenyan real estate, two of the most common options are buying land or investing in apartments...",
  author: "Grace Njeri",
  category: "Investment",
  date: "2025-05-28",
  readTime: "10 min read",
  image: "https://jkbhousing.com/jb-content/uploads/2023/08/Blog-Featured.jpg"
},
{
  id: "buying-land-vs-buying-house-kenya",
  title: "Buying Land vs Buying a House in Kenya: What Should You Choose?",
  excerpt: "In Kenya’s growing property market, should you buy land and build, or purchase a ready-made house? We compare the pros, cons, and costs to guide your decision.",
  content: "When it comes to investing in property in Kenya, one of the most debated questions is whether to buy land and build your own home or to buy a ready-made house...",
  author: "Daniel Otieno",
  category: "Home Ownership",
  date: "2025-05-28",
  readTime: "10 min read",
  image: "https://shiftersmovers.com/wp-content/uploads/2021/10/Building-a-house-vs-buying-cost_032601b80_4999.jpg"
},
{
  id: "nairobi-real-estate-trends-2025-investment-forecast",
  title: "Nairobi Real Estate Trends 2025: Key Insights and Investment Forecast",
  excerpt: "Discover Nairobi’s hottest real estate trends for 2025, including rising suburbs, pricing patterns, and smart investment opportunities.",
  content: "As Nairobi continues to evolve as East Africa’s business hub...",
  author: "Kevin Otieno",
  category: "Real Estate Market Trends",
  date: "2025-05-29",
  readTime: "10 min read",
  image: "https://media.licdn.com/dms/image/v2/D4D12AQFR4UOOR9bbBw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1738995219856?e=2147483647&v=beta&t=efKk6zmc_Ft2_g12Nf-98-xfAt6_sYAzTPJsNw1zpIs"
},
{
  id: "why-land-investment-in-kenya-remains-lucrative-in-2025",
  title: "Why Land Investment in Kenya Remains Lucrative in 2025",
  excerpt: "Discover why land remains one of Kenya’s top-performing investments in 2025, including hotspot areas, price trends, and legal tips.",
  content: "Land continues to be a highly sought-after asset in Kenya’s real estate market...",
  author: "Grace Wanjiru",
  category: "Land Investment",
  date: "2025-05-29",
  readTime: "10 min read",
  image: "https://www.usernameproperties.com/blog/wp-content/uploads/2025/03/Why-Investing-in-Land-in-Kenya-is-Better-Than-Other-Investments-in-2025-.jpg"
  },
  {
  id: "affordable-housing-hotspots-beyond-nairobi-2025",
  title: "Affordable Housing Hotspots Beyond Nairobi's Traditional Borders in 2025",
  excerpt: "Discover untapped satellite towns and county headquarters offering genuine affordable housing opportunities in Kenya, driven by new infrastructure and devolved growth.",
  author: "Samuel Koech",
  category: "Affordable Housing",
  date: "2025-06-01",
  readTime: "12 min read",
  image: "https://images.unsplash.com/photo-1599766908114-000056a70239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2VueWElMjBob3VzaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  featured: true
},
{
  id: "due-diligence-checklist-kenya-land-2025",
  title: "The Ultimate Due Diligence Checklist for Buying Land in Kenya 2025 (Post-Ardhisasa)",
  excerpt: "Navigate land purchases in Kenya confidently with this comprehensive 2025 due diligence checklist, integrating Ardhisasa and traditional verification methods to avoid pitfalls.",
  author: "Fatima Juma (Legal Consultant)",
  category: "Legal & Due Diligence",
  date: "2025-06-05",
  readTime: "15 min read",
  image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxlZ2FsJTIwZG9jdW1lbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  featured: true
},
{
  id: "financing-real-estate-kenya-2025-options",
  title: "Financing Your Real Estate Dream in Kenya 2025: Mortgages, SACCOs, and Creative Options",
  excerpt: "Explore a comprehensive guide to real estate financing in Kenya for 2025, covering mortgages, SACCO loans, KMRC's impact, off-plan payments, and chamas.",
  author: "Aisha Mwangi (Finance Analyst)",
  category: "Finance & Mortgages",
  date: "2025-06-10",
  readTime: "14 min read",
  image: "https://images.unsplash.com/photo-1600585152204-2139922de893?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZpbmFuY2UlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  featured: true
},
{
  id: "maximizing-rental-yields-nairobi-2025",
  title: "Maximizing Rental Yields in Nairobi 2025: A Landlord's Strategic Guide",
  excerpt: "Boost your rental income in Nairobi's competitive 2025 market. Strategies for property selection, tenant management, upgrades, and navigating legal landscapes.",
  author: "Esther Wambui",
  category: "Property Management",
  date: "2025-06-15",
  readTime: "9 min read",
  image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVudGFsJTIwcHJvcGVydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
  id: "impact-infrastructure-kenya-property-values-2025",
  title: "The Ripple Effect: How Major Infrastructure Projects are Shaping Kenyan Property Values in 2025",
  excerpt: "Explore the direct impact of roads (Nairobi Expressway, bypasses), SGR, and new ports (Lamu) on real estate appreciation and development patterns across Kenya.",
  author: "Dr. David Kinyua",
  category: "Market Trends",
  date: "2025-06-20",
  readTime: "11 min read",
  image: "https://images.unsplash.com/photo-1618060932034-407a9160a3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5mcmFzdHJ1Y3R1cmUlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  featured: true
},
{
  id: "sectional-properties-act-kenya-2025-explained",
  title: "Kenya's Sectional Properties Act 2020: A 2025 Guide for Apartment Owners and Developers",
  excerpt: "Understand the implications of the Sectional Properties Act 2020 for buying, selling, and managing apartments and shared properties in Kenya as of 2025.",
  author: "Anne Chebet (Advocate)",
  category: "Legal & Regulations",
  date: "2025-06-28",
  readTime: "10 min read",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50JTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
  id: "sustainable-building-materials-kenya-2025",
  title: "Eco-Construction 2025: Top Sustainable Building Materials Gaining Traction in Kenya",
  excerpt: "Explore the rise of sustainable building materials in Kenya – from stabilized soil blocks and bamboo to recycled materials – and their benefits for cost, environment, and durability.",
  author: "Michael Odhiambo (Architect)",
  category: "Sustainable Development",
  date: "2025-07-05",
  readTime: "9 min read",
  image: "https://images.unsplash.com/photo-1558819375-dd47a917888e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzdGFpbmFibGUlMjBidWlsZGluZyUyMG1hdGVyaWFsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
  id: "real-estate-photography-videography-kenya-2025",
  title: "Visual Appeal: The Power of Professional Real Estate Photography & Videography in Kenya 2025",
  excerpt: "In a digital-first market, high-quality photos and videos are crucial for selling or renting property in Kenya. Explore trends, costs, and tips for impactful visual marketing.",
  author: "Jane Mukami (Marketing Expert)",
  category: "Marketing & Sales",
  date: "2025-07-12",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1587024615493-a20788b7667c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVhbCUyMGVzdGF0ZSUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
  id: "understanding-capital-gains-tax-kenya-real-estate-2025",
  title: "Capital Gains Tax (CGT) on Real Estate in Kenya 2025: A Clear Guide",
  excerpt: "Navigating Capital Gains Tax on property sales in Kenya can be complex. This guide explains CGT rates, calculations, exemptions, and compliance for 2025.",
  author: "David Chege (Tax Consultant)",
  category: "Taxation",
  date: "2025-07-19",
  readTime: "9 min read",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGF4JTIwY2FsY3VsYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
  id: "short-term-rentals-airbnb-kenya-2025-guide",
  title: "The Short-Term Rental Market (Airbnb) in Kenya 2025: A Host's Guide to Success",
  excerpt: "Unlock the potential of short-term rentals in Kenya. This guide covers hotspots, regulations, pricing, guest management, and maximizing profits on platforms like Airbnb.",
  author: "Brenda Adhiambo",
  category: "Niche Investments",
  date: "2025-07-26",
  readTime: "10 min read",
  image: "https://images.unsplash.com/photo-1611048264200-747f00d9398a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlyYm5iJTIwaG9zdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  featured: false
},
{
    id: "warehousing-logistics-real-estate-kenya-2025",
    title: "The Boom in Warehousing & Logistics Real Estate in Kenya 2025",
    excerpt: "Explore the driving forces behind Kenya's burgeoning warehousing and logistics property sector, key locations, investment opportunities, and future trends.",
    author: "Martin Owino (Logistics Analyst)",
    category: "Commercial Real Estate",
    date: "2025-08-05",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb16d2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FyZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "retirement-homes-kenya-market-2025",
    title: "Retirement Communities in Kenya 2025: An Emerging Real Estate Niche",
    excerpt: "Explore the growing demand for senior living and retirement communities in Kenya, preferred locations, types of facilities, and investment considerations for this niche market.",
    author: "Dr. Grace Kemunto",
    category: "Niche Investments",
    date: "2025-08-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1605299746144-50f009795104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VuaW9yJTIwbGl2aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "climate-change-coastal-properties-kenya-2025",
    title: "Climate Change & Coastal Properties in Kenya 2025: Risks and Resilience Strategies",
    excerpt: "Examine the impact of climate change (sea-level rise, erosion) on Kenyan coastal real estate. Risks for property owners and strategies for building resilience.",
    author: "Prof. Ali Hassan (Environmental Scientist)",
    category: "Sustainable Development",
    date: "2025-08-15",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1509305717900-84f40e786d82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29hc3RhbCUyMGVyb3Npb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "real-estate-auctions-kenya-2025-guide",
    title: "Buying Property at Auction in Kenya 2025: A Guide to Opportunities and Pitfalls",
    excerpt: "Real estate auctions can offer bargains but come with risks. This guide covers the auction process in Kenya, finding listings, due diligence, and tips for successful bidding.",
    author: "Mark Kariuki (Auctioneer)",
    category: "Buying & Selling",
    date: "2025-08-20",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1568530799009-a4420531800b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "renovating-older-properties-kenya-profit-2025",
    title: "Flipping Houses in Kenya 2025: A Guide to Renovating Older Properties for Profit",
    excerpt: "Discover the art of renovating older Kenyan properties for resale or rental income. Tips on property selection, budgeting, value-adding renovations, and navigating the market.",
    author: "Grace Wacera (Interior Designer)",
    category: "Development",
    date: "2025-08-25",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2UlMjByZW5vdmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    featured: true
  },
  {
    id: "women-in-kenyan-real-estate-2025",
    title: "The Rising Influence of Women in Kenyan Real Estate 2025: Trends and Opportunities",
    excerpt: "Explore the increasing role of women as investors, developers, homeowners, and professionals in Kenya's real estate sector. Challenges, success stories, and future outlook.",
    author: "Dr. Tabitha Njeri",
    category: "Market Trends",
    date: "2025-09-01",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1551829143-a819d5eDEC03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwYXJjaGl0ZWN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "serviced-apartments-vs-traditional-rentals-kenya-2025",
    title: "Serviced Apartments vs. Traditional Rentals in Kenya 2025: An Investor's Dilemma",
    excerpt: "Compare investment potential, operational demands, and target markets for serviced apartments versus traditional long-term rentals in Kenya's 2025 property landscape.",
    author: "Paul Kimutai",
    category: "Investment",
    date: "2025-09-05",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50JTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "land-use-zoning-changes-nairobi-2025",
    title: "Nairobi's Evolving Skyline: Understanding Land Use and Zoning Changes in 2025",
    excerpt: "Explore recent and proposed changes to land use and zoning regulations in Nairobi County for 2025. Implications for developers, investors, and residents.",
    author: "Charles Mbugua (Urban Planner)",
    category: "Legal & Regulations",
    date: "2025-09-10",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1502920514358-906c5d41a138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJiYW4lMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    featured: true
  },
  {
    id: "digital-nomads-kenya-real-estate-impact-2025",
    title: "Digital Nomads in Kenya 2025: Impact on Niche Rental Markets and Co-working Spaces",
    excerpt: "Kenya is attracting a growing number of digital nomads. Explore their housing preferences, impact on specific rental markets (e.g., Diani, Nairobi suburbs), and demand for co-working spaces.",
    author: "Wanjiku Kiarie (Travel & Lifestyle Writer)",
    category: "Market Trends",
    date: "2025-09-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMG5vbWFkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "agricultural-land-investment-kenya-2025",
    title: "Investing in Green Gold: Agricultural Land Investment Trends in Kenya 2025",
    excerpt: "Beyond residential and commercial, explore the lucrative opportunities in agricultural land investment in Kenya. Focus on high-value crops, agribusiness, and key farming regions.",
    author: "Joseph Karienye (Agribusiness Consultant)",
    category: "Land Investment",
    date: "2025-09-20",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1557095603-1510d20a5231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWdyaWN1bHR1cmUlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    featured: false
  },
  {
    id: "nairobi-real-estate-market-trends-2025",
    title: "Nairobi Real Estate Market Trends in 2025: What Buyers and Investors Should Know",
    excerpt: "Explore the latest real estate trends in Nairobi in 2025, including emerging neighborhoods, pricing shifts, and investment opportunities.",
    content: "The Nairobi real estate market is evolving rapidly in 2025...",
    author: "Linda Wanjiku",
    category: "Market Trends",
    date: "2025-05-29",
    readTime: "12 min read",
    image: "https://ext.same-assets.com/7894561230/nairobi-market-trends.jpg"
  },
  {
    id: "ngong-heritage-villas-opportunity-kenyan-buyers",
    title: "Ngong Heritage Villas: A Hidden Gem for Kenyan Homebuyers and Investors",
    excerpt: "Discover why Ngong Heritage Villas are gaining popularity among Nairobi’s professionals and families seeking modern living and affordable prices.",
    content: "Ngong Heritage Villas offer a blend of value and lifestyle in one of Kenya’s fastest-developing regions...",
    author: "James Kariuki",
    category: "Lifestyle & Development",
    date: "2025-05-28",
    readTime: "9 min read",
    image: "https://ext.same-assets.com/3456712398/ngong-heritage-villas.jpg"
  },
  {
    id: "affordable-housing-policy-kenya-2025",
    title: "Understanding Kenya's Affordable Housing Policy in 2025",
    excerpt: "A deep dive into Kenya’s housing agenda, key projects, and how you can benefit as a buyer or investor.",
    content: "Kenya's Affordable Housing Programme (AHP) is transforming urban development...",
    author: "Faith Njeri",
    category: "Government & Policy",
    date: "2025-05-29",
    readTime: "11 min read",
    image: "https://ext.same-assets.com/8912374560/affordable-housing-kenya.jpg"
  },
  {
    id: "diaspora-property-investment-guide-kenya",
    title: "The Diaspora Guide to Investing in Kenyan Real Estate in 2025",
    excerpt: "Everything Kenyans abroad need to know about safely buying property at home.",
    content: "Diaspora investment has fueled a major part of Kenya’s real estate growth...",
    author: "Daniel Mwangi",
    category: "Diaspora Investment",
    date: "2025-05-29",
    readTime: "10 min read",
    image: "https://ext.same-assets.com/7789234510/diaspora-investment.jpg"
  },
  {
    id: "title-deeds-buying-land-kenya-2025",
    title: "Title Deeds and Due Diligence: How to Buy Land Safely in Kenya",
    excerpt: "Avoid common land-buying mistakes in Kenya by understanding title verification and legal checks.",
    content: "Land fraud continues to challenge buyers in Kenya...",
    author: "Susan Otieno",
    category: "Legal & Land Ownership",
    date: "2025-05-29",
    readTime: "8 min read",
    image: "https://ext.same-assets.com/1928374650/title-deeds-kenya.jpg"
  },
  {
    id: "gated-communities-vs-standalone-homes-kenya",
    title: "Gated Communities vs. Standalone Homes: Which is Better in Kenya?",
    excerpt: "Explore the pros and cons of buying in gated communities versus individual plots in Kenya.",
    content: "Both options offer unique advantages for homeowners...",
    author: "Peter Waweru",
    category: "Lifestyle & Development",
    date: "2025-05-29",
    readTime: "10 min read",
    image: "https://ext.same-assets.com/1092837465/gated-vs-standalone.jpg"
  },
  {
    id: "land-ownership-women-kenya-2025",
    title: "Women and Land Ownership in Kenya: Rights, Challenges, and Progress",
    excerpt: "A spotlight on how women in Kenya are navigating land ownership amid policy changes and social shifts.",
    content: "In 2025, more Kenyan women are claiming their right to own property...",
    author: "Grace Atieno",
    category: "Social Impact",
    date: "2025-05-29",
    readTime: "9 min read",
    image: "https://ext.same-assets.com/1234567890/women-land-kenya.jpg"
  },
  {
    id: "buying-land-ngong-kiambu-areas",
    title: "Buying Land in Ngong vs. Kiambu: What You Need to Know",
    excerpt: "Compare prices, amenities, growth, and infrastructure in two of Kenya’s most in-demand real estate zones.",
    content: "Ngong and Kiambu are both strategic locations for land buyers...",
    author: "Kevin Muli",
    category: "Land & Locations",
    date: "2025-05-29",
    readTime: "10 min read",
    image: "https://ext.same-assets.com/9081726354/ngong-vs-kiambu.jpg"
  },
  {
    id: "green-building-trends-kenya-2025",
    title: "Green Building Trends in Kenya: Sustainability Meets Profitability",
    excerpt: "Learn how eco-friendly developments are gaining traction in Kenya’s property market.",
    content: "Sustainable construction is no longer a buzzword in Kenya...",
    author: "Emily Chebet",
    category: "Sustainability",
    date: "2025-05-29",
    readTime: "9 min read",
    image: "https://ext.same-assets.com/9182736450/green-buildings-kenya.jpg"
  },
];

const categories = [
  'All',
  'Tips',
  'Guides',
  'Updates',
  'Insights',
  'Investment',
  'Trends',
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = sortedPosts.filter((post) => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-16 pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/20 text-primary"
            >
              Real Estate Blog
            </Badge>
            <h1 className="mb-6 font-radio-canada text-4xl font-bold md:text-6xl">
              Real Estate
              <br />
              <span className="text-primary">Insights</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
              Stay ahead in the property market with expert advice, market
              updates, and insider insights from our real estate professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge className="mb-4 bg-primary text-white">
                Featured Article
              </Badge>
              <h2 className="font-radio-canada text-2xl font-bold text-gray-900">
                Editor's Pick
              </h2>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute left-4 top-4 bg-primary text-white">
                    {featuredPost.category}
                  </Badge>
                </div>
                <CardContent className="flex flex-col justify-center p-8">
                  <div className="mb-4 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span className="mr-4">
                      {formatDate(featuredPost.date)}
                    </span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span className="mr-4">{featuredPost.readTime}</span>
                    <User className="mr-1 h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>

                  <h3 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
                    {featuredPost.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-gray-600">
                    {featuredPost.excerpt}
                  </p>

                  <Button
                    asChild
                    className="w-fit bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/blogs/${featuredPost.id}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-radio-canada text-2xl font-bold text-gray-900">
                {sortedPosts.length} Articles Found
              </h2>
              <p className="mt-1 text-gray-600">
                Latest insights and market updates
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="transform animate-fade-in border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                    <Badge className="absolute left-4 top-4 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span className="mr-3">{formatDate(post.date)}</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mb-3 line-clamp-2 font-radio-canada text-xl font-bold text-gray-900">
                      <Link
                        href={`/blogs/${post.id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-1 h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80"
                      >
                        <Link href={`/blogs/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 font-radio-canada text-xl font-bold text-gray-900">
                No Articles Found
              </h3>
              <p className="mb-6 text-gray-600">
                Try adjusting your search criteria or browse all available
                articles.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {sortedPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-radio-canada text-4xl font-bold">
            Stay Updated with Market Insights
          </h2>
          <p className="mb-8 text-xl text-primary-foreground/80">
            Subscribe to our newsletter for the latest real estate trends, tips,
            and exclusive market analysis.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Enter your email address"
              className="border-0 bg-white text-gray-900"
            />
            <Button variant="secondary" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
