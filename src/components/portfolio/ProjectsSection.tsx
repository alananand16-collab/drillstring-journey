import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import reservoirImg from "@/assets/project-reservoir.jpg";
import geomechImg from "@/assets/project-geomech.jpg";
import SectionBackground from "./SectionBackground";

const imageMap: Record<string, string> = {
  reservoir: reservoirImg,
  geomech: geomechImg,
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative px-4 py-24 lg:py-32 overflow-hidden">
      <SectionBackground imagePath="/images/sandstone-canyon.avif" overlayOpacity={[0.65, 0.75]} />

      {/* Amber glow rising from below — approaching reservoir */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(120,80,10,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>3,500 FT</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Shale Zone</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Key Projects</h2>
          <p className="mt-2 text-sm text-white/40">
            High-value engineering and data automation work extracted from the formation.
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
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(0,100,200,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={imageMap[project.image]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,14,0.9) 0%, transparent 60%)" }} />
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
    </section>
  );
}
