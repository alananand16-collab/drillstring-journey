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
      className="grain-overlay relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(74,124,89,0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 30% 80%, rgba(107,91,62,0.5) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 60%, rgba(60,80,45,0.3) 0%, transparent 50%),
          linear-gradient(180deg, #1a2e1a 0%, #2d4a2e 15%, #4a7c59 35%, #8B7355 65%, #6b5b3e 85%, #5a4830 100%)
        `,
      }}
    >
      <ParticleField type="dust" count={30} />

      {/* Full-width drill rig derrick SVG */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-[2]">
        <svg
          viewBox="0 0 600 500"
          className="w-full max-w-3xl opacity-25 mt-[-20px]"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Derrick legs */}
          <line x1="180" y1="400" x2="270" y2="30" stroke="#aaa" strokeWidth="3" />
          <line x1="420" y1="400" x2="330" y2="30" stroke="#aaa" strokeWidth="3" />
          {/* Cross braces */}
          <line x1="210" y1="320" x2="390" y2="320" stroke="#888" strokeWidth="1.5" />
          <line x1="220" y1="240" x2="380" y2="240" stroke="#888" strokeWidth="1.5" />
          <line x1="235" y1="160" x2="365" y2="160" stroke="#888" strokeWidth="1.5" />
          <line x1="250" y1="100" x2="350" y2="100" stroke="#888" strokeWidth="1.5" />
          {/* Diagonal braces */}
          <line x1="210" y1="320" x2="380" y2="240" stroke="#777" strokeWidth="1" opacity="0.6" />
          <line x1="390" y1="320" x2="220" y2="240" stroke="#777" strokeWidth="1" opacity="0.6" />
          <line x1="220" y1="240" x2="365" y2="160" stroke="#777" strokeWidth="1" opacity="0.6" />
          <line x1="380" y1="240" x2="235" y2="160" stroke="#777" strokeWidth="1" opacity="0.6" />
          <line x1="235" y1="160" x2="350" y2="100" stroke="#777" strokeWidth="1" opacity="0.6" />
          <line x1="365" y1="160" x2="250" y2="100" stroke="#777" strokeWidth="1" opacity="0.6" />
          {/* Crown block */}
          <rect x="275" y="20" width="50" height="20" rx="3" fill="#999" opacity="0.7" />
          {/* Traveling block / hook */}
          <rect x="290" y="45" width="20" height="12" rx="2" fill="#888" opacity="0.6" />
          <line x1="300" y1="57" x2="300" y2="80" stroke="#aaa" strokeWidth="2.5" />
          {/* Kelly / drill string going down */}
          <rect x="297" y="80" width="6" height="320" fill="#999" opacity="0.5" />
          {/* Rotary table / platform */}
          <rect x="150" y="395" width="300" height="12" rx="2" fill="#777" opacity="0.5" />
          <rect x="140" y="407" width="320" height="6" rx="1" fill="#666" opacity="0.4" />
          {/* Substructure */}
          <rect x="160" y="413" width="10" height="40" fill="#777" opacity="0.4" />
          <rect x="430" y="413" width="10" height="40" fill="#777" opacity="0.4" />
          <rect x="155" y="450" width="290" height="5" rx="1" fill="#666" opacity="0.3" />
          {/* Draw works (right side) */}
          <rect x="430" y="340" width="50" height="35" rx="4" fill="#888" opacity="0.35" />
          <circle cx="455" cy="357" r="10" fill="none" stroke="#999" strokeWidth="1.5" opacity="0.4" />
          {/* Mud pump (left side) */}
          <rect x="100" y="420" width="45" height="25" rx="3" fill="#888" opacity="0.3" />
          {/* Wire line from draw works to crown */}
          <line x1="455" y1="340" x2="320" y2="28" stroke="#aaa" strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
          {/* Pipe rack */}
          <line x1="460" y1="450" x2="550" y2="450" stroke="#777" strokeWidth="2" opacity="0.3" />
          <line x1="470" y1="430" x2="470" y2="450" stroke="#777" strokeWidth="1.5" opacity="0.3" />
          <line x1="540" y1="430" x2="540" y2="450" stroke="#777" strokeWidth="1.5" opacity="0.3" />
          {/* Ground line */}
          <line x1="0" y1="455" x2="600" y2="455" stroke="#555" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center mt-16"
      >
        {/* AA Avatar with glow pulse */}
        <div
          className="mb-8 flex h-36 w-36 items-center justify-center rounded-full border-4 border-brand"
          style={{
            animation: "glow-pulse 3s ease-in-out infinite",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-5xl font-bold text-brand" style={{ animation: "text-glow 3s ease-in-out infinite" }}>
            AA
          </span>
        </div>

        <h1 className="mb-3 text-5xl font-bold text-white md:text-7xl tracking-tight">
          Alan Anand
        </h1>
        <p className="mb-3 max-w-xl text-lg text-white/75 md:text-xl font-light">
          M.Eng Petroleum Engineering Candidate | Energy Data & Automation Professional
        </p>
        <p className="mb-12 text-lg italic text-white/50 font-light">
          "Drilling through data to strike insight."
        </p>

        <motion.button
          onClick={scrollToAbout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex flex-col items-center gap-3 rounded-2xl border border-brand/30 bg-brand/10 px-8 py-4 text-brand transition-all hover:bg-brand/20 hover:border-brand/50"
          style={{ boxShadow: "0 0 20px hsl(var(--brand) / 0.15), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <span className="text-sm font-bold tracking-[0.25em] uppercase">Begin Descent</span>
          <div className="flex flex-col items-center gap-0.5">
            <ChevronDown className="h-5 w-5 animate-bounce" style={{ animationDuration: "1.5s" }} />
            <ChevronDown className="h-5 w-5 animate-bounce opacity-50" style={{ animationDuration: "1.5s", animationDelay: "0.15s" }} />
          </div>
        </motion.button>
      </motion.div>

      {/* Bottom gradient blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#6b5b3e] z-[4] pointer-events-none" />
    </section>
  );
}
