/**
 * WellboreJourney — Cinematic scroll-driven petroleum drilling animation.
 * Fixed to left side of viewport. Scroll controls pipe length & bit rotation.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PIPE_TOP_VH = 5;
const PIPE_BOT_VH = 93;
const DRILL_ZONE = PIPE_BOT_VH - PIPE_TOP_VH; // 88vh

const TOOL_JOINT_POSITIONS = Array.from({ length: 18 }, (_, i) => (i + 1) * 5);

const CUTTER_COLORS = [
  "hsl(214,100%,50%)",
  "hsl(35,92%,55%)",
  "hsl(175,60%,48%)",
  "hsl(205,80%,60%)",
];

const NOZZLE_ANGLES = [0, 90, 180, 270];
const CUTTING_ANGLES = [30, 75, 120, 165, 210, 255, 300, 345];

export default function WellboreJourney() {
  const { scrollYProgress } = useScroll();

  // Pipe height in vh (0 → DRILL_ZONE)
  const rawHeight = useTransform(scrollYProgress, [0, 1], [0, DRILL_ZONE]);
  const pipeHeightVh = useSpring(rawHeight, { stiffness: 80, damping: 25 });

  // Bit top position in vh
  const bitTopVh = useTransform(pipeHeightVh, (h) => `${PIPE_TOP_VH + h}vh`);

  // Rotation: 0 → 3600 degrees
  const rawRot = useTransform(scrollYProgress, [0, 1], [0, 3600]);
  const rotation = useSpring(rawRot, { stiffness: 60, damping: 20 });

  // Mud flow — scrolls the inner stripe texture
  const mudY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Pipe height as vh string
  const pipeH = useTransform(pipeHeightVh, (h) => `${h}vh`);

  return (
    <div
      className="fixed left-0 top-0 z-40 hidden lg:block pointer-events-none"
      style={{ width: "56px", height: "100vh" }}
    >
      {/* ── Surface Derrick ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: 0, width: "52px", height: `${PIPE_TOP_VH}vh` }}
      >
        <svg
          viewBox="0 0 52 120"
          width="52"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Derrick legs */}
          <line x1="4" y1="120" x2="22" y2="10" stroke="hsl(215,12%,38%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="120" x2="30" y2="10" stroke="hsl(215,12%,38%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cross braces */}
          <line x1="9" y1="100" x2="43" y2="100" stroke="hsl(215,12%,30%)" strokeWidth="1.5" />
          <line x1="12" y1="78" x2="40" y2="78" stroke="hsl(215,12%,30%)" strokeWidth="1.5" />
          <line x1="15" y1="57" x2="37" y2="57" stroke="hsl(215,12%,30%)" strokeWidth="1.2" />
          <line x1="18" y1="38" x2="34" y2="38" stroke="hsl(215,12%,28%)" strokeWidth="1" />
          {/* X braces */}
          <line x1="9" y1="100" x2="40" y2="78" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="43" y1="100" x2="12" y2="78" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="12" y1="78" x2="37" y2="57" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="40" y1="78" x2="15" y2="57" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          {/* Crown block */}
          <rect x="20" y="6" width="12" height="6" rx="1" fill="hsl(215,12%,35%)" />
          <line x1="20" y1="9" x2="32" y2="9" stroke="hsl(215,12%,50%)" strokeWidth="0.8" />
          {/* Kelly/swivel */}
          <rect x="23" y="12" width="6" height="10" rx="1" fill="hsl(215,15%,28%)" />
          <rect x="24" y="14" width="4" height="2" fill="hsl(215,12%,45%)" />
          {/* Motor housing */}
          <motion.rect
            x="22" y="105" width="8" height="12" rx="2"
            fill="hsl(215,12%,28%)"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Warning light */}
          <motion.circle
            cx="26" cy="4" r="2.5" fill="hsl(5,78%,55%)"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Base platform */}
          <rect x="0" y="114" width="52" height="6" rx="1" fill="hsl(215,12%,22%)" />
        </svg>
      </div>

      {/* ── Drill Pipe ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          top: `${PIPE_TOP_VH}vh`,
          width: "10px",
          height: pipeH,
        }}
      >
        {/* Cylindrical outer shading */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, hsl(215,12%,18%) 0%, hsl(215,12%,40%) 28%, hsl(215,12%,58%) 50%, hsl(215,12%,40%) 72%, hsl(215,12%,18%) 100%)",
          }}
        />
        {/* Inner mud circulation */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0px, transparent 8px, rgba(180,120,30,0.18) 8px, rgba(180,120,30,0.18) 10px)",
            backgroundSize: "10px 20px",
            y: mudY,
          }}
        />
        {/* Tool joints */}
        {TOOL_JOINT_POSITIONS.map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              left: "-2px",
              right: "-2px",
              top: `${pct}%`,
              height: "6px",
              background:
                "linear-gradient(90deg, hsl(215,12%,15%) 0%, hsl(215,12%,38%) 30%, hsl(215,12%,52%) 50%, hsl(215,12%,38%) 70%, hsl(215,12%,15%) 100%)",
              borderTop: "1px solid hsl(215,12%,60%)",
              borderBottom: "1px solid hsl(215,12%,20%)",
            }}
          />
        ))}
      </motion.div>

      {/* ── Drill Bit ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: bitTopVh, x: "-50%", marginTop: "-2px" }}
      >
        <motion.div style={{ rotate: rotation, width: "56px", height: "56px", position: "relative" }}>
          <svg viewBox="0 0 56 56" width="56" height="56" style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id="bitBody" cx="40%" cy="30%">
                <stop offset="0%" stopColor="hsl(215,12%,60%)" />
                <stop offset="100%" stopColor="hsl(215,12%,20%)" />
              </radialGradient>
              <radialGradient id="cone0" cx="35%" cy="25%">
                <stop offset="0%" stopColor="hsl(215,12%,55%)" />
                <stop offset="100%" stopColor="hsl(215,12%,18%)" />
              </radialGradient>
              <radialGradient id="cone1" cx="35%" cy="25%">
                <stop offset="0%" stopColor="hsl(215,12%,55%)" />
                <stop offset="100%" stopColor="hsl(215,12%,18%)" />
              </radialGradient>
              <radialGradient id="cone2" cx="35%" cy="25%">
                <stop offset="0%" stopColor="hsl(215,12%,55%)" />
                <stop offset="100%" stopColor="hsl(215,12%,18%)" />
              </radialGradient>
            </defs>
            {/* Central hub */}
            <circle cx="28" cy="28" r="12" fill="url(#bitBody)" stroke="hsl(215,12%,55%)" strokeWidth="1" />
            {/* Three cone lobes */}
            {[0, 120, 240].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 28 28)`}>
                <ellipse cx="28" cy="14" rx="6" ry="8" fill={`url(#cone${i})`} stroke="hsl(215,12%,50%)" strokeWidth="0.8" />
                {[-3, 0, 3].map((tx) => (
                  <ellipse key={tx} cx={28 + tx} cy="10" rx="1.5" ry="2.5" fill="hsl(215,12%,65%)" />
                ))}
              </g>
            ))}
            {/* Cutters */}
            {CUTTER_COLORS.map((color, i) => (
              <circle
                key={i}
                cx={28 + 16 * Math.cos((i * Math.PI) / 2)}
                cy={28 + 16 * Math.sin((i * Math.PI) / 2)}
                r="3"
                fill={color}
                opacity="0.85"
              />
            ))}
            {/* Nozzles */}
            {NOZZLE_ANGLES.map((angle, i) => (
              <motion.circle
                key={i}
                cx={28 + 8 * Math.cos((angle * Math.PI) / 180)}
                cy={28 + 8 * Math.sin((angle * Math.PI) / 180)}
                r="2"
                fill="hsl(205,80%,70%)"
                animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
            {/* Cuttings spray */}
            {CUTTING_ANGLES.map((angle, i) => (
              <motion.circle
                key={i}
                r={1.2}
                fill={i % 2 === 0 ? "hsl(25,40%,45%)" : "hsl(215,12%,55%)"}
                initial={{
                  cx: 28 + 22 * Math.cos((angle * Math.PI) / 180),
                  cy: 28 + 22 * Math.sin((angle * Math.PI) / 180),
                }}
                animate={{
                  cx: [
                    28 + 22 * Math.cos((angle * Math.PI) / 180),
                    28 + 30 * Math.cos((angle * Math.PI) / 180),
                  ],
                  cy: [
                    28 + 22 * Math.sin((angle * Math.PI) / 180),
                    28 + 30 * Math.sin((angle * Math.PI) / 180),
                  ],
                  opacity: [0.7, 0],
                }}
                transition={{ duration: 0.6, delay: i * 0.07, repeat: Infinity }}
              />
            ))}
          </svg>
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow: "0 0 20px 8px hsl(35,92%,55%,0.25), 0 0 40px 16px hsl(35,92%,55%,0.10)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
