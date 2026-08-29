import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Gauge, ShieldCheck, UserRound, Users } from "lucide-react";
import { useSubscription } from "../../lib/subscription-store";
import type { PortalRole } from "../../types/subscription";
import { Card, CardContent } from "../../components/ui/card";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Demo Portal — Smart Ride" }] }),
  component: DemoPortal,
});

const ROLES: { role: PortalRole; label: string; description: string; icon: typeof UserRound }[] = [
  { role: "user", label: "User", description: "Manage your subscription, upcoming rides and payments", icon: UserRound },
  { role: "driver", label: "Driver", description: "View today's schedule, riders and trip status", icon: Gauge },
  { role: "vehicle-owner", label: "Vehicle Owner", description: "Track your fleet, drivers and revenue", icon: Car },
  { role: "management", label: "Management", description: "Oversee routes, drivers and daily operations", icon: Users },
  { role: "admin", label: "Admin", description: "Platform-wide users, staff, plans and reports", icon: ShieldCheck },
];

function DemoPortal() {
  const { setRole } = useSubscription();

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-14 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Smart Ride Demo Portal</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Continue as</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            This is a frontend-only prototype with no real authentication. Pick a role to preview its dashboard —
            each one shows different, role-appropriate information and controls.
          </p>
        </div>

        <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
          {ROLES.map(({ role, label, description, icon: Icon }, i) => (
            <Link
              key={role}
              to={`/dashboard/${role}` as never}
              onClick={() => setRole(role)}
              className="group animate-in fade-in slide-in-from-bottom-2 duration-500 ease-sr"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Card className="h-full border-border/70 transition-all duration-400 ease-sr group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:bg-primary/[0.04] group-hover:shadow-lg group-active:scale-[0.98]">
                <CardContent className="flex items-start gap-3.5 p-4 sm:p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary transition-transform duration-400 ease-sr-settle group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{label}</div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
