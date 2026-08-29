import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Calendar, Check, Clock, LayoutDashboard, MapPin, Wallet } from "lucide-react";
import { FlowHeader } from "../../components/subscription/FlowHeader";
import { FlowLoadingState } from "../../components/subscription/FlowLoadingState";
import { useSubscription } from "../../lib/subscription-store";
import { formatDayRange, formatTime12 } from "../../data/subscriptionPlans";
import { getCityBySlug } from "../../data/locations";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Route = createFileRoute("/subscription/success")({
  head: () => ({ meta: [{ title: "Subscription Confirmed — Smart Ride" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { state, hydrated } = useSubscription();
  const navigate = useNavigate();
  const confirmed = state.confirmed;
  const city = getCityBySlug(confirmed?.route.city);

  useEffect(() => {
    if (hydrated && !confirmed) {
      navigate({ to: "/subscription", replace: true });
    }
  }, [hydrated, confirmed, navigate]);

  if (!confirmed || !city) {
    return (
      <div className="dark flex min-h-screen flex-col bg-background text-foreground">
        <FlowHeader step={4} />
        {!hydrated ? <FlowLoadingState /> : null}
      </div>
    );
  }

  const rows = [
    { icon: MapPin, label: "Route", value: `${confirmed.route.pickup} → ${confirmed.route.drop}` },
    { icon: Calendar, label: "Schedule", value: formatDayRange(confirmed.days) },
    { icon: Clock, label: "Pickup", value: formatTime12(confirmed.pickupTime) },
    { icon: Wallet, label: "Plan", value: confirmed.plan.name },
    { icon: Wallet, label: "Monthly", value: `₹${confirmed.plan.monthlyPrice.toLocaleString("en-IN")}` },
  ];

  const dashboardHref = state.role ? `/dashboard/${state.role}` : "/dashboard";
  // Both dashboard actions should behave consistently: if a role has been
  // selected via the demo portal, both buttons land on that role's own
  // dashboard; otherwise both fall back to the role picker.
  const viewSubscriptionHref = dashboardHref;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <FlowHeader step={4} />
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-12 text-center sm:py-16">
        <div className="relative flex size-24 items-center justify-center">
          <span className="absolute inset-0 animate-in zoom-in-50 rounded-full bg-success/15 duration-600 ease-sr" />
          <span className="absolute inset-3 animate-in zoom-in-50 rounded-full bg-success/25 duration-700 ease-sr [animation-delay:120ms]" />
          <Check
            className="relative size-10 animate-in zoom-in text-success duration-500 ease-sr-settle [animation-delay:300ms]"
            strokeWidth={3}
          />
        </div>

        <div className="mt-6 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-sr [animation-delay:350ms]">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Subscription Confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your Smart Ride subscription is confirmed.</p>
        </div>

        <Card className="mt-8 w-full animate-in fade-in slide-in-from-bottom-3 text-left duration-700 ease-sr [animation-delay:450ms]">
          <CardContent className="divide-y divide-border/60 p-0">
            <div className="flex animate-in fade-in items-center justify-between gap-4 px-5 py-3.5 duration-500 ease-sr [animation-delay:520ms]">
              <span className="text-sm text-muted-foreground">Subscription ID</span>
              <span className="font-mono text-sm font-semibold text-primary">{confirmed.id}</span>
            </div>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className="flex animate-in fade-in items-center justify-between gap-4 px-5 py-3.5 duration-500 ease-sr transition-colors hover:bg-muted/30"
                style={{ animationDelay: `${580 + i * 90}ms` }}
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <row.icon className="size-4" />
                  {row.label}
                </span>
                <span className="text-right text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 flex w-full flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-sr [animation-delay:1000ms] sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="flex-1 transition-transform duration-200 ease-sr active:scale-[0.98] sm:flex-none"
            onClick={() => navigate({ to: dashboardHref as never })}
          >
            <LayoutDashboard className="size-4" />
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 transition-transform duration-200 ease-sr active:scale-[0.98] sm:flex-none"
            onClick={() => navigate({ to: viewSubscriptionHref as never })}
          >
            View Subscription
          </Button>
        </div>
      </main>
    </div>
  );
}
