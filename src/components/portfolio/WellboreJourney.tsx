/**
 * WellboreJourney — Cinematic scroll-driven petroleum drilling animation.
 * Features a detailed PDC/tri-cone drill bit with rock-grinding effects.
 */
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PIPE_TOP_VH = 5;
const PIPE_BOT_VH = 93;
const DRILL_ZONE = PIPE_BOT_VH - PIPE_TOP_VH;

const TOOL_JOINT_POSITIONS = Array.from({ length: 18 }, (_, i) => (i + 1) * 5);

// Rock chip particles ejecting from bit face
const ROCK_CHIPS = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * 360;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    angle,
    ex: Math.cos(rad) * (38 + Math.random() * 18),
    ey: Math.sin(rad) * (38 + Math.random() * 18),
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 0.5,
    dur: 0.4 + Math.random() * 0.5,
    color: i % 3 === 0 ? "hsl(25,40%,50%)" : i % 3 === 1 ? "hsl(35,60%,55%)" : "hsl(215,15%,60%)",
  };
});

// Spark streaks — white-hot fragments
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360 + 15;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    angle,
    ex: Math.cos(rad) * (50 + Math.random() * 20),
    ey: Math.sin(rad) * (50 + Math.random() * 20),
    delay: i * 0.08,
  };
});

