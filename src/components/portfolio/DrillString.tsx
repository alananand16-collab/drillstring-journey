import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function DrillString() {
  const { scrollProgress } = useScrollDepth();

  return (
    <div className="fixed left-[63px] top-0 z-40 hidden h-full lg:block pointer-events-none">
      {/* Full-length pipe track — always visible, very subtle */}
      <div
        className="absolute top-0 left-0 w-[1.5px] h-full"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.04) 100%)",
        }}
      />

      {/* Pipe sections — the "drilled" portion fills in brand blue */}
      <div
        className="absolute top-0 left-0 transition-all duration-100"
        style={{
          width: "1.5px",
          height: `${scrollProgress * 100}%`,
          background: `linear-gradient(180deg,
            rgba(0,100,220,0.15) 0%,
            rgba(0,90,200,0.25) 60%,
            rgba(0,80,180,0.35) 100%
          )`,
        }}
      />

      {/* Pipe joint tick marks along the drilled section */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pct) =>
        scrollProgress * 100 > pct ? (
          <div
            key={pct}
            className="absolute"
            style={{
              top: `${pct}%`,
              left: "-2px",
              width: "5px",
              height: "1px",
              background: "rgba(0,100,220,0.2)",
            }}
          />
        ) : null
      )}

      {/* Drill bit glow at the current depth */}
      <div
        className="absolute transition-all duration-100"
        style={{
          left: "-3px",
          top: `calc(${scrollProgress * 100}% - 4px)`,
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "hsl(var(--brand))",
          boxShadow: "0 0 10px 3px hsl(var(--brand) / 0.4), 0 0 20px 6px hsl(var(--brand) / 0.15)",
        }}
      />
    </div>
  );
}
