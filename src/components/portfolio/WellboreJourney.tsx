/**
 * WellboreJourney — Realistic scroll-driven BHA with cinematic drilling FX.
 * Detailed components: derrick → drill pipe → HWDP → stabilizer → drill collar →
 * MWD sub → near-bit stabilizer → PDC bit.  All animated with mud circulation,
 * cuttings, vibration, and rotary motion.
 */
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PIPE_TOP_VH = 5;
const PIPE_BOT_VH = 93;
const DRILL_ZONE = PIPE_BOT_VH - PIPE_TOP_VH;
const TOOL_JOINTS = Array.from({ length: 24 }, (_, i) => (i + 1) * 4);

/* ── colour helpers ── */
const C = {
  pipe:   (l: number) => `hsl(215,12%,${l}%)`,
  collar: (l: number) => `hsl(210,14%,${l}%)`,
  tool:   (l: number) => `hsl(35,45%,${l}%)`,
  blade:  (l: number) => `hsl(215,10%,${l}%)`,
  cutter: (l: number) => `hsl(200,25%,${l}%)`,
  stab:   (l: number) => `hsl(220,15%,${l}%)`,
  mud:    (l: number, a = 1) => `hsla(25,60%,${l}%,${a})`,
};

/* ── Cuttings particles ── */
const CUTTINGS = Array.from({ length: 20 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  return {
    id: i,
    xEnd: side * (18 + Math.random() * 30),
    yEnd: -(20 + Math.random() * 60),
    size: 1.2 + Math.random() * 2.5,
    delay: Math.random() * 2,
    dur: 1.5 + Math.random() * 1.5,
    color: ["hsl(25,40%,45%)", "hsl(35,55%,50%)", "hsl(215,12%,50%)", "hsl(20,30%,38%)"][i % 4],
  };
});

/* ── Sparks from bit face ── */
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * 360;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    ex: Math.cos(rad) * (25 + Math.random() * 15),
    ey: Math.sin(rad) * (20 + Math.random() * 12) - 15,
    delay: i * 0.12,
  };
});

/* ── Mud flow droplets going UP the annulus ── */
const MUD_DROPS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  side: i % 2 === 0 ? -1 : 1,
  xOff: 14 + Math.random() * 8,
  delay: i * 0.7,
  dur: 2.5 + Math.random() * 1.5,
  size: 1.5 + Math.random() * 1.5,
}));

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS — Realistic BHA pieces
   ═══════════════════════════════════════════════ */

