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
  { src: '/clients1.jpg', category: 'Clients' },
  { src: '/project1.jpg', category: 'Projects' },
  { src: '/site1.jpg', category: 'Sites' },
  { src: '/client2.jpg', category: 'Clients' },
  { src: '/team.jpg', category: 'Projects' },
  { src: '/construction.jpg', category: 'Sites' },
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
            Featured Showcase
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-xl overflow-hidden">
            <video src="/featured.mp4" controls className="w-full h-full object-cover" />
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
            Client Experience Highlights
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-xl overflow-hidden">
            <video src="/testimonial.mp4" controls className="w-full h-full object-cover" />
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
