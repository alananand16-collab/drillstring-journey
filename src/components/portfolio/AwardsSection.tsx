import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy } from "lucide-react";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="grain-overlay relative px-4 py-24 lg:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 70%, rgba(40,30,10,0.3) 0%, transparent 60%),
          linear-gradient(180deg, #100e14 0%, #0f0d12 30%, #12100a 60%, #0e0c0a 100%)
        `,
      }}
    >
      {/* Oil gush columns behind content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${10 + i * 11}%`,
              width: `${12 + Math.random() * 20}px`,
              background: `linear-gradient(0deg, rgba(25,18,5,0.8), rgba(50,35,10,0.4) 40%, transparent)`,
              animation: `oil-gush-column ${5 + Math.random() * 4}s ${i * 0.4}s infinite ease-out`,
              borderRadius: "6px 6px 0 0",
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              bottom: "30%",
              left: `${5 + Math.random() * 90}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              background: `rgba(${30 + Math.random() * 30}, ${15 + Math.random() * 15}, ${Math.random() * 8}, ${0.4 + Math.random() * 0.4})`,
              animation: `oil-splatter ${3 + Math.random() * 4}s ${Math.random() * 5}s infinite ease-out`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span className="text-yellow-600/60">6,000</span>
            <span className="h-px w-6 bg-yellow-600/20" />
            <span>Pay Zone</span>
          </div>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{
              background: "linear-gradient(135deg, #d4af37, #ffd700, #b8860b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Oil Strike! 🛢️
          </h2>
          <p className="mt-2 text-sm text-yellow-500/30">
            Recognition & achievements earned along the journey.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-4 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(184,134,11,0.03))",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/8 border border-yellow-500/15">
                  <Trophy className="h-3.5 w-3.5 text-yellow-500/70" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-yellow-400/80">{award.title}</p>
                  <p className="mt-0.5 text-[10px] text-yellow-500/30">{award.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0c10] z-[4] pointer-events-none" />
    </section>
  );
}
