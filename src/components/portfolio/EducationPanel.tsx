import { Badge } from "@/components/ui/badge";
import { BookOpen, Users } from "lucide-react";
import type { Education } from "@/data/portfolioData";
import SlidePanel from "./SlidePanel";

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

interface Props {
  education: Education | null;
  open: boolean;
  onClose: () => void;
}

export default function EducationPanel({ education, open, onClose }: Props) {
  if (!education) return null;

  return (
    <SlidePanel open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {education.logoImage ? (
            <img src={education.logoImage} alt={education.school} className="h-full w-full object-contain" />
          ) : (
            <span
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "18px", color: "hsl(var(--brand))" }}
            >
              {education.logo}
            </span>
          )}
        </div>
        <div>
          <h2
            className="text-white"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 750, fontSize: "22px", letterSpacing: "-0.01em" }}
          >
            {education.degree}
          </h2>
          <p
            className="mt-1"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 450, fontSize: "15px", color: "hsl(var(--brand))" }}
          >
            {education.school}
          </p>
          <p
            className="mt-1"
            style={{ fontFamily: FONT_MONO, fontSize: "12px", color: "rgba(255,255,255,0.25)" }}
          >
            {education.dates}
          </p>
        </div>
      </div>

      {/* Description */}
      {education.description && (
        <div
          className="mb-6 rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderLeft: "3px solid hsl(var(--brand) / 0.4)",
          }}
        >
          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 350,
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
            }}
          >
            {education.description}
          </p>
        </div>
      )}

      {/* Campus Image */}
      {education.campusImage && (
        <div className="mb-6">
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <img
              src={education.campusImage}
              alt={`${education.school} campus`}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Coursework */}
      {education.coursework && education.coursework.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-white/40" />
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 650,
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Key Coursework
            </h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {education.coursework.map((course, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{
                    background: "hsl(var(--brand) / 0.12)",
                    fontFamily: FONT_MONO,
                    fontSize: "10px",
                    color: "hsl(var(--brand))",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 420,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {course}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Images */}
      {education.projectImages && education.projectImages.length > 0 && (
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
            Project Gallery
          </h3>
          <div className="grid gap-3 grid-cols-2">
            {education.projectImages.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <img
                  src={src}
                  alt={`Project ${i + 1}`}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extracurriculars */}
      {education.extras && education.extras.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-white/40" />
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 650,
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Activities & Achievements
            </h3>
          </div>
          <div className="space-y-2">
            {education.extras.map((extra, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "hsl(var(--brand) / 0.5)" }}
                />
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 380,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  {extra}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SlidePanel>
  );
}
