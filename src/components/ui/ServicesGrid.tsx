import Link from "next/link";
import { useTranslations } from 'next-intl';

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

export default function ServicesGrid() {
  const t = useTranslations('ServicesGrid');

  const services: ServiceProps[] = [
    {
      title: t('services.air.title'),
      description: t('services.air.description'),
      icon: "flight_takeoff",
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      features: t.raw('services.air.features'),
      variant: "light",
    },
    {
      title: t('services.ocean.title'),
      description: t('services.ocean.description'),
      icon: "sailing",
      iconBg: "bg-primary-container",
      iconColor: "text-white",
      features: t.raw('services.ocean.features'),
      variant: "dark",
      decorativeIcon: "anchor",
    },
    {
      title: t('services.road.title'),
      description: t('services.road.description'),
      icon: "local_shipping",
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      features: t.raw('services.road.features'),
      variant: "light",
    },
  ];

  return (
    <section className="py-24 bg-surface grainy-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-4">
              {t('header.title')}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {t('header.description')}
            </p>
          </div>
          <Link
            href="/services"
            className="hidden md:block text-primary font-bold border-b-2 border-secondary-container pb-1 hover:text-secondary transition-colors"
          >
            {t('header.view_all')}
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