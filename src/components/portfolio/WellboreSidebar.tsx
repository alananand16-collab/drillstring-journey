/**
 * WellboreSidebar — Unified cinematic drilling sidebar.
 * Merges DepthIndicator + WellboreJourney into one 96px panel.
 *
 * Drill bit travels full viewport height (top → bottom) as user scrolls.
 * Formation color bands, casing shoes, mud returns, depth readout all in one place.
 */
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ── Formation zones (colors match index.css tokens) ── */
const FORMATIONS = [
  { pct: 0,   label: "SURFACE",      icon: "▽", color: "hsl(215,12%,55%)",  depth: 0      },
  { pct: 18,  label: "SHALE CAP",    icon: "≡", color: "hsl(215,12%,42%)",  depth: 2400   },
  { pct: 38,  label: "WATER SAND",   icon: "≋", color: "hsl(205,80%,60%)",  depth: 3800   },
  { pct: 57,  label: "OIL SAND",     icon: "●", color: "hsl(35,92%,55%)",   depth: 6800   },
  { pct: 74,  label: "PERF ZONE",    icon: "✶", color: "hsl(28,92%,58%)",   depth: 10800  },
  { pct: 88,  label: "RESERVOIR TD", icon: "◆", color: "hsl(175,60%,48%)",  depth: 14000  },
];

const MAX_DEPTH = 14000;

/* ── Colour palette (steel / carbide / mud) ── */
const C = {
  pipe:   (l: number) => `hsl(215,12%,${l}%)`,
  collar: (l: number) => `hsl(210,14%,${l}%)`,
  tool:   (l: number) => `hsl(35,45%,${l}%)`,
  blade:  (l: number) => `hsl(215,10%,${l}%)`,
  cutter: (l: number) => `hsl(200,25%,${l}%)`,
  stab:   (l: number) => `hsl(220,15%,${l}%)`,
  mud:    (l: number, a = 1) => `hsla(25,60%,${l}%,${a})`,
};

/* ── Pre-computed particles ── */
const CUTTINGS = Array.from({ length: 20 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  return {
    id: i,
    xEnd: side * (14 + (i * 6) % 28),
    yEnd: -(18 + (i * 8) % 40),
    size: 1.2 + (i % 3) * 0.6,
    delay: (i * 0.21) % 2.5,
    dur: 1.2 + (i % 4) * 0.3,
    color: ["hsl(25,40%,45%)","hsl(35,55%,50%)","hsl(215,12%,50%)","hsl(20,30%,38%)"][i % 4],
  };
});

const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * 360;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    ex: Math.cos(rad) * (18 + (i % 3) * 6),
    ey: Math.sin(rad) * (12 + (i % 4) * 4) - 8,
    delay: i * 0.1,
    len: 1.0 + (i % 3) * 0.5,
  };
});

const MUD_DROPS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  side: i % 2 === 0 ? -1 : 1,
  xOff: 9 + (i % 4) * 2,
  delay: (i * 0.6) % 5,
  dur: 2.0 + (i % 4) * 0.5,
  size: 1.0 + (i % 3) * 0.6,
}));