export default function WellboreJourney() {
  const { scrollYProgress } = useScroll();

  const rawHeight = useTransform(scrollYProgress, [0, 1], [0, DRILL_ZONE]);
  const pipeHeightVh = useSpring(rawHeight, { stiffness: 80, damping: 25 });
  const bitTopVh = useTransform(pipeHeightVh, (h) => `${PIPE_TOP_VH + h}vh`);

  const rawRot = useTransform(scrollYProgress, [0, 1], [0, 3600]);
  const rotation = useSpring(rawRot, { stiffness: 60, damping: 20 });

  const mudY = useTransform(scrollYProgress, [0, 1], [0, 300]);
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
        <svg viewBox="0 0 52 120" width="52" height="100%" fill="none" style={{ overflow: "visible" }}>
          <line x1="4" y1="120" x2="22" y2="10" stroke="hsl(215,12%,38%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="120" x2="30" y2="10" stroke="hsl(215,12%,38%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="9" y1="100" x2="43" y2="100" stroke="hsl(215,12%,30%)" strokeWidth="1.5" />
          <line x1="12" y1="78" x2="40" y2="78" stroke="hsl(215,12%,30%)" strokeWidth="1.5" />
          <line x1="15" y1="57" x2="37" y2="57" stroke="hsl(215,12%,30%)" strokeWidth="1.2" />
          <line x1="18" y1="38" x2="34" y2="38" stroke="hsl(215,12%,28%)" strokeWidth="1" />
          <line x1="9" y1="100" x2="40" y2="78" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="43" y1="100" x2="12" y2="78" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="12" y1="78" x2="37" y2="57" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <line x1="40" y1="78" x2="15" y2="57" stroke="hsl(215,12%,20%)" strokeWidth="0.7" />
          <rect x="20" y="6" width="12" height="6" rx="1" fill="hsl(215,12%,35%)" />
          <line x1="20" y1="9" x2="32" y2="9" stroke="hsl(215,12%,50%)" strokeWidth="0.8" />
          <rect x="23" y="12" width="6" height="10" rx="1" fill="hsl(215,15%,28%)" />
          <rect x="24" y="14" width="4" height="2" fill="hsl(215,12%,45%)" />
          <motion.rect x="22" y="105" width="8" height="12" rx="2" fill="hsl(215,12%,28%)"
            animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity }} />
          <motion.circle cx="26" cy="4" r="2.5" fill="hsl(5,78%,55%)"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <rect x="0" y="114" width="52" height="6" rx="1" fill="hsl(215,12%,22%)" />
        </svg>
      </div>

      {/* ── Drill Pipe ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{ top: `${PIPE_TOP_VH}vh`, width: "10px", height: pipeH }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, hsl(215,12%,18%) 0%, hsl(215,12%,40%) 28%, hsl(215,12%,58%) 50%, hsl(215,12%,40%) 72%, hsl(215,12%,18%) 100%)",
        }} />
        <motion.div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 8px, rgba(180,120,30,0.18) 8px, rgba(180,120,30,0.18) 10px)",
          backgroundSize: "10px 20px",
          y: mudY,
        }} />
        {TOOL_JOINT_POSITIONS.map((pct) => (
          <div key={pct} style={{
            position: "absolute", left: "-2px", right: "-2px", top: `${pct}%`, height: "6px",
            background: "linear-gradient(90deg, hsl(215,12%,15%) 0%, hsl(215,12%,38%) 30%, hsl(215,12%,52%) 50%, hsl(215,12%,38%) 70%, hsl(215,12%,15%) 100%)",
            borderTop: "1px solid hsl(215,12%,60%)", borderBottom: "1px solid hsl(215,12%,20%)",
          }} />
        ))}
      </motion.div>

      {/* ── BIT ASSEMBLY: sub-collar + bit ── */}
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
        {/* Bit sub / collar — connects pipe to bit */}
        <div style={{
          width: "14px",
          height: "18px",
          background: "linear-gradient(90deg, hsl(215,12%,16%) 0%, hsl(215,12%,38%) 25%, hsl(215,12%,52%) 50%, hsl(215,12%,38%) 75%, hsl(215,12%,16%) 100%)",
          borderBottom: "2px solid hsl(215,12%,55%)",
          flexShrink: 0,
        }} />

        {/* ─── Rotating PDC Drill Bit ─── */}
        <motion.div style={{ rotate: rotation, position: "relative", flexShrink: 0 }}>
          <svg
            viewBox="-50 -50 100 100"
            width="100"
            height="100"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              {/* Shank body gradient */}
              <linearGradient id="shankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(215,15%,14%)" />
                <stop offset="20%" stopColor="hsl(215,15%,35%)" />
                <stop offset="50%" stopColor="hsl(215,15%,52%)" />
                <stop offset="80%" stopColor="hsl(215,15%,35%)" />
                <stop offset="100%" stopColor="hsl(215,15%,14%)" />
              </linearGradient>

              {/* Blade gradient */}
              <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(215,12%,20%)" />
                <stop offset="40%" stopColor="hsl(215,12%,48%)" />
                <stop offset="60%" stopColor="hsl(215,12%,60%)" />
                <stop offset="100%" stopColor="hsl(215,12%,22%)" />
              </linearGradient>

              {/* PDC cutter disc gradient */}
              <radialGradient id="cutterGrad" cx="35%" cy="30%">
                <stop offset="0%" stopColor="hsl(200,30%,75%)" />
                <stop offset="50%" stopColor="hsl(215,20%,45%)" />
                <stop offset="100%" stopColor="hsl(215,20%,18%)" />
              </radialGradient>

              {/* Heat glow at bit face */}
              <radialGradient id="heatGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(35,100%,70%)" stopOpacity="0.5" />
                <stop offset="40%" stopColor="hsl(28,95%,55%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(20,80%,30%)" stopOpacity="0" />
              </radialGradient>

              {/* Wear flat on cutter face */}
              <radialGradient id="cutterWear" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(40,90%,80%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(35,70%,50%)" stopOpacity="0.2" />
              </radialGradient>

              {/* Nozzle bore */}
              <radialGradient id="nozzleGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="hsl(205,80%,75%)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(205,80%,30%)" stopOpacity="0.3" />
              </radialGradient>

              {/* Mud jet glow */}
              <radialGradient id="mudJet" cx="50%" cy="100%">
                <stop offset="0%" stopColor="hsl(205,80%,60%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── SHANK / BIT BODY (hexagonal cross-section feel) ── */}
            {/* Main cylindrical body */}
            <rect x="-16" y="-32" width="32" height="20" rx="2" fill="url(#shankGrad)" />
            {/* Shoulder taper */}
            <path d="M-16,-12 L-22,2 L22,2 L16,-12 Z" fill="url(#shankGrad)" />
            {/* Flat bottom face */}
            <ellipse cx="0" cy="2" rx="22" ry="4" fill="hsl(215,15%,30%)" />

            {/* ── 5 PDC BLADES radiating from center ── */}
            {[0, 72, 144, 216, 288].map((bladeAngle, bi) => {
              const rad = (bladeAngle * Math.PI) / 180;
              return (
                <g key={bi} transform={`rotate(${bladeAngle})`}>
                  {/* Blade body — swept back shape */}
                  <path
                    d={`M0,0 L4,-2 L18,8 Q20,14 16,18 L10,18 Q8,14 6,8 Z`}
                    fill="url(#bladeGrad)"
                    stroke="hsl(215,12%,55%)"
                    strokeWidth="0.4"
                  />

                  {/* PDC cutters along blade — 4 per blade */}
                  {[6, 10, 14, 18].map((r, ci) => {
                    const cx = Math.sin((bladeAngle * Math.PI) / 180) * r;
                    const cy_val = Math.cos((bladeAngle * Math.PI) / 180) * r;
                    return (
                      <g key={ci} transform={`translate(${cx},${cy_val - r}) rotate(${-bladeAngle})`}>
                        {/* Cutter body (tungsten carbide substrate) */}
                        <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="hsl(215,12%,28%)" />
                        {/* Diamond table (PDC face) */}
                        <ellipse cx="0" cy="-1" rx="3" ry="1.5" fill="url(#cutterGrad)" />
                        {/* Wear flat glow when cutting */}
                        <motion.ellipse
                          cx="0" cy="-1.5" rx="2" ry="1"
                          fill="url(#cutterWear)"
                          animate={{ opacity: [0.3, 0.9, 0.3] }}
                          transition={{ duration: 0.3, delay: ci * 0.07 + bi * 0.05, repeat: Infinity }}
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* ── 3 MUD NOZZLES (120° apart) ── */}
            {[30, 150, 270].map((nAngle, ni) => {
              const rad = (nAngle * Math.PI) / 180;
              const nx = Math.sin(rad) * 9;
              const ny = -Math.cos(rad) * 9;
              return (
                <g key={ni}>
                  {/* Nozzle housing */}
                  <circle cx={nx} cy={ny + 4} r="4.5" fill="hsl(215,15%,22%)" stroke="hsl(215,12%,45%)" strokeWidth="0.5" />
                  {/* Nozzle bore */}
                  <circle cx={nx} cy={ny + 4} r="2.5" fill="url(#nozzleGrad)" />
                  {/* Mud jet pulse */}
                  <motion.ellipse
                    cx={nx} cy={ny + 10}
                    rx="3" ry="6"
                    fill="hsl(205,80%,60%)"
                    animate={{ opacity: [0, 0.7, 0], scaleY: [0.5, 1.3, 0.5], scaleX: [1.2, 0.7, 1.2] }}
                    transition={{ duration: 0.5, delay: ni * 0.16, repeat: Infinity }}
                  />
                </g>
              );
            })}

            {/* ── GAGE PADS (outer diameter protectors) ── */}
            {[36, 108, 180, 252, 324].map((gAngle, gi) => {
              const rad = (gAngle * Math.PI) / 180;
              return (
                <rect
                  key={gi}
                  x="-3.5" y="16"
                  width="7" height="5"
                  rx="1"
                  fill="hsl(215,12%,38%)"
                  stroke="hsl(215,12%,55%)"
                  strokeWidth="0.4"
                  transform={`rotate(${gAngle})`}
                />
              );
            })}

            {/* ── HEAT GLOW at cutting face ── */}
            <motion.ellipse
              cx="0" cy="18" rx="22" ry="8"
              fill="url(#heatGlow)"
              animate={{ opacity: [0.4, 1, 0.4], ry: [6, 10, 6] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ── ROCK CHIP PARTICLES ejecting from bit face ── */}
            {ROCK_CHIPS.map((chip) => (
              <motion.circle
                key={chip.id}
                r={chip.size / 2}
                fill={chip.color}
                initial={{ cx: 0, cy: 18 }}
                animate={{
                  cx: [0, chip.ex * 0.5, chip.ex],
                  cy: [18, 18 + chip.ey * 0.5, 18 + chip.ey],
                  opacity: [0.9, 0.6, 0],
                  r: [chip.size / 2, chip.size / 3, 0],
                }}
                transition={{
                  duration: chip.dur,
                  delay: chip.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* ── SPARK STREAKS — white-hot fragments ── */}
            {SPARKS.map((spark) => (
              <motion.line
                key={spark.id}
                x1="0" y1="18"
                x2={spark.ex * 0.3}
                y2={18 + spark.ey * 0.3}
                stroke="hsl(45,100%,85%)"
                strokeWidth="0.8"
                strokeLinecap="round"
                animate={{
                  x2: [0, spark.ex],
                  y2: [18, 18 + spark.ey],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.35,
                  delay: spark.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* ── CENTER PIN / PILOT ── */}
            <circle cx="0" cy="2" r="3.5" fill="hsl(215,12%,35%)" stroke="hsl(215,12%,55%)" strokeWidth="0.5" />
            <circle cx="0" cy="2" r="1.5" fill="hsl(215,12%,60%)" />
          </svg>

          {/* ── AMBIENT HEAT GLOW (CSS, outside SVG) ── */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "40px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at 50% 100%, hsl(35,100%,55%,0.5) 0%, hsl(28,95%,45%,0.2) 40%, transparent 70%)",
              filter: "blur(4px)",
            }}
            animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1.15, 0.9] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
        </motion.div>

        {/* ── ROCK FACE being drilled — cracking effect ── */}
        <motion.div
          style={{
            width: "100px",
            height: "12px",
            background: "linear-gradient(180deg, hsl(25,25%,20%) 0%, hsl(215,15%,14%) 100%)",
            borderTop: "1px solid hsl(25,30%,35%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Crack lines */}
          {[20, 45, 70, 85].map((x, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: 0,
                width: "1px",
                height: "100%",
                background: "hsl(35,80%,50%,0.5)",
                transformOrigin: "top",
              }}
              animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.8 }}
            />
          ))}
          {/* Rock dust cloud */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "hsl(25,30%,35%,0.4)",
            }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
