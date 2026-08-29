import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Calendar, Car, Clock, MapPin, Pencil, Wallet } from "lucide-react";
import { FlowHeader } from "../../components/subscription/FlowHeader";
import { FlowLoadingState } from "../../components/subscription/FlowLoadingState";
import { useSubscription } from "../../lib/subscription-store";
import { formatDayRange, formatTime12 } from "../../data/subscriptionPlans";
import { getCityBySlug } from "../../data/locations";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Route = createFileRoute("/subscription/review")({
  head: () => ({ meta: [{ title: "Review Your Subscription — Smart Ride" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const { state, hydrated, editDetails, confirmSubscription } = useSubscription();
  const navigate = useNavigate();
  const plan = state.matchedPlans.find((p) => p.id === state.selectedPlanId);
  const city = getCityBySlug(state.selection.city);

  useEffect(() => {
    if (hydrated && (!plan || state.status === "draft")) {
      navigate({ to: "/subscription", replace: true });
    }
  }, [hydrated, plan, state.status, navigate]);

  if (!plan || !city) {
    return (
      <div className="dark flex min-h-screen flex-col bg-background text-foreground">
        <FlowHeader step={3} />
        {!hydrated ? <FlowLoadingState /> : null}
      </div>
    );
  }

  const rows = [
    { icon: MapPin, label: "City", value: city.name },
    { icon: MapPin, label: "Pickup", value: state.selection.pickup },
    { icon: MapPin, label: "Drop", value: state.selection.drop },
    { icon: Calendar, label: "Schedule", value: formatDayRange(plan.days) },
    { icon: Clock, label: "Pickup Time", value: state.selection.pickupTime ? formatTime12(state.selection.pickupTime) : "—" },
    { icon: Car, label: "Vehicle", value: plan.vehicle.label },
    { icon: Wallet, label: "Plan", value: plan.name },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <FlowHeader step={3} />
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Review Your Subscription</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Double-check your route, schedule and plan before confirming.
          </p>
        </div>

        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {rows.map((row, i) => (
              <div
                key={row.label}
                style={{ animationDelay: `${120 + i * 60}ms` }}
                className="flex animate-in fade-in items-center justify-between gap-4 px-5 py-3.5 duration-400 ease-sr transition-colors hover:bg-muted/30"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <row.icon className="size-4" />
                  {row.label}
                </span>
                <span className="text-right text-sm font-medium">{row.value}</span>
              </div>
            ))}
            <div
              style={{ animationDelay: `${120 + rows.length * 60}ms` }}
              className="flex animate-in fade-in items-center justify-between gap-4 bg-primary/[0.06] px-5 py-4 duration-400 ease-sr"
            >
              <span className="text-sm font-medium text-muted-foreground">Monthly Price</span>
              <span className="text-xl font-bold tracking-tight text-primary">
                ₹{plan.monthlyPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex animate-in fade-in slide-in-from-bottom-1 flex-col-reverse gap-3 duration-500 ease-sr [animation-delay:400ms] sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="transition-transform duration-200 ease-sr active:scale-[0.98]"
            onClick={() => {
              editDetails();
              navigate({ to: "/subscription" });
            }}
          >
            <Pencil className="size-4" />
            Edit Details
          </Button>
          <Button
            size="lg"
            className="transition-transform duration-200 ease-sr active:scale-[0.98]"
            onClick={() => {
              const confirmed = confirmSubscription();
              if (confirmed) navigate({ to: "/subscription/success" });
            }}
          >
            Confirm Subscription
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
