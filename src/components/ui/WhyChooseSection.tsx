import { useTranslations } from 'next-intl';

const TECH_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB91RAE2dNG6Zutjqkb6Znp6h8j7n-5ElvukuwPMz5qjuMpCKCOCtS-cFnWtkljwG-RijXkqu4cFuhjv3swLQzCZuuPX9mSl3tgVQ9x47J3y7aqru2dZxnVUQX6VDtU851EK4Xw8MAfecz0z04oIyYTDM3DNK5kbXtdR5ia86gRqBqxeOI8d1hxzU1_sAI1JC4TdhpsZ1rwf1mRJeDVHaLCptxbwElsBTe5XqJPHKFRxgsKzZfnGXC5MSyokuqs6cEdTyXCuODiVWwf";

export default function WhyChooseSection() {
  const t = useTranslations('WhyChooseSection');

  const features = [
    {
      icon: "biotech",
      title: t('features.ai_routing.title'),
      description: t('features.ai_routing.description'),
    },
    {
      icon: "shield_with_heart",
      title: t('features.safety.title'),
      description: t('features.safety.description'),
    },
    {
      icon: "public",
      title: t('features.network.title'),
      description: t('features.network.description'),
    },
    {
      icon: "eco",
      title: t('features.eco.title'),
      description: t('features.eco.description'),
    },
  ];

  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={TECH_IMAGE}
              alt="Technology Interface"
              className="w-full h-[500px] object-cover center"
            />
          </div>
          {/* Floating Stat */}
          <div className="absolute top-10 -right-10 z-20 bg-secondary-container p-6 rounded-xl shadow-xl text-white">
            <div className="text-4xl font-black">{t('stat.value')}</div>
            <div className="text-xs uppercase font-bold tracking-widest opacity-80">
              {t('stat.label')}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">
              {t.rich('header.title', {
                br: (chunks) => <><br />{chunks}</>
              })}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {t('header.description')}
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