"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface FleetShowcaseProps {
  onSelect?: (vehicleId: 'car' | 'transporter' | 'suitcase' | 'suitcase_lift') => void;
  selectedId?: string;
  showExtraSections?: boolean;
}

export default function FleetShowcase({ 
  onSelect, 
  selectedId, 
  showExtraSections = true 
}: FleetShowcaseProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };
  const router = useRouter();
  return (
    <>
      {/* Hero Section */}
      {showExtraSections && (
        <motion.section 
          {...fadeInUp}
          className="max-w-7xl mx-auto px-6 mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-secondary-container pl-8 py-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none mb-6">
                Precision Fleet for Every Requirement
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Select from our architecturally diverse range of transport solutions. From rapid inner-city couriers to heavy-duty lift platforms, our fleet is engineered for absolute reliability.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-secondary">
                <span className="w-12 h-px bg-secondary"></span>
                Advanced Logistics
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* <!-- Vehicle Grid --> */}
      <section className={`max-w-7xl mx-auto px-6 ${showExtraSections ? "mb-32" : "mb-12"}`}>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* <!-- Vehicle 1: Car Station Wagon --> */}
          <motion.div 
            variants={fadeInUp}
            className={`group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border ${selectedId === 'car' ? 'border-primary' : 'border-outline-variant/10'} flex flex-col transition-all duration-300 hover:translate-y-[-4px] relative`}
          >
            {selectedId === 'car' && (
              <div className="absolute top-2 right-2 z-20">
                <span className="material-symbols-outlined text-primary bg-white rounded-full">check_circle</span>
              </div>
            )}
            <div className="h-56 bg-surface-container-low relative overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Modern white station wagon delivery vehicle parked on a clean gray background, professional commercial vehicle lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2s6ShBMBJlEA5IjLuJPOF5unVBF1DI05D8A8MQhRd4o131KSCqiJy5KxirevqvTneVi5lKK87jGESp2xoO-WLJhImLDknbXHhH-h0rf0gvdMJdiPTqQV6Urk12m2WZ4jV3Uq7bDFHr-jlkVD0GxCY0KYRpmfOume6jMd1Wpy1SzVzfCnreonnMZn8LVPj4N2sXdD01tG1jdsOLHAdNHRfP0X8Mh1cVnGrD3rRBNbnYvhrSyGj7IoRyPPiCnZpew09XuIlXJj8VSx" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Rapid Delivery</div>
            </div>
            <div className="p-8 grow flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-2">Car Station Wagon</h3>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Optimized for urgent document transfers and small parcel express within metropolitan areas.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">weight</span>
                  <span className="text-on-surface font-semibold">Up to 450 kg Payload</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">straighten</span>
                  <span className="text-on-surface font-semibold">180cm x 110cm x 90cm</span>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
                <button 
                  onClick={() => onSelect?.('car')}
                  className={`text-sm font-bold ${selectedId === 'car' ? 'text-primary' : 'text-secondary-container'} hover:underline underline-offset-4 transition-all`}
                >
                  {selectedId === 'car' ? 'Selected' : 'Select Vehicle'}
                </button>
                <a className="text-xs font-medium text-outline flex items-center gap-1 hover:text-primary transition-colors" href="#">
                  View Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vehicle 2: Transporter */}
          <motion.div 
            variants={fadeInUp}
            className={`group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border ${selectedId === 'transporter' ? 'border-primary' : 'border-outline-variant/10'} flex flex-col transition-all duration-300 hover:translate-y-[-4px] relative`}
          >
            {selectedId === 'transporter' && (
              <div className="absolute top-2 right-2 z-20">
                <span className="material-symbols-outlined text-primary bg-white rounded-full">check_circle</span>
              </div>
            )}
            <div className="h-56 bg-surface-container-low relative overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Industrial mid-sized white transporter van in a bright warehouse setting, clean reflections, high-end commercial aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9tGK_s7QJ9-y8RoM8lQXediFS9IbJexJaiZvpn-sOxd2FH9ozJCqtmDOorCWYAV9Yyg43rq6OwaQVvRoOsvaixl1vrnxEhCYMP3lbZ9rfG2DGRgYtI2HhNY7UQUYVNc4riF2AxsZH6-8RRpBf_lxjz2VeKO-Hoe3x8D6pVw7P4VJuDZW2sT16DGt1U6pQL_2U-UUyAbWEmxbhFAvMKYYA6ZR5QzGIY3ZfHs7MN7cS5Wj4e8Rp6IKc9UDVzyvYJagbzI9SZ56eCscW" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Mid-Range</div>
            </div>
            <div className="p-8 grow flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-2">Transporter</h3>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Ideal for medium-weight inner-city shipments and retail distribution cycles.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">weight</span>
                  <span className="text-on-surface font-semibold">Up to 1,200 kg Payload</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">straighten</span>
                  <span className="text-on-surface font-semibold">430cm x 180cm x 120cm</span>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
                <button 
                  onClick={() => onSelect?.('transporter')}
                  className={`text-sm font-bold ${selectedId === 'transporter' ? 'text-primary' : 'text-secondary-container'} hover:underline underline-offset-4 transition-all`}
                >
                  {selectedId === 'transporter' ? 'Selected' : 'Select Vehicle'}
                </button>
                <a className="text-xs font-medium text-outline flex items-center gap-1 hover:text-primary transition-colors" href="#">
                  View Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vehicle 3: Suitcase */}
          <motion.div 
            variants={fadeInUp}
            className={`group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border ${selectedId === 'suitcase' ? 'border-primary' : 'border-outline-variant/10'} flex flex-col transition-all duration-300 hover:translate-y-[-4px] relative`}
          >
            {selectedId === 'suitcase' && (
              <div className="absolute top-2 right-2 z-20">
                <span className="material-symbols-outlined text-primary bg-white rounded-full">check_circle</span>
              </div>
            )}
            <div className="h-56 bg-surface-container-low relative overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Heavy duty box truck white body against a minimalist sky background, side view, sleek logistics photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAC9AB93-yP48F31YNfx6CiGw7kGwDYaABYulpvbiILIqGd22wAOptps_hS0Dps4i9IiOb_LfDgro8_NN8tAbQMAyKmKfQDHM_Ezwf8MNXZDMuqCImeRFvznxEyWsLGr2G_xej3uRhUA6-9a2DrjRzfK7V1EIh16-iB7hlv--S0pE8eE0n5XWNuPSZsLXV_fx4LDvF84WLd1FPSvTgKKRZxJwc1MJgw_4JLObChrEb3mP9W6avGISNSGo_XXg5srkl13iHxphTE-Z8" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Heavy Load</div>
            </div>
            <div className="p-8 grow flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-2">Suitcase</h3>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Hard-shell cargo protection for cross-regional logistics and fragile industrial equipment.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">weight</span>
                  <span className="text-on-surface font-semibold">Up to 3,500 kg Payload</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">straighten</span>
                  <span className="text-on-surface font-semibold">610cm x 240cm x 240cm</span>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
                <button 
                  onClick={() => onSelect?.('suitcase')}
                  className={`text-sm font-bold ${selectedId === 'suitcase' ? 'text-primary' : 'text-secondary-container'} hover:underline underline-offset-4 transition-all`}
                >
                  {selectedId === 'suitcase' ? 'Selected' : 'Select Vehicle'}
                </button>
                <a className="text-xs font-medium text-outline flex items-center gap-1 hover:text-primary transition-colors" href="#">
                  View Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vehicle 4: Suitcase Lifting Platform */}
          <motion.div 
            variants={fadeInUp}
            className={`group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border ${selectedId === 'suitcase_lift' ? 'border-primary' : 'border-outline-variant/10'} flex flex-col transition-all duration-300 hover:translate-y-[-4px] relative`}
          >
            {selectedId === 'suitcase_lift' && (
              <div className="absolute top-2 right-2 z-20">
                <span className="material-symbols-outlined text-primary bg-white rounded-full">check_circle</span>
              </div>
            )}
            <div className="h-56 bg-surface-container-low relative overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Logistics truck with hydraulic lifting platform deployed, showing precision engineering details, clean industrial setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP6AKj83kCxgbZ7vXzBuInmPqEN-m0CY-WaEtVk3AcnCFZ9na50B4fjseQUBeEfYhjS3zfRy5nqo8scsnq5VVdANjcok_u_Za0_rHzFqCVI_WmGzebvqTRgmjEinWMyb9JdTj_Vt6y7mn7_LeixX-mpnXWOUrL6yAlg5fWLo7fFbCOl5ymWhsyDqlJc__OQljPbhKVtUES2MfA4XzCUdkmWD4a7Vy4Y04_4AV9U5R6YffbJHMonWw6YjoNi6lx7CZFj_QOlH4vlCSY" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Specialized</div>
            </div>
            <div className="p-8 grow flex flex-col">
              <h3 className="text-xl font-bold text-primary mb-2">Suitcase Lifting Platform</h3>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Equipped with hydraulic lift for seamless loading of heavy machinery without dock access.</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">weight</span>
                  <span className="text-on-surface font-semibold">Up to 5,000 kg Payload</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="material-symbols-outlined text-secondary text-lg">expand</span>
                  <span className="text-on-surface font-semibold">Integrated Hydraulic Lift</span>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
                <button 
                  onClick={() => onSelect?.('suitcase_lift')}
                  className={`text-sm font-bold ${selectedId === 'suitcase_lift' ? 'text-primary' : 'text-secondary-container'} hover:underline underline-offset-4 transition-all`}
                >
                  {selectedId === 'suitcase_lift' ? 'Selected' : 'Select Vehicle'}
                </button>
                <a className="text-xs font-medium text-outline flex items-center gap-1 hover:text-primary transition-colors" href="#">
                  View Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Fleet Features */}
      {showExtraSections && (
        <motion.section 
          {...fadeInUp}
          className="bg-surface-container-low py-24"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">The Soysal Advantage</h2>
              <div className="w-20 h-1 bg-secondary-container mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">my_location</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">Real-time Tracking</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">Precise telemetry data for every asset, allowing you to monitor cargo movement with second-by-second accuracy.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">Eco-friendly Options</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">Committed to sustainable logistics with our expanding fleet of electric transporters and carbon-offset programs.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">badge</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-primary">Professional Drivers</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">Our operators are trained precision specialists ensuring the integrity and security of your shipments at every turn.</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      {showExtraSections && (
        <motion.section 
          {...fadeInUp}
          className="max-w-7xl mx-auto px-6 mt-32 mb-32 "
        >
          <div className="bg-primary rounded-xl overflow-hidden relative p-12 md:p-20 text-center">
            {/* <!-- Abstract Texture Background --> */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Book? Let's Plan Your Route</h2>
              <p className="text-primary-fixed text-lg mb-12 max-w-2xl mx-auto opacity-90">
                Our intelligent Route Architect is ready to calculate the most efficient path for your chosen vehicle. Save time and reduce costs today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => router.push('/route-planner')} className="bg-secondary-container cursor-pointer text-on-secondary-container px-10 py-4 rounded-md font-black text-lg shadow-lg active:scale-95 transition-transform">
                  Start Route Planning
                </button>
                <button onClick={() => router.push('/contact')} className="border-2 border-primary-fixed cursor-pointer text-primary-fixed px-10 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-colors">
                  Contact Specialist
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
}
