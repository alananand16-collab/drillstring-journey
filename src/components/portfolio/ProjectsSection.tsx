import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import reservoirImg from "@/assets/project-reservoir.jpg";
import geomechImg from "@/assets/project-geomech.jpg";
import sectionDividerImg from "@/assets/section-divider.jpg";

const imageMap: Record<string, string> = {
  reservoir: reservoirImg,
  geomech: geomechImg,
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden">
      {/* Cinematic divider image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={sectionDividerImg}
          alt="Industrial pipeline"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c12] via-transparent to-[#0c0e14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c12]/80 via-transparent to-[#0a0c12]/80" />
      </div>

      <div
        className="grain-overlay relative px-4 py-24 lg:py-32"
        style={{
          background: "linear-gradient(180deg, #0c0e14 0%, #0e1018 50%, #12141c 100%)",
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
              <span style={{ color: "hsl(var(--brand))" }}>3,500</span>
              <span className="h-px w-6 bg-white/10" />
              <span>Oil Zone</span>
            </div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Key Projects</h2>
            <p className="mt-2 text-sm text-white/40">
              Pay zones encountered — high-value engineering and data automation work.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0,100,200,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={imageMap[project.image]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">{project.title}</h3>
                  {project.bullets.map((b, j) => (
                    <p key={j} className="text-xs text-white/40 leading-relaxed">{b}</p>
                  ))}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tools.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-[9px] border-white/8 text-white/30 bg-white/[0.01]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#10121a] z-[4] pointer-events-none" />
    </section>
  );
}
