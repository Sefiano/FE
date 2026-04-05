export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-card/80 backdrop-blur px-6">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium">The Med</span>
        <span className="text-muted-foreground">&middot;</span>
        <span className="text-muted-foreground">Phase 1</span>
        <span className="text-muted-foreground">&middot;</span>
        <span className="text-muted-foreground text-xs">Last run: 05 Apr 2026, 07:30</span>
      </div>
      <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
        Demo Mode
      </span>
    </header>
  );
}
