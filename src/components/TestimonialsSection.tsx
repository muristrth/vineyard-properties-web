"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily & John Smith",
    role: "Property Buyers",
    image: "https://ext.same-assets.com/2009473017/370944543.jpeg",
    content: "I found my ideal home in no time! The listings were detailed, the photos were accurate, and the whole process felt seamless. Customer service was top-notch, answering all my questions. I will definitely use this platform again in the future!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Real Estate Investor",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    content: "Vineyard Properties helped me build an impressive investment portfolio. Their market insights and professional guidance have been invaluable. The investor portal makes tracking my properties so easy!",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Luxury Home Buyer",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    content: "The level of service and attention to detail exceeded my expectations. From the initial consultation to closing, every step was handled professionally. Our dream home is now a reality!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-4 uppercase tracking-wide">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-radio-canada font-bold mb-6">
            What our clients say
          </h2>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <Card className="bg-gray-800 border-gray-700 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Quote Icon */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="relative">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-primary/20">
                      <AvatarImage src={current.image} alt={current.name} />
                      <AvatarFallback className="bg-primary text-white text-lg">
                        {current.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 italic">
                    "{current.content}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <h4 className="text-xl font-radio-canada font-bold text-white mb-1">
                      {current.name}
                    </h4>
                    <p className="text-gray-400">{current.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
