"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getProperties } from "@/lib/api";
import type { Property, PropertyFilters } from "@/lib/types";
import PropertyCard from "@/components/PropertyCard";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-cream-deep/40 text-navy/50">
      Cargando mapa…
    </div>
  ),
});

const empty: PropertyFilters = { capacity: 1, habitaciones: 0, banos: 0 };

export default function PropertiesExplorer() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>(empty);
  const [view, setView] = useState<"list" | "map">("list");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (f: PropertyFilters) => {
    setLoading(true);
    try {
      setProperties(await getProperties(f));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(empty);
  }, [load]);

  return (
    <div className="flex min-h-screen flex-col pt-16">
      {/* Header */}
      <div className="border-b border-navy/10 bg-cream/80 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <h1 className="font-display text-2xl text-navy md:text-3xl">Propiedades</h1>
          <div className="flex rounded-full bg-navy/5 p-1">
            {(["list", "map"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setView(m)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  view === m ? "bg-white text-navy shadow" : "text-navy/50 hover:text-navy"
                }`}
              >
                {m === "list" ? "Lista" : "Mapa"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-navy/10 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Huéspedes
            </label>
            <div className="mt-1.5 flex items-center gap-3">
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, capacity: Math.max(1, (f.capacity ?? 1) - 1) }))
                }
                className="h-9 w-9 rounded-full border border-navy/20 text-navy transition hover:border-coral"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-navy">{filters.capacity}</span>
              <button
                onClick={() => setFilters((f) => ({ ...f, capacity: (f.capacity ?? 1) + 1 }))}
                className="h-9 w-9 rounded-full border border-navy/20 text-navy transition hover:border-coral"
              >
                +
              </button>
            </div>
          </div>

          <Range
            label={`Habitaciones · ${filters.habitaciones}+`}
            max={5}
            value={filters.habitaciones ?? 0}
            onChange={(v) => setFilters((f) => ({ ...f, habitaciones: v }))}
          />
          <Range
            label={`Baños · ${filters.banos}+`}
            max={3}
            value={filters.banos ?? 0}
            onChange={(v) => setFilters((f) => ({ ...f, banos: v }))}
          />

          <div className="flex gap-2">
            <button
              onClick={() => load(filters)}
              className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-soft"
            >
              Aplicar
            </button>
            <button
              onClick={() => {
                setFilters(empty);
                load(empty);
              }}
              className="rounded-full px-4 py-2.5 text-sm text-navy/50 underline-offset-2 hover:underline"
            >
              Restablecer
            </button>
          </div>

          <span className="ml-auto text-sm text-navy/50">
            {loading ? "Buscando…" : `${properties.length} propiedades`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {view === "list" ? (
          <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
            {properties.length === 0 && !loading ? (
              <p className="py-20 text-center text-navy/50">
                No hay propiedades que coincidan con tu búsqueda.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-9rem)] w-full" data-lenis-prevent>
            <PropertyMap properties={properties} />
          </div>
        )}
      </div>
    </div>
  );
}

function Range({
  label,
  max,
  value,
  onChange,
}: {
  label: string;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="min-w-[140px]">
      <label className="block text-xs font-semibold uppercase tracking-wide text-navy/50">
        {label}
      </label>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-coral"
      />
    </div>
  );
}
