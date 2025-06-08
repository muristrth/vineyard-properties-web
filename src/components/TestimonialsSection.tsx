'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    image: '/testimonials/IMG-20250530-WA0111.jpg',
    quote: "This property exceeded all our expectations. Absolutely loved every moment of our stay!",
    name: "John Doe",
  },
  {
    image: '/testimonials/48427794_933688416755342_6193271600209461248_n.jpg',
    quote: "A beautiful experience. The attention to detail was incredible.",
    name: "Jane Smith",
  },
  {
    image: '/testimonials/48404232_933689533421897_5559600264320647168_n.jpg',
    quote: "The best vacation ever! Will definitely come back again.",
    name: "Emily Johnson",
  },
  {
    image: '/testimonials/IMG-20250530-WA0092.jpg',
    quote: "Truly luxurious and comfortable. The perfect getaway.",
    name: "Michael Brown",
  },
  {
    image: '/testimonials/IMG-20250530-WA0086.jpg',
    quote: "Fantastic service and amazing views! Highly recommend.",
    name: "Sarah Lee",
  },
];

export default function LuxuryCarousel(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedImage(null);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-100 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-4 md:p-8 bg-white rounded-2xl shadow-xl transition-all hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedImage(testimonial.image)}
            >
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`Testimonial from ${testimonial.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                  draggable={false}
                />
              </div>
              <div className="text-center md:text-left space-y-4 px-2">
                <blockquote className="text-2xl font-light italic text-gray-800 leading-relaxed">
                  “{testimonial.quote}”
                </blockquote>
                <p className="text-base font-semibold text-gray-600">— {testimonial.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full bg-white/5 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full preview"
              width={1600}
              height={1000}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
