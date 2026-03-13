/**
 * StratigraphyBackground — Full-page geological cross-section with parallax.
 * 11 distinct earth-tone layers with CSS textures, formation labels,
 * pore-space overlays for water and oil zones.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Layer {
  name: string;
  startPct: number;
  endPct: number;
  bg: string;
  texture: string;
  labelColor: string;
  borderColor: string;
  parallaxSpeed: number; // 0 = no parallax, negative = slower scroll
}

const LAYERS: Layer[] = [
  {
    name: "SURFACE TOPSOIL",
    startPct: 0,
    endPct: 9,
    bg: "hsl(25,22%,12%)",
    texture: `repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px),
              repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.01) 60px, rgba(255,255,255,0.01) 61px)`,
    labelColor: "hsl(25,40%,55%)",
    borderColor: "rgba(180,120,60,0.2)",
    parallaxSpeed: -0.05,
  },
  {
    name: "GLACIAL TILL",
    startPct: 9,
    endPct: 18,
    bg: "hsl(220,15%,11%)",
    texture: `radial-gradient(ellipse 3px 2px at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 100%),
              radial-gradient(ellipse 2px 3px at 60% 70%, rgba(255,255,255,0.03) 0%, transparent 100%),
              repeating-linear-gradient(175deg, transparent, transparent 25px, rgba(255,255,255,0.015) 25px, rgba(255,255,255,0.015) 26px)`,
    labelColor: "hsl(220,20%,50%)",
    borderColor: "rgba(100,120,160,0.15)",
    parallaxSpeed: -0.08,
  },
  {
    name: "SHALE CAP",
    startPct: 18,
    endPct: 30,
    bg: "hsl(215,18%,10%)",
    texture: `repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(255,255,255,0.035) 6px, rgba(255,255,255,0.035) 7px),
              repeating-linear-gradient(1deg, transparent, transparent 14px, rgba(255,255,255,0.015) 14px, rgba(255,255,255,0.015) 15px)`,
    labelColor: "hsl(215,12%,50%)",
    borderColor: "rgba(80,100,140,0.2)",
    parallaxSpeed: -0.1,
  },
  {
    name: "SANDSTONE",
    startPct: 30,
    endPct: 40,
    bg: "hsl(32,28%,11%)",
    texture: `radial-gradient(circle 1.5px at 15% 25%, rgba(200,160,80,0.07) 0%, transparent 100%),
              radial-gradient(circle 1px at 45% 55%, rgba(200,160,80,0.05) 0%, transparent 100%),
              radial-gradient(circle 2px at 75% 35%, rgba(200,160,80,0.06) 0%, transparent 100%),
              radial-gradient(circle 1px at 30% 75%, rgba(200,160,80,0.04) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 80% 80%, rgba(200,160,80,0.05) 0%, transparent 100%)`,
    labelColor: "hsl(32,55%,55%)",
    borderColor: "rgba(200,150,60,0.18)",
    parallaxSpeed: -0.12,
  },
  {
    name: "WATER-BEARING SAND",
    startPct: 40,
    endPct: 50,
    bg: "hsl(205,25%,10%)",
    texture: `radial-gradient(ellipse 60% 40% at 50% 80%, rgba(60,120,200,0.08) 0%, transparent 100%),
              repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(60,120,200,0.025) 10px, rgba(60,120,200,0.025) 11px)`,
    labelColor: "hsl(205,70%,60%)",
    borderColor: "rgba(60,140,220,0.2)",
    parallaxSpeed: -0.14,
  },
  {
    name: "LIMESTONE",
    startPct: 50,
    endPct: 57,
    bg: "hsl(30,10%,10%)",
    texture: `repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.02) 22px, rgba(255,255,255,0.02) 23px),
              repeating-linear-gradient(88deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px)`,
    labelColor: "hsl(30,20%,50%)",
    borderColor: "rgba(160,140,100,0.15)",
    parallaxSpeed: -0.16,
  },
  {
    name: "OIL-BEARING SANDSTONE",
    startPct: 57,
    endPct: 68,
    bg: "hsl(28,30%,9%)",
    texture: `radial-gradient(circle 2px at 20% 20%, rgba(180,100,20,0.1) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 55% 50%, rgba(180,100,20,0.08) 0%, transparent 100%),
              radial-gradient(circle 2px at 80% 30%, rgba(180,100,20,0.09) 0%, transparent 100%),
              radial-gradient(circle 1px at 35% 75%, rgba(180,100,20,0.07) 0%, transparent 100%),
              radial-gradient(circle 2.5px at 70% 80%, rgba(180,100,20,0.08) 0%, transparent 100%),
              radial-gradient(ellipse 80% 50% at 50% 60%, rgba(120,60,10,0.06) 0%, transparent 100%)`,
    labelColor: "hsl(35,85%,55%)",
    borderColor: "rgba(180,100,20,0.25)",
    parallaxSpeed: -0.18,
  },
  {
    name: "TIGHT SHALE",
    startPct: 68,
    endPct: 75,
    bg: "hsl(220,20%,8%)",
    texture: `repeating-linear-gradient(2deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 5px),
              repeating-linear-gradient(-1deg, transparent, transparent 9px, rgba(255,255,255,0.015) 9px, rgba(255,255,255,0.015) 10px)`,
    labelColor: "hsl(220,12%,45%)",
    borderColor: "rgba(80,90,120,0.2)",
    parallaxSpeed: -0.2,
  },
  {
    name: "PERFORATED ZONE",
    startPct: 75,
    endPct: 83,
    bg: "hsl(25,35%,8%)",
    texture: `radial-gradient(circle 3px at 10% 50%, rgba(255,120,30,0.1) 0%, transparent 100%),
              radial-gradient(circle 2px at 30% 20%, rgba(255,120,30,0.08) 0%, transparent 100%),
              radial-gradient(circle 3px at 55% 70%, rgba(255,120,30,0.09) 0%, transparent 100%),
              radial-gradient(circle 2px at 75% 35%, rgba(255,120,30,0.07) 0%, transparent 100%),
              radial-gradient(circle 4px at 90% 60%, rgba(255,120,30,0.1) 0%, transparent 100%)`,
    labelColor: "hsl(28,92%,58%)",
    borderColor: "rgba(255,120,30,0.25)",
    parallaxSpeed: -0.22,
  },
  {
    name: "RESERVOIR ROCK",
    startPct: 83,
    endPct: 93,
    bg: "hsl(175,20%,8%)",
    texture: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,180,140,0.06) 0%, transparent 100%),
              radial-gradient(circle 2px at 25% 30%, rgba(0,180,140,0.08) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 65% 65%, rgba(0,180,140,0.07) 0%, transparent 100%),
              repeating-linear-gradient(0deg, transparent, transparent 16px, rgba(0,180,140,0.02) 16px, rgba(0,180,140,0.02) 17px)`,
    labelColor: "hsl(175,60%,48%)",
    borderColor: "rgba(0,180,140,0.2)",
    parallaxSpeed: -0.24,
  },
  {
    name: "BASEMENT ROCK",
    startPct: 93,
    endPct: 100,
    bg: "hsl(220,22%,6%)",
    texture: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.01) 30px, rgba(255,255,255,0.01) 31px),
              repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255,255,255,0.008) 30px, rgba(255,255,255,0.008) 31px),
              radial-gradient(ellipse 80% 80% at 50% 100%, rgba(255,80,20,0.05) 0%, transparent 100%)`,
    labelColor: "hsl(220,12%,35%)",
    borderColor: "rgba(60,60,80,0.2)",
    parallaxSpeed: -0.26,
  },
];

/* Water pore spaces */
const waterPores = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 88,
  top: 5 + Math.random() * 88,
  r: 3 + Math.random() * 5,
  delay: Math.random() * 3,
}));

