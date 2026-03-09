import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
          style={{
            background: "rgba(12, 14, 20, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 30px hsla(var(--brand) / 0.08)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-full transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/40 hover:text-white/70" />
          </button>

          <div className="p-6 md:p-8">
            {/* Status badge */}
            <div className="mb-4 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "hsl(45, 90%, 50%)" }}
              />
              <span className="text-[10px] tracking-[0.15em] uppercase text-amber-400/70">
                {project.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {project.title}
            </h3>

            {/* Narrative (italic) */}
            <div
              className="mb-5 pl-4"
              style={{ borderLeft: "2px solid hsl(var(--brand) / 0.4)" }}
            >
              <p className="text-sm text-white/50 italic leading-relaxed">
                {project.narrative}
              </p>
            </div>

            {/* Full description */}
            <div className="mb-6">
              <p className="text-sm text-white/60 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-5">
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="text-[10px] px-2.5 py-1"
                    style={{
                      borderColor: "hsl(var(--brand) / 0.3)",
                      color: "hsl(var(--brand))",
                      background: "hsl(var(--brand) / 0.06)",
                    }}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Connects To */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">
                Connects To
              </h4>
              <p className="text-xs text-white/45 leading-relaxed">
                {project.connectsTo}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
