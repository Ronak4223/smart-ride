// All data on this page is mock/demo data for a frontend-only prototype.
// Nothing here is fetched from a server.

import type { ConfirmedSubscription } from "../types/subscription";

export interface UpcomingRide {
  id: string;
  date: string;
  time: string;
  route: string;
  driver: string;
  vehicle: string;
  status: "Scheduled" | "Completed" | "Missed";
}

export const USER_PROFILE = {
  name: "Ronak Malhotra",
  email: "ronak.malhotra@example.com",
  phone: "+91 98xxxxx210",
  memberSince: "March 2026",
};

export const USER_UPCOMING_RIDES: UpcomingRide[] = [
  { id: "RD-1042", date: "Tomorrow", time: "8:30 AM", route: "Sector 14 → Cyber City", driver: "Arjun Mehta", vehicle: "Premium Sedan · HR-26-BF-4410", status: "Scheduled" },
  { id: "RD-1041", date: "Today", time: "6:10 PM", route: "Cyber City → Sector 14", driver: "Arjun Mehta", vehicle: "Premium Sedan · HR-26-BF-4410", status: "Completed" },
  { id: "RD-1040", date: "Yesterday", time: "8:32 AM", route: "Sector 14 → Cyber City", driver: "Arjun Mehta", vehicle: "Premium Sedan · HR-26-BF-4410", status: "Completed" },
];

export const USER_PAYMENTS = [
  { id: "INV-2026-08", month: "August 2026", amount: "₹4,999", status: "Paid", date: "01 Aug 2026" },
  { id: "INV-2026-07", month: "July 2026", amount: "₹4,999", status: "Paid", date: "01 Jul 2026" },
  { id: "INV-2026-06", month: "June 2026", amount: "₹4,999", status: "Paid", date: "01 Jun 2026" },
];

/** Shown on the User Dashboard only when the visitor hasn't confirmed a real
 * (demo) subscription yet, so the dashboard never looks broken/empty. Fully
 * typed as a real ConfirmedSubscription so no `any` casts are needed where
 * it's consumed. */
export const SAMPLE_CONFIRMED_SUBSCRIPTION: ConfirmedSubscription = {
  id: "SR-2026-00124",
  createdAt: "2026-08-01T08:30:00.000Z",
  route: { city: "gurugram", pickup: "Sector 14", drop: "Cyber City" },
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  pickupTime: "08:30",
  plan: {
    id: "commute-gurugram-sample",
    tier: "commute",
    name: "Smart Commute",
    description: "Our most popular plan for regular office commuters",
    monthlyPrice: 4999,
    vehicle: { id: "premium-sedan", label: "Premium Sedan", seats: 4 },
    pickupTime: "08:30",
    dropTime: "09:15",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    route: { city: "gurugram", pickup: "Sector 14", drop: "Cyber City" },
    seatsAvailable: 2,
    seatsTotal: 4,
    benefits: ["Verified driver", "Premium vehicle", "Live tracking", "Free rescheduling", "Priority pickup window"],
    popular: true,
  },
};

export interface DriverTrip {
  id: string;
  time: string;
  route: string;
  riders: number;
  status: "Not Started" | "Started" | "Arrived" | "Completed";
}

export const DRIVER_PROFILE = {
  name: "Arjun Mehta",
  rating: "4.9",
  trips: "2,400+",
  experience: "8 years",
  vehicle: { number: "HR-26-BF-4410", type: "Premium Sedan", status: "Active" as const },
};

export const DRIVER_TODAY_TRIPS: DriverTrip[] = [
  { id: "TRIP-501", time: "8:30 AM", route: "Sector 14 → Cyber City", riders: 5, status: "Not Started" },
  { id: "TRIP-502", time: "6:10 PM", route: "Cyber City → Sector 14", riders: 5, status: "Not Started" },
];

export const DRIVER_RIDERS = [
  { name: "Ronak Malhotra", pickup: "Sector 14, Gate 2", seat: "1" },
  { name: "Priya Sharma", pickup: "Sector 14, Gate 4", seat: "2" },
  { name: "Rohan Kapoor", pickup: "Sector 15 Market", seat: "3" },
  { name: "Ananya Verma", pickup: "Sector 15 Market", seat: "4" },
  { name: "Karan Bhatt", pickup: "Golf Course Road", seat: "5" },
];

export interface FleetVehicle {
  id: string;
  number: string;
  type: string;
  status: "Active" | "Idle" | "Maintenance";
  driver: string | null;
}

