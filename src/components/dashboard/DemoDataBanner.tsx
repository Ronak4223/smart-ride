import { Info } from "lucide-react";

export function DemoDataBanner({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-dashed border-border/70 bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
      <Info className="size-3.5 shrink-0" />
      <span>{message ?? "This dashboard shows mock demo data — it isn't connected to a real backend."}</span>
    </div>
  );
}
