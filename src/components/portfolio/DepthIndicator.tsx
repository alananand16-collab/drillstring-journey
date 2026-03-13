/**
 * DepthIndicator — Premium telemetry sidebar with refined typography & rich styling.
 */
import { useScrollDepth } from "@/hooks/useScrollDepth";

const formations = [
  { depth: 0,      label: "SURFACE",      pct: 0,   icon: "▽", color: "hsl(215,20%,65%)",  glow: "rgba(140,160,190,0.3)" },
  { depth: 2400,   label: "SHALE CAP",    pct: 18,  icon: "≡", color: "hsl(220,18%,52%)",  glow: "rgba(100,120,160,0.3)" },
  { depth: 3800,   label: "RESERVOIR",    pct: 32,  icon: "◆", color: "hsl(170,65%,50%)",  glow: "rgba(50,200,170,0.35)" },
  { depth: 6800,   label: "WATER SAND",   pct: 48,  icon: "≋", color: "hsl(200,85%,58%)",  glow: "rgba(60,170,230,0.35)" },
  { depth: 9200,   label: "OIL SAND",     pct: 63,  icon: "●", color: "hsl(38,95%,58%)",   glow: "rgba(230,170,40,0.35)" },
  { depth: 12000,  label: "PERF ZONE",    pct: 78,  icon: "✶", color: "hsl(25,95%,60%)",   glow: "rgba(240,130,50,0.35)" },
];

const FONT_MONO = "'JetBrains Mono', monospace";
const FONT_DISPLAY = "'Outfit', sans-serif";

export default function DepthIndicator() {
  const { depth, scrollProgress } = useScrollDepth();

  const activeIdx = formations.reduce((best, f, i) =>
    scrollProgress * 100 >= f.pct ? i : best, 0);

  const active = formations[activeIdx];

  return (
    <>
      {/* ── Desktop left sidebar ── */}
      <div
        className="fixed left-0 top-0 z-50 hidden h-full lg:flex flex-col items-center py-12"
        style={{
          width: "140px",
          background: "linear-gradient(180deg, rgba(8,10,18,0.98) 0%, rgba(5,7,14,0.99) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "4px 0 30px rgba(0,0,0,0.5), inset -1px 0 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Depth readout — hero element */}
        <div
          className="mb-8 text-center px-4 py-5 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            width: "118px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="block text-3xl font-extrabold tabular-nums tracking-tight"
            style={{
              color: "hsl(var(--brand))",
              animation: "text-glow 3s ease-in-out infinite",
              fontFamily: FONT_MONO,
              letterSpacing: "-0.02em",
            }}
          >
            {depth}
          </span>
          <span
            className="mt-1.5 block text-xs tracking-[0.3em] uppercase font-medium"
            style={{
              fontFamily: FONT_DISPLAY,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.3em",
            }}
          >
            ft MD
          </span>
        </div>

        {/* Vertical track */}
        <div className="relative flex-1 flex flex-col items-center" style={{ width: "100%" }}>
          {/* Track line — elegant gradient */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.03) 100%)",
            }}
          />

          {/* Progress fill on track */}
          <div
            className="absolute top-0 transition-all duration-150"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "1px",
              height: `${scrollProgress * 100}%`,
              background: `linear-gradient(180deg, hsl(var(--brand) / 0.2) 0%, hsl(var(--brand) / 0.5) 100%)`,
            }}
          />

          {/* Formation markers */}
          {formations.map((f, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx;
            return (
              <div
                key={f.label}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${f.pct}%`,
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Horizontal tick */}
                <div
                  style={{
                    width: isActive ? "32px" : isPast ? "22px" : "16px",
                    height: isActive ? "2px" : "1px",
                    background: isActive
                      ? `linear-gradient(90deg, transparent, ${f.color}, transparent)`
                      : isPast
                        ? `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`
                        : "rgba(255,255,255,0.06)",
                    borderRadius: "1px",
                    transition: "all 0.5s ease",
                    marginBottom: "6px",
                    boxShadow: isActive ? `0 0 12px ${f.glow}` : "none",
                  }}
                />
                {/* Icon */}
                <div
                  style={{
                    fontSize: isActive ? "22px" : "16px",
                    color: isActive ? f.color : isPast ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)",
                    transition: "all 0.5s ease",
                    lineHeight: 1,
                    fontWeight: "bold",
                    textShadow: isActive ? `0 0 14px ${f.glow}` : "none",
                    filter: isActive ? `drop-shadow(0 0 6px ${f.glow})` : "none",
                  }}
                >
                  {f.icon}
                </div>
                {/* Formation label */}
                <div
                  style={{
                    fontSize: isActive ? "11px" : "9px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? f.color : isPast ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
                    transition: "all 0.5s ease",
                    letterSpacing: isActive ? "0.14em" : "0.08em",
                    marginTop: "5px",
                    fontFamily: FONT_DISPLAY,
                    textAlign: "center",
                    lineHeight: 1.3,
                    textShadow: isActive ? `0 0 16px ${f.glow}` : "none",
                    textTransform: "uppercase",
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
              top: `calc(${scrollProgress * 100}% - 8px)`,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, hsl(var(--brand)), hsl(var(--brand) / 0.7))`,
              boxShadow: `0 0 12px 4px hsl(var(--brand) / 0.5), 0 0 28px 8px hsl(var(--brand) / 0.15)`,
              border: "2px solid rgba(255,255,255,0.4)",
              zIndex: 2,
              willChange: "transform, top",
            }}
          />
        </div>

        {/* Current zone label at bottom */}
        <div
          className="mt-8 px-3 py-4 text-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            border: `1px solid ${active.color}20`,
            width: "118px",
            boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 20px ${active.glow}`,
            transition: "all 0.5s ease",
          }}
        >
          <div
            className="text-sm font-bold tracking-[0.12em] uppercase leading-tight"
            style={{
              color: active.color,
              fontFamily: FONT_DISPLAY,
              textShadow: `0 0 14px ${active.glow}`,
              transition: "all 0.5s ease",
            }}
          >
            <span style={{ fontSize: "18px", verticalAlign: "middle" }}>{active.icon}</span>
            <br />
            {active.label}
          </div>
          <div
            className="text-xs mt-2 font-medium"
            style={{
              fontFamily: FONT_MONO,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {active.depth.toLocaleString()}′
          </div>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-3 px-4 py-2.5 lg:hidden"
        style={{
          background: "rgba(8,10,18,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${active.color}15`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 2px 12px ${active.glow}`,
          transition: "all 0.5s ease",
        }}
      >
        <span
          className="text-lg font-extrabold tabular-nums"
          style={{
            color: "hsl(var(--brand))",
            fontFamily: FONT_MONO,
            letterSpacing: "-0.02em",
            minWidth: "70px",
          }}
        >
          {depth}
          <span
            style={{
              fontSize: "10px",
              fontFamily: FONT_DISPLAY,
              fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              marginLeft: "2px",
              letterSpacing: "0.15em",
            }}
          >
            ft
          </span>
        </span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, hsl(var(--brand)), ${active.color})`,
              boxShadow: `0 0 10px ${active.glow}`,
            }}
          />
        </div>
        <span
          className="text-xs font-semibold tracking-wider"
          style={{
            color: active.color,
            fontFamily: FONT_DISPLAY,
            textShadow: `0 0 10px ${active.glow}`,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {active.label}
        </span>
      </div>
    </>
  );
}
