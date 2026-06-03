"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  getConsent,
  saveConsent,
  OPEN_SETTINGS_EVENT,
  type ConsentPreferences,
} from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) setOpen(true);
    else setAnalytics(existing.analytics);

    const openSettings = () => {
      const cur = getConsent();
      setAnalytics(cur?.analytics ?? false);
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  const persist = (prefs: Partial<ConsentPreferences>) => {
    saveConsent(prefs);
    setOpen(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6"
          role="dialog"
          aria-label="Consentimiento de cookies"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-cream/95 p-5 shadow-2xl backdrop-blur md:p-6">
            <p className="font-display text-2xl text-navy">Cookies</p>
            <p className="mt-2 text-sm leading-relaxed text-navy/75">
              Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.
              Puedes aceptar todas, rechazarlas o personalizar tus preferencias. Consulta
              nuestra{" "}
              <a href="/cookie-policy" className="font-semibold underline hover:text-coral">
                política de cookies
              </a>
              .
            </p>

            {showSettings && (
              <label className="mt-4 flex items-center justify-between rounded-lg border border-navy/10 bg-white/60 px-4 py-3">
                <span className="text-sm font-medium text-navy">
                  Analítica
                  <span className="block text-xs font-normal text-navy/60">
                    Google Analytics para entender el uso del sitio.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 accent-coral"
                />
              </label>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              {!showSettings ? (
                <button
                  onClick={() => setShowSettings(true)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-navy/70 transition hover:text-navy"
                >
                  Personalizar
                </button>
              ) : (
                <button
                  onClick={() => persist({ analytics })}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-navy/70 transition hover:text-navy"
                >
                  Guardar preferencias
                </button>
              )}
              <button
                onClick={() => persist({ analytics: false })}
                className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
              >
                Rechazar
              </button>
              <button
                onClick={() => persist({ analytics: true, marketing: true, functional: true })}
                className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coral-deep"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
