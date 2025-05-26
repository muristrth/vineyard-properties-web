import type { Metadata } from "next";
import { Bricolage_Grotesque, Radio_Canada_Big } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const radioCanadaBig = Radio_Canada_Big({
  subsets: ["latin"],
  variable: "--font-radio-canada",
});

export const metadata: Metadata = {
  title: "Vineyard Properties - Luxury Real Estate",
  description:
    "Discover premium properties and luxury real estate with Vineyard Properties. Expert services for buying, selling, and investing in exceptional homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody className={`${bricolageGrotesque.variable} ${radioCanadaBig.variable} font-sans`}>
        {children}
      </ClientBody>
    </html>
  );
}
