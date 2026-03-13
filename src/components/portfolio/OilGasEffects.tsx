/**
 * OilGasEffects — Petroleum motion-graphics overlays.
 * Sub-components: PoreThroatNetwork, WaterZoneEffect, OilZoneEffect,
 * PerforationEffect, ReservoirSimEffect.
 * All are pointer-events-none absolute overlays.
 */
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   1. PORE THROAT NETWORK
   ───────────────────────────────────────────── */
const grains = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  cx: 8 + Math.random() * 84,
  cy: 8 + Math.random() * 84,
  r: 3 + Math.random() * 5,
}));

const pores = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  cx: 10 + Math.random() * 80,
  cy: 10 + Math.random() * 80,
  r: 2 + Math.random() * 4,
  isOil: Math.random() > 0.5,
  delay: Math.random() * 3,
}));

const channels = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x1: 5 + Math.random() * 90,
  y1: 5 + Math.random() * 90,
  x2: 5 + Math.random() * 90,
  y2: 5 + Math.random() * 90,
}));

const migrators = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  cx: 10 + Math.random() * 80,
  delay: i * 0.5,
}));

export function PoreThroatNetwork() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.6,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {grains.map((g) => (
          <circle
            key={g.id}
            cx={`${g.cx}%`}
            cy={`${g.cy}%`}
            r={`${g.r}%`}
            fill="hsl(25,25%,18%)"
            stroke="hsl(25,20%,28%)"
            strokeWidth="0.3"
          />
        ))}
        {channels.map((c) => (
          <line
            key={c.id}
            x1={`${c.x1}%`}
            y1={`${c.y1}%`}
            x2={`${c.x2}%`}
            y2={`${c.y2}%`}
            stroke="hsl(35,60%,45%)"
            strokeWidth="0.3"
            opacity="0.4"
          />
        ))}
        {pores.map((p) => (
          <motion.circle
            key={p.id}
            cx={`${p.cx}%`}
            cy={`${p.cy}%`}
            r={`${p.r}%`}
            fill={p.isOil ? "hsl(35,92%,55%,0.35)" : "hsl(205,80%,60%,0.25)"}
            stroke={p.isOil ? "hsl(35,92%,55%)" : "hsl(205,80%,60%)"}
            strokeWidth="0.2"
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 2 + p.delay, delay: p.delay, repeat: Infinity }}
          />
        ))}
        {migrators.map((m) => (
          <motion.circle
            key={m.id}
            cx={`${m.cx}%`}
            cy="10%"
            r="0.8%"
            fill="hsl(35,92%,55%)"
            animate={{ cy: ["10%", "90%"], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 4,
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. WATER ZONE EFFECT — enhanced visibility
   ───────────────────────────────────────────── */
const waterBubbles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: 3 + Math.random() * 94,
  delay: Math.random() * 6,
  size: 5 + Math.random() * 14,
}));

const invasionFronts = [12, 24, 36, 48, 60, 72, 84];

export function WaterZoneEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Horizontal invasion fronts — brighter */}
      {invasionFronts.map((top, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${top}%`,
            height: "2px",
            background: "linear-gradient(90deg, transparent 5%, hsl(205,80%,60%,0.5) 30%, hsl(205,90%,70%,0.6) 50%, hsl(205,80%,60%,0.5) 70%, transparent 95%)",
            filter: "blur(0.5px)",
          }}
          animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.85, 1, 0.85] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Rising water bubbles — bigger, brighter */}
      {waterBubbles.map((b) => (
        <motion.div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            bottom: 0,
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: "50%",
            border: "1.5px solid hsl(205,85%,65%,0.7)",
            background: "radial-gradient(circle at 35% 35%, hsl(205,85%,75%,0.3), hsl(205,80%,60%,0.15))",
            boxShadow: "0 0 8px hsl(205,85%,65%,0.3)",
          }}
          animate={{ y: [0, -350], opacity: [0, 0.85, 0] }}
          transition={{
            duration: 4 + b.delay * 0.5,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Saturation gradient overlay — stronger */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, hsl(205,80%,60%,0.08) 30%, hsl(205,85%,55%,0.12) 50%, hsl(205,80%,60%,0.08) 70%, transparent 100%)",
        }}
      />

      {/* Water shimmer — new ambient glow */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(205,85%,60%,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. OIL ZONE EFFECT — enhanced visibility
   ───────────────────────────────────────────── */
const oilDrops = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 4,
  size: 8 + Math.random() * 14,
}));

const oilBlobs = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: 3 + Math.random() * 92,
  top: 5 + Math.random() * 88,
  w: 18 + Math.random() * 36,
  h: 14 + Math.random() * 28,
  delay: Math.random() * 5,
}));

const oilBubbles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: 3 + Math.random() * 92,
  delay: Math.random() * 6,
  size: 4 + Math.random() * 10,
}));

export function OilZoneEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Oil drips from top — bigger, more visible */}
      {oilDrops.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: 0,
            width: `${d.size}px`,
            height: `${d.size * 2}px`,
            borderRadius: "40% 40% 50% 50%",
            background: "linear-gradient(180deg, hsl(30,60%,30%) 0%, hsl(25,55%,22%) 100%)",
            boxShadow: `0 0 14px hsl(35,92%,55%,0.5), 0 0 4px hsl(35,80%,40%,0.3)`,
          }}
          animate={{ y: [0, 200], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 3 + d.delay * 0.5,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Crude oil blobs — larger, more contrast */}
      {oilBlobs.map((b) => (
        <motion.div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.w}px`,
            height: `${b.h}px`,
            borderRadius: "60% 40% 50% 55%",
            background: "radial-gradient(ellipse at 40% 40%, hsl(30,50%,25%,0.7), hsl(25,55%,18%,0.5))",
            border: "1px solid hsl(35,92%,50%,0.3)",
            boxShadow: "0 0 12px hsl(35,80%,40%,0.2)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3 + b.delay * 0.5, delay: b.delay, repeat: Infinity }}
        />
      ))}

      {/* Rising oil bubbles — brighter glow */}
      {oilBubbles.map((b) => (
        <motion.div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            bottom: 0,
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, hsl(35,80%,45%,0.7), hsl(25,55%,30%,0.5))",
            border: "1px solid hsl(35,92%,55%,0.5)",
            boxShadow: "0 0 8px hsl(35,92%,55%,0.4)",
          }}
          animate={{ y: [0, -250], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 4 + b.delay * 0.4,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Amber glow — much stronger */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, hsl(35,92%,55%,0.14) 0%, hsl(30,80%,40%,0.06) 50%, transparent 100%)",
        }}
      />

      {/* Pulsing oil shimmer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 60% 40%, hsl(35,85%,50%,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. PERFORATION EFFECT — enhanced
   ───────────────────────────────────────────── */
const charges = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 3 + i * 7,
  top: 15 + Math.random() * 70,
  delay: Math.random() * 4,
}));

