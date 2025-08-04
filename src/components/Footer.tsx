'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TawkMessenger from '@/components/TawkMessenger';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="border-b border-gray-800/50 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center transform-gpu">
            <div className="relative inline-block group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
                <h2 className="mb-6 font-radio-canada text-4xl font-bold md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent leading-tight">
                  Become part of the 1% Investors in Kenya
                </h2>
                <p className="mb-8 text-xl text-gray-300 max-w-3xl mx-auto">
                  Grow your wealth with tangible assets and premium real estate opportunities
                </p>
                <div className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:blur-lg"></div>
                  <Link 
                    href="/calculators"
                    className="relative block bg-gradient-to-r from-red-600 to-red-500 px-12 py-4 text-xl font-semibold text-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25 active:scale-95"
                  >
                    <span className="relative z-10">Calculate Your Returns</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-1 group">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10">
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full blur opacity-50"></div>
                    <img
                      src="/favicon.ico"
                      alt="Vineyard Properties Logo"
                      className="h-12 w-auto relative z-10 transform transition-transform duration-300 hover:rotate-12"
                    />
                  </div>
                </Link>

                <p className="text-gray-300 leading-relaxed mb-6 transform transition-all duration-300 group-hover:text-white">
                  Your trusted partner in luxury real estate. Discover premium
                  properties and exceptional investment opportunities.
                </p>

                {/* Social Links */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { href: 'https://www.facebook.com/vineyardproperties', icon: 'M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.406.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.127C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z', color: 'hover:text-blue-500', label: 'Facebook' },
                    { href: 'https://x.com/VineyardPropert', icon: 'M24 4.557a9.78 9.78 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195C18.313 2.764 17.032 2 15.617 2 13.164 2 11.25 3.969 11.25 6.29c0 .34.04.67.11.98-4.084-.205-7.705-2.165-10.134-5.144-.36.63-.57 1.36-.57 2.14 0 1.48.76 2.81 1.92 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.7.19-1.45.23-2.22.08.63 1.95 2.45 3.38 4.61 3.42-2.07 1.62-4.68 2.35-7.29 2.04 2.18 1.39 4.76 2.2 7.54 2.2C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56A9.76 9.76 0 0 0 24 4.557z', color: 'hover:text-blue-400', label: 'Twitter' },
                    { href: 'https://www.instagram.com/vineyardproperties/', icon: 'M12 2.163c3.204 0 3.584.012 4.849.07 1.259.058 2.133.25 2.608.415a5.42 5.42 0 0 1 1.937 1.26 5.42 5.42 0 0 1 1.26 1.937c.165.475.357 1.35.415 2.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.058 1.259-.25 2.133-.415 2.608a5.42 5.42 0 0 1-1.26 1.937 5.42 5.42 0 0 1-1.937 1.26c-.475.165-1.35.357-2.608.415-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.259-.058-2.133-.25-2.608-.415a5.42 5.42 0 0 1-1.937-1.26 5.42 5.42 0 0 1-1.26-1.937c-.165-.475-.357-1.35-.415-2.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.058-1.259.25-2.133.415-2.608a5.42 5.42 0 0 1 1.26-1.937 5.42 5.42 0 0 1 1.937-1.26c.475-.165 1.35-.357 2.608-.415 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.015 7.052.072 5.773.129 4.672.314 3.732.634a7.6 7.6 0 0 0-2.756 1.8A7.6 7.6 0 0 0 .634 5.195c-.32.94-.505 2.041-.562 3.32C.015 8.741 0 9.15 0 12c0 2.85.015 3.259.072 4.538.057 1.279.242 2.38.562 3.32a7.6 7.6 0 0 0 1.8 2.756 7.6 7.6 0 0 0 2.756 1.8c.94.32 2.041.505 3.32.562 1.279.057 1.688.072 4.538.072s3.259-.015 4.538-.072c1.279-.057 2.38-.242 3.32-.562a7.6 7.6 0 0 0 2.756-1.8 7.6 7.6 0 0 0 1.8-2.756c.32-.94.505-2.041.562-3.32.057-1.279.072-1.688.072-4.538s-.015-3.259-.072-4.538c-.057-1.279-.242-2.38-.562-3.32a7.6 7.6 0 0 0-1.8-2.756 7.6 7.6 0 0 0-2.756-1.8c-.94-.32-2.041-.505-3.32-.562C15.259.015 14.85 0 12 0z', color: 'hover:text-pink-500', label: 'Instagram' },
                    { href: 'https://www.linkedin.com/company/vineyard-properties-ltd', icon: 'M20.447 20.452H17.21v-5.56c0-1.325-.024-3.03-1.846-3.03-1.848 0-2.131 1.445-2.131 2.936v5.654H9.006V9h3.104v1.561h.043c.433-.822 1.494-1.688 3.076-1.688 3.29 0 3.897 2.164 3.897 4.977v6.602zM5.337 7.433a1.8 1.8 0 1 1 0-3.598 1.8 1.8 0 0 1 0 3.598zM6.86 20.452H3.81V9h3.05v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.272V1.727C24 .774 23.2 0 22.222 0z', color: 'hover:text-blue-600', label: 'LinkedIn' }
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      className={`group/social relative block p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 text-gray-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} hover:shadow-lg hover:shadow-current/25`}
                      aria-label={social.label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-current/10 to-transparent rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                      <svg className="h-5 w-5 relative z-10 transform transition-transform duration-300 group-hover/social:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

         {/* Navigation Columns */}
          {[
            {
              title: 'Properties',
              links: [
                { href: '/properties', label: 'Luxury Villas' },
                { href: '/properties', label: 'Residential Homes' },
                { href: '/properties', label: 'Apartments' },
                { href: '/contact', label: 'Contact Us' }
              ]
            },
            {
              title: 'Company',
              links: [
                { href: '/about', label: 'About' },
                { href: '/blogs', label: 'Blog' },
                { href: '/about', label: 'FAQs' },
                { href: '/investor', label: 'Investor Portal' }
              ]
            },
            {
              title: 'Legal',
              links: [
                { href: '/legal/terms-conditions', label: 'Terms of Service' },
                { href: '/legal/privacy-policy', label: 'Privacy Policy' }
              ]
            }
          ].map((column, columnIndex) => (
            <div key={columnIndex} className="group">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/5">
                  <h4 className="mb-6 font-bold text-xl text-white relative">
                    <span className="bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                      {column.title}
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="group/link relative block text-gray-400 transition-all duration-300 hover:text-white hover:translate-x-2"
                        >
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent h-px"></div>
          <div className="pt-8">
            <div className="flex flex-col items-center justify-between md:flex-row space-y-4 md:space-y-0">
              <div className="group">
                <p className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <span className="font-semibold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                    2008-2025 Vineyard Properties
                  </span>
                  {' '}- Premium Real Estate Solutions for everyday investors
                </p>
              </div>
              
              <div className="flex space-x-8">
                {[
                  { href: '/legal/terms-conditions', label: 'Terms of Service' },
                  { href: '/legal/privacy-policy', label: 'Privacy Policy' }
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group relative text-gray-400 transition-all duration-300 hover:text-white"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-red-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TawkMessenger />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}