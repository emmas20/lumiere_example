import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-lg text-ink">Lumière Medical Spa</span>
            <p className="mt-3 max-w-xs text-sm text-ink-dim">
              Injectables, laser, skin, body, and wellness care — led by licensed providers, in a space designed to slow you down.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-ink">Visit</h4>
            <p className="mt-3 text-sm text-ink-dim">7135 E Camelback Rd, Scottsdale, AZ</p>
            <p className="text-sm text-ink-dim">Tue–Sat, 9:00 AM – 6:00 PM</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-ink">Contact</h4>
            <p className="mt-3 text-sm text-ink-dim">(480) 555-0188</p>
            <p className="text-sm text-ink-dim">hello@lumieremedspa.example</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-ink-dim md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Lumière Medical Spa. All rights reserved.</span>
          <Link
            href="/grow-your-spa"
            className="flex items-center gap-2 border border-line px-3 py-1.5 text-ink-dim transition hover:border-gold hover:text-gold"
          >
            Demo System — Built by Zoroliq · See how this works for your spa
          </Link>
        </div>
      </div>
    </footer>
  );
}
