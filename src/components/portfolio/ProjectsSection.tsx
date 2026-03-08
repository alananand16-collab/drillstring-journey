import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import ParticleField from "./ParticleField";
import { Beaker } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="grain-overlay relative min-h-screen px-4 py-20"
      style={{
        background: `
          radial-gradient(ellipse at 40% 40%, rgba(100,80,30,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 70%, rgba(80,60,20,0.15) 0%, transparent 50%),
          linear-gradient(180deg, #3d2b0f 0%, #4a3518 25%, #5c4a1e 50%, #4a3a12 75%, #3a2a0a 100%)
        `,
      }}
    >
      <ParticleField type="oil" count={25} />
      <ParticleField type="bubbles" count={15} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Projects</h2>
          <p className="text-sm text-amber-400/50">~2500m — Reservoir Zone</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card rounded-2xl p-6 border-amber-500/15 hover:border-amber-500/30 transition-all duration-500"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,200,50,0.03)" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Beaker className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
              </div>
              <ul className="space-y-3">
                {proj.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm text-white/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#1a1000] z-[4] pointer-events-none" />
    </section>
  );
}
