import { useState, useEffect } from "react";
import { Download } from "lucide-react";

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
      className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" onClick={(e) => handleClick(e, "#hero")} className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md font-bold text-sm"
            style={{
              background: "hsl(var(--brand))",
              color: "white",
            }}
          >
            AA
          </div>
          <span className="text-sm font-medium text-white/50 hidden sm:inline">ALAN ANAND</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-xs font-medium tracking-[0.15em] uppercase text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}

          {/* Download Resume — always visible "bail out" button */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              background: "hsl(var(--brand) / 0.15)",
              border: "1px solid hsl(var(--brand) / 0.3)",
              color: "hsl(var(--brand))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.3)";
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(var(--brand) / 0.15)";
              e.currentTarget.style.borderColor = "hsl(var(--brand) / 0.3)";
            }}
          >
            <Download className="h-3 w-3" />
            Resume
          </a>
        </div>

        {/* Mobile resume button */}
        <a
          href="/resume.pdf"
          download
          className="flex md:hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase"
          style={{
            background: "hsl(var(--brand) / 0.15)",
            border: "1px solid hsl(var(--brand) / 0.3)",
            color: "hsl(var(--brand))",
          }}
        >
          <Download className="h-3 w-3" />
          Resume
        </a>
      </div>
    </nav>
  );
}
