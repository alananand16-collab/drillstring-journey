import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolioData";
import ParticleField from "./ParticleField";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen px-4 py-20"
      style={{ background: "linear-gradient(180deg, #c4a882 0%, #b09870 50%, #8a7a60 100%)" }}
    >
      <ParticleField type="dust" count={8} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
        >
          Skills & Competencies
        </motion.h2>
        <p className="mb-12 text-center text-sm text-white/50">~800m — Sandstone Layer</p>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-lg font-semibold text-brand">{cat.name}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    className="group flex flex-col items-center gap-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[9px] font-medium text-white/60 transition-all group-hover:border-brand/50 group-hover:bg-brand/10">
                      {skill.name.slice(0, 3).toUpperCase()}
                    </div>
                    <span className="text-[10px] text-white/70">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
