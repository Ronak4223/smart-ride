export type DayPreset = "weekdays" | "weekdays-sat" | "custom";

export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type DayLabel = (typeof DAY_LABELS)[number];

export interface City {
  slug: string;
  name: string;
  state: string;
  /** Daily operating window for this city's Smart Ride service, e.g. larger
   * metros run longer hours than newly-launched tier-2 towns. Pickup times
   * outside this window have no available subscription plans. */
  serviceHours: { start: string; end: string };
  /** Whether this city currently runs weekend (Sat/Sun) subscriptions. Newer
   * markets launch on weekdays only. */
  operatesWeekends: boolean;
}

export interface VehicleCategory {
  id: "hatchback" | "sedan" | "premium-sedan" | "suv" | "van";
  label: string;
  seats: number;
}

export interface MatchedPlan {
  id: string;
  tier: "basic" | "commute" | "pro";
  name: string;
  description: string;
  monthlyPrice: number;
  vehicle: VehicleCategory;
  pickupTime: string;
  dropTime: string;
  days: DayLabel[];
  route: { city: string; pickup: string; drop: string };
  seatsAvailable: number;
  seatsTotal: number;
  benefits: string[];
  popular: boolean;
}

export type SubscriptionStatus = "draft" | "matched" | "reviewing" | "confirmed";

export interface RouteSelection {
  city: string | null;
  pickup: string | null;
  drop: string | null;
  dayPreset: DayPreset | null;
  customDays: DayLabel[];
  pickupTime: string | null;
}

export interface ConfirmedSubscription {
  id: string;
  createdAt: string;
  route: { city: string; pickup: string; drop: string };
  days: DayLabel[];
  pickupTime: string;
  plan: MatchedPlan;
}

export type PortalRole = "user" | "driver" | "vehicle-owner" | "management" | "admin";

export interface SubscriptionState {
  selection: RouteSelection;
  matchedPlans: MatchedPlan[];
  selectedPlanId: string | null;
  status: SubscriptionStatus;
  confirmed: ConfirmedSubscription | null;
  role: PortalRole | null;
}
