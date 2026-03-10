/**
 * WellboreJourney — Hyper-realistic scroll-driven BHA.
 * Key design: BHA is ALWAYS visible in the viewport.
 * The drill string GROWS from the derrick toward the bit as you scroll.
 * The bit + BHA sit at a fixed "drilling depth" within the viewport
 * (maps scroll progress → vertical position between 15vh and 82vh).
 * Rich motion FX: mud jets, cuttings, sparks, formation smoke, wellbore walls.
 */
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Constants ── */
const DERRICK_TOP_VH  = 2;   // derrick crown top
const DERRICK_H_VH    = 11;  // height of derrick graphic
const BIT_MIN_VH      = 18;  // top of bit travel range (near derrick)
const BIT_MAX_VH      = 55;  // bottom of bit travel range — stays visible!
const BIT_TRAVEL      = BIT_MAX_VH - BIT_MIN_VH;

/* ── Colour palette (steel / carbide / mud) ── */
const C = {
  pipe:   (l: number) => `hsl(215,12%,${l}%)`,
  collar: (l: number) => `hsl(210,14%,${l}%)`,
  tool:   (l: number) => `hsl(35,45%,${l}%)`,
  blade:  (l: number) => `hsl(215,10%,${l}%)`,
  cutter: (l: number) => `hsl(200,25%,${l}%)`,
  stab:   (l: number) => `hsl(220,15%,${l}%)`,
  mud:    (l: number, a = 1) => `hsla(25,60%,${l}%,${a})`,
  rock:   (l: number, a = 1) => `hsla(25,22%,${l}%,${a})`,
  water:  (l: number, a = 1) => `hsla(205,75%,${l}%,${a})`,
};

/* ── Pre-computed particle arrays ── */
const CUTTINGS = Array.from({ length: 28 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  return {
    id: i,
    xEnd: side * (20 + (i * 7) % 38),
    yEnd: -(25 + (i * 9) % 65),
    size: 1.5 + (i % 4) * 0.7,
    delay: (i * 0.23) % 2.8,
    dur:   1.4 + (i % 5) * 0.35,
    color: ["hsl(25,40%,45%)","hsl(35,55%,50%)","hsl(215,12%,50%)","hsl(20,30%,38%)","hsl(30,48%,42%)"][i % 5],
  };
});

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * 360;
  const rad   = (angle * Math.PI) / 180;
  return {
    id: i,
    ex: Math.cos(rad) * (28 + (i % 3) * 8),
    ey: Math.sin(rad) * (18 + (i % 4) * 6) - 12,
    delay: i * 0.09,
    len: 1.2 + (i % 3) * 0.6,
  };
});

const MUD_JETS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  angle: 60 + i * 120,  // 60°, 180°, 300°
  delay: i * 0.22,
}));

const ANNULUS_DROPS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  side: i % 2 === 0 ? -1 : 1,
  xOff: 13 + (i % 5) * 3,
  delay: (i * 0.55) % 5,
  dur:   2.2 + (i % 4) * 0.6,
  size:  1.2 + (i % 3) * 0.8,
}));

const FORMATION_CRACKS = [12, 28, 45, 62, 80];

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════ */

