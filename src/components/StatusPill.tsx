import { LeadStatus, STATUS_LABELS } from "@/lib/types";

const COLORS: Record<LeadStatus, string> = {
  new: "bg-gold/15 text-gold border-gold/40",
  contacted: "bg-ink/10 text-ink-dim border-ink/20",
  plan_sent: "bg-emerald/10 text-emerald-bright border-emerald/40",
  follow_up: "bg-gold/15 text-gold border-gold/40",
  accepted: "bg-emerald/15 text-emerald border-emerald/40",
  booked: "bg-emerald/15 text-emerald border-emerald/40",
  no_show: "bg-rose/15 text-rose border-rose/40",
  completed: "bg-ink/10 text-ink-dim border-ink/20",
  lost: "bg-rose/15 text-rose border-rose/40",
};

export default function StatusPill({ status, className = "" }: { status: LeadStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${COLORS[status]} ${className}`}>
      {status === "new" && <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />}
      {STATUS_LABELS[status]}
    </span>
  );
}
