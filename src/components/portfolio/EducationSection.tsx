import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="grain-overlay relative px-4 py-24 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #0a0c10 0%, #0c0e14 50%, #080a0f 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>10,000</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Completion Zone</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Education</h2>
          <p className="mt-2 text-sm text-white/40">
            Foundation formation — the geological base that supports every layer above.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl p-5 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
                  style={{
                    background: "hsl(var(--brand) / 0.1)",
                    border: "1px solid hsl(var(--brand) / 0.15)",
                    color: "hsl(var(--brand))",
                  }}
                >
                  {edu.logo}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                  <p className="text-xs text-white/35">{edu.school}</p>
                  <p className="text-[10px] text-white/20 font-mono mt-0.5">{edu.dates}</p>
                </div>
              </div>

              {edu.description && (
                <p className="text-xs text-white/40 leading-relaxed">{edu.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#080a0f] z-[4] pointer-events-none" />
    </section>
  );
}
