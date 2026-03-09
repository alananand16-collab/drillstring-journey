import Navbar from "@/components/Navbar";
import PageBackground from "@/components/portfolio/PageBackground";
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
    // Relative so fixed children stack correctly; no background here — PageBackground owns it
    <div className="relative" style={{ background: "transparent" }}>
      {/* Seamless full-page geological background — fixed, z-0 */}
      <PageBackground />

      <Navbar />
      <DepthIndicator />
      <DrillString />

      {/* All sections are transparent — PageBackground shows through */}
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
