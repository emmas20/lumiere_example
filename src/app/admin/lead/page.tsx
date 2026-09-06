"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import StatusPill from "@/components/StatusPill";
import Timeline from "@/components/Timeline";
import { suggestLineItems } from "@/lib/pricing";
import { TREATMENT_LABELS, PlanLineItem } from "@/lib/types";

function detailRows(details: import("@/lib/types").TreatmentDetails): { label: string; value: string }[] {
  if (details.kind === "injectables") {
    return [
      { label: "Areas", value: details.areas.join(", ") || "—" },
      { label: "Had before", value: details.hasHadBefore ? "Yes" : "No" },
      { label: "Goal", value: details.goal || "—" },
    ];
  }
  if (details.kind === "laser") {
    return [
      { label: "Areas", value: details.areas.join(", ") || "—" },
      { label: "Skin tone", value: details.skinTone || "—" },
      { label: "Prior laser", value: details.priorLaser ? "Yes" : "No" },
    ];
  }
  if (details.kind === "skin") {
    return [
      { label: "Concerns", value: details.concerns.join(", ") || "—" },
      { label: "Skin type", value: details.skinType || "—" },
      { label: "Current routine", value: details.currentRoutine || "—" },
    ];
  }
  if (details.kind === "body") {
    return [
      { label: "Areas", value: details.areas.join(", ") || "—" },
      { label: "Goal", value: details.goal || "—" },
      { label: "Timeline", value: details.timeline || "—" },
    ];
  }
  return [
    { label: "Focus", value: details.focus || "—" },
    { label: "Frequency", value: details.frequency || "—" },
  ];
}

