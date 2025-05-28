import type { Metadata } from 'next';
import { Bricolage_Grotesque, Radio_Canada_Big } from 'next/font/google';
import './globals.css';
import ClientBody from './ClientBody';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

const radioCanadaBig = Radio_Canada_Big({
  subsets: ['latin'],
  variable: '--font-radio-canada',
});

export const metadata: Metadata = {
  title: 'Vineyard Properties - Luxury Real Estate',
  description:
    'Discover premium properties and luxury real estate with Vineyard Properties. Expert services for buying, selling, and investing in exceptional homes.',
  icons: [
    { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
    { rel: 'icon', url: '/favicon.png', type: 'image/png', sizes: '32x32' },
  ],
  openGraph: {
    title: 'Vineyard Properties',
    description: 'Luxury real estate solutions tailored for you.',
    url: 'https://www.vineyardproperties.co.ke',
    siteName: 'Vineyard Properties',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vineyard Properties',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vineyard Properties',
    description: 'Luxury real estate solutions tailored for you.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody
        className={`${bricolageGrotesque.variable} ${radioCanadaBig.variable} font-sans`}
      >
        {children}
      </ClientBody>
    </html>
  );
}
