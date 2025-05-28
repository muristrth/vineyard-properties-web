import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
    featured?: boolean;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group transform overflow-hidden border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Featured Badge */}
          {property.featured && (
            <Badge className="absolute left-4 top-4 bg-red-600 text-white">
              Featured
            </Badge>
          )}

          {/* Property Type Badge */}
          <Badge
            variant="secondary"
            className="absolute right-4 top-4 bg-white/90 text-gray-700"
          >
            {property.type}
          </Badge>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-6">
          {/* Location */}
          <div className="mb-2 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {property.location}
          </div>

          {/* Title */}
          <h3 className="mb-3 font-radio-canada text-xl font-bold text-gray-900 transition-colors group-hover:text-red-600">
            <Link href={`/properties/${property.id}`}>{property.title}</Link>
          </h3>

          {/* Price */}
          <div className="mb-4">
            <span className="font-radio-canada text-2xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Property Features */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Maximize className="mr-1 h-4 w-4" />
                <span>{property.area}m²</span>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-6 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              asChild
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
