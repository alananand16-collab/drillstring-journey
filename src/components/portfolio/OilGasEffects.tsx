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
        {/* Grain matrix */}
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
        {/* Connecting channels */}
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
        {/* Pore spaces */}
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
        {/* Migrating fluid particles */}
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
   2. WATER ZONE EFFECT
   ───────────────────────────────────────────── */
const waterBubbles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 5,
  size: 4 + Math.random() * 8,
}));

const invasionFronts = [20, 38, 56, 72, 88];

export function WaterZoneEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Horizontal invasion fronts */}
      {invasionFronts.map((top, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${top}%`,
            height: "1px",
            background: "linear-gradient(90deg, transparent, hsl(205,80%,60%,0.3), transparent)",
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}

      {/* Rising water bubbles */}
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
            border: "1px solid hsl(205,80%,60%,0.5)",
            background: "hsl(205,80%,60%,0.1)",
          }}
          animate={{ y: [0, -200], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 4 + b.delay,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Saturation gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, hsl(205,80%,60%,0.04) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. OIL ZONE EFFECT
   ───────────────────────────────────────────── */
const oilDrops = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 10 + Math.random() * 80,
  delay: Math.random() * 4,
  size: 6 + Math.random() * 10,
}));

const oilBlobs = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 88,
  top: 5 + Math.random() * 88,
  w: 12 + Math.random() * 24,
  h: 10 + Math.random() * 18,
  delay: Math.random() * 5,
}));

const oilBubbles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 88,
  delay: Math.random() * 6,
  size: 3 + Math.random() * 7,
}));

export function OilZoneEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Oil drips from top */}
      {oilDrops.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: 0,
            width: `${d.size}px`,
            height: `${d.size * 1.8}px`,
            borderRadius: "40% 40% 50% 50%",
            background: "hsl(25,55%,25%)",
            boxShadow: `0 0 8px hsl(35,92%,55%,0.3)`,
          }}
          animate={{ y: [0, 120], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 3 + d.delay,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Crude oil blobs */}
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
            background: "hsl(25,55%,20%,0.55)",
            border: "1px solid hsl(35,92%,45%,0.2)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3 + b.delay, delay: b.delay, repeat: Infinity }}
        />
      ))}

      {/* Rising oil bubbles */}
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
            background: "hsl(25,55%,30%,0.6)",
            border: "1px solid hsl(35,92%,55%,0.3)",
          }}
          animate={{ y: [0, -150], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 5 + b.delay,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Amber glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 70%, hsl(35,92%,55%,0.07) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. PERFORATION EFFECT
   ───────────────────────────────────────────── */
const charges = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 5 + i * 9.5,
  top: 20 + Math.random() * 60,
  delay: Math.random() * 4,
}));

export function PerforationEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {charges.map((c) => (
        <motion.div
          key={c.id}
          style={{ position: "absolute", left: `${c.left}%`, top: `${c.top}%` }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.5, delay: c.delay, repeat: Infinity, repeatDelay: 3 }}
        >
          {/* Detonation flash */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(35,100%,80%) 0%, hsl(28,92%,58%) 60%, transparent 100%)",
              boxShadow: "0 0 16px 6px hsl(28,92%,58%,0.5)",
            }}
          />
          {/* Jets radiating outward */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
            <motion.div
              key={j}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "20px",
                height: "2px",
                background: "linear-gradient(90deg, hsl(28,92%,58%,0.8), transparent)",
                transformOrigin: "left center",
                transform: `rotate(${angle}deg)`,
              }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.8, delay: c.delay + 0.1, repeat: Infinity, repeatDelay: 3.2 }}
            />
          ))}
        </motion.div>
      ))}

      {/* Rock debris particles */}
      {Array.from({ length: 20 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
      })).map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: "3px",
            height: "3px",
            borderRadius: "1px",
            background: "hsl(25,30%,50%)",
          }}
          animate={{
            x: [(Math.random() - 0.5) * 40],
            y: [Math.random() * 30],
            opacity: [0, 0.7, 0],
          }}
          transition={{ duration: 1.2, delay: d.delay, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   5. RESERVOIR SIMULATION EFFECT
   ───────────────────────────────────────────── */
const flowParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 20 + Math.random() * 60,
  top: 20 + Math.random() * 60,
  delay: Math.random() * 4,
}));

export function ReservoirSimEffect() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Grid mesh overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,180,140,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,140,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Rotating saturation front */}
      <motion.div
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background:
            "conic-gradient(hsl(175,60%,48%,0.12) 0deg, transparent 120deg, hsl(35,92%,55%,0.08) 240deg, transparent 360deg)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Pressure contour rings */}
      {[30, 45, 60].map((size, i) => (
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
            border: `1px solid hsl(175,60%,48%,${0.15 - i * 0.04})`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + i, delay: i * 1.5, repeat: Infinity }}
        />
      ))}

      {/* Injector marker */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "hsl(205,80%,60%)",
          boxShadow: "0 0 12px 4px hsl(205,80%,60%,0.5)",
        }}
      />
      {/* Producer marker */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "hsl(35,92%,55%)",
          boxShadow: "0 0 12px 4px hsl(35,92%,55%,0.5)",
        }}
      />

      {/* Fluid flow particles between wells */}
      {flowParticles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: p.id % 2 === 0 ? "hsl(205,80%,60%)" : "hsl(35,92%,55%)",
          }}
          animate={{
            x: p.id % 2 === 0 ? [0, 80] : [0, -80],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 3 + p.delay, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
