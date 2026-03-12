import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy, Sparkles } from "lucide-react";
import SectionBackground from "./SectionBackground";

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* Alternate icons per award for visual variety */
const AWARD_ICONS = ["🏆", "🥇", "⭐", "🏅", "🎖️"];

export default function AwardsSection() {
  return (
    <section id="awards" className="relative px-4 py-36 lg:py-44 overflow-hidden">
      <SectionBackground imagePath="/images/oil-strike.avif" overlayOpacity={[0.50, 0.58]} />

      {/* Luxurious golden ambient — layered radial glows */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 90% at 50% 50%, rgba(220,165,25,0.14) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 20% 30%, rgba(255,200,50,0.06) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 80% 70%, rgba(200,130,10,0.08) 0%, transparent 50%)" }} />
      </div>

      {/* Animated gold light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              bottom: 0,
              left: `${5 + i * 8}%`,
              width: "1.5px",
              height: "60%",
              background: `linear-gradient(0deg, rgba(220,175,35,${0.08 + (i % 3) * 0.04}), transparent 80%)`,
              animation: `float-particle-slow ${6 + i * 1.1}s ${i * 0.5}s infinite ease-in-out`,
            }}
          />
        ))}
        {/* Floating gold sparkle particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`sp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              background: `rgba(${220 + Math.random() * 35}, ${170 + Math.random() * 30}, ${20 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`,
              animation: `float-particle ${5 + Math.random() * 8}s ${Math.random() * 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── HEADER — centered, commanding ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          {/* Depth tag */}
          <div
            className="mb-6 flex items-center justify-center gap-3"
            style={{
              fontFamily: FONT_MONO,
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "hsl(42,90%,58%)" }}>6,500 FT</span>
            <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, hsl(42,70%,50%,0.4), transparent)" }} />
            <span style={{ color: "hsl(42,50%,55%,0.6)" }}>Pay Zone Struck</span>
          </div>

          {/* Decorative line above title */}
          <div className="flex justify-center mb-6">
            <div
              style={{
                width: "60px",
                height: "3px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, transparent, hsl(42,90%,55%), transparent)",
                boxShadow: "0 0 12px rgba(220,170,30,0.4)",
              }}
            />
          </div>

          {/* Trophy + Headline */}
          <div className="flex items-center justify-center gap-5 mb-5">
            <motion.div
              initial={{ rotate: -15, scale: 0.6, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
            >
              <Trophy
                className="h-12 w-12 md:h-14 md:w-14"
                style={{
                  color: "hsl(42,90%,58%)",
                  filter: "drop-shadow(0 0 16px rgba(220,170,30,0.6)) drop-shadow(0 0 40px rgba(220,170,30,0.2))",
                }}
              />
            </motion.div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(2.75rem, 6vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                background: "linear-gradient(135deg, hsl(48,100%,78%) 0%, hsl(42,95%,60%) 40%, hsl(35,90%,48%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 3px 12px rgba(220,160,20,0.35))",
              }}
            >
              Achievements
            </h2>
          </div>

          <p
            className="max-w-xl mx-auto"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: "17px",
              color: "hsl(42,40%,68%,0.7)",
              lineHeight: 1.7,
            }}
          >
            Recognized for innovation, technical excellence, and driving measurable impact across every role.
          </p>

          {/* Award count pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-7 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5"
            style={{
              background: "linear-gradient(135deg, rgba(220,170,30,0.14), rgba(180,120,10,0.06))",
              border: "1px solid rgba(220,170,30,0.25)",
              boxShadow: "0 0 24px rgba(220,170,30,0.1), inset 0 1px 0 rgba(255,220,80,0.08)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "hsl(42,95%,62%)" }} />
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontSize: "14px",
                color: "hsl(42,80%,70%)",
                letterSpacing: "0.06em",
              }}
            >
              {awards.length} Awards & Recognitions
            </span>
          </motion.div>
        </motion.div>

        {/* ── AWARDS — featured card layout ── */}
        {/* First award = hero card spanning full width */}
        {awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.15 }}
            className="shimmer-card mb-6 rounded-3xl p-8 md:p-10 transition-all duration-400 group"
            style={{
              background: "linear-gradient(145deg, rgba(220,170,30,0.12), rgba(160,120,15,0.05), rgba(100,70,5,0.03))",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(220,170,30,0.22)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(220,170,30,0.06), inset 0 1px 0 rgba(255,220,80,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(220,170,30,0.45)";
              e.currentTarget.style.boxShadow = "0 12px 60px rgba(0,0,0,0.4), 0 0 60px rgba(220,160,20,0.12), inset 0 1px 0 rgba(255,220,80,0.12)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(220,170,30,0.22)";
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(220,170,30,0.06), inset 0 1px 0 rgba(255,220,80,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(220,170,30,0.2), rgba(180,120,10,0.08))",
                  border: "1px solid rgba(220,170,30,0.25)",
                  boxShadow: "0 0 20px rgba(220,170,30,0.12)",
                }}
              >
                🏆
              </div>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "hsl(42,65%,80%)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {awards[0].title}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "hsl(42,35%,55%,0.65)",
                  }}
                >
                  {awards[0].org}
                </p>
              </div>
              <div
                className="hidden md:flex items-center gap-1.5 rounded-full px-4 py-1.5"
                style={{
                  background: "rgba(220,170,30,0.1)",
                  border: "1px solid rgba(220,170,30,0.18)",
                }}
              >
                <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "11px", color: "hsl(42,80%,65%)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Featured
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining awards in a 2-col grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {awards.slice(1).map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 120 }}
              className="rounded-2xl p-7 transition-all duration-400 group"
              style={{
                background: "linear-gradient(145deg, rgba(220,170,30,0.08), rgba(140,100,10,0.03), rgba(80,55,5,0.02))",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(220,170,30,0.15)",
                boxShadow: "0 6px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(220,170,30,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,170,30,0.4)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(220,160,20,0.12), inset 0 1px 0 rgba(220,170,30,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,170,30,0.15)";
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(220,170,30,0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg, rgba(220,170,30,0.14), rgba(180,120,10,0.06))",
                    border: "1px solid rgba(220,170,30,0.18)",
                    boxShadow: "0 0 14px rgba(220,170,30,0.08)",
                  }}
                >
                  {AWARD_ICONS[(i + 1) % AWARD_ICONS.length]}
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "hsl(42,60%,78%)",
                      lineHeight: 1.4,
                    }}
                  >
                    {award.title}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 400,
                      fontSize: "13px",
                      color: "hsl(42,35%,52%,0.6)",
                    }}
                  >
                    {award.org}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
