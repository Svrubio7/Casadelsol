"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const WHATSAPP = "https://wa.me/message/LN7BEZCQDMBWP1";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    // Stay seamless over the whole pinned hero; go solid only once it's scrolled past.
    const heroEl = document.querySelector("main section");
    const update = () => {
      const heroBottom = heroEl
        ? (heroEl as HTMLElement).offsetTop + (heroEl as HTMLElement).offsetHeight - window.innerHeight - 80
        : window.innerHeight;
      setSolid(window.scrollY > heroBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-cream/85 backdrop-blur border-b border-navy/10 py-2"
          : "bg-gradient-to-b from-black/35 to-transparent py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/paglogodark.jpg"
            alt="Casa del Sol"
            width={36}
            height={36}
            className="h-8 w-auto rounded"
          />
          <span
            className={cn(
              "font-display text-lg tracking-wide transition-colors duration-500",
              solid ? "text-navy" : "text-cream",
            )}
          >
            CASA DEL SOL
          </span>
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <Link
            href="/properties"
            className={cn(
              "hidden text-sm font-medium transition-colors duration-500 hover:text-coral sm:inline",
              solid ? "text-navy/80" : "text-cream/90",
            )}
          >
            Propiedades
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-500",
              solid
                ? "bg-coral text-white hover:bg-coral-deep"
                : "bg-cream/15 text-cream backdrop-blur-sm border border-cream/30 hover:bg-cream/25",
            )}
          >
            Contáctanos
          </a>
        </div>
      </nav>
    </header>
  );
}
