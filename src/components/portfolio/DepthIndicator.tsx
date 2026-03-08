import { useScrollDepth } from "@/hooks/useScrollDepth";

const depthMarkers = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];

const formationZones = [
  { pct: 0, label: "Surface", color: "#4a7c59" },
  { pct: 12.5, label: "Shallow", color: "#a08060" },
  { pct: 30, label: "Sandstone", color: "#c4a882" },
  { pct: 55, label: "Shale", color: "#555" },
  { pct: 70, label: "Reservoir", color: "#b8860b" },
  { pct: 80, label: "Pay Zone", color: "#d4af37" },
  { pct: 87.5, label: "Completion", color: "#666" },
  { pct: 95, label: "Bottom Hole", color: "#333" },
];

export default function DepthIndicator() {
  const { depth, scrollProgress, formationName } = useScrollDepth();

  return (
    <>
      {/* Desktop sidebar */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-20 flex-col items-center py-6 lg:flex"
        style={{
          background: "linear-gradient(180deg, rgba(5,5,5,0.97) 0%, rgba(8,8,8,0.98) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
        }}>
        
        {/* Depth readout */}
        <div className="mb-4 text-center">
          <span className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Depth</span>
          <span
            className="block text-lg font-bold tabular-nums"
            style={{
              color: "hsl(var(--brand))",
              animation: "text-glow 3s ease-in-out infinite",
            }}
          >
            {depth}m
          </span>
        </div>

        {/* Vertical wellbore track */}
        <div className="relative flex-1 w-[2px]" style={{ background: "rgba(255,255,255,0.08)" }}>
          {/* Formation zone colors */}
          {formationZones.map((zone, i) => {
            const nextPct = formationZones[i + 1]?.pct ?? 100;
            return (
              <div
                key={zone.label}
                className="absolute left-[-3px] w-[8px] rounded-full"
                style={{
                  top: `${zone.pct}%`,
                  height: `${nextPct - zone.pct}%`,
                  background: zone.color,
                  opacity: 0.3,
                }}
              />
            );
          })}

          {/* Depth tick marks */}
          {depthMarkers.map((m) => {
            const pct = (m / 4000) * 100;
            return (
              <div key={m} className="absolute flex items-center" style={{ top: `${pct}%`, left: "-8px" }}>
                <div className="w-[18px] h-[1px]" style={{ background: "rgba(255,255,255,0.15)" }} />
                <span className="ml-1.5 text-[9px] font-mono text-white/40 whitespace-nowrap">{m}</span>
              </div>
            );
          })}

          {/* Glowing current position indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-200"
            style={{
              top: `calc(${scrollProgress * 100}% - 8px)`,
              background: "hsl(var(--brand))",
              boxShadow: "0 0 12px 4px hsl(var(--brand) / 0.5), 0 0 24px 8px hsl(var(--brand) / 0.2)",
            }}
          >
            <div className="absolute inset-[2px] rounded-full bg-white/20" />
          </div>
        </div>

        {/* Formation name */}
        <div className="mt-4 text-center">
          <span className="text-[9px] font-medium text-white/40 uppercase tracking-wider leading-tight block max-w-[70px]">
            {formationName}
          </span>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 lg:hidden"
        style={{
          background: "rgba(5,5,5,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}>
        <span className="text-sm font-bold font-mono" style={{ color: "hsl(var(--brand))" }}>{depth}m</span>
        <span className="text-[11px] text-white/50 font-medium">{formationName}</span>
        <div className="h-1.5 w-28 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "hsl(var(--brand))",
              boxShadow: "0 0 8px hsl(var(--brand) / 0.5)",
            }}
          />
        </div>
      </div>
    </>
  );
}
