"use client";

import Link from "next/link";
import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-cream/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl text-cream">Casa del Sol</p>
          <p className="mt-2 max-w-sm text-sm text-cream/70">
            Villas y apartamentos de lujo en Málaga y la Costa del Sol.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/60">
            <Link href="/cookie-policy" className="hover:text-coral">
              Política de Cookies
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT))}
              className="hover:text-coral"
            >
              Gestionar Cookies
            </button>
          </div>
        </div>

        <div className="text-sm md:text-right">
          <h4 className="font-semibold text-cream">Contáctanos</h4>
          <p className="mt-2 text-cream/70">
            <a href="mailto:casadelsolholidays@gmail.com" className="hover:text-coral">
              casadelsolholidays@gmail.com
            </a>
          </p>
          <p className="text-cream/70">
            <a
              href="https://wa.me/34678318713"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral"
            >
              +34 678 31 87 13
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {year} Casa del Sol.
      </div>
    </footer>
  );
}
