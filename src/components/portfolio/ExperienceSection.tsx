import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import ExperienceModal from "./ExperienceModal";
import type { Experience } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <section
      id="experience"
      className="grain-overlay relative px-4 py-24 lg:py-32"
      style={{
        background: `
          linear-gradient(180deg, #080a0f 0%, #0c0e14 30%, #10121a 70%, #0e1018 100%)
        `,
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>0 – 2,500 FT</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Shale Zone</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Experience</h2>
          <p className="mt-2 text-sm text-white/40 max-w-xl">
            Drilling through layers of data engineering, subsurface analytics, and AI workflow automation.
          </p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedExp(exp)}
              className="group cursor-pointer rounded-xl p-5 md:p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(0,100,200,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "hsl(var(--brand))",
                  }}
                >
                  {exp.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {exp.role}
                        {exp.type && (
                          <span className="ml-2 text-[10px] font-medium" style={{ color: "hsl(var(--brand))" }}>
                            · {exp.type}
                          </span>
                        )}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/35">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-white/25 hidden sm:inline">
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-white/45 leading-relaxed line-clamp-2">
                    {exp.preview}
                  </p>

                  {exp.impact && (
                    <p className="mt-2 text-[11px]">
                      <span className="text-white/25">★ Impact: </span>
                      <span style={{ color: "hsl(var(--brand))" }}>{exp.impact}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExperienceModal experience={selectedExp} open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0c12] z-[4] pointer-events-none" />
    </section>
  );
}
