import Reveal from "@/components/motion/Reveal";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const KeyIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const BuildingIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
  </svg>
);

const PinIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const items = [
  {
    icon: KeyIcon,
    title: "Alquiler vacacional",
    body: "Villas y apartamentos cuidadosamente seleccionados en los mejores rincones de la Costa del Sol, listos para que solo te preocupes de disfrutar.",
  },
  {
    icon: BuildingIcon,
    title: "Gestión de propiedades",
    body: "¿Tienes una propiedad? La convertimos en un destino de cinco estrellas: huéspedes, limpieza, marketing y mantenimiento, sin estrés para ti.",
  },
  {
    icon: PinIcon,
    title: "Viajes a medida",
    body: "Diseñamos experiencias personalizadas —playa, golf, cultura y gastronomía— para que tu estancia sea tan única como tú.",
  },
];

export default function Services() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-coral">Nuestros servicios</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-light leading-tight text-navy md:text-6xl">
            Todo lo que necesitas para unas vacaciones perfectas
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.1}
              className="group rounded-3xl bg-white p-8 ring-1 ring-navy/5 transition-shadow duration-500 hover:shadow-xl md:p-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-deep text-navy">
                {item.icon}
              </div>
              <h3 className="mt-6 font-display text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
