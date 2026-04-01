import { useState, useEffect } from "react";
import { Download, Github } from "lucide-react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8,10,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <a href="#hero" onClick={(e) => handleClick(e, "#hero")} className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm"
            style={{
              background: "hsl(var(--brand))",
              color: "white",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            AA
          </div>
          <span
            className="hidden sm:inline text-sm tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Alan Anand
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[13px] tracking-[0.18em] uppercase transition-colors hover:text-white"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://github.com/alananand16-collab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-2 text-[11px] tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-full px-5 py-2 text-[11px] tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              background: "hsl(var(--brand) / 0.12)",
              border: "1px solid hsl(var(--brand) / 0.25)",
              color: "hsl(var(--brand))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.25)";
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.12)";
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.25)";
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile resume button */}
        <a
          href="/resume.pdf"
          download
          className="flex md:hidden items-center gap-1.5 rounded-full px-4 py-2 text-[11px] tracking-[0.12em] uppercase"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            background: "hsl(var(--brand) / 0.12)",
            border: "1px solid hsl(var(--brand) / 0.25)",
            color: "hsl(var(--brand))",
          }}
        >
          <Download className="h-3.5 w-3.5" />
          Resume
        </a>
      </div>
    </nav>
  );
}
