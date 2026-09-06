"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dispatch } = useStore();

  function handleReset() {
    if (window.confirm("Reset the demo? This clears everything and restores the seeded sample leads.")) {
      dispatch({ type: "reset" });
    }
  }
  function handleRunDemo() {
    dispatch({ type: "run_demo_journey" });
  }

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line px-5 py-6 md:flex">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald font-display text-xs font-semibold text-ivory">L</span>
          <span className="font-display text-sm text-ink">Lumière Admin</span>
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          <Link href="/admin" className={`px-3 py-2 text-sm ${pathname === "/admin" ? "bg-cream text-ink" : "text-ink-dim hover:text-ink"}`}>
            Dashboard
          </Link>
        </nav>
        <div className="mt-auto space-y-2 border-t border-line pt-5">
          <button onClick={handleRunDemo} className="w-full border border-line px-3 py-2 text-left text-xs text-ink-dim transition hover:border-gold hover:text-gold">
            Run Demo Journey
          </button>
          <button onClick={handleReset} className="w-full border border-line px-3 py-2 text-left text-xs text-ink-dim transition hover:border-rose hover:text-rose">
            Reset Demo
          </button>
          <Link href="/" className="block px-3 py-2 text-xs text-ink-dim hover:text-ink">Exit to Website</Link>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 md:hidden">
          <span className="font-display text-sm text-ink">Lumière Admin</span>
          <div className="flex gap-2">
            <button onClick={handleRunDemo} className="border border-line px-2.5 py-1.5 text-xs text-ink-dim">Run Demo</button>
            <button onClick={handleReset} className="border border-line px-2.5 py-1.5 text-xs text-ink-dim">Reset</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
