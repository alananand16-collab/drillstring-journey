import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function DrillString() {
  const { scrollProgress } = useScrollDepth();
  const stringHeight = scrollProgress * 100;

  return (
    <div className="fixed left-[72px] top-0 z-40 hidden h-full lg:block pointer-events-none">
      {/* Drill pipe */}
      <div
        className="absolute left-0 top-0 w-[3px] bg-gradient-to-b from-muted-foreground/60 to-muted-foreground/30 transition-all duration-100"
        style={{ height: `${stringHeight}%` }}
      />
      {/* Drill bit */}
      <div
        className="absolute left-[-6px] w-[15px] h-[20px] transition-all duration-100"
        style={{ top: `${stringHeight}%` }}
      >
        <svg viewBox="0 0 15 20" className="animate-drill-spin w-full h-full">
          <polygon points="7.5,20 0,5 7.5,0 15,5" fill="hsl(var(--brand))" opacity="0.8" />
          <line x1="7.5" y1="0" x2="7.5" y2="8" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
