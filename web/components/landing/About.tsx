import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

export default function About() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-5 md:gap-16 md:px-8">
        <Reveal direction="right" className="md:col-span-2">
          <Parallax speed={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-64 overflow-hidden rounded-[2rem] shadow-xl md:w-full">
              <Image
                src="/brand/profile.jpg"
                alt="Propietaria de Casa del Sol"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 16rem, 33vw"
              />
            </div>
          </Parallax>
        </Reveal>

        <div className="md:col-span-3">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-coral">Quién soy</p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight text-navy md:text-5xl">
              Anfitriona, Superhost y apasionada de los viajes
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-navy/75">
            <Reveal delay={0.05} as="p">
              ¡Bienvenidos a Casa del Sol! Soy la orgullosa propietaria y fundadora de esta
              empresa de alquileres vacacionales, dedicada a crear estancias inolvidables. He
              diseñado cada propiedad para combinar comodidad, estilo y un toque del encanto
              local.
            </Reveal>
            <Reveal delay={0.1} as="p">
              Como Superhost en Airbnb, me enorgullece ofrecer un servicio excepcional y
              experiencias personalizadas. Mi objetivo es que cada huésped se sienta bienvenido,
              atendido e inspirado a volver.
            </Reveal>
            <Reveal delay={0.15} as="p">
              También ofrezco gestión de propiedades vacacionales para propietarios que desean
              generar ingresos sin el estrés de las operaciones diarias. Convirtamos tu hogar en
              un destino de cinco estrellas.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
