/**
 * WellboreJourney — Scroll-driven drill string with realistic BHA components.
 * Static engineering-illustration style: drill pipe → HWDP → drill collars →
 * stabilizer → MWD sub → near-bit stabilizer → PDC bit.
 */
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PIPE_TOP_VH = 5;   // where the pipe starts (below derrick)
const PIPE_BOT_VH = 93;  // deepest the bit can travel
const DRILL_ZONE = PIPE_BOT_VH - PIPE_TOP_VH;

// Tool joints every 5% of pipe height
const TOOL_JOINT_POSITIONS = Array.from({ length: 22 }, (_, i) => (i + 1) * 4.5);

/* ─── colour palette (all HSL) ─── */
const C = {
  pipe:    (l: number) => `hsl(215,12%,${l}%)`,
  collar:  (l: number) => `hsl(210,14%,${l}%)`,
  tool:    (l: number) => `hsl(35,45%,${l}%)`,    // amber tones for MWD
  blade:   (l: number) => `hsl(215,10%,${l}%)`,
  cutter:  (l: number) => `hsl(200,25%,${l}%)`,
  stab:    (l: number) => `hsl(220,15%,${l}%)`,
};

/* ─── PDC Bit ─── */
function PDCBit() {
  // 5 blades at 72° spacing
  const blades = [0, 72, 144, 216, 288];
  // 3 nozzles at 120°
  const nozzles = [60, 180, 300];

  return (
    <svg
      viewBox="-30 -48 60 82"
      width="60"
      height="82"
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <linearGradient id="bitShankG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(12)} />
          <stop offset="22%"  stopColor={C.collar(32)} />
          <stop offset="50%"  stopColor={C.collar(50)} />
          <stop offset="78%"  stopColor={C.collar(32)} />
          <stop offset="100%" stopColor={C.collar(12)} />
        </linearGradient>
        <linearGradient id="bitBodyG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(10)} />
          <stop offset="25%"  stopColor={C.collar(28)} />
          <stop offset="50%"  stopColor={C.collar(44)} />
          <stop offset="75%"  stopColor={C.collar(28)} />
          <stop offset="100%" stopColor={C.collar(10)} />
        </linearGradient>
        <linearGradient id="bladeG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.blade(16)} />
          <stop offset="40%"  stopColor={C.blade(40)} />
          <stop offset="60%"  stopColor={C.blade(54)} />
          <stop offset="100%" stopColor={C.blade(18)} />
        </linearGradient>
        <radialGradient id="cutterG" cx="35%" cy="30%">
          <stop offset="0%"   stopColor={C.cutter(78)} />
          <stop offset="50%"  stopColor={C.cutter(45)} />
          <stop offset="100%" stopColor={C.cutter(20)} />
        </radialGradient>
        <radialGradient id="nozzleG" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="hsl(205,70%,70%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(205,70%,25%)" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* ── Pin / API connection thread (top) ── */}
      {[-1, 0, 1].map(i => (
        <rect key={i}
          x="-8" y={-48 + i * 4} width="16" height="2.5"
          fill={i === 0 ? C.collar(38) : C.collar(28)}
          stroke={C.collar(50)} strokeWidth="0.3"
        />
      ))}

      {/* ── Bit shank (upper body) ── */}
      <rect x="-10" y="-36" width="20" height="22" rx="1.5"
        fill="url(#bitShankG)"
        stroke={C.collar(50)} strokeWidth="0.4"
      />
      {/* Raised wrench flats */}
      <rect x="-11" y="-30" width="22" height="4"
        fill={C.collar(36)}
        stroke={C.collar(52)} strokeWidth="0.4"
      />
      <rect x="-11" y="-22" width="22" height="3"
        fill={C.collar(33)}
        stroke={C.collar(48)} strokeWidth="0.4"
      />

      {/* ── Bit body taper to gauge ── */}
      <path d="M-10,-14 L-22,2 L22,2 L10,-14 Z"
        fill="url(#bitBodyG)"
        stroke={C.collar(40)} strokeWidth="0.3"
      />

      {/* ── Gauge face (top of cutting structure) ── */}
      <ellipse cx="0" cy="2" rx="22" ry="3.5"
        fill={C.collar(25)}
        stroke={C.collar(45)} strokeWidth="0.4"
      />

      {/* ── 5 PDC BLADES ── */}
      {blades.map((angle, bi) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <g key={bi} transform={`rotate(${angle},0,2)`}>
            {/* Blade body — swept-back profile */}
            <path
              d="M0,2 L3.5,0 L20,10 Q22,17 18,22 L12,22 Q10,17 8,10 Z"
              fill="url(#bladeG)"
              stroke={C.blade(52)} strokeWidth="0.35"
            />
            {/* Junk slot cutout between blades */}
            <path
              d="M0,2 L-3,2 L-3,22 L-1,22 Z"
              fill={C.collar(14)} opacity="0.6"
            />

            {/* PDC cutters along blade — 5 per blade */}
            {[5, 9, 13, 17, 20].map((r, ci) => {
              const cx2 = Math.sin(rad) * r;
              const cy2 = 2 + Math.cos(rad) * r * 0.55;
              const tiltAngle = -angle + 18; // back-rake tilt
              return (
                <g key={ci} transform={`translate(${cx2},${cy2 - r * 0.35}) rotate(${tiltAngle})`}>
                  {/* Tungsten carbide substrate */}
                  <ellipse cx="0" cy="0" rx="3" ry="1.8"
                    fill={C.collar(24)} stroke={C.collar(40)} strokeWidth="0.3"
                  />
                  {/* Diamond table (PDC face) */}
                  <ellipse cx="0" cy="-0.8" rx="2.6" ry="1.3"
                    fill="url(#cutterG)"
                    stroke={C.cutter(70)} strokeWidth="0.2"
                  />
                  {/* Chamfer highlight */}
                  <ellipse cx="-0.4" cy="-1.1" rx="1" ry="0.5"
                    fill={C.cutter(85)} opacity="0.45"
                  />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* ── 3 MUD NOZZLES ── */}
      {nozzles.map((nAngle, ni) => {
        const rad = (nAngle * Math.PI) / 180;
        const nx = Math.sin(rad) * 10;
        const ny = 2 + Math.cos(rad) * 5.5;
        return (
          <g key={ni}>
            {/* Nozzle housing */}
            <circle cx={nx} cy={ny} r="3.8"
              fill={C.collar(20)}
              stroke={C.collar(44)} strokeWidth="0.5"
            />
            {/* Nozzle bore */}
            <circle cx={nx} cy={ny} r="2.1"
              fill="url(#nozzleG)"
            />
            {/* Inner bore shadow */}
            <circle cx={nx} cy={ny} r="1.1"
              fill={C.collar(10)}
            />
          </g>
        );
      })}

      {/* ── GAUGE PADS (hard-facing on OD) ── */}
      {blades.map((angle, gi) => (
        <g key={gi} transform={`rotate(${angle + 36},0,2)`}>
          <rect x="-4" y="18" width="8" height="6" rx="1"
            fill={C.collar(34)}
            stroke={C.collar(52)} strokeWidth="0.35"
          />
          {/* Tungsten carbide hard-facing dots */}
          {[-1.5, 0, 1.5].map((dx, di) => (
            <circle key={di} cx={dx} cy="21" r="0.7"
              fill={C.collar(55)}
            />
          ))}
        </g>
      ))}

      {/* ── CENTER CONE / PILOT ── */}
      <circle cx="0" cy="2" r="4" fill={C.collar(30)} stroke={C.collar(48)} strokeWidth="0.4" />
      <circle cx="0" cy="2" r="2.2" fill={C.collar(48)} />
      <circle cx="0" cy="2" r="0.9" fill={C.collar(62)} />

      {/* ── Bit nose / cutting face edge ── */}
      <ellipse cx="0" cy="26" rx="18" ry="4"
        fill={C.collar(18)}
        stroke={C.collar(35)} strokeWidth="0.4"
      />
    </svg>
  );
}

/* ─── Near-Bit Stabilizer ─── */
function NearBitStabilizer() {
  return (
    <svg viewBox="-18 0 36 52" width="36" height="52" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="stabG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.stab(12)} />
          <stop offset="30%"  stopColor={C.stab(34)} />
          <stop offset="50%"  stopColor={C.stab(50)} />
          <stop offset="70%"  stopColor={C.stab(34)} />
          <stop offset="100%" stopColor={C.stab(12)} />
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="-8" y="0" width="16" height="52" rx="1"
        fill="url(#stabG)" stroke={C.stab(44)} strokeWidth="0.4"
      />
      {/* 3 integral blade fins */}
      {[-1, 0, 1].map((_, i) => (
        <g key={i} transform={`rotate(${i * 60},0,26)`}>
          <rect x="-16" y="8" width="8" height="36" rx="2"
            fill={C.stab(30)} stroke={C.stab(48)} strokeWidth="0.4"
          />
          {/* Wear knobs */}
          {[14, 20, 26, 32, 38].map((y, wi) => (
            <circle key={wi} cx="-18" cy={y} r="1.5"
              fill={C.stab(50)} stroke={C.stab(62)} strokeWidth="0.3"
            />
          ))}
        </g>
      ))}
      {/* Box connection at bottom */}
      {[2, 4].map(i => (
        <rect key={i} x="-9" y={50 - i * 4} width="18" height="2.5"
          fill={C.stab(32)} stroke={C.stab(46)} strokeWidth="0.3"
        />
      ))}
    </svg>
  );
}

/* ─── MWD / LWD Sub ─── */
function MWDSub() {
  return (
    <svg viewBox="-9 0 18 70" width="18" height="70" style={{ display: "block" }}>
      <defs>
        <linearGradient id="mwdG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.tool(12)} />
          <stop offset="30%"  stopColor={C.tool(28)} />
          <stop offset="50%"  stopColor={C.tool(44)} />
          <stop offset="70%"  stopColor={C.tool(28)} />
          <stop offset="100%" stopColor={C.tool(12)} />
        </linearGradient>
      </defs>
      {/* Main body */}
      <rect x="-7" y="0" width="14" height="70" rx="1"
        fill="url(#mwdG)" stroke={C.tool(40)} strokeWidth="0.5"
      />
      {/* Sensor port windows */}
      {[14, 22, 30, 38, 46, 54].map((y, i) => (
        <rect key={i} x="-7.5" y={y} width="2" height="4" rx="0.5"
          fill={i % 2 === 0 ? "hsl(200,60%,40%)" : "hsl(35,70%,40%)"}
          stroke={C.tool(52)} strokeWidth="0.3"
        />
      ))}
      {/* Centraliser ring */}
      <rect x="-9" y="32" width="18" height="5" rx="1"
        fill={C.tool(22)} stroke={C.tool(48)} strokeWidth="0.4"
      />
      {/* Label text indicator lines */}
      <line x1="-4" y1="20" x2="4" y2="20" stroke={C.tool(50)} strokeWidth="0.4" />
      <line x1="-4" y1="50" x2="4" y2="50" stroke={C.tool(50)} strokeWidth="0.4" />
    </svg>
  );
}

/* ─── Drill Collar segment ─── */
function DrillCollar({ height }: { height: number }) {
  return (
    <svg viewBox={`-9 0 18 ${height}`} width="18" height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id="dcG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(10)} />
          <stop offset="28%"  stopColor={C.collar(30)} />
          <stop offset="50%"  stopColor={C.collar(46)} />
          <stop offset="72%"  stopColor={C.collar(30)} />
          <stop offset="100%" stopColor={C.collar(10)} />
        </linearGradient>
      </defs>
      <rect x="-8" y="0" width="16" height={height} rx="1"
        fill="url(#dcG)" stroke={C.collar(42)} strokeWidth="0.5"
      />
      {/* Spiral grooves */}
      {Array.from({ length: Math.floor(height / 16) }, (_, i) => (
        <line key={i}
          x1="-8" y1={8 + i * 16}
          x2="8" y2={4 + i * 16}
          stroke={C.collar(52)} strokeWidth="0.5" opacity="0.5"
        />
      ))}
    </svg>
  );
}

/* ─── Integral Blade Stabilizer (mid-BHA) ─── */
function IntegralStabilizer() {
  return (
    <svg viewBox="-20 0 40 60" width="40" height="60" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="iStabG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.stab(10)} />
          <stop offset="30%"  stopColor={C.stab(32)} />
          <stop offset="50%"  stopColor={C.stab(48)} />
          <stop offset="70%"  stopColor={C.stab(32)} />
          <stop offset="100%" stopColor={C.stab(10)} />
        </linearGradient>
      </defs>
      {/* Sub shoulders */}
      <rect x="-9" y="0" width="18" height="10" rx="1"
        fill="url(#iStabG)" stroke={C.stab(42)} strokeWidth="0.4"
      />
      <rect x="-9" y="50" width="18" height="10" rx="1"
        fill="url(#iStabG)" stroke={C.stab(42)} strokeWidth="0.4"
      />
      {/* Body between blades */}
      <rect x="-9" y="10" width="18" height="40"
        fill={C.stab(22)} stroke={C.stab(38)} strokeWidth="0.3"
      />
      {/* 3 blades, equally spaced circumferentially */}
      {[0, 120, 240].map((angle, i) => (
        <g key={i} transform={`rotate(${angle},0,30)`}>
          {/* Blade */}
          <rect x="-19" y="12" width="10" height="36" rx="2"
            fill={C.stab(28)} stroke={C.stab(50)} strokeWidth="0.35"
          />
          {/* Wear knobs on OD */}
          {[17, 23, 29, 35, 41].map((y, wi) => (
            <circle key={wi} cx="-21" cy={y} r="1.8"
              fill={C.stab(48)} stroke={C.stab(60)} strokeWidth="0.3"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── HWDP segment ─── */
function HeavyWeightDP({ height }: { height: number }) {
  return (
    <svg viewBox={`-8 0 16 ${height}`} width="16" height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient id="hwdpG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.pipe(14)} />
          <stop offset="28%"  stopColor={C.pipe(36)} />
          <stop offset="50%"  stopColor={C.pipe(52)} />
          <stop offset="72%"  stopColor={C.pipe(36)} />
          <stop offset="100%" stopColor={C.pipe(14)} />
        </linearGradient>
      </defs>
      {/* Thicker wall pipe body */}
      <rect x="-7" y="0" width="14" height={height} rx="1"
        fill="url(#hwdpG)" stroke={C.pipe(44)} strokeWidth="0.5"
      />
      {/* Centre wear pad (characteristic of HWDP) */}
      <rect x="-8.5" y={height / 2 - 10} width="17" height="20" rx="1"
        fill={C.pipe(30)} stroke={C.pipe(48)} strokeWidth="0.4"
      />
      {/* Tool joints top & bottom */}
      <rect x="-9" y="0" width="18" height="7" rx="1"
        fill={C.pipe(26)} stroke={C.pipe(46)} strokeWidth="0.4"
      />
      <rect x="-9" y={height - 7} width="18" height="7" rx="1"
        fill={C.pipe(26)} stroke={C.pipe(46)} strokeWidth="0.4"
      />
    </svg>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function WellboreJourney() {
  const { scrollYProgress } = useScroll();

  const rawHeight = useTransform(scrollYProgress, [0, 1], [0, DRILL_ZONE]);
  const pipeHeightVh = useSpring(rawHeight, { stiffness: 80, damping: 25 });
  const bitTopVh = useTransform(pipeHeightVh, (h) => `${PIPE_TOP_VH + h}vh`);
  const pipeH = useTransform(pipeHeightVh, (h) => `${h}vh`);

  return (
    <div
      className="fixed top-0 z-40 hidden lg:block pointer-events-none"
      style={{ left: "58px", width: "64px", height: "100vh" }}
    >
      {/* ── Surface Derrick ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 0, width: "56px", height: `${PIPE_TOP_VH}vh` }}
      >
        <svg viewBox="0 0 56 130" width="56" height="100%" fill="none" style={{ overflow: "visible" }}>
          {/* Main legs */}
          <line x1="4"  y1="130" x2="24" y2="8"  stroke={C.pipe(36)} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="130" x2="32" y2="8"  stroke={C.pipe(36)} strokeWidth="2.5" strokeLinecap="round" />
          {/* Cross braces */}
          <line x1="9"  y1="108" x2="47" y2="108" stroke={C.pipe(28)} strokeWidth="1.4" />
          <line x1="13" y1="84"  x2="43" y2="84"  stroke={C.pipe(28)} strokeWidth="1.4" />
          <line x1="16" y1="62"  x2="40" y2="62"  stroke={C.pipe(26)} strokeWidth="1.1" />
          <line x1="19" y1="42"  x2="37" y2="42"  stroke={C.pipe(24)} strokeWidth="1" />
          {/* Diagonal bracing */}
          <line x1="9"  y1="108" x2="43" y2="84"  stroke={C.pipe(18)} strokeWidth="0.7" />
          <line x1="47" y1="108" x2="13" y2="84"  stroke={C.pipe(18)} strokeWidth="0.7" />
          <line x1="13" y1="84"  x2="40" y2="62"  stroke={C.pipe(18)} strokeWidth="0.7" />
          <line x1="43" y1="84"  x2="16" y2="62"  stroke={C.pipe(18)} strokeWidth="0.7" />
          <line x1="16" y1="62"  x2="37" y2="42"  stroke={C.pipe(18)} strokeWidth="0.6" />
          <line x1="40" y1="62"  x2="19" y2="42"  stroke={C.pipe(18)} strokeWidth="0.6" />
          {/* Crown block */}
          <rect x="20" y="4"   width="16" height="7" rx="1.5" fill={C.pipe(32)} stroke={C.pipe(48)} strokeWidth="0.5" />
          <line x1="22" y1="7.5" x2="34" y2="7.5" stroke={C.pipe(50)} strokeWidth="0.8" />
          {/* Top drive / swivel body */}
          <rect x="23" y="11"  width="10" height="14" rx="1" fill={C.pipe(26)} stroke={C.pipe(42)} strokeWidth="0.5" />
          <rect x="25" y="13"  width="6"  height="3"  fill={C.pipe(42)} />
          <rect x="25" y="18"  width="6"  height="3"  fill={C.pipe(38)} />
          {/* Traveling block / hook */}
          <rect x="21" y="25"  width="14" height="8" rx="1" fill={C.pipe(22)} stroke={C.pipe(40)} strokeWidth="0.4" />
          <line x1="25" y1="25" x2="25" y2="33" stroke={C.pipe(44)} strokeWidth="0.8" />
          <line x1="31" y1="25" x2="31" y2="33" stroke={C.pipe(44)} strokeWidth="0.8" />
          {/* Dead line anchor / drawworks suggestion */}
          <rect x="0"  y="120" width="56" height="10" rx="1" fill={C.pipe(20)} />
          <rect x="2"  y="117" width="10" height="13" rx="1" fill={C.pipe(18)} stroke={C.pipe(34)} strokeWidth="0.5" />
          <rect x="44" y="117" width="10" height="13" rx="1" fill={C.pipe(18)} stroke={C.pipe(34)} strokeWidth="0.5" />
          {/* Warning light */}
          <circle cx="28" cy="2" r="2.5" fill="hsl(5,78%,55%)" opacity="0.85" />
        </svg>
      </div>

      {/* ── Drill Pipe (scroll-driven height) ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{ top: `${PIPE_TOP_VH}vh`, width: "10px", height: pipeH }}
      >
        {/* Pipe body */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg,
            ${C.pipe(16)} 0%,
            ${C.pipe(38)} 25%,
            ${C.pipe(56)} 50%,
            ${C.pipe(38)} 75%,
            ${C.pipe(16)} 100%)`,
        }} />
        {/* Tool joints */}
        {TOOL_JOINT_POSITIONS.map((pct) => (
          <div key={pct} style={{
            position: "absolute", left: "-3px", right: "-3px", top: `${pct}%`, height: "7px",
            background: `linear-gradient(90deg,
              ${C.pipe(12)} 0%,
              ${C.pipe(34)} 28%,
              ${C.pipe(50)} 50%,
              ${C.pipe(34)} 72%,
              ${C.pipe(12)} 100%)`,
            borderTop: `1px solid ${C.pipe(58)}`,
            borderBottom: `1px solid ${C.pipe(18)}`,
            borderRadius: "1px",
          }} />
        ))}
      </motion.div>

      {/* ── BHA Assembly (scroll-driven position) ── */}
      <motion.div
        className="absolute"
        style={{
          top: bitTopVh,
          left: "50%",
          x: "-50%",
          marginTop: "-2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ① HWDP — Heavy Weight Drill Pipe transition */}
        <HeavyWeightDP height={55} />

        {/* ② Integral Blade Stabilizer (upper) */}
        <IntegralStabilizer />

        {/* ③ Drill Collar string */}
        <DrillCollar height={50} />

        {/* ④ MWD / LWD Sub */}
        <MWDSub />

        {/* ⑤ Drill Collar (lower) */}
        <DrillCollar height={36} />

        {/* ⑥ Near-Bit Stabilizer */}
        <NearBitStabilizer />

        {/* ⑦ Bit Sub (short connection piece) */}
        <div style={{
          width: "14px",
          height: "14px",
          background: `linear-gradient(90deg,
            ${C.collar(14)} 0%,
            ${C.collar(36)} 28%,
            ${C.collar(50)} 50%,
            ${C.collar(36)} 72%,
            ${C.collar(14)} 100%)`,
          borderBottom: `2px solid ${C.collar(52)}`,
          flexShrink: 0,
        }} />

        {/* ⑧ PDC Drill Bit */}
        <PDCBit />
      </motion.div>
    </div>
  );
}
