import type { DayLabel, DayPreset, MatchedPlan, VehicleCategory } from "../types/subscription";
import { getCityBySlug } from "./locations";

export const DAY_PRESET_OPTIONS: { value: DayPreset; label: string; days: DayLabel[] }[] = [
  { value: "weekdays", label: "Monday – Friday", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  {
    value: "weekdays-sat",
    label: "Monday – Saturday",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  { value: "custom", label: "Custom days", days: [] },
];

export function daysForPreset(preset: DayPreset | null, customDays: DayLabel[]): DayLabel[] {
  if (preset === "custom") return customDays;
  return DAY_PRESET_OPTIONS.find((o) => o.value === preset)?.days ?? [];
}

export function formatDayRange(days: DayLabel[]): string {
  if (days.length === 0) return "No days selected";
  if (days.length === 5 && days.join() === ["Mon", "Tue", "Wed", "Thu", "Fri"].join()) {
    return "Mon – Fri";
  }
  if (days.length === 6 && days.join() === ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].join()) {
    return "Mon – Sat";
  }
  return days.join(" • ");
}

/** Small deterministic string hash so the same route always produces the same mock numbers. */
function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function addMinutes(time: string, minutes: number): string {
  const parts = time.split(":").map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const total = h * 60 + m + minutes;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hh = Math.floor(wrapped / 60);
  const mm = wrapped % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function toMinutes(time: string): number {
  const parts = time.split(":").map(Number);
  return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
}

/**
 * Real, deterministic reason a route can have zero available plans: the
 * requested pickup time falls outside that city's daily service window, or
 * the schedule includes a weekend day in a city that doesn't run weekend
 * service yet. Both facts come straight from the user's own selections and
 * the city's real (mock) service metadata — nothing here is random.
 */
export function isRouteServiceable(citySlug: string, days: DayLabel[], pickupTime: string): boolean {
  const city = getCityBySlug(citySlug);
  if (!city) return false;
  if (!city.operatesWeekends && days.some((d) => d === "Sat" || d === "Sun")) return false;
  const t = toMinutes(pickupTime);
  return t >= toMinutes(city.serviceHours.start) && t <= toMinutes(city.serviceHours.end);
}

export function formatTime12(time: string): string {
  const parts = time.split(":").map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

const VEHICLES: Record<MatchedPlan["tier"], VehicleCategory> = {
  basic: { id: "hatchback", label: "Standard Hatchback", seats: 4 },
  commute: { id: "premium-sedan", label: "Premium Sedan", seats: 4 },
  pro: { id: "suv", label: "Executive SUV", seats: 6 },
};

const TIER_META: Record<
  MatchedPlan["tier"],
  { name: string; description: string; basePrice: number; travelPadding: number; benefits: string[] }
> = {
  basic: {
    name: "Smart Basic",
    description: "Reliable daily commute at the lowest fixed price",
    basePrice: 2999,
    travelPadding: 40,
    benefits: ["Verified driver", "Scheduled pickup window", "Standard vehicle", "Customer support"],
  },
  commute: {
    name: "Smart Commute",
    description: "Our most popular plan for regular office commuters",
    basePrice: 4999,
    travelPadding: 45,
    benefits: [
      "Verified driver",
      "Premium vehicle",
      "Live tracking",
      "Free rescheduling",
      "Priority pickup window",
    ],
    // popular tier
  },
  pro: {
    name: "Smart Pro",
    description: "Priority routing and a larger vehicle for daily professionals",
    basePrice: 6999,
    travelPadding: 50,
    benefits: [
      "Verified driver",
      "Executive SUV",
      "Live tracking",
      "Free rescheduling",
      "Dedicated support line",
    ],
  },
};

export interface MatchPlansInput {
  city: string;
  pickup: string;
  drop: string;
  days: DayLabel[];
  pickupTime: string;
}

/**
 * Deterministic, frontend-only "plan matching" — no backend or routing API is
 * involved. Given a route + schedule, this produces 1-3 mock subscription
 * plans with computed drop times, seat availability and pricing — or an
 * empty array when the route genuinely isn't serviceable (see
 * isRouteServiceable), which is the only way this ever returns [].
 */
export function matchPlansForRoute(input: MatchPlansInput): MatchedPlan[] {
  if (!isRouteServiceable(input.city, input.days, input.pickupTime)) return [];

  const seed = hashString(`${input.city}|${input.pickup}|${input.drop}|${input.pickupTime}`);
  const tiers: MatchedPlan["tier"][] = ["basic", "commute", "pro"];

  // Deterministic 1-3 tier subset per route: rotate the tier list and take a
  // seeded-length slice, so different routes show different combinations
  // without ever being able to produce zero tiers on a serviceable route.
  // NOTE: seed can exceed 2^31-1 (hashString uses >>> 0), so we must use
  // Math.floor division here rather than `seed >> n` — a signed right-shift
  // on a value that large flips negative and corrupts the following `%`.
  const rotation = seed % tiers.length;
  const rotatedTiers = [...tiers.slice(rotation), ...tiers.slice(0, rotation)];
  const tierCount = 1 + (Math.floor(seed / 4) % tiers.length);
  const finalTiers = rotatedTiers.slice(0, tierCount);

  return finalTiers.map((tier, idx) => {
    const meta = TIER_META[tier];
    const vehicle = VEHICLES[tier];
    const priceJitter = (seed % 7) * 50 * (idx + 1);
    const dropTime = addMinutes(input.pickupTime, meta.travelPadding + (seed % 10));
    const seatsTotal = vehicle.seats;
    const seatsAvailable = Math.max(1, seatsTotal - (Math.floor(seed / 2 ** (idx + 2)) % seatsTotal));

    return {
      id: `${tier}-${input.city}-${idx}`,
      tier,
      name: meta.name,
      description: meta.description,
      monthlyPrice: meta.basePrice + priceJitter,
      vehicle,
      pickupTime: input.pickupTime,
      dropTime,
      days: input.days,
      route: { city: input.city, pickup: input.pickup, drop: input.drop },
      seatsAvailable,
      seatsTotal,
      benefits: meta.benefits,
      popular: tier === "commute",
    } satisfies MatchedPlan;
  });
}

export function generateSubscriptionId(seedInput: string): string {
  const year = new Date().getFullYear();
  const n = 10000 + (hashString(seedInput + Date.now().toString()) % 90000);
  return `SR-${year}-${n}`;
}
