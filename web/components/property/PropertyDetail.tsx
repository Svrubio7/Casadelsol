"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { mediaUrl } from "@/lib/api";
import type { Property } from "@/lib/types";

const DetailMap = dynamic(() => import("./DetailMap"), { ssr: false });
const WHATSAPP = "https://wa.me/message/LN7BEZCQDMBWP1";

export default function PropertyDetail({ property }: { property: Property }) {
  const images = useMemo(() => {
    const list: string[] = [];
    if (property.main_image) list.push(mediaUrl(property.main_image));
    property.additional_images?.forEach((i) => list.push(mediaUrl(i.image)));
    return list;
  }, [property]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero image */}
      <div className="relative h-64 w-full sm:h-80 md:h-[28rem]">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={`${property.title} en ${property.location} — alquiler vacacional en Málaga`}
            fill
            priority
            sizes="100vw"
            onClick={() => openAt(0)}
            className="cursor-pointer object-cover"
          />
        ) : null}
        {images.length > 1 && (
          <button
            onClick={() => openAt(0)}
            className="absolute bottom-4 right-4 rounded-lg bg-navy/70 px-3 py-2 text-sm font-medium text-cream backdrop-blur transition hover:bg-navy/85"
          >
            Ver {images.length} fotos
          </button>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="flex flex-col gap-8 pb-24 lg:flex-row lg:gap-12 md:pb-8">
          {/* Left */}
          <div className="flex-1">
            <h1 className="font-display text-3xl text-navy md:text-5xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1 text-navy/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              {property.location}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/5 sm:grid-cols-4">
              <Stat value={property.capacity} label="Personas" />
              <Stat value={property.habitaciones} label="Habitaciones" />
              <Stat value={property.banos} label="Baños" />
              <Stat value={`€${property.precio}`} label="Por noche" accent />
            </div>

            <div className="mt-8">
              <h2 className="font-display text-2xl text-navy">Descripción</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-navy/75">
                {property.long_description || property.descripcion}
              </p>
            </div>

            {images.length > 1 && (
              <div className="mt-8">
                <h2 className="font-display text-2xl text-navy">Galería</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {images.slice(1).map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openAt(i + 1)}
                      className="relative aspect-square overflow-hidden rounded-xl"
                    >
                      <Image
                        src={src}
                        alt={`${property.title} — foto ${i + 2}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 45vw, 220px"
                        className="cursor-pointer object-cover transition hover:opacity-90"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {property.latitude != null && property.longitude != null && (
              <div className="mt-8">
                <h2 className="font-display text-2xl text-navy">Ubicación</h2>
                <div className="mt-4 h-72 overflow-hidden rounded-2xl ring-1 ring-navy/10 md:h-96" data-lenis-prevent>
                  <DetailMap lat={property.latitude} lng={property.longitude} />
                </div>
              </div>
            )}
          </div>

          {/* Right — booking (desktop) */}
          <aside className="hidden w-full lg:block lg:w-96">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-navy/5">
              <p className="text-sm text-navy/50">Desde</p>
              <p className="font-display text-4xl text-navy">
                €{property.precio} <span className="text-base text-navy/50">/ noche</span>
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-coral-deep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                10% de descuento reservando directamente
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-xl bg-coral py-4 text-center font-bold text-white transition hover:bg-coral-deep"
              >
                Reservar por WhatsApp
              </a>
              {property.airbnb_link && (
                <a
                  href={property.airbnb_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block rounded-xl border border-navy/15 py-3 text-center font-medium text-navy transition hover:bg-navy/5"
                >
                  Ver en Airbnb
                </a>
              )}
              <p className="mt-4 border-t border-navy/10 pt-4 text-center text-xs text-navy/50">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-navy/10 bg-cream/95 p-4 backdrop-blur lg:hidden">
        <div>
          <span className="text-xs text-navy/50">Desde </span>
          <span className="font-display text-xl text-navy">€{property.precio}</span>
          <span className="text-sm text-navy/50">/noche</span>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-coral px-6 py-3 font-bold text-white"
        >
          Reservar
        </a>
      </div>

      {/* Gallery modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black/95"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between p-4 text-cream">
            <span className="font-medium">
              {index + 1} / {images.length}
            </span>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/15">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div
            className="relative flex flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchX(e.changedTouches[0].screenX)}
            onTouchEnd={(e) => {
              const d = touchX - e.changedTouches[0].screenX;
              if (Math.abs(d) > 50) (d > 0 ? next : prev)();
            }}
          >
            {images.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-4 rounded-full bg-black/50 p-3 text-cream hover:bg-black/70 md:left-8"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`Imagen ${index + 1}`}
              className="max-h-[78vh] max-w-[90vw] rounded-lg object-contain"
            />
            {images.length > 1 && (
              <button
                onClick={next}
                className="absolute right-4 rounded-full bg-black/50 p-3 text-cream hover:bg-black/70 md:right-8"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <div className={`font-display text-2xl ${accent ? "text-coral-deep" : "text-navy"}`}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-wide text-navy/50">{label}</div>
    </div>
  );
}
