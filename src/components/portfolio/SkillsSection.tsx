import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolioData";
import ParticleField from "./ParticleField";
import {
  Database, Code, BarChart3, Settings, Cpu, Flame,
  FileSpreadsheet, Wrench, Cloud, Workflow, Layers,
  Activity, Gauge, Box, Cable, Terminal, Zap
} from "lucide-react";

const skillIconMap: Record<string, React.ReactNode> = {
  "CMG IMEX": <Box className="h-6 w-6" />,
  "EOR": <Flame className="h-6 w-6" />,
  "SAGD": <Layers className="h-6 w-6" />,
  "Pore Pressure Modeling": <Gauge className="h-6 w-6" />,
  "Geomechanical Analysis": <Activity className="h-6 w-6" />,
  "Aspen HYSYS": <Cpu className="h-6 w-6" />,
  "Python": <Terminal className="h-6 w-6" />,
  "SQL": <Database className="h-6 w-6" />,
  "Power Automate": <Workflow className="h-6 w-6" />,
  "ETL": <Cable className="h-6 w-6" />,
  "AI API Integration": <Zap className="h-6 w-6" />,
  "ETS": <Settings className="h-6 w-6" />,
  "SPIN II": <Cloud className="h-6 w-6" />,
  "Alberta Crown Land Lifecycle": <Layers className="h-6 w-6" />,
  "Commodity Trading Platforms": <BarChart3 className="h-6 w-6" />,
  "Power BI": <BarChart3 className="h-6 w-6" />,
  "Excel": <FileSpreadsheet className="h-6 w-6" />,
  "ServiceNow": <Wrench className="h-6 w-6" />,
  "Jira": <Code className="h-6 w-6" />,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="grain-overlay grid-pattern relative min-h-screen px-4 py-20"
      style={{
        background: `
          radial-gradient(ellipse at 60% 30%, rgba(196,168,130,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 70%, rgba(140,120,90,0.15) 0%, transparent 50%),
          linear-gradient(180deg, #b09870 0%, #a08a68 30%, #8a7a60 60%, #6d5d45 100%)
        `,
      }}
    >
      <ParticleField type="dust" count={20} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Skills & Competencies</h2>
          <p className="text-sm text-white/40">~800m — Sandstone Layer</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="glass-card-dark rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Brand blue top stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand opacity-70" />
              
              <h3 className="mb-5 text-lg font-semibold text-brand">{cat.name}</h3>
              <div className="flex flex-wrap gap-4">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    className="group flex flex-col items-center gap-1.5 cursor-default"
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand/10 group-hover:text-brand group-hover:shadow-[0_0_16px_hsl(var(--brand)/0.25)]"
                    >
                      {skillIconMap[skill.name] || <Code className="h-6 w-6" />}
                    </div>
                    <span className="text-[11px] text-white/60 text-center max-w-[70px] leading-tight group-hover:text-white/90 transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#3d3d3d] z-[4] pointer-events-none" />
    </section>
  );
}
