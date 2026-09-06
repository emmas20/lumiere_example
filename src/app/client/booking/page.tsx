"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { TREATMENT_LABELS } from "@/lib/types";

const SLOTS = [
  { date: "Thursday, Jun 12", time: "9:00 AM" },
  { date: "Thursday, Jun 12", time: "1:30 PM" },
  { date: "Friday, Jun 13", time: "10:00 AM" },
  { date: "Saturday, Jun 14", time: "11:30 AM" },
  { date: "Saturday, Jun 14", time: "2:00 PM" },
];

const PREP_INSTRUCTIONS: Record<string, string> = {
  injectables: "Avoid blood thinners and alcohol for 24 hours before your appointment.",
  laser: "Shave the treatment area the night before; avoid sun exposure for 2 weeks prior.",
  skin: "Arrive with a clean face — no makeup. Avoid retinol for 48 hours prior.",
  body: "Eat a light meal beforehand and wear comfortable clothing.",
  wellness: "Eat a light meal beforehand and stay hydrated.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-dim">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function BookingContent() {
  const id = useSearchParams().get("id") ?? "";
  const { leads, dispatch, hydrated } = useStore();
  const lead = leads.find((l) => l.id === id);
  const [selected, setSelected] = useState<number | null>(null);

  if (!hydrated) return null;
  if (!lead) return <div className="mx-auto max-w-lg px-5 py-24 text-center text-ink-dim">No booking found for this link.</div>;

  if (lead.status === "booked" || lead.status === "completed" || lead.status === "no_show") {
    return (
      <div className="mx-auto max-w-lg px-5 py-16">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10 text-2xl text-emerald">✓</span>
        <h1 className="mt-6 text-center font-display text-2xl text-ink">Appointment Confirmed</h1>
        <div className="mt-8 space-y-3 border border-line bg-panel p-6 text-sm">
          <Row label="Treatment" value={TREATMENT_LABELS[lead.category]} />
          <Row label="Date" value={lead.appointment?.date ?? "—"} />
          <Row label="Time" value={lead.appointment?.time ?? "—"} />
          <Row label="Location" value={lead.appointment?.location ?? "—"} />
        </div>
        <div className="mt-4 border border-line bg-panel p-6 text-sm text-ink-dim">
          <p className="text-ink">Before you arrive</p>
          <p className="mt-2">{lead.appointment?.instructions}</p>
        </div>
      </div>
    );
  }

  if (lead.status !== "accepted") {
    return <div className="mx-auto max-w-lg px-5 py-24 text-center text-ink-dim">This plan hasn&apos;t been accepted yet.</div>;
  }

  function confirmBooking() {
    if (selected === null || !lead) return;
    const slot = SLOTS[selected];
    dispatch({
      type: "book_appointment",
      leadId: id,
      appointment: {
        date: slot.date,
        time: slot.time,
        location: "Lumière Medical Spa — 7135 E Camelback Rd, Scottsdale, AZ",
        instructions: PREP_INSTRUCTIONS[lead.category],
      },
    });
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Book Your Appointment</p>
      <h1 className="mt-3 font-display text-2xl text-ink">{TREATMENT_LABELS[lead.category]}</h1>

      <div className="mt-8 space-y-2">
        {SLOTS.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition ${selected === i ? "border-gold bg-gold/10" : "border-line bg-panel hover:border-ink-dim"}`}
          >
            <span className={selected === i ? "text-gold" : "text-ink"}>{slot.date}</span>
            <span className="text-ink-dim">{slot.time}</span>
          </button>
        ))}
      </div>

      <button
        disabled={selected === null}
        onClick={confirmBooking}
        className="mt-8 w-full bg-emerald py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirm Appointment
      </button>
    </div>
  );
}

export default function ClientBookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingContent />
    </Suspense>
  );
}
