import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";
import SectionBackground from "./SectionBackground";

export default function EducationSection() {
  return (
    <section id="education" className="relative px-4 py-24 lg:py-32">
      <SectionBackground imagePath="/images/industrial.avif" overlayOpacity={[0.70, 0.78]} />

      {/* Completion zone — steel-grey ambient */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 40% at 30% 50%, rgba(20,30,45,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>10,000 FT</span>
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
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.055)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.2)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(0,100,200,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.055)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
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
    </section>
  );
}
