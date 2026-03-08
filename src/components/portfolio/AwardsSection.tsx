import { motion } from "framer-motion";
import { awards } from "@/data/portfolioData";
import { Trophy } from "lucide-react";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4a3a12 0%, #1a1000 40%, #0a0800 100%)" }}
    >
      {/* Oil gush effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full animate-oil-gush"
            style={{
              left: `${15 + i * 14}%`,
              width: `${20 + Math.random() * 30}px`,
              background: "linear-gradient(0deg, #1a1000, #2a1800)",
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-yellow-400 md:text-4xl">
            🛢️ Oil Strike!
          </h2>
          <p className="mb-12 text-sm text-yellow-500/50">~3000m — Pay Zone</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 backdrop-blur-sm"
            >
              <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
              <div>
                <p className="text-sm font-semibold text-yellow-400">{award.title}</p>
                <p className="text-xs text-yellow-500/50">{award.org}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