export const VEHICLE_OWNER_FLEET: FleetVehicle[] = [
  { id: "V-1", number: "HR-26-BF-4410", type: "Premium Sedan", status: "Active", driver: "Arjun Mehta" },
  { id: "V-2", number: "HR-26-BF-2290", type: "Standard Hatchback", status: "Active", driver: "Vikram Nair" },
  { id: "V-3", number: "HR-26-BF-7781", type: "Executive SUV", status: "Idle", driver: null },
  { id: "V-4", number: "HR-26-BF-3350", type: "Premium Sedan", status: "Maintenance", driver: null },
  { id: "V-5", number: "HR-26-BF-9012", type: "Van", status: "Active", driver: "Sana Malik" },
];

export const VEHICLE_OWNER_REVENUE = [
  { month: "Mar", value: 182000 },
  { month: "Apr", value: 194000 },
  { month: "May", value: 201500 },
  { month: "Jun", value: 213000 },
  { month: "Jul", value: 226800 },
  { month: "Aug", value: 238400 },
];

export const VEHICLE_OWNER_MAINTENANCE = [
  { vehicle: "HR-26-BF-3350", type: "Brake inspection", due: "28 Aug 2026" },
  { vehicle: "HR-26-BF-4410", type: "Oil change", due: "05 Sep 2026" },
  { vehicle: "HR-26-BF-7781", type: "Tyre rotation", due: "12 Sep 2026" },
];

export interface RouteRow {
  route: string;
  subscribers: number;
  driversAssigned: number;
  status: "Healthy" | "Understaffed" | "New";
}

export const MANAGEMENT_ROUTES: RouteRow[] = [
  { route: "Sector 14 → Cyber City", subscribers: 42, driversAssigned: 4, status: "Healthy" },
  { route: "Connaught Place → Rohini", subscribers: 31, driversAssigned: 3, status: "Healthy" },
  { route: "Sector 17 → Manimajra", subscribers: 12, driversAssigned: 1, status: "Understaffed" },
  { route: "Model Town → GT Road", subscribers: 8, driversAssigned: 1, status: "New" },
];

export const MANAGEMENT_COMPLAINTS = [
  { id: "CMP-2201", subject: "Driver arrived late", route: "Sector 14 → Cyber City", status: "Open" },
  { id: "CMP-2198", subject: "Vehicle AC not working", route: "Golf Course Road", status: "In Progress" },
  { id: "CMP-2190", subject: "Billing discrepancy", route: "Connaught Place → Rohini", status: "Resolved" },
];

export const MANAGEMENT_DRIVERS = [
  { name: "Arjun Mehta", status: "Online", route: "Sector 14 → Cyber City" },
  { name: "Vikram Nair", status: "Online", route: "Connaught Place → Rohini" },
  { name: "Sana Malik", status: "Offline", route: "Sector 17 → Manimajra" },
  { name: "Karan Bhatt", status: "Online", route: "Model Town → GT Road" },
];

export const ADMIN_STATS = {
  totalUsers: 4820,
  totalDrivers: 312,
  totalVehicles: 268,
  activeSubscriptions: 3940,
  monthlyRevenue: "₹1.94 Cr",
  completedRides: 128400,
};

export const ADMIN_CITIES = [
  { city: "Gurugram", subscriptions: 1240, drivers: 96 },
  { city: "Delhi", subscriptions: 1480, drivers: 108 },
  { city: "Noida", subscriptions: 640, drivers: 48 },
  { city: "Chandigarh", subscriptions: 310, drivers: 28 },
  { city: "Panipat", subscriptions: 150, drivers: 18 },
  { city: "Sonipat", subscriptions: 80, drivers: 9 },
  { city: "Karnal", subscriptions: 40, drivers: 5 },
];

export const ADMIN_STAFF = [
  { name: "Neha Kulkarni", role: "Operations Manager", city: "Gurugram" },
  { name: "Manoj Tiwari", role: "Fleet Supervisor", city: "Delhi" },
  { name: "Divya Rao", role: "Support Lead", city: "Noida" },
];

export const ADMIN_REVENUE_TREND = [
  { month: "Mar", value: 1520000 },
  { month: "Apr", value: 1610000 },
  { month: "May", value: 1688000 },
  { month: "Jun", value: 1755000 },
  { month: "Jul", value: 1842000 },
  { month: "Aug", value: 1940000 },
];
