import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import { Trophy, ChevronRight } from "lucide-react";
import ExperienceModal from "./ExperienceModal";
import ParticleField from "./ParticleField";

export default function ExperienceSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="grain-overlay-heavy rock-cracks relative min-h-screen px-4 py-20"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(60,60,60,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 80%, rgba(40,40,40,0.3) 0%, transparent 50%),
          linear-gradient(180deg, #3d3d3d 0%, #2f2f2f 25%, #252525 50%, #1e1e1e 75%, #1a1a1a 100%)
        `,
      }}
    >
      <ParticleField type="rocks" count={25} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Professional Experience</h2>
          <p className="text-sm text-white/40">~1500m — Shale Zone</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
              className={`${i % 2 === 0 ? "md:mr-auto md:pr-20" : "md:ml-auto md:pl-20"} md:w-[72%]`}
              onClick={() => setSelectedIdx(i)}
            >
              <div
                className="group cursor-pointer rounded-2xl p-6 transition-all duration-500 glass-card-dark hover:border-brand/30"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.4), 0 0 24px hsl(214 100% 35.3% / 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
                }}
              >
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex h-12 w-24 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[9px] font-medium text-white/35">
                    {exp.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-brand transition-colors">{exp.role}</h3>
                    <p className="text-xs text-white/40">{exp.company} • {exp.dates}</p>
                  </div>
                  {exp.awards && (
                    <Trophy className="h-4 w-4 text-yellow-500/70 group-hover:text-yellow-500 transition-colors" />
                  )}
                </div>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{exp.preview}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-white/20 group-hover:text-brand/60 transition-colors">
                  <span>View details</span>
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExperienceModal
        experience={selectedIdx !== null ? experiences[selectedIdx] : null}
        open={selectedIdx !== null}
        onOpenChange={(open) => !open && setSelectedIdx(null)}
      />

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#3d2b0f] z-[4] pointer-events-none" />
    </section>
  );
}
