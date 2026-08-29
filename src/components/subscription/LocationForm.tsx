import { useState } from "react";
import { ArrowRight, MapPin, Pencil } from "lucide-react";
import { useSubscription } from "../../lib/subscription-store";
import { CITIES, getAreasForCity, getCityBySlug } from "../../data/locations";
import { DAY_PRESET_OPTIONS, daysForPreset, formatDayRange, formatTime12 } from "../../data/subscriptionPlans";
import { DAY_LABELS, type DayLabel } from "../../types/subscription";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function LocationForm() {
  const {
    state,
    setCity,
    setPickup,
    setDrop,
    setDayPreset,
    toggleCustomDay,
    setPickupTime,
    routeError,
    isRouteReady,
    findPlans,
  } = useSubscription();
  const { selection } = state;
  const [forceEdit, setForceEdit] = useState(false);

  const city = getCityBySlug(selection.city);
  const areas = getAreasForCity(selection.city);
  const days = daysForPreset(selection.dayPreset, selection.customDays);
  const isLocked = state.status !== "draft" && !forceEdit;

  if (isLocked && city && selection.pickup && selection.drop && selection.pickupTime) {
    return (
      <Card className="animate-in fade-in slide-in-from-top-2 border-primary/30 bg-primary/[0.04] duration-400 ease-sr">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
              <MapPin className="size-5" />
            </span>
            <div className="text-sm leading-tight">
              <div className="font-semibold text-foreground">{city.name}</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-muted-foreground">
                <span>{selection.pickup}</span>
                <ArrowRight className="size-3.5" />
                <span>{selection.drop}</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {formatDayRange(days)} · {formatTime12(selection.pickupTime)}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setForceEdit(true)}>
            <Pencil className="size-3.5" />
            Edit details
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-5 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City">
            <Select
              value={selection.city ?? ""}
              onValueChange={(v) => {
                setCity(v);
                setForceEdit(true);
              }}
            >
              <SelectTrigger aria-label="Select your city">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}, {c.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Pickup Location" hint={!selection.city ? "Select a city first" : undefined}>
            <Select
              value={selection.pickup ?? ""}
              onValueChange={(v) => setPickup(v)}
              disabled={!selection.city}
            >
              <SelectTrigger aria-label="Select pickup area">
                <SelectValue placeholder="Select pickup area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Drop Location" hint={!selection.pickup ? "Select a pickup area first" : undefined}>
            <Select
              value={selection.drop ?? ""}
              onValueChange={(v) => setDrop(v)}
              disabled={!selection.pickup}
            >
              <SelectTrigger aria-label="Select drop area">
                <SelectValue placeholder="Select drop area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((a) => (
                  <SelectItem key={a} value={a} disabled={a === selection.pickup}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Pickup Time">
            <input
              type="time"
              value={selection.pickupTime ?? ""}
              onChange={(e) => setPickupTime(e.target.value)}
              aria-label="Select pickup time"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-all duration-300 ease-sr focus:ring-2 focus:ring-ring"
            />
          </Field>
        </div>

        {routeError ? (
          <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {routeError}
          </p>
        ) : null}

        <div className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Days</span>
          <div className="flex flex-wrap gap-2">
            {DAY_PRESET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDayPreset(opt.value)}
                aria-pressed={selection.dayPreset === opt.value}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ease-sr active:scale-95 ${
                  selection.dayPreset === opt.value
                    ? "border-primary bg-primary text-primary-foreground scale-[1.03]"
                    : "border-input text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selection.dayPreset === "custom" ? (
            <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label="Select custom days">
              {DAY_LABELS.map((d: DayLabel) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleCustomDay(d)}
                  aria-pressed={selection.customDays.includes(d)}
                  className={`size-9 rounded-md border text-xs font-medium transition-all duration-300 ease-sr active:scale-90 ${
                    selection.customDays.includes(d)
                      ? "border-primary bg-primary text-primary-foreground scale-[1.05]"
                      : "border-input text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {selection.city && selection.pickup && selection.drop && !routeError ? (
          <div className="flex animate-in fade-in slide-in-from-bottom-1 items-center gap-3 rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm duration-400 ease-sr">
            <MapPin className="size-4 shrink-0 text-primary" />
            <div className="min-w-0 leading-snug">
              <div className="font-medium text-foreground">{city?.name}</div>
              <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
                <span>{selection.pickup}</span>
                <ArrowRight className="size-3.5 shrink-0" />
                <span>{selection.drop}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {days.length > 0 ? formatDayRange(days) : "Select days"}
                {selection.pickupTime ? ` · ${formatTime12(selection.pickupTime)}` : ""}
              </div>
            </div>
          </div>
        ) : null}

        <Button
          size="lg"
          className="w-full transition-all duration-300 ease-sr active:scale-[0.98] sm:w-auto"
          disabled={!isRouteReady}
          onClick={() => {
            findPlans();
            setForceEdit(false);
          }}
        >
          Find My Plan
          <ArrowRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {hint ? <span className="block text-[11px] text-muted-foreground/80">{hint}</span> : null}
    </label>
  );
}
