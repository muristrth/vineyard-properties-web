'use client'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import PropertiesSection from '@/components/PropertiesSection';
import FeaturedPropertySection from '@/components/FeaturedPropertySection';
import TestimonialsSection from '@/components/TestimonialsSection';

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="space-y-16">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CategoriesSection />
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PropertiesSection />
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FeaturedPropertySection />
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialsSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
