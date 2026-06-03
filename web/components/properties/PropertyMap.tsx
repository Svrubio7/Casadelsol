"use client";

import { useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import { MAPBOX_TOKEN, mediaUrl } from "@/lib/api";
import type { Property } from "@/lib/types";

export default function PropertyMap({ properties }: { properties: Property[] }) {
  const [active, setActive] = useState<Property | null>(null);

  const withCoords = useMemo(
    () => properties.filter((p) => p.latitude != null && p.longitude != null),
    [properties],
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full items-center justify-center bg-cream-deep/40 p-8 text-center text-navy/60">
        Configura <code className="mx-1 rounded bg-navy/10 px-1">NEXT_PUBLIC_MAPBOX_TOKEN</code>{" "}
        para ver el mapa.
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ longitude: -4.4214, latitude: 36.7212, zoom: 10.5 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />
      {withCoords.map((p) => (
        <Marker
          key={p.id}
          longitude={p.longitude!}
          latitude={p.latitude!}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setActive(p);
          }}
        >
          <div className="cursor-pointer rounded-full border-2 border-navy bg-white px-3 py-1 text-sm font-bold text-navy shadow-lg transition hover:bg-navy hover:text-cream">
            €{p.precio}
          </div>
        </Marker>
      ))}
      {active && (
        <Popup
          longitude={active.longitude!}
          latitude={active.latitude!}
          offset={26}
          closeOnClick={false}
          onClose={() => setActive(null)}
          maxWidth="280px"
        >
          <Link href={`/apartments/${active.id}`} className="block w-56">
            {active.main_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaUrl(active.main_image)}
                alt={active.title}
                className="mb-2 h-28 w-full rounded-lg object-cover"
              />
            ) : null}
            <h3 className="font-semibold text-navy">{active.title}</h3>
            <p className="text-xs text-navy/55">{active.location}</p>
            <p className="mt-1 text-sm font-bold text-navy">Desde €{active.precio}/noche</p>
          </Link>
        </Popup>
      )}
    </Map>
  );
}
