import { useScrollDepth } from "@/hooks/useScrollDepth";

const formations = [
  { depth: 0, label: "Surface", pct: 0 },
  { depth: 500, label: "Shallow", pct: 12.5 },
  { depth: 1200, label: "Sandstone", pct: 30 },
  { depth: 2200, label: "Shale", pct: 55 },
  { depth: 2800, label: "Reservoir", pct: 70 },
  { depth: 3200, label: "Pay Zone", pct: 80 },
  { depth: 3800, label: "Completion", pct: 95 },
];

export default function DepthIndicator() {
  const { depth, scrollProgress, formationName } = useScrollDepth();

  return (
    <>
      {/* Desktop left sidebar */}
      <div
        className="fixed left-0 top-0 z-50 hidden h-full w-16 flex-col items-center py-20 lg:flex"
        style={{
          background: "linear-gradient(180deg, rgba(8,10,15,0.95) 0%, rgba(8,10,15,0.98) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Depth readout */}
        <div className="mb-6 text-center">
          <span
            className="block text-sm font-bold tabular-nums"
            style={{ color: "hsl(var(--brand))", animation: "text-glow 3s ease-in-out infinite" }}
          >
            {depth}
          </span>
          <span className="text-[8px] tracking-[0.15em] text-white/25 uppercase">ft</span>
        </div>

        {/* Vertical track */}
        <div className="relative flex-1 w-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {/* Formation markers */}
          {formations.map((f) => (
            <div
              key={f.label}
              className="absolute flex items-center"
              style={{ top: `${f.pct}%`, left: "-6px" }}
            >
              <div className="w-[13px] h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span
                className="ml-1 text-[7px] uppercase tracking-wider whitespace-nowrap transition-colors duration-300"
                style={{
                  color: formationName === f.label || 
                    (f.label === "Surface" && formationName === "Surface") ||
                    (f.label === "Shallow" && formationName === "Shallow Formation")
                    ? "hsl(var(--brand))"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {f.label}
              </span>
            </div>
          ))}

          {/* Current position dot */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-all duration-150"
            style={{
              top: `calc(${scrollProgress * 100}% - 5px)`,
              background: "hsl(var(--brand))",
              boxShadow: "0 0 8px 2px hsl(var(--brand) / 0.5), 0 0 16px 4px hsl(var(--brand) / 0.15)",
            }}
          />
        </div>

        {/* Current zone label */}
        <div className="mt-4 text-center">
          <span className="text-[7px] font-medium text-white/30 uppercase tracking-wider leading-tight block max-w-[60px]">
            {formationName}
          </span>
        </div>
      </div>

      {/* Mobile top bar */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-3 px-4 py-2 lg:hidden"
        style={{
          background: "rgba(8,10,15,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span
          className="text-xs font-bold font-mono"
          style={{ color: "hsl(var(--brand))" }}
        >
          {depth}ft
        </span>
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "hsl(var(--brand))",
            }}
          />
        </div>
        <span className="text-[10px] text-white/40">{formationName}</span>
      </div>
    </>
  );
}