export function PerforationEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {charges.map((c) => (
        <motion.div
          key={c.id}
          style={{ position: "absolute", left: `${c.left}%`, top: `${c.top}%` }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: c.delay, repeat: Infinity, repeatDelay: 2.5 }}
        >
          {/* Detonation flash — bigger, brighter */}
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(45,100%,90%) 0%, hsl(35,100%,70%) 40%, hsl(28,92%,58%) 70%, transparent 100%)",
              boxShadow: "0 0 24px 10px hsl(28,92%,58%,0.6), 0 0 8px 2px hsl(45,100%,80%,0.4)",
            }}
          />
          {/* Jets radiating outward — longer, brighter */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
            <motion.div
              key={j}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "32px",
                height: "3px",
                background: "linear-gradient(90deg, hsl(35,100%,70%,0.9), hsl(28,92%,58%,0.5), transparent)",
                transformOrigin: "left center",
                transform: `rotate(${angle}deg)`,
                borderRadius: "2px",
              }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.8, delay: c.delay + 0.1, repeat: Infinity, repeatDelay: 2.7 }}
            />
          ))}
        </motion.div>
      ))}

      {/* Rock debris particles — more visible */}
      {Array.from({ length: 30 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        size: 3 + Math.random() * 4,
      })).map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: "1px",
            background: "hsl(25,40%,55%)",
            boxShadow: "0 0 4px hsl(28,60%,50%,0.4)",
          }}
          animate={{
            x: [(Math.random() - 0.5) * 60],
            y: [Math.random() * 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 1.2, delay: d.delay, repeat: Infinity, repeatDelay: 1.8 }}
        />
      ))}

      {/* Ambient perf glow */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(28,80%,55%,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. RESERVOIR SIMULATION EFFECT — enhanced
   ───────────────────────────────────────────── */
const flowParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: 15 + Math.random() * 70,
  top: 15 + Math.random() * 70,
  delay: Math.random() * 4,
  size: 4 + Math.random() * 5,
}));

export function ReservoirSimEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Grid mesh overlay — more visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,180,140,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,140,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Rotating saturation front — more vivid */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background:
            "conic-gradient(hsl(175,60%,48%,0.2) 0deg, transparent 120deg, hsl(35,92%,55%,0.15) 240deg, transparent 360deg)",
          filter: "blur(2px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Pressure contour rings — brighter */}
      {[28, 42, 58, 72].map((size, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: `${size}%`,
            height: `${size}%`,
            borderRadius: "50%",
            border: `1.5px solid hsl(175,60%,48%,${0.25 - i * 0.04})`,
            boxShadow: `0 0 10px hsl(175,60%,48%,${0.1 - i * 0.02})`,
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5 + i, delay: i * 1.2, repeat: Infinity }}
        />
      ))}

      {/* Injector marker — bigger glow */}
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "hsl(205,80%,60%)",
          boxShadow: "0 0 20px 8px hsl(205,80%,60%,0.6), 0 0 40px 16px hsl(205,80%,60%,0.2)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Producer marker — bigger glow */}
      <motion.div
        style={{
          position: "absolute",
          right: "12%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "hsl(35,92%,55%)",
          boxShadow: "0 0 20px 8px hsl(35,92%,55%,0.6), 0 0 40px 16px hsl(35,92%,55%,0.2)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fluid flow particles — bigger, brighter */}
      {flowParticles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.id % 2 === 0 ? "hsl(205,80%,65%)" : "hsl(35,92%,60%)",
            boxShadow: p.id % 2 === 0
              ? "0 0 6px hsl(205,80%,60%,0.5)"
              : "0 0 6px hsl(35,92%,55%,0.5)",
          }}
          animate={{
            x: p.id % 2 === 0 ? [0, 120] : [0, -120],
            opacity: [0, 0.9, 0],
          }}
          transition={{ duration: 3 + p.delay * 0.5, delay: p.delay, repeat: Infinity }}
        />
      ))}

      {/* Ambient reservoir glow */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(175,50%,45%,0.07) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
