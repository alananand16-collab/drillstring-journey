import { useMemo } from "react";

type ParticleType = "dust" | "rocks" | "oil" | "bubbles";

const particleStyles: Record<ParticleType, { color: string; size: string; animation: string }> = {
  dust: { color: "rgba(139,115,85,0.4)", size: "3px", animation: "float-particle" },
  rocks: { color: "rgba(120,120,120,0.5)", size: "4px", animation: "float-particle" },
  oil: { color: "rgba(30,20,10,0.7)", size: "5px", animation: "drip-particle" },
  bubbles: { color: "rgba(200,200,255,0.3)", size: "6px", animation: "rise-bubble" },
};

export default function ParticleField({ type, count = 12 }: { type: ParticleType; count?: number }) {
  const particles = useMemo(() => {
    const ps = particleStyles[type];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: ps.size,
      color: ps.color,
      animation: ps.animation,
    }));
  }, [type, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `${p.animation} ${p.duration} ${p.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
