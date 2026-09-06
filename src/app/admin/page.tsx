"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import StatusPill from "@/components/StatusPill";
import { TREATMENT_LABELS, LeadStatus, STATUS_LABELS } from "@/lib/types";

const FILTERS: (LeadStatus | "all")[] = ["all", "new", "contacted", "plan_sent", "follow_up", "accepted", "booked", "no_show", "completed", "lost"];

export default function AdminDashboard() {
  const { leads, hydrated } = useStore();
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  const metrics = useMemo(() => {
    const newLeads = leads.filter((l) => l.status === "new").length;
    const plansPending = leads.filter((l) => l.status === "plan_sent" || l.status === "follow_up").length;
    const noShows = leads.filter((l) => l.status === "no_show").length;
    const bookedVisits = leads.filter((l) => l.status === "booked").length;
    const revenue = leads
      .filter((l) => l.status === "accepted" || l.status === "booked" || l.status === "completed")
      .reduce((sum, l) => sum + (l.plan?.total ?? 0), 0);
    const plannedOrBeyond = leads.filter((l) => l.plan).length;
    const won = leads.filter((l) => l.status === "accepted" || l.status === "booked" || l.status === "completed").length;
    const conversion = plannedOrBeyond > 0 ? Math.round((won / plannedOrBeyond) * 100) : 0;
    const members = leads.filter((l) => l.isMember).length;
    return { newLeads, plansPending, noShows, bookedVisits, revenue, conversion, members };
  }, [leads]);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const sorted = [...filtered].sort((a, b) => b.createdAt - a.createdAt);

  if (!hydrated) return <div className="px-6 py-10 text-ink-dim">Loading dashboard…</div>;

  return (
    <div className="px-5 py-8 md:px-8 md:py-10">
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-dim">A live look at every consult moving through the pipeline.</p>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-7">
        {[
          { label: "New Inquiries", value: metrics.newLeads },
          { label: "Plans Pending", value: metrics.plansPending },
          { label: "No-Shows", value: metrics.noShows },
          { label: "Booked Visits", value: metrics.bookedVisits },
          { label: "Members", value: metrics.members },
          { label: "Est. Revenue", value: `$${metrics.revenue.toLocaleString()}` },
          { label: "Conversion Rate", value: `${metrics.conversion}%` },
        ].map((m) => (
          <div key={m.label} className="border border-line bg-panel p-4">
            <p className="text-xs uppercase tracking-wide text-ink-dim">{m.label}</p>
            <p className="mt-2 font-display text-2xl text-ink">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border px-3 py-1.5 text-xs font-medium transition ${filter === f ? "border-gold bg-gold/10 text-gold" : "border-line text-ink-dim hover:border-ink-dim"}`}
          >
            {f === "all" ? "All" : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden border border-line">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-panel text-xs uppercase tracking-wide text-ink-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Treatment</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Member</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Plan</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((lead) => (
              <tr key={lead.id} className="border-b border-line last:border-b-0 hover:bg-cream/40">
                <td className="px-4 py-3">
                  <Link href={`/admin/lead?id=${lead.id}`} className="font-medium text-ink hover:text-gold">
                    {lead.client.firstName} {lead.client.lastName}
                  </Link>
                </td>
                <td className="hidden px-4 py-3 text-ink-dim sm:table-cell">{TREATMENT_LABELS[lead.category]}</td>
                <td className="hidden px-4 py-3 text-ink-dim md:table-cell">{lead.isMember ? "Yes" : "—"}</td>
                <td className="px-4 py-3"><StatusPill status={lead.status} /></td>
                <td className="hidden px-4 py-3 text-ink-dim sm:table-cell">{lead.plan ? `$${lead.plan.total.toLocaleString()}` : "—"}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-dim">No leads match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