/* Oil pore spaces */
const oilPores = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: 5 + Math.random() * 88,
  top: 5 + Math.random() * 88,
  r: 3 + Math.random() * 6,
  delay: Math.random() * 4,
  dark: Math.random() > 0.5,
}));

function ParallaxLayer({ layer, idx }: { layer: Layer; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, layer.parallaxSpeed * 200]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${layer.startPct}%`,
        height: `${layer.endPct - layer.startPct}%`,
        background: layer.bg,
        backgroundImage: layer.texture,
        backgroundSize: idx === 3 || idx === 6 ? "200px 200px" : "auto",
        y,
        willChange: "transform",
      }}
    >
      {/* Top boundary line */}
      {idx > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${layer.borderColor} 20%, ${layer.borderColor} 80%, transparent 100%)`,
          }}
        />
      )}

      {/* Gradient blend at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: `linear-gradient(to bottom, transparent, ${LAYERS[Math.min(idx + 1, LAYERS.length - 1)].bg}aa)`,
        }}
      />

      {/* Formation label — right side */}
      <div
        style={{
          position: "absolute",
          right: "8px",
          top: "12px",
          fontSize: "8px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: "700",
          letterSpacing: "0.18em",
          color: layer.labelColor,
          opacity: 0.55,
          textTransform: "uppercase",
          writingMode: "horizontal-tb",
          maxWidth: "120px",
          lineHeight: 1.3,
        }}
      >
        {layer.name}
      </div>

      {/* Water pore overlay — layer 4 */}
      {idx === 4 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {waterPores.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.r * 2}px`,
                height: `${p.r * 2}px`,
                borderRadius: "50%",
                border: `1px solid hsl(205,80%,60%,0.35)`,
                background: "hsl(205,80%,60%,0.06)",
                animation: `rise-bubble ${3 + p.delay}s ${p.delay}s ease-in-out infinite`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 50% 80%, hsl(205,80%,60%,0.07) 0%, transparent 100%)",
            }}
          />
        </div>
      )}

      {/* Oil pore overlay — layer 6 */}
      {idx === 6 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {oilPores.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.r * 2}px`,
                height: `${p.r * 2}px`,
                borderRadius: "50%",
                background: p.dark
                  ? "hsl(25,55%,35%,0.5)"
                  : "hsl(35,92%,55%,0.25)",
                animation: `float-particle-slow ${5 + p.delay}s ${p.delay}s ease-in-out infinite`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 70% 50% at 50% 70%, hsl(35,92%,55%,0.07) 0%, transparent 100%)",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function StratigraphyBackground() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={pageRef}
      className="absolute inset-0 w-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {LAYERS.map((layer, idx) => (
        <ParallaxLayer key={layer.name} layer={layer} idx={idx} />
      ))}

      {/* Global wavy strata bedding lines across full page */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055 }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[8, 14, 22, 28, 35, 41, 48, 54, 62, 68, 75, 81, 88, 94].map((y, i) => (
          <path
            key={i}
            d={`M0,${y} Q25,${y - 0.4 + (i % 3) * 0.3} 50,${y + 0.3} T100,${y - 0.2}`}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={i % 4 === 0 ? "1.5" : "0.8"}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
