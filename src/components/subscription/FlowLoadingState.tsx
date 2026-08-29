/** Small, on-brand placeholder shown only for the brief moment the
 * subscription store is hydrating from localStorage — avoids the flash of a
 * near-empty page before we know whether to render the real content or
 * redirect back to /subscription. Deliberately tiny, not a full loading
 * screen, and reuses the same dark/amber visual language as the rest of the
 * flow. */
export function FlowLoadingState() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span className="flex gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-primary" />
        </span>
        Loading your subscription…
      </div>
    </div>
  );
}
