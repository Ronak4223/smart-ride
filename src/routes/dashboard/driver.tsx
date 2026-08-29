import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Car, CheckCircle2, Clock, LayoutGrid, MapPin, Navigation, Star, Users } from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { DemoDataBanner } from "../../components/dashboard/DemoDataBanner";
import { StatCard } from "../../components/dashboard/StatCard";
import { DRIVER_PROFILE, DRIVER_RIDERS, DRIVER_TODAY_TRIPS, type DriverTrip } from "../../data/dashboardMock";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/dashboard/driver")({
  head: () => ({ meta: [{ title: "Driver Dashboard — Smart Ride" }] }),
  component: DriverDashboard,
});

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "schedule", label: "Today's Schedule", icon: Clock },
  { id: "riders", label: "Rider List", icon: Users },
  { id: "vehicle", label: "Assigned Vehicle", icon: Car },
];

const STORAGE_KEY = "smartride:driver-trips:v1";
const NEXT_STATUS: Record<DriverTrip["status"], DriverTrip["status"]> = {
  "Not Started": "Started",
  Started: "Arrived",
  Arrived: "Completed",
  Completed: "Completed",
};
const ACTION_LABEL: Record<DriverTrip["status"], string> = {
  "Not Started": "Start Trip",
  Started: "Arrived",
  Arrived: "Trip Completed",
  Completed: "Completed",
};

function useDriverTrips() {
  const [trips, setTrips] = useState<DriverTrip[]>(DRIVER_TODAY_TRIPS);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setTrips(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);
  const advance = (id: string) => {
    setTrips((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, status: NEXT_STATUS[t.status] } : t));
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };
  return { trips, advance };
}

function DriverDashboard() {
  const [section, setSection] = useState("overview");
  const { trips, advance } = useDriverTrips();
  const nextTrip = trips.find((t) => t.status !== "Completed") ?? trips[0];

  return (
    <DashboardShell
      roleLabel="Driver"
      navItems={NAV}
      activeId={section}
      onNavigate={setSection}
      title="Driver Dashboard"
      subtitle={`Welcome back, ${DRIVER_PROFILE.name}`}
    >
      <DemoDataBanner message="This driver dashboard shows mock demo data. Trip status changes are saved locally in your browser." />
      {section === "overview" ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Rating" value={DRIVER_PROFILE.rating} icon={Star} tone="primary" />
            <StatCard label="Total Trips" value={DRIVER_PROFILE.trips} icon={Navigation} />
            <StatCard label="Experience" value={DRIVER_PROFILE.experience} icon={Clock} />
            <StatCard label="Vehicle Status" value={DRIVER_PROFILE.vehicle.status} icon={Car} tone="success" />
          </div>

          {nextTrip ? (
            <Card>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Next scheduled trip
                  </div>
                  <div className="mt-1 text-lg font-semibold">{nextTrip.time}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {nextTrip.route}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{nextTrip.riders} Riders</Badge>
                  <Button
                    size="sm"
                    className="transition-transform duration-200 ease-sr active:scale-[0.97]"
                    disabled={nextTrip.status === "Completed"}
                    onClick={() => advance(nextTrip.id)}
                  >
                    {ACTION_LABEL[nextTrip.status]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      ) : null}

      {section === "schedule" ? (
        <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className={`transition-all duration-500 ease-sr ${trip.status === "Completed" ? "opacity-70" : "hover:-translate-y-0.5 hover:shadow-md"}`}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{trip.time}</span>
                  <Badge
                    className="transition-all duration-300 ease-sr"
                    variant={trip.status === "Completed" ? "secondary" : trip.status === "Not Started" ? "outline" : "default"}
                  >
                    {trip.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {trip.route}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  {trip.riders} riders
                </div>
                <Button
                  size="sm"
                  className="w-full transition-transform duration-200 ease-sr active:scale-[0.97]"
                  variant={trip.status === "Completed" ? "secondary" : "default"}
                  disabled={trip.status === "Completed"}
                  onClick={() => advance(trip.id)}
                >
                  {trip.status === "Completed" ? (
                    <>
                      <CheckCircle2 className="size-4 animate-in zoom-in duration-400 ease-sr-settle" /> Completed
                    </>
                  ) : (
                    ACTION_LABEL[trip.status]
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {section === "riders" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {DRIVER_RIDERS.map((rider) => (
              <div key={rider.name} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <div>
                  <div className="font-medium">{rider.name}</div>
                  <div className="text-xs text-muted-foreground">{rider.pickup}</div>
                </div>
                <Badge variant="outline">Seat {rider.seat}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {section === "vehicle" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            <Row label="Vehicle Number" value={DRIVER_PROFILE.vehicle.number} mono />
            <Row label="Vehicle Type" value={DRIVER_PROFILE.vehicle.type} />
            <Row label="Status" value={DRIVER_PROFILE.vehicle.status} />
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-right text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
