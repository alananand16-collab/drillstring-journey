import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import { Trophy } from "lucide-react";
import ExperienceModal from "./ExperienceModal";
import ParticleField from "./ParticleField";

export default function ExperienceSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative min-h-screen px-4 py-20"
      style={{ background: "linear-gradient(180deg, #3d3d3d 0%, #2a2a2a 50%, #1e1e1e 100%)" }}
    >
      <ParticleField type="rocks" count={10} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Professional Experience
        </motion.h2>
        <p className="mb-12 text-center text-sm text-white/50">~1500m — Shale Zone</p>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`cursor-pointer ${i % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"} md:w-[75%]`}
              onClick={() => setSelectedIdx(i)}
            >
              <div className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand/40 hover:shadow-[0_0_20px_rgba(0,70,180,0.15)]">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-20 items-center justify-center rounded border border-white/10 bg-white/5 text-[8px] text-white/40">
                    {exp.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <p className="text-xs text-white/50">{exp.company} • {exp.dates}</p>
                  </div>
                  {exp.awards && (
                    <Trophy className="h-4 w-4 text-yellow-500 opacity-70" />
                  )}
                </div>
                <p className="text-sm text-brand/80">{exp.preview}</p>
                <p className="mt-2 text-[11px] text-white/30 group-hover:text-white/50">Click to expand →</p>
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
    </section>
  );
}
