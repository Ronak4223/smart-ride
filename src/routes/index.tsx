import { createFileRoute } from "@tanstack/react-router";
import heroTaxi from "../assets/hero-taxi.jpg";

import { Hero } from "../components/Hero/Hero";
import { SearchPanel } from "../components/sections/SearchPanel";
import { Stats } from "../components/Stats/Stats";
import { WhySmartRide } from "../components/sections/WhySmartRide";
import { HowItWorks } from "../components/HowItWorks/HowItWorks";
import { Plans } from "../components/Plans/Plans";
import { Compare } from "../components/sections/Compare";
import { RouteExplorer } from "../components/sections/RouteExplorer";
import { Vehicles } from "../components/sections/Vehicles";
import { Safety } from "../components/sections/Safety";
import { Drivers } from "../components/sections/Drivers";
import { Scheduler } from "../components/sections/Scheduler";
import { Savings } from "../components/sections/Savings";
import { AppPromo } from "../components/sections/AppPromo";
import { Testimonials } from "../components/sections/Testimonials";
import { Corporate } from "../components/sections/Corporate";
import { Partners } from "../components/sections/Partners";
import { Faq } from "../components/sections/Faq";
import { Blog } from "../components/sections/Blog";
import { FinalCta } from "../components/sections/FinalCta";
import { Footer } from "../components/sections/Footer";
import { SmoothScroll } from "../lib/SmoothScroll";
import { useReveal } from "../lib/useReveal";

const TITLE = "Smart Ride — Monthly Pickup & Drop Subscriptions";
const DESCRIPTION =
  "Fixed monthly pickup and drop plans with verified drivers, live tracking and predictable pricing for daily commuters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "preload", href: heroTaxi, as: "image", fetchPriority: "high" }],
  }),
  component: Index,
});

function Index() {
  useReveal();

  const page = (
    <div className="sr sr-app">
      <main>
        <Hero />
        <SearchPanel />
        <Stats />
        <WhySmartRide />
        <HowItWorks />
        <Plans />
        <Compare />
        <RouteExplorer />
        <Vehicles />
        <Safety />
        <Drivers />
        <Scheduler />
        <Savings />
        <AppPromo />
        <Testimonials />
        <Corporate />
        <Partners />
        <Faq />
        <Blog />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );

  return <SmoothScroll>{page}</SmoothScroll>;
}
