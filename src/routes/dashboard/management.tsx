import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, LayoutGrid, MapPinned, MessageSquareWarning, Users2 } from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { DemoDataBanner } from "../../components/dashboard/DemoDataBanner";
import { StatCard } from "../../components/dashboard/StatCard";
import { MANAGEMENT_COMPLAINTS, MANAGEMENT_DRIVERS, MANAGEMENT_ROUTES } from "../../data/dashboardMock";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export const Route = createFileRoute("/dashboard/management")({
  head: () => ({ meta: [{ title: "Management Dashboard — Smart Ride" }] }),
  component: ManagementDashboard,
});

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Operations Overview", icon: LayoutGrid },
  { id: "routes", label: "Route Management", icon: MapPinned },
  { id: "drivers", label: "Driver Management", icon: Users2 },
  { id: "complaints", label: "Complaints / Support", icon: MessageSquareWarning },
];

const ROUTE_STATUS_VARIANT = { Healthy: "default", Understaffed: "destructive", New: "outline" } as const;
const COMPLAINT_STATUS_VARIANT = { Open: "destructive", "In Progress": "outline", Resolved: "secondary" } as const;

function ManagementDashboard() {
  const [section, setSection] = useState("overview");

  const stats = useMemo(() => {
    const activeSubscriptions = MANAGEMENT_ROUTES.reduce((sum, r) => sum + r.subscribers, 0);
    const driversOnline = MANAGEMENT_DRIVERS.filter((d) => d.status === "Online").length;
    const pendingIssues = MANAGEMENT_COMPLAINTS.filter((c) => c.status !== "Resolved").length;
    return { activeSubscriptions, driversOnline, pendingIssues, todaysRides: activeSubscriptions * 2 };
  }, []);

  return (
    <DashboardShell
      roleLabel="Management"
      navItems={NAV}
      activeId={section}
      onNavigate={setSection}
      title="Management Dashboard"
      subtitle="Daily operations across all active routes"
    >
      <DemoDataBanner />
      {section === "overview" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <StatCard label="Active Subscriptions" value={stats.activeSubscriptions} icon={Users2} tone="primary" />
          <StatCard label="Today's Rides" value={stats.todaysRides} icon={LayoutGrid} />
          <StatCard label="Drivers Online" value={stats.driversOnline} icon={Users2} tone="success" />
          <StatCard label="Pending Issues" value={stats.pendingIssues} icon={AlertCircle} tone="warning" />
        </div>
      ) : null}

      {section === "routes" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Drivers Assigned</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MANAGEMENT_ROUTES.map((r) => (
                  <TableRow key={r.route}>
                    <TableCell>{r.route}</TableCell>
                    <TableCell>{r.subscribers}</TableCell>
                    <TableCell>{r.driversAssigned}</TableCell>
                    <TableCell>
                      <Badge variant={ROUTE_STATUS_VARIANT[r.status]}>{r.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {section === "drivers" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {MANAGEMENT_DRIVERS.map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.route}</div>
                </div>
                <Badge variant={d.status === "Online" ? "default" : "outline"}>{d.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {section === "complaints" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MANAGEMENT_COMPLAINTS.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.id}</TableCell>
                    <TableCell>{c.subject}</TableCell>
                    <TableCell>{c.route}</TableCell>
                    <TableCell>
                      <Badge variant={COMPLAINT_STATUS_VARIANT[c.status as keyof typeof COMPLAINT_STATUS_VARIANT]}>
                        {c.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
