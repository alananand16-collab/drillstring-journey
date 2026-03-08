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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #111 50%, #0a0a0a 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Total Depth Reached</h2>
        <p className="mb-8 text-sm text-white/50">~4000m — Bottom Hole</p>
        <p className="mb-10 text-base text-white/60">
          You've reached the bottom of the wellbore. Let's connect and build something impactful.
        </p>

        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-brand/40 hover:bg-brand/5"
          >
            <Mail className="h-5 w-5 text-brand" />
            <div>
              <p className="text-xs text-white/40">Email</p>
              <p className="text-sm text-white/80">{contactInfo.email}</p>
            </div>
          </a>

          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-brand/40 hover:bg-brand/5"
          >
            <Phone className="h-5 w-5 text-brand" />
            <div>
              <p className="text-xs text-white/40">Phone</p>
              <p className="text-sm text-white/80">{contactInfo.phone}</p>
            </div>
          </a>

          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-brand/40 hover:bg-brand/5"
          >
            <Linkedin className="h-5 w-5 text-brand" />
            <div>
              <p className="text-xs text-white/40">LinkedIn</p>
              <p className="text-sm text-white/80">linkedin.com/in/alananand</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <MapPin className="h-5 w-5 text-brand" />
            <div>
              <p className="text-xs text-white/40">Location</p>
              <p className="text-sm text-white/80">{contactInfo.location}</p>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-6 py-3 text-sm font-medium text-brand transition-all hover:bg-brand/20 hover:shadow-[0_0_20px_rgba(0,70,180,0.3)]"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          Return to Surface
        </button>
      </motion.div>
    </section>
  );
}
