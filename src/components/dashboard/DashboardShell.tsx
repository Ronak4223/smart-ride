import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../ui/sidebar";

export interface DashboardNavItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

interface DashboardShellProps {
  roleLabel: string;
  navItems: DashboardNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  title: string;
  subtitle?: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({
  roleLabel,
  navItems,
  activeId,
  onNavigate,
  title,
  subtitle,
  headerActions,
  children,
}: DashboardShellProps) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader className="gap-0">
            <Link to="/" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-sidebar-accent">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                SR
              </span>
              <span className="truncate font-[Space_Grotesk,sans-serif] text-sm font-semibold tracking-wide group-data-[collapsible=icon]:hidden">
                SMART RIDE
              </span>
            </Link>
            <div className="px-2 pt-1 text-[11px] uppercase tracking-wider text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
              {roleLabel} Portal · Demo
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigate</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={activeId === item.id} tooltip={item.label} onClick={() => onNavigate(item.id)}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Switch role">
                  <Link to="/dashboard">
                    <ArrowLeftRight className="size-4" />
                    <span>Switch role</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to site">
                  <Link to="/">
                    <Home className="size-4" />
                    <span>Back to site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex flex-wrap items-center gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
            <SidebarTrigger />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
              {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
            </div>
            {headerActions}
          </header>
          <main className="flex-1 space-y-6 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