/* ══════════════════════════════════════
   DRILL BIT (compact, hyper-detailed)
══════════════════════════════════════ */
function PDCBit() {
  const blades = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="-26 -36 52 70" width="52" height="70" style={{ overflow: "visible", display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id="sbShank" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(8)} />
          <stop offset="50%"  stopColor={C.collar(44)} />
          <stop offset="100%" stopColor={C.collar(8)} />
        </linearGradient>
        <linearGradient id="sbBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(6)} />
          <stop offset="50%"  stopColor={C.collar(38)} />
          <stop offset="100%" stopColor={C.collar(6)} />
        </linearGradient>
        <radialGradient id="sbCutter" cx="35%" cy="30%">
          <stop offset="0%"   stopColor={C.cutter(82)} />
          <stop offset="100%" stopColor={C.cutter(18)} />
        </radialGradient>
        <radialGradient id="sbHeat" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="hsl(35,100%,72%)" stopOpacity="0.8" />
          <stop offset="50%"  stopColor="hsl(25,90%,50%)"  stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="sbGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Pin threads */}
      {[-2, 0].map((dy, i) => (
        <rect key={i} x="-6" y={-36 + dy * 2} width="12" height="2"
          fill={C.collar(28)} stroke={C.collar(44)} strokeWidth="0.3" rx="0.3" />
      ))}

      {/* Shank */}
      <rect x="-8" y="-28" width="16" height="16" rx="1.5"
        fill="url(#sbShank)" stroke={C.collar(44)} strokeWidth="0.4" />
      <rect x="-9" y="-24" width="18" height="4" rx="0.6"
        fill={C.collar(30)} stroke={C.collar(48)} strokeWidth="0.3" />

      {/* Body taper */}
      <path d="M-8,-12 L-16,4 L16,4 L8,-12 Z"
        fill="url(#sbBody)" stroke={C.collar(34)} strokeWidth="0.35" />

      {/* Gauge face */}
      <ellipse cx="0" cy="4" rx="16" ry="2.8" fill={C.collar(18)} stroke={C.collar(36)} strokeWidth="0.35" />

      {/* 5 PDC Blades */}
      {blades.map((angle, bi) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <g key={bi} transform={`rotate(${angle}, 0, 4)`}>
            <path d="M0,4 L2.5,2.5 L13,10 Q15,17 11,21 L7,21 Q5.5,16 3.5,10 Z"
              fill={C.blade(24)} stroke={C.blade(46)} strokeWidth="0.35" />
            {[3, 6, 9, 13].map((r, ci) => {
              const cx2 = Math.sin(rad) * r * 0.26;
              const cy2 = 4 + Math.cos(rad) * r * 0.16;
              return (
                <g key={ci} transform={`translate(${cx2}, ${cy2 - r * 0.2}) rotate(${-angle + 20})`}>
                  <ellipse cx="0" cy="0" rx="2.4" ry="1.3" fill={C.collar(18)} stroke={C.collar(34)} strokeWidth="0.25" />
                  <ellipse cx="0" cy="-0.6" rx="2.0" ry="0.95" fill="url(#sbCutter)" stroke={C.cutter(60)} strokeWidth="0.2" />
                  <motion.ellipse cx="-0.3" cy="-0.9" rx="0.7" ry="0.35" fill={C.cutter(88)}
                    animate={{ opacity: [0.1, 0.85, 0.1] }}
                    transition={{ duration: 0.7 + bi * 0.1 + ci * 0.07, repeat: Infinity }} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* 3 mud nozzles */}
      {[60, 180, 300].map((nAngle, ni) => {
        const rad = (nAngle * Math.PI) / 180;
        const nx = Math.sin(rad) * 7;
        const ny = 2 + Math.cos(rad) * 3.5;
        return (
          <g key={ni}>
            <circle cx={nx} cy={ny} r="2.8" fill={C.collar(14)} stroke={C.collar(38)} strokeWidth="0.4" />
            <circle cx={nx} cy={ny} r="1.5" fill="hsl(205,70%,35%)" />
            <motion.ellipse cx={nx} cy={ny + 7} rx="2.2" ry="4.5"
              fill="hsl(205,70%,62%)" opacity="0.65" filter="url(#sbGlow)"
              animate={{ opacity: [0, 0.85, 0.35, 0], scaleY: [0.2, 1.5, 1.0, 0.2] }}
              transition={{ duration: 0.5, delay: ni * 0.16, repeat: Infinity }}
            />
          </g>
        );
      })}

      {/* Centre pin */}
      <circle cx="0" cy="4" r="3" fill={C.collar(24)} stroke={C.collar(42)} strokeWidth="0.4" />
      <circle cx="0" cy="4" r="1.6" fill={C.collar(40)} />

      {/* Nose */}
      <ellipse cx="0" cy="21" rx="14" ry="3.2" fill={C.collar(12)} stroke={C.collar(28)} strokeWidth="0.35" />

      {/* Heat glow */}
      <motion.ellipse cx="0" cy="20" rx="18" ry="7" fill="url(#sbHeat)"
        animate={{ opacity: [0.4, 0.8, 0.45, 0.75, 0.4], ry: [6, 8, 6.5, 8.5, 6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* White-hot centre flash */}
      <motion.ellipse cx="0" cy="21" rx="6" ry="2.8"
        fill="hsl(45,100%,92%)" opacity="0.5"
        animate={{ opacity: [0.2, 0.6, 0.2, 0.5, 0.2], rx: [3, 6, 3.5, 5.5, 3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spark streaks */}
      {SPARKS.map((s) => (
        <motion.line key={s.id}
          x1="0" y1="20" x2={s.ex * 0.12} y2={20 + s.ey * 0.12}
          stroke="hsl(48,100%,88%)" strokeWidth={s.len} strokeLinecap="round"
          animate={{
            x2: [0, s.ex * 0.5, s.ex * 0.85, s.ex],
            y2: [20, 20 + s.ey * 0.5, 20 + s.ey * 0.85, 20 + s.ey],
            opacity: [1, 0.7, 0.3, 0],
          }}
          transition={{ duration: 0.3, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════
   CASING SHOE marker
══════════════════════════════════════ */
function CasingShoe({ color }: { color: string }) {
  return (
    <svg viewBox="-12 0 24 14" width="24" height="14" style={{ display: "block", flexShrink: 0, overflow: "visible" }}>
      <rect x="-10" y="0" width="20" height="10" rx="1" fill={color} opacity="0.35" stroke={color} strokeWidth="0.5" />
      <path d="M-10,10 L-14,14 L14,14 L10,10 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ══════════════════════════════════════
   BHA STACK (above the PDC bit)
══════════════════════════════════════ */
function BHAStack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Near-bit stabilizer */}
      <svg viewBox="-14 0 28 36" width="28" height="36" style={{ display: "block", flexShrink: 0 }}>
        <defs>
          <linearGradient id="sb_nbs" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.stab(7)} />
            <stop offset="50%" stopColor={C.stab(44)} />
            <stop offset="100%" stopColor={C.stab(7)} />
          </linearGradient>
        </defs>
        <rect x="-5" y="0" width="10" height="36" rx="1" fill="url(#sb_nbs)" stroke={C.stab(38)} strokeWidth="0.4" />
        {[[-13,8,4,20],[ 9,8,4,20]].map(([bx,by,bw,bh],i) => (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh} rx="1.5" fill={C.stab(22)} stroke={C.stab(44)} strokeWidth="0.3" />
            {[12,17,22].map((y,wi) => (
              <circle key={wi} cx={i===0 ? -14 : 14} cy={y} r="1.2" fill={C.stab(46)} stroke={C.stab(58)} strokeWidth="0.25" />
            ))}
          </g>
        ))}
      </svg>

      {/* Drill collar */}
      <svg viewBox="-7 0 14 30" width="14" height="30" style={{ display: "block", flexShrink: 0 }}>
        <defs>
          <linearGradient id="sb_dc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.collar(7)} />
            <stop offset="50%" stopColor={C.collar(42)} />
            <stop offset="100%" stopColor={C.collar(7)} />
          </linearGradient>
        </defs>
        <rect x="-6" y="0" width="12" height="30" rx="1" fill="url(#sb_dc)" stroke={C.collar(36)} strokeWidth="0.4" />
        {Array.from({length:3},(_,i) => (
          <line key={i} x1="-6" y1={5+i*8} x2="6" y2={3+i*8} stroke={C.collar(48)} strokeWidth="0.4" opacity="0.4" />
        ))}
        <rect x="-7" y="0" width="14" height="3.5" rx="0.4" fill={C.collar(20)} stroke={C.collar(38)} strokeWidth="0.25" />
        <rect x="-7" y="26.5" width="14" height="3.5" rx="0.4" fill={C.collar(20)} stroke={C.collar(38)} strokeWidth="0.25" />
      </svg>

      {/* MWD sub */}
      <svg viewBox="-8 0 16 46" width="16" height="46" style={{ display: "block", flexShrink: 0 }}>
        <defs>
          <linearGradient id="sb_mwd" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.tool(7)} />
            <stop offset="50%" stopColor={C.tool(38)} />
            <stop offset="100%" stopColor={C.tool(7)} />
          </linearGradient>
        </defs>
        <rect x="-5.5" y="0" width="11" height="46" rx="1" fill="url(#sb_mwd)" stroke={C.tool(34)} strokeWidth="0.4" />
        <rect x="-7.5" y="21" width="15" height="4" rx="1" fill={C.tool(16)} stroke={C.tool(40)} strokeWidth="0.35" />
        {[6,11,17,28,35,41].map((y,i) => (
          <motion.rect key={i} x={i%2===0 ? "-7" : "4.5"} y={y} width="2.2" height="3" rx="0.5"
            fill={["hsl(200,65%,42%)","hsl(120,55%,38%)","hsl(55,80%,50%)"][i%3]}
            animate={{ opacity: [0.3,1,0.3] }}
            transition={{ duration: 1.4+i*0.25, delay: i*0.35, repeat: Infinity }}
          />
        ))}
        <rect x="-6.5" y="0" width="13" height="3" rx="0.4" fill={C.tool(18)} stroke={C.tool(38)} strokeWidth="0.25" />
        <rect x="-6.5" y="43" width="13" height="3" rx="0.4" fill={C.tool(18)} stroke={C.tool(38)} strokeWidth="0.25" />
      </svg>

      {/* Bit sub connector */}
      <div style={{
        width: "12px", height: "10px", flexShrink: 0,
        background: `linear-gradient(90deg, ${C.collar(10)} 0%, ${C.collar(30)} 28%, ${C.collar(45)} 50%, ${C.collar(30)} 72%, ${C.collar(10)} 100%)`,
        borderBottom: `2px solid ${C.collar(50)}`,
      }} />
    </div>
  );
}

/* ══════════════════════════════════════
   ANNULUS MUD RETURNS (rising particles)
══════════════════════════════════════ */
function AnnulusReturns({ containerH }: { containerH: number }) {
  return (
    <>
      {MUD_DROPS.map((d) => (
        <motion.div key={d.id}
          style={{
            position: "absolute",
            left: `calc(50% + ${d.side * d.xOff}px)`,
            width: `${d.size}px`,
            height: `${d.size * 2.5}px`,
            borderRadius: "50%",
            background: C.mud(38, 0.5),
            willChange: "transform",
          }}
          animate={{
            top: [`${containerH * 0.9}px`, `${containerH * 0.5}px`, `${containerH * 0.1}px`, "0px"],
            opacity: [0, 0.7, 0.45, 0],
          }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}

/* ══════════════════════════════════════
   CUTTINGS CLOUD
══════════════════════════════════════ */
function CuttingsCloud() {
  return (
    <div style={{ position: "relative", width: 0, height: 0 }}>
      {CUTTINGS.map((c) => (
        <motion.div key={c.id} style={{
          position: "absolute",
          width: `${c.size}px`, height: `${c.size * 0.7}px`,
          borderRadius: "30%",
          background: c.color,
          left: "0px", top: "-6px",
          willChange: "transform",
        }}
          animate={{
            x: [0, c.xEnd * 0.4, c.xEnd * 0.8, c.xEnd],
            y: [0, c.yEnd * 0.3, c.yEnd * 0.7, c.yEnd],
            opacity: [0.8, 0.6, 0.3, 0],
            scale: [1, 0.7, 0.4, 0.15],
            rotate: [0, 120, 260, 400],
          }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   BIT GLOW
══════════════════════════════════════ */
function BitGlow() {
  return (
    <motion.div style={{
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "56px", height: "28px",
      borderRadius: "50%",
      background: "radial-gradient(ellipse at 50% 100%, hsla(35,100%,55%,0.65) 0%, hsla(28,90%,45%,0.2) 45%, transparent 72%)",
      filter: "blur(4px)",
      willChange: "transform, opacity",
    }}
      animate={{ opacity: [0.5, 0.85, 0.55, 0.8, 0.5], scaleX: [0.9, 1.15, 0.92, 1.1, 0.9] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ══════════════════════════════════════
   DERRICK (top of string)
══════════════════════════════════════ */
function Derrick() {
  const L = (l: number) => `hsl(215,12%,${l}%)`;
  return (
    <svg viewBox="0 0 48 100" width="48" height="100" fill="none" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="sb_derG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={L(10)} />
          <stop offset="50%" stopColor={L(36)} />
          <stop offset="100%" stopColor={L(10)} />
        </linearGradient>
      </defs>
      {/* Legs */}
      <line x1="4" y1="96" x2="22" y2="6"  stroke="url(#sb_derG)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="44" y1="96" x2="26" y2="6" stroke="url(#sb_derG)" strokeWidth="2.4" strokeLinecap="round" />
      {/* Braces */}
      {([[7,80,41,80],[9,62,39,62],[12,46,36,46],[15,32,33,32],[18,20,30,20]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={L(22)} strokeWidth={1.3 - i*0.1} opacity="0.8" />
      ))}
      {/* X-bracing */}
      {([[7,80,39,62],[41,80,9,62],[9,62,36,46],[39,62,12,46],[12,46,33,32],[36,46,15,32]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={L(13)} strokeWidth="0.5" opacity="0.55" />
      ))}
      {/* Crown block */}
      <rect x="17" y="2" width="14" height="6" rx="1.2" fill={L(26)} stroke={L(44)} strokeWidth="0.5" />
      {/* Warning beacon */}
      <motion.circle cx="24" cy="0" r="2.5" fill="hsl(5,78%,55%)"
        animate={{ opacity: [1, 0.1, 1], scale: [1, 1.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <motion.circle cx="24" cy="0" r="6" fill="hsl(5,78%,55%)" opacity="0.2"
        animate={{ opacity: [0.2, 0.04, 0.2], scale: [1, 1.7, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      {/* Top-drive */}
      <rect x="18" y="8" width="12" height="14" rx="1.2" fill={L(20)} stroke={L(38)} strokeWidth="0.4" />
      <rect x="20" y="10" width="8" height="3" rx="0.4" fill={L(36)} />
      <rect x="20" y="15" width="8" height="3" rx="0.4" fill={L(32)} />
      {/* Rig floor */}
      <rect x="0" y="90" width="48" height="6" rx="0.8" fill={L(14)} />
      <rect x="1" y="84" width="9" height="10" rx="0.8" fill={L(12)} stroke={L(26)} strokeWidth="0.3" />
      <rect x="38" y="84" width="9" height="10" rx="0.8" fill={L(12)} stroke={L(26)} strokeWidth="0.3" />
    </svg>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT — WellboreSidebar
══════════════════════════════════════ */

/* BHA total pixel height (NearBitStab36 + DC30 + MWD46 + BitSub10 + PDCBit70 + extras ~10) */
const BHA_H_PX = 202;

export default function WellboreSidebar() {
  const { scrollYProgress } = useScroll();

  /* Smooth spring for cinematic feel — high damping eliminates jitter */
  const smooth = useSpring(scrollYProgress, { stiffness: 30, damping: 35, mass: 1.5 });

  /* Measure viewport height so we can animate using pure numbers (no calc()/mixed units → no snapping) */
  const [viewportH, setViewportH] = React.useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  React.useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Layout constants ── */
  const DERRICK_H = 100; // px
  const DERRICK_TOP = 8; // px from top
  const DERRICK_BOTTOM = DERRICK_TOP + DERRICK_H; // where pipe exits derrick floor

  /* Bottom margin to keep BHA visible */
  const BOTTOM_MARGIN = 24;

  const startTop = DERRICK_BOTTOM + 12 - BHA_H_PX;
  const endTop = Math.max(
    DERRICK_BOTTOM + 24,
    viewportH - (BHA_H_PX + BOTTOM_MARGIN)
  );

  const bhaTop = useTransform(smooth, [0, 1], [startTop, endTop]);

  /* Pipe height = distance from derrick floor down to BHA top (clamped) */
  const pipeHeight = useTransform(bhaTop, (t) => Math.max(36, t - DERRICK_BOTTOM));

  /* Mud flow downward animation */
  const mudY = useTransform(scrollYProgress, [0, 1], [0, 600]);

  /* Depth number */
  const depthNum = useTransform(smooth, [0, 1], [0, MAX_DEPTH]);

  /* Active formation */
  const activeFormIdx = useTransform(smooth, (p) => {
    const pct = p * 100;
    let best = 0;
    FORMATIONS.forEach((f, i) => {
      if (pct >= f.pct) best = i;
    });
    return best;
  });

  /* Mobile progress bar */
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* ═══════════════════════════════════════
          DESKTOP SIDEBAR (left, 96px wide)
      ═══════════════════════════════════════ */}
      <div
        className="fixed left-0 top-0 z-50 hidden lg:flex pointer-events-none"
        style={{
          width: "96px",
          height: "100vh",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(5,8,14,0.97) 0%, rgba(5,8,14,0.99) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* ── Formation color bands strip (left 4px) ── */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "4px", height: "100%" }}>
          {FORMATIONS.map((f, i) => {
            const nextPct = FORMATIONS[i + 1]?.pct ?? 100;
            return (
              <div key={f.label} style={{
                position: "absolute",
                top: `${f.pct}%`,
                height: `${nextPct - f.pct}%`,
                width: "100%",
                background: f.color,
                opacity: 0.4,
              }} />
            );
          })}
        </div>

        {/* ── Formation marker labels ── */}
        <div style={{ position: "absolute", left: "6px", top: 0, right: 0, height: "100%" }}>
          {FORMATIONS.map((f) => (
            <div key={f.label} style={{
              position: "absolute",
              top: `${f.pct}%`,
              left: 0, right: 0,
              display: "flex",
              alignItems: "center",
              gap: "3px",
              paddingTop: "1px",
            }}>
              <div style={{ width: "5px", height: "1px", background: f.color, opacity: 0.55, flexShrink: 0 }} />
              <div style={{ fontSize: "5.5px", fontFamily: "'JetBrains Mono', monospace", color: f.color, opacity: 0.6, letterSpacing: "0.07em", lineHeight: 1 }}>
                {f.icon} {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── DERRICK (static at top) ── */}
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: `${DERRICK_TOP}px`,
          width: "48px",
          height: `${DERRICK_H}px`,
          zIndex: 5,
          flexShrink: 0,
        }}>
          <Derrick />
        </div>

        {/* ── GROWING DRILL PIPE (from derrick exit down to BHA top) ── */}
        <motion.div style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          top: `${DERRICK_BOTTOM}px`,
          width: "9px",
          height: pipeHeight,
          zIndex: 3,
          overflow: "hidden",
          willChange: "transform",
        }}>
          {/* Steel body */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(90deg, ${C.pipe(12)} 0%, ${C.pipe(34)} 22%, ${C.pipe(50)} 50%, ${C.pipe(34)} 78%, ${C.pipe(12)} 100%)`,
          }} />
          {/* Mud flow streaks downward */}
          <motion.div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 4px, ${C.mud(38,0.16)} 4px, ${C.mud(38,0.16)} 6px)`,
            backgroundSize: "9px 12px",
            y: mudY,
            willChange: "transform",
          }} />
          {/* Tool joints */}
          {Array.from({length:20},(_,i) => (
            <div key={i} style={{
              position: "absolute",
              left: "-2.5px", right: "-2.5px",
              top: `${(i+1)*5}%`,
              height: "7px",
              background: `linear-gradient(90deg, ${C.pipe(9)} 0%, ${C.pipe(28)} 26%, ${C.pipe(44)} 50%, ${C.pipe(28)} 74%, ${C.pipe(9)} 100%)`,
              borderTop: `1px solid ${C.pipe(54)}`,
              borderBottom: `1px solid ${C.pipe(13)}`,
              borderRadius: "1px",
            }} />
          ))}
        </motion.div>

        {/* ── ANNULUS MUD RETURNS ── */}
        <AnnulusReturns containerH={viewportH} />

        {/* ── BHA + BIT assembly (travels from top to bottom) ── */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            x: "-50%",
            top: bhaTop,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 6,
            willChange: "transform",
          }}
        >
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          >
            <BHAStack />
            <PDCBit />
            <CuttingsCloud />
            <BitGlow />
          </motion.div>
        </motion.div>

        {/* ── Depth counter + formation label (pinned to bottom) ── */}
        <DepthCounter depthNum={depthNum} activeFormIdx={activeFormIdx} />
      </div>

      {/* ═══════════════════════════════════════
          MOBILE — Left-aligned drill string + depth bar
      ═══════════════════════════════════════ */}
      <div
        className="fixed top-14 left-0 right-0 z-40 flex items-center gap-3 px-4 py-2 lg:hidden"
        style={{
          background: "rgba(5,8,14,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <DepthLabel depthNum={depthNum} />
        <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ width: progressWidth, background: "hsl(var(--brand))" }}
          />
        </div>
        <ActiveFormLabel activeFormIdx={activeFormIdx} />
      </div>

      {/* ── Mobile left-edge drill string (simplified) ── */}
      <MobileDrillString smooth={smooth} />
    </>
  );
}

/* ══════════════════════════════════════
   MOBILE DRILL STRING (far-left side)
══════════════════════════════════════ */
function MobileDrillString({ smooth }: { smooth: any }) {
  const drillProgress = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const bitTop = useTransform(smooth, [0, 1], [60, typeof window !== "undefined" ? window.innerHeight - 40 : 760]);

  return (
    <div className="fixed left-0 top-0 z-30 lg:hidden pointer-events-none" style={{ width: "28px", height: "100vh" }}>
      {/* Subtle background strip */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: "28px", height: "100%",
        background: "linear-gradient(180deg, rgba(5,8,14,0.85) 0%, rgba(5,8,14,0.6) 50%, rgba(5,8,14,0.85) 100%)",
      }} />

      {/* Track line */}
      <div style={{
        position: "absolute", left: "13px", top: "60px", bottom: "40px",
        width: "2px",
        background: "rgba(255,255,255,0.04)",
      }} />

      {/* Drilled portion */}
      <motion.div style={{
        position: "absolute", left: "13px", top: "60px",
        width: "2px",
        height: drillProgress,
        maxHeight: "calc(100vh - 100px)",
        background: "linear-gradient(180deg, hsl(215,12%,30%) 0%, hsl(var(--brand) / 0.4) 100%)",
        willChange: "transform",
      }} />

      {/* Formation ticks */}
      {FORMATIONS.map((f) => (
        <div key={f.label} style={{
          position: "absolute",
          left: "8px",
          top: `calc(60px + ${f.pct}% * (100vh - 100px) / 100)`,
          width: "12px",
          height: "1px",
          background: f.color,
          opacity: 0.35,
        }} />
      ))}

      {/* Drill bit glow */}
      <motion.div style={{
        position: "absolute",
        left: "9px",
        top: bitTop,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "hsl(var(--brand))",
        boxShadow: "0 0 8px 2px hsl(var(--brand) / 0.5), 0 0 16px 5px hsl(var(--brand) / 0.15)",
        willChange: "transform",
      }} />
    </div>
  );
}

/* ── Helper display components ── */
function DepthCounter({ depthNum, activeFormIdx }: { depthNum: any; activeFormIdx: any }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "16px",
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 8,
    }}>
      {/* Frosted glass telemetry box */}
      <div style={{
        padding: "8px 10px 6px",
        borderRadius: "8px",
        background: "rgba(5,8,14,0.75)",
        backdropFilter: "blur(10px)",
        border: "1px solid hsl(var(--brand) / 0.2)",
        boxShadow: "0 0 12px hsl(var(--brand) / 0.1), inset 0 1px 0 rgba(255,255,255,0.03)",
        textAlign: "center",
      }}>
        {/* Big depth number */}
        <motion.div style={{
          fontSize: "16px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "hsl(var(--brand))",
          textShadow: "0 0 12px hsl(var(--brand)/0.55), 0 0 24px hsl(var(--brand)/0.2)",
          lineHeight: 1,
        }}>
          <MotionNumber motionVal={depthNum} />
        </motion.div>
        <div style={{ fontSize: "7px", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", marginTop: "2px" }}>ft MD</div>
        {/* Active formation name */}
        <ActiveFormLabel activeFormIdx={activeFormIdx} style={{ marginTop: "5px" }} />
      </div>
    </div>
  );
}

function MotionNumber({ motionVal }: { motionVal: any }) {
  const [display, setDisplay] = React.useState("0");
  React.useEffect(() => {
    const unsub = motionVal.on("change", (v: number) => setDisplay(Math.round(v).toLocaleString()));
    return unsub;
  }, [motionVal]);
  return <span>{display}</span>;
}

function DepthLabel({ depthNum }: { depthNum: any }) {
  const [display, setDisplay] = React.useState("0");
  React.useEffect(() => {
    const unsub = depthNum.on("change", (v: number) => setDisplay(Math.round(v).toLocaleString()));
    return unsub;
  }, [depthNum]);
  return (
    <span style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "hsl(var(--brand))" }}>
      {display}ft
    </span>
  );
}

function ActiveFormLabel({ activeFormIdx, style }: { activeFormIdx: any; style?: React.CSSProperties }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const unsub = activeFormIdx.on("change", (v: number) => setIdx(Math.round(v)));
    return unsub;
  }, [activeFormIdx]);
  const f = FORMATIONS[idx] ?? FORMATIONS[0];
  return (
    <div style={{ fontSize: "8px", fontFamily: "'JetBrains Mono', monospace", fontWeight: "bold", letterSpacing: "0.12em", color: f.color, lineHeight: 1, ...style }}>
      {f.icon} {f.label}
    </div>
  );
}
