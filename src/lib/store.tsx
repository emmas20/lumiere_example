"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { Lead, AutomationEvent, TreatmentPlan, Appointment, TreatmentCategory, TreatmentDetails, ClientInfo, PhotoRef } from "./types";
import { buildSeedLeads } from "./seed";
import { nextId } from "./id";

interface State {
  leads: Lead[];
  hydrated: boolean;
}

type Action =
  | { type: "hydrate"; leads: Lead[] }
  | { type: "reset" }
  | {
      type: "submit_request";
      payload: {
        client: ClientInfo;
        category: TreatmentCategory;
        details: TreatmentDetails;
        photos: PhotoRef[];
        preferredDate: string;
        preferredTime: string;
        notes: string;
      };
      newId: string;
    }
  | { type: "send_plan"; leadId: string; plan: Omit<TreatmentPlan, "sentAt"> }
  | { type: "advance_time"; leadId: string; hours: number }
  | { type: "client_accept"; leadId: string }
  | { type: "book_appointment"; leadId: string; appointment: Appointment }
  | { type: "mark_completed"; leadId: string }
  | { type: "mark_no_show"; leadId: string }
  | { type: "run_demo_journey" };

function addEvent(lead: Lead, label: string, kind: AutomationEvent["kind"], detail?: string): Lead {
  const event: AutomationEvent = { id: nextId("ev"), timestamp: Date.now(), label, detail, kind };
  return { ...lead, timeline: [...lead.timeline, event] };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { leads: action.leads, hydrated: true };

    case "reset":
      return { leads: buildSeedLeads(), hydrated: true };

    case "submit_request": {
      const { client, category, details, photos, preferredDate, preferredTime, notes } = action.payload;
      let lead: Lead = {
        id: action.newId,
        client,
        category,
        details,
        photos,
        preferredDate,
        preferredTime,
        notes,
        status: "new",
        createdAt: Date.now(),
        simHoursElapsed: 0,
        isMember: false,
        timeline: [],
      };
      lead = addEvent(lead, "Consultation request received", "client");
      lead = addEvent(lead, "Client confirmation sent automatically", "system", `Thanks, ${client.firstName}! We've received your request and can't wait to help.`);
      lead = addEvent(lead, "Provider notified", "system", "New lead pushed to Lumière's admin dashboard.");
      return { ...state, leads: [lead, ...state.leads] };
    }

    case "send_plan": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          let next: Lead = { ...l, status: "plan_sent", plan: { ...action.plan, sentAt: Date.now() } };
          next = addEvent(next, `Treatment plan sent — $${action.plan.total.toLocaleString()}`, "spa");
          return next;
        }),
      };
    }

    case "advance_time": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          const newHours = l.simHoursElapsed + action.hours;
          let next = { ...l, simHoursElapsed: newHours };
          const firstName = l.client.firstName;

          if (l.status === "plan_sent") {
            const passed24 = l.simHoursElapsed < 24 && newHours >= 24;
            const passed72 = l.simHoursElapsed < 72 && newHours >= 72;
            if (passed24) {
              next = { ...next, status: "follow_up" };
              next = addEvent(next, "Follow-up sent — no response after 24 hours", "system", `Hi ${firstName}! Just checking in on the treatment plan we put together — happy to answer any questions.`);
            } else if (passed72) {
              next = addEvent(next, "Second follow-up sent — no response after 72 hours", "system", `Hi ${firstName}, we'd still love to help — reply anytime and we'll get you scheduled.`);
              next = { ...next, status: "lost" };
            }
          } else if (l.status === "follow_up") {
            const passed72 = l.simHoursElapsed < 72 && newHours >= 72;
            if (passed72) {
              next = addEvent(next, "Second follow-up sent — no response after 72 hours", "system", `Hi ${firstName}, we'd still love to help — reply anytime and we'll get you scheduled.`);
              next = { ...next, status: "lost" };
            }
          } else if (l.status === "booked") {
            next = addEvent(next, "Appointment reminder sent", "system", `Reminder: Your ${next.plan?.items[0]?.name ?? "appointment"} is tomorrow at ${l.appointment?.time ?? "the scheduled time"}.`);
          } else if (l.status === "no_show") {
            const passed1 = l.simHoursElapsed < 1 && newHours >= 1;
            if (passed1) {
              next = addEvent(next, "No-show recovery message sent", "system", "We missed you! Life happens — want to grab a new time this week? We'll hold your treatment plan.");
            }
          } else if (l.status === "completed") {
            const passed2 = l.simHoursElapsed < 2 && newHours >= 2;
            const passed24 = l.simHoursElapsed < 24 && newHours >= 24;
            if (passed2) {
              next = addEvent(next, "Thank-you message sent", "system", "Thank you for visiting Lumière! We hope you're loving your results.");
            } else if (passed24) {
              next = addEvent(next, "Google review request sent", "system", "If you have a moment, we'd really appreciate a Google review.");
              next = addEvent(next, "Rebooking reminder scheduled", "system", l.isMember ? "Your next membership visit will be reminded automatically." : "We'll check back in when it's time for your next visit.");
            }
          }
          return next;
        }),
      };
    }

    case "client_accept": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          let next: Lead = { ...l, status: "accepted" };
          next = addEvent(next, "Client accepted plan", "client");
          next = {
            ...next,
            timeline: next.timeline.map((e) =>
              e.kind === "system" && e.label.toLowerCase().includes("follow-up") ? { ...e, kind: "cancelled" as const } : e
            ),
          };
          return next;
        }),
      };
    }

    case "book_appointment": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          let next: Lead = { ...l, status: "booked", appointment: action.appointment, simHoursElapsed: 0 };
          next = addEvent(next, "Booking confirmation sent", "system", `Appointment confirmed for ${action.appointment.date} at ${action.appointment.time}.`);
          return next;
        }),
      };
    }

    case "mark_completed": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          let next: Lead = { ...l, status: "completed", simHoursElapsed: 0 };
          next = addEvent(next, "Visit marked completed", "spa");
          return next;
        }),
      };
    }

    case "mark_no_show": {
      return {
        ...state,
        leads: state.leads.map((l) => {
          if (l.id !== action.leadId) return l;
          let next: Lead = { ...l, status: "no_show", simHoursElapsed: 0 };
          next = addEvent(next, "Marked as No-Show", "spa");
          return next;
        }),
      };
    }

    case "run_demo_journey": {
      const newId = nextId("lead-demo");
      let lead: Lead = {
        id: newId,
        client: { firstName: "Jordan", lastName: "Blake", phone: "(480) 555-0142", email: "jordan.blake@example.com" },
        category: "injectables",
        details: { kind: "injectables", areas: ["Forehead lines", "Frown lines"], hasHadBefore: true, goal: "Refresh before an event next month" },
        photos: [{ name: "jordan-front.jpg", size: 1_100_000 }],
        preferredDate: "Next week",
        preferredTime: "Afternoon",
        notes: "Found us on Instagram, first time at Lumière.",
        status: "new",
        createdAt: Date.now(),
        simHoursElapsed: 0,
        isMember: false,
        timeline: [],
      };
      lead = addEvent(lead, "Consultation request received", "client");
      lead = addEvent(lead, "Client confirmation sent automatically", "system", "Thanks, Jordan! We've received your request and can't wait to help.");
      lead = addEvent(lead, "Provider notified", "system");
      const plan: TreatmentPlan = { items: [{ name: "Forehead Lines", price: 220 }, { name: "Frown Lines", price: 220 }], total: 440, sentAt: Date.now() };
      lead = { ...lead, status: "plan_sent", plan };
      lead = addEvent(lead, "Treatment plan sent — $440", "spa");
      return { ...state, leads: [lead, ...state.leads] };
    }

    default:
      return state;
  }
}

const StoreContext = createContext<{
  leads: Lead[];
  hydrated: boolean;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const STORAGE_KEY = "lumiere-medspa-demo-state-v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { leads: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "hydrate", leads: JSON.parse(raw) as Lead[] });
      } else {
        dispatch({ type: "hydrate", leads: buildSeedLeads() });
      }
    } catch {
      dispatch({ type: "hydrate", leads: buildSeedLeads() });
    }
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.leads));
    }
  }, [state.leads, state.hydrated]);

  const value = useMemo(() => ({ leads: state.leads, hydrated: state.hydrated, dispatch }), [state.leads, state.hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
