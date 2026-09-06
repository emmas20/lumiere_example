import { Suspense } from "react";
import BookingWizard from "@/components/BookingWizard";

export default function BookPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 py-14 text-ink-dim">Loading…</div>}>
      <BookingWizard />
    </Suspense>
  );
}
