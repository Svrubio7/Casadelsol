import Link from "next/link";
import Image from "next/image";
import { mediaUrl } from "@/lib/api";
import type { Property } from "@/lib/types";

export default function PropertyCard({
  property,
  href,
}: {
  property: Property;
  href?: string;
}) {
  const img = mediaUrl(property.main_image);
  return (
    <Link
      href={href ?? `/apartments/${property.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
        {img ? (
          <Image
            src={img}
            alt={`${property.title} en ${property.location}`}
            fill
            sizes="(max-width: 640px) 90vw, 340px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
        {property.discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow">
            {property.discount}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-navy">{property.title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-navy/55">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="3" />
          </svg>
          {property.location}
        </p>
        <div className="mt-3 flex items-center gap-3 text-sm text-navy/70">
          <span><strong>{property.habitaciones}</strong> hab</span>
          <span className="text-navy/20">·</span>
          <span><strong>{property.banos}</strong> baños</span>
          <span className="text-navy/20">·</span>
          <span><strong>{property.capacity}</strong> pers</span>
        </div>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-xs text-navy/50">Desde</span>
          <span className="font-display text-2xl text-navy">€{property.precio}</span>
          <span className="text-xs text-navy/50">/noche</span>
        </div>
      </div>
    </Link>
  );
}
