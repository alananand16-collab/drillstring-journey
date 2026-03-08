import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function DrillString() {
  const { scrollProgress } = useScrollDepth();

  return (
    <div className="fixed left-[63px] top-0 z-40 hidden h-full lg:block pointer-events-none">
      {/* Drill pipe — thin subtle accent */}
      <div
        className="absolute top-0 transition-all duration-100"
        style={{
          left: "0",
          width: "1px",
          height: `${scrollProgress * 100}%`,
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Small drill bit dot at bottom */}
      <div
        className="absolute transition-all duration-100"
        style={{
          left: "-2px",
          top: `calc(${scrollProgress * 100}% - 3px)`,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "hsl(var(--brand) / 0.4)",
          boxShadow: "0 0 6px hsl(var(--brand) / 0.3)",
        }}
      />
    </div>
  );
}
