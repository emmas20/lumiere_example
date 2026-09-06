"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";

function ConfirmationContent() {
  const leadId = useSearchParams().get("leadId");
  const { leads, hydrated } = useStore();
  const lead = leads.find((l) => l.id === leadId);

  if (!hydrated) return null;

  if (!lead) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-ink-dim">We couldn&apos;t find that request.</p>
        <Link href="/book" className="mt-4 inline-block text-gold hover:text-gold-bright">Start a new request</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10 text-2xl text-emerald">✓</span>
      <h1 className="mt-6 font-display text-2xl text-ink md:text-3xl">Thank you, {lead.client.firstName}!</h1>
      <p className="mt-4 text-ink-dim">
        We&apos;ve received your consultation request. A member of our team will review your information and follow
        up shortly with a personalized treatment plan.
      </p>
      <div className="mt-8 border border-line bg-panel p-5 text-left text-sm text-ink-dim">
        <p className="text-ink">What happens automatically next:</p>
        <ul className="mt-3 space-y-2">
          <li>• A confirmation was just sent to {lead.client.email}</li>
          <li>• Lumière has been notified of your request</li>
          <li>• You&apos;ll receive a treatment plan by text and email, usually the same day</li>
        </ul>
      </div>
      <Link href="/" className="mt-8 inline-block bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
        Back to Home
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}
