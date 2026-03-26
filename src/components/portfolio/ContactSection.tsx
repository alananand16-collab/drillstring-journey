import { motion } from "framer-motion";
import { contactInfo } from "@/data/portfolioData";
import { Mail, Linkedin, Download, Github } from "lucide-react";
import SectionBackground from "./SectionBackground";

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-28 lg:py-36">
      <SectionBackground imagePath="/images/deep-earth-glow.avif" overlayOpacity={[0.65, 0.60]} />

      {/* Bottom hole glow */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(100,50,5,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 30% at 50% 120%, rgba(60,20,0,0.15) 0%, transparent 70%)" }} />
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

      {/* Readability overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(5,8,14,0.5) 0%, rgba(5,8,14,0.65) 40%, rgba(5,8,14,0.7) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="mb-4 flex items-center justify-center gap-3"
            style={{
              fontFamily: FONT_MONO,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ color: "hsl(var(--brand))" }}>14,000 FT</span>
            <span className="h-px w-8 bg-white/10" />
            <span>Bottom Hole</span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "hsl(210,30%,95%)",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Connect
          </h2>
          <p
            className="max-w-md mx-auto mb-12"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300,
              fontSize: "16px",
              color: "hsl(215,15%,58%)",
              lineHeight: 1.7,
            }}
          >
            Total depth reached. Open to opportunities in data engineering, subsurface analytics, and AI-driven energy solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2.5 rounded-xl px-6 py-3 transition-all duration-300"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: "14px",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
            }}
          >
            <Mail className="h-4 w-4" />
            {contactInfo.email}
          </a>

          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-6 py-3 transition-all duration-300"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: "14px",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
            }}
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 transition-all duration-300"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: "15px",
              background: "hsl(var(--brand) / 0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--brand) / 0.35)",
              color: "hsl(var(--brand))",
              boxShadow: "0 0 24px hsl(var(--brand) / 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.boxShadow = "0 0 36px hsl(var(--brand) / 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.18)";
              e.currentTarget.style.boxShadow = "0 0 24px hsl(var(--brand) / 0.1)";
            }}
          >
            <Download className="h-4.5 w-4.5" />
            Download Resume
          </a>
        </motion.div>

        <div
          className="mt-20"
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 300,
            fontSize: "11px",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.15em",
          }}
        >
          © 2026 Alan Anand. All rights reserved.
        </div>
      </div>
    </section>
  );
}
