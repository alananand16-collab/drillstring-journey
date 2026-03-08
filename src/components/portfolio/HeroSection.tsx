import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticleField from "./ParticleField";

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #2d4a2e 0%, #4a7c59 30%, #8B7355 70%, #6b5b3e 100%)" }}
    >
      <ParticleField type="dust" count={15} />

      {/* Drill rig silhouette */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <svg width="120" height="200" viewBox="0 0 120 200">
          <rect x="55" y="0" width="10" height="180" fill="#333" />
          <polygon points="30,60 60,0 90,60" fill="none" stroke="#444" strokeWidth="2" />
          <rect x="20" y="60" width="80" height="15" rx="2" fill="#333" />
          <rect x="40" y="75" width="40" height="8" fill="#444" />
          <rect x="57" y="83" width="6" height="120" fill="#555" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center"
      >
        {/* AA Avatar */}
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-brand bg-background/10 backdrop-blur-sm">
          <span className="text-4xl font-bold text-brand">AA</span>
        </div>

        <h1 className="mb-2 text-4xl font-bold text-white md:text-6xl">Alan Anand</h1>
        <p className="mb-2 text-lg text-white/80 md:text-xl">
          M.Eng Petroleum Engineering Candidate | Energy Data & Automation Professional
        </p>
        <p className="mb-8 text-base italic text-white/60">
          "Drilling through data to strike insight."
        </p>

        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-brand"
        >
          <span className="text-sm font-medium tracking-wider uppercase">Begin Descent</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
