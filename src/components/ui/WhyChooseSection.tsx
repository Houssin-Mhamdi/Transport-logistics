const features = [
  {
    icon: "biotech",
    title: "AI Routing",
    description: "Proprietary algorithms that minimize delays by predicting weather and traffic patterns.",
  },
  {
    icon: "shield_with_heart",
    title: "Safety First",
    description: "Multi-layered security protocols ensuring 0% cargo loss rate over the last decade.",
  },
  {
    icon: "public",
    title: "Global Network",
    description: "140+ international hubs providing seamless cross-border logistical support.",
  },
  {
    icon: "eco",
    title: "Eco-Logistics",
    description: "Committed to carbon-neutral operations by 2035 with our green-fleet initiative.",
  },
];

const TECH_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnRtaoE2H_LKRDEZmC5-mzF9ZplVQr26DOk8hISvlbmzNrPQ5SM3Gq92_GrLdLplydp8S2zMDclG8ooYW5pjI3gXHYOlvaE5eeyqhqF9H-v6C1BfHPSMx822IcwIQIPa_oBeQfs7Ya2TZg4V8DPNtCM8TjBDOggaSCiGA2quEDtgTvQVlq2ZODSNSMmOSijxk9564EJ4jtgQ7-8fkL_SWj5nrcpodGjc2XuqoBc5-t3BIOuTVuTYLelkVE4qSBTCIwGc3rZcZ2E_D";

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={TECH_IMAGE}
              alt="Technology Interface"
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Floating Stat */}
          <div className="absolute top-10 -right-10 z-20 bg-secondary-container p-6 rounded-xl shadow-xl text-white">
            <div className="text-4xl font-black">25+</div>
            <div className="text-xs uppercase font-bold tracking-widest opacity-80">
              Years Excellence
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">
              Engineered for <br />Absolute Reliability
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              We don&apos;t just deliver packages; we manage the lifecycle of your supply chain through advanced predictive technology and local expertise.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center text-primary font-bold">
                  <span className="material-symbols-outlined mr-2">{feature.icon}</span>
                  {feature.title}
                </div>
                <p className="text-sm text-on-surface-variant">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}