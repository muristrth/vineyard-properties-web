// src/app/layout.tsx
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Radio_Canada_Big } from 'next/font/google';
import './globals.css';
import ClientBody from './ClientBody';
import { Toaster } from 'sonner'; // Import the Toaster component

// Define your base URL once for consistency, matching your canonical URL
const siteUrl = 'https://vineyardproperties.co.ke';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

const radioCanadaBig = Radio_Canada_Big({
  subsets: ['latin'],
  variable: '--font-radio-canada',
});

export const metadata: Metadata = {
  // Core Metadata
  title: {
    default: 'Buy Properties For Sale Kenya - Vineyard Properties Ltd', // Updated default title
    template: '%s | Vineyard Properties Ltd', // Template for dynamic pages
  },
  description:
    'Properties For Sale Kenya, houses, villas, and land for sale or rent in Kenya. Vineyard Properties Ltd is your trusted Nairobi real estate partner. Discover a wide range of premium properties in the most sought-after locations across Kenya. From luxury estates to affordable homes, we have something for everyone.', // Updated description
  metadataBase: new URL(siteUrl), // Set metadataBase using your actual domain

  // Favicons from previous site
  icons: [
    { rel: 'icon', url: 'https://www.kenyabizlist.com/logos/12598.jpg', type: 'image/jpeg' }, // Using the external URL directly
    { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' }, // You might still have these local ones
    { rel: 'icon', url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' }, // Recommended to keep
  ],

  // Verification meta tags (as found in your previous site)
  // Uncomment and add if you have verification codes
  // verification: {
  //   microsoft: '2FC04AC1E25E49B86623D2B8F224D4F4',
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE', // Add Google verification if you have it
  // },

  // Open Graph for social sharing
  openGraph: {
    title: 'Properties For Sale Kenya - Vineyard Properties Ltd',
    description:
      'Properties For Sale Kenya, houses, villas, and land for sale or rent in Kenya. Vineyard Properties Ltd is your trusted Nairobi real estate partner. Discover a wide range of premium properties in the most sought-after locations across Kenya. From luxury estates to affordable homes, we have something for everyone.',
    url: `${siteUrl}/properties.html`, // Matches your previous canonical for properties
    siteName: 'Vineyard Properties Ltd',
    images: [
      {
        url: 'https://realestateblogpost.com/uploads/images/2021/07/image_750x_60f157b5b5680.jpg', // External image URL
        width: 1200, // Assuming standard OG image size
        height: 630, // Assuming standard OG image size
        alt: 'Properties For Sale Kenya - Vineyard Properties Ltd',
      },
    ],
    type: 'website',
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Properties For Sale Kenya - Vineyard Properties Ltd',
    description:
      'Properties For Sale Kenya, houses, villas, and land for sale or rent in Kenya. Vineyard Properties Ltd is your trusted Nairobi real estate partner. Discover a wide range of premium properties in the most sought-after locations across Kenya. From luxury estates to affordable homes, we have something for everyone.',
    images: ['https://realestateblogpost.com/uploads/images/2021/07/image_750x_60f157b5b5680.jpg'], // External image URL
    // site: '@YourTwitterHandle', // Add if you have one
    // creator: '@YourTwitterHandle', // Add if different from site
  },

  // Canonical URL for the root layout (you had it for properties.html)
  // For the root layout, this should point to the main domain.
  // For other pages, you'd set this on their specific metadata exports.
  alternates: {
    canonical: siteUrl, // Canonical for your main domain
  },

  // Keywords (updated from your previous site)
  keywords: [
    'real estate Kenya',
    'property for sale Kenya',
    'buy house Nairobi',
    'Ngong villas',
    'vineyard properties',
    'property Kenya',
    'rent Nairobi',
    'houses for sale Kenya',
    'villas for sale Kenya',
    'land for sale Kenya',
    'Nairobi real estate partner',
    'premium properties Kenya',
    'luxury estates Kenya',
    'affordable homes Kenya',
  ],

  // Robots meta tag
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  // Authorship/Publisher
  authors: [{ name: 'Vineyard Properties Ltd', url: siteUrl }],
  publisher: 'Vineyard Properties Ltd',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data - RealEstateAgent (from your previous site) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Vineyard Properties Ltd",
              "url": siteUrl, // Consistent with your defined siteUrl
              "logo": "https://www.kenyabizlist.com/logos/12598.jpg", // External logo URL
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Mukoma Road, Odyssey Plaza",
                "addressLocality": "South B",
                "addressRegion": "Nairobi County",
                "postalCode": "00200",
                "addressCountry": "KE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254 729 170 156",
                "contactType": "customer service",
                "areaServed": "KE"
              },
              "sameAs": [
                "https://www.facebook.com/vineyardproperties",
                "https://www.linkedin.com/company/vineyardproperties",
                "https://www.instagram.com/vineyardproperties" // Assuming this is your Instagram handle
              ]
            })
          }}
        />

        {/* Add WebSite Schema (highly recommended) - can be combined with RealEstateAgent if desired */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Vineyard Properties Ltd",
              "url": siteUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/properties?q={search_term_string}`, // Update with your actual search page URL
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
          <meta name="google-site-verification" content="thd6wWPZmsIHGR8SYSG-k_fPtSza33XmHOs05MsOGwo" />
      </head>
      <ClientBody
        className={`${bricolageGrotesque.variable} ${radioCanadaBig.variable} font-sans`}
      >
        {children}
        <Toaster position="top-center" /> {/* Toaster component added inside ClientBody */}
      </ClientBody>
    </html>
  );
}