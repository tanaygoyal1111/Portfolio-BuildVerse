import LenisProvider from "@/components/LenisProvider";
import MouseGlow from "@/components/MouseGlow";
import Navbar from "@/components/Navbar";
import HeroSpline from "@/components/HeroSpline";
import About from "@/components/About";
import ProjectUniverse from "@/components/ProjectUniverse";
import SkillsLab from "@/components/SkillsLab";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import FilmGrain from "@/components/FilmGrain";
import SectionNavigator from "@/components/SectionNavigator";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <LenisProvider>
      {/* Global overlays */}
      <Loader />
      <FilmGrain />
      <CustomCursor />
      <MouseGlow />

      {/* Navigation */}
      <Navbar />
      <SectionNavigator />

      {/* Page content */}
      <main className="flex flex-col w-full bg-black min-h-screen">
        <HeroSpline />
        <About />
        <ProjectUniverse />
        <SkillsLab />
        <Contact />
      </main>
    </LenisProvider>
  );
}
