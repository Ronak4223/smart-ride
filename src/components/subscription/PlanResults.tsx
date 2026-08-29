import { Check, MapPin, RefreshCw, Sparkles, Users } from "lucide-react";
import { useSubscription } from "../../lib/subscription-store";
import { formatDayRange, formatTime12 } from "../../data/subscriptionPlans";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { EmptyState } from "../dashboard/EmptyState";

export function PlanResults() {
  const { state, selectPlan, goToReview, retryRoute } = useSubscription();
  const { matchedPlans, selectedPlanId, selection } = state;

  if (state.status === "draft") return null;

  if (matchedPlans.length === 0) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-sr">
        <EmptyState
          icon={MapPin}
          title="We couldn't find a subscription for this route yet."
          description="This can happen outside our service hours for this city, or if the city doesn't run weekend service yet. Try a different pickup time, day, or city."
          action={
            <Button variant="outline" size="sm" onClick={retryRoute}>
              <RefreshCw className="size-3.5" />
              Try Another Route
            </Button>
          }
        />
      </div>
    );
  }

  const selectedPlan = matchedPlans.find((p) => p.id === selectedPlanId);
  const firstPlan = matchedPlans[0]!;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5 duration-500 ease-sr">
      <div>
        <h2 className="text-lg font-semibold sm:text-xl">Matching Plans</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {matchedPlans.length} plan{matchedPlans.length > 1 ? "s" : ""} found for{" "}
          <span className="text-foreground">
            {selection.pickup} → {selection.drop}
          </span>
          , {formatDayRange(firstPlan.days)} · {formatTime12(firstPlan.pickupTime)}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {matchedPlans.map((plan, idx) => {
          const isSelected = plan.id === selectedPlanId;
          return (
            <Card
              key={plan.id}
              style={{ animationDelay: `${idx * 90}ms` }}
              className={`relative animate-in fade-in slide-in-from-bottom-3 overflow-hidden duration-500 ease-sr transition-[transform,box-shadow,border-color] ${
                isSelected
                  ? "border-primary ring-2 ring-primary/40 scale-[1.015] shadow-lg shadow-primary/10"
                  : "border-border/70 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-md"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  <Sparkles className="size-3" />
                  Popular
                </span>
              ) : null}
              {isSelected ? (
                <span className="absolute left-3 top-3 inline-flex animate-in zoom-in items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-success-foreground duration-400 ease-sr-settle">
                  <Check className="size-3" />
                  Selected
                </span>
              ) : null}
              <CardContent className="flex h-full flex-col gap-4 p-5 pt-11">
                <div>
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight">₹{plan.monthlyPrice.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>

                <div className="space-y-1.5 rounded-lg bg-muted/40 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="text-right font-medium">
                      {plan.route.pickup} → {plan.route.drop}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Timing</span>
                    <span className="font-medium">
                      {formatTime12(plan.pickupTime)} → {formatTime12(plan.dropTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Days</span>
                    <span className="font-medium">{formatDayRange(plan.days)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-medium">{plan.vehicle.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="size-3" />
                      {plan.seatsAvailable}/{plan.seatsTotal} seats
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {plan.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-1.5">
                      <Check className="size-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-auto w-full transition-transform duration-200 ease-sr active:scale-[0.98]"
                  variant={isSelected ? "secondary" : "default"}
                  onClick={() => selectPlan(plan.id)}
                >
                  {isSelected ? (
                    <>
                      <Check className="size-4" /> Selected
                    </>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedPlan ? (
        <div className="flex animate-in fade-in slide-in-from-bottom-2 justify-end duration-400 ease-sr">
          <Button size="lg" className="transition-transform duration-200 ease-sr active:scale-[0.98]" onClick={goToReview}>
            Review Subscription
          </Button>
        </div>
      ) : null}
    </div>
  );
}
