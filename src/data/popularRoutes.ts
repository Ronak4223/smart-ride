// Unlike the illustrative inter-city entries this replaces, every route here
// is a real, valid city + pickup + drop combination from data/locations.ts,
// so "View Plan" can genuinely pre-fill and run the subscription flow.
export interface PopularRoute {
  citySlug: string;
  cityName: string;
  pickup: string;
  drop: string;
  time: string;
  plansLabel: string;
  price: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    citySlug: "gurugram",
    cityName: "Gurugram",
    pickup: "Sector 14",
    drop: "Cyber City",
    time: "~25 min",
    plansLabel: "3 plans",
    price: "₹4,999",
  },
  {
    citySlug: "delhi",
    cityName: "Delhi",
    pickup: "Connaught Place",
    drop: "Rohini",
    time: "~40 min",
    plansLabel: "3 plans",
    price: "₹3,999",
  },
  {
    citySlug: "delhi",
    cityName: "Delhi",
    pickup: "Dwarka",
    drop: "Saket",
    time: "~35 min",
    plansLabel: "3 plans",
    price: "₹3,799",
  },
  {
    citySlug: "noida",
    cityName: "Noida",
    pickup: "Sector 62",
    drop: "Sector 18",
    time: "~20 min",
    plansLabel: "3 plans",
    price: "₹3,499",
  },
  {
    citySlug: "chandigarh",
    cityName: "Chandigarh",
    pickup: "Sector 17",
    drop: "Manimajra",
    time: "~18 min",
    plansLabel: "2 plans",
    price: "₹3,299",
  },
  {
    citySlug: "panipat",
    cityName: "Panipat",
    pickup: "Model Town",
    drop: "GT Road",
    time: "~15 min",
    plansLabel: "2 plans",
    price: "₹2,799",
  },
];
