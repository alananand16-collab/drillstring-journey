import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

import type { Experience } from "@/data/portfolioData";

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

type Props = {
  experience: Experience;
  index: number;
  onSelect: () => void;
};

export default function ExperienceCard({ experience: exp, index: i, onSelect }: Props) {
  const logoSrc = companyLogoMap[exp.company];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      onClick={onSelect}
      className={
        "group cursor-pointer overflow-hidden rounded-2xl border border-experience-border/40 bg-gradient-to-br from-experience-surface/85 to-experience-surface-2/70 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-experience-accent-warm/45 hover:shadow-[0_18px_60px_-35px_hsl(var(--experience-accent-warm)/0.55)]"
      }
    >
      <div className="flex">
        {/* Left logo column */}
        <div className="hidden sm:flex shrink-0 w-24 items-start justify-center pt-7 pl-3">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-experience-border/50 bg-experience-surface/50 shadow-lg ring-1 ring-experience-accent-warm/10">
            {logoSrc ? (
              <img src={logoSrc} alt={exp.company} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span
                className="text-experience-accent-cool"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "18px" }}
              >
                {exp.logo}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 p-7 md:p-8">
          {/* Top row: Company + Arrow */}
          <div className="mb-5 flex items-start justify-between gap-4">
            {/* Mobile-only inline logo */}
            <div className="flex sm:hidden h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-experience-border/50 bg-experience-surface/50 mr-3">
              {logoSrc ? (
                <img src={logoSrc} alt={exp.company} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <span className="text-experience-accent-cool" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "13px" }}>{exp.logo}</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="text-experience-text"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 750,
                  fontSize: "20px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {exp.company}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-4">
                <span
                  className="text-experience-accent-warm"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 550, fontSize: "14px" }}
                >
                  {exp.role}
                </span>

                {exp.type && (
                  <span
                    className="rounded-full border border-experience-accent-cool/20 bg-experience-accent-cool/10 px-3 py-0.5 text-experience-accent-cool"
                    style={{ fontFamily: FONT_DISPLAY, fontWeight: 550, fontSize: "11px" }}
                  >
                    {exp.type}
                  </span>
                )}
              </div>
            </div>

            <ArrowUpRight className="h-5 w-5 shrink-0 text-experience-accent-cool opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>

          {/* Meta row: Location + Dates */}
          <div className="mb-4 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-experience-muted-2" />
              <span
                className="text-experience-muted"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 420, fontSize: "13px" }}
              >
                {exp.location}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-experience-muted-2" />
              <span className="text-experience-muted-2" style={{ fontFamily: FONT_MONO, fontSize: "12px" }}>
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="line-clamp-2 text-experience-muted"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 320, fontSize: "14px", lineHeight: 1.75 }}
          >
            {exp.preview}
          </p>

          {/* Impact */}
          {exp.impact && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-experience-chip-border/25 bg-experience-chip/10 px-4 py-2.5">
              <span className="text-experience-accent-warm" style={{ fontSize: "14px" }}>⚡</span>
              <span
                className="text-experience-accent-warm"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 560, fontSize: "13px" }}
              >
                {exp.impact}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
