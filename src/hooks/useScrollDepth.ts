import { useState, useEffect } from "react";

const MAX_DEPTH = 4000;

const formations = [
  { maxDepth: 100, name: "Surface" },
  { maxDepth: 500, name: "Shallow Formation" },
  { maxDepth: 1200, name: "Sandstone" },
  { maxDepth: 2200, name: "Shale" },
  { maxDepth: 2800, name: "Reservoir" },
  { maxDepth: 3200, name: "Pay Zone" },
  { maxDepth: 3800, name: "Completion Zone" },
  { maxDepth: 4000, name: "Bottom Hole" },
];

function getFormationName(depth: number): string {
  for (const f of formations) {
    if (depth <= f.maxDepth) return f.name;
  }
  return "Bottom Hole";
}

export function useScrollDepth() {
  const [depth, setDepth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(window.scrollY / scrollable, 1);
      setScrollProgress(progress);
      setDepth(Math.round(progress * MAX_DEPTH));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { depth, scrollProgress, formationName: getFormationName(depth) };
}
