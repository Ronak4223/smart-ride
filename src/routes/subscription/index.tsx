import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { FlowHeader } from "../../components/subscription/FlowHeader";
import { LocationForm } from "../../components/subscription/LocationForm";
import { PlanResults } from "../../components/subscription/PlanResults";
import { useSubscription } from "../../lib/subscription-store";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/subscription/")({
  head: () => ({
    meta: [{ title: "Build Your Subscription — Smart Ride" }],
  }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const { state, hydrated, resetFlow } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && state.status === "reviewing") {
      navigate({ to: "/subscription/review" });
    }
  }, [hydrated, state.status, navigate]);

  const step = state.status === "matched" || state.matchedPlans.length > 0 ? 2 : 1;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <FlowHeader step={step} />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Build your subscription</span>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Your route. Your schedule. One monthly ride.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Choose your city and locality, set your schedule, and we'll match you with monthly subscription plans
            that run on your route.
          </p>
        </div>

        {hydrated && state.status === "confirmed" && state.confirmed ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3.5 text-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-5 shrink-0 text-success" />
              <span>
                You already have a confirmed subscription (<strong>{state.confirmed.id}</strong>). Starting a new one
                will replace this demo session.
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigate({ to: "/subscription/success" })}>
                View Subscription
              </Button>
              <Button size="sm" variant="secondary" onClick={resetFlow}>
                Start New
              </Button>
            </div>
          </div>
        ) : null}

        <LocationForm />
        <PlanResults />
      </main>
    </div>
  );
}
