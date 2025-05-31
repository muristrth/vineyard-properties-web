import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import PropertiesSection from '@/components/PropertiesSection';
import FeaturedPropertySection from '@/components/FeaturedPropertySection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <CategoriesSection />
        <PropertiesSection />
        <FeaturedPropertySection />
         </main>
      <Footer />
    </div>
  );
}
