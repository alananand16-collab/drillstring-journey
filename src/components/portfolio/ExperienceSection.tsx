import { useState } from "react";
import { motion } from "framer-motion";

import { experiences } from "@/data/portfolioData";
import type { Experience } from "@/data/portfolioData";

import ExperienceModal from "./ExperienceModal";
import SectionBackground from "./SectionBackground";
import ExperienceCard from "./experience/ExperienceCard";

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
          background:
            "radial-gradient(ellipse 50% 60% at -10% 50%, hsl(var(--oil-brown) / 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div
            className="mb-4 flex items-center gap-3 text-experience-muted"
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span className="text-experience-accent-warm">0 – 2,500 FT</span>
            <span className="h-px w-8 bg-experience-border/50" />
            <span>Sedimentary Zone</span>
          </div>

          <h2
            className="text-experience-text"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Experience
          </h2>

          <p
            className="mt-3 max-w-xl text-experience-muted"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 320,
              fontSize: "15px",
              lineHeight: 1.7,
            }}
          >
            Drilling through layers of data engineering, subsurface analytics, and AI workflow automation.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={`${exp.company}-${exp.startDate}-${i}`} experience={exp} index={i} onSelect={() => setSelectedExp(exp)} />
          ))}
        </div>
      </div>

      <ExperienceModal experience={selectedExp} open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)} />
    </section>
  );
}
