import { useEffect, useRef, useState } from "react";

// Fixed-position full-page geological background that transitions based on scroll
export default function PageBackground() {
  const [scrollPct, setScrollPct] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable > 0) {
          setScrollPct(Math.min(window.scrollY / scrollable, 1));
        }
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Interpolate between geological zone colors as scroll progresses
  // 0%: Sky/Surface (dark blue-black)
  // 15%: Topsoil/Sedimentary (dark earthy brown)
  // 30%: Sandstone (grey-brown)
  // 45%: Shale (dark grey)
  // 60%: Reservoir/Pay Zone (amber-dark)
  // 75%: Completion (steel grey)
  // 100%: Bottom Hole (near-black warm)

  const zones = [
    { pct: 0,    bg: "#050811",  accent: "rgba(0,40,120,0.12)" },
    { pct: 0.15, bg: "#0a0c10",  accent: "rgba(30,20,8,0.15)"  },
    { pct: 0.30, bg: "#0d0f11",  accent: "rgba(40,28,12,0.18)" },
    { pct: 0.45, bg: "#0e1012",  accent: "rgba(50,35,10,0.20)" },
    { pct: 0.60, bg: "#100e0a",  accent: "rgba(80,55,10,0.22)" },
    { pct: 0.75, bg: "#0d0f12",  accent: "rgba(20,25,35,0.15)" },
    { pct: 1.00, bg: "#080a0c",  accent: "rgba(60,30,0,0.10)"  },
  ];

  // Find zone blend
  let z0 = zones[0], z1 = zones[1], t = 0;
  for (let i = 0; i < zones.length - 1; i++) {
    if (scrollPct >= zones[i].pct && scrollPct <= zones[i + 1].pct) {
      z0 = zones[i];
      z1 = zones[i + 1];
      t = (scrollPct - z0.pct) / (z1.pct - z0.pct);
      break;
    }
  }

  // Ambient light based on zone
  const getAmbientLight = () => {
    if (scrollPct < 0.15) return "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,60,180,0.08) 0%, transparent 70%)";
    if (scrollPct < 0.35) return "radial-gradient(ellipse 60% 40% at 15% 50%, rgba(80,60,20,0.06) 0%, transparent 70%)";
    if (scrollPct < 0.55) return "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(120,80,20,0.08) 0%, transparent 70%)";
    if (scrollPct < 0.70) return "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(200,140,20,0.07) 0%, transparent 70%)";
    if (scrollPct < 0.85) return "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(30,40,60,0.06) 0%, transparent 70%)";
    return "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(80,40,0,0.10) 0%, transparent 70%)";
  };

  return (
    <>
      {/* ── Base geological background ─────────────────────────── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-colors"
        style={{
          background: z0.bg,
          transition: "background 0.6s ease",
        }}
      />

      {/* ── Stratigraphy layer gradient ─────────────────────────── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(0,30,80,0.05) 0%,
              rgba(20,14,6,0.08) 15%,
              rgba(35,25,10,0.10) 30%,
              rgba(40,30,8,0.12) 45%,
              rgba(70,48,8,0.14) 60%,
              rgba(15,20,28,0.10) 75%,
              rgba(50,25,0,0.08) 100%
            )
          `,
        }}
      />

      {/* ── Ambient zone light ─────────────────────────────────── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: getAmbientLight(),
          transition: "background 1s ease",
        }}
      />

      {/* ── Strata bedding planes (SVG wavey lines full page) ───── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* 22 wavy horizontal strata lines at irregular intervals */}
          {[4, 9, 13, 18, 23, 27, 31, 36, 41, 46, 52, 57, 62, 67, 72, 76, 80, 84, 88, 91, 95, 98].map((yPct, i) => {
            const opacity = 0.04 + (i % 3) * 0.02;
            const amplitude = 2 + (i % 5);
            return (
              <path
                key={i}
                d={`M0,${yPct}% Q25%,${yPct - amplitude * 0.3}% 50%,${yPct}% T100%,${yPct}%`}
                stroke={`rgba(255,255,255,${opacity})`}
                strokeWidth="0.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {/* Darker brown strata in the middle-deep section */}
          {[38, 43, 48, 55, 60, 65].map((yPct, i) => (
            <path
              key={`brown-${i}`}
              d={`M0,${yPct}% Q30%,${yPct + 1}% 60%,${yPct - 0.5}% T100%,${yPct}%`}
              stroke={`rgba(100,70,20,${0.04 + i * 0.01})`}
              strokeWidth="0.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      {/* ── Global grain/noise texture (fixed, covers all sections) */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* ── Page-wide ambient particles ─────────────────────────── */}
      <PageParticles scrollPct={scrollPct} />
    </>
  );
}

function PageParticles({ scrollPct }: { scrollPct: number }) {
  // Dust (top), rock chips (mid), oil drops (bottom)
  const particles = Array.from({ length: 36 }, (_, i) => {
    const yBand = i / 36; // 0–1 position down the page
    const type = yBand < 0.35 ? "dust" : yBand < 0.65 ? "chip" : "oil";

    const color =
      type === "dust"  ? `rgba(180,160,120,${0.10 + Math.random() * 0.15})`
      : type === "chip" ? `rgba(100,85,60,${0.15 + Math.random() * 0.18})`
      : `rgba(20,12,4,${0.25 + Math.random() * 0.25})`;

    const size = type === "dust" ? 1.5 + Math.random() * 2
               : type === "chip" ? 2 + Math.random() * 3
               : 2.5 + Math.random() * 3.5;

    const duration = type === "dust" ? 12 + Math.random() * 10
                   : type === "chip" ? 8 + Math.random() * 8
                   : 6 + Math.random() * 7;

    const delay = Math.random() * 10;
    const left = 5 + Math.random() * 90;

    // Convert page fraction to viewport % — particles appear near their page-fraction
    // We use top: X% so they sit inside the viewport at a fixed position
    const top = 5 + Math.random() * 90;

    const anim = type === "oil"
      ? `rise-bubble ${duration}s ${delay}s infinite ease-out`
      : `float-particle ${duration}s ${delay}s infinite ease-in-out`;

    return { color, size, left, top, anim, key: i };
  });

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.key}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animation: p.anim,
          }}
        />
      ))}
    </div>
  );
}
