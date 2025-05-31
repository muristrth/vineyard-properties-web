'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Tab categories
const categories = ['All', 'Clients', 'Projects', 'Sites'] as const;
type Category = typeof categories[number];

// Images with category tags
const galleryImages: { src: string; category: Category }[] = [
  { src: 'testimonials/IMG-20250530-WA0068.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0070.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0071.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0072.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0073.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0074.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0075.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0076.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0077.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0078.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0079.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0080.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0081.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0082.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0083.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0084.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0085.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0086.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0087.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0088.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0089.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0090.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0091.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0092.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0093.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0094.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0111.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0112.jpg', category: 'Clients' },
  { src: 'testimonials/IMG-20250530-WA0113.jpg', category: 'Clients' },
  { src: '/p17 heritage/IMG-20250421-WA0091.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0092.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0093.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0094.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0095.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0096.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0097.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0098.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0099.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0101.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0102.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0103.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0104.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0105.jpg', category: 'Projects' },
  { src: '/p17 heritage/IMG-20250421-WA0106.jpg', category: 'Projects' },
  { src: '/p15 kite 1M/20180707_105836.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_105840.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_105841.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_110935.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_111014.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_111022.jpg', category: 'Sites' },
  { src: '/p15 kite 1M/20180707_111029.jpg', category: 'Sites' },
];

export default function BrandShowcasePage(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('All');

  const filteredImages =
    activeTab === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow py-16 px-4 space-y-20">
        {/* Luxury Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            A Legacy Captured in Moments
          </h1>
          <p className="text-lg text-gray-700">
            Explore the rich tapestry of our journey — from high-level executive
            partnerships to impactful developments across the region. These moments are a
            testament to our commitment to excellence, trust, and our distinguished clientele.
          </p>
        </motion.div>

        {/* Featured Video 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Heritage Villas Highlights
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-xl overflow-hidden">
            <video src="/testimonial.mp4" controls className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Featured Video 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Who is Vineyard Properties?
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-xl overflow-hidden">
            <video src="/feature.mp4" controls className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Tab Filter */}
        <div className="text-center mb-8">
          <div className="inline-flex space-x-3 bg-gray-100 rounded-full p-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  activeTab === cat
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredImages.map(({ src }, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Gallery ${i}`}
                onClick={() => setSelectedImage(src)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="object-cover rounded-lg shadow hover:scale-105 transition duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
