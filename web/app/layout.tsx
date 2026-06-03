import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casadelsolholidays.es"),
  title: {
    default: "Casa del Sol — Villas de lujo en la Costa del Sol",
    template: "%s | Casa del Sol",
  },
  description:
    "Villas y apartamentos de lujo para tus vacaciones perfectas en Málaga y la Costa del Sol. Reserva directamente y ahorra un 10% frente a otros portales.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Casa del Sol",
    url: "https://casadelsolholidays.es/",
  },
};

const SITE = "https://casadelsolholidays.es";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Casa del Sol",
      url: `${SITE}/`,
      logo: `${SITE}/brand/paglogo.jpg`,
      image: `${SITE}/hero/casa-hero-poster.jpg`,
      description:
        "Alquiler vacacional y de media estancia en Málaga y la Costa del Sol, y gestión integral de propiedades para propietarios.",
      email: "casadelsolholidays@gmail.com",
      telephone: "+34678318713",
      founder: { "@id": `${SITE}/#belen-lizana` },
      areaServed: [
        { "@type": "City", name: "Málaga" },
        { "@type": "Place", name: "Costa del Sol" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+34678318713",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English"],
      },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE}/#business`,
      name: "Casa del Sol — Alquiler y Gestión de Propiedades",
      url: `${SITE}/`,
      image: `${SITE}/hero/casa-hero-poster.jpg`,
      parentOrganization: { "@id": `${SITE}/#organization` },
      priceRange: "€€",
      telephone: "+34678318713",
      email: "casadelsolholidays@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Málaga",
        addressRegion: "Málaga",
        addressCountry: "ES",
      },
      geo: { "@type": "GeoCoordinates", latitude: 36.7213, longitude: -4.4214 },
      areaServed: { "@type": "Place", name: "Málaga, Costa del Sol" },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#belen-lizana`,
      name: "Belén Lizana",
      jobTitle: "Fundadora y gestora de alquileres",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Casa del Sol",
      inLanguage: "es-ES",
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
