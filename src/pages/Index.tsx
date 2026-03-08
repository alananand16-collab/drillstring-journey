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
    <div className="relative bg-[#080a0f]">
      <Navbar />
      <DepthIndicator />
      <DrillString />
      <main className="lg:ml-16">
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
