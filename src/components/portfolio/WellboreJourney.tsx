/**
 * WellboreJourney — Cinematic scroll-driven petroleum drilling animation.
 * Fixed to left side of viewport. Scroll controls pipe length & bit rotation.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PIPE_TOP_VH = 5;   // vh where pipe starts (below derrick)
const PIPE_BOT_VH = 95;  // vh where pipe ends at full scroll

export default function WellboreJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Pipe height: 0% → 100% of drill zone
  const drillZoneH = PIPE_BOT_VH - PIPE_TOP_VH; // 90vh
  const pipeHeightPct = useTransform(scrollYProgress, [0, 1], [0, drillZoneH]);
  const pipeHeightSpring = useSpring(pipeHeightPct, { stiffness: 80, damping: 25 });

  // Bit position follows pipe bottom
  const bitTopPct = useTransform(pipeHeightSpring, (h) => PIPE_TOP_VH + h);

  // Rotation: 0 → 3600 degrees over full scroll, with spring smoothing
  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, 3600]);
  const rotation = useSpring(rawRotation, { stiffness: 60, damping: 20 });

  // Mud flow offset — animates the inner mud stripe
  const mudOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Tool joint positions (every ~50px equivalent in %)
  const toolJoints = Array.from({ length: 18 }, (_, i) => (i + 1) * 5);

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 z-40 hidden lg:block pointer-events-none"
      style={{ width: "56px", height: "100vh" }}
    >
      {/* ── SURFACE DERRICK SVG ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "0px", width: "52px", height: `${PIPE_TOP_VH}vh` }}
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
          <line x1="15" y1="57" x2="37" y2="57" stroke="hsl(215,12%,30%)" strokeWidth="1.5" />
          <line x1="18" y1="38" x2="34" y2="38" stroke="hsl(215,12%,30%)" strokeWidth="1" />

          {/* X bracing between legs */}
          <line x1="9" y1="100" x2="40" y2="78" stroke="hsl(215,12%,22%)" strokeWidth="0.8" />
          <line x1="43" y1="100" x2="12" y2="78" stroke="hsl(215,12%,22%)" strokeWidth="0.8" />
          <line x1="12" y1="78" x2="37" y2="57" stroke="hsl(215,12%,22%)" strokeWidth="0.8" />
          <line x1="40" y1="78" x2="15" y2="57" stroke="hsl(215,12%,22%)" strokeWidth="0.8" />

          {/* Crown block platform */}
          <rect x="20" y="6" width="12" height="6" rx="1" fill="hsl(215,12%,35%)" />
          <line x1="20" y1="9" x2="32" y2="9" stroke="hsl(215,12%,50%)" strokeWidth="0.8" />

          {/* Kelly/swivel housing */}
          <rect x="23" y="12" width="6" height="10" rx="1" fill="hsl(215,15%,28%)" />
          <rect x="24" y="14" width="4" height="2" fill="hsl(215,12%,45%)" />

          {/* Motor housing */}
          <motion.rect
            x="22"
            y="105"
            width="8"
            height="12"
            rx="2"
            fill="hsl(215,12%,28%)"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Pulsing warning light */}
          <motion.circle
            cx="26"
            cy="4"
            r="2.5"
            fill="hsl(5,78%,55%)"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="26"
            cy="4"
            r="5"
            fill="none"
            stroke="hsl(5,78%,55%)"
            strokeWidth="0.5"
            animate={{ opacity: [0.5, 0, 0.5], r: [3, 7, 3] } as Record<string, number[]>}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* Base platform */}
          <rect x="0" y="114" width="52" height="6" rx="1" fill="hsl(215,12%,22%)" />
        </svg>
      </div>

      {/* ── DRILL PIPE ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          top: `${PIPE_TOP_VH}vh`,
          width: "10px",
          height: pipeHeightSpring.get() ? `${pipeHeightSpring.get()}vh` : "0vh",
        }}
      >
        {/* Outer pipe — cylindrical gradient */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, hsl(215,12%,22%) 0%, hsl(215,12%,42%) 30%, hsl(215,12%,55%) 50%, hsl(215,12%,42%) 70%, hsl(215,12%,22%) 100%)",
            height: pipeHeightSpring.get() ? `${pipeHeightSpring.get()}vh` : "0vh",
          }}
        />
      </motion.div>

      {/* ── PIPE (using motion div for height) ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: `${PIPE_TOP_VH}vh`,
          width: "10px",
          height: pipeHeightSpring,
          // convert from percent to vh — framer gives us the raw vh number
          // we need a workaround: use transform scaleY on a full-height element instead
        }}
      >
        {/* We'll use a different approach — just render full height with a clip */}
      </motion.div>

      {/* Proper pipe with clip-path driven by scroll */}
      <PipeColumn
        topVh={PIPE_TOP_VH}
        heightSpring={pipeHeightSpring}
        mudOffset={mudOffset}
        toolJoints={toolJoints}
      />

      {/* ── DRILL BIT ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: bitTopPct, marginTop: "-2px" }}
      >
        <TriConeBit rotation={rotation} />
      </motion.div>
    </div>
  );
}

/* ─── Pipe Column sub-component ─── */
function PipeColumn({
  topVh,
  heightSpring,
  mudOffset,
  toolJoints,
}: {
  topVh: number;
  heightSpring: ReturnType<typeof useSpring>;
  mudOffset: ReturnType<typeof useTransform>;
  toolJoints: number[];
}) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        top: `${topVh}vh`,
        width: "10px",
        // height driven by spring (value is in vh units)
        height: useTransform(heightSpring, (v) => `${v}vh`),
      }}
    >
      {/* Pipe body — cylindrical shading */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, hsl(215,12%,18%) 0%, hsl(215,12%,40%) 28%, hsl(215,12%,58%) 50%, hsl(215,12%,40%) 72%, hsl(215,12%,18%) 100%)",
        }}
      />

      {/* Inner mud circulation — translating stripe */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 8px, rgba(180,120,30,0.18) 8px, rgba(180,120,30,0.18) 10px)",
          backgroundSize: "10px 20px",
          y: mudOffset,
        }}
      />

      {/* Tool joints — horizontal thicker rings every 5% of drill zone */}
      {toolJoints.map((pct) => (
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
  );
}

/* ─── Tri-cone Drill Bit ─── */
function TriConeBit({ rotation }: { rotation: ReturnType<typeof useSpring> }) {
  const nozzles = [0, 90, 180, 270];
  const cutterColors = [
    "hsl(214,100%,50%)",
    "hsl(35,92%,55%)",
    "hsl(175,60%,48%)",
    "hsl(205,80%,60%)",
  ];
  const cuttingAngles = [30, 75, 120, 165, 210, 255, 300, 345];

  return (
    <motion.div
      style={{
        width: "56px",
        height: "56px",
        rotate: rotation,
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 56 56"
        width="56"
        height="56"
        style={{ overflow: "visible" }}
      >
        {/* Bit body — central hub */}
        <circle
          cx="28"
          cy="28"
          r="12"
          fill="url(#bitBody)"
          stroke="hsl(215,12%,55%)"
          strokeWidth="1"
        />

        {/* Three cone lobes */}
        {[0, 120, 240].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 28 28)`}>
            <ellipse
              cx="28"
              cy="14"
              rx="6"
              ry="8"
              fill={`url(#cone${i})`}
              stroke="hsl(215,12%,50%)"
              strokeWidth="0.8"
            />
            {/* Cone teeth */}
            {[-3, 0, 3].map((tx) => (
              <ellipse
                key={tx}
                cx={28 + tx}
                cy="10"
                rx="1.5"
                ry="2.5"
                fill="hsl(215,12%,65%)"
              />
            ))}
          </g>
        ))}

        {/* Cutters */}
        {cutterColors.map((color, i) => (
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
        {nozzles.map((angle, i) => (
          <motion.circle
            key={i}
            cx={28 + 8 * Math.cos((angle * Math.PI) / 180)}
            cy={28 + 8 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="hsl(205,80%,70%)"
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Cuttings spray particles */}
        {cuttingAngles.map((angle, i) => (
          <motion.circle
            key={i}
            cx={28 + 22 * Math.cos((angle * Math.PI) / 180)}
            cy={28 + 22 * Math.sin((angle * Math.PI) / 180)}
            r={1 + Math.random()}
            fill={i % 2 === 0 ? "hsl(25,40%,45%)" : "hsl(215,12%,55%)"}
            animate={{
              cx: [
                28 + 22 * Math.cos((angle * Math.PI) / 180),
                28 + (28 + Math.random() * 8) * Math.cos((angle * Math.PI) / 180),
              ],
              cy: [
                28 + 22 * Math.sin((angle * Math.PI) / 180),
                28 + (28 + Math.random() * 8) * Math.sin((angle * Math.PI) / 180),
              ],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.4,
              delay: i * 0.07,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Defs */}
        <defs>
          <radialGradient id="bitBody" cx="40%" cy="30%">
            <stop offset="0%" stopColor="hsl(215,12%,60%)" />
            <stop offset="100%" stopColor="hsl(215,12%,20%)" />
          </radialGradient>
          {[0, 1, 2].map((i) => (
            <radialGradient key={i} id={`cone${i}`} cx="35%" cy="25%">
              <stop offset="0%" stopColor="hsl(215,12%,55%)" />
              <stop offset="100%" stopColor="hsl(215,12%,18%)" />
            </radialGradient>
          ))}
        </defs>
      </svg>

      {/* Glow beneath bit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: "0 0 20px 8px hsl(35,92%,55% / 0.3), 0 0 40px 16px hsl(35,92%,55% / 0.12)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}
