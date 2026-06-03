import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import About from "@/components/landing/About";

export const metadata: Metadata = {
  title: "Alquiler Vacacional en Málaga y la Costa del Sol",
  description:
    "Villas y apartamentos con piscina para tus vacaciones o tu media estancia en Málaga y la Costa del Sol. Reserva directa y ahorra un 10%. ¿Tienes una propiedad? La gestionamos por ti.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProperties />
      <About />
    </>
  );
}
