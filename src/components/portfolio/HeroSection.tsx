import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-oil-rig.jpg";

export default function HeroSection() {
  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Oil rig at night"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(5,8,15,0.4) 0%, rgba(5,8,15,0.6) 40%, rgba(5,8,15,0.85) 75%, rgba(5,8,15,1) 100%),
              radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(5,8,15,0.7) 100%)
            `,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: `rgba(${200 + Math.random() * 55}, ${180 + Math.random() * 40}, ${100 + Math.random() * 50}, ${0.3 + Math.random() * 0.4})`,
              animation: `float-particle ${5 + Math.random() * 8}s ${Math.random() * 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4 mt-16"
      >
        {/* Depth info line */}
        <div className="mb-6 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/30">
          <span>0 FT</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Surface Level</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Drill Zone</span>
        </div>

        {/* Avatar */}
        <div
          className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2"
          style={{
            borderColor: "hsl(var(--brand))",
            animation: "glow-pulse 3s ease-in-out infinite",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="text-3xl font-bold"
            style={{ color: "hsl(var(--brand))", animation: "text-glow 3s ease-in-out infinite" }}
          >
            AA
          </span>
        </div>

        <h1 className="mb-3 text-5xl font-bold text-white md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
          Alan
          <br />
          Anand
        </h1>

        <p className="mb-4 text-base text-white/60 md:text-lg font-light">
          Digital Subsurface & Data Architect
        </p>

        <p className="mb-8 max-w-lg text-sm text-white/40 leading-relaxed">
          M.Eng Petroleum Engineering candidate bridging subsurface geoscience
          with{" "}
          <span style={{ color: "hsl(var(--brand))" }}>Python automation</span>,{" "}
          <span style={{ color: "hsl(var(--brand))" }}>SQL architectures</span>, and{" "}
          <span style={{ color: "hsl(var(--brand))" }}>AI workflows</span>.
        </p>

        {/* Stats */}
        <div className="mb-10 flex gap-6 md:gap-10">
          {[
            { value: "4+", label: "YRS EXP" },
            { value: "200+", label: "AI MODELS" },
            { value: "30%", label: "EFFICIENCY ↑" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "hsl(var(--brand))" }}
              >
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.15em] text-white/30 uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={scrollToExperience}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group flex flex-col items-center gap-2 text-white/50 hover:text-white/70 transition-colors"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Begin Drilling</span>
          <div className="flex flex-col items-center">
            <ChevronDown className="h-4 w-4 animate-bounce" style={{ animationDuration: "1.5s" }} />
            <ChevronDown className="h-4 w-4 animate-bounce opacity-40 -mt-2" style={{ animationDuration: "1.5s", animationDelay: "0.15s" }} />
          </div>
        </motion.button>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#080a0f] z-[4] pointer-events-none" />
    </section>
  );
}
