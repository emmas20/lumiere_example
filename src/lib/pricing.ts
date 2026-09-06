import { Lead, PlanLineItem } from "./types";

export function suggestLineItems(lead: Lead): PlanLineItem[] {
  const d = lead.details;

  if (d.kind === "injectables") {
    const perArea = 220;
    const items: PlanLineItem[] = d.areas.length
      ? d.areas.map((a) => ({ name: a, price: a.toLowerCase().includes("lip") ? 650 : perArea }))
      : [{ name: "Injectable Consultation", price: 220 }];
    return items;
  }

  if (d.kind === "laser") {
    const perArea = 140 * Math.max(1, d.areas.length);
    return [{ name: `${d.areas.join(" & ") || "Treatment Area"} — 6-Session Package`, price: Math.round(perArea * 6 * 0.7) }];
  }

  if (d.kind === "skin") {
    const base = 199;
    const extra = d.concerns.length > 2 ? 60 : 0;
    return [{ name: "Signature HydraFacial", price: base }, ...(extra ? [{ name: "Targeted Concern Boost", price: extra }] : [])];
  }

  if (d.kind === "body") {
    const perArea = 725;
    return [{ name: `${d.areas.join(" + ") || "Treatment Area"} — 3-Session Package`, price: perArea * Math.max(1, d.areas.length) }];
  }

  // wellness
  const focusPricing: Record<string, number> = {
    "energy & immunity": 89,
    "hydration": 79,
    "recovery": 99,
    "beauty & glow": 109,
  };
  const key = d.focus.toLowerCase();
  const matched = Object.entries(focusPricing).find(([k]) => key.includes(k.split(" ")[0]));
  return [{ name: `${d.focus || "IV Therapy"} Drip`, price: matched ? matched[1] : 89 }];
}
