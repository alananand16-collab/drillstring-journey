import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolioData";
import {
  Terminal, Database, Workflow, FlaskConical, Settings,
  Layers, BarChart3, Activity,
} from "lucide-react";
import SectionBackground from "./SectionBackground";

import pythonLogo from "@/assets/skills/python.svg";
import sqlLogo from "@/assets/skills/sql.svg";
import powerAutomateLogo from "@/assets/skills/powerautomate.svg";
import powerBiLogo from "@/assets/skills/powerbi.png";

const logoMap: Record<string, string> = {
  terminal: pythonLogo,
  database: sqlLogo,
  workflow: powerAutomateLogo,
  "bar-chart": powerBiLogo,
};

const iconMap: Record<string, React.ReactNode> = {
  flask: <FlaskConical className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
};

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-4 py-28 lg:py-36">
      <SectionBackground imagePath="/images/deep-rock.avif" overlayOpacity={[0.65, 0.72]} />

      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 90% 50% at 50% 100%, rgba(140,90,10,0.10) 0%, transparent 65%)",
          }}
        />
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "1.5px",
              height: "1.5px",
              background: `rgba(200,150,40,${0.15 + Math.random() * 0.2})`,
              animation: `float-particle ${8 + Math.random() * 12}s ${Math.random() * 8}s infinite ease-in-out`,
            }}
          />
        ))}
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
            <span style={{ color: "hsl(var(--brand))" }}>5,000 FT</span>
            <span className="h-px w-8 bg-white/10" />
            <span>Reservoir Zone</span>
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
            Technical Arsenal
          </h2>
          <p
            className="mt-3 max-w-lg"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontSize: "15px",
              color: "hsl(215,15%,58%)",
            }}
          >
            Perforating through formation barriers — tools and technologies that power the workflow.
          </p>
        </motion.div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {skillCategories.map((cat, i) => {
            const logo = logoMap[cat.icon];
            const icon = iconMap[cat.icon];

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl p-5 text-center transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
                  e.currentTarget.style.boxShadow = "0 0 32px rgba(0,100,200,0.10), inset 0 0 20px rgba(0,100,200,0.04)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", color: "hsl(var(--brand))" }}
                >
                  {logo ? (
                    <img src={logo} alt={cat.name} className="h-7 w-7 object-contain" />
                  ) : (
                    icon || <Terminal className="h-5 w-5" />
                  )}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "hsl(210,20%,78%)",
                  }}
                >
                  {cat.name}
                </h3>
                <div className="space-y-1">
                  {cat.skills.map((s) => (
                    <p
                      key={s}
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 300,
                        fontSize: "12px",
                        color: "hsl(215,12%,50%)",
                      }}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
