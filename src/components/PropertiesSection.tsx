import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredProperties = [
  {
    id: "serenity-height-villas",
    title: "Serenity Height Villas",
    location: "15 S Aurora Ave, Miami",
    price: 570000,
    image: "https://ext.same-assets.com/2009473017/3139036848.svg",
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
    type: "Villa",
    featured: true
  },
  {
    id: "mountain-retreat-villa",
    title: "Mountain Retreat Villa",
    location: "18 S Aurora Ave, Miami",
    price: 575000,
    image: "https://ext.same-assets.com/2009473017/1292219655.jpeg",
    bedrooms: 5,
    bathrooms: 2,
    area: 150,
    type: "Villa"
  },
  {
    id: "vista-grand",
    title: "Vista Grand",
    location: "Modern Luxe Villa",
    price: 580000,
    image: "https://ext.same-assets.com/2009473017/742755443.jpeg",
    bedrooms: 3,
    bathrooms: 4,
    area: 180,
    type: "Modern Villa"
  },
  {
    id: "maplewood-residence",
    title: "Maplewood Residence",
    location: "12 Emerald Heights, Los Angeles",
    price: 590000,
    image: "https://ext.same-assets.com/2009473017/3432988897.jpeg",
    bedrooms: 6,
    bathrooms: 3,
    area: 200,
    type: "Residence"
  },
  {
    id: "whispering-pines",
    title: "Whispering Pines",
    location: "25 Skyline Boulevard, San Diego",
    price: 710000,
    image: "https://ext.same-assets.com/2009473017/1802305335.jpeg",
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    type: "Modern Home"
  },
  {
    id: "catalyst-center",
    title: "The Catalyst Center",
    location: "18 Sapphire Bay Road, Naples",
    price: 630000,
    image: "https://ext.same-assets.com/2009473017/2758244008.jpeg",
    bedrooms: 4,
    bathrooms: 2,
    area: 130,
    type: "Center"
  }
];

export default function PropertiesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-4 uppercase tracking-wide">Properties</p>
          <h2 className="text-4xl md:text-5xl font-radio-canada font-bold text-gray-900 mb-6">
            Discover inspiring designed homes.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Curated homes where elegance, style, and comfort unite.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <Link href="/properties">
              View All Listings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
