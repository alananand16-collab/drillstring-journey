import { motion } from "framer-motion";
import { contactInfo } from "@/data/portfolioData";
import { Mail, Linkedin, Download } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="grain-overlay relative px-4 py-24 lg:py-32"
      style={{
        background: `
          radial-gradient(ellipse at 50% 60%, rgba(0,50,120,0.08) 0%, transparent 50%),
          linear-gradient(180deg, #080a0f 0%, #060810 50%, #050709 100%)
        `,
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-3 flex items-center justify-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>14,000</span>
            <span className="h-px w-6 bg-white/10" />
            <span>Bottom Hole</span>
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-3">Let's Connect</h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-10">
            Total depth reached. Open to opportunities in data engineering, subsurface analytics, and AI-driven energy solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-medium transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <Mail className="h-3.5 w-3.5" />
            {contactInfo.email}
          </a>

          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-medium transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>

          <button
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-medium transition-all duration-300"
            style={{
              background: "hsl(var(--brand) / 0.15)",
              border: "1px solid hsl(var(--brand) / 0.3)",
              color: "hsl(var(--brand))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.15)";
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Download Resume
          </button>
        </motion.div>

        <div className="mt-16 text-[10px] text-white/15">
          © 2026 Alan Anand. All rights reserved.
        </div>
      </div>
    </section>
  );
}
