import type { Metadata } from "next";
import PropertiesExplorer from "@/components/properties/PropertiesExplorer";

export const metadata: Metadata = {
  title: "Propiedades — Villas y apartamentos en la Costa del Sol",
  description:
    "Explora villas y apartamentos de lujo en Málaga y la Costa del Sol. Filtra por huéspedes, habitaciones y baños, y descúbrelos en el mapa.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return <PropertiesExplorer />;
}
