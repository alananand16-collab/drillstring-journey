import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function AwardsSection() {
  return (
    <section id="awards" className="relative px-4 py-24 lg:py-32 overflow-hidden">
      <SectionBackground imagePath="/images/oil-strike.avif" overlayOpacity={[0.60, 0.70]} />

      {/* PAY ZONE — golden ambient light bleeding through */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(200,140,10,0.08) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(180,120,5,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Oil gush columns — dramatic rising dark liquid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${8 + i * 9}%`,
              width: `${10 + (i % 3) * 8}px`,
              background: `linear-gradient(0deg,
                rgba(15,10,2,0.9) 0%,
                rgba(30,20,4,0.6) 35%,
                rgba(50,32,6,0.3) 65%,
                transparent 100%
              )`,
              animation: `oil-gush-column ${5.5 + (i % 4) * 1.2}s ${i * 0.35}s infinite ease-out`,
              borderRadius: "8px 8px 0 0",
            }}
          />
        ))}
        {/* Oil splatter particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              bottom: `${20 + Math.random() * 30}%`,
              left: `${5 + Math.random() * 90}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              background: `rgba(${20 + Math.random() * 20}, ${12 + Math.random() * 10}, ${Math.random() * 6}, ${0.35 + Math.random() * 0.35})`,
              animation: `oil-splatter ${3.5 + Math.random() * 4}s ${Math.random() * 6}s infinite ease-out`,
            }}
          />
        ))}
        {/* Gold light rays */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              bottom: "10%",
              left: `${15 + i * 16}%`,
              width: "1px",
              height: "40%",
              background: `linear-gradient(0deg, rgba(200,160,20,0.12), transparent)`,
              animation: `float-particle-slow ${8 + i * 1.5}s ${i * 0.8}s infinite ease-in-out`,
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
            <span className="text-yellow-500/60">6,500 FT</span>
            <span className="h-px w-6 bg-yellow-600/20" />
            <span>Pay Zone</span>
          </div>
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{
              background: "linear-gradient(135deg, #c8961f, #f0c040, #a87010)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Oil Strike 🛢️
          </h2>
          <p className="mt-2 text-sm text-yellow-500/30">
            Recognition &amp; achievements surfaced along the journey.
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
                background: "linear-gradient(135deg, rgba(200,150,20,0.06), rgba(160,110,8,0.03))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(200,150,20,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,150,20,0.30)";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(200,140,10,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,150,20,0.12)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(200,150,20,0.08)",
                    border: "1px solid rgba(200,150,20,0.15)",
                  }}
                >
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
    </section>
  );
}
