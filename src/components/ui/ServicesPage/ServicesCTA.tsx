export default function ServicesCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="bg-secondary-container rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
        {/* Gradient Overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" aria-hidden="true" />
        
        {/* Text Content */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-on-secondary-container tracking-tighter mb-6">
            Ready to streamline your supply chain?
          </h2>
          <p className="text-on-secondary-container/80 text-lg font-medium leading-relaxed">
            Consult with our precision architects to design a logistics solution tailored to your unique operational requirements.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button className="px-10 py-5 bg-on-secondary-container text-white font-bold rounded-lg shadow-xl active:scale-95 transition-all hover:brightness-110">
            Request a Quote
          </button>
          <button className="px-10 py-5 border-2 border-on-secondary-container text-on-secondary-container font-bold rounded-lg hover:bg-on-secondary-container hover:text-white active:scale-95 transition-all">
            Contact Expert
          </button>
        </div>
      </div>
    </section>
  );
}