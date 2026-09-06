import { TreatmentCategory } from "./types";

export interface TreatmentContent {
  slug: TreatmentCategory;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  startingPrice: string;
  icon: string;
}

export const TREATMENT_CONTENT: TreatmentContent[] = [
  {
    slug: "injectables",
    name: "Botox & Dermal Fillers",
    tagline: "Soften lines, restore volume, look like you — just rested",
    description:
      "Injector-led consultations focused on natural movement and balance, not a frozen look. Botox for expression lines, filler for volume and structure.",
    bullets: ["Board-certified injectors", "Complimentary touch-up window", "Numbing available for filler", "Photos logged for consistent results"],
    startingPrice: "From $220/area",
    icon: "💉",
  },
  {
    slug: "laser",
    name: "Laser Hair Removal",
    tagline: "Smooth, permanent-reduction results on any skin tone",
    description: "Medical-grade diode laser calibrated to your skin tone and hair density, with a package structure that actually finishes the job.",
    bullets: ["Safe for all Fitzpatrick skin types", "6-session packages with progress tracking", "Numbing cream available", "Touch-up pricing after package completion"],
    startingPrice: "From $840/package",
    icon: "✨",
  },
  {
    slug: "skin",
    name: "HydraFacial & Skin Rejuvenation",
    tagline: "The glow people ask about",
    description: "Cleanse, extract, and hydrate in one relaxing session, customized with boosters for your specific skin concerns.",
    bullets: ["Zero downtime", "Custom boosters for your concerns", "Great before events", "Add-on LED therapy available"],
    startingPrice: "From $199",
    icon: "🌿",
  },
  {
    slug: "body",
    name: "Body Contouring",
    tagline: "Non-invasive fat reduction with real, visible results",
    description: "Targeted body contouring for stubborn areas that don't respond to diet and exercise — no downtime, no surgery.",
    bullets: ["No anesthesia or incisions", "Results visible in 4-8 weeks", "Multi-area packages available", "Complimentary progress photos"],
    startingPrice: "From $725/area",
    icon: "🔥",
  },
  {
    slug: "wellness",
    name: "IV Therapy & Wellness Shots",
    tagline: "Feel the difference in an hour, not a week",
    description: "Physician-formulated IV drips and injections for energy, immunity, recovery, and glow — walk-ins welcome, memberships available.",
    bullets: ["Physician-formulated blends", "20-45 minute sessions", "Membership pricing available", "Add a vitamin boost shot"],
    startingPrice: "From $79",
    icon: "💧",
  },
];

export function getTreatmentContent(slug: TreatmentCategory): TreatmentContent {
  return TREATMENT_CONTENT.find((t) => t.slug === slug)!;
}
