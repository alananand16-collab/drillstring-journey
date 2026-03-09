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
          width: "56px",
          background: "linear-gradient(180deg, rgba(5,8,12,0.96) 0%, rgba(5,8,12,0.98) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Depth readout */}
        <div className="mb-4 text-center">
          <span
            className="block text-[11px] font-bold tabular-nums font-mono"
            style={{ color: "hsl(var(--brand))", animation: "text-glow 3s ease-in-out infinite" }}
          >
            {depth}
          </span>
          <span className="text-[7px] tracking-[0.2em] text-white/25 uppercase">ft MD</span>
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
                className="absolute flex items-center"
                style={{ top: `${f.pct}%`, left: 0, right: 0 }}
              >
                {/* Left tick */}
                <div
                  style={{
                    width: "12px",
                    height: "1px",
                    background: isActive ? f.color : "rgba(255,255,255,0.12)",
                    flexShrink: 0,
                    marginLeft: "6px",
                    transition: "background 0.4s",
                  }}
                />

                {/* Icon dot */}
                <div
                  style={{
                    width: "14px",
                    textAlign: "center",
                    fontSize: "8px",
                    color: isActive ? f.color : "rgba(255,255,255,0.25)",
                    flexShrink: 0,
                    transition: "color 0.4s",
                    lineHeight: 1,
                    fontWeight: "bold",
                  }}
                >
                  {f.icon}
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
        <div className="mt-4 px-1 text-center">
          <div
            className="text-[7px] font-bold tracking-[0.15em] uppercase font-mono leading-tight"
            style={{ color: formations[activeIdx].color }}
          >
            {formations[activeIdx].icon} {formations[activeIdx].label}
          </div>
          <div className="text-[6px] text-white/20 mt-1 font-mono">
            {formations[activeIdx].depth.toLocaleString()}′
          </div>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-3 px-4 py-2 lg:hidden"
        style={{
          background: "rgba(5,8,12,0.92)",
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
            style={{ width: `${scrollProgress * 100}%`, background: "hsl(var(--brand))" }}
          />
        </div>
        <span className="text-[10px] font-mono" style={{ color: formations[activeIdx].color }}>
          {formations[activeIdx].label}
        </span>
      </div>
    </>
  );
}
