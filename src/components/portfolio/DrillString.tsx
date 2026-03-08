import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function DrillString() {
  const { scrollProgress } = useScrollDepth();
  const stringHeight = scrollProgress * 100;

  return (
    <div className="fixed left-[86px] top-0 z-40 hidden h-full lg:block pointer-events-none">
      {/* Drill pipe — steel grey with highlight */}
      <div
        className="absolute top-0 transition-all duration-100"
        style={{
          left: "0",
          width: "4px",
          height: `${stringHeight}%`,
          background: "linear-gradient(90deg, rgba(120,120,120,0.3), rgba(180,180,180,0.5), rgba(120,120,120,0.3))",
          boxShadow: "0 0 6px rgba(150,150,150,0.15)",
        }}
      >
        {/* Pipe joints every ~8% */}
        {Array.from({ length: Math.floor(stringHeight / 8) }, (_, i) => (
          <div
            key={i}
            className="absolute w-[8px] h-[4px] rounded-sm"
            style={{
              top: `${(i + 1) * 8}%`,
              left: "-2px",
              background: "linear-gradient(90deg, rgba(100,100,100,0.4), rgba(200,200,200,0.6), rgba(100,100,100,0.4))",
            }}
          />
        ))}
      </div>

      {/* Drill bit */}
      <div
        className="absolute transition-all duration-100"
        style={{
          left: "-8px",
          top: `calc(${stringHeight}% - 4px)`,
          width: "20px",
          height: "28px",
        }}
      >
        <svg viewBox="0 0 20 28" className="w-full h-full" style={{ animation: "drill-spin 2s linear infinite" }}>
          {/* Bit body */}
          <polygon points="10,28 2,8 10,2 18,8" fill="hsl(var(--brand))" opacity="0.9" />
          <polygon points="10,28 2,8 10,2 18,8" fill="none" stroke="hsl(var(--brand))" strokeWidth="0.5" opacity="0.5" />
          {/* Bit cutters */}
          <circle cx="7" cy="14" r="1.5" fill="rgba(255,255,255,0.3)" />
          <circle cx="13" cy="14" r="1.5" fill="rgba(255,255,255,0.3)" />
          <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.2)" />
          {/* Connection to pipe */}
          <rect x="8" y="0" width="4" height="6" fill="rgba(180,180,180,0.5)" rx="1" />
        </svg>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--brand) / 0.2) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
    </div>
  );
}
