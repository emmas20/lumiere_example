export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-dim">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "mt-2 w-full border border-line bg-ivory px-4 py-2.5 text-sm text-ink placeholder:text-ink-dim/60 outline-none transition focus:border-gold";

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-dim">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#b6893f]" />
      {label}
    </label>
  );
}

export function ChoiceCard({ selected, onClick, title, subtitle }: { selected: boolean; onClick: () => void; title: string; subtitle?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border px-4 py-3 text-left transition ${selected ? "border-gold bg-gold/10" : "border-line bg-panel hover:border-ink-dim"}`}
    >
      <p className={`text-sm font-medium ${selected ? "text-gold" : "text-ink"}`}>{title}</p>
      {subtitle && <p className="mt-0.5 text-xs text-ink-dim">{subtitle}</p>}
    </button>
  );
}

export function MultiChoiceChip({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-1.5 text-xs font-medium transition ${selected ? "border-gold bg-gold/15 text-gold" : "border-line text-ink-dim hover:border-ink-dim"}`}
    >
      {label}
    </button>
  );
}
