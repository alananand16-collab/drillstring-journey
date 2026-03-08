import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative min-h-screen px-4 py-20"
      style={{ background: "linear-gradient(180deg, #0a0800 0%, #151515 40%, #1a1a1a 100%)" }}
    >
      {/* Casing pipe visual */}
      <div className="absolute left-8 top-0 bottom-0 hidden w-6 lg:block pointer-events-none">
        <div className="h-full w-full rounded border-2 border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02]" />
        {/* Casing joints */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-[-2px] right-[-2px] h-3 rounded border border-white/15 bg-white/5"
            style={{ top: `${(i + 1) * 12}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Education
        </motion.h2>
        <p className="mb-12 text-center text-sm text-white/50">~3500m — Completion Zone</p>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[7px] text-white/40">
                  {edu.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-brand" />
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-sm text-white/50">{edu.school} • {edu.dates}</p>
                </div>
              </div>

              {edu.coursework && (
                <div className="mb-3">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <span key={c} className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs text-brand/80">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.extras && (
                <ul className="space-y-1">
                  {edu.extras.map((e) => (
                    <li key={e} className="flex gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/50" />
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
