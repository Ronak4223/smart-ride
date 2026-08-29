import type { City } from "../types/subscription";

// Mock data only — this is a frontend prototype and does not call any
// geocoding or maps API. Keep the city list intentionally short.
//
// serviceHours/operatesWeekends model a realistic, deterministic reason a
// route can legitimately have no matching plans: established metro cities
// run long daily windows and weekend service, while newer tier-2 markets
// only run a shorter weekday window so far.
export const CITIES: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", serviceHours: { start: "06:00", end: "22:30" }, operatesWeekends: true },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", serviceHours: { start: "06:00", end: "22:30" }, operatesWeekends: true },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", serviceHours: { start: "06:00", end: "22:00" }, operatesWeekends: true },
  { slug: "chandigarh", name: "Chandigarh", state: "Chandigarh", serviceHours: { start: "06:30", end: "21:30" }, operatesWeekends: true },
  { slug: "panipat", name: "Panipat", state: "Haryana", serviceHours: { start: "07:00", end: "20:00" }, operatesWeekends: false },
  { slug: "sonipat", name: "Sonipat", state: "Haryana", serviceHours: { start: "07:00", end: "20:00" }, operatesWeekends: false },
  { slug: "karnal", name: "Karnal", state: "Haryana", serviceHours: { start: "07:30", end: "19:30" }, operatesWeekends: false },
];

/** Pickup and drop share the same locality dataset per city, per the product spec. */
export const AREAS_BY_CITY: Record<string, string[]> = {
  delhi: ["Connaught Place", "Rohini", "Dwarka", "Saket", "Lajpat Nagar", "Karol Bagh"],
  gurugram: ["Sector 14", "Sector 15", "Sector 21", "Sector 29", "Golf Course Road", "Cyber City"],
  noida: ["Sector 18", "Sector 62", "Sector 137", "Film City", "Botanical Garden", "Sector 76"],
  chandigarh: ["Sector 17", "Sector 22", "Sector 34", "Manimajra", "Industrial Area"],
  panipat: ["Model Town", "Sanoli Road", "Devi Mandir", "Assandh Road", "GT Road"],
  sonipat: ["Model Town", "Kundli", "Sector 14", "Old Court Road"],
  karnal: ["Sector 12", "Model Town", "Railway Road", "Kunjpura Road"],
};

export function getCityBySlug(slug: string | null | undefined): City | undefined {
  if (!slug) return undefined;
  return CITIES.find((c) => c.slug === slug);
}

export function getAreasForCity(citySlug: string | null | undefined): string[] {
  if (!citySlug) return [];
  return AREAS_BY_CITY[citySlug] ?? [];
}
