import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  CalendarClock,
  CreditCard,
  LayoutGrid,
  LifeBuoy,
  MapPinned,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { StatCard } from "../../components/dashboard/StatCard";
import { EmptyState } from "../../components/dashboard/EmptyState";
import { useSubscription } from "../../lib/subscription-store";
import { formatDayRange, formatTime12 } from "../../data/subscriptionPlans";
import { getCityBySlug } from "../../data/locations";
import { USER_PAYMENTS, USER_PROFILE, USER_UPCOMING_RIDES, SAMPLE_CONFIRMED_SUBSCRIPTION } from "../../data/dashboardMock";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export const Route = createFileRoute("/dashboard/user")({
  head: () => ({ meta: [{ title: "User Dashboard — Smart Ride" }] }),
  component: UserDashboard,
});

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "subscription", label: "My Subscription", icon: Wallet },
  { id: "rides", label: "Upcoming Rides", icon: CalendarClock },
  { id: "route", label: "Route", icon: MapPinned },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "support", label: "Support", icon: LifeBuoy },
];

function UserDashboard() {
  const { state } = useSubscription();
  const [section, setSection] = useState("overview");
  const confirmed = state.confirmed;

  const demo = confirmed ?? SAMPLE_CONFIRMED_SUBSCRIPTION;

  const isDemoData = !confirmed;

  return (
    <DashboardShell
      roleLabel="User"
      navItems={NAV}
      activeId={section}
      onNavigate={setSection}
      title="My Dashboard"
      subtitle={`Good morning, ${USER_PROFILE.name.split(" ")[0]}`}
    >
      {isDemoData ? (
        <div className="rounded-lg border border-dashed border-border/70 bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
          You haven't confirmed a subscription yet — showing sample data.{" "}
          <Link to="/subscription" className="font-medium text-primary underline underline-offset-2">
            Build your subscription
          </Link>
        </div>
      ) : null}

      {section === "overview" ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Subscription" value={demo.plan.name} icon={Wallet} tone="primary" />
            <StatCard label="Next Pickup" value="Tomorrow" hint={formatTime12(demo.pickupTime)} icon={CalendarClock} />
            <StatCard label="Monthly Cost" value={`₹${demo.plan.monthlyPrice.toLocaleString("en-IN")}`} icon={CreditCard} />
            <StatCard label="Status" value="Active" icon={ShieldCheck} tone="success" />
          </div>

          <Card>
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your next ride</div>
                <div className="mt-1 text-lg font-semibold">Tomorrow · {formatTime12(demo.pickupTime)}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {demo.route.pickup} → {demo.route.drop}
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Driver</div>
                  <div className="font-medium">Verified Driver</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Vehicle</div>
                  <div className="font-medium">{demo.plan.vehicle.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {section === "subscription" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            <Row label="Subscription ID" value={demo.id} mono />
            <Row label="Plan" value={demo.plan.name} />
            <Row label="Route" value={`${demo.route.pickup} → ${demo.route.drop}`} />
            <Row label="Schedule" value={formatDayRange(demo.days)} />
            <Row label="Pickup Time" value={formatTime12(demo.pickupTime)} />
            <Row label="Vehicle" value={demo.plan.vehicle.label} />
            <Row label="Monthly Price" value={`₹${demo.plan.monthlyPrice.toLocaleString("en-IN")}`} highlight />
          </CardContent>
        </Card>
      ) : null}

      {section === "rides" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USER_UPCOMING_RIDES.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell>{ride.date}</TableCell>
                    <TableCell>{ride.time}</TableCell>
                    <TableCell>{ride.route}</TableCell>
                    <TableCell>{ride.driver}</TableCell>
                    <TableCell>
                      <Badge variant={ride.status === "Completed" ? "secondary" : ride.status === "Missed" ? "destructive" : "default"}>
                        {ride.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {section === "route" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center gap-3 text-sm">
              <MapPinned className="size-4 text-primary" />
              <span className="font-medium">{getCityBySlug(demo.route.city)?.name ?? demo.route.city}</span>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/30 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>{demo.route.pickup}</span>
                <span className="text-muted-foreground">{formatTime12(demo.pickupTime)}</span>
              </div>
              <div className="my-2 h-6 border-l-2 border-dashed border-primary/50 ml-1.5" />
              <div className="flex items-center justify-between">
                <span>{demo.route.drop}</span>
                <span className="text-muted-foreground">{formatTime12(demo.plan.dropTime ?? demo.pickupTime)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {formatDayRange(demo.days)}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {section === "payments" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USER_PAYMENTS.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell>{p.month}</TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{p.status}</Badge>
                    </TableCell>
                    <TableCell>{p.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {section === "profile" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            <Row label="Name" value={USER_PROFILE.name} />
            <Row label="Email" value={USER_PROFILE.email} />
            <Row label="Phone" value={USER_PROFILE.phone} />
            <Row label="Member Since" value={USER_PROFILE.memberSince} />
          </CardContent>
        </Card>
      ) : null}

      {section === "support" ? (
        <div className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <EmptyState
            icon={LifeBuoy}
            title="No open support requests"
            description="Need help with your subscription, billing or a ride? Reach out and our team will get back within a day."
            action={<Button size="sm">Contact Support</Button>}
          />
        </div>
      ) : null}
    </DashboardShell>
  );
}

function Row({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-5 py-3.5 ${highlight ? "bg-primary/[0.06]" : ""}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-right text-sm font-medium ${mono ? "font-mono" : ""} ${highlight ? "text-primary text-lg font-bold" : ""}`}>
        {value}
      </span>
    </div>
  );
}
