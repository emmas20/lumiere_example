import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <header className="border-b border-line px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald font-display text-xs font-semibold text-ivory">L</span>
          <span className="font-display text-sm text-ink">Lumière Medical Spa</span>
        </Link>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
