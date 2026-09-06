export type TreatmentCategory = "injectables" | "laser" | "skin" | "body" | "wellness";

export const TREATMENT_LABELS: Record<TreatmentCategory, string> = {
  injectables: "Botox & Dermal Fillers",
  laser: "Laser Hair Removal",
  skin: "HydraFacial & Skin Rejuvenation",
  body: "Body Contouring",
  wellness: "IV Therapy & Wellness Shots",
};

export type LeadStatus =
  | "new"
  | "contacted"
  | "plan_sent"
  | "follow_up"
  | "accepted"
  | "booked"
  | "no_show"
  | "completed"
  | "lost";

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New Inquiry",
  contacted: "Contacted",
  plan_sent: "Treatment Plan Sent",
  follow_up: "Follow-Up",
  accepted: "Accepted",
  booked: "Booked",
  no_show: "No-Show",
  completed: "Completed",
  lost: "Lost",
};

export interface ClientInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface InjectablesDetails {
  kind: "injectables";
  areas: string[];
  hasHadBefore: boolean;
  goal: string;
}

export interface LaserDetails {
  kind: "laser";
  areas: string[];
  skinTone: string;
  priorLaser: boolean;
}

export interface SkinDetails {
  kind: "skin";
  concerns: string[];
  skinType: string;
  currentRoutine: string;
}

export interface BodyDetails {
  kind: "body";
  areas: string[];
  goal: string;
  timeline: string;
}

export interface WellnessDetails {
  kind: "wellness";
  focus: string;
  frequency: string;
}

export type TreatmentDetails = InjectablesDetails | LaserDetails | SkinDetails | BodyDetails | WellnessDetails;

export interface PhotoRef {
  name: string;
  size: number;
}

export interface AutomationEvent {
  id: string;
  timestamp: number;
  label: string;
  detail?: string;
  kind: "system" | "client" | "spa" | "cancelled";
}

export interface PlanLineItem {
  name: string;
  price: number;
}

export interface TreatmentPlan {
  items: PlanLineItem[];
  total: number;
  sentAt: number;
}

export interface Appointment {
  date: string;
  time: string;
  location: string;
  instructions: string;
}

export interface Lead {
  id: string;
  client: ClientInfo;
  category: TreatmentCategory;
  details: TreatmentDetails;
  photos: PhotoRef[];
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: LeadStatus;
  createdAt: number;
  timeline: AutomationEvent[];
  plan?: TreatmentPlan;
  appointment?: Appointment;
  simHoursElapsed: number;
  isMember: boolean;
}
