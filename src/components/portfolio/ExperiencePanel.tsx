import { Badge } from "@/components/ui/badge";
import { Trophy, ExternalLink, Github, MapPin, Calendar } from "lucide-react";
import type { Experience } from "@/data/portfolioData";
import SlidePanel from "./SlidePanel";

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

interface Props {
  experience: Experience | null;
  open: boolean;
  onClose: () => void;
}

export default function ExperiencePanel({ experience, open, onClose }: Props) {
  if (!experience) return null;

  const logoSrc = companyLogoMap[experience.company];

  return (
    <SlidePanel open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {logoSrc ? (
            <img src={logoSrc} alt={experience.company} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-bold" style={{ color: "hsl(var(--brand))" }}>{experience.logo}</span>
          )}
        </div>
        <div>
          <h2
            className="text-white"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 750, fontSize: "22px", letterSpacing: "-0.01em" }}
          >
            {experience.company}
          </h2>
          <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 550, fontSize: "15px", color: "hsl(var(--brand))" }}>
            {experience.role}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-white/25" />
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                {experience.location}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-white/25" />
              <span style={{ fontFamily: FONT_MONO, fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                {experience.startDate} — {experience.endDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Type badge */}
      {experience.type && (
        <div className="mb-6">
          <span
            className="inline-block rounded-full px-3 py-1"
            style={{
              background: "hsl(var(--brand) / 0.1)",
              border: "1px solid hsl(var(--brand) / 0.2)",
              fontFamily: FONT_DISPLAY,
              fontWeight: 550,
              fontSize: "12px",
              color: "hsl(var(--brand))",
            }}
          >
            {experience.type}
          </span>
        </div>
      )}

      {/* Narrative */}
      <div
        className="mb-6 rounded-xl p-5"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderLeft: "3px solid hsl(var(--brand) / 0.4)",
        }}
      >
        <p
          className="italic"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 350,
            fontSize: "14px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
          }}
        >
          {experience.preview}
        </p>
      </div>

      {/* Impact */}
      {experience.impact && (
        <div
          className="mb-6 flex items-center gap-3 rounded-xl px-5 py-4"
          style={{
            background: "linear-gradient(135deg, hsl(var(--brand) / 0.08), rgba(255,255,255,0.02))",
            border: "1px solid hsl(var(--brand) / 0.15)",
          }}
        >
          <span className="text-lg">⚡</span>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: "15px",
              color: "hsl(var(--brand))",
            }}
          >
            {experience.impact}
          </span>
        </div>
      )}

      {/* Key Contributions */}
      <div className="mb-6">
        <h3
          className="mb-4"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 650,
            fontSize: "14px",
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Key Contributions
        </h3>
        <div className="space-y-3">
          {experience.bullets.map((bullet, i) => (
            <div key={i} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "hsl(var(--brand) / 0.5)" }}
              />
              <p
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 350,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                }}
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      {experience.screenshots && experience.screenshots.length > 0 && (
        <div className="mb-6">
          <h3
            className="mb-4"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 650,
              fontSize: "14px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Project Screenshots
          </h3>
          <div className="grid gap-3 grid-cols-2">
            {experience.screenshots.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <img
                  src={src}
                  alt={`${experience.company} screenshot ${i + 1}`}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate */}
      {experience.certificateImage && (
        <div className="mb-6">
          <h3
            className="mb-4"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 650,
              fontSize: "14px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Certificate
          </h3>
          <div
            className="overflow-hidden rounded-lg"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <img
              src={experience.certificateImage}
              alt="Certificate"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Tools */}
      <div className="mb-6">
        <h3
          className="mb-3"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 650,
            fontSize: "14px",
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {experience.tools.map((tool) => (
            <Badge
              key={tool}
              variant="outline"
              className="text-[11px] font-medium border-white/10 text-white/45 bg-white/[0.03] px-3 py-1"
            >
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      {experience.githubUrl && (
        <a
          href={experience.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 flex items-center gap-2 rounded-xl px-5 py-3 transition-colors"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Github className="h-4 w-4 text-white/50" />
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 500,
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            View on GitHub
          </span>
          <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/30" />
        </a>
      )}

      {/* Awards */}
      {experience.awards && experience.awards.length > 0 && (
        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <h3
            className="mb-3"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 650,
              fontSize: "14px",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Awards
          </h3>
          <div className="space-y-2">
            {experience.awards.map((award) => (
              <div key={award} className="flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-yellow-500/70" />
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "rgba(234,179,8,0.7)",
                  }}
                >
                  {award}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </SlidePanel>
  );
}
