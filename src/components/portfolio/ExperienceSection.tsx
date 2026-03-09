import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import ExperienceModal from "./ExperienceModal";
import type { Experience } from "@/data/portfolioData";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
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
          className="mb-14"
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

        <div className="space-y-6">
          {experiences.map((exp, i) => {
            const logoSrc = companyLogoMap[exp.company];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onClick={() => setSelectedExp(exp)}
                className="group cursor-pointer rounded-2xl transition-all duration-400 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(12,16,30,0.85) 0%, rgba(8,12,24,0.7) 100%)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(100,160,255,0.18)";
                  e.currentTarget.style.boxShadow = "0 8px 50px rgba(0,60,180,0.1), 0 0 0 1px rgba(100,160,255,0.06)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex">
                  {/* Left accent bar with brand gradient */}
                  <div
                    className="hidden sm:block shrink-0 transition-all duration-400"
                    style={{
                      width: "4px",
                      background: "linear-gradient(180deg, hsl(var(--brand)) 0%, hsl(var(--brand) / 0.3) 100%)",
                      opacity: 0.6,
                    }}
                  />

                  <div className="flex-1 p-7 md:p-8">
                    {/* Top row: Logo + Company + Dates */}
                    <div className="flex items-center gap-5 mb-5">
                      <div
                        className="flex shrink-0 items-center justify-center rounded-xl overflow-hidden"
                        style={{
                          width: "56px",
                          height: "56px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                        }}
                      >
                        {logoSrc ? (
                          <img src={logoSrc} alt={exp.company} className="h-full w-full object-cover" />
                        ) : (
                          <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "15px", color: "hsl(210,80%,70%)" }}>{exp.logo}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 700,
                            fontSize: "20px",
                            color: "hsl(0,0%,100%)",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.2,
                          }}
                        >
                          {exp.company}
                        </h3>
                        <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                          <span
                            style={{
                              fontFamily: FONT_DISPLAY,
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "hsl(210,80%,72%)",
                            }}
                          >
                            {exp.role}
                          </span>
                          {exp.type && (
                            <span
                              className="rounded-full px-3 py-0.5"
                              style={{
                                fontFamily: FONT_DISPLAY,
                                fontWeight: 500,
                                fontSize: "11px",
                                color: "hsl(210,60%,70%)",
                                background: "rgba(80,140,255,0.08)",
                                border: "1px solid rgba(80,140,255,0.12)",
                              }}
                            >
                              {exp.type}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "hsl(210,70%,65%)" }}
                      />
                    </div>

                    {/* Meta row: Location + Dates */}
                    <div className="flex items-center gap-5 mb-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" style={{ color: "hsl(210,20%,45%)" }} />
                        <span
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 400,
                            fontSize: "13px",
                            color: "hsl(210,15%,52%)",
                          }}
                        >
                          {exp.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" style={{ color: "hsl(210,20%,45%)" }} />
                        <span
                          style={{
                            fontFamily: FONT_MONO,
                            fontSize: "12px",
                            color: "hsl(210,15%,48%)",
                          }}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="line-clamp-2"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 300,
                        fontSize: "14px",
                        color: "hsl(210,10%,60%)",
                        lineHeight: 1.75,
                      }}
                    >
                      {exp.preview}
                    </p>

                    {/* Impact */}
                    {exp.impact && (
                      <div
                        className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2.5"
                        style={{
                          background: "rgba(60,130,255,0.05)",
                          border: "1px solid rgba(60,130,255,0.08)",
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>⚡</span>
                        <span
                          style={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 500,
                            fontSize: "13px",
                            color: "hsl(210,70%,72%)",
                          }}
                        >
                          {exp.impact}
                        </span>
                      </div>
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
