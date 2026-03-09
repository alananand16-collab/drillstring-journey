import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy, Award, Star } from "lucide-react";
import SectionBackground from "./SectionBackground";

const FONT_DISPLAY = "'Outfit', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

export default function AwardsSection() {
  return (
    <section id="awards" className="relative px-4 py-32 lg:py-40 overflow-hidden">
      <SectionBackground imagePath="/images/oil-strike.avif" overlayOpacity={[0.55, 0.65]} />

      {/* Rich golden ambient — much stronger */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(220,160,20,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200,140,10,0.08) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(180,100,5,0.10) 0%, transparent 60%)" }} />
      </div>

      {/* Oil gush columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${8 + i * 9}%`,
              width: `${10 + (i % 3) * 8}px`,
              background: `linear-gradient(0deg, rgba(15,10,2,0.9) 0%, rgba(30,20,4,0.6) 35%, rgba(50,32,6,0.3) 65%, transparent 100%)`,
              animation: `oil-gush-column ${5.5 + (i % 4) * 1.2}s ${i * 0.35}s infinite ease-out`,
              borderRadius: "8px 8px 0 0",
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full"
            style={{
              bottom: `${20 + Math.random() * 30}%`,
              left: `${5 + Math.random() * 90}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              background: `rgba(${20 + Math.random() * 20}, ${12 + Math.random() * 10}, ${Math.random() * 6}, ${0.35 + Math.random() * 0.35})`,
              animation: `oil-splatter ${3.5 + Math.random() * 4}s ${Math.random() * 6}s infinite ease-out`,
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute"
            style={{
              bottom: "5%",
              left: `${8 + i * 12}%`,
              width: "1px",
              height: "50%",
              background: `linear-gradient(0deg, rgba(220,170,30,0.15), transparent)`,
              animation: `float-particle-slow ${7 + i * 1.2}s ${i * 0.6}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl lg:ml-24 lg:mr-auto lg:max-w-5xl">
        {/* Header — bold and commanding */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center lg:text-left"
        >
          <div
            className="mb-5 flex items-center justify-center lg:justify-start gap-3"
            style={{
              fontFamily: FONT_MONO,
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "hsl(42,90%,55%)" }}>6,500 FT</span>
            <span className="h-px w-10" style={{ background: "hsl(42,70%,40%,0.3)" }} />
            <span style={{ color: "hsl(42,60%,50%,0.5)" }}>Pay Zone</span>
          </div>

          {/* Big headline with trophy icon */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Trophy
                className="h-10 w-10 md:h-12 md:w-12"
                style={{
                  color: "hsl(42,90%,55%)",
                  filter: "drop-shadow(0 0 12px rgba(220,170,30,0.5))",
                }}
              />
            </motion.div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, hsl(45,95%,70%), hsl(38,90%,55%), hsl(30,85%,45%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 8px rgba(220,160,20,0.3))",
              }}
            >
              Achievements
            </h2>
          </div>
          <p
            className="max-w-lg mx-auto lg:mx-0"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: "16px",
              color: "hsl(42,50%,65%,0.6)",
              lineHeight: 1.7,
            }}
          >
            Recognized for innovation, technical excellence, and driving measurable impact across every role.
          </p>

          {/* Achievement count badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2"
            style={{
              background: "linear-gradient(135deg, rgba(220,170,30,0.12), rgba(180,120,10,0.06))",
              border: "1px solid rgba(220,170,30,0.2)",
              boxShadow: "0 0 20px rgba(220,170,30,0.08)",
            }}
          >
            <Star className="h-4 w-4" style={{ color: "hsl(42,90%,60%)" }} />
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontSize: "13px",
                color: "hsl(42,80%,65%)",
                letterSpacing: "0.05em",
              }}
            >
              {awards.length} Awards & Recognitions
            </span>
          </motion.div>
        </motion.div>

        {/* Awards grid — larger cards, more visual weight */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
              className="rounded-2xl p-6 transition-all duration-400 group"
              style={{
                background: "linear-gradient(145deg, rgba(220,170,30,0.08), rgba(160,110,8,0.03), rgba(100,70,5,0.02))",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(220,170,30,0.15)",
                boxShadow: "0 6px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(220,170,30,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,170,30,0.4)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(220,160,20,0.15), inset 0 1px 0 rgba(220,170,30,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,170,30,0.15)";
                e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(220,170,30,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(220,170,30,0.15), rgba(180,120,10,0.08))",
                    border: "1px solid rgba(220,170,30,0.2)",
                    boxShadow: "0 0 12px rgba(220,170,30,0.1)",
                  }}
                >
                  <Award className="h-5 w-5" style={{ color: "hsl(42,85%,60%)" }} />
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "hsl(42,70%,75%)",
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
                      color: "hsl(42,40%,50%,0.55)",
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
