import { useMemo } from "react";

type ParticleType = "dust" | "rocks" | "oil" | "bubbles";

interface ParticleStyle {
  colors: string[];
  minSize: number;
  maxSize: number;
  animation: string;
  shape: "circle" | "square" | "drop";
}

const particleStyles: Record<ParticleType, ParticleStyle> = {
  dust: {
    colors: ["rgba(180,150,100,0.6)", "rgba(160,130,80,0.5)", "rgba(200,170,120,0.4)", "rgba(140,110,70,0.7)"],
    minSize: 3, maxSize: 8,
    animation: "float-particle",
    shape: "circle",
  },
  rocks: {
    colors: ["rgba(140,140,140,0.6)", "rgba(100,100,100,0.5)", "rgba(170,160,150,0.4)", "rgba(80,80,80,0.7)"],
    minSize: 3, maxSize: 7,
    animation: "float-particle-slow",
    shape: "square",
  },
  oil: {
    colors: ["rgba(40,25,10,0.8)", "rgba(60,40,15,0.7)", "rgba(30,15,5,0.9)", "rgba(80,50,20,0.6)"],
    minSize: 4, maxSize: 10,
    animation: "drip-particle",
    shape: "drop",
  },
  bubbles: {
    colors: ["rgba(180,200,255,0.3)", "rgba(160,180,240,0.25)", "rgba(200,220,255,0.2)", "rgba(140,170,230,0.35)"],
    minSize: 4, maxSize: 12,
    animation: "rise-bubble",
    shape: "circle",
  },
};

export default function ParticleField({ type, count = 25 }: { type: ParticleType; count?: number }) {
  const particles = useMemo(() => {
    const ps = particleStyles[type];
    return Array.from({ length: count }, (_, i) => {
      const size = ps.minSize + Math.random() * (ps.maxSize - ps.minSize);
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 6}s`,
        size,
        color: ps.colors[Math.floor(Math.random() * ps.colors.length)],
        animation: ps.animation,
        shape: ps.shape,
        blur: Math.random() > 0.7 ? `${1 + Math.random() * 2}px` : "0px",
      };
    });
  }, [type, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {particles.map((p) => (
        <div
          key={p.id}
          className={p.shape === "square" ? "absolute rotate-45" : "absolute"}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: p.shape === "drop" ? `${p.size * 1.5}px` : `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === "square" ? "2px" : p.shape === "drop" ? "50% 50% 50% 0" : "50%",
            animation: `${p.animation} ${p.duration} ${p.delay} infinite ease-in-out`,
            filter: `blur(${p.blur})`,
          }}
        />
      ))}
    </div>
  );
}
