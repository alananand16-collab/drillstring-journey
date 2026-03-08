import { motion } from "framer-motion";
import { contactInfo } from "@/data/portfolioData";
import { Mail, Phone, Linkedin, MapPin, ArrowUp } from "lucide-react";

export default function ContactSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="grain-overlay relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(20,20,20,0.5) 0%, transparent 60%),
          linear-gradient(180deg, #111 0%, #0a0a0a 50%, #050505 100%)
        `,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Total Depth Reached</h2>
        <p className="mb-3 text-sm text-white/40">~4000m — Bottom Hole</p>
        <div className="mb-8 inline-block rounded-full px-4 py-1.5 text-sm font-mono"
          style={{
            color: "hsl(var(--brand))",
            background: "hsl(var(--brand) / 0.08)",
            border: "1px solid hsl(var(--brand) / 0.2)",
          }}>
          TD: 4,000m MD
        </div>
        <p className="mb-10 text-base text-white/50">
          You've reached the bottom of the wellbore. Let's connect and build something impactful.
        </p>

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {[
            { href: `mailto:${contactInfo.email}`, icon: Mail, label: "Email", value: contactInfo.email },
            { href: `tel:${contactInfo.phone}`, icon: Phone, label: "Phone", value: contactInfo.phone },
            { href: contactInfo.linkedin, icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alananand", target: "_blank" },
            { href: undefined, icon: MapPin, label: "Location", value: contactInfo.location },
          ].map((item, i) => {
            const Comp = item.href ? "a" : "div";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Comp
                  {...(item.href ? { href: item.href, ...(item.target ? { target: item.target, rel: "noopener noreferrer" } : {}) } : {})}
                  className="flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-300 glass-card-dark hover:border-brand/30"
                  style={item.href ? { cursor: "pointer" } : {}}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-brand/10">
                    <item.icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/30 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-white/75">{item.value}</p>
                  </div>
                </Comp>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300"
          style={{
            color: "hsl(var(--brand))",
            background: "hsl(var(--brand) / 0.1)",
            border: "1px solid hsl(var(--brand) / 0.25)",
            boxShadow: "0 0 20px hsl(var(--brand) / 0.1)",
          }}
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          Return to Surface
        </motion.button>
      </motion.div>
    </section>
  );
}
