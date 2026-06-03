"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/api";

export default function DetailMap({ lat, lng }: { lat: number; lng: number }) {
  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full items-center justify-center bg-cream-deep/40 text-sm text-navy/50">
        Mapa no disponible
      </div>
    );
  }
  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ longitude: lng, latitude: lat, zoom: 14 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />
      <Marker longitude={lng} latitude={lat} color="#0C2340" />
    </Map>
  );
}
