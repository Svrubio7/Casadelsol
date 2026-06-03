"use client";

import Link from "next/link";
import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl text-navy">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-navy/75">{children}</div>
    </section>
  );
}

export default function CookiePolicyContent() {
  const updated = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-cream py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-navy/5 md:p-12">
          <h1 className="font-display text-4xl text-navy md:text-5xl">Política de Cookies</h1>
          <p className="mt-3 text-sm text-navy/55">
            <strong>Última actualización:</strong> {updated}
          </p>

          <Section title="¿Qué son las cookies?">
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
              visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante
              un período de tiempo.
            </p>
          </Section>

          <Section title="¿Cómo utilizamos las cookies?">
            <p>
              En Casa del Sol utilizamos cookies para mejorar su experiencia de navegación, analizar
              cómo utiliza nuestro sitio web y personalizar el contenido.
            </p>
          </Section>

          <Section title="Tipos de cookies que utilizamos">
            <div className="space-y-4">
              <div className="border-l-4 border-navy pl-4">
                <h3 className="font-semibold text-navy">1. Cookies Necesarias</h3>
                <p className="text-sm text-navy/70">
                  Esenciales para el funcionamiento del sitio; no se pueden desactivar.
                </p>
              </div>
              <div className="border-l-4 border-coral pl-4">
                <h3 className="font-semibold text-navy">2. Cookies de Análisis</h3>
                <p className="text-sm text-navy/70">
                  Usamos Google Analytics para entender de forma anónima cómo se usa el sitio.
                  Proveedor: Google LLC ·{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-coral"
                  >
                    Política de privacidad
                  </a>
                  .
                </p>
              </div>
              <div className="border-l-4 border-gold pl-4">
                <h3 className="font-semibold text-navy">3. Cookies de Marketing</h3>
                <p className="text-sm text-navy/70">
                  Actualmente no utilizamos cookies de marketing; nos reservamos el derecho de
                  hacerlo en el futuro con su consentimiento.
                </p>
              </div>
              <div className="border-l-4 border-cream-deep pl-4">
                <h3 className="font-semibold text-navy">4. Cookies Funcionales</h3>
                <p className="text-sm text-navy/70">
                  Recuerdan sus preferencias para ofrecer una experiencia personalizada.
                </p>
              </div>
            </div>
          </Section>

          <Section title="Gestión de cookies">
            <p>
              Puede gestionar sus preferencias en cualquier momento desde el botón a continuación o
              configurando su navegador para rechazar las cookies.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT))}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-soft"
            >
              Configurar cookies
            </button>
          </Section>

          <Section title="Sus derechos bajo el GDPR">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Derecho a ser informado sobre el uso de cookies</li>
              <li>Derecho a dar o retirar su consentimiento en cualquier momento</li>
              <li>Derecho a acceder, rectificar o eliminar sus datos personales</li>
              <li>Derecho a oponerse al procesamiento de sus datos</li>
            </ul>
            <p>
              Para ejercer estos derechos, contáctenos en{" "}
              <a href="mailto:casadelsolholidays@gmail.com" className="underline hover:text-coral">
                casadelsolholidays@gmail.com
              </a>
              .
            </p>
          </Section>

          <Section title="Contacto">
            <div className="rounded-xl bg-cream p-4 text-sm">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:casadelsolholidays@gmail.com" className="underline hover:text-coral">
                  casadelsolholidays@gmail.com
                </a>
              </p>
              <p className="mt-1">
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/34678318713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-coral"
                >
                  +34 678 31 87 13
                </a>
              </p>
            </div>
          </Section>

          <div className="mt-10 border-t border-navy/10 pt-6">
            <Link
              href="/"
              className="inline-block rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral-deep"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
