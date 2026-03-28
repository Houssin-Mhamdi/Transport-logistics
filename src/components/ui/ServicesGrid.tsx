import Link from "next/link";

interface ServiceProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  features: string[];
  variant: "light" | "dark";
  decorativeIcon?: string;
}

const services: ServiceProps[] = [
  {
    title: "Air Freight",
    description: "Priority sky-bound logistics for time-sensitive cargo with real-time aerospace monitoring.",
    icon: "flight_takeoff",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    features: ["Express Delivery", "Global Reach"],
    variant: "light",
  },
  {
    title: "Ocean Freight",
    description: "Optimized maritime routes for heavy-volume global distribution and sustainable shipping.",
    icon: "sailing",
    iconBg: "bg-primary-container",
    iconColor: "text-white",
    features: ["FCL / LCL Options", "Port-to-Door"],
    variant: "dark",
    decorativeIcon: "anchor",
  },
  {
    title: "Road Freight",
    description: "Adaptive terrestrial fleet management with specialized handling for industrial requirements.",
    icon: "local_shipping",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    features: ["Last Mile Experts", "Temperature Control"],
    variant: "light",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-surface grainy-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-4">
              Core Logistics Pillars
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Tailored transport solutions engineered for reliability, speed, and absolute safety of your assets across every medium.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden md:block text-primary font-bold border-b-2 border-secondary-container pb-1 hover:text-secondary transition-colors"
          >
            View All Services
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  icon,
  iconBg,
  iconColor,
  features,
  variant,
  decorativeIcon,
}: ServiceProps) {
  const isDark = variant === "dark";

  return (
    <div className={`group p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-fixed relative overflow-hidden ${isDark ? "bg-primary" : "bg-surface-container-lowest"
      }`}>
      {/* Icon */}
      <div className={`${iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-6 ${!isDark ? "group-hover:scale-110 transition-transform" : ""}`}>
        <span className={`material-symbols-outlined ${iconColor} text-3xl`}>{icon}</span>
      </div>

      {/* Content */}
      <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-primary"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-primary-fixed-dim" : "text-on-surface-variant"}`}>
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-center ${isDark ? "text-white/60" : "text-outline"}`}>
            <span className={`material-symbols-outlined text-[14px] ${isDark ? "text-secondary-container" : "text-secondary"} mr-2`}>
              check_circle
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Decorative Icon */}
      {decorativeIcon && (
        <div className="absolute -bottom-8 -right-8 opacity-10">
          <span className="material-symbols-outlined text-[160px] text-white">
            {decorativeIcon}
          </span>
        </div>
      )}
    </div>
  );
}