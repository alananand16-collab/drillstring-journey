import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-oil-rig.jpg";
import portrait from "@/assets/alan-portrait.jpg";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax: image moves up slower than scroll, fades out
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Parallax background image — sinks away as you scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY, opacity: imgOpacity }}
      >
        <img
          src={heroImg}
          alt="Oil rig at night"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(5,8,17,0.35) 0%,
                rgba(5,8,17,0.55) 40%,
                rgba(5,8,17,0.82) 75%,
                rgba(5,8,17,1) 100%
              ),
              radial-gradient(ellipse at 50% 25%, transparent 25%, rgba(5,8,17,0.6) 100%)
            `,
          }}
        />
        {/* Cool blue moonlight ambient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(0,60,200,0.10) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Surface dust/spark particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${15 + Math.random() * 65}%`,
              width: `${1.5 + Math.random() * 2.5}px`,
              height: `${1.5 + Math.random() * 2.5}px`,
              background: `rgba(${200 + Math.random() * 55}, ${175 + Math.random() * 40}, ${90 + Math.random() * 50}, ${0.25 + Math.random() * 0.35})`,
              animation: `float-particle ${6 + Math.random() * 9}s ${Math.random() * 6}s infinite ease-in-out`,
            }}
          />
        ))}
        {/* Sparks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`spark-${i}`}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
              width: "1px",
              height: `${4 + Math.random() * 6}px`,
              background: `rgba(255,200,80,${0.3 + Math.random() * 0.4})`,
              borderRadius: "1px",
              animation: `float-particle ${3 + Math.random() * 4}s ${Math.random() * 4}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Content — split layout: text left, portrait right */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 md:px-12 lg:px-20 mt-16 lg:mt-0 w-full max-w-7xl mx-auto"
      >
        {/* Left: Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          {/* Depth info line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/30"
          >
            <span>0 FT</span>
            <span className="h-px w-8 bg-white/20" />
            <span>Surface Level</span>
            <span className="h-px w-8 bg-white/20" />
            <span>Drill Zone</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mb-3 text-5xl font-bold text-white md:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
          >
            Alan
            <br />
            Anand
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-4 text-base text-white/60 md:text-lg font-light"
          >
            Digital Subsurface &amp; Data Architect
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mb-8 max-w-lg text-sm text-white/40 leading-relaxed"
          >
            M.Eng Petroleum Engineering candidate bridging subsurface geoscience
            with{" "}
            <span style={{ color: "hsl(var(--brand))" }}>Python automation</span>,{" "}
            <span style={{ color: "hsl(var(--brand))" }}>SQL architectures</span>, and{" "}
            <span style={{ color: "hsl(var(--brand))" }}>AI workflows</span>.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mb-10 flex gap-6 md:gap-10"
          >
            {[
              { value: "4+", label: "YRS EXP" },
              { value: "200+", label: "AI MODELS" },
              { value: "30%", label: "EFFICIENCY ↑" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
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
          </motion.div>

          {/* CTA button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToExperience}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col items-center lg:items-start gap-2"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <span
              className="rounded-full border px-5 py-2 text-[10px] font-medium tracking-[0.3em] uppercase transition-all duration-300 group-hover:border-white/30 group-hover:text-white/70"
              style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)" }}
            >
              Begin Descent
            </span>
            <div className="flex flex-col items-center mt-1">
              <ChevronDown className="h-4 w-4 animate-bounce" style={{ animationDuration: "1.4s" }} />
              <ChevronDown className="h-4 w-4 animate-bounce opacity-35 -mt-2" style={{ animationDuration: "1.4s", animationDelay: "0.18s" }} />
            </div>
          </motion.button>
        </div>

        {/* Right: Large portrait */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          {/* Ambient glow behind portrait */}
          <div
            className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl"
            style={{ background: "hsl(var(--brand))" }}
          />
          <div
            className="absolute -inset-4 rounded-2xl opacity-10 blur-2xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--brand)), transparent)" }}
          />

          {/* Portrait container — ~25vh on all screens */}
          <div
            className="relative w-[260px] h-[340px] md:w-[300px] md:h-[400px] lg:w-[340px] lg:h-[440px] rounded-2xl overflow-hidden border"
            style={{
              borderColor: "hsla(var(--brand) / 0.3)",
              boxShadow: "0 0 40px hsla(var(--brand) / 0.15), 0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={portrait}
              alt="Alan Anand"
              className="h-full w-full object-cover object-top"
            />
            {/* Bottom fade into dark */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 50%, rgba(5,8,17,0.6) 85%, rgba(5,8,17,0.9) 100%)`,
              }}
            />
            {/* Side vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,17,0.4) 100%)",
              }}
            />
            {/* Brand accent line at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--brand)), transparent)" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom blend — merges into geological journey below */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[4]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(8,10,15,0.7) 60%, rgba(8,11,16,1) 100%)" }}
      />
    </section>
  );
}
