import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import reservoirImg from "@/assets/project-reservoir.jpg";
import geomechImg from "@/assets/project-geomech.jpg";
import SectionBackground from "./SectionBackground";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/portfolioData";

const imageMap: Record<string, string | null> = {
  reservoir: reservoirImg,
  geomech: geomechImg,
  land: null,
  well: null,
  eor: null,
};

// Gradient placeholders for projects without images
const gradientMap: Record<string, string> = {
  land: "linear-gradient(135deg, hsl(140,30%,12%) 0%, hsl(160,25%,8%) 50%, hsl(120,20%,6%) 100%)",
  well: "linear-gradient(135deg, hsl(210,40%,12%) 0%, hsl(220,35%,8%) 50%, hsl(200,30%,6%) 100%)",
  eor: "linear-gradient(135deg, hsl(35,50%,14%) 0%, hsl(25,40%,10%) 50%, hsl(15,35%,7%) 100%)",
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-4 py-24 lg:py-32 overflow-hidden">
      <SectionBackground imagePath="/images/sandstone-canyon.avif" overlayOpacity={[0.65, 0.75]} />

      {/* Amber glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(120,80,10,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-6xl">
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

        {/* 3+2 grid layout */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const img = imageMap[project.image];
            const gradient = gradientMap[project.image];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedProject(project)}
                className={`group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  // Center the last 2 cards when 5 items in a 3-col grid
                  i === 3 ? "lg:col-start-1" : i === 4 ? "lg:col-start-2" : ""
                }`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(0,100,200,0.07)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Thumbnail area */}
                <div className="relative h-36 overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{ background: gradient }}
                    >
                      {/* Abstract pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.04) 0%, transparent 40%)`,
                        }}
                      />
                    </div>
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(8,10,14,0.9) 0%, transparent 60%)" }}
                  />
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "hsl(45, 90%, 50%)" }}
                    />
                    <span className="text-[8px] tracking-[0.1em] uppercase text-amber-400/80">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-1.5">{project.title}</h3>
                  <p className="text-[11px] text-white/35 italic mb-3 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 4).map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-[9px] border-white/8 text-white/30 bg-white/[0.01]"
                      >
                        {t}
                      </Badge>
                    ))}
                    {project.tools.length > 4 && (
                      <Badge
                        variant="outline"
                        className="text-[9px] border-white/8 text-white/25 bg-white/[0.01]"
                      >
                        +{project.tools.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
