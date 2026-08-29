import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "../components/Nav/Nav";
import { Plans } from "../components/Plans/Plans";
import { Compare } from "../components/sections/Compare";
import { Footer } from "../components/sections/Footer";

export const Route = createFileRoute("/plans")({
  head: () => ({ meta: [{ title: "Plans — Smart Ride" }] }),
  component: PlansPage,
});

function PlansPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "clamp(90px, 12vh, 130px)" }}>
        <Plans />
        <Compare />
      </main>
      <Footer />
    </>
  );
}
