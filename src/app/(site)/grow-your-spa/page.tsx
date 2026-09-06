import Link from "next/link";

const PROBLEMS = [
  { title: "After-hours inquiries go cold", copy: "A client thinking about Botox at 11pm won't call in the morning — she'll just book with whoever answers first." },
  { title: "Follow-up depends on someone remembering", copy: "Treatment plans get sent, then sit in an inbox. Nobody circles back at hour 24 or hour 72 — so the lead just fades." },
  { title: "No-shows are pure loss", copy: "A missed appointment usually means a missed client. There's rarely a same-day system to win them back." },
  { title: "Reviews and rebooking are left to chance", copy: "The best time to ask for a review is right after a great result — and the best time to remind someone to rebook is exactly when they're due." },
];

const AUTOMATIONS = [
  { title: "Instant lead capture & confirmation", copy: "Every inquiry — website, quiz, or booking form — creates a lead immediately and confirms receipt to the client within seconds, any hour of the day." },
  { title: "Smart, treatment-specific intake", copy: "The questions a client sees adjust to the treatment they picked, so your team gets exactly the clinical detail it needs before the first call." },
  { title: "Treatment plans that send themselves", copy: "Providers build the plan once; the system handles delivery, formatting, and the client-facing acceptance page." },
  { title: "Conditional follow-up sequences", copy: "If a plan goes unanswered, a follow-up goes out at 24 hours and again at 72 — and stops the instant the client responds, so nobody gets double-messaged." },
  { title: "Booking, confirmations & reminders", copy: "Clients pick their own slot, get an instant confirmation, and receive a reminder with prep instructions the day before." },
  { title: "No-show recovery", copy: "A missed visit triggers a same-hour, no-guilt message holding their treatment plan open — turning a loss into a rebooked visit." },
  { title: "Post-visit care & review requests", copy: "A thank-you message goes out within hours, followed by a review request timed for when results are freshest." },
  { title: "Membership & rebooking reminders", copy: "Members get reminded when they're due; one-time clients get a gentle nudge when it's typically time to come back." },
  { title: "An owner's dashboard that tells the truth", copy: "New leads, pending plans, no-shows, and revenue — in one place, updated in real time, with zero spreadsheets." },
];

const JOURNEY = [
  { time: "11:42 PM", text: "Sarah is scrolling Instagram and lands on your quiz. She answers five questions and gets matched to lip filler." },
  { time: "11:44 PM", text: "She submits a request. She instantly gets a warm confirmation — no hold music, no \"we'll call you back.\"" },
  { time: "8:15 AM", text: "Your injector reviews her intake overnight and sends a treatment plan before she's even had coffee." },
  { time: "8:16 AM", text: "Sarah gets a text and email with her plan. She taps to accept it right from her phone." },
  { time: "8:17 AM", text: "She picks a slot from your real availability and gets an instant booking confirmation with prep instructions." },
  { time: "Day of, 24 hrs prior", text: "An automatic reminder lands — no front-desk call needed, no forgotten appointments." },
  { time: "2 hours after her visit", text: "A thank-you message goes out. She's still glowing when she gets it." },
  { time: "Next day", text: "A review request arrives at exactly the right moment — and she leaves you five stars." },
  { time: "8 weeks later", text: "A gentle reminder lets her know it's about time for her next touch-up. She rebooks without you lifting a finger." },
];

export default function GrowYourSpaPage() {
  return (
    <div className="bg-ivory">
      <section className="border-b border-line px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Built by Zoroliq</p>
          <h1 className="mt-4 font-display text-3xl text-ink md:text-4xl">
            Everything you just clicked through is a working system — not a mockup
          </h1>
          <p className="mt-5 text-ink-dim">
            Lumière Medical Spa is a fictional business, but every automation on this site — the instant
            confirmations, the follow-ups, the reminders, the no-show recovery — runs exactly like it would for a
            real spa. This page explains how it works and what it takes to build the same thing for yours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-2xl text-ink md:text-3xl">What&apos;s probably happening at your spa right now</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="border border-line bg-panel p-6">
              <h3 className="font-medium text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream/60 px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl text-ink md:text-3xl">The client experience, minute by minute</h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            Here&apos;s what an automated system feels like from the other side — no phone calls, no waiting, nothing
            slipping through the cracks.
          </p>
          <ol className="relative mt-10 ml-2 border-l border-line">
            {JOURNEY.map((j, i) => (
              <li key={i} className="mb-8 ml-6 last:mb-0">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-gold bg-panel" />
                <p className="text-xs uppercase tracking-wide text-gold">{j.time}</p>
                <p className="mt-1 text-sm text-ink">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-2xl text-ink md:text-3xl">The automations behind it</h2>
        <p className="mt-3 max-w-2xl text-ink-dim">
          Each of these runs on its own — no one on your team has to remember to send anything.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {AUTOMATIONS.map((a, i) => (
            <div key={a.title} className="border border-line bg-panel p-6">
              <p className="font-display text-sm text-gold">0{i + 1}</p>
              <h3 className="mt-2 font-medium text-ink">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{a.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream/60 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Why it matters for the business, not just the client</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { title: "Inquiries stop dying after hours", copy: "The system responds the second someone reaches out — 24/7, without anyone on staff." },
              { title: "Follow-up happens every single time", copy: "No plan goes unanswered because someone forgot to check back in." },
              { title: "No-shows get a real recovery path", copy: "Instead of a silent loss, a missed visit turns into an immediate, low-pressure rebooking attempt." },
              { title: "You always know where things stand", copy: "One dashboard shows every lead, every pending plan, and every dollar in the pipeline." },
            ].map((item) => (
              <div key={item.title} className="border border-line bg-panel p-6">
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-dim">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="font-display text-2xl text-ink md:text-3xl">How building yours would work</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", title: "Discovery call", copy: "We map your actual services, pricing, and the questions your team asks in a real consult." },
            { n: "02", title: "Build & connect", copy: "Your site, booking flow, and automations get built around your real business — connected to your calendar, payments, and messaging." },
            { n: "03", title: "Launch & refine", copy: "You start capturing and following up on leads automatically, and we tune the flows based on how clients actually respond." },
          ].map((s) => (
            <div key={s.n} className="border-t-2 border-gold pt-4">
              <p className="font-display text-sm text-gold">{s.n}</p>
              <h3 className="mt-2 font-medium text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-dim">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl border border-line bg-panel p-8 text-center md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Zoroliq</p>
          <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">Want this exact system for your spa?</h2>
          <p className="mt-4 text-ink-dim">
            Zoroliq builds the whole thing for you: a real website, a booking flow that adjusts to what you offer,
            and the automations that keep every lead followed up on — connected to your calendar and your team.
          </p>

          <div className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-1">
            {[
              "A custom website built around your real services and pricing",
              "A booking flow that captures leads and gets them a plan fast",
              "Automated follow-up, reminders, and no-show recovery — built in",
              "A dashboard so you always know where every lead stands",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {line}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-ink">
            <Link href="https://zoroliq.com" className="font-medium text-gold hover:text-gold-bright">zoroliq.com</Link>
            <p className="text-ink-dim">[ Add your Instagram link here ]</p>
          </div>
          <Link href="https://zoroliq.com" className="mt-8 inline-block bg-emerald px-8 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
            Book a Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
