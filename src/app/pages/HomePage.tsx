import { Hero } from "../components/sections/Hero";
import { ScrollStorytelling } from "../components/sections/ScrollStorytelling";
import { Services } from "../components/sections/Services";
import { Portfolio } from "../components/sections/Portfolio";
import { CTASection } from "../components/sections/CTASection";
import { Footer } from "../components/sections/Footer";
import { Navigation } from "../components/Navigation";
import { CustomCursor } from "../components/CustomCursor";
import { PaperGrain } from "../components/PaperGrain";

export default function HomePage() {
  return (
    <div className="bg-[#F5F0E8] text-[#1C1A16] min-h-screen relative">
      <PaperGrain />
      <CustomCursor />
      <Navigation />
      <Hero />
      <ScrollStorytelling />
      <Services />
      <Portfolio />
      <CTASection />
      <Footer />
    </div>
  );
}
