import Navbar from "@/components/Navbar";
import WellboreSidebar from "@/components/portfolio/WellboreSidebar";
import StratigraphyBackground from "@/components/portfolio/StratigraphyBackground";
import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import AwardsSection from "@/components/portfolio/AwardsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import {
  WaterZoneEffect,
  OilZoneEffect,
  PerforationEffect,
  ReservoirSimEffect,
} from "@/components/portfolio/OilGasEffects";

const Index = () => {
  return (
    <div className="relative" style={{ background: "hsl(220,20%,6%)" }}>
      {/* ── STRATIGRAPHY — full page geological layers (z-0) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StratigraphyBackground />
      </div>

      {/* ── Fixed full-page grain/noise overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 51,
          opacity: 0.032,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* ── FIXED UI ELEMENTS ── */}
      <Navbar />

      {/* ── UNIFIED WELLBORE SIDEBAR (depth indicator + drill string) ── */}
      <WellboreSidebar />

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 lg:ml-24">

        {/* HERO */}
        <HeroSection />

        {/* EXPERIENCE — Shale Cap layer */}
        <div className="relative">
          <ExperienceSection />
        </div>

        {/* PROJECTS — Sandstone / Water zone */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <WaterZoneEffect />
          </div>
          <ProjectsSection />
        </div>

        {/* SKILLS — Oil-bearing sandstone */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <OilZoneEffect />
          </div>
          <SkillsSection />
        </div>

        {/* AWARDS — Perf zone */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <PerforationEffect />
          </div>
          <AwardsSection />
        </div>

        {/* EDUCATION — Reservoir */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-0">
            <ReservoirSimEffect />
          </div>
          <EducationSection />
        </div>

        {/* CONTACT — Basement */}
        <ContactSection />

      </main>
    </div>
  );
};

export default Index;
