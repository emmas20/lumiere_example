import Link from "next/link";
import { TREATMENT_CONTENT } from "@/lib/treatment-content";

const steps = [
  { n: "01", title: "Request a consult", copy: "Tell us what you're after — takes about two minutes, any time of day." },
  { n: "02", title: "Get a real plan, fast", copy: "A provider reviews your answers and sends a personalized treatment plan, usually same day." },
  { n: "03", title: "Book your visit", copy: "Accept the plan and pick a time — reminders and prep instructions arrive automatically." },
  { n: "04", title: "Glow, then get followed up with", copy: "After your visit, we check in, ask for a review, and remind you when it's time to come back." },
];

const testimonials = [
  { quote: "I booked a facial at 11pm on my phone and had a confirmed appointment before I fell asleep.", name: "Renee A.", treatment: "HydraFacial" },
  { quote: "The reminder texts alone are why I keep coming back — I've never missed an appointment here.", name: "Marcus D.", treatment: "Laser Package" },
  { quote: "My injector remembered exactly what we did last time without me saying a word.", name: "Sofia P.", treatment: "Botox" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="rise-in">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Scottsdale, AZ</p>
            <h1 className="mt-4 max-w-lg font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Feel unmistakably like yourself, only rested.
            </h1>
            <p className="mt-5 max-w-md text-ink-dim">
              Lumière blends injectables, laser, skin, body, and wellness care with a booking experience that feels
              as considered as the treatments themselves.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/quiz" className="bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
                Take the 60-Second Quiz
              </Link>
              <Link href="/treatments" className="border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-gold">
                View Treatments
              </Link>
            </div>
          </div>

          <div className="relative flex items-end justify-center md:justify-end">
            <div className="float-slow w-full max-w-sm border border-line bg-panel p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-ink-dim">Live tonight</p>
              <p className="mt-2 font-display text-2xl text-ink">Next available consult</p>
              <p className="mt-1 text-sm text-emerald">Tomorrow, 2:15 PM</p>
              <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between"><span className="text-ink-dim">HydraFacial</span><span className="text-ink">$199</span></div>
                <div className="flex justify-between"><span className="text-ink-dim">Botox (per area)</span><span className="text-ink">$220</span></div>
                <div className="flex justify-between"><span className="text-ink-dim">Myers Cocktail IV</span><span className="text-ink">$89</span></div>
              </div>
              <Link href="/book" className="mt-5 block bg-gold py-2.5 text-center text-sm font-medium text-ivory transition hover:bg-gold-bright">
                Book This Slot
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Our treatments</h2>
          <Link href="/treatments" className="hidden text-sm text-gold hover:text-gold-bright md:block">All treatments</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TREATMENT_CONTENT.map((t) => (
            <Link key={t.slug} href={`/treatments#${t.slug}`} className="group flex flex-col justify-between border border-line bg-panel p-6 transition hover:border-gold">
              <div>
                <span className="text-2xl">{t.icon}</span>
                <h3 className="mt-3 font-display text-lg text-ink">{t.name}</h3>
                <p className="mt-2 text-sm text-ink-dim">{t.tagline}</p>
              </div>
              <p className="mt-6 text-sm font-medium text-gold">{t.startingPrice}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Not sure where to start?</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl text-ink md:text-3xl">
            Answer five quick questions and we&apos;ll match you to a treatment
          </h2>
          <Link href="/quiz" className="mt-6 inline-block bg-emerald px-6 py-3 text-sm font-medium text-ivory transition hover:bg-emerald-bright">
            Start the Quiz
          </Link>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Why clients choose Lumière</h2>
            <p className="mt-4 max-w-md text-ink-dim">
              Every visit is run the way good medical care should be: clear pricing, licensed providers, and
              communication that never leaves you guessing.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Licensed & board-certified", copy: "Every injector and laser tech is credentialed and trained on our exact protocols." },
              { title: "Transparent pricing", copy: "Treatment plans are itemized and sent before you ever book." },
              { title: "Never miss a reminder", copy: "Automated confirmations, prep instructions, and appointment reminders." },
              { title: "A plan that remembers you", copy: "Your history, photos, and preferences carry over to every future visit." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink-dim">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-2xl text-ink md:text-3xl">How a visit works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="border-t-2 border-gold pt-4">
              <p className="font-display text-sm text-gold">{step.n}</p>
              <h3 className="mt-2 font-medium text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm text-ink-dim">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-2xl text-ink md:text-3xl">From recent clients</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="border border-line bg-panel p-6">
                <blockquote className="text-sm text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-ink-dim">{t.name} — {t.treatment}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 border border-line bg-panel p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-xs uppercase tracking-wide text-gold">A note for spa owners</p>
            <h2 className="mt-2 font-display text-2xl text-ink">This entire site runs on automation</h2>
            <p className="mt-3 max-w-lg text-sm text-ink-dim">
              Every confirmation, reminder, and follow-up you just saw is simulated live for this demo. See exactly
              how it works and what it could look like for your own spa.
            </p>
          </div>
          <Link href="/grow-your-spa" className="shrink-0 bg-gold px-6 py-3 text-center text-sm font-medium text-ivory transition hover:bg-gold-bright">
            See How This Works For Your Spa
          </Link>
        </div>
      </section>
    </>
  );
}
