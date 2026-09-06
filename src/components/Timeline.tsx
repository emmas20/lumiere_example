import { AutomationEvent } from "@/lib/types";

function formatTime(ts: number) {
  return new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

const DOT_COLOR: Record<AutomationEvent["kind"], string> = {
  system: "bg-gold",
  client: "bg-emerald",
  spa: "bg-blush",
  cancelled: "bg-ink-dim",
};

export default function Timeline({ events }: { events: AutomationEvent[] }) {
  const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp);
  return (
    <ol className="relative ml-2 border-l border-line">
      {sorted.map((e) => (
        <li key={e.id} className="mb-6 ml-5 last:mb-0">
          <span className={`absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full ${DOT_COLOR[e.kind]} ${e.kind === "cancelled" ? "opacity-40" : ""}`} />
          <p className="text-xs text-ink-dim">{formatTime(e.timestamp)}</p>
          <p className={`mt-0.5 text-sm font-medium ${e.kind === "cancelled" ? "text-ink-dim line-through" : "text-ink"}`}>
            {e.label}
            {e.kind === "cancelled" && <span className="ml-2 text-xs font-normal uppercase tracking-wide text-ink-dim">Cancelled</span>}
          </p>
          {e.detail && (
            <p className={`mt-1 max-w-md border-l-2 border-line pl-3 text-sm italic ${e.kind === "cancelled" ? "text-ink-dim/60" : "text-ink-dim"}`}>
              “{e.detail}”
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