/* ─── Derrick at top ─── */
function Derrick() {
  return (
    <svg viewBox="0 0 64 140" width="64" height="100%" fill="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="derLegG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.pipe(10)} />
          <stop offset="50%" stopColor={C.pipe(38)} />
          <stop offset="100%" stopColor={C.pipe(10)} />
        </linearGradient>
      </defs>
      {/* Legs */}
      <line x1="5"  y1="136" x2="27" y2="6"  stroke="url(#derLegG)" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="59" y1="136" x2="37" y2="6"  stroke="url(#derLegG)" strokeWidth="2.8" strokeLinecap="round" />
      {/* Cross braces */}
      {([[9,112,55,112],[12,88,52,88],[15,66,49,66],[18,46,46,46],[21,28,43,28]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={C.pipe(26)} strokeWidth={1.5 - i * 0.12} opacity="0.85" />
      ))}
      {/* X-bracing */}
      {([[9,112,52,88],[55,112,12,88],[12,88,49,66],[52,88,15,66],[15,66,46,46],[49,66,18,46],[18,46,43,28],[46,46,21,28]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={C.pipe(15)} strokeWidth="0.6" opacity="0.6" />
      ))}
      {/* Crown block */}
      <rect x="22" y="2" width="20" height="8" rx="2" fill={C.pipe(28)} stroke={C.pipe(46)} strokeWidth="0.6" />
      <line x1="24" y1="6" x2="40" y2="6" stroke={C.pipe(50)} strokeWidth="0.8" />
      {/* Top-drive motor housing */}
      <rect x="24" y="10" width="16" height="18" rx="1.5" fill={C.pipe(22)} stroke={C.pipe(40)} strokeWidth="0.5" />
      <rect x="26" y="12" width="12" height="4"  rx="0.5" fill={C.pipe(38)} />
      <rect x="26" y="18" width="12" height="4"  rx="0.5" fill={C.pipe(34)} />
      <rect x="26" y="24" width="12" height="2"  rx="0.5" fill={C.pipe(30)} />
      {/* Travelling block & hook */}
      <rect x="22" y="28" width="20" height="10" rx="1.5" fill={C.pipe(18)} stroke={C.pipe(36)} strokeWidth="0.5" />
      <line x1="28" y1="28" x2="28" y2="38" stroke={C.pipe(42)} strokeWidth="0.8" />
      <line x1="36" y1="28" x2="36" y2="38" stroke={C.pipe(42)} strokeWidth="0.8" />
      {/* Drill line to crown */}
      <line x1="26" y1="2" x2="26" y2="28" stroke={C.pipe(40)} strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="38" y1="2" x2="38" y2="28" stroke={C.pipe(40)} strokeWidth="0.5" strokeDasharray="2,2" />
      {/* Rig floor + substructure */}
      <rect x="0"  y="128" width="64" height="8"  rx="1" fill={C.pipe(16)} />
      <rect x="2"  y="120" width="12" height="16" rx="1" fill={C.pipe(14)} stroke={C.pipe(28)} strokeWidth="0.4" />
      <rect x="50" y="120" width="12" height="16" rx="1" fill={C.pipe(14)} stroke={C.pipe(28)} strokeWidth="0.4" />
      {/* Doghouse */}
      <rect x="40" y="116" width="14" height="20" rx="1" fill={C.pipe(13)} stroke={C.pipe(26)} strokeWidth="0.4" />
      <rect x="42" y="118" width="5"  height="6"  rx="0.5" fill={C.pipe(22)} />
      {/* Warning beacon — blinking */}
      <motion.circle cx="32" cy="0" r="3" fill="hsl(5,78%,55%)"
        animate={{ opacity: [1, 0.1, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <motion.circle cx="32" cy="0" r="7" fill="hsl(5,78%,55%)" opacity="0.25"
        animate={{ opacity: [0.25, 0.05, 0.25], scale: [1, 1.6, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
    </svg>
  );
}

/* ─── PDC Drill Bit (side profile, very detailed) ─── */
function PDCBit({ vibrating }: { vibrating: boolean }) {
  const blades = [0, 72, 144, 216, 288];
  const nozzleAngles = [60, 180, 300];

  return (
    <svg viewBox="-34 -46 68 88" width="68" height="88" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="bShank" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(8)} />
          <stop offset="22%"  stopColor={C.collar(28)} />
          <stop offset="50%"  stopColor={C.collar(46)} />
          <stop offset="78%"  stopColor={C.collar(28)} />
          <stop offset="100%" stopColor={C.collar(8)} />
        </linearGradient>
        <linearGradient id="bBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(6)} />
          <stop offset="22%"  stopColor={C.collar(24)} />
          <stop offset="50%"  stopColor={C.collar(40)} />
          <stop offset="78%"  stopColor={C.collar(24)} />
          <stop offset="100%" stopColor={C.collar(6)} />
        </linearGradient>
        <radialGradient id="cutterFace" cx="35%" cy="30%">
          <stop offset="0%"   stopColor={C.cutter(82)} />
          <stop offset="50%"  stopColor={C.cutter(50)} />
          <stop offset="100%" stopColor={C.cutter(18)} />
        </radialGradient>
        <radialGradient id="nozzleGrad" cx="50%" cy="50%">
          <stop offset="0%"   stopColor={C.water(70, 0.9)} />
          <stop offset="100%" stopColor={C.water(25, 0.3)} />
        </radialGradient>
        <radialGradient id="heatGlow" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="hsl(35,100%,72%)" stopOpacity="0.7" />
          <stop offset="40%"  stopColor="hsl(25,90%,50%)"  stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glowF">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── PIN THREADS (3 rings) ── */}
      {[-3, -1.5, 0].map((dy, i) => (
        <rect key={i} x="-8" y={-46 + dy * 2} width="16" height="2.5"
          fill={i === 2 ? C.collar(34) : C.collar(24)}
          stroke={C.collar(46)} strokeWidth="0.3" rx="0.4" />
      ))}

      {/* ── SHANK ── */}
      <rect x="-10" y="-36" width="20" height="20" rx="2"
        fill="url(#bShank)" stroke={C.collar(46)} strokeWidth="0.5" />
      {/* Wrench flats (two pairs) */}
      <rect x="-11.5" y="-32" width="23" height="5" rx="0.8"
        fill={C.collar(32)} stroke={C.collar(50)} strokeWidth="0.35" />
      <rect x="-11.5" y="-22" width="23" height="4" rx="0.8"
        fill={C.collar(28)} stroke={C.collar(46)} strokeWidth="0.3" />

      {/* ── BODY TAPER ── */}
      <path d="M-10,-16 L-21,6 L21,6 L10,-16 Z"
        fill="url(#bBody)" stroke={C.collar(36)} strokeWidth="0.4" />

      {/* ── GAUGE FACE (top of blades) ── */}
      <ellipse cx="0" cy="6" rx="21" ry="3.5" fill={C.collar(20)} stroke={C.collar(38)} strokeWidth="0.4" />

      {/* ── 5 PDC BLADES with cutters ── */}
      {blades.map((angle, bi) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <g key={bi} transform={`rotate(${angle}, 0, 6)`}>
            {/* Blade body */}
            <path d="M0,6 L3.5,3.5 L18,14 Q20,22 15,27 L9,27 Q7.5,21 5,14 Z"
              fill={C.blade(26)} stroke={C.blade(48)} strokeWidth="0.4" />
            {/* 5 cutters on each blade */}
            {[4, 8, 12, 16, 19].map((r, ci) => {
              const cx2 = Math.sin(rad) * r * 0.28;
              const cy2 = 6 + Math.cos(rad) * r * 0.18;
              return (
                <g key={ci} transform={`translate(${cx2}, ${cy2 - r * 0.24}) rotate(${-angle + 20})`}>
                  {/* Steel substrate */}
                  <ellipse cx="0" cy="0" rx="3.2" ry="1.7"
                    fill={C.collar(20)} stroke={C.collar(36)} strokeWidth="0.3" />
                  {/* PDC diamond table */}
                  <ellipse cx="0" cy="-0.8" rx="2.7" ry="1.25"
                    fill="url(#cutterFace)" stroke={C.cutter(62)} strokeWidth="0.25" />
                  {/* Diamond shimmer */}
                  <motion.ellipse cx="-0.4" cy="-1.1" rx="1.0" ry="0.5" fill={C.cutter(90)}
                    animate={{ opacity: [0.1, 0.8, 0.1] }}
                    transition={{ duration: 0.8 + bi * 0.12 + ci * 0.08, repeat: Infinity }} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* ── 3 MUD NOZZLES ── */}
      {nozzleAngles.map((nAngle, ni) => {
        const rad = (nAngle * Math.PI) / 180;
        const nx  = Math.sin(rad) * 9;
        const ny  = 3 + Math.cos(rad) * 5;
        return (
          <g key={ni}>
            {/* Nozzle housing */}
            <circle cx={nx} cy={ny} r="3.8" fill={C.collar(16)} stroke={C.collar(40)} strokeWidth="0.5" />
            <circle cx={nx} cy={ny} r="2.2" fill="url(#nozzleGrad)" />
            {/* Mud jet pulse */}
            <motion.ellipse cx={nx} cy={ny + 9} rx="3" ry="6"
              fill={C.water(62, 0.7)}
              filter="url(#glowF)"
              animate={{ opacity: [0, 0.9, 0.4, 0], scaleY: [0.2, 1.6, 1.1, 0.2], scaleX: [1.5, 0.5, 0.8, 1.5] }}
              transition={{ duration: 0.55, delay: ni * 0.18, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Secondary spray droplets */}
            {[-2, 0, 2].map((dx, di) => (
              <motion.circle key={di} cx={nx + dx} cy={ny + 12} r="0.8" fill={C.water(70, 0.6)}
                animate={{ y: [0, 8, 14], opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.4, delay: ni * 0.18 + di * 0.08, repeat: Infinity }}
              />
            ))}
          </g>
        );
      })}

      {/* ── GAUGE PADS between blades ── */}
      {blades.map((angle, gi) => (
        <g key={gi} transform={`rotate(${angle + 36}, 0, 6)`}>
          <rect x="-3.5" y="22" width="7" height="6" rx="1"
            fill={C.collar(30)} stroke={C.collar(48)} strokeWidth="0.3" />
          {[-1.2, 0, 1.2].map((dx, di) => (
            <circle key={di} cx={dx} cy="25" r="0.7" fill={C.collar(52)} />
          ))}
        </g>
      ))}

      {/* ── CENTRE PIN ── */}
      <circle cx="0" cy="6" r="3.8" fill={C.collar(26)} stroke={C.collar(44)} strokeWidth="0.5" />
      <circle cx="0" cy="6" r="2.1" fill={C.collar(42)} />
      <circle cx="0" cy="6" r="0.9" fill={C.collar(60)} />

      {/* ── BIT NOSE / FACE ── */}
      <ellipse cx="0" cy="27" rx="18" ry="4" fill={C.collar(14)} stroke={C.collar(30)} strokeWidth="0.4" />

      {/* ── CUTTING HEAT GLOW ── */}
      <motion.ellipse cx="0" cy="25" rx="24" ry="9" fill="url(#heatGlow)"
        animate={{ opacity: [0.3, 0.8, 0.4, 0.7, 0.3], ry: [7, 10, 8, 11, 7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── WHITE-HOT CENTRE FLASH ── */}
      <motion.ellipse cx="0" cy="27" rx="8" ry="3.5"
        fill="hsl(45,100%,90%)" opacity="0.5"
        animate={{ opacity: [0.2, 0.6, 0.2, 0.5, 0.2], rx: [4, 8, 5, 7, 4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── SPARK STREAKS FROM BIT FACE ── */}
      {SPARKS.map((s) => (
        <motion.line key={s.id}
          x1="0" y1="25"
          x2={s.ex * 0.15} y2={25 + s.ey * 0.15}
          stroke="hsl(48,100%,88%)" strokeWidth={s.len} strokeLinecap="round"
          animate={{
            x2: [0, s.ex * 0.5, s.ex * 0.9, s.ex],
            y2: [25, 25 + s.ey * 0.5, 25 + s.ey * 0.9, 25 + s.ey],
            opacity: [1, 0.8, 0.4, 0],
          }}
          transition={{ duration: 0.35, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

/* ─── Near-Bit Stabilizer ─── */
function NearBitStab() {
  return (
    <svg viewBox="-20 0 40 48" width="40" height="48" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="nbs" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.stab(8)} />
          <stop offset="28%"  stopColor={C.stab(30)} />
          <stop offset="50%"  stopColor={C.stab(46)} />
          <stop offset="72%"  stopColor={C.stab(30)} />
          <stop offset="100%" stopColor={C.stab(8)} />
        </linearGradient>
      </defs>
      {/* Mandrel */}
      <rect x="-7" y="0" width="14" height="48" rx="1.2" fill="url(#nbs)" stroke={C.stab(40)} strokeWidth="0.45" />
      {/* 3 Integral blades */}
      {[-1, 0, 1].map((side, i) => {
        const bx = i === 0 ? -18 : i === 1 ? 8 : -18;
        const tx = i === 2 ? "translate(26,0)" : "";
        return (
          <g key={i} transform={tx}>
            <rect x={bx} y="7" width="10" height="34" rx="2.5"
              fill={C.stab(25)} stroke={C.stab(46)} strokeWidth="0.4" />
            {/* Hardfacing carbide buttons */}
            {[12, 18, 24, 30, 36].map((y, wi) => (
              <circle key={wi} cx={i === 0 ? -19 : 19} cy={y} r="1.5"
                fill={C.stab(48)} stroke={C.stab(60)} strokeWidth="0.3" />
            ))}
          </g>
        );
      })}
      {/* API-box / pin connections */}
      <rect x="-8" y="0" width="16" height="4.5" rx="0.6" fill={C.stab(28)} stroke={C.stab(44)} strokeWidth="0.35" />
      <rect x="-8" y="43.5" width="16" height="4.5" rx="0.6" fill={C.stab(28)} stroke={C.stab(44)} strokeWidth="0.35" />
    </svg>
  );
}

/* ─── MWD / LWD Sub ─── */
function MWDSub() {
  return (
    <svg viewBox="-10 0 20 60" width="20" height="60" style={{ display: "block" }}>
      <defs>
        <linearGradient id="mwdBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.tool(8)} />
          <stop offset="28%"  stopColor={C.tool(24)} />
          <stop offset="50%"  stopColor={C.tool(40)} />
          <stop offset="72%"  stopColor={C.tool(24)} />
          <stop offset="100%" stopColor={C.tool(8)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height="60" rx="1.2" fill="url(#mwdBody)"
        stroke={C.tool(36)} strokeWidth="0.5" />
      {/* Centraliser ring */}
      <rect x="-9.5" y="28" width="19" height="5" rx="1.2"
        fill={C.tool(18)} stroke={C.tool(42)} strokeWidth="0.45" />
      {/* Sensor port windows (blink independently) */}
      {[8, 15, 22, 36, 44, 51].map((y, i) => (
        <motion.rect key={i} x={i % 2 === 0 ? "-9" : "6.5"} y={y} width="2.8" height="4" rx="0.6"
          fill={["hsl(200,65%,42%)", "hsl(120,55%,38%)", "hsl(55,80%,50%)"][i % 3]}
          stroke={C.tool(50)} strokeWidth="0.3"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.5 + i * 0.28, delay: i * 0.38, repeat: Infinity }}
        />
      ))}
      {/* Connections */}
      <rect x="-8" y="0"  width="16" height="3.5" rx="0.5" fill={C.tool(20)} stroke={C.tool(40)} strokeWidth="0.3" />
      <rect x="-8" y="56.5" width="16" height="3.5" rx="0.5" fill={C.tool(20)} stroke={C.tool(40)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── Drill Collar section ─── */
function DrillCollar({ h }: { h: number }) {
  const id = `dc${h}`;
  return (
    <svg viewBox={`-9 0 18 ${h}`} width="18" height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.collar(7)} />
          <stop offset="25%"  stopColor={C.collar(27)} />
          <stop offset="50%"  stopColor={C.collar(43)} />
          <stop offset="75%"  stopColor={C.collar(27)} />
          <stop offset="100%" stopColor={C.collar(7)} />
        </linearGradient>
      </defs>
      <rect x="-8" y="0" width="16" height={h} rx="1.2"
        fill={`url(#${id})`} stroke={C.collar(38)} strokeWidth="0.45" />
      {/* Spiral fluting / scratch marks */}
      {Array.from({ length: Math.floor(h / 10) }, (_, i) => (
        <line key={i}
          x1="-8"  y1={5 + i * 10}
          x2="8"   y2={2 + i * 10}
          stroke={C.collar(50)} strokeWidth="0.5" opacity="0.38" />
      ))}
      {/* Tool joints */}
      <rect x="-9" y="0"     width="18" height="4.5" rx="0.5" fill={C.collar(22)} stroke={C.collar(40)} strokeWidth="0.3" />
      <rect x="-9" y={h-4.5} width="18" height="4.5" rx="0.5" fill={C.collar(22)} stroke={C.collar(40)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── Integral-Blade Stabilizer (upper) ─── */
function UpperStab() {
  return (
    <svg viewBox="-22 0 44 52" width="44" height="52" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="ubsG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.stab(7)} />
          <stop offset="28%"  stopColor={C.stab(28)} />
          <stop offset="50%"  stopColor={C.stab(44)} />
          <stop offset="72%"  stopColor={C.stab(28)} />
          <stop offset="100%" stopColor={C.stab(7)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height="52" rx="1.2" fill="url(#ubsG)" stroke={C.stab(40)} strokeWidth="0.45" />
      {/* Two opposed blades */}
      {[[-20, ""], [10, ""]].map(([bx, tr], i) => (
        <g key={i}>
          <rect x={Number(bx)} y="10" width="10" height="32" rx="3"
            fill={C.stab(24)} stroke={C.stab(46)} strokeWidth="0.4" />
          {[16, 22, 28, 34].map((y, wi) => (
            <circle key={wi} cx={Number(bx) + (i === 0 ? -1 : 11)} cy={y} r="1.6"
              fill={C.stab(46)} stroke={C.stab(58)} strokeWidth="0.28" />
          ))}
        </g>
      ))}
      <rect x="-8" y="0"  width="16" height="4" rx="0.5" fill={C.stab(26)} stroke={C.stab(42)} strokeWidth="0.3" />
      <rect x="-8" y="48" width="16" height="4" rx="0.5" fill={C.stab(26)} stroke={C.stab(42)} strokeWidth="0.3" />
    </svg>
  );
}

/* ─── HWDP (Heavy Weight Drill Pipe) ─── */
function HWDP({ h }: { h: number }) {
  const id = `hw${h}`;
  return (
    <svg viewBox={`-10 0 20 ${h}`} width="20" height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C.pipe(11)} />
          <stop offset="28%"  stopColor={C.pipe(33)} />
          <stop offset="50%"  stopColor={C.pipe(49)} />
          <stop offset="72%"  stopColor={C.pipe(33)} />
          <stop offset="100%" stopColor={C.pipe(11)} />
        </linearGradient>
      </defs>
      <rect x="-7" y="0" width="14" height={h} rx="1" fill={`url(#${id})`}
        stroke={C.pipe(40)} strokeWidth="0.45" />
      {/* Centre upset / wear pad */}
      <rect x="-8.5" y={h/2 - 8} width="17" height="16" rx="1.2"
        fill={C.pipe(27)} stroke={C.pipe(44)} strokeWidth="0.38" />
      {/* Tool joints */}
      <rect x="-9.5" y="0"   width="19" height="6" rx="1.2" fill={C.pipe(22)} stroke={C.pipe(42)} strokeWidth="0.4" />
      <rect x="-9.5" y={h-6} width="19" height="6" rx="1.2" fill={C.pipe(22)} stroke={C.pipe(42)} strokeWidth="0.4" />
    </svg>
  );
}

/* ─── Drill Pipe String (grows with scroll) ─── */
function DrillPipe({ heightVh, mudYMotion }: { heightVh: any; mudYMotion: any }) {
  const JOINTS = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        x: "-50%",
        top: `${DERRICK_TOP_VH + DERRICK_H_VH}vh`,
        width: "11px",
        height: heightVh,
        overflow: "hidden",
      }}
    >
      {/* Pipe body — steel gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(90deg,
          ${C.pipe(13)} 0%, ${C.pipe(35)} 22%,
          ${C.pipe(52)} 50%,
          ${C.pipe(35)} 78%, ${C.pipe(13)} 100%)`,
      }} />
      {/* Internal mud-flow streaks */}
      <motion.div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(180deg,
          transparent 0px, transparent 5px,
          ${C.mud(40, 0.18)} 5px, ${C.mud(40, 0.18)} 7px)`,
        backgroundSize: "11px 14px",
        y: mudYMotion,
      }} />
      {/* Tool joints every 5% */}
      {JOINTS.map((pct) => (
        <div key={pct} style={{
          position: "absolute",
          left: "-3px", right: "-3px",
          top: `${pct}%`,
          height: "8px",
          background: `linear-gradient(90deg,
            ${C.pipe(9)} 0%, ${C.pipe(30)} 26%,
            ${C.pipe(46)} 50%,
            ${C.pipe(30)} 74%, ${C.pipe(9)} 100%)`,
          borderTop:    `1px solid ${C.pipe(55)}`,
          borderBottom: `1px solid ${C.pipe(14)}`,
          borderRadius: "1px",
        }} />
      ))}
    </motion.div>
  );
}

/* ─── Annulus mud returns (rising up the wellbore) ─── */
function AnnulusReturns({ bitTopVh }: { bitTopVh: any }) {
  return (
    <>
      {ANNULUS_DROPS.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: "absolute",
            left: `calc(50% + ${d.side * d.xOff}px)`,
            width: `${d.size}px`,
            height: `${d.size * 2.8}px`,
            borderRadius: "50%",
            background: C.mud(40, 0.55),
            boxShadow: `0 0 3px ${C.mud(50, 0.3)}`,
          }}
          animate={{
            top: ["88vh", "60vh", "30vh", "8vh"],
            opacity: [0, 0.75, 0.5, 0],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

/* ─── Rock formation being drilled / wellbore walls ─── */
function FormationAndWalls({ bitTopVh, scrollP }: { bitTopVh: any; scrollP: any }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        x: "-50%",
        top: bitTopVh,
        width: "140px",
        pointerEvents: "none",
      }}
    >
      {/* Left wellbore wall */}
      <div style={{
        position: "absolute",
        left: "-70px",
        top: 0,
        width: "28px",
        height: "220px",
        background: `linear-gradient(90deg,
          ${C.rock(8, 0)} 0%,
          ${C.rock(16, 0.6)} 40%,
          ${C.rock(22, 0.85)} 70%,
          ${C.rock(28, 0.95)} 100%)`,
        borderRight: `2px solid ${C.rock(35, 0.7)}`,
      }} />
      {/* Right wellbore wall */}
      <div style={{
        position: "absolute",
        right: "-70px",
        top: 0,
        width: "28px",
        height: "220px",
        background: `linear-gradient(270deg,
          ${C.rock(8, 0)} 0%,
          ${C.rock(16, 0.6)} 40%,
          ${C.rock(22, 0.85)} 70%,
          ${C.rock(28, 0.95)} 100%)`,
        borderLeft: `2px solid ${C.rock(35, 0.7)}`,
      }} />

      {/* Formation rock face being cut */}
      <div style={{
        position: "absolute",
        bottom: "-8px",
        left: "-42px",
        right: "-42px",
        height: "20px",
        background: `linear-gradient(180deg, ${C.rock(20, 0.85)} 0%, ${C.rock(14, 0.95)} 100%)`,
        borderTop: `2px solid ${C.rock(38, 0.9)}`,
        overflow: "hidden",
      }}>
        {/* Crack pulses across rock face */}
        {FORMATION_CRACKS.map((x, i) => (
          <motion.div key={i} style={{
            position: "absolute", left: `${x}%`, top: 0,
            width: "1.5px", height: "100%",
            background: `linear-gradient(180deg, ${C.rock(55, 0.8)} 0%, transparent 100%)`,
            transformOrigin: "top",
          }}
            animate={{ scaleY: [0, 1, 0.6, 0], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 0.6, delay: i * 0.11, repeat: Infinity, repeatDelay: 0.8 }}
          />
        ))}
        {/* Rock dust cloud */}
        <motion.div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${C.rock(45, 0.55)} 0%, transparent 70%)`,
        }}
          animate={{ opacity: [0, 0.9, 0.3, 0.8, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      </div>

      {/* Formation dust cloud rising above bit */}
      <motion.div style={{
        position: "absolute",
        bottom: "10px",
        left: "-30px",
        right: "-30px",
        height: "35px",
        background: `radial-gradient(ellipse at 50% 100%, ${C.rock(38, 0.35)} 0%, transparent 70%)`,
        filter: "blur(3px)",
      }}
        animate={{ opacity: [0.2, 0.7, 0.3, 0.6, 0.2], scaleX: [0.8, 1.15, 0.9, 1.1, 0.8] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ─── Cuttings cloud from bit face ─── */
function CuttingsCloud() {
  return (
    <div style={{ position: "relative", width: 0, height: 0 }}>
      {CUTTINGS.map((c) => (
        <motion.div key={c.id}
          style={{
            position: "absolute",
            width: `${c.size}px`,
            height: `${c.size * 0.75}px`,
            borderRadius: "30%",
            background: c.color,
            left: "0px",
            top: "-8px",
            boxShadow: `0 0 2px ${c.color}`,
          }}
          animate={{
            x: [0, c.xEnd * 0.35, c.xEnd * 0.8, c.xEnd],
            y: [0, c.yEnd * 0.3, c.yEnd * 0.7, c.yEnd],
            opacity: [0.9, 0.7, 0.4, 0],
            scale: [1, 0.8, 0.5, 0.2],
            rotate: [0, 120, 260, 400],
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
  );
}

/* ─── Ambient glow below bit ─── */
function BitGlow() {
  return (
    <motion.div style={{
      position: "absolute",
      bottom: "-12px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "70px",
      height: "36px",
      borderRadius: "50%",
      background: "radial-gradient(ellipse at 50% 100%, hsla(35,100%,55%,0.6) 0%, hsla(28,90%,45%,0.22) 45%, transparent 72%)",
      filter: "blur(5px)",
    }}
      animate={{
        opacity: [0.5, 0.85, 0.55, 0.8, 0.5],
        scaleX: [0.9, 1.15, 0.92, 1.1, 0.9],
        scaleY: [1, 1.08, 0.95, 1.05, 1],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */
export default function WellboreJourney() {
  const { scrollYProgress } = useScroll();

  /* ── Bit position: always visible within BIT_MIN_VH → BIT_MAX_VH ── */
  const rawBitVh  = useTransform(scrollYProgress, [0, 1], [BIT_MIN_VH, BIT_MAX_VH]);
  const bitVhSpring = useSpring(rawBitVh, { stiffness: 30, damping: 35, mass: 1.5 });

  /* The pipe HEIGHT = distance from derrick exit to bit top */
  const pipeHeightVh = useTransform(
    bitVhSpring,
    (b) => `${Math.max(0, b - (DERRICK_TOP_VH + DERRICK_H_VH))}vh`
  );

  /* Bit top position as a css string */
  const bitTopVh = useTransform(bitVhSpring, (b) => `${b}vh`);

  /* Mud flow scrolling down inside pipe */
  const mudY = useTransform(scrollYProgress, [0, 1], [0, 600]);

  return (
    <div
      className="fixed top-0 z-40 hidden lg:block pointer-events-none"
      style={{ left: "54px", width: "80px", height: "100vh", overflow: "visible" }}
    >
      {/* ── DERRICK (static at top) ── */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: `${DERRICK_TOP_VH}vh`,
        width: "64px",
        height: `${DERRICK_H_VH}vh`,
      }}>
        <Derrick />
      </div>

      {/* ── DRILL PIPE (grows from derrick to BHA) ── */}
      <DrillPipe heightVh={pipeHeightVh} mudYMotion={mudY} />

      {/* Removed brown wellbore walls — cleaner look */}

      {/* ── ANNULUS MUD RETURNS (rising beside pipe) ── */}
      <AnnulusReturns bitTopVh={bitTopVh} />

      {/* ── BHA ASSEMBLY (always in viewport) ── */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          x: "-50%",
          top: bitTopVh,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Smooth rotation — like an actual drill string rotating */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* ① HWDP */}
          <HWDP h={46} />

          {/* ② Upper Integral Stabilizer */}
          <UpperStab />

          {/* ③ Upper Drill Collar */}
          <DrillCollar h={42} />

          {/* ④ MWD / LWD Sub */}
          <MWDSub />

          {/* ⑤ Lower Drill Collar */}
          <DrillCollar h={32} />

          {/* ⑥ Near-Bit Stabilizer */}
          <NearBitStab />

          {/* ⑦ Bit Sub connector */}
          <div style={{
            width: "15px",
            height: "13px",
            background: `linear-gradient(90deg,
              ${C.collar(11)} 0%, ${C.collar(32)} 28%,
              ${C.collar(47)} 50%,
              ${C.collar(32)} 72%, ${C.collar(11)} 100%)`,
            borderBottom: `2.5px solid ${C.collar(52)}`,
            flexShrink: 0,
          }} />

          {/* ⑧ PDC Drill Bit */}
          <PDCBit vibrating />

          {/* Rock cuttings ejected from bit face */}
          <CuttingsCloud />

          {/* Ambient heat glow at bit face */}
          <BitGlow />
        </motion.div>
      </motion.div>
    </div>
  );
}
