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

export default function SkillsSection() {
  return (
    <section id="skills" className="relative px-4 py-24 lg:py-32">
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
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>5,000 FT</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Reservoir Zone</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Technical Arsenal</h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Perforating through formation barriers — tools and technologies that power the workflow.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
                className="group rounded-xl p-4 text-center transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.055)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(0,100,200,0.10), inset 0 0 20px rgba(0,100,200,0.04)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.055)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <div
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", color: "hsl(var(--brand))" }}
                >
                  {logo ? (
                    <img src={logo} alt={cat.name} className="h-6 w-6 object-contain" />
                  ) : (
                    icon || <Terminal className="h-5 w-5" />
                  )}
                </div>
                <h3 className="text-xs font-semibold text-white/70 mb-1">{cat.name}</h3>
                <div className="space-y-0.5">
                  {cat.skills.map((s) => (
                    <p key={s} className="text-[10px] text-white/30">{s}</p>
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
