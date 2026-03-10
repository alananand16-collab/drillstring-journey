import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";
import SectionBackground from "./SectionBackground";

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

export default function EducationSection() {
  return (
    <section id="education" className="relative px-4 py-28 lg:py-36">
      <SectionBackground imagePath="/images/industrial.avif" overlayOpacity={[0.70, 0.78]} />

      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 40% at 30% 50%, rgba(20,30,45,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div
            className="mb-4 flex items-center gap-3"
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ color: "hsl(var(--brand))" }}>10,000 FT</span>
            <span className="h-px w-8 bg-white/10" />
            <span>Completion Zone</span>
          </div>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "hsl(210,30%,95%)",
              letterSpacing: "-0.02em",
            }}
          >
            Education
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontSize: "15px",
              color: "hsl(215,15%,58%)",
            }}
          >
            Foundation formation — the geological base that supports every layer above.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.2)";
                e.currentTarget.style.boxShadow = "0 0 28px rgba(0,100,200,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "hsl(var(--brand) / 0.1)",
                    border: "1px solid hsl(var(--brand) / 0.15)",
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "hsl(var(--brand))",
                  }}
                >
                  {edu.logo}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "hsl(210,25%,92%)",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    className="mt-0.5"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 400,
                      fontSize: "13px",
                      color: "hsl(215,12%,55%)",
                    }}
                  >
                    {edu.school}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.18)",
                    }}
                  >
                    {edu.dates}
                  </p>
                </div>
              </div>

              {edu.description && (
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 300,
                    fontSize: "14px",
                    color: "hsl(215,12%,55%)",
                    lineHeight: 1.7,
                  }}
                >
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
