import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const STEPS = ["Route & Schedule", "Choose Plan", "Review", "Confirmed"] as const;

export function FlowHeader({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <div className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            SR
          </span>
          <span className="font-[Space_Grotesk,sans-serif] text-sm font-semibold tracking-wide">SMART RIDE</span>
        </Link>
        <ol className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {STEPS.map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4;
            const state = n < step ? "done" : n === step ? "current" : "upcoming";
            return (
              <li key={label} className="flex items-center gap-1.5">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium transition-all duration-400 ease-sr ${
                    state === "current"
                      ? "bg-primary text-primary-foreground scale-105"
                      : state === "done"
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {state === "done" ? (
                    <Check className="size-3 animate-in zoom-in duration-300 ease-sr-settle" />
                  ) : (
                    <span>{n}</span>
                  )}
                  <span className="hidden sm:inline">{label}</span>
                </span>
                {i < STEPS.length - 1 ? <span className="h-px w-3 bg-border sm:w-5" /> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
