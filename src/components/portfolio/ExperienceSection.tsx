import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import ExperienceModal from "./ExperienceModal";
import type { Experience } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import SectionBackground from "./SectionBackground";

import logoSPGlobal from "@/assets/logo-spglobal.jpg";
import logoEnverus from "@/assets/logo-enverus.webp";
import logoONGC from "@/assets/logo-ongc.png";

const companyLogoMap: Record<string, string> = {
  "S&P Global": logoSPGlobal,
  Enverus: logoEnverus,
  ONGC: logoONGC,
};

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

export default function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <section id="experience" className="relative px-4 py-28 lg:py-36">
      <SectionBackground imagePath="/images/charcoal-rock.avif" overlayOpacity={[0.68, 0.78]} />

      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: "radial-gradient(ellipse 50% 60% at -10% 50%, rgba(80,60,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
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
            <span style={{ color: "hsl(var(--brand))" }}>0 – 2,500 FT</span>
            <span className="h-px w-8 bg-white/10" />
            <span>Sedimentary Zone</span>
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
            Experience
          </h2>
          <p
            className="mt-3 max-w-xl"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontSize: "15px",
              color: "hsl(215,15%,58%)",
              lineHeight: 1.7,
            }}
          >
            Drilling through layers of data engineering, subsurface analytics, and AI workflow automation.
          </p>
        </motion.div>

        <div className="mt-12 space-y-5">
          {experiences.map((exp, i) => {
            const logoSrc = companyLogoMap[exp.company];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                onClick={() => setSelectedExp(exp)}
                className="group cursor-pointer rounded-2xl p-6 md:p-7 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0,100,200,0.07), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
                }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {logoSrc ? (
                      <img src={logoSrc} alt={exp.company} className="h-full w-full object-cover" />
                    ) : (
                      <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px", color: "hsl(var(--brand))" }}>{exp.logo}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "hsl(210,25%,92%)",
                          }}
                        >
                          {exp.role}
                          {exp.type && (
                            <span
                              className="ml-2"
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontWeight: 500,
                                fontSize: "12px",
                                color: "hsl(var(--brand))",
                              }}
                            >
                              · {exp.type}
                            </span>
                          )}
                        </h3>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 400,
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.32)",
                          }}
                        >
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="hidden sm:inline"
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.22)",
                          }}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    <p
                      className="mt-3 line-clamp-2"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 300,
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.7,
                      }}
                    >
                      {exp.preview}
                    </p>

                    {exp.impact && (
                      <p className="mt-3" style={{ fontSize: "13px", fontFamily: FONT_DISPLAY }}>
                        <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>★ Impact: </span>
                        <span style={{ color: "hsl(var(--brand))", fontWeight: 500 }}>{exp.impact}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ExperienceModal experience={selectedExp} open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)} />
    </section>
  );
}
