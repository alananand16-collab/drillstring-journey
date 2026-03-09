/**
 * DepthIndicator — Premium telemetry sidebar with formation markers.
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
  const { depth, scrollProgress } = useScrollDepth();

  const activeIdx = formations.reduce((best, f, i) =>
    scrollProgress * 100 >= f.pct ? i : best, 0);

  return (
    <>
      {/* ── Desktop left sidebar ── */}
      <div
        className="fixed left-0 top-0 z-50 hidden h-full lg:flex flex-col items-center py-16"
        style={{
          width: "130px",
          background: "linear-gradient(180deg, rgba(5,8,12,0.97) 0%, rgba(5,8,12,0.99) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Depth readout — hero element */}
        <div
          className="mb-6 text-center px-3 py-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
            width: "110px",
          }}
        >
          <span
            className="block text-2xl font-extrabold tabular-nums tracking-tight"
            style={{
              color: "hsl(var(--brand))",
              animation: "text-glow 3s ease-in-out infinite",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {depth}
          </span>
          <span
            className="text-[13px] tracking-[0.25em] text-white/45 uppercase mt-1 block font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ft MD
          </span>
        </div>

        {/* Vertical track */}
        <div className="relative flex-1 flex flex-col items-center" style={{ width: "100%" }}>
          {/* Track line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "2px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
            }}
          />

          {/* Formation markers */}
          {formations.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={f.label}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${f.pct}%`,
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  transition: "all 0.4s ease",
                }}
              >
                {/* Horizontal tick mark */}
                <div
                  style={{
                    width: isActive ? "28px" : "18px",
                    height: "2px",
                    background: isActive ? f.color : "rgba(255,255,255,0.12)",
                    borderRadius: "1px",
                    transition: "all 0.4s ease",
                    marginBottom: "5px",
                    boxShadow: isActive ? `0 0 8px ${f.color}40` : "none",
                  }}
                />
                {/* Icon */}
                <div
                  style={{
                    fontSize: "20px",
                    color: isActive ? f.color : "rgba(255,255,255,0.2)",
                    transition: "all 0.4s ease",
                    lineHeight: 1,
                    fontWeight: "bold",
                    textShadow: isActive ? `0 0 10px ${f.color}60` : "none",
                  }}
                >
                  {f.icon}
                </div>
                {/* Formation name */}
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? f.color : "rgba(255,255,255,0.2)",
                    transition: "all 0.4s ease",
                    letterSpacing: "0.1em",
                    marginTop: "4px",
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "center",
                    lineHeight: 1.3,
                    textShadow: isActive ? `0 0 12px ${f.color}40` : "none",
                  }}
                >
                  {f.label}
                </div>
              </div>
            );
          })}

          {/* Current position dot */}
          <div
            className="absolute transition-all duration-200"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: `calc(${scrollProgress * 100}% - 7px)`,
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "hsl(var(--brand))",
              boxShadow: "0 0 10px 3px hsl(var(--brand) / 0.6), 0 0 24px 8px hsl(var(--brand) / 0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Current zone label at bottom */}
        <div
          className="mt-6 px-3 py-3 text-center rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            width: "110px",
          }}
        >
          <div
            className="text-[15px] font-extrabold tracking-[0.12em] uppercase leading-tight"
            style={{
              color: formations[activeIdx].color,
              fontFamily: "'JetBrains Mono', monospace",
              textShadow: `0 0 12px ${formations[activeIdx].color}50`,
            }}
          >
            {formations[activeIdx].icon} {formations[activeIdx].label}
          </div>
          <div
            className="text-[13px] text-white/40 mt-1.5 font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {formations[activeIdx].depth.toLocaleString()}′
          </div>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-4 px-5 py-3 lg:hidden"
        style={{
          background: "rgba(5,8,12,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <span
          className="text-lg font-extrabold tabular-nums"
          style={{ color: "hsl(var(--brand))", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {depth}ft
        </span>
        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "linear-gradient(90deg, hsl(var(--brand)), hsl(var(--brand) / 0.7))",
              boxShadow: "0 0 8px hsl(var(--brand) / 0.4)",
            }}
          />
        </div>
        <span
          className="text-base font-bold tracking-wide"
          style={{
            color: formations[activeIdx].color,
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: `0 0 8px ${formations[activeIdx].color}40`,
          }}
        >
          {formations[activeIdx].label}
        </span>
      </div>
    </>
  );
}
