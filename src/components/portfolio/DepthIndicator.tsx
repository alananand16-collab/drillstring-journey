import { useScrollDepth } from "@/hooks/useScrollDepth";

const depthMarkers = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];

const formationZones = [
  { start: 0, label: "Surface", color: "hsl(var(--brand))" },
  { start: 0.125, label: "Sandstone", color: "#c4a882" },
  { start: 0.3, label: "Shale", color: "#555" },
  { start: 0.55, label: "Reservoir", color: "#b8860b" },
  { start: 0.75, label: "Pay Zone", color: "#d4af37" },
  { start: 0.875, label: "Completion", color: "#888" },
];

export default function DepthIndicator() {
  const { depth, scrollProgress, formationName } = useScrollDepth();

  return (
    <>
      {/* Desktop sidebar */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-16 flex-col items-center py-4 lg:flex"
        style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.95), rgba(5,5,5,0.98))" }}>
        <span className="mb-2 text-[10px] font-bold tracking-wider text-brand">DEPTH</span>
        <div className="relative flex-1 w-px bg-muted-foreground/20">
          {depthMarkers.map((m) => {
            const pct = (m / 4000) * 100;
            return (
              <div key={m} className="absolute left-1/2 -translate-x-1/2 flex items-center" style={{ top: `${pct}%` }}>
                <div className="w-2 h-px bg-muted-foreground/40" />
                <span className="ml-1 text-[8px] text-muted-foreground whitespace-nowrap">{m}m</span>
              </div>
            );
          })}
          {/* Moving indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand shadow-[0_0_8px_hsl(var(--brand))] transition-all duration-150"
            style={{ top: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="mt-2 text-[10px] text-muted-foreground">{formationName}</span>
      </div>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 lg:hidden"
        style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(8px)" }}>
        <span className="text-xs font-bold text-brand">{depth}m</span>
        <span className="text-xs text-muted-foreground">{formationName}</span>
        <div className="h-1 w-24 rounded-full bg-muted-foreground/20 overflow-hidden">
          <div className="h-full bg-brand transition-all duration-150" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      </div>
    </>
  );
}
