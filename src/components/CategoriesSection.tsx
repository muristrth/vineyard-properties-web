'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';



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
            <p className="text-gray-600">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
