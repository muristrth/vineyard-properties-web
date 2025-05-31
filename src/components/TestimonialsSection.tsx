'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images: string[] = [
  '/testimonials/IMG-20250530-WA0111.jpg',
  '/testimonials/48427794_933688416755342_6193271600209461248_n.jpg',
  '/testimonials/48404232_933689533421897_5559600264320647168_n.jpg',
  '/testimonials/IMG-20250530-WA0092.jpg',
  '/testimonials/IMG-20250530-WA0086.jpg',
  '/testimonials/IMG-20250530-WA0084.jpg',
  '/testimonials/IMG-20250530-WA0077.jpg',
  '/testimonials/IMG-20250530-WA0152.jpg',
  '/testimonials/WhatsApp Image 2025-05-30 at 19.00.51_536f5f25.jpg',
  '/testimonials/IMG-20250530-WA0145.jpg',
  '/testimonials/IMG-20250530-WA0149.jpg',
  '/testimonials/IMG-20250530-WA0147.jpg',
  '/testimonials/IMG-20250530-WA0152.jpg',
  '/testimonials/IMG-20250530-WA0117.jpg',
  '/testimonials/IMG-20250530-WA0118.jpg',
  '/testimonials/IMG-20250530-WA0119.jpg',
  '/testimonials/IMG-20250530-WA0115.jpg',  
  '/testimonials/IMG-20250530-WA0122.jpg',
  '/testimonials/IMG-20250530-WA0123.jpg',
  '/testimonials/IMG-20250530-WA0124.jpg',
  '/testimonials/Screenshot 2025-05-12 101634.png',
  // Add more image paths as needed
];

export default function TestimonialsSection(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden py-16 bg-white">
      {/* Luxury Persuasive Copy */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Elevating Ownership to a Legacy
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
          Our title deed ceremonies are more than transactions—they are unforgettable moments that
          celebrate trust, prestige, and prosperity. We honor our investors with the dignity and excellence their commitment deserves.
        </p>
        <div className="mt-6">
          <button
            className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition"
          >
          <a href="tel:0729170156" className="flex items-center space-x-2">
          Speak to a Property Agent</a>
           
          </button>
        </div>
      </div>

      {/* Image Marquee */}
      <div className="flex w-max animate-marquee space-x-6">
        {images.concat(images).map((src, idx) => (
          <div key={idx} className="flex-shrink-0" style={{ width: 400, height: 300 }}>
            <img
              src={src}
              alt="Client and director"
              className="w-full h-full object-cover rounded-lg shadow"
              draggable={false}
            />
          </div>
        ))}
      </div>

      
      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
