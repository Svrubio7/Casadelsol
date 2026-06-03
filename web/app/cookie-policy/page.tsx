import type { Metadata } from "next";
import CookiePolicyContent from "@/components/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de Casa del Sol: qué cookies usamos, cómo gestionarlas y tus derechos bajo el GDPR.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
