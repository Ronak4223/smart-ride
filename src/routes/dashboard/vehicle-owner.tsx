import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Car, Gauge, LayoutGrid, Users, Wallet, Wrench } from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { DemoDataBanner } from "../../components/dashboard/DemoDataBanner";
import { StatCard } from "../../components/dashboard/StatCard";
import { useEntranceReady } from "../../lib/useEntranceReady";
import { VEHICLE_OWNER_FLEET, VEHICLE_OWNER_MAINTENANCE, VEHICLE_OWNER_REVENUE } from "../../data/dashboardMock";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export const Route = createFileRoute("/dashboard/vehicle-owner")({
  head: () => ({ meta: [{ title: "Vehicle Owner Dashboard — Smart Ride" }] }),
  component: VehicleOwnerDashboard,
});

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Fleet Overview", icon: LayoutGrid },
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "revenue", label: "Revenue", icon: Wallet },
];

const STATUS_VARIANT = { Active: "default", Idle: "outline", Maintenance: "destructive" } as const;

function VehicleOwnerDashboard() {
  const [section, setSection] = useState("overview");
  const chartReady = useEntranceReady();

  const stats = useMemo(() => {
    const total = VEHICLE_OWNER_FLEET.length;
    const active = VEHICLE_OWNER_FLEET.filter((v) => v.status === "Active").length;
    const available = VEHICLE_OWNER_FLEET.filter((v) => v.status === "Idle").length;
    const maintenance = VEHICLE_OWNER_FLEET.filter((v) => v.status === "Maintenance").length;
    return { total, active, available, maintenance };
  }, []);

  const maxRevenue = Math.max(...VEHICLE_OWNER_REVENUE.map((r) => r.value));

  return (
    <DashboardShell
      roleLabel="Vehicle Owner"
      navItems={NAV}
      activeId={section}
      onNavigate={setSection}
      title="Vehicle Owner Dashboard"
      subtitle="Fleet performance at a glance"
    >
      <DemoDataBanner />
      {section === "overview" ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Vehicles" value={stats.total} icon={Car} />
            <StatCard label="Active Vehicles" value={stats.active} icon={Gauge} tone="success" />
            <StatCard label="Available" value={stats.available} icon={Users} tone="primary" />
            <StatCard label="Maintenance" value={stats.maintenance} icon={Wrench} tone="warning" />
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="mb-3 text-sm font-semibold">Monthly Revenue Trend</div>
              <div className="flex h-32 items-end gap-3">
                {VEHICLE_OWNER_REVENUE.map((r, i) => (
                  <div key={r.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md bg-primary/70 transition-all duration-700 ease-sr"
                      style={{
                        height: chartReady ? `${(r.value / maxRevenue) * 100}%` : "0%",
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                    <span className="text-[11px] text-muted-foreground">{r.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {section === "vehicles" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Driver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VEHICLE_OWNER_FLEET.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-mono text-xs">{v.number}</TableCell>
                    <TableCell>{v.type}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[v.status]}>{v.status}</Badge>
                    </TableCell>
                    <TableCell>{v.driver ?? <span className="text-muted-foreground">Unassigned</span>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {section === "maintenance" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {VEHICLE_OWNER_MAINTENANCE.map((m) => (
              <div key={`${m.vehicle}-${m.type}`} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <div>
                  <div className="font-medium">{m.type}</div>
                  <div className="font-mono text-xs text-muted-foreground">{m.vehicle}</div>
                </div>
                <Badge variant="outline">Due {m.due}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {section === "revenue" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {VEHICLE_OWNER_REVENUE.map((r) => (
              <div key={r.month} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <span className="text-muted-foreground">{r.month} 2026</span>
                <span className="font-medium">₹{r.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