function LeadDetailContent() {
  const id = useSearchParams().get("id") ?? "";
  const { leads, dispatch, hydrated } = useStore();
  const lead = leads.find((l) => l.id === id);

  const [items, setItems] = useState<PlanLineItem[] | null>(null);
  const [sent, setSent] = useState(false);

  const suggested = useMemo(() => (lead ? suggestLineItems(lead) : []), [lead]);
  const activeItems = items ?? suggested;
  const total = activeItems.reduce((s, i) => s + i.price, 0);

  if (!hydrated) return <div className="px-6 py-10 text-ink-dim">Loading…</div>;
  if (!lead) {
    return (
      <div className="px-6 py-10">
        <p className="text-ink-dim">Lead not found.</p>
        <Link href="/admin" className="mt-3 inline-block text-gold hover:text-gold-bright">Back to dashboard</Link>
      </div>
    );
  }

  function updatePrice(i: number, price: number) {
    const base = items ?? suggested;
    setItems(base.map((it, idx) => (idx === i ? { ...it, price } : it)));
  }
  function sendPlan() {
    dispatch({ type: "send_plan", leadId: lead!.id, plan: { items: activeItems, total } });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-10">
      <Link href="/admin" className="text-xs text-ink-dim hover:text-ink">← All leads</Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">{lead.client.firstName} {lead.client.lastName}</h1>
          <p className="mt-1 text-sm text-ink-dim">{TREATMENT_LABELS[lead.category]}{lead.isMember && " · Member"}</p>
        </div>
        <StatusPill status={lead.status} />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <section className="border border-line bg-panel p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Contact</h2>
            <div className="mt-3 grid gap-1 text-sm">
              <p className="text-ink">{lead.client.phone}</p>
              <p className="text-ink">{lead.client.email}</p>
            </div>
          </section>

          <section className="border border-line bg-panel p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Treatment details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {detailRows(lead.details).map((r) => (
                <div key={r.label} className="flex justify-between gap-4">
                  <dt className="text-ink-dim">{r.label}</dt>
                  <dd className="text-right text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border border-line bg-panel p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Preferred timing & notes</h2>
            <p className="mt-3 text-sm text-ink">{lead.preferredDate || "No date given"} {lead.preferredTime && `· ${lead.preferredTime}`}</p>
            <p className="mt-2 text-sm text-ink-dim">{lead.notes || "No notes provided."}</p>
          </section>

          <section className="border border-line bg-panel p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Photos ({lead.photos.length})</h2>
            {lead.photos.length === 0 ? (
              <p className="mt-3 text-sm text-ink-dim">No photos attached.</p>
            ) : (
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {lead.photos.map((p, i) => (
                  <li key={i} className="flex aspect-square flex-col items-center justify-center border border-line bg-ivory p-2 text-center">
                    <span className="text-lg">📷</span>
                    <span className="mt-1 truncate text-[11px] text-ink-dim">{p.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {!lead.plan ? (
            <section className="border border-line bg-panel p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Build the treatment plan</h2>
              <div className="mt-4 space-y-2">
                {activeItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-ink">{item.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-ink-dim">$</span>
                      <input type="number" value={item.price} onChange={(e) => updatePrice(i, Number(e.target.value))} className="w-20 border border-line bg-ivory px-2 py-1 text-right text-ink outline-none focus:border-gold" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="font-medium text-ink">Total</span>
                <span className="font-display text-lg text-gold">${total.toLocaleString()}</span>
              </div>
              <button onClick={sendPlan} className="mt-4 w-full bg-emerald py-2.5 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
                Send Treatment Plan
              </button>
              {sent && <p className="mt-3 text-center text-sm text-emerald">Plan sent successfully — confirmation email & SMS triggered.</p>}
            </section>
          ) : (
            <PlanActions leadId={lead.id} status={lead.status} simHoursElapsed={lead.simHoursElapsed} />
          )}
        </div>

        <div className="space-y-6">
          <section className="border border-line bg-panel p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Automation timeline</h2>
            <div className="mt-4"><Timeline events={lead.timeline} /></div>
          </section>

          {(lead.status === "plan_sent" || lead.status === "accepted") && (
            <Link href={`/client/quote?id=${lead.id}`} className="block border border-line bg-panel p-4 text-center text-sm text-ink-dim transition hover:border-gold hover:text-gold">
              View the client-facing plan page
            </Link>
          )}
          {(lead.status === "booked" || lead.status === "no_show") && (
            <div className="border border-line bg-panel p-4 text-sm text-ink-dim">
              <p className="text-ink">Appointment</p>
              <p className="mt-1">{lead.appointment?.date} · {lead.appointment?.time}</p>
              <p className="mt-1">{lead.appointment?.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlanActions({ leadId, status, simHoursElapsed }: { leadId: string; status: string; simHoursElapsed: number }) {
  const { dispatch } = useStore();
  return (
    <section className="border border-line bg-panel p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-ink-dim">Simulate client response</h2>
      <p className="mt-2 text-xs text-ink-dim">
        In production this happens automatically over real time. For the demo, advance the clock to see the
        conditional follow-up and no-show recovery logic run.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(status === "plan_sent" || status === "follow_up") && (
          <>
            <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 24 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-gold hover:text-gold">Advance 24 hours</button>
            <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 72 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-rose hover:text-rose">Advance 72 hours</button>
            <button onClick={() => dispatch({ type: "client_accept", leadId })} className="border border-emerald/50 bg-emerald/10 px-3 py-2 text-xs text-emerald transition hover:bg-emerald/20">Simulate: Client Accepts</button>
          </>
        )}
        {status === "booked" && (
          <>
            <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 24 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-gold hover:text-gold">Advance to Reminder</button>
            <button onClick={() => dispatch({ type: "mark_completed", leadId })} className="border border-emerald/50 bg-emerald/10 px-3 py-2 text-xs text-emerald transition hover:bg-emerald/20">Mark Visit Completed</button>
            <button onClick={() => dispatch({ type: "mark_no_show", leadId })} className="border border-rose/50 bg-rose/10 px-3 py-2 text-xs text-rose transition hover:bg-rose/20">Simulate: Client No-Shows</button>
          </>
        )}
        {status === "no_show" && (
          <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 1 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-rose hover:text-rose">Advance 1 hour (recovery message)</button>
        )}
        {status === "completed" && (
          <>
            <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 2 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-gold hover:text-gold">Advance 2 hours (thank-you)</button>
            <button onClick={() => dispatch({ type: "advance_time", leadId, hours: 24 })} className="border border-line px-3 py-2 text-xs text-ink-dim transition hover:border-gold hover:text-gold">Advance 24 hours (review request)</button>
          </>
        )}
        {status === "accepted" && <p className="text-xs text-ink-dim">Accepted — head to the client booking page to complete scheduling.</p>}
      </div>
      <p className="mt-3 text-[11px] text-ink-dim">Simulated clock: {simHoursElapsed}h elapsed since last plan/booking event.</p>
    </section>
  );
}

export default function LeadDetailPage() {
  return (
    <Suspense fallback={<div className="px-6 py-10 text-ink-dim">Loading…</div>}>
      <LeadDetailContent />
    </Suspense>
  );
}
