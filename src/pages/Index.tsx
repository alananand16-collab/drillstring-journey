import Navbar from "@/components/Navbar";
import DepthIndicator from "@/components/portfolio/DepthIndicator";
import DrillString from "@/components/portfolio/DrillString";
import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import AwardsSection from "@/components/portfolio/AwardsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <div className="relative bg-[#050811]">
      {/* Fixed full-page noise/grain texture overlay */}
      <div
        className="fixed inset-0 z-[50] pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      <Navbar />
      <DepthIndicator />
      <DrillString />

      <main className="relative z-10 lg:ml-16">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AwardsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
