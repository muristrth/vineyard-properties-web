'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Promon Travellers',
    role: 'Heritage Villas Buyers',
    image: '/testimonials/banner.jpg',
    content:
      'Heritage Villas Ngong 46 offers an incredible opportunity for anyone looking to own a home in a serene and well-developed area. The houses are beautifully designed with modern finishes, spacious interiors, and a peaceful environment, making them perfect for families or investment.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Johnson Mwangi',
    role: 'Land Investor',
    image: '/testimonials/48427794_933688416755342_6193271600209461248_n.jpg',
    content:
      'Vineyard Properties helped me build an impressive investment portfolio. Their market insights and professional guidance have been invaluable. The investor portal makes tracking my properties so easy!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael N',
    role: 'Land Investor',
    image: '/testimonials/48404232_933689533421897_5559600264320647168_n.jpg',
    content:
      'The level of service and attention to detail exceeded my expectations. From the initial consultation to closing, every step was handled professionally. Our dream home is now a reality!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="overflow-hidden bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-medium uppercase tracking-wide text-primary">
            Testimonials
          </p>
          <h2 className="mb-6 font-radio-canada text-4xl font-bold md:text-5xl">
            What our clients say
          </h2>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <Card className="mx-auto max-w-4xl border-gray-700 bg-gray-800">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                {/* Quote Icon */}
                <div className="flex justify-center lg:col-span-1 lg:justify-start">
                  <div className="relative">
                    <Avatar className="w-554 h-324 md:w-552 md:h-332 ring-4 ring-primary/20">
                      <AvatarImage src={current.image} alt={current.name} />
                      <AvatarFallback className="bg-primary text-lg text-white">
                        {current.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <Quote className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center lg:col-span-2 lg:text-left">
                  {/* Stars */}
                  <div className="mb-4 flex justify-center lg:justify-start">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6 text-lg italic leading-relaxed text-gray-300 md:text-xl">
                    "{current.content}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <h4 className="mb-1 font-radio-canada text-xl font-bold text-white">
                      {current.name}
                    </h4>
                    <p className="text-gray-400">{current.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="sm"
              className="h-12 w-12 rounded-full border-gray-600 text-gray-300 hover:bg-red-600 hover:text-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="sm"
              className="h-12 w-12 rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-black"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
