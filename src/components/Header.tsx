"use client";

import { useState } from "react";
import Link from "next/link";
import { VESTIGINGEN } from "@/lib/locations";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/reparatieprijzen", label: "Reparaties" },
  { href: "/verkoop-je-iphone", label: "Verkoop je iPhone" },
  { href: "/contact", label: "Contact" },
];

export function Header({ siteNaam }: { siteNaam: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="bg-tc-paars text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap justify-center gap-x-1 text-center">
          <span>In</span>
          {VESTIGINGEN.map((v, i) => (
            <span key={v.plaats}>
              {" "}
              <span className="font-semibold">{v.plaats}</span>
              {i < VESTIGINGEN.length - 1 ? (i === VESTIGINGEN.length - 2 ? " en" : ",") : ""}
            </span>
          ))}
        </div>
      </div>
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white font-bold text-lg"
              style={{ background: "var(--tc-paars)" }}
            >
              R
            </span>
            <span className="font-bold text-tc-paars leading-tight text-lg">
              {siteNaam}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href} className="hover:text-tc-paars">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-tc-paars"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-neutral-200 px-4 py-2 flex flex-col text-sm font-semibold">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-neutral-100 py-3 last:border-b-0 hover:text-tc-paars"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
