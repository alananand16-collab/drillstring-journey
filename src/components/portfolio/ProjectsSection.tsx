import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import ParticleField from "./ParticleField";
import { Beaker } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative min-h-screen px-4 py-20"
      style={{ background: "linear-gradient(180deg, #1e1e1e 0%, #3d2b0f 40%, #5c4a1e 70%, #4a3a12 100%)" }}
    >
      <ParticleField type="oil" count={15} />
      <ParticleField type="bubbles" count={8} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Projects
        </motion.h2>
        <p className="mb-12 text-center text-sm text-amber-400/50">~2500m — Reservoir Zone</p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl border border-amber-500/20 bg-amber-900/10 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
              </div>
              <ul className="space-y-2">
                {proj.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm text-white/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
