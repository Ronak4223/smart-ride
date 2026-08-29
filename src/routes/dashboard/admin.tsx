import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Car, LayoutGrid, MapPinned, Settings, ShieldCheck, UsersRound, Wallet } from "lucide-react";
import { DashboardShell, type DashboardNavItem } from "../../components/dashboard/DashboardShell";
import { DemoDataBanner } from "../../components/dashboard/DemoDataBanner";
import { StatCard } from "../../components/dashboard/StatCard";
import { useEntranceReady } from "../../lib/useEntranceReady";
import { ADMIN_CITIES, ADMIN_REVENUE_TREND, ADMIN_STAFF, ADMIN_STATS } from "../../data/dashboardMock";
import { CITIES } from "../../data/locations";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Smart Ride" }] }),
  component: AdminDashboard,
});

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Platform Overview", icon: LayoutGrid },
  { id: "staff", label: "Staff Management", icon: UsersRound },
  { id: "locations", label: "Locations", icon: MapPinned },
  { id: "settings", label: "Settings", icon: Settings },
];

function AdminDashboard() {
  const [section, setSection] = useState("overview");
  const maxRevenue = Math.max(...ADMIN_REVENUE_TREND.map((r) => r.value));
  const chartReady = useEntranceReady();

  return (
    <DashboardShell
      roleLabel="Admin"
      navItems={NAV}
      activeId={section}
      onNavigate={setSection}
      title="Admin Dashboard"
      subtitle="Platform-wide overview across all cities"
    >
      <DemoDataBanner />
      {section === "overview" ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Total Users" value={ADMIN_STATS.totalUsers} icon={UsersRound} tone="primary" />
            <StatCard label="Total Drivers" value={ADMIN_STATS.totalDrivers} icon={Car} />
            <StatCard label="Total Vehicles" value={ADMIN_STATS.totalVehicles} icon={Car} />
            <StatCard label="Active Subscriptions" value={ADMIN_STATS.activeSubscriptions} icon={ShieldCheck} tone="success" />
            <StatCard label="Monthly Revenue" value={ADMIN_STATS.monthlyRevenue} icon={Wallet} />
            <StatCard label="Completed Rides" value={ADMIN_STATS.completedRides} icon={LayoutGrid} />
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="mb-3 text-sm font-semibold">Platform Revenue Trend</div>
              <div className="flex h-32 items-end gap-3">
                {ADMIN_REVENUE_TREND.map((r, i) => (
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

      {section === "staff" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            {ADMIN_STAFF.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
                <Badge variant="outline">{s.city}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {section === "locations" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Subscriptions</TableHead>
                  <TableHead>Drivers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ADMIN_CITIES.map((c) => (
                  <TableRow key={c.city}>
                    <TableCell>{c.city}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {CITIES.find((x) => x.name === c.city)?.state ?? "—"}
                    </TableCell>
                    <TableCell>{c.subscriptions.toLocaleString("en-IN")}</TableCell>
                    <TableCell>{c.drivers}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {section === "settings" ? (
        <Card className="animate-in fade-in slide-in-from-bottom-1 duration-500 ease-sr">
          <CardContent className="divide-y divide-border/60 p-0">
            <SettingRow label="Platform Name" value="Smart Ride" />
            <SettingRow label="Default Currency" value="INR (₹)" />
            <SettingRow label="Support Cities" value={`${CITIES.length} cities live`} />
            <SettingRow label="Demo Mode" value="Enabled — frontend-only prototype" />
          </CardContent>
        </Card>
      ) : null}
    </DashboardShell>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
