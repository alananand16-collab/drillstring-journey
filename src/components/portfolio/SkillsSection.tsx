import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolioData";
import {
  Terminal, Database, Workflow, FlaskConical, Settings,
  Layers, BarChart3, Activity,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  terminal: <Terminal className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  workflow: <Workflow className="h-5 w-5" />,
  flask: <FlaskConical className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  "bar-chart": <BarChart3 className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="grain-overlay relative px-4 py-24 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #10121a 0%, #12141e 50%, #0e1018 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>5,000</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Perforation Zone</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Technical Arsenal</h2>
          <p className="mt-2 text-sm text-white/40 max-w-lg">
            Perforating through formation barriers — tools and technologies that I wield like a downhole.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl p-4 text-center transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(0,100,200,0.08), inset 0 0 20px rgba(0,100,200,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  color: "hsl(var(--brand))",
                }}
              >
                {iconMap[cat.icon] || <Terminal className="h-5 w-5" />}
              </div>
              <h3 className="text-xs font-semibold text-white/70 mb-1">{cat.name}</h3>
              <div className="space-y-0.5">
                {cat.skills.map((s) => (
                  <p key={s} className="text-[10px] text-white/30">{s}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#100e14] z-[4] pointer-events-none" />
    </section>
  );
}
