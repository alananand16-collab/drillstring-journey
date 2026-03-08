import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="grain-overlay relative min-h-screen px-4 py-20"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(30,30,30,0.3) 0%, transparent 60%),
          linear-gradient(180deg, #0a0800 0%, #121212 30%, #181818 60%, #1a1a1a 100%)
        `,
      }}
    >
      {/* Casing pipe visual */}
      <div className="absolute left-6 top-0 bottom-0 hidden w-8 lg:block pointer-events-none z-[2]">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, rgba(80,80,80,0.15), rgba(160,160,160,0.12), rgba(80,80,80,0.15))",
            border: "1px solid rgba(200,200,200,0.06)",
            borderRadius: "4px",
          }}
        />
        {/* Casing joints */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded"
            style={{
              top: `${(i + 1) * 9}%`,
              left: "-3px",
              right: "-3px",
              height: "6px",
              background: "linear-gradient(90deg, rgba(100,100,100,0.2), rgba(180,180,180,0.15), rgba(100,100,100,0.2))",
              border: "1px solid rgba(200,200,200,0.08)",
            }}
          />
        ))}
        {/* Cement annulus */}
        <div
          className="absolute left-[-6px] top-0 bottom-0 w-[4px]"
          style={{ background: "linear-gradient(180deg, rgba(180,180,170,0.06), rgba(160,160,150,0.04))" }}
        />
        <div
          className="absolute right-[-6px] top-0 bottom-0 w-[4px]"
          style={{ background: "linear-gradient(180deg, rgba(180,180,170,0.06), rgba(160,160,150,0.04))" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Education</h2>
          <p className="text-sm text-white/40">~3500m — Completion Zone</p>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card-dark rounded-2xl p-6 md:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[8px] text-white/35">
                  {edu.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-sm text-white/40">{edu.school} • {edu.dates}</p>
                </div>
              </div>

              {edu.coursework && (
                <div className="mb-4">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/25">Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="rounded-full px-3 py-1.5 text-xs text-brand/80 transition-colors hover:text-brand"
                        style={{
                          background: "hsl(var(--brand) / 0.08)",
                          border: "1px solid hsl(var(--brand) / 0.15)",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.extras && (
                <ul className="space-y-2">
                  {edu.extras.map((e) => (
                    <li key={e} className="flex gap-2 text-sm text-white/55">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "hsl(var(--brand) / 0.5)" }} />
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#111] z-[4] pointer-events-none" />
    </section>
  );
}
