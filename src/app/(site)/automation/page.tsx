import Link from "next/link";

function Node({ title, subtitle, tone = "default" }: { title: string; subtitle?: string; tone?: "default" | "gold" | "emerald" | "rose" }) {
  const toneClass =
    tone === "gold" ? "border-gold/50 bg-gold/10" : tone === "emerald" ? "border-emerald/50 bg-emerald/10" : tone === "rose" ? "border-rose/50 bg-rose/10" : "border-line bg-panel";
  return (
    <div className={`border px-4 py-3 text-center ${toneClass}`}>
      <p className="text-sm font-medium text-ink">{title}</p>
      {subtitle && <p className="mt-0.5 text-xs text-ink-dim">{subtitle}</p>}
    </div>
  );
}
function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <div className="h-6 w-px bg-line" />
    </div>
  );
}

export default function AutomationPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">How It Works</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl text-ink md:text-4xl">Every consult runs on rails, automatically</h1>
      <p className="mt-4 max-w-xl text-ink-dim">
        From the moment a client requests a consult to the review request weeks later, Lumière&apos;s system keeps
        both sides moving — including recovering no-shows instead of losing them.
      </p>

      <div className="mt-14">
        <Node title="Client requests a consult" tone="emerald" />
        <Arrow />
        <Node title="Treatment + concern information captured" />
        <Arrow />
        <Node title="Lead created" />
        <Arrow />
        <div className="grid gap-3 sm:grid-cols-2">
          <Node title="Provider notified" tone="gold" />
          <Node title="Client confirmation sent" tone="emerald" />
        </div>
        <Arrow />
        <Node title="Treatment plan created & sent" tone="gold" />
        <Arrow />

        <div className="rise-in border border-dashed border-line p-5">
          <p className="text-center text-xs uppercase tracking-wide text-ink-dim">Has the client responded?</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-center text-xs font-medium text-gold">No response</p>
              <Node title="Follow-up sent (24 hrs)" tone="gold" />
              <Arrow />
              <Node title="Second follow-up (72 hrs)" tone="gold" />
              <Arrow />
              <Node title="Marked as Lost, if still silent" />
            </div>
            <div>
              <p className="mb-3 text-center text-xs font-medium text-emerald">Accepted</p>
              <Node title="Pending follow-ups cancelled" tone="emerald" />
              <Arrow />
              <Node title="Booking confirmed" tone="emerald" />
              <Arrow />
              <Node title="Prep instructions + 24-hr reminder sent" tone="emerald" />
              <Arrow />
              <Node title="Visit completed" tone="emerald" />
              <Arrow />
              <Node title="Review request + rebooking reminder sent" tone="emerald" />
            </div>
          </div>
        </div>

        <Arrow />
        <div className="border border-dashed border-rose/40 bg-rose/5 p-5">
          <p className="text-center text-xs uppercase tracking-wide text-rose">If a client no-shows</p>
          <div className="mt-4">
            <Node title="Marked as No-Show" tone="rose" />
            <Arrow />
            <Node title="Recovery message sent within the hour" tone="rose" subtitle="Their treatment plan is held, not lost" />
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link href="/book" className="bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
          Try the Booking Flow
        </Link>
        <Link href="/admin" className="border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-gold">
          See the Spa Dashboard
        </Link>
        <Link href="/grow-your-spa" className="border border-gold px-6 py-3 text-sm font-medium text-gold transition hover:bg-gold/10">
          I want this for my spa
        </Link>
      </div>
    </div>
  );
}
