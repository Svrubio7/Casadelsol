"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "motion/react";
import Link from "next/link";
import { getFeaturedProperties } from "@/lib/api";
import type { Property } from "@/lib/types";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/motion/Reveal";

const SPEED = 50; // px per second

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loaded, setLoaded] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    let active = true;
    getFeaturedProperties()
      .then((data) => active && setProperties(data))
      .finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, []);

  // JS-driven marquee: unaffected by the global prefers-reduced-motion CSS reset,
  // and trivially pausable on hover. The track holds two copies of the list, so
  // wrapping at half its width loops seamlessly.
  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || paused.current) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    offset.current -= (delta / 1000) * SPEED;
    if (-offset.current >= half) offset.current += half;
    track.style.transform = `translate3d(${offset.current}px,0,0)`;
  });

  const loop = properties.length > 0 ? [...properties, ...properties] : [];

  return (
    <section id="propiedades" className="bg-cream-deep/40 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-coral">Propiedades destacadas</p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight text-navy md:text-6xl">
              Alojamientos que enamoran
            </h2>
          </div>
          <Link
            href="/properties"
            className="shrink-0 rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-cream"
          >
            Ver todas
          </Link>
        </Reveal>
      </div>

      {properties.length > 0 ? (
        <div
          className="group relative mt-14 overflow-hidden"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-deep/60 to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-deep/60 to-transparent md:w-28" />

          <ul ref={trackRef} className="flex w-max gap-6 will-change-transform md:gap-8">
            {loop.map((p, i) => (
              <li key={`${p.id}-${i}`} className="w-[280px] shrink-0 sm:w-[320px]">
                <PropertyCard property={p} href="/properties" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mt-14 text-navy/50">
            {loaded
              ? "Pronto encontrarás aquí nuestras propiedades destacadas."
              : "Cargando propiedades…"}
          </p>
        </div>
      )}
    </section>
  );
}
