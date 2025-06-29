'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuToggle, setShowMenuToggle] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowMenuToggle(currentScrollY < lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
    { name: 'Media Gallery', href: '/media' },
    { name: 'Contact', href: '/contact' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Investor Portal', href: '/investor' },
  ];

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white backdrop-blur-md transition-shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/favicon.ico" alt="Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center space-x-6 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative text-sm font-medium text-black transition-colors hover:text-red-600"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact & Call Button */}
            <div className="hidden items-center space-x-4 md:flex">
              <Button className="bg-red-600 text-white hover:bg-black-700">
              <a href="tel:0729170156" className="flex items-center space-x-2">
                Call Now
              </a>
              </Button>
            </div>

            {/* Mobile Toggle */}
            {showMenuToggle && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-red-600 md:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="text-sm font-medium">Menu</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu with animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white shadow-md border-t border-gray-100 px-4 py-4 space-y-4"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={menuItemVariants}
                >
                  <Link
                    href={item.href}
                    className="block font-medium text-gray-700 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t pt-4">
                <div className="mb-3 flex items-center space-x-1 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>0729-170-156</span>
                </div>
                <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

    </>
  );
}
