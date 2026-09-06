"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  { href: "/quiz", label: "Find My Treatment" },
  { href: "/membership", label: "Membership" },
  { href: "/automation", label: "How It Works" },
  { href: "/grow-your-spa", label: "For Spa Owners" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald font-display text-sm font-semibold text-ivory">L</span>
          <span className="font-display text-lg tracking-tight text-ink">Lumière Medical Spa</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-dim transition hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="bg-emerald px-5 py-2 text-sm font-medium text-ivory transition hover:bg-emerald-bright"
          >
            Book a Consult
          </Link>
        </nav>

        <button aria-label="Toggle menu" className="flex flex-col gap-1.5 lg:hidden" onClick={() => setOpen((o) => !o)}>
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-4 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-ink-dim">
              {l.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="mt-2 bg-emerald px-5 py-3 text-center text-sm font-medium text-ivory">
            Book a Consult
          </Link>
        </nav>
      )}
    </header>
  );
}
