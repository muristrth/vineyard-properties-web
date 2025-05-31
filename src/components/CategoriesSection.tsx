'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'residential-homes',
    title: 'Residential Homes',
    description:
      'Experience elegance and comfort with our exclusive residential homes, designed for sophisticated living.',
    image:
      'https://th.bing.com/th/id/R.d50283442ec388701317ecce78feda66?rik=%2bdYy0zoC8SXrTw&pid=ImgRaw&r=0',
    link: '/properties',
  },
  {
    id: 'luxury-villas',
    title: 'Luxury Apartments',
    description:
      'Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.',
    image:
      'https://mls5ina675wh.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/https://tourkenya.co.ke/wp-content/uploads/2024/04/527267392.jpg',
    link: '/properties',
  },
  {
    id: 'commercial',
    title: 'Commercial Property',
    description:
      'Our wide variety of available properties ensures that you get what you are looking for.',
    image:
      'https://th.bing.com/th/id/R.6cba2f42eb012960db96a405c7de203e?rik=%2fsVvqLmwdfD0nw&pid=ImgRaw&r=0',
    link: '/properties',
  },
  {
    id: 'land',
    title: 'Prime Land',
    description:
      'We have a rich selection of both freehold and leasehold land that is ready and ideal for development.',
    image:
      'https://static.vecteezy.com/system/resources/previews/014/445/763/non_2x/land-plot-for-building-house-aerial-view-land-field-with-pins-pin-location-for-housing-subdivision-residential-development-owned-sale-rent-buy-or-investment-home-or-house-expand-the-city-suburb-free-photo.jpg',
    link: '/properties',
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-medium uppercase tracking-wide text-red-600">
            Categories
          </p>
          <h2 className="mb-6 font-radio-canada text-4xl font-bold text-gray-900 md:text-5xl">
            Explore best properties with expert services.
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Discover a diverse range of premium properties, from luxurious
            apartments to spacious villas, tailored to your needs.
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-red-600 px-8 py-3 text-white shadow-lg hover:bg-red-700"
            >
              <Link href="/properties">
                View Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-2 font-radio-canada text-xl font-bold transition-colors group-hover:text-red-400">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-200 opacity-90 transition-opacity group-hover:opacity-100">
                  {category.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-3 flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="p-6">
            <div className="mb-2 font-radio-canada text-4xl font-bold text-gray-900">
              5000+
            </div>
            <p className="text-gray-600">Premium Properties Sold</p>
          </div>
          <div className="p-6">
            <div className="mb-2 font-radio-canada text-4xl font-bold text-gray-900">
              2500+
            </div>
            <p className="text-gray-600">Happy Investors</p>
          </div>
          <div className="p-6">
            <div className="mb-2 font-radio-canada text-4xl font-bold text-gray-900">
              20+
            </div>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
