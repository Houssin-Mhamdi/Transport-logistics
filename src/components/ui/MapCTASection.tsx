const MAP_IMAGE = "https://imgs.search.brave.com/w30a6OwYPNN6Bxg0g4fAUplO4EJ6BnU-uJ1JIO6jCqg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMud2JtLmltL3B3/L3NtYWxsLzQyYjAx/MGMwMGViZGRjY2Vj/NTU4YWZhMTRlYjAw/MzhjLmpwZw";

export default function MapCTASection() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-surface-container-lowest p-12 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-12 overflow-hidden border border-surface-container">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">
              Ready to Optimize Your Logistics?
            </h2>
            <p className="text-on-surface-variant text-lg">
              Speak with our precision architects today to receive a bespoke quote for your global distribution needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-all shadow-lg flex items-center">
                Get Custom Quote
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </button>
              <button className="bg-primary-fixed text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-fixed-dim transition-all">
                Talk to Expert
              </button>
            </div>
          </div>

          {/* Map Image */}
          <div className="md:w-1/2 w-full h-[300px] bg-surface-container rounded-xl ">
            <img
              src={MAP_IMAGE}
              alt="Global Map"
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}