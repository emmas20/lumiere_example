"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";

function PlanContent() {
  const id = useSearchParams().get("id") ?? "";
  const { leads, dispatch, hydrated } = useStore();
  const router = useRouter();
  const [asked, setAsked] = useState(false);
  const lead = leads.find((l) => l.id === id);

  if (!hydrated) return null;
  if (!lead || !lead.plan) {
    return <div className="mx-auto max-w-lg px-5 py-24 text-center text-ink-dim">No treatment plan found for this link.</div>;
  }

  function accept() {
    dispatch({ type: "client_accept", leadId: id });
    router.push(`/client/booking?id=${id}`);
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Your Treatment Plan</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Lumière Medical Spa</h1>
      <p className="mt-2 text-ink-dim">Prepared for {lead.client.firstName} {lead.client.lastName}</p>

      <div className="mt-8 border border-line bg-panel p-6">
        <div className="space-y-3">
          {lead.plan.items.map((item) => (
            <div key={item.name} className="flex justify-between text-sm">
              <span className="text-ink">{item.name}</span>
              <span className="text-ink-dim">${item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-4">
          <span className="font-medium text-ink">Total</span>
          <span className="font-display text-xl text-gold">${lead.plan.total.toLocaleString()}</span>
        </div>
      </div>

      {lead.status === "accepted" ? (
        <div className="mt-6 border border-emerald/40 bg-emerald/10 p-4 text-sm text-emerald">
          You&apos;ve already accepted this plan. <Link href={`/client/booking?id=${id}`} className="underline">Continue to booking</Link>.
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={accept} className="bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">Accept Plan</button>
          <button onClick={() => setAsked(true)} className="border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-gold">Ask a Question</button>
        </div>
      )}

      {asked && <p className="mt-4 text-sm text-ink-dim">Message sent — Lumière will reply from {lead.client.email} shortly.</p>}
    </div>
  );
}

export default function ClientPlanPage() {
  return (
    <Suspense fallback={null}>
      <PlanContent />
    </Suspense>
  );
}
