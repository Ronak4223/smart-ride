import type { ComponentType } from "react";
import { Card, CardContent } from "../ui/card";
import { useCountUp } from "../../lib/useCountUp";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ComponentType<{ className?: string }>;
  hint?: string;
  tone?: "default" | "primary" | "success" | "warning";
}

const TONE_CLASS: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-amber-500/15 text-amber-400",
};

export function StatCard({ label, value, icon: Icon, hint, tone = "default" }: StatCardProps) {
  const isPlainInteger = typeof value === "number" || /^\d+$/.test(String(value));
  const numeric = isPlainInteger ? Number(value) : 0;
  const countRef = useCountUp<HTMLDivElement>(numeric, (v) => Math.round(v).toLocaleString("en-IN"));

  return (
    <Card className="group border-border/60 transition-all duration-400 ease-sr hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          {isPlainInteger ? (
            <div ref={countRef} className="mt-1.5 truncate text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
              0
            </div>
          ) : (
            <div className="mt-1.5 truncate text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{value}</div>
          )}
          {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
        </div>
        {Icon ? (
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-lg transition-transform duration-400 ease-sr-settle group-hover:scale-110 ${TONE_CLASS[tone]}`}
          >
            <Icon className="size-4.5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
