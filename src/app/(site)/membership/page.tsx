"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TIERS = [
  {
    name: "Glow",
    price: 89,
    color: "border-line",
    perks: ["1 HydraFacial credit / month", "10% off injectables", "Member pricing on IV therapy", "Skip the wait — priority booking"],
  },
  {
    name: "Radiance",
    price: 179,
    color: "border-gold",
    highlight: true,
    perks: ["1 HydraFacial + 1 IV drip / month", "15% off injectables & laser", "Free annual skin consultation", "Priority booking + late cancellation grace"],
  },
  {
    name: "Luxe",
    price: 349,
    color: "border-emerald",
    perks: ["2 HydraFacials + 2 IV drips / month", "20% off everything, always", "Complimentary quarterly touch-up", "Dedicated concierge booking line"],
  },
];

const RETAIL_FACIAL = 199;
const RETAIL_IV = 89;

const PLANS = [
  { name: "Pay As You Go", base: 0, includedFacials: 0, includedIv: 0, discount: 0 },
  { name: "Glow", base: 89, includedFacials: 1, includedIv: 0, discount: 0.1 },
  { name: "Radiance", base: 179, includedFacials: 1, includedIv: 1, discount: 0.15 },
  { name: "Luxe", base: 349, includedFacials: 2, includedIv: 2, discount: 0.2 },
];

function planCost(plan: (typeof PLANS)[number], facials: number, iv: number) {
  const extraFacials = Math.max(0, facials - plan.includedFacials);
  const extraIv = Math.max(0, iv - plan.includedIv);
  return Math.round(plan.base + extraFacials * RETAIL_FACIAL * (1 - plan.discount) + extraIv * RETAIL_IV * (1 - plan.discount));
}

export default function MembershipPage() {
  const [facialsPerMonth, setFacialsPerMonth] = useState(1);
  const [ivPerMonth, setIvPerMonth] = useState(1);

  const { retailCost, bestPlan, bestCost, savings } = useMemo(() => {
    const retail = planCost(PLANS[0], facialsPerMonth, ivPerMonth);
    const ranked = PLANS.map((plan) => ({ plan, cost: planCost(plan, facialsPerMonth, ivPerMonth) })).sort((a, b) => a.cost - b.cost);
    const best = ranked[0];
    return { retailCost: retail, bestPlan: best.plan, bestCost: best.cost, savings: Math.max(0, retail - best.cost) };
  }, [facialsPerMonth, ivPerMonth]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Membership</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl text-ink md:text-4xl">Your best skin, on a schedule</h1>
      <p className="mt-4 max-w-xl text-ink-dim">
        Membership pricing rewards consistency — the treatments that actually work best when you don&apos;t have to think
        about booking them.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div key={tier.name} className={`relative flex flex-col border-2 bg-panel p-6 ${tier.color}`}>
            {tier.highlight && (
              <span className="absolute -top-3 left-6 bg-gold px-3 py-1 text-xs font-medium uppercase tracking-wide text-ivory">Most Popular</span>
            )}
            <h2 className="font-display text-xl text-ink">{tier.name}</h2>
            <p className="mt-2">
              <span className="font-display text-3xl text-ink">${tier.price}</span>
              <span className="text-sm text-ink-dim"> /month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-ink-dim">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={{ pathname: "/book", query: { category: "wellness" } }}
              className="mt-6 block bg-emerald py-2.5 text-center text-sm font-medium text-ivory transition hover:bg-emerald-bright"
            >
              Join {tier.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-line bg-cream/60 p-6 md:p-10">
        <h2 className="font-display text-xl text-ink md:text-2xl">See what you&apos;d save</h2>
        <p className="mt-2 max-w-md text-sm text-ink-dim">Drag the sliders to match how often you&apos;d actually come in.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <label className="block">
              <span className="flex items-center justify-between text-sm font-medium text-ink">
                HydraFacials per month
                <span className="text-gold">{facialsPerMonth}</span>
              </span>
              <input
                type="range"
                min={0}
                max={4}
                value={facialsPerMonth}
                onChange={(e) => setFacialsPerMonth(Number(e.target.value))}
                className="mt-3 w-full accent-[#b6893f]"
              />
            </label>
            <label className="mt-6 block">
              <span className="flex items-center justify-between text-sm font-medium text-ink">
                IV drips per month
                <span className="text-gold">{ivPerMonth}</span>
              </span>
              <input
                type="range"
                min={0}
                max={4}
                value={ivPerMonth}
                onChange={(e) => setIvPerMonth(Number(e.target.value))}
                className="mt-3 w-full accent-[#b6893f]"
              />
            </label>
          </div>

          <div className="border border-line bg-panel p-6">
            <div className="flex justify-between text-sm">
              <span className="text-ink-dim">Paying retail (no membership)</span>
              <span className="text-ink">${retailCost}/mo</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-ink-dim">Best plan for this: {bestPlan.name}</span>
              <span className="text-ink">${bestCost}/mo</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-medium text-ink">You&apos;d save</span>
              <span className={`font-display text-xl ${savings > 0 ? "text-emerald" : "text-ink-dim"}`}>
                ${savings}/mo
              </span>
            </div>
            {bestPlan.name === "Pay As You Go" && (
              <p className="mt-3 text-xs text-ink-dim">
                At this frequency, paying as you go costs the same or less than a membership — try raising the
                sliders to see when membership starts paying off.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
