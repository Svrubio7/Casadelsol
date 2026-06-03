"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useReducedMotion, useMotionValueEvent } from "motion/react";
import ScrollSequence from "./ScrollSequence";

const WHATSAPP = "https://wa.me/message/LN7BEZCQDMBWP1";
const FRAME_COUNT = 275;
const POSTER = "/hero/casa-hero-poster.jpg";

type Slide = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  cta?: boolean;
};

const slides: Slide[] = [
  {
    eyebrow: "Alquiler vacacional · Málaga",
    title: (
      <>
        Despierta en
        <br />
        <span className="italic font-normal">la Costa del Sol</span>
      </>
    ),
  },
  {
    eyebrow: "Lo que hacemos · 01",
    title: "Alquiler vacacional",
    sub: "Estancias seleccionadas, listas para disfrutar.",
  },
  {
    eyebrow: "Lo que hacemos · 02",
    title: "Gestión de propiedades",
    sub: "Tu casa, cuidada como un cinco estrellas.",
  },
  {
    eyebrow: "Lo que hacemos · 03",
    title: "Viajes a medida",
    sub: "Experiencias diseñadas para ti en la Costa del Sol.",
  },
  { cta: true, title: "Descubre tu próxima escapada" },
];

// progress → active slide index
const THRESHOLDS = [0.2, 0.42, 0.62, 0.82];
function indexFor(v: number) {
  for (let i = 0; i < THRESHOLDS.length; i++) if (v < THRESHOLDS[i]) return i;
  return THRESHOLDS.length;
}

// Layered shadow: a tight dark edge for crisp legibility + a soft halo that
// separates the text from busy/bright frames — without dimming the whole shot.
const SHADOW =
  "[text-shadow:0_1px_2px_rgba(8,20,38,0.7),0_2px_22px_rgba(8,20,38,0.65)]";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = indexFor(v);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const [scrub, setScrub] = useState(false);
  useEffect(() => {
    setScrub(!reduce && window.innerWidth >= 768);
  }, [reduce]);

  if (reduce) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-navy">
        <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy/30" />
        <SlideView slide={slides[0]} />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[340vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy">
        <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
        {scrub && (
          <ScrollSequence
            progress={scrollYProgress}
            frameCount={FRAME_COUNT}
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* Very light tint — keeps frames bright; text legibility comes from the per-slide scrim */}
        <div className="pointer-events-none absolute inset-0 bg-navy/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/10" />

        {/* One statement at a time — only the active slide is mounted */}
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -26 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SlideView slide={slides[active]} />
          </motion.div>
        </AnimatePresence>

        {/* scroll cue (first slide only) */}
        {active === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SlideView({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {/* localized scrim so text stands out on bright frames without dimming the whole shot */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[115vh] w-[155vw] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(8,20,38,0.55),rgba(8,20,38,0.22)_45%,transparent_72%)]"
      />
      <div className="relative flex flex-col items-center">
        {slide.eyebrow && (
          <p className={`mb-4 text-xs uppercase tracking-[0.35em] text-cream/85 ${SHADOW}`}>
            {slide.eyebrow}
          </p>
        )}
        <h2
          className={`font-display font-light leading-[0.98] text-cream ${SHADOW} ${
            slide.cta ? "text-4xl md:text-6xl" : "text-5xl md:text-7xl"
          }`}
        >
          {slide.title}
        </h2>
        {slide.sub && (
          <p className={`mt-5 max-w-md text-base text-cream/85 md:text-lg ${SHADOW}`}>{slide.sub}</p>
        )}
        {slide.cta && (
          <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="rounded-full bg-coral px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-coral-deep"
            >
              Ver propiedades
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream/40 bg-cream/10 px-8 py-4 font-semibold text-cream backdrop-blur-sm transition hover:bg-cream/20"
            >
              Contáctanos
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
