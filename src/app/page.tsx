import TopNavBar from "@/components/ui/TopNavBar";
import HeroSection from "@/components/ui/HeroSection";
import ServicesGrid from "@/components/ui/ServicesGrid";
import WhyChooseSection from "@/components/ui/WhyChooseSection";
import StatsBanner from "@/components/ui/StatsBanner";
import MapCTASection from "@/components/ui/MapCTASection";
import Footer from "@/components/ui/Footer";
import TestimonialSection from "@/components/ui/TestimonialSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TransportCapabilities from "@/components/ui/TransportCapabilities";

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopNavBar />
      <HeroSection />
      <TransportCapabilities />

      <ScrollReveal>
        <ServicesGrid />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <WhyChooseSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <StatsBanner />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <TestimonialSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <MapCTASection />
      </ScrollReveal>

      <Footer />
    </main>
  );
}