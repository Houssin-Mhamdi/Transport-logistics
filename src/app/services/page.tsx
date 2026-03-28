import { Metadata } from "next";
import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";
import ServicesHero from "@/components/ui/ServicesPage/ServicesHero";
import ServicesBentoGrid from "@/components/ui/ServicesPage/ServicesBentoGrid";
import StatsCounter from "@/components/ui/ServicesPage/StatsCounter";
import ServicesCTA from "@/components/ui/ServicesPage/ServicesCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services | Transpro Logistics",
  description: "Precision logistics solutions: Air Freight, Ocean Freight, Road Transport & Warehousing",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
      <TopNavBar activePage="services" />
      <ServicesHero />
        
      <ScrollReveal yOffset={0} xOffset={-80}>
        <ServicesBentoGrid />
      </ScrollReveal>
      
      <ScrollReveal yOffset={0} xOffset={80} delay={0.1}>
        <StatsCounter />
      </ScrollReveal>
      
      <ScrollReveal yOffset={50} xOffset={0} delay={0.2}>
        <ServicesCTA />
      </ScrollReveal>
      
      <Footer />
    </main>
  );
}