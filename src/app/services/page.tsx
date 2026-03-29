import { Metadata } from "next";
import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";
import ServicesHero from "@/components/ui/ServicesPage/ServicesHero";
import ServicesBentoGrid from "@/components/ui/ServicesPage/ServicesBentoGrid";
import StatsCounter from "@/components/ui/ServicesPage/StatsCounter";
import ServicesCTA from "@/components/ui/ServicesPage/ServicesCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services | Soysal Logistics",
  description: "Precision logistics solutions: Air Freight, Ocean Freight, Road Transport & Warehousing",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
      <TopNavBar activePage="services" />
      <ServicesHero />

      <ScrollReveal yOffset={0} xOffset={-80}>
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <span className="text-secondary-container font-label text-xs tracking-[0.2em] uppercase">Premium Speed</span>
              </div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">Air Freight Solutions</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Our air freight services provide the most reliable and time-sensitive delivery options for your high-value cargo. We leverage priority boarding and dedicated cargo lanes to ensure global reach within 48-72 hours.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="check_circle">check_circle</span>
                  <span className="text-on-surface font-medium">Express Door-to-Door Delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="check_circle">check_circle</span>
                  <span className="text-on-surface font-medium">Temperature-Controlled Cabin Containers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="check_circle">check_circle</span>
                  <span className="text-on-surface font-medium">Real-Time GPS Tracking &amp; Manifesting</span>
                </li>
              </ul>
              <div className="flex gap-4">
                <button className="bg-primary text-white px-8 py-3 font-headline font-bold text-sm tracking-wider uppercase hover:bg-primary-container transition-colors">Request Quote</button>
                <button className="border-b-2 border-outline-variant hover:border-secondary text-primary font-headline font-bold text-sm tracking-wider py-2 transition-all">Learn More</button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] bg-surface-container-low overflow-hidden shadow-2xl">
                <img alt="" className="w-full h-full object-cover" data-alt="close-up of a large cargo plane nose on the tarmac at dusk with ground crew lights reflecting on the metallic surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYvddtm33DA9Pe5mpYqW5Llhsl0tN84Jn6gHP54x5x0ihgv16_cnNqWYUCb-c79fnwn86UVFYIcC073pDwdiVL8mtp4XWegpWTez3muKga9hHTcetC7U--E6anjXR4y2j0wx57Kse73tA8WDbJu6gcwgGoY0ErEpZYnfFBE_9jZQc00wYCMkNwGCMa2AQ5vE9kNv6WUdJ6IuYYQhHpHeoDORD8vAtsU_Cwz9lHUn3cd_-qil_O6zqmyIqnD1Fj2yBiLxmVc6Ch3Hgc" />
              </div>
            </div>
          </div>
        </section>


      </ScrollReveal>
      <ScrollReveal yOffset={0} xOffset={80}>
        {/* <!-- Ocean Freight --> */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/3] bg-surface-container-lowest overflow-hidden shadow-2xl">
                <img alt="" className="w-full h-full object-cover" data-alt="high angle wide shot of a massive container ship crossing the deep blue ocean with symmetrical white wakes trailing behind" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjHmehE2PmsJ93sOx8TtM1XV2wibSFu5XmwJlx0RXMGdGqKscQNqxK5zqn7czehXwO57CfuuwfK3Wf5B7yq48My5YEBJ5qqJgUzLwleEN4YTXbgrWK6lvD7I0KiixHYXkCF4_XwfvGF8Ug9on-0rTqTsgh6rLtp8ix7yM9aLtptEYw8oZyNu0MRHecSfR_FMtSJmfLfqt3rRBkTJDCR9SLAAsjMnS81xWylFWx8ONB9B1UgtZg-tgEEVyNOc6A4GIkQ-2rL2IKyw93" />
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-secondary-container font-label text-xs tracking-[0.2em] uppercase">Global Scale</span>
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">Ocean Freight Services</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                  Managing the complexities of international waters with our vast network of maritime partners. We offer flexible FCL (Full Container Load) and LCL (Less than Container Load) options to suit any volume.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="anchor">anchor</span>
                    <span className="text-on-surface font-medium">Strategic Port Distribution Centers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="anchor">anchor</span>
                    <span className="text-on-surface font-medium">Customs Brokerage &amp; Compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container pt-0.5" data-icon="anchor">anchor</span>
                    <span className="text-on-surface font-medium">Intermodal Seamless Transfers</span>
                  </li>
                </ul>
                <div className="flex gap-4">
                  <button className="bg-primary text-white px-8 py-3 font-headline font-bold text-sm tracking-wider uppercase hover:bg-primary-container transition-colors">Request Quote</button>
                  <button className="border-b-2 border-outline-variant hover:border-secondary text-primary font-headline font-bold text-sm tracking-wider py-2 transition-all">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </ScrollReveal>

      <ScrollReveal yOffset={0} xOffset={-80} delay={0.1}>
        <StatsCounter />
      </ScrollReveal>

      <ScrollReveal yOffset={50} xOffset={0} delay={0.2}>
        <ServicesCTA />
      </ScrollReveal>

   
      {/* <!-- Simplified Global Network Section --> */}
      <section className="bg-[#001a48] py-52 text-white overflow-hidden relative">
        {/* Large Background Map */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40">
          <img 
            alt="World Map Background" 
            className="w-full h-full object-cover grayscale brightness-[0.4]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHhm39kpKGpJ1ENFjHSRexamH_6WK9HESheAt1iTCo0Bv2qKLGmkN1tRkSz9QeVqqQUp_Y2ZrV2c1jcO-JjQgGhOUBOYwK7v4HXLkOmaGO0ST5eeRHy_XPXfdMjsCtnj_nBZrz8A3vrAvcWIQ5A8Gn2a8q85R2uWuKsiLh_9QAuvSYHT3vhbNR8r_45_J1uagKM2mtOAY7BpbLooMANKjLSLCGXAf_ThFRCBX_ivV6roO5pQTiivMNbPNB3GefTfOdzWWxWuMie6AE" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a48] via-transparent to-[#001a48]"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
            <div className="text-center group">
              <div className="text-6xl md:text-8xl font-headline font-black text-secondary-container mb-3 tracking-tighter">1,400+</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-slate-400 font-bold">Global Hubs</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl md:text-8xl font-headline font-black text-secondary-container mb-3 tracking-tighter">250k+</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-slate-400 font-bold">Annual Sailings</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl md:text-8xl font-headline font-black text-secondary-container mb-3 tracking-tighter">12M+</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-slate-400 font-bold">Tons Handled</div>
            </div>
            <div className="text-center group">
              <div className="text-6xl md:text-8xl font-headline font-black text-secondary-container mb-3 tracking-tighter">24/7</div>
              <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-slate-400 font-bold">Operations</div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Why Choose Us --> */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-surface-container-low flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-3xl" data-icon="public">public</span>
            </div>
            <h3 className="font-headline font-bold text-primary mb-2">Global Reach</h3>
            <p className="text-sm text-on-surface-variant">Seamless logistics across all seven continents.</p>
          </div>
          <div className="text-center p-8 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-surface-container-low flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-3xl" data-icon="monitoring">monitoring</span>
            </div>
            <h3 className="font-headline font-bold text-primary mb-2">Real-time Tracking</h3>
            <p className="text-sm text-on-surface-variant">Live telemetry for every shipment in our custody.</p>
          </div>
          <div className="text-center p-8 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-surface-container-low flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-3xl" data-icon="precision_manufacturing">precision_manufacturing</span>
            </div>
            <h3 className="font-headline font-bold text-primary mb-2">Specialized Handling</h3>
            <p className="text-sm text-on-surface-variant">Expert care for hazardous or fragile cargo.</p>
          </div>
          <div className="text-center p-8 bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-surface-container-low flex items-center justify-center mx-auto mb-6 text-primary">
              <span className="material-symbols-outlined text-3xl" data-icon="support_agent">support_agent</span>
            </div>
            <h3 className="font-headline font-bold text-primary mb-2">Expert Support</h3>
            <p className="text-sm text-on-surface-variant">Dedicated account managers for every client.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}