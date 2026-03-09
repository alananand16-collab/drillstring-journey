/**
 * DepthIndicator — Updated with 6 major formation markers per spec.
 * Shows formation names, icons, and highlights current zone.
 */
import { useScrollDepth } from "@/hooks/useScrollDepth";

const formations = [
  { depth: 0,      label: "SURFACE",      pct: 0,   icon: "▽", color: "hsl(215,12%,55%)" },
  { depth: 2400,   label: "SHALE CAP",    pct: 20,  icon: "≡", color: "hsl(215,12%,45%)" },
  { depth: 3800,   label: "WATER SAND",   pct: 42,  icon: "≋", color: "hsl(205,80%,60%)" },
  { depth: 6800,   label: "OIL SAND",     pct: 60,  icon: "●", color: "hsl(35,92%,55%)"  },
  { depth: 10800,  label: "PERF ZONE",    pct: 77,  icon: "✶", color: "hsl(28,92%,58%)"  },
  { depth: 14000,  label: "RESERVOIR TD", pct: 90,  icon: "◆", color: "hsl(175,60%,48%)" },
];

export default function DepthIndicator() {
  const { depth, scrollProgress, formationName } = useScrollDepth();

  // Find active formation based on scroll
  const activeIdx = formations.reduce((best, f, i) =>
    scrollProgress * 100 >= f.pct ? i : best, 0);

  return (
    <>
      {/* ── Desktop left sidebar ── */}
      <div
        className="fixed left-0 top-0 z-50 hidden h-full lg:flex flex-col items-center py-20"
        style={{
          width: "104px",
          background: "linear-gradient(180deg, rgba(5,8,12,0.96) 0%, rgba(5,8,12,0.98) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Depth readout */}
        <div className="mb-5 text-center">
          <span
            className="block text-xl font-bold tabular-nums"
            style={{ color: "hsl(var(--brand))", animation: "text-glow 3s ease-in-out infinite", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {depth}
          </span>
          <span className="text-[12px] tracking-[0.2em] text-white/40 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ft MD</span>
        </div>

        {/* Vertical track */}
        <div className="relative flex-1 flex flex-col items-center" style={{ width: "100%" }}>
          {/* Track line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          {/* Formation markers */}
          {formations.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={f.label}
                className="absolute flex flex-col items-center"
                style={{ top: `${f.pct}%`, left: 0, right: 0, transform: "translateY(-50%)" }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: "15px",
                    color: isActive ? f.color : "rgba(255,255,255,0.25)",
                    transition: "color 0.4s",
                    lineHeight: 1,
                    fontWeight: "bold",
                  }}
                >
                  {f.icon}
                </div>
                {/* Formation name */}
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? f.color : "rgba(255,255,255,0.22)",
                    transition: "color 0.4s",
                    letterSpacing: "0.08em",
                    marginTop: "3px",
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "center",
                    lineHeight: 1.25,
                  }}
                >
                  {f.label}
                </div>
              </div>
            );
          })}

          {/* Current position dot — travels the track */}
          <div
            className="absolute transition-all duration-150"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: `calc(${scrollProgress * 100}% - 5px)`,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "hsl(var(--brand))",
              boxShadow: "0 0 8px 2px hsl(var(--brand) / 0.6), 0 0 16px 5px hsl(var(--brand) / 0.2)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Current zone label at bottom */}
        <div className="mt-5 px-1 text-center">
          <div
            className="text-[13px] font-bold tracking-[0.1em] uppercase leading-tight"
            style={{ color: formations[activeIdx].color, fontFamily: "'JetBrains Mono', monospace" }}
          >
            {formations[activeIdx].icon} {formations[activeIdx].label}
          </div>
          <div className="text-[11px] text-white/35 mt-1" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {formations[activeIdx].depth.toLocaleString()}′
          </div>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-3 px-4 py-2.5 lg:hidden"
        style={{
          background: "rgba(5,8,12,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span
          className="text-base font-bold"
          style={{ color: "hsl(var(--brand))", fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {depth}ft
        </span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%`, background: "hsl(var(--brand))" }}
          />
        </div>
        <span className="text-sm font-bold" style={{ color: formations[activeIdx].color, fontFamily: "'Inter', system-ui, sans-serif" }}>
          {formations[activeIdx].label}
        </span>
      </div>
    </>
  );
}