/* ─── PDC Drill Bit (side-profile, detailed) ─── */
function PDCBit() {
  const blades = [0, 72, 144, 216, 288];
  const nozzles = [60, 180, 300];

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="-32 -40 64 80" width="64" height="80"
        style={{ overflow: "visible", display: "block" }}>
        <defs>
          <linearGradient id="bShankG" x1="0%" y1="0%" x2="100%">
            <stop offset="0%"   stopColor={C.collar(10)} />
            <stop offset="25%"  stopColor={C.collar(30)} />
            <stop offset="50%"  stopColor={C.collar(48)} />
            <stop offset="75%"  stopColor={C.collar(30)} />
            <stop offset="100%" stopColor={C.collar(10)} />
          </linearGradient>
          <linearGradient id="bBodyG" x1="0%" y1="0%" x2="100%">
            <stop offset="0%"   stopColor={C.collar(8)} />
            <stop offset="25%"  stopColor={C.collar(26)} />
            <stop offset="50%"  stopColor={C.collar(42)} />
            <stop offset="75%"  stopColor={C.collar(26)} />
            <stop offset="100%" stopColor={C.collar(8)} />
          </linearGradient>
          <radialGradient id="bCutG" cx="35%" cy="30%">
            <stop offset="0%"   stopColor={C.cutter(80)} />
            <stop offset="50%"  stopColor={C.cutter(48)} />
            <stop offset="100%" stopColor={C.cutter(20)} />
          </radialGradient>
          <radialGradient id="bNozG" cx="50%" cy="50%">
            <stop offset="0%"   stopColor="hsl(205,70%,68%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(205,70%,22%)" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="heatG" cx="50%" cy="50%">
            <stop offset="0%"   stopColor="hsl(35,100%,70%)" stopOpacity="0.6" />
            <stop offset="40%"  stopColor="hsl(28,90%,50%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Pin connection threads */}
        {[-2, -1, 0].map(i => (
          <rect key={i} x="-7" y={-40 + i * 3.5} width="14" height="2.2"
            fill={i === 0 ? C.collar(36) : C.collar(26)}
            stroke={C.collar(48)} strokeWidth="0.3"
          />
        ))}

        {/* Shank */}
        <rect x="-9" y="-28" width="18" height="18" rx="1.5"
          fill="url(#bShankG)" stroke={C.collar(48)} strokeWidth="0.4" />
        {/* Wrench flats */}
        <rect x="-10" y="-24" width="20" height="4" rx="0.5"
          fill={C.collar(34)} stroke={C.collar(50)} strokeWidth="0.3" />
        <rect x="-10" y="-16" width="20" height="3" rx="0.5"
          fill={C.collar(30)} stroke={C.collar(46)} strokeWidth="0.3" />

        {/* Body taper */}
        <path d="M-9,-10 L-18,6 L18,6 L9,-10 Z"
          fill="url(#bBodyG)" stroke={C.collar(38)} strokeWidth="0.3" />

        {/* Gauge face */}
        <ellipse cx="0" cy="6" rx="18" ry="3" fill={C.collar(22)}
          stroke={C.collar(40)} strokeWidth="0.3" />

        {/* 5 PDC blades */}
        {blades.map((angle, bi) => (
          <g key={bi} transform={`rotate(${angle},0,6)`}>
            <path d="M0,6 L3,4 L15,12 Q17,18 13,22 L8,22 Q7,18 5,12 Z"
              fill={C.blade(28)} stroke={C.blade(50)} strokeWidth="0.35" />
            {/* 4 cutters per blade */}
            {[5, 9, 13, 16].map((r, ci) => {
              const rad = (angle * Math.PI) / 180;
              const cx = Math.sin(rad) * r * 0.3;
              const cy = 6 + Math.cos(rad) * r * 0.2;
              return (
                <g key={ci} transform={`translate(${cx},${cy - r * 0.25}) rotate(${-angle + 15})`}>
                  <ellipse cx="0" cy="0" rx="2.8" ry="1.5"
                    fill={C.collar(22)} stroke={C.collar(38)} strokeWidth="0.25" />
                  <ellipse cx="0" cy="-0.7" rx="2.4" ry="1.1"
                    fill="url(#bCutG)" stroke={C.cutter(65)} strokeWidth="0.2" />
                  {/* Diamond table shimmer */}
                  <motion.ellipse cx="-0.3" cy="-1" rx="0.9" ry="0.45"
                    fill={C.cutter(88)}
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 1.2, delay: bi * 0.15 + ci * 0.1, repeat: Infinity }} />
                </g>
              );
            })}
          </g>
        ))}

        {/* 3 nozzles */}
        {nozzles.map((nAngle, ni) => {
          const rad = (nAngle * Math.PI) / 180;
          const nx = Math.sin(rad) * 8;
          const ny = 4 + Math.cos(rad) * 4;
          return (
            <g key={ni}>
              <circle cx={nx} cy={ny} r="3.2" fill={C.collar(18)}
                stroke={C.collar(42)} strokeWidth="0.4" />
              <circle cx={nx} cy={ny} r="1.8" fill="url(#bNozG)" />
              {/* Mud jet shooting out */}
              <motion.ellipse cx={nx} cy={ny + 8} rx="2.5" ry="5"
                fill="hsl(205,75%,55%)"
                animate={{
                  opacity: [0, 0.8, 0.3, 0],
                  scaleY: [0.3, 1.4, 1, 0.3],
                  scaleX: [1.3, 0.6, 0.8, 1.3],
                }}
                transition={{ duration: 0.6, delay: ni * 0.2, repeat: Infinity }} />
            </g>
          );
        })}

        {/* Gauge pads */}
        {blades.map((angle, gi) => (
          <g key={gi} transform={`rotate(${angle + 36},0,6)`}>
            <rect x="-3" y="18" width="6" height="5" rx="0.8"
              fill={C.collar(32)} stroke={C.collar(50)} strokeWidth="0.3" />
            {[-1, 0, 1].map((dx, di) => (
              <circle key={di} cx={dx * 1.5} cy="20.5" r="0.6" fill={C.collar(54)} />
            ))}
          </g>
        ))}

        {/* Centre pin */}
        <circle cx="0" cy="6" r="3.2" fill={C.collar(28)} stroke={C.collar(46)} strokeWidth="0.4" />
        <circle cx="0" cy="6" r="1.6" fill={C.collar(45)} />
        <circle cx="0" cy="6" r="0.7" fill={C.collar(60)} />

        {/* Bit nose */}
        <ellipse cx="0" cy="24" rx="16" ry="3.5" fill={C.collar(16)}
          stroke={C.collar(32)} strokeWidth="0.3" />

        {/* Heat glow at cutting face — pulsing */}
        <motion.ellipse cx="0" cy="22" rx="20" ry="7" fill="url(#heatG)"
          animate={{ opacity: [0.3, 0.9, 0.3], ry: [5, 9, 5] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} />

        {/* Sparks flying from bit face */}
        {SPARKS.map((s) => (
          <motion.line key={s.id}
            x1="0" y1="22"
            x2={s.ex * 0.2} y2={22 + s.ey * 0.2}
            stroke="hsl(45,100%,85%)" strokeWidth="0.7" strokeLinecap="round"
            animate={{
              x2: [0, s.ex * 0.6, s.ex],
              y2: [22, 22 + s.ey * 0.6, 22 + s.ey],
              opacity: [1, 0.7, 0],
            }}
            transition={{ duration: 0.4, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Ambient glow below bit */}
      <motion.div style={{
        position: "absolute", bottom: "-8px", left: "50%",
        transform: "translateX(-50%)",
        width: "55px", height: "28px", borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 100%, hsla(35,100%,55%,0.55) 0%, hsla(28,90%,45%,0.2) 40%, transparent 70%)",
        filter: "blur(4px)",
      }}
        animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.85, 1.2, 0.85] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>
  );
}

/* ─── Near-Bit Stabilizer ─── */
function NearBitStabilizer() {
  return (
    <svg viewBox="-18 0 36 44" width="36" height="44" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="stabG" x1="0%" y1="0%" x2="100%">
          <stop offset="0%"   stopColor={C.stab(10)} />
          <stop offset="30%"  stopColor={C.stab(32)} />
          <stop offset="50%"  stopColor={C.stab(48)} />
          <stop offset="70%"  stopColor={C.stab(32)} />
          <stop offset="100%" stopColor={C.stab(10)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height="44" rx="1" fill="url(#stabG)"
        stroke={C.stab(42)} strokeWidth="0.4" />
      {/* 3 blade fins */}
      {[-1, 0, 1].map((_, i) => (
        <g key={i}>
          <rect x={i === 0 ? "-16" : i === 1 ? "8" : "-16"} y="6" width="8" height="32" rx="2"
            fill={C.stab(28)} stroke={C.stab(46)} strokeWidth="0.35"
            transform={i === 2 ? "translate(24,0)" : ""} />
          {/* Hardfacing dots */}
          {[12, 18, 24, 30].map((y, wi) => (
            <circle key={wi} cx={i === 0 ? -17 : i === 1 ? 17 : -17} cy={y} r="1.3"
              fill={C.stab(50)} stroke={C.stab(60)} strokeWidth="0.25"
              transform={i === 2 ? "translate(24,0)" : ""} />
          ))}
        </g>
      ))}
      {/* Connection threads */}
      <rect x="-8" y="0" width="16" height="4" rx="0.5" fill={C.stab(30)} stroke={C.stab(44)} strokeWidth="0.3" />
      <rect x="-8" y="40" width="16" height="4" rx="0.5" fill={C.stab(30)} stroke={C.stab(44)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── MWD / LWD Sub ─── */
function MWDSub() {
  return (
    <svg viewBox="-10 0 20 55" width="20" height="55" style={{ display: "block" }}>
      <defs>
        <linearGradient id="mwdG" x1="0%" y1="0%" x2="100%">
          <stop offset="0%"   stopColor={C.tool(10)} />
          <stop offset="30%"  stopColor={C.tool(26)} />
          <stop offset="50%"  stopColor={C.tool(42)} />
          <stop offset="70%"  stopColor={C.tool(26)} />
          <stop offset="100%" stopColor={C.tool(10)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height="55" rx="1" fill="url(#mwdG)"
        stroke={C.tool(38)} strokeWidth="0.5" />
      {/* Sensor windows — blinking */}
      {[10, 18, 26, 34, 42].map((y, i) => (
        <motion.rect key={i} x="-8" y={y} width="2.5" height="3.5" rx="0.5"
          fill={i % 2 === 0 ? "hsl(200,65%,42%)" : "hsl(120,50%,38%)"}
          stroke={C.tool(50)} strokeWidth="0.3"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, delay: i * 0.35, repeat: Infinity }}
        />
      ))}
      {/* Centraliser ring */}
      <rect x="-9" y="25" width="18" height="5" rx="1"
        fill={C.tool(20)} stroke={C.tool(44)} strokeWidth="0.4" />
      {/* Connection marks */}
      <rect x="-8" y="0" width="16" height="3" rx="0.5" fill={C.tool(22)} stroke={C.tool(40)} strokeWidth="0.3" />
      <rect x="-8" y="52" width="16" height="3" rx="0.5" fill={C.tool(22)} stroke={C.tool(40)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── Drill Collar ─── */
function DrillCollar({ height }: { height: number }) {
  return (
    <svg viewBox={`-9 0 18 ${height}`} width="18" height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`dcG${height}`} x1="0%" y1="0%" x2="100%">
          <stop offset="0%"   stopColor={C.collar(8)} />
          <stop offset="28%"  stopColor={C.collar(28)} />
          <stop offset="50%"  stopColor={C.collar(44)} />
          <stop offset="72%"  stopColor={C.collar(28)} />
          <stop offset="100%" stopColor={C.collar(8)} />
        </linearGradient>
      </defs>
      <rect x="-8" y="0" width="16" height={height} rx="1"
        fill={`url(#dcG${height})`} stroke={C.collar(40)} strokeWidth="0.4" />
      {/* Spiral grooves */}
      {Array.from({ length: Math.floor(height / 12) }, (_, i) => (
        <line key={i} x1="-8" y1={6 + i * 12} x2="8" y2={3 + i * 12}
          stroke={C.collar(50)} strokeWidth="0.45" opacity="0.4" />
      ))}
      {/* Connections */}
      <rect x="-9" y="0" width="18" height="4" rx="0.5" fill={C.collar(24)} stroke={C.collar(42)} strokeWidth="0.3" />
      <rect x="-9" y={height - 4} width="18" height="4" rx="0.5" fill={C.collar(24)} stroke={C.collar(42)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── Integral Blade Stabilizer ─── */
function IntegralStabilizer() {
  return (
    <svg viewBox="-20 0 40 48" width="40" height="48" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="iStG" x1="0%" y1="0%" x2="100%">
          <stop offset="0%"   stopColor={C.stab(8)} />
          <stop offset="30%"  stopColor={C.stab(30)} />
          <stop offset="50%"  stopColor={C.stab(46)} />
          <stop offset="70%"  stopColor={C.stab(30)} />
          <stop offset="100%" stopColor={C.stab(8)} />
        </linearGradient>
      </defs>
      {/* Connection subs */}
      <rect x="-8" y="0" width="16" height="7" rx="1" fill="url(#iStG)" stroke={C.stab(40)} strokeWidth="0.4" />
      <rect x="-8" y="41" width="16" height="7" rx="1" fill="url(#iStG)" stroke={C.stab(40)} strokeWidth="0.4" />
      {/* Body */}
      <rect x="-8" y="7" width="16" height="34" fill={C.stab(20)} stroke={C.stab(36)} strokeWidth="0.3" />
      {/* Blades */}
      {[-18, 10].map((x, i) => (
        <g key={i}>
          <rect x={x} y="9" width="8" height="30" rx="2"
            fill={C.stab(26)} stroke={C.stab(48)} strokeWidth="0.35" />
          {[14, 20, 26, 32].map((y, wi) => (
            <circle key={wi} cx={x + (i === 0 ? -1 : 9)} cy={y} r="1.5"
              fill={C.stab(46)} stroke={C.stab(58)} strokeWidth="0.25" />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── HWDP ─── */
function HeavyWeightDP({ height }: { height: number }) {
  return (
    <svg viewBox={`-10 0 20 ${height}`} width="20" height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id="hwG" x1="0%" y1="0%" x2="100%">
          <stop offset="0%"   stopColor={C.pipe(12)} />
          <stop offset="28%"  stopColor={C.pipe(34)} />
          <stop offset="50%"  stopColor={C.pipe(50)} />
          <stop offset="72%"  stopColor={C.pipe(34)} />
          <stop offset="100%" stopColor={C.pipe(12)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height={height} rx="1" fill="url(#hwG)"
        stroke={C.pipe(42)} strokeWidth="0.45" />
      {/* Centre wear pad */}
      <rect x="-8.5" y={height / 2 - 8} width="17" height="16" rx="1"
        fill={C.pipe(28)} stroke={C.pipe(46)} strokeWidth="0.35" />
      {/* Tool joints */}
      <rect x="-9" y="0" width="18" height="6" rx="1" fill={C.pipe(24)} stroke={C.pipe(44)} strokeWidth="0.35" />
      <rect x="-9" y={height - 6} width="18" height="6" rx="1" fill={C.pipe(24)} stroke={C.pipe(44)} strokeWidth="0.35" />
    </svg>
  );
}

/* ─── Rock Formation being drilled ─── */
function RockFace() {
  return (
    <div style={{ position: "relative", width: "64px", height: "16px", overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        background: `linear-gradient(180deg, hsl(25,22%,18%) 0%, hsl(215,14%,12%) 100%)`,
        borderTop: `1.5px solid hsl(25,28%,32%)`,
      }} />
      {/* Animated crack lines */}
      {[15, 35, 55, 75, 90].map((x, i) => (
        <motion.div key={i} style={{
          position: "absolute", left: `${x}%`, top: 0, width: "1px", height: "100%",
          background: "hsla(35,80%,50%,0.6)", transformOrigin: "top",
        }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.7, delay: i * 0.14, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
      {/* Rock dust */}
      <motion.div style={{
        position: "absolute", inset: 0, background: "hsla(25,30%,35%,0.45)",
      }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function WellboreJourney() {
  const { scrollYProgress } = useScroll();

  const rawHeight = useTransform(scrollYProgress, [0, 1], [0, DRILL_ZONE]);
  const pipeHeightVh = useSpring(rawHeight, { stiffness: 80, damping: 25 });
  const bitTopVh = useTransform(pipeHeightVh, (h) => `${PIPE_TOP_VH + h}vh`);
  const pipeH = useTransform(pipeHeightVh, (h) => `${h}vh`);

  // Mud flow pattern offset
  const mudY = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div
      className="fixed top-0 z-40 hidden lg:block pointer-events-none"
      style={{ left: "58px", width: "72px", height: "100vh" }}
    >
      {/* ── Surface Derrick (static) ── */}
      <div className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 0, width: "60px", height: `${PIPE_TOP_VH}vh` }}>
        <svg viewBox="0 0 60 130" width="60" height="100%" fill="none" style={{ overflow: "visible" }}>
          {/* Legs */}
          <line x1="4"  y1="130" x2="26" y2="8"  stroke={C.pipe(36)} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="56" y1="130" x2="34" y2="8"  stroke={C.pipe(36)} strokeWidth="2.5" strokeLinecap="round" />
          {/* Cross braces */}
          {[[10, 110, 50, 110], [14, 86, 46, 86], [17, 64, 43, 64], [20, 44, 40, 44]].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.pipe(28)} strokeWidth={1.4 - i * 0.1} />
          ))}
          {/* X-bracing */}
          {[[10, 110, 46, 86], [50, 110, 14, 86], [14, 86, 43, 64], [46, 86, 17, 64], [17, 64, 40, 44], [43, 64, 20, 44]].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.pipe(16)} strokeWidth="0.65" />
          ))}
          {/* Crown block */}
          <rect x="22" y="4" width="16" height="7" rx="1.5" fill={C.pipe(30)} stroke={C.pipe(46)} strokeWidth="0.5" />
          <line x1="24" y1="7.5" x2="36" y2="7.5" stroke={C.pipe(48)} strokeWidth="0.7" />
          {/* Top drive */}
          <rect x="25" y="11" width="10" height="14" rx="1" fill={C.pipe(24)} stroke={C.pipe(40)} strokeWidth="0.45" />
          <rect x="27" y="13" width="6" height="3" fill={C.pipe(40)} />
          <rect x="27" y="18" width="6" height="3" fill={C.pipe(36)} />
          {/* Traveling block */}
          <rect x="23" y="25" width="14" height="8" rx="1" fill={C.pipe(20)} stroke={C.pipe(38)} strokeWidth="0.4" />
          <line x1="27" y1="25" x2="27" y2="33" stroke={C.pipe(42)} strokeWidth="0.7" />
          <line x1="33" y1="25" x2="33" y2="33" stroke={C.pipe(42)} strokeWidth="0.7" />
          {/* Rig floor */}
          <rect x="0" y="122" width="60" height="8" rx="1" fill={C.pipe(18)} />
          <rect x="3" y="118" width="10" height="12" rx="1" fill={C.pipe(16)} stroke={C.pipe(32)} strokeWidth="0.4" />
          <rect x="47" y="118" width="10" height="12" rx="1" fill={C.pipe(16)} stroke={C.pipe(32)} strokeWidth="0.4" />
          {/* Warning light — blinking */}
          <motion.circle cx="30" cy="2" r="2.5" fill="hsl(5,78%,55%)"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }} />
        </svg>
      </div>

      {/* ── Drill Pipe ── */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{ top: `${PIPE_TOP_VH}vh`, width: "10px", height: pipeH }}>
        {/* Pipe body */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg,
            ${C.pipe(14)} 0%, ${C.pipe(36)} 25%, ${C.pipe(54)} 50%,
            ${C.pipe(36)} 75%, ${C.pipe(14)} 100%)`,
        }} />
        {/* Mud flow streaks inside pipe */}
        <motion.div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(180deg,
            transparent 0px, transparent 6px,
            ${C.mud(38, 0.2)} 6px, ${C.mud(38, 0.2)} 8px)`,
          backgroundSize: "10px 16px",
          y: mudY,
        }} />
        {/* Tool joints */}
        {TOOL_JOINTS.map((pct) => (
          <div key={pct} style={{
            position: "absolute", left: "-3px", right: "-3px", top: `${pct}%`, height: "7px",
            background: `linear-gradient(90deg,
              ${C.pipe(10)} 0%, ${C.pipe(32)} 28%, ${C.pipe(48)} 50%,
              ${C.pipe(32)} 72%, ${C.pipe(10)} 100%)`,
            borderTop: `1px solid ${C.pipe(56)}`,
            borderBottom: `1px solid ${C.pipe(16)}`,
            borderRadius: "1px",
          }} />
        ))}
      </motion.div>

      {/* ── Mud returns flowing UP the annulus ── */}
      {MUD_DROPS.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full"
          style={{
            left: `calc(50% + ${drop.side * drop.xOff}px)`,
            width: `${drop.size}px`,
            height: `${drop.size * 2.5}px`,
            background: C.mud(42, 0.5),
            borderRadius: "50%",
          }}
          initial={{ top: "85vh", opacity: 0 }}
          animate={{
            top: ["85vh", "50vh", "15vh", `${PIPE_TOP_VH}vh`],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: drop.dur,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* ── BHA Assembly ── */}
      <motion.div className="absolute"
        style={{
          top: bitTopVh, left: "50%", x: "-50%",
          marginTop: "-2px",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>

        {/* Subtle vibration on the whole BHA while drilling */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          animate={{ x: [-0.4, 0.4, -0.3, 0.3, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        >
          {/* ① HWDP */}
          <HeavyWeightDP height={45} />

          {/* ② Upper Stabilizer */}
          <IntegralStabilizer />

          {/* ③ Drill Collar */}
          <DrillCollar height={40} />

          {/* ④ MWD Sub */}
          <MWDSub />

          {/* ⑤ Lower Drill Collar */}
          <DrillCollar height={30} />

          {/* ⑥ Near-Bit Stabilizer */}
          <NearBitStabilizer />

          {/* ⑦ Bit Sub connector */}
          <div style={{
            width: "14px", height: "12px",
            background: `linear-gradient(90deg,
              ${C.collar(12)} 0%, ${C.collar(34)} 28%, ${C.collar(48)} 50%,
              ${C.collar(34)} 72%, ${C.collar(12)} 100%)`,
            borderBottom: `2px solid ${C.collar(50)}`,
            flexShrink: 0,
          }} />

          {/* ⑧ PDC Drill Bit */}
          <PDCBit />

          {/* Rock cuttings flying upward from bit face */}
          <div style={{ position: "relative", width: 0, height: 0 }}>
            {CUTTINGS.map((c) => (
              <motion.div
                key={c.id}
                style={{
                  position: "absolute",
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  borderRadius: "30%",
                  background: c.color,
                  left: "0px",
                  top: "-10px",
                }}
                animate={{
                  x: [0, c.xEnd * 0.4, c.xEnd],
                  y: [0, c.yEnd * 0.4, c.yEnd],
                  opacity: [0.9, 0.6, 0],
                  scale: [1, 0.7, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: c.dur,
                  delay: c.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* ⑨ Rock Face */}
          <RockFace />
        </motion.div>
      </motion.div>
    </div>
  );
}
