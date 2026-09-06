"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TreatmentCategory } from "@/lib/types";
import { getTreatmentContent } from "@/lib/treatment-content";

type Scores = Record<TreatmentCategory, number>;

const EMPTY: Scores = { injectables: 0, laser: 0, skin: 0, body: 0, wellness: 0 };

interface Option {
  label: string;
  scores: Partial<Scores>;
  reason: string;
}
interface Question {
  prompt: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    prompt: "What brings you in today?",
    options: [
      { label: "Fine lines & wrinkles", scores: { injectables: 3 }, reason: "you're focused on expression lines" },
      { label: "Unwanted hair", scores: { laser: 3 }, reason: "you want lasting hair reduction" },
      { label: "Dull or congested skin", scores: { skin: 3 }, reason: "you're chasing a healthier glow" },
      { label: "Stubborn fat that won't budge", scores: { body: 3 }, reason: "you want to target specific areas" },
      { label: "Just overall energy & wellness", scores: { wellness: 3 }, reason: "you're focused on how you feel, not just look" },
    ],
  },
  {
    prompt: "How much downtime can you tolerate?",
    options: [
      { label: "None — I need to go right back to my day", scores: { skin: 2, wellness: 2, injectables: 1 }, reason: "zero downtime matters most to you" },
      { label: "A little redness is fine", scores: { injectables: 2, laser: 1 }, reason: "you're comfortable with mild, short-lived effects" },
      { label: "I can plan around a slower week", scores: { body: 2, laser: 1 }, reason: "you're open to a short recovery window" },
    ],
  },
  {
    prompt: "Have you had a cosmetic or wellness treatment before?",
    options: [
      { label: "First time for anything like this", scores: { skin: 2, wellness: 1 }, reason: "you're starting with something approachable" },
      { label: "I've done a few, looking for the next step", scores: { injectables: 2, laser: 1 }, reason: "you're ready for a more targeted treatment" },
      { label: "I'm a regular — I know what I like", scores: { body: 1, injectables: 1, laser: 1 }, reason: "you know your routine and want to expand it" },
    ],
  },
  {
    prompt: "What matters most in the result?",
    options: [
      { label: "Natural, barely-there results", scores: { injectables: 2, skin: 1 }, reason: "you want subtle, natural-looking results" },
      { label: "Visible, noticeable change", scores: { body: 2, laser: 1 }, reason: "you're after a real, visible transformation" },
      { label: "Feeling good, not just looking good", scores: { wellness: 3 }, reason: "how you feel matters as much as how you look" },
    ],
  },
  {
    prompt: "What's your comfort zone per visit?",
    options: [
      { label: "Under $150", scores: { wellness: 2, skin: 1 }, reason: "you're looking for an accessible price point" },
      { label: "$150–$400", scores: { injectables: 2, skin: 1 }, reason: "you're comfortable with a mid-range investment" },
      { label: "$400+", scores: { body: 2, laser: 2 }, reason: "you're ready to invest in a full package" },
    ],
  },
];

function addScores(a: Scores, b: Partial<Scores>): Scores {
  const next = { ...a };
  (Object.keys(b) as TreatmentCategory[]).forEach((k) => {
    next[k] += b[k] ?? 0;
  });
  return next;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>(EMPTY);
  const [reasons, setReasons] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const done = step >= QUESTIONS.length;

  const winner = useMemo(() => {
    if (!done) return null;
    const entries = Object.entries(scores) as [TreatmentCategory, number][];
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }, [done, scores]);

  function choose(option: Option, idx: number) {
    setSelected(idx);
    setTimeout(() => {
      setScores((s) => addScores(s, option.scores));
      setReasons((r) => [...r, option.reason]);
      setStep((s) => s + 1);
      setSelected(null);
    }, 220);
  }

  function restart() {
    setStep(0);
    setScores(EMPTY);
    setReasons([]);
    setSelected(null);
  }

  if (done && winner) {
    const content = getTreatmentContent(winner);
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <div className="rise-in border border-line bg-panel p-8 text-center md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Your match</p>
          <span className="mt-4 block text-4xl">{content.icon}</span>
          <h1 className="mt-3 font-display text-3xl text-ink">{content.name}</h1>
          <p className="mt-2 text-ink-dim">{content.tagline}</p>

          <div className="mt-8 border-t border-line pt-6 text-left">
            <p className="text-xs uppercase tracking-wide text-ink-dim">Why this fits you</p>
            <ul className="mt-3 space-y-2">
              {reasons.slice(0, 3).map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  Because {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={{ pathname: "/book", query: { category: winner } }}
              className="bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright"
            >
              Book My Consult
            </Link>
            <button onClick={restart} className="border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-gold">
              Retake the Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Find My Treatment</p>
      <div className="mt-4 flex items-center gap-2">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition ${i < step ? "bg-gold" : i === step ? "bg-gold/50" : "bg-line"}`} />
        ))}
      </div>

      <h1 className="mt-8 font-display text-2xl text-ink md:text-3xl">{q.prompt}</h1>

      <div className="mt-8 space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => choose(opt, i)}
            className={`w-full border px-5 py-4 text-left text-sm transition ${
              selected === i ? "border-gold bg-gold/10 text-gold" : "border-line bg-panel text-ink hover:border-gold hover:bg-gold/5"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-ink-dim">Question {step + 1} of {QUESTIONS.length}</p>
    </div>
  );
}
