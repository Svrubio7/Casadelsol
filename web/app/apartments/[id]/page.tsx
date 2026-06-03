import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperty, mediaUrl } from "@/lib/api";
import PropertyDetail from "@/components/property/PropertyDetail";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p) return { title: "Propiedad no encontrada" };
  const desc = (p.descripcion || "").slice(0, 160);
  const image = mediaUrl(p.main_image);
  return {
    title: `${p.title} en ${p.location} — Vacaciones en Málaga`,
    description: `${desc}${desc.length === 160 ? "…" : ""} Reserva directamente y ahorra un 10%.`,
    alternates: { canonical: `/apartments/${id}` },
    openGraph: {
      title: `${p.title} — Vacaciones en Málaga`,
      description: desc,
      images: image ? [image] : [],
    },
  };
}

export default async function PropertyPage({ params }: Params) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.title,
    description: property.long_description || property.descripcion,
    image: mediaUrl(property.main_image) || undefined,
    priceRange: `Desde €${property.precio}/noche`,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Málaga",
      addressCountry: "ES",
    },
    geo:
      property.latitude != null && property.longitude != null
        ? {
            "@type": "GeoCoordinates",
            latitude: property.latitude,
            longitude: property.longitude,
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetail property={property} />
    </>
  );
}
