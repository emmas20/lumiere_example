import Link from "next/link";
import { TREATMENT_CONTENT } from "@/lib/treatment-content";

export default function TreatmentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Treatments</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl text-ink md:text-4xl">Five ways we help you look and feel your best</h1>

      <div className="mt-14 space-y-14">
        {TREATMENT_CONTENT.map((t, i) => (
          <div key={t.slug} id={t.slug} className="grid scroll-mt-24 gap-8 border-t border-line pt-10 md:grid-cols-[80px_1fr_1fr]">
            <p className="font-display text-sm text-ink-dim">0{i + 1}</p>
            <div>
              <span className="text-2xl">{t.icon}</span>
              <h2 className="mt-2 font-display text-2xl text-ink">{t.name}</h2>
              <p className="mt-1 text-gold">{t.tagline}</p>
              <p className="mt-4 max-w-md text-sm text-ink-dim">{t.description}</p>
            </div>
            <div className="flex flex-col justify-between">
              <ul className="space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-dim">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border border-line bg-panel px-5 py-4">
                <span className="text-sm text-ink-dim">{t.startingPrice}</span>
                <Link href={{ pathname: "/book", query: { category: t.slug } }} className="text-sm font-medium text-gold hover:text-gold-bright">
                  Book a Consult
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
