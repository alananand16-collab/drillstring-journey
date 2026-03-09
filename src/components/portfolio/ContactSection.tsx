import { motion } from "framer-motion";
import { contactInfo } from "@/data/portfolioData";
import { Mail, Linkedin, Download } from "lucide-react";
import SectionBackground from "./SectionBackground";

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-24 lg:py-32">
      <SectionBackground imagePath="/images/deep-earth-glow.avif" overlayOpacity={[0.65, 0.60]} />

      {/* Bottom hole — deep warm geothermal glow */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(100,50,5,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 50% 30% at 50% 120%, rgba(60,20,0,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Rising heat shimmer particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              bottom: `${10 + Math.random() * 30}%`,
              left: `${10 + Math.random() * 80}%`,
              width: "2px",
              height: "2px",
              background: `rgba(180,80,10,${0.15 + Math.random() * 0.2})`,
              animation: `rise-bubble ${5 + Math.random() * 6}s ${Math.random() * 5}s infinite ease-out`,
            }}
          />
        ))}
      </div>

      {/* Dark gradient behind text for readability over particles */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(5,8,14,0.5) 0%, rgba(5,8,14,0.65) 40%, rgba(5,8,14,0.7) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-3 flex items-center justify-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/25">
            <span style={{ color: "hsl(var(--brand))" }}>14,000 FT</span>
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
              backdropFilter: "blur(10px)",
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
              backdropFilter: "blur(10px)",
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

          {/* Download Resume — prominent "bail out" at bottom */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300"
            style={{
              background: "hsl(var(--brand) / 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid hsl(var(--brand) / 0.4)",
              color: "hsl(var(--brand))",
              boxShadow: "0 0 20px hsl(var(--brand) / 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.35)";
              e.currentTarget.style.boxShadow = "0 0 30px hsl(var(--brand) / 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.2)";
              e.currentTarget.style.boxShadow = "0 0 20px hsl(var(--brand) / 0.1)";
            }}
          >
            <Download className="h-4 w-4" />
            Download Resume (PDF)
          </a>
        </motion.div>

        <div className="mt-16 text-[10px] text-white/15">
          © 2026 Alan Anand. All rights reserved.
        </div>
      </div>
    </section>
  );
}
