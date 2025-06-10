import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TawkMessenger  from '@/components/TawkMessenger';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 font-radio-canada text-3xl font-bold md:text-4xl">
              Become part of the 1% Investors in Kenya and grow your wealth with
              tangible assets.
            </h2>
            <Button className="bg-red-600 px-8 py-3 text-lg text-white shadow-lg hover:bg-red-700">
              Invest Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/favicon.ico"
                alt="Vineyard Properties Logo"
                className="h-12 w-auto"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner in luxury real estate. Discover premium
              properties and exceptional investment opportunities.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/vineyardproperties"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-blue-600"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.406.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.127C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
                </svg>
              </Link>

              {/* Twitter / X */}
              <Link
                href="https://x.com/VineyardPropert"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-blue-400"
                aria-label="Twitter / X"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.78 9.78 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195C18.313 2.764 17.032 2 15.617 2 13.164 2 11.25 3.969 11.25 6.29c0 .34.04.67.11.98-4.084-.205-7.705-2.165-10.134-5.144-.36.63-.57 1.36-.57 2.14 0 1.48.76 2.81 1.92 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.7.19-1.45.23-2.22.08.63 1.95 2.45 3.38 4.61 3.42-2.07 1.62-4.68 2.35-7.29 2.04 2.18 1.39 4.76 2.2 7.54 2.2C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56A9.76 9.76 0 0 0 24 4.557z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/vineyardproperties/"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-pink-500"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.259.058 2.133.25 2.608.415a5.42 5.42 0 0 1 1.937 1.26 5.42 5.42 0 0 1 1.26 1.937c.165.475.357 1.35.415 2.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.058 1.259-.25 2.133-.415 2.608a5.42 5.42 0 0 1-1.26 1.937 5.42 5.42 0 0 1-1.937 1.26c-.475.165-1.35.357-2.608.415-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.259-.058-2.133-.25-2.608-.415a5.42 5.42 0 0 1-1.937-1.26 5.42 5.42 0 0 1-1.26-1.937c-.165-.475-.357-1.35-.415-2.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.058-1.259.25-2.133.415-2.608a5.42 5.42 0 0 1 1.26-1.937 5.42 5.42 0 0 1 1.937-1.26c.475-.165 1.35-.357 2.608-.415 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.015 7.052.072 5.773.129 4.672.314 3.732.634a7.6 7.6 0 0 0-2.756 1.8A7.6 7.6 0 0 0 .634 5.195c-.32.94-.505 2.041-.562 3.32C.015 8.741 0 9.15 0 12c0 2.85.015 3.259.072 4.538.057 1.279.242 2.38.562 3.32a7.6 7.6 0 0 0 1.8 2.756 7.6 7.6 0 0 0 2.756 1.8c.94.32 2.041.505 3.32.562 1.279.057 1.688.072 4.538.072s3.259-.015 4.538-.072c1.279-.057 2.38-.242 3.32-.562a7.6 7.6 0 0 0 2.756-1.8 7.6 7.6 0 0 0 1.8-2.756c.32-.94.505-2.041.562-3.32.057-1.279.072-1.688.072-4.538s-.015-3.259-.072-4.538c-.057-1.279-.242-2.38-.562-3.32a7.6 7.6 0 0 0-1.8-2.756 7.6 7.6 0 0 0-2.756-1.8c-.94-.32-2.041-.505-3.32-.562C15.259.015 14.85 0 12 0z" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/vineyard-properties-ltd"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-blue-700"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452H17.21v-5.56c0-1.325-.024-3.03-1.846-3.03-1.848 0-2.131 1.445-2.131 2.936v5.654H9.006V9h3.104v1.561h.043c.433-.822 1.494-1.688 3.076-1.688 3.29 0 3.897 2.164 3.897 4.977v6.602zM5.337 7.433a1.8 1.8 0 1 1 0-3.598 1.8 1.8 0 0 1 0 3.598zM6.86 20.452H3.81V9h3.05v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.272V1.727C24 .774 23.2 0 22.222 0z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@PropertyAdvisor254"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-red-600"
                aria-label="YouTube"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a2.993 2.993 0 0 0-2.11-2.114C19.525 3.5 12 3.5 12 3.5s-7.525 0-9.388.572a2.993 2.993 0 0 0-2.11 2.114A31.858 31.858 0 0 0 0 12c0 1.967.206 3.862.572 5.814a2.993 2.993 0 0 0 2.11 2.114C4.475 20.5 12 20.5 12 20.5s7.525 0 9.388-.572a2.993 2.993 0 0 0 2.11-2.114A31.858 31.858 0 0 0 24 12a31.858 31.858 0 0 0-.502-5.814zM9.75 15.02V8.98l6.25 3.02-6.25 3.02z" />
                </svg>
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@juliadirectorvpl"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-black"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.87 0h3.8v4.764c1.18.783 2.45 1.164 3.8 1.164v3.95c-1.337.016-2.6-.25-3.8-.8v6.7c0 4.763-3.28 7.222-7.42 7.222C5.283 23 2 19.755 2 15.883c0-3.5 2.29-6.44 5.51-7.404v4.03c-1.15.486-2.04 1.66-2.04 3.374 0 1.92 1.36 3.393 3.32 3.393 2.19 0 3.37-1.533 3.37-3.888V0z" />
                </svg>
              </Link>

              {/* Pinterest */}
              <Link
                href="https://pin.it/32Br9XuXU"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-red-500"
                aria-label="Pinterest"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.372 0 12c0 5.001 3.09 9.263 7.437 11.06-.102-.94-.194-2.386.04-3.42.21-.91 1.354-5.79 1.354-5.79s-.343-.69-.343-1.71c0-1.604.93-2.8 2.087-2.8.986 0 1.462.74 1.462 1.627 0 .99-.63 2.467-.956 3.837-.272 1.144.567 2.075 1.675 2.075 2.006 0 3.547-2.12 3.547-5.18 0-2.713-1.953-4.617-4.746-4.617-3.23 0-5.118 2.42-5.118 4.924 0 .975.375 2.022.842 2.59.092.11.106.206.078.318-.085.35-.276 1.12-.316 1.276-.05.21-.163.254-.382.154-1.415-.653-2.3-2.726-2.3-4.402 0-3.58 2.608-6.874 7.51-6.874 3.94 0 7.01 2.808 7.01 6.558 0 3.92-2.473 7.08-5.904 7.08-1.152 0-2.238-.597-2.607-1.308l-.71 2.5c-.26.963-.96 2.17-1.427 2.91C10.788 23.87 11.39 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Properties</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Residential Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/investor"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Investor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/terms-conditions"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-gray-400 transition-colors hover:text-red-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              2008-2025 Vineyard Properties - Premium Real Estate Solutions for
              everyday investors
            </p>
              
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="/legal/terms-conditions"
                className="text-sm text-gray-400 transition-colors hover:text-red-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/privacy-policy"
                className="text-sm text-gray-400 transition-colors hover:text-red-400"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <TawkMessenger />
    </footer>
  );
}
