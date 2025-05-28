import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const featuredProperties = [
  {
    id: 'plot-nrbwest',
    title: '1/4 Acre Prime Plot in Nairobi West Shopping Centre',
    location: 'Nairobi West, Nairobi',
    price: 120000000,
    image: 'https://ext.same-assets.com/2880436944/513979610.jpeg',
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    type: 'Residential Property',
    featured: true,
  },
  {
    id: 'mlolongo-warehouse',
    title: '1/2 acre Warehouse GoDown for sale',
    location: 'Mlolongo, Mombasa Road',
    price: 95000000,
    image: 'https://ext.same-assets.com/2880436944/2452448881.jpeg',
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
    type: 'Luxury Mansion',
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
    type: 'Agricultural Land',
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
    type: 'Luxury Mansion',
    featured: true,
  },
  {
    id: 'edenville-villa',
    title: '3bdrm Villa in Edenville',
    location: 'Kiambu, Kiambu / Kiambu',
    price: 26000000,
    image: 'https://ext.same-assets.com/2880436944/1376571947.jpeg',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: 'Villa',
    featured: false,
  },
];

export default function PropertiesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-medium uppercase tracking-wide text-primary">
            Properties
          </p>
          <h2 className="mb-6 font-radio-canada text-4xl font-bold text-gray-900 md:text-5xl">
            Discover inspiring designed homes.
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Curated homes where elegance, style, and comfort unite.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary px-8 py-3 text-white hover:bg-primary/90"
          >
            <Link href="/properties">
              View All Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
