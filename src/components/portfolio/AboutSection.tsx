import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "linear-gradient(180deg, #6b5b3e 0%, #a08060 40%, #c4a882 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 md:flex-row"
      >
        {/* Small avatar */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-3 border-brand bg-background/10 backdrop-blur-sm">
          <span className="text-2xl font-bold text-brand">AA</span>
        </div>

        <div>
          <h2 className="mb-4 text-3xl font-bold text-white">About Me</h2>
          <p className="text-base leading-relaxed text-white/85">
            M.Eng candidate at the University of Calgary with 3+ years of experience in energy data management,
            workflow automation, and subsurface modeling. My career spans S&P Global, Enverus, and ONGC across
            Calgary, Bangalore, and India — bridging petroleum engineering fundamentals with modern data-driven
            solutions. I specialize in turning complex energy datasets into actionable intelligence through
            automation, SQL-driven analytics, and AI-integrated workflows.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
