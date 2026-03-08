import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="grain-overlay sediment-texture relative flex items-center justify-center px-4 py-16"
      style={{
        background: `
          radial-gradient(ellipse at 40% 50%, rgba(180,150,110,0.15) 0%, transparent 60%),
          linear-gradient(180deg, #6b5b3e 0%, #a08060 40%, #c4a882 80%, #b09870 100%)
        `,
        minHeight: "70vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Small avatar */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-brand"
              style={{
                background: "rgba(0,0,0,0.3)",
                boxShadow: "0 0 12px hsl(var(--brand) / 0.25)",
              }}
            >
              <span className="text-xl font-bold text-brand">AA</span>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-white">About Me</h2>
              <p className="text-base leading-relaxed text-white/80">
                M.Eng candidate at the University of Calgary with 3+ years of experience in energy data management,
                workflow automation, and subsurface modeling. My career spans S&P Global, Enverus, and ONGC across
                Calgary, Bangalore, and India — bridging petroleum engineering fundamentals with modern data-driven
                solutions. I specialize in turning complex energy datasets into actionable intelligence through
                automation, SQL-driven analytics, and AI-integrated workflows.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#b09870] z-[4] pointer-events-none" />
    </section>
  );
}
