"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { nextId } from "@/lib/id";
import { ClientInfo, TreatmentCategory, TreatmentDetails, PhotoRef, TREATMENT_LABELS } from "@/lib/types";
import { TREATMENT_CONTENT } from "@/lib/treatment-content";
import { Field, inputClass, Checkbox, ChoiceCard, MultiChoiceChip } from "./FormField";

const STEPS = ["You", "Treatment", "Photos", "Timing", "Review"];

const INJECTABLE_AREAS = ["Forehead lines", "Frown lines", "Crow's feet", "Lips", "Cheeks", "Jawline"];
const LASER_AREAS = ["Underarms", "Legs", "Bikini", "Back", "Face", "Arms"];
const SKIN_CONCERNS = ["Dullness", "Congestion", "Fine lines", "Redness", "Uneven tone"];
const BODY_AREAS = ["Abdomen", "Flanks", "Thighs", "Arms", "Chin"];
const WELLNESS_FOCUS = ["Energy & Immunity", "Hydration", "Recovery", "Beauty & Glow"];
const WELLNESS_FREQ = ["One-time", "Weekly", "Monthly"];

export default function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const { dispatch } = useStore();
  const preselected = params.get("category") as TreatmentCategory | null;

  const [step, setStep] = useState(1);
  const [client, setClient] = useState<ClientInfo>({ firstName: "", lastName: "", phone: "", email: "" });
  const [category, setCategory] = useState<TreatmentCategory | null>(preselected ?? null);

  const [injectables, setInjectables] = useState({ areas: [] as string[], hasHadBefore: false, goal: "" });
  const [laser, setLaser] = useState({ areas: [] as string[], skinTone: "", priorLaser: false });
  const [skin, setSkin] = useState({ concerns: [] as string[], skinType: "", currentRoutine: "" });
  const [body, setBody] = useState({ areas: [] as string[], goal: "", timeline: "" });
  const [wellness, setWellness] = useState({ focus: "", frequency: "" });

  const [photos, setPhotos] = useState<PhotoRef[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const details: TreatmentDetails | null = useMemo(() => {
    if (!category) return null;
    if (category === "injectables") return { kind: "injectables", ...injectables };
    if (category === "laser") return { kind: "laser", ...laser };
    if (category === "skin") return { kind: "skin", ...skin };
    if (category === "body") return { kind: "body", ...body };
    return { kind: "wellness", ...wellness };
  }, [category, injectables, laser, skin, body, wellness]);

  function toggle(arr: string[], v: string) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }
  function handleFiles(files: FileList | null) {
    if (!files) return;
    setPhotos((p) => [...p, ...Array.from(files).map((f) => ({ name: f.name, size: f.size }))]);
  }

  function canAdvance(): boolean {
    if (step === 1) return !!(client.firstName && client.lastName && client.phone && client.email);
    if (step === 2) return !!category;
    return true;
  }

  function submit() {
    if (!category || !details) return;
    setSubmitting(true);
    const newId = nextId("lead");
    dispatch({ type: "submit_request", newId, payload: { client, category, details, photos, preferredDate, preferredTime, notes } });
    setTimeout(() => router.push(`/book/confirmation?leadId=${newId}`), 500);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Book a Consult</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Let&apos;s find your treatment</h1>

      <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const isDone = n < step;
          return (
            <li key={label} className={`flex items-center gap-2 text-sm ${active ? "text-gold" : isDone ? "text-ink" : "text-ink-dim"}`}>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] ${active ? "border-gold text-gold" : isDone ? "border-ink bg-ink/10" : "border-line"}`}>
                {n}
              </span>
              {label}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 border border-line bg-panel p-6 md:p-8">
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name">
              <input className={inputClass} value={client.firstName} onChange={(e) => setClient({ ...client, firstName: e.target.value })} />
            </Field>
            <Field label="Last name">
              <input className={inputClass} value={client.lastName} onChange={(e) => setClient({ ...client, lastName: e.target.value })} />
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} placeholder="(480) 555-0100" />
            </Field>
            <Field label="Email">
              <input type="email" className={inputClass} value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-lg text-ink">Which treatment?</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {TREATMENT_CONTENT.map((t) => (
                  <ChoiceCard key={t.slug} selected={category === t.slug} onClick={() => setCategory(t.slug)} title={t.name} subtitle={t.tagline} />
                ))}
              </div>
            </div>

            {category === "injectables" && (
              <div className="space-y-4 border-t border-line pt-6">
                <Field label="Areas of interest">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {INJECTABLE_AREAS.map((a) => (
                      <MultiChoiceChip key={a} label={a} selected={injectables.areas.includes(a)} onClick={() => setInjectables({ ...injectables, areas: toggle(injectables.areas, a) })} />
                    ))}
                  </div>
                </Field>
                <Field label="What's your goal?">
                  <input className={inputClass} value={injectables.goal} onChange={(e) => setInjectables({ ...injectables, goal: e.target.value })} placeholder="e.g. soften lines before an event" />
                </Field>
                <Checkbox label="I've had injectables before" checked={injectables.hasHadBefore} onChange={(v) => setInjectables({ ...injectables, hasHadBefore: v })} />
              </div>
            )}

            {category === "laser" && (
              <div className="space-y-4 border-t border-line pt-6">
                <Field label="Areas">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {LASER_AREAS.map((a) => (
                      <MultiChoiceChip key={a} label={a} selected={laser.areas.includes(a)} onClick={() => setLaser({ ...laser, areas: toggle(laser.areas, a) })} />
                    ))}
                  </div>
                </Field>
                <Field label="Skin tone (helps us pick laser settings)">
                  <input className={inputClass} value={laser.skinTone} onChange={(e) => setLaser({ ...laser, skinTone: e.target.value })} placeholder="e.g. fair, medium-tan, deep" />
                </Field>
                <Checkbox label="I've had laser hair removal before" checked={laser.priorLaser} onChange={(v) => setLaser({ ...laser, priorLaser: v })} />
              </div>
            )}

            {category === "skin" && (
              <div className="space-y-4 border-t border-line pt-6">
                <Field label="Skin concerns">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SKIN_CONCERNS.map((c) => (
                      <MultiChoiceChip key={c} label={c} selected={skin.concerns.includes(c)} onClick={() => setSkin({ ...skin, concerns: toggle(skin.concerns, c) })} />
                    ))}
                  </div>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Skin type">
                    <input className={inputClass} value={skin.skinType} onChange={(e) => setSkin({ ...skin, skinType: e.target.value })} placeholder="Oily / dry / combination" />
                  </Field>
                  <Field label="Current routine">
                    <input className={inputClass} value={skin.currentRoutine} onChange={(e) => setSkin({ ...skin, currentRoutine: e.target.value })} placeholder="What do you use daily?" />
                  </Field>
                </div>
              </div>
            )}

            {category === "body" && (
              <div className="space-y-4 border-t border-line pt-6">
                <Field label="Areas">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {BODY_AREAS.map((a) => (
                      <MultiChoiceChip key={a} label={a} selected={body.areas.includes(a)} onClick={() => setBody({ ...body, areas: toggle(body.areas, a) })} />
                    ))}
                  </div>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Goal">
                    <input className={inputClass} value={body.goal} onChange={(e) => setBody({ ...body, goal: e.target.value })} placeholder="What are you hoping to achieve?" />
                  </Field>
                  <Field label="Timeline">
                    <input className={inputClass} value={body.timeline} onChange={(e) => setBody({ ...body, timeline: e.target.value })} placeholder="Any date you're working toward?" />
                  </Field>
                </div>
              </div>
            )}

            {category === "wellness" && (
              <div className="space-y-4 border-t border-line pt-6">
                <Field label="Focus">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {WELLNESS_FOCUS.map((f) => (
                      <MultiChoiceChip key={f} label={f} selected={wellness.focus === f} onClick={() => setWellness({ ...wellness, focus: f })} />
                    ))}
                  </div>
                </Field>
                <Field label="How often?">
                  <div className="mt-2 flex flex-wrap gap-2">
                    {WELLNESS_FREQ.map((f) => (
                      <MultiChoiceChip key={f} label={f} selected={wellness.frequency === f} onClick={() => setWellness({ ...wellness, frequency: f })} />
                    ))}
                  </div>
                </Field>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-lg text-ink">Photos (optional)</h2>
            <p className="mt-2 text-sm text-ink-dim">A photo or two helps your provider prepare a more accurate plan.</p>
            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center border border-dashed border-line px-6 py-10 text-center transition hover:border-gold">
              <span className="text-sm text-ink">Tap to add photos</span>
              <span className="mt-1 text-xs text-ink-dim">JPG or PNG, up to 10 photos</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </label>
            {photos.length > 0 && (
              <ul className="mt-4 space-y-2">
                {photos.map((p, i) => (
                  <li key={i} className="flex items-center justify-between border border-line bg-ivory px-4 py-2.5 text-sm">
                    <span className="text-ink-dim">{p.name}</span>
                    <button type="button" onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="text-xs text-rose hover:text-rose/80">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-lg text-ink">Preferred timing</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred date">
                <input type="date" className={inputClass} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
              </Field>
              <Field label="Preferred time">
                <input type="time" className={inputClass} value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} />
              </Field>
            </div>
            <Field label="Anything else we should know?">
              <textarea className={inputClass + " min-h-[100px]"} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
          </div>
        )}

        {step === 5 && category && details && (
          <div className="space-y-6">
            <h2 className="font-display text-lg text-ink">Review your request</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-dim">Contact</p>
                <p className="mt-1 text-sm text-ink">{client.firstName} {client.lastName}</p>
                <p className="text-sm text-ink-dim">{client.phone}</p>
                <p className="text-sm text-ink-dim">{client.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-dim">Treatment</p>
                <p className="mt-1 text-sm text-ink">{TREATMENT_LABELS[category]}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-dim">Preferred timing</p>
                <p className="mt-1 text-sm text-ink-dim">{preferredDate || "No date selected"} {preferredTime && `· ${preferredTime}`}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-dim">Photos</p>
                <p className="mt-1 text-sm text-ink-dim">{photos.length} attached</p>
              </div>
              {notes && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-dim">Notes</p>
                  <p className="mt-1 text-sm text-ink-dim">{notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className={`text-sm text-ink-dim hover:text-ink ${step === 1 ? "invisible" : ""}`}>
          Back
        </button>
        {step < 5 ? (
          <button
            type="button"
            disabled={!canAdvance()}
            onClick={() => setStep((s) => s + 1)}
            className="bg-emerald px-6 py-2.5 text-sm font-medium text-ivory transition hover:bg-emerald-bright disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button type="button" disabled={submitting} onClick={submit} className="bg-emerald px-6 py-2.5 text-sm font-medium text-ivory transition hover:bg-emerald-bright disabled:opacity-60">
            {submitting ? "Submitting…" : "Submit Request"}
          </button>
        )}
      </div>
    </div>
  );
}
