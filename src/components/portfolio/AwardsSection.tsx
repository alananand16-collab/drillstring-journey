import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy } from "lucide-react";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="grain-overlay-heavy relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 60%, rgba(50,35,10,0.5) 0%, transparent 60%),
          linear-gradient(180deg, #1a1000 0%, #120a00 40%, #0a0600 70%, #050300 100%)
        `,
      }}
    >
      {/* Oil gush columns rising from bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${8 + i * 9}%`,
              width: `${15 + Math.random() * 25}px`,
              background: `linear-gradient(0deg, rgba(30,20,5,0.9), rgba(60,40,10,0.6) 40%, rgba(40,25,5,0.3) 70%, transparent)`,
              animation: `oil-gush-column ${4 + Math.random() * 3}s ${i * 0.3}s infinite ease-out`,
              borderRadius: "8px 8px 0 0",
            }}
          />
        ))}
        {/* Oil splatter particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`splat-${i}`}
            className="absolute rounded-full"
            style={{
              bottom: "20%",
              left: `${10 + Math.random() * 80}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `rgba(${30 + Math.random() * 40}, ${15 + Math.random() * 20}, ${Math.random() * 10}, ${0.5 + Math.random() * 0.4})`,
              animation: `oil-splatter ${3 + Math.random() * 4}s ${Math.random() * 5}s infinite ease-out`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="text-6xl">🛢️</span>
          </div>
          <h2 className="mb-2 text-4xl font-bold md:text-5xl"
            style={{
              background: "linear-gradient(135deg, #d4af37, #ffd700, #b8860b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Oil Strike!
          </h2>
          <p className="text-sm text-yellow-500/40">~3000m — Pay Zone</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-2xl p-5 transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(184,134,11,0.04))",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,215,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,215,0,0.1)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,215,0,0.05)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)";
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-yellow-400/90">{award.title}</p>
                  <p className="mt-0.5 text-xs text-yellow-500/40">{award.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0800] z-[4] pointer-events-none" />
    </section>
  );
}
